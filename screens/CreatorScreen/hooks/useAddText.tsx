
interface coordsProps {
    Top: number;
    themeOption: Array<{ color: string; label: string; Fill: string }>;
    FontFamily: string;
    Left: number;
    Angle?: number;
    FontSize: number;
    Fill: string;
    OriginX: string;
    OriginY: string;
    ScaleToWidth: number;

}

const useAddText = (webViewRef: React.RefObject<any>) => {
  const handleAddText = (value: string, selectedTheme: string, className: string, coords: coordsProps) => {
    webViewRef.current.injectJavaScript(`
    var object = fabricCanvas.getObjects().find((item) => item.className === "${className}");
    console.log(object)
    if(object) {
        object.set("text", "${value}")
        if(object.width > ${coords.ScaleToWidth}){
          object.scaleToWidth(${coords.ScaleToWidth});
          if (${coords?.Angle} && ${coords?.Angle !== 0}) {
          object.scaleToHeight(${coords.ScaleToWidth});
        }
        }
        fabricCanvas.renderAll();
    } else {
      var themeOption = ${JSON.stringify(coords.themeOption)}
      var font = new FontFaceObserver("${coords.FontFamily}")
      
      font.load().then(() => {
        var text = new fabric.Text("${value}", {
          top: ${coords.Top},
          left: ${coords.Left},
          className: "${className}",
          angle: ${coords?.Angle},
          selectable: false,
          fontFamily: "${coords.FontFamily}",
          fontSize: ${coords.FontSize},
          fill: "${coords.Fill}",
          originX: "${coords.OriginX}",
          originY: "${coords.OriginY}",
        });
        if(text.width > ${coords.ScaleToWidth}){
          text.scaleToWidth(${coords.ScaleToWidth});
          if (${coords?.Angle} && ${coords?.Angle !== 0}) {
          text.scaleToHeight(${coords.ScaleToWidth});
        }
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
    }  
    `);
  };

  return { handleAddText };
};

export default useAddText;
