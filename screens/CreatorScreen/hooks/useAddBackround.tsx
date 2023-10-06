
const useAddBackround = (webViewRef) => {

  const handleAddBackground = (dataURL: string, size) => {
    return `
    var fabricCanvas;
    var bg;
    var backgroundImage = new Image();
    backgroundImage.src = "${dataURL}";
    
    backgroundImage.onload = () => {
      if (!fabricCanvas) {
        fabricCanvas = new fabric.Canvas("canvas", {
          width: backgroundImage.width,
          height: backgroundImage.height,
        });
      } else {
        if (!bg) {
        bg = new fabric.Image(backgroundImage, {
          left: 0,
          top: 0,
          className: "background",
          width: backgroundImage.width,
          height: backgroundImage.height,
          selectable: false
        });
        fabricCanvas.add(bg);
        fabricCanvas.renderAll();
      }
        
      if (bg) {
        bg.setSrc(backgroundImage.src, function() {
          fabricCanvas.renderAll();
        });
      }
      
      var image = document.querySelector("#image");
      var scaleFactor = 700 / (typeof size === "number" ? size : 700);
      image.style.transform = "scale(${(700 / (typeof size === "number" ? size : 700)).toFixed(2)})";
      
      }
      var data = {
        width: backgroundImage.width,
        height: backgroundImage.height,
        type: 'resolution',
      };
      
      window.ReactNativeWebView.postMessage(JSON.stringify(data));
    };
  `;
  }

  const handleAddAdditionalLayer = (additionalImage: string) => {

    return `
        if(fabricCanvas){
        var additionalLayer;
        var additionalImage = new Image();
        additionalImage.src = "${additionalImage}";
        additionalImage.onload = () => {
          if (!additionalLayer) {
            additionalLayer = new fabric.Image(additionalImage, {
                className: "additionalLayer",
                selectable: false
            });
            fabricCanvas.add(additionalLayer);
            additionalLayer.bringToFront();
            fabricCanvas.renderAll();
          } if(additionalLayer) {
            additionalLayer.setSrc(additionalImage.src, function() {
            fabricCanvas.renderAll();
        });
          }
        }
      }

        `;
  }
  const handleClickButton = () => {
    return `
      playerImageObject = fabricCanvas.getObjects().find(obj => obj.className === "playerImage");
       if (playerImageObject) {
        fabricCanvas.setActiveObject(playerImageObject);
        fabricCanvas.renderAll();
}
    `;
  }
  const handleDeActiveObject = () => {
    return `
     
        fabricCanvas.discardActiveObject();
        fabricCanvas.renderAll();

    `;
  }

  return { handleAddBackground, handleDeActiveObject, handleAddAdditionalLayer, handleClickButton }
}

export default useAddBackround
