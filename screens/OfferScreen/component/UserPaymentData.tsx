import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { CheckBox } from "react-native-elements";
import { Button } from "react-native-paper";
import InputData from "../../../components/InputData";
import ItemCenter from "../../../components/ItemCenter";
import useLanguageContext from "../../../hooks/useLanguageContext";
import translate from "../locales/translate.json";

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
      {paymentData.buyer.firstName === "" && <Text style={{color: "red"}}>puste pole</Text>}
      <InputData
        name={translate.lastName[language] || translate.lastName["en"]}
        text={paymentData.buyer.lastName}
        onChangeText={(value) => handleDataChange(value, "lastName")}
      />
      {paymentData.buyer.lastName === "" && <Text style={{color: "red"}}>puste pole</Text>}
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
      {paymentData.buyer.delivery.street === "" && <Text style={{color: "red"}}>puste pole</Text>}
      <InputData
        name={translate.postalCode[language] || translate.postalCode["en"]}
        text={paymentData.buyer.delivery.postalCode}
        onChangeText={(value) => handleDeliveryDataChange(value, "postalCode")}
      />
      {!zipCodeRegex.test(paymentData.buyer.delivery.postalCode) && <Text style={{color: "red"}}>błąd</Text>}
      <InputData
        name={translate.city[language] || translate.city["en"]}
        text={paymentData.buyer.delivery.city}
        onChangeText={(value) => handleDeliveryDataChange(value, "city")}
      />
      {paymentData.buyer.delivery.city === "" && <Text style={{color: "red"}}>puste pole</Text>}
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
          {paymentData.companyName === "" && <Text style={{color: "red"}}>puste pole</Text>}
          <InputData
            name={translate.vatId[language] || translate.vatId["en"]}
            text={paymentData.NIP}
            onChangeText={(value) => handleChange(value, "NIP")}
          />
          {!nipRegex.test(paymentData.NIP) && <Text style={{color: "red"}}>błąd</Text>}
        </View>
      )}
      {isLoading && <Text>...Przetwarzanie</Text>}
      <Button
        onPress={() => handleSave()}
        style={!activeButton ?{ backgroundColor: "gray", borderRadius: 0, marginTop: 20, marginBottom: 20 } : {backgroundColor: "black", borderRadius: 0, marginTop: 20, marginBottom: 20 }}
        disabled={!activeButton}
      >
        <Text style={{ color: "white", fontFamily: "Poppins-SemiBold" }}>
          {translate.buy[language] || translate.buy["en"]}
        </Text>
      </Button>
      
      
    </View>
  );
};

export default UserPaymentData;
