import React, { useContext } from 'react'
import { ThemeOptionContext } from '../../../../context/themeOptionContext';

const useAddMultiplyImageAndText = (webViewRef, selectedMatch) => {
  const { selectedTheme } = useContext(ThemeOptionContext);

  const handleAddText = (coords, value, properties) => {
    webViewRef.current.injectJavaScript(`
    fabricCanvas._objects.forEach((item, i) => {
      if (item.className === "${coords.className}") {
        fabricCanvas.remove(item);
      }
    });
    fabricCanvas.renderAll();
    var themeOption = ${JSON.stringify(coords.themeOption)}
    var font = new FontFaceObserver("${coords.FontFamily}")
    font.load().then(() => {
      var text = new fabric.Text("${value}", {
        top: ${properties.orientation === "vertically" ? coords.Top + (properties.Margin * (selectedMatch - 1)) : coords.Top},
        left: ${coords.Left},
        className: "${coords.className}",
        selectable: false,
        fontFamily: "${coords.FontFamily}",
        fontSize: ${coords.FontSize},
        fill: "${coords.Fill}",
        originX: "${coords.OriginX}",
        originY: "${coords.OriginY}",
      });
      if(text.width > ${coords.ScaleToWidth}){
        text.scaleToWidth(${coords.ScaleToWidth});
      }
      if(themeOption){
      themeOption.forEach((theme, i) => {
        if ((theme.color === "${selectedTheme}") || (theme.label === "${selectedTheme}")) {
          text.set({
            fill: theme.Fill
          })
        }
      })
    }
      fabricCanvas.add(text);
      fabricCanvas.renderAll();
    });
    `);
  }

  const handleAddImage = (coords, value, properties) => {
    webViewRef.current.injectJavaScript(`
    fabricCanvas._objects.forEach((item, i) => {
      if (item.className === "${coords.className}") {
        fabricCanvas.remove(item);
      }
    });
    fabricCanvas.renderAll();
    var opponentLogo = new Image();
    opponentLogo.src = "${value}";
    opponentLogo.onload = () => {
      var image = new fabric.Image(opponentLogo, {
        top: ${properties.orientation === "vertically" ? coords.Top + (properties.Margin * (selectedMatch - 1)) : coords.Top},
        left: ${properties.orientation === "horizontally" ? coords.Left  + (properties.Margin * (selectedMatch - 1)) : coords.Left},
        className: "${coords.className}",
        selectable: false,
        originX: "center",
        originY: "center",
      });
      if(${coords.ScaleToWidth}){
        image.scaleToWidth(${coords.ScaleToWidth});
      }
      if (image.height > ${coords.ScaleToHeight}) {
        image.scaleToHeight(${coords.ScaleToHeight});
      }
      fabricCanvas.add(image);
      fabricCanvas.renderAll();
    };
    `);
  }

  return {handleAddText, handleAddImage}
}

export default useAddMultiplyImageAndText
