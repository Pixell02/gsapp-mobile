import React, { useState } from "react";
import { View } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import NavBar from "../components/NavBar";
import MainContent from "../components/MainContent";
import TopBar from "../components/TopBar";
import OfferContainer from "./component/OfferContainer";
import LoadingScreen from "../components/LoadingScreen";
import TemporaryContainer from "./component/TemporaryContainer";
import WebView from "react-native-webview";
import PromoCodeProvider from "./context/PromoCodeContext";
import { Text } from "react-native";
import { Button } from "react-native-paper";

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
        {paymentLink && <WebView source={{ uri: paymentLink }} onNavigationStateChange={handleNavigationStateChange} />}
        {!paymentLink && (
          <>
            {isLoading && <LoadingScreen />}
            {!isLoading && (
              <>
                <TopBar />
                <View style={{width: "100%", justifyContent: "flex-start", alignItems: "flex-start", marginTop: 10, marginLeft: 10}}>
      <Button onPress={() => navigation.navigate("HomeScreen")} style={{backgroundColor: "black", borderRadius: 0}}>
        <Text style={{color: "white"}}>Panel nawigacji</Text>
      </Button>
      </View>
                <MainContent>
                  <OfferContainer setPaymentLink={setPaymentLink} />
                  {/* <TemporaryContainer /> */}
                </MainContent>
                {/* <NavBar /> */}
              </>
            )}
          </>
        )}
      </ScreenContainer>
    </PromoCodeProvider>
  );
};

export default OfferScreen;
