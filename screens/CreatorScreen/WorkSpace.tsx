import React, { useRef, useState } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import EditPanel from "./component/EditPanel";
import useCoords from "./hooks/useCoords";
import { poppinsThinItalic } from "./convertedFonts/poppinsThinItalic";
import { poppinsExtraBoldItalic } from "./convertedFonts/poppinsExtraBoldItalic";
import { baiJamjureeRegular } from "./convertedFonts/baiJamjureeRegular";
import { baiJamjureeBoldItalic } from "./convertedFonts/baiJamjureeBoldItalic";
import { baiJamjureeBold } from "./convertedFonts/baiJamjureeBold";
import { ralewayMedium } from "./convertedFonts/ralewayMedium";
import { ralewayBlack } from "./convertedFonts/ralewayBlack";
import { impact } from "./convertedFonts/impact";
import { russoOne } from "./convertedFonts/russoOne";
import { eurostarblack } from "./convertedFonts/eurostarblack";
import { poppinsRegular } from "./convertedFonts/poppinsRegular";
import { poppinsBold } from "./convertedFonts/poppinsBold";
import { poppinsBlack } from "./convertedFonts/poppinsBlack";
import { poppinsItalic } from "./convertedFonts/poppinsItalic";
import { baroNeueBlack } from "./convertedFonts/baronNeueBlack";
import { oxaniumBold } from "./convertedFonts/oxaniumBold";
import { oxaniumRegular } from "./convertedFonts/oxaniumRegular";
import { goldmanBold } from "./convertedFonts/goldmanBold";
import { goldmanRegular } from "./convertedFonts/goldmanRegular";
import { kenyanCoffe } from "./convertedFonts/kenyanCoffe";
import { madeOuterSansBlack } from "./convertedFonts/madeOuterSansBlack";
import { madeOuterSansRegular } from "./convertedFonts/madeOuterSansRegular";
import { madeOuterSansThin } from "./convertedFonts/madeOuterSansThin";
import { helvetica } from "./convertedFonts/helvetica";
import { nowBlack } from "./convertedFonts/nowBlack";
import { nowLight } from "./convertedFonts/nowLight";
import { tekoSemiBold } from "./convertedFonts/tekoSemiBold";
import { nowThin } from "./convertedFonts/nowThin";
import exportImage from "./functions/exportImage";
import { useCollection } from "../../hooks/useCollection";

function WorkSpace({ uid }) {
  const webViewRef = useRef(null);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [size, setSize] = useState(700);
  const { coords } = useCoords(uid ? uid : null);
  const [text, setText] = useState("");
  const handleWebViewError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.log(nativeEvent.description);
  };
  
  const handleMessage = async (e: any) => {
    const message = JSON.parse(e.nativeEvent.data);
    
    if(message.type === "image") {
      exportImage(message.message)
    } else {
      if(message.width > message.height) {
      setSize(message.width)
    } else {
      setSize(message.height)
    }
  }
  };
  
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
         
    </style>
  </head>
  
  <body  style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
    <div id="image" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
      <canvas id="canvas"></canvas>
    </div>
    <script>
      var canvas = document.getElementById("canvas");
    </script>
  </body>
</html>
`
        }}
        style={{ width: "100%", flex: 1}}
        javaScriptEnabled={true}
        originWhitelist={["*"]}
        onError={handleWebViewError}
        onMessage={handleMessage}
        onLoad={() => console.log("loading")}
      />
      {coords && <EditPanel webViewRef={webViewRef} size={size} uid={uid} coords={coords} />}
    </View>
  );
}

export default WorkSpace;
