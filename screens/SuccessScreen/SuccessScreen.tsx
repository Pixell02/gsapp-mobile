import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import ItemCenter from "../../components/ItemCenter";
import ScreenContainer from "../../components/ScreenContainer";
import { db } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";

const SuccessScreen = ({ navigation }) => {
  const { user } = useAuthContext();
  const { documents: order } = useCollection("orderId", ["uid", "==", user.uid]);
  const [orderId, setOrderId] = useState(null);
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const functions = getFunctions();
  const checkTransactionStatus = httpsCallable(functions, "checkTransactionStatus");
  const transactionConfirmation = httpsCallable(functions, "transactionConfirmation");
  const { documents: License } = useCollection("user", ["uid", "==", user.uid]);
  const getOrder = httpsCallable(functions, "getOrder");
  const createFax = httpsCallable(functions, "createFax");

  useEffect(() => {
    checkTransactionStatus({
      user: {
        email: user.email,
        uid: user.uid
    }});
  }, [])

  useEffect(() => {
    if (order?.length > 0) {
      setOrderId(order[0].orderId);
      setMessage(`Ładowanie statusu zamówienia: ${order[0].orderId}`);
    }
  }, [order]);

  useEffect(() => {
    if (status) {
      setMessage(`Status zamówienia: ${status}`);
    }
  }, [status]);

  useEffect(() => {
    const handleAddLicense = async () => {
      try {
        const currentDate = moment();
        const newDate = moment(currentDate).add(1, "months").format("MM-DD-YYYY");
        const docRef = doc(db, "user", License[0].id);
        setDoc(docRef, {
          license: "full-license",
          uid: user.uid,
          expireDate: newDate,
        });
        const response = await transactionConfirmation({
          user: {
            email: user.email,
            uid: user.uid,
          },
        });
        const res = await createFax({ order });
        console.log(res);
        const historyRef = collection(db, "history");
        addDoc(historyRef, {
          uid: user.uid,
          type: order.description,
          buyer: order.buyer,
          delivery: order.buyer.delivery,
          orderId: order.orderId,
          products: order.products,
          date: Date.now(),
        });
        const orderRef = doc(db, "orderId", user.uid);
        setDoc(orderRef, {
          orderId: "",
          uid: user.uid,
        });
        navigation.navigate("AccountScreen");
      } catch (err) {
        console.log(err);
      }
    };
    if (orderData) {
      handleAddLicense();
    }
  }, [orderData]);

  useEffect(() => {
    const handleGetOrder = async () => {
      try {
        const response = await getOrder({ orderId });
        const order = response.data[0];
        setStatus(order.status);
        if (order.status === "COMPLETED") {
          setTimeout(() => {
            setMessage("Za 5 sekund nastąpi przekierowanie");
          }, 1000);

          setTimeout(() => {
            setOrderData(order);
          }, 5000);
        } else {
          setTimeout(() => {
            setMessage("Za 5 sekund nastąpi przekierowanie");
          }, 1000);

          setTimeout(() => {
            navigation.navigate("AccountScreen");
          }, 5000);
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (orderId && License?.length > 0) {
      handleGetOrder();
    }
  }, [orderId, License]);

  return (
    <ScreenContainer>
      <ItemCenter>
        <View style={{ flex: 1, justifyContent: "center" }}>
          {message && <Text style={{ fontSize: 20, textAlign: "center" }}>{message}</Text>}
        </View>
      </ItemCenter>
    </ScreenContainer>
  );
};

export default SuccessScreen;
