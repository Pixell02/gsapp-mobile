import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import useFetch from "../../hooks/useFetch";
import EditPanel from "./component/EditPanel";
import { baiJamjureeBold } from "./convertedFonts/baiJamjureeBold";
import { baiJamjureeBoldItalic } from "./convertedFonts/baiJamjureeBoldItalic";
import { baiJamjureeRegular } from "./convertedFonts/baiJamjureeRegular";
import { baroNeueBlack } from "./convertedFonts/baronNeueBlack";
import { eurostarblack } from "./convertedFonts/eurostarblack";
import { goldmanBold } from "./convertedFonts/goldmanBold";
import { goldmanRegular } from "./convertedFonts/goldmanRegular";
import { gravtec } from "./convertedFonts/gravtec";
import { helvetica } from "./convertedFonts/helvetica";
import { impact } from "./convertedFonts/impact";
import { kenyanCoffe } from "./convertedFonts/kenyanCoffe";
import { kenyanCoffeBold } from "./convertedFonts/kenyanCoffeBold";
import { kenyanCoffeBoldItalic } from "./convertedFonts/kenyanCoffeBoldItalic";
import { kenyanCoffeItalic } from "./convertedFonts/kenyanCoffeItalic";
import { madeOuterSansBlack } from "./convertedFonts/madeOuterSansBlack";
import { madeOuterSansRegular } from "./convertedFonts/madeOuterSansRegular";
import { madeOuterSansThin } from "./convertedFonts/madeOuterSansThin";
import { motorBlock } from "./convertedFonts/motorBlock";
import { nexeHeavy } from "./convertedFonts/nexeHeavy";
import { nowBlack } from "./convertedFonts/nowBlack";
import { nowLight } from "./convertedFonts/nowLight";
import { nowThin } from "./convertedFonts/nowThin";
import { oxaniumBold } from "./convertedFonts/oxaniumBold";
import { oxaniumRegular } from "./convertedFonts/oxaniumRegular";
import { paladinsExpanded } from "./convertedFonts/paladinsExpanded";
import { poppinsBlack } from "./convertedFonts/poppinsBlack";
import { poppinsBold } from "./convertedFonts/poppinsBold";
import { poppinsExtraBoldItalic } from "./convertedFonts/poppinsExtraBoldItalic";
import { poppinsItalic } from "./convertedFonts/poppinsItalic";
import { poppinsRegular } from "./convertedFonts/poppinsRegular";
import { poppinsThinItalic } from "./convertedFonts/poppinsThinItalic";
import { ralewayBlack } from "./convertedFonts/ralewayBlack";
import { ralewayMedium } from "./convertedFonts/ralewayMedium";
import { russoOne } from "./convertedFonts/russoOne";
import { tekoSemiBold } from "./convertedFonts/tekoSemiBold";
import { typoSpeedBlackItalic } from "./convertedFonts/typoSpeedBlackItalic";
import useBackgrounds from "./hooks/useBackgrounds";
import useCoords from "./hooks/useCoords";
import useMessageContext from "./hooks/useMessageContext";

function WorkSpace({ uid }) {
  const webViewRef = useRef(null);
  const { backgrounds, handleFetchBackground } = useBackgrounds(
    uid ? uid : null
  );
  const {handleMessage} = useMessageContext();

  useEffect

  const { coords } = useCoords(uid ? uid : null);
  const handleWebViewError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
  };
  const { image: watermark } = useFetch(
    "https://firebasestorage.googleapis.com/v0/b/poster-dd714.appspot.com/o/logo%2Fadaptive-icon.png?alt=media&token=c3970fb2-b78a-4339-868a-79c7763cf9ed"
  );
