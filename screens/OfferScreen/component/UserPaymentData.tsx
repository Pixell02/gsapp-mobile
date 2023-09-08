import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import InputData from "../../components/InputData";
import translate from "../locales/translate.json";
import useLanguageContext from "../../../hooks/useLanguageContext";
import ItemCenter from "../../components/ItemCenter";
import { Button } from "react-native-paper";
import { CheckBox } from "react-native-elements";

const zipCodeRegex = /^\d{2}-\d{3}$/;
const nipRegex = /^\d{10}$/;

const UserPaymentData: React.FC<any> = ({ paymentData, isLoading, isChecked, setIsChecked, handleSave, handleChange, handleDataChange, handleDeliveryDataChange }) => {
  const { language } = useLanguageContext();
  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
    if (paymentData.companyName) {
      setIsChecked(true);
    }
  }, [paymentData.companyName]);

  useEffect(() => {
    if (isChecked) {
      if (
        !nipRegex.test(paymentData.NIP) ||
        !paymentData.companyName ||
        !paymentData.buyer.firstName ||
        !paymentData.buyer.lastName ||
        !paymentData.buyer.delivery.city ||
        !paymentData.buyer.delivery.street ||
        !paymentData.buyer.email ||
        !zipCodeRegex.test(paymentData.buyer.delivery.postalCode)
      ) {
        setActiveButton(false);
      } else {
        setActiveButton(true);
      }
    } else if (!isChecked) {
      if (
        !paymentData.buyer.firstName ||
        !paymentData.buyer.lastName ||
        !paymentData.buyer.delivery.city ||
        !paymentData.buyer.delivery.street ||
        !zipCodeRegex.test(paymentData.buyer.delivery.postalCode)
      ) {
        setActiveButton(false);
      } else {
        setActiveButton(true);
      }
    }
  }, [paymentData]);
  return (
    <View style={{ width: "80%", marginTop: 40 }}>
      <ItemCenter>
        <Text style={{ fontFamily: "Poppins_Medium", fontSize: 20 }}>{translate.billing[language]}</Text>
      </ItemCenter>
      <InputData
        name={translate.firstName[language] || translate.firstName["en"]}
        text={paymentData.buyer.firstName}
        onChangeText={(value) => handleDataChange(value, "firstName")}
      />
      <InputData
        name={translate.lastName[language] || translate.lastName["en"]}
        text={paymentData.buyer.lastName}
        onChangeText={(value) => handleDataChange(value, "lastName")}
      />
      <InputData
        name={translate.email[language] || translate.email["en"]}
        text={paymentData.buyer.email}
        onChangeText={(value) => handleDataChange(value, "email")}
      />
      <InputData
        name={translate.street[language] || translate.street["en"]}
        text={paymentData.buyer.delivery.street}
        onChangeText={(value) => handleDeliveryDataChange(value, "street")}
      />
      <InputData
        name={translate.postalCode[language] || translate.postalCode["en"]}
        text={paymentData.buyer.delivery.postalCode}
        onChangeText={(value) => handleDeliveryDataChange(value, "postalCode")}
      />
      <InputData
        name={translate.city[language] || translate.city["en"]}
        text={paymentData.buyer.delivery.city}
        onChangeText={(value) => handleDeliveryDataChange(value, "city")}
      />

      <View>
        <CheckBox
          checked={isChecked}
          onPress={() => setIsChecked(!isChecked)}
          title={translate.companyData[language] || translate.companyData["en"]}
          style={{ borderColor: "black", borderWidth: 1 }}
        />
      </View>
      {isChecked && (
        <View>
          <InputData
            name={translate.companyName[language] || translate.companyName["en"]}
            text={paymentData.companyName}
            onChangeText={(value) => handleChange(value, "companyName")}
          />
          <InputData
            name={translate.vatId[language] || translate.vatId["en"]}
            text={paymentData.NIP}
            onChangeText={(value) => handleChange(value, "NIP")}
          />
        </View>
      )}
      <Button
        onPress={() => handleSave()}
        style={{ backgroundColor: "black", borderRadius: 0, marginTop: 20, marginBottom: 20 }}
        disabled={!activeButton}
      >
        <Text style={{ color: "white", fontFamily: "Poppins-SemiBold" }}>
          {translate.buy[language] || translate.buy["en"]}
        </Text>
      </Button>
      {isLoading && <Text>...Przetwarzanie</Text>}
      
    </View>
  );
};

export default UserPaymentData;
