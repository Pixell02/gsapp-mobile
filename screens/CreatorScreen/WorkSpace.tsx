import React, { useRef, useState, useEffect } from "react";
import { Text, TextInput, View } from "react-native";
import { WebView } from "react-native-webview";
import EditPanel from "./component/EditPanel";
import { useCollection } from "../../hooks/useCollection";
import useCoords from "./hooks/useCoords";
import useBackgrounds from "./hooks/useBackgrounds";

function WorkSpace({ uid }) {
  const webViewRef = useRef(null);
  const { coords } = useCoords(uid ? uid : null);
  const [text, setText] = useState("");
  const handleWebViewError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.log(nativeEvent.description);
  };
  const handleWebViewMessage = event => {
    const dataURL = event.nativeEvent.data;
    console.log('Captured image data URL:', dataURL);
    // Możesz teraz przetworzyć lub zapisać dane URL obrazu
  };
  const handleCapture = () => {
    webViewRef.current.injectJavaScript(`
      var image = document.getElementById("image");
      
      html2canvas(image, { 
        scale: 1.25, 
        useCORS: true, 
        allowTaint: true 
      }).then((canvas) => {
        const dataURL = canvas.toDataURL("image/jpeg", 1.0);
        window.postMessage(dataURL);
        const link = document.createElement("a");
        link.download = "image.jpg";
        link.href = dataURL;
        link.click();
      });
    `);
  };
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <WebView
        ref={webViewRef}
        source={{
          html: `
            <html>
              <head>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js" referrerpolicy="no-referrer"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/fontfaceobserver/2.3.0/fontfaceobserver.min.js" integrity="sha512-7g/mtWY/pF5yAwrcHhRBBrDK3Tr1Xbjaweymp5/jiEmKJurJkRfi5grW5mKQx78wPRoQPOu1zfeWdJtsCw8QsQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js" integrity="sha512-BNaRQnYJYiPSqHHDb58B0yaPfCu+Wgds8Gp/gU33kqBtgNS4tSPHuGibyoeqMV/TJlSKda6FXzoEyYGjTe+vXA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
                </head>
              <body>
              <style>
              @font-face {
                font-family: "Poppins Black";
                src: url(./fonts/Poppins-Black.ttf);
              }
              </style>
                <div id="image" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
                  <canvas id="canvas"></canvas>
                </div>
                <script>
                var canvas = document.getElementById("canvas");
                </script>
              </body>
            </html>
          `,
        }}
        style={{ width: "100%", flex: 1 }}
        javaScriptEnabled={true}
        onError={handleWebViewError}
        onMessage={handleWebViewMessage}
        onLoad={() => console.log("loading")}
      />
      {coords && (
        <EditPanel 
        webViewRef={webViewRef}
        uid={uid}
        coords={coords}
        handleSave={handleCapture}
      />
      )}
      
    </View>
  );
}

export default WorkSpace;