const [isLoadend, setIsLoadend] = useState(false)
  

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <WebView
        ref={webViewRef}
        source={{
          html: `
          
        <html>
  <head>
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js"
      referrerpolicy="no-referrer"
    ></script>
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/fontfaceobserver/2.3.0/fontfaceobserver.min.js"
      integrity="sha512-7g/mtWY/pF5yAwrcHhRBBrDK3Tr1Xbjaweymp5/jiEmKJurJkRfi5grW5mKQx78wPRoQPOu1zfeWdJtsCw8QsQ=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    ></script>
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"
      integrity="sha512-BNaRQnYJYiPSqHHDb58B0yaPfCu+Wgds8Gp/gU33kqBtgNS4tSPHuGibyoeqMV/TJlSKda6FXzoEyYGjTe+vXA=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    ></script>
    
    <style>
    @font-face {
      font-family: motorBlock;
      src: url(${motorBlock}) format('woff');
    }
    @font-face {
      font-family: gravtrac;
      src: url(${gravtec}) format('woff');
    }
    @font-face {
      font-family: Nexa-trial-Heavy;
      src: url(${nexeHeavy}) format('woff');
    }
    @font-face {
      font-family: paladins expanded;
      src: url(${paladinsExpanded}) format('woff');
    }
    @font-face { 
      font-family: Poppins-ThinItalic;
      src: url(${poppinsThinItalic}) format('woff');
    }
    @font-face { 
      font-family: Poppins-ExtraBoldItalic;
      src: url(${poppinsExtraBoldItalic}) format('woff');
    }
    @font-face {
      font-family: "Bai Jamjuree";
      src: url(${baiJamjureeRegular}) format('woff');
    }
    @font-face {
      font-family: "BaiJamjuree-BoldItalic";
      src: url(${baiJamjureeBoldItalic}) format('woff');
    }
    @font-face {
      font-family: "BaiJamjuree-Bold";
      src: url(${baiJamjureeBold}) format('woff');
    }
    
    @font-face {
      font-family: "Raleway Medium";
      src: url(${ralewayMedium}) format('woff');
    }
    @font-face {
      font-family: "Raleway Black";
      src: url(${ralewayBlack}) format('woff');
    }
    
    @font-face {
      font-family: "Impact";
      src: url(${impact}) format('woff');
    }
    @font-face {
      font-family: "Russo_One";
      src: url(${russoOne}) format('woff');
    }
    @font-face {
      font-family: "eurostar";
      src: url(${eurostarblack}) format('woff');
    }
    @font-face {
      font-family: "Poppins";
      src: url(${poppinsRegular}) format('woff');
    }
    @font-face {
      font-family: "Poppins Bold";
      src: url(${poppinsBold}) format('woff');
    }
    @font-face {
      font-family: "Poppins Black";
      src: url(${poppinsBlack}) format('woff');
    }
    @font-face {
      font-family: "Poppins-italic";
      src: url(${poppinsItalic}) format('woff');
    }
    @font-face {
      font-family: "Baron-Neue-Black";
      src: url(${baroNeueBlack}) format('woff');
    }
    @font-face {
      font-family: "oxanium-regular";
      src: url(${oxaniumRegular}) format('woff');
    }
    @font-face {
      font-family: "oxanium-Bold";
      src: url(${oxaniumBold}) format('woff');
    }
    @font-face {
      font-family: "Goldman-Bold";
      src: url(${goldmanBold}) format('woff');
    }
    @font-face {
      font-family: "Goldman-Regular";
      src: url(${goldmanRegular}) format('woff');
    }
    @font-face {
      font-family: "kenyan coffee";
      src: url(${kenyanCoffe}) format('woff');
    }
    @font-face {
      font-family: "kenyan coffee bold";
      src: url(${kenyanCoffeBold}) format('woff');
    }
    @font-face {
      font-family: "kenyan coffee italic";
      src: url(${kenyanCoffeItalic}) format('woff');
    }
    @font-face {
      font-family: "kenyan coffee bold italic ";
      src: url(${kenyanCoffeBoldItalic}) format('woff');
    }
    @font-face {
      font-family: "Made Outer Sans Black";
      src: url(${madeOuterSansBlack}) format('woff');
    }
    @font-face {
      font-family: "Made Outer Sans Regular";
      src: url(${madeOuterSansRegular}) format('woff');
    }
    
    @font-face {
      font-family: "Made Outer Sans Thin";
      src: url(${madeOuterSansThin}) format('woff');
    }
    @font-face {
      font-family: "helvetica";
      src: url(${helvetica}) format('woff');
    }
    @font-face {
      font-family: "Now Black";
      src: url(${nowBlack}) format('woff');
    }
    @font-face {
      font-family: "Now Light";
      src: url(${nowLight}) format('woff');
    }
    @font-face {
      font-family: "Now Thin";
      src: url(${nowThin}) format('woff');
    }
    @font-face {
      font-family: "Teko-SemiBold";
      src: url(${tekoSemiBold}) format('woff');
    }
    @font-face {
      font-family: "Typo_Speed_Black_Italic_Demo";
      src: url(${typoSpeedBlackItalic}) format('woff');
    }
         
    </style>
  </head>
  
  <body  style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
    <div id="image" style="display: flex; align-items:center; justify-content:center;">
    
    <img src="${watermark}" id="watermark" style="position: absolute; z-index: 1; opacity: 0"/>
    <canvas id="canvas"/>
    </div>
    <script>
      var canvas = document.getElementById("canvas")
    </script>
  </body>
</html>
`,
        }}
        style={{ width: "100%", flex: 1 }}
        javaScriptEnabled={true}
        originWhitelist={["*"]}
        onError={handleWebViewError}
        onMessage={handleMessage}
        onLoad={() => console.log("loading")}
        onLoadEnd={() => setIsLoadend(true)}
      />
      {coords && isLoadend &&(
        <EditPanel
          webViewRef={webViewRef}
          uid={uid}
          coords={coords}
        />
      )}
    </View>
  );
}

export default WorkSpace;
