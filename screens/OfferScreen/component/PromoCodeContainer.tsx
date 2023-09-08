import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import InputCode from "./PromoCodeContainer/InputCode";
import usePromoCodeContext from "../hooks/usePromoCodeContext";
import translate from "../locales/translate.json";
import useLanguageContext from "../../../hooks/useLanguageContext";

const PromoCodeContainer: React.FC = () => {
  const { language } = useLanguageContext();
  const { alert, promoCode } = usePromoCodeContext();

  return (
    <View style={{ width: "100%" }}>
      <View>
        <InputCode />
      </View>
      <View>
        <View style={styles.container}>
          {alert && alert === "użyto pomyślnie" ? (
            <Text style={styles.greenText}>{alert}</Text>
          ) : (
            <Text style={styles.redText}>{alert}</Text>
          )}
        </View>
        {promoCode?.expireDate && (
          <View style={styles.container}>
            <View style={styles.greenBorder}>
              <Text style={styles.greenText}>
                {translate.youAreUsing[language] +
                  ` "` +
                  promoCode.code +
                  `" ` +
                  translate.whichIsValid[language] +
                  " " +
                  promoCode.expireDate}
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default PromoCodeContainer;

const styles = StyleSheet.create({
  greenText: {
    color: "green" 
  },
  redText: {
    color: "red" 
  },
  container: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  greenBorder: { 
    borderColor: "green", 
    borderWidth: 1, 
    width: 300, 
    height: 50,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
