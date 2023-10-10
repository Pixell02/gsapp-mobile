import React, { useState } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import WebView from "react-native-webview";
import MainContent from "../components/MainContent";
import ScreenContainer from "../components/ScreenContainer";
import TopBar from "../components/TopBar";
import OfferContainer from "../screens/OfferScreen/component/OfferContainer";
import PromoCodeProvider from "../screens/OfferScreen/context/PromoCodeContext";
import LoadingScreen from "./LoadingScreen";

interface OfferScreenProps {
  navigation: any;
}

const OfferScreen: React.FC<OfferScreenProps> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [paymentLink, setPaymentLink] = useState(null);

  const handleNavigationStateChange = (newState) => {
    const splittedUrl = newState.url.split("/")[2];
    const domain = splittedUrl.split("?")[0];
    if (domain === "gsapp.pl") {
      setPaymentLink(null);
      navigation.navigate("SuccessScreen");
    }
  };

  return (
    <PromoCodeProvider>
      <ScreenContainer>
        {paymentLink && (
          <WebView
            source={{ uri: paymentLink }}
            onNavigationStateChange={handleNavigationStateChange}
          />
        )}
        {!paymentLink && (
          <>
            {isLoading && <LoadingScreen />}
            {!isLoading && (
              <>
                <TopBar />
                <View
                  style={{
                    width: "100%",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    marginTop: 10,
                    marginLeft: 10,
                  }}
                >
                  <Button
                    onPress={() => navigation.navigate("HomeScreen")}
                    style={{ backgroundColor: "black", borderRadius: 0 }}
                  >
                    <Text style={{ color: "white" }}>Panel nawigacji</Text>
                  </Button>
                </View>
                <MainContent>
                  <OfferContainer setPaymentLink={setPaymentLink} />
                </MainContent>
              </>
            )}
          </>
        )}
      </ScreenContainer>
    </PromoCodeProvider>
  );
};

export default OfferScreen;
