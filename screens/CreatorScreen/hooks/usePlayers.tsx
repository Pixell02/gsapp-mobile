import { useEffect, useState } from 'react'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { useCollection } from '../../../hooks/useCollection'

const usePlayers = (webViewRef, selectedTheme) => {

  const { user } = useAuthContext()
  const {documents: Players} = useCollection("Players", ["uid", "==", user.uid])
  const [playerOptions, setPlayerOptions] = useState(null);

  useEffect(() => {
    const options = Players?.map((player, i) => ({
      label: player.firstName + " " + player.secondName,
      value: {...player}
    }));
    setPlayerOptions(options);

  },[Players])

  const handleAddPlayerName = (coords, player) => {
    webViewRef.current.injectJavaScript(`
      var themeOption = ${JSON.stringify(coords.player?.themeOption)}
      fabricCanvas._objects.forEach((item, i) => {
        if (item.className === "yourPlayer") {
          fabricCanvas.remove(item);
        }
      });
      fabricCanvas.renderAll();
      var formatPlayer = "";
      if ("${coords.player.Format}" === "dotted") {
        formatPlayer = "${player.firstName[0]}" + "." + "${player.secondName}";
      } else if ("${coords.player.Format}" === "nameSurName") {
        formatPlayer = "${player.firstName}" + " " +"${player.secondName}";
      } else {
        formatPlayer = "${player.secondName}";
      }
      var font = new FontFaceObserver("${coords.player.FontFamily}");
      font.load().then(() => {
        var playerName = new fabric.Text(formatPlayer, {
          left: ${coords.player.Left},
          top: ${coords.player.Top},
          fill: "${coords.player.Fill}",
          originX: "${coords.player.OriginX}",
          originY: "${coords.player.OriginY}",
          className: "yourPlayer",
          selectable: false,
          fontFamily: "${coords.player.FontFamily}",
          fontSize: ${coords.player.FontSize},
        })
        if (playerName.width > ${coords.player.ScaleToWidth}) {
          playerName.scaleToWidth(${coords.player.ScaleToWidth});
        }
        if(themeOption){
          themeOption.forEach((theme, i) => {
            console.log(theme.color === "${selectedTheme}", theme.Fill)
            if ((theme.color === "${selectedTheme}") || (theme.label === "${selectedTheme}")) {
              playerName.set({
                fill: theme.Fill
              })
            }
          })
        }
        fabricCanvas.add(playerName);
        fabricCanvas.renderAll();
      })
      `);
  }
  const handleAddPlayerImage = (coords, image) => {
    webViewRef.current.injectJavaScript(`
        fabricCanvas._objects.forEach((item, i) => {
          if (item.className === "playerImage") {
            fabricCanvas.remove(item);
          }
        });
        fabricCanvas.renderAll();
        var playerImage = new Image();
        playerImage.src = "${image}";
        playerImage.onload = () => {
          var image = new fabric.Image(playerImage, {
            top: ${coords.Top},
            left: ${coords.Left},
            className: "playerImage",
            originX: "center",
            originY: "top",
          });
          image.scaleToWidth(${coords.ScaleToWidth});
          
          fabricCanvas.add(image);
          fabricCanvas.renderAll();
        };
      `);
  }

  return {playerOptions, handleAddPlayerName, handleAddPlayerImage}
}

export default usePlayers
