import { Picker } from "@react-native-picker/picker";
import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import useLanguageContext from "../../../../../hooks/useLanguageContext";
import RadioContext from "../../../context/radioContext";
import useOpponents from "../../../hooks/useOpponents";
import useThemeOption from "../../../hooks/useThemeOption";
import translate from "../../../locales/translate.json";
const OpponentSelect = ({webViewRef, coords}) => {
  const { language } = useLanguageContext();
  const { opponentSelect, selectedOpponent, handleFetchOpponent } = useOpponents();
  const {selectedTheme} = useThemeOption();
  const { radioChecked } = useContext(RadioContext)
  useEffect(() => {
    if (webViewRef.current && selectedOpponent && coords.opponentImage) {
      webViewRef.current.injectJavaScript(`
        fabricCanvas._objects.forEach((item, i) => {
          if (item.className === "opponentLogo") {
            fabricCanvas.remove(item);
          }
        });
        fabricCanvas.renderAll();
        var opponentLogo = new Image();
        opponentLogo.src = "${selectedOpponent.img}";
        opponentLogo.onload = () => {
          var image = new fabric.Image(opponentLogo, {
            top: ${radioChecked === "radio1" ? coords.opponentImage.Top : coords.yourTeamLogo.Top},
            left: ${radioChecked === "radio1" ? coords.opponentImage.Left : coords.yourTeamLogo.Left},
            className: "opponentLogo",
            selectable: false,
            originX: "center",
            originY: "center",
          });
          
            image.scaleToHeight(${coords.opponentImage.ScaleToHeight});
          console.log(image.width * image.scaleX)
          if( image.width * image.scaleX > ${coords.opponentImage?.ScaleToWidth}){
            console.log("asd")
            image.scaleToWidth(${coords.opponentImage?.ScaleToWidth});
          }
          fabricCanvas.add(image);
          fabricCanvas.renderAll();
        };
      `);
    } 
    if(webViewRef.current && selectedOpponent && coords.opponentFirstName) {
      webViewRef.current.injectJavaScript(`
        fabricCanvas._objects.forEach((item, i) => {
          if (item.className === "opponentFirstName") {
            fabricCanvas.remove(item);
          }
        });
        fabricCanvas.renderAll();
        var themeOption = ${JSON.stringify(coords.opponentFirstName.themeOption)}
        var font = new FontFaceObserver("${coords.opponentFirstName.FontFamily}")
      font.load().then(() => {
          var text = new fabric.Text("${selectedOpponent.firstName}", {
            top: ${radioChecked === "radio1" ? coords.opponentFirstName.Top : coords.yourTeamFirstName.Top},
            left: ${radioChecked === "radio1" ? coords.opponentFirstName.Left : coords.yourTeamFirstName.Left},
            className: "opponentFirstName",
            selectable: false,
            fontFamily: "${coords.opponentFirstName.FontFamily}",
            fontSize: ${coords.opponentFirstName.FontSize},
            fill: "${coords.opponentFirstName.Fill}",
            originX: "${radioChecked === "radio1" ? coords.opponentFirstName.OriginX : coords.yourTeamFirstName.OriginX}",
            originY: "${radioChecked === "radio1" ? coords.opponentFirstName.OriginY : coords.yourTeamFirstName.OriginY}",
          });
          if(text.width > ${coords.opponentFirstName.ScaleToWidth}){
            text.scaleToWidth(${coords.opponentFirstName.ScaleToWidth});
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
   
    } if(webViewRef.current && selectedOpponent && coords.opponentSecondName) {
      webViewRef.current.injectJavaScript(`
        fabricCanvas._objects.forEach((item, i) => {
          if (item.className === "opponentSecondName") {
            fabricCanvas.remove(item);
          }
        });
        fabricCanvas.renderAll();
        var themeOption = ${JSON.stringify(coords.opponentSecondName.themeOption)}
        var font = new FontFaceObserver("${coords.opponentSecondName.FontFamily}")
      font.load().then(() => {
          var text = new fabric.Text("${selectedOpponent.secondName}", {
            top: ${radioChecked === "radio1" ? coords.opponentSecondName.Top : coords.yourTeamSecondName.Top},
            left: ${radioChecked === "radio1" ? coords.opponentSecondName.Left : coords.yourTeamSecondName.Left},
            className: "opponentSecondName",
            selectable: false,
            fontFamily: "${coords.opponentSecondName.FontFamily}",
            fontSize: ${coords.opponentSecondName.FontSize},
            fill: "${coords.opponentSecondName.Fill}",
            originX: "${radioChecked === "radio1" ? coords.opponentSecondName.OriginX : coords.yourTeamSecondName.OriginX}",
            originY: "${radioChecked === "radio1" ? coords.opponentSecondName.OriginY : coords.yourTeamSecondName.OriginY}",
          });
          if(text.width > ${coords.opponentSecondName.ScaleToWidth}){
            text.scaleToWidth(${coords.opponentSecondName.ScaleToWidth});
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
    } if(webViewRef.current && selectedOpponent && coords.opponentName) {
      webViewRef.current.injectJavaScript(`
        fabricCanvas._objects.forEach((item, i) => {
          if (item.className === "opponentName") {
            fabricCanvas.remove(item);
          }
        });
        fabricCanvas.renderAll();
        var themeOption = ${JSON.stringify(coords.opponentName.themeOption)}
        var font = new FontFaceObserver("${coords.opponentName.FontFamily}")
      font.load().then(() => {
          var text = new fabric.Text("${selectedOpponent.firstName + " " + selectedOpponent.secondName}", {
            top: ${radioChecked === "radio1" ? coords.opponentName.Top : coords.yourTeamName.Top},
            left: ${radioChecked === "radio1" ? coords.opponentName.Left : coords.yourTeamName.Left},
            className: "opponentName",
            selectable: false,
            fontFamily: "${coords.opponentName.FontFamily}",
            fontSize: ${coords.opponentName.FontSize},
            fill: "${coords.opponentName.Fill}",
            originX: "${radioChecked === "radio1" ? coords.opponentName.OriginX : coords.yourTeamName.OriginX}",
            originY: "${radioChecked === "radio1" ? coords.opponentName.OriginY : coords.yourTeamName.OriginY}",
          });
          if(text.width > ${coords.opponentName.ScaleToWidth}){
            text.scaleToWidth(${coords.opponentName.ScaleToWidth});
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
  },[selectedOpponent, radioChecked, selectedTheme])

  return (
   <>
    <View style={styles.text}>
      <Text style={styles.textStyle}>{translate.Opponents[language] || translate.Opponents["en"]}</Text>
    </View>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={selectedOpponent ? selectedOpponent.value : null} onValueChange={(value) => handleFetchOpponent(value)}>
          <Picker.Item 
          label=" "
          value=" "
          />
          {opponentSelect && opponentSelect.map((opponent, i) => (
            <Picker.Item
            key={i}
            label={opponent.firstName + " " + opponent.secondName}
            value={opponent.firstName + "..." + opponent.secondName + "..." + opponent.img}
            />
          ))}
        </Picker>
      </View>
    </>
  );
};

export default OpponentSelect;

const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#7f7f7f",
    justifyContent: "center",
    padding: 10,
    height: 40,
    width: "100%",
    marginTop: 10,
    marginBottom: 20,
  },
  text: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "65%",
  },
  textStyle: {
    fontFamily: "Poppins-SemiBold",
  }
});
