import React, { useState } from "react";
import { View } from "react-native";
import Title from "../../components/Title";
import useCheckBox from "../hooks/useCheckBox";
import RadioContainer from "./RadioContainer";
import ScreenContainer from "../../components/ScreenContainer";
import PromoCodeContainer from "./PromoCodeContainer";
import PromoCodeProvider from "../context/PromoCodeContext";
import ItemCenter from "../../components/ItemCenter";
import PriceContainer from "./PriceContainer";
import UserPaymentData from "./UserPaymentData";
import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import usePaymentData from "../hooks/usePaymentData";
import useProducts from "../hooks/useProducts";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { getFunctions, httpsCallable } from "firebase/functions";

const OfferContainer = ({ setPaymentLink }) => {
  const { user } = useAuthContext();
  const { documents: userData } = useCollection("userData", ["uid", "==", user.uid]);
  const [isLoading, setIsLoading] = useState(false);
  const {paymentData, handleChange, handleDataChange, handleDeliveryDataChange, setPaymentData} =
    usePaymentData(userData);
  const {
    radioType,
    products,
    setProducts,
    isChecked,
    setIsChecked,
  } = useProducts(setPaymentData);
  const { checked, handleCheckedChange } = useCheckBox();
  const functions = getFunctions();

  const payUPayment = httpsCallable(functions, "PayUPayment");
  const createTransactionInfo = httpsCallable(functions, "createTransactionInfo");

  const handleSave = async () => {
    setIsLoading(true);
    const response = await createTransactionInfo({
      user: {
        email: user.email,
        uid: user.uid
    }});
    console.log(response)
    try {
      const { data }: { data: any } = await payUPayment(paymentData);
      setPaymentLink(data);
      const urlParts = data.split("?");
      const secondPart = urlParts[1].split("=")[1];
      const orderId = secondPart.split("&")[0];
      const orderRef = doc(db, "orderId", user.uid);
      setDoc(orderRef, {
        orderId: orderId,
        uid: user.uid,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PromoCodeProvider>
      <View>
        <Title name="Sklep" />
        <ScreenContainer>
          <ItemCenter>
            <PriceContainer
              totalAmount={paymentData.totalAmount}
              radioType={radioType}
              products={products}
              setProducts={setProducts}
            />
            <RadioContainer checked={checked} handleCheckedChange={handleCheckedChange} />
            <PromoCodeContainer />
            <UserPaymentData
              handleSave={handleSave}
              paymentData={paymentData}
              isChecked={isChecked}
              setIsChecked={setIsChecked}
              handleChange={handleChange}
              handleDataChange={handleDataChange}
              handleDeliveryDataChange={handleDeliveryDataChange}
              isLoading={isLoading}
            />
          </ItemCenter>
        </ScreenContainer>
      </View>
    </PromoCodeProvider>
  );
};

export default OfferContainer;
