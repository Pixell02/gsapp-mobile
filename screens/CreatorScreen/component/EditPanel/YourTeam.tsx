import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import translate from "../../locales/translate.json";
import { LanguageContext } from "../../../../context/LanguageContext";
import { Picker } from "@react-native-picker/picker";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useCollection } from "../../../../hooks/useCollection";
import useYourTeam from "../../hooks/useYourTeam";
import RadioContext from "../../context/radioContext";
const YourTeam = ({ webViewRef, coords }) => {
  const { language } = useContext(LanguageContext);
  const { yourTeams, selectedTeam, handleSelectTeam } = useYourTeam();
  const { radioChecked } = useContext(RadioContext);
  console.log(coords)
  useEffect(() => {
    if (webViewRef.current && selectedTeam && coords.yourTeamLogo) {
      webViewRef.current.injectJavaScript(`
        fabricCanvas._objects.forEach((item, i) => {
          if (item.className === "yourTeamLogo") {
            fabricCanvas.remove(item);
          }
        });
        fabricCanvas.renderAll();
        var yourTeamLogo = new Image();
        yourTeamLogo.src = "${selectedTeam.img}";
        yourTeamLogo.onload = () => {
          var image = new fabric.Image(yourTeamLogo, {
            top: ${radioChecked === "radio1" ? coords.yourTeamLogo.Top : coords.opponentImage.Top},
            left: ${radioChecked === "radio1" ? coords.yourTeamLogo.Left : coords.opponentImage.Left},
            className: "yourTeamLogo",
            selectable: false,
            originX: "center",
            originY: "center",
          });
          image.scaleToHeight(${coords.yourTeamLogo.ScaleToHeight});
         
          fabricCanvas.add(image);
          fabricCanvas.renderAll();
        };
      `);
    } 
    if(webViewRef.current && selectedTeam && coords.yourTeamFirstName) {
      webViewRef.current.injectJavaScript(`
        fabricCanvas._objects.forEach((item, i) => {
          if (item.className === "yourTeamFirstName") {
            fabricCanvas.remove(item);
          }
        });
        fabricCanvas.renderAll();
          var text = new fabric.Text("${selectedTeam.firstName}", {
            top: ${radioChecked === "radio1" ? coords.yourTeamFirstName.Top : coords.opponentFirstName.Top},
            left: ${radioChecked === "radio1" ? coords.yourTeamFirstName.Left : coords.opponentFirstName.Left},
            className: "yourTeamFirstName",
            selectable: false,
            fontFamily: "${coords.yourTeamFirstName.FontFamily}",
            fontSize: ${coords.yourTeamFirstName.FontSize},
            fill: "${coords.yourTeamFirstName.Fill}",
            originX: "${radioChecked === "radio1" ? coords.yourTeamFirstName.OriginX : coords.opponentFirstName.OriginX}",
            originY: "${radioChecked === "radio1" ? coords.yourTeamFirstName.OriginY : coords.opponentFirstName.OriginY}",
          });
          if(text.width > ${coords.yourTeamFirstName.ScaleToWidth}){
            text.scaleToWidth(${coords.yourTeamFirstName.ScaleToWidth});
          }
          fabricCanvas.add(text);
          fabricCanvas.renderAll();
      `);
   
    } if(webViewRef.current && selectedTeam && coords.yourTeamSecondName) {
      webViewRef.current.injectJavaScript(`
        fabricCanvas._objects.forEach((item, i) => {
          if (item.className === "yourTeamSecondName") {
            fabricCanvas.remove(item);
          }
        });
        fabricCanvas.renderAll();
          var text = new fabric.Text("${selectedTeam.secondName}", {
            top: ${radioChecked === "radio1" ? coords.yourTeamSecondName.Top : coords.opponentSecondName.Top},
            left: ${radioChecked === "radio1" ? coords.yourTeamSecondName.Left : coords.opponentSecondName.Left},
            className: "yourTeamSecondName",
            selectable: false,
            fontFamily: "${coords.yourTeamSecondName.FontFamily}",
            fontSize: ${coords.yourTeamSecondName.FontSize},
            fill: "${coords.yourTeamSecondName.Fill}",
            originX: "${radioChecked === "radio1" ? coords.yourTeamSecondName.OriginX : coords.opponentSecondName.OriginX}",
            originY: "${radioChecked === "radio1" ? coords.yourTeamSecondName.OriginY : coords.opponentSecondName.OriginY}",
          });
          if(text.width > ${coords.yourTeamSecondName.ScaleToWidth}){
            text.scaleToWidth(${coords.yourTeamSecondName.ScaleToWidth});
          }
          fabricCanvas.add(text);
          fabricCanvas.renderAll();
      `);
    } if(webViewRef.current && selectedTeam && coords.yourTeamName) {
      webViewRef.current.injectJavaScript(`
      fabricCanvas._objects.forEach((item, i) => {
        if (item.className === "yourTeamName") {
          fabricCanvas.remove(item);
        }
      });
      fabricCanvas.renderAll();
        var text = new fabric.Text("${selectedTeam.firstName + " " + selectedTeam.secondName}", {
          top: ${radioChecked === "radio1" ? coords.yourTeamName.Top : coords.opponentName.Top},
          left: ${radioChecked === "radio1" ? coords.yourTeamName.Left : coords.opponentName.Left},
          className: "yourTeamName",
          selectable: false,
          fontFamily: "${coords.yourTeamName.FontFamily}",
          fontSize: ${coords.yourTeamName.FontSize},
          fill: "${coords.yourTeamName.Fill}",
          originX: "${radioChecked === "radio1" ? coords.yourTeamName.OriginX : coords.opponentName.OriginX}",
          originY: "${radioChecked === "radio1" ? coords.yourTeamName.OriginY : coords.opponentName.OriginY}",
        });
        if(text.width > ${coords.yourTeamName.ScaleToWidth}){
          text.scaleToWidth(${coords.yourTeamName.ScaleToWidth});
        }
        fabricCanvas.add(text);
        fabricCanvas.renderAll();
    `);
    }
  }, [selectedTeam, radioChecked]);

  return (
    <>
      {yourTeams && yourTeams.length > 1 && (
        <View style={{ width: "65%" }}>
          <Text style={styles.textStyle}>{translate.yourTeam[language]}</Text>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={selectedTeam ? selectedTeam.value : ""} onValueChange={(value) => handleSelectTeam(value)}>
              <Picker.Item label=" " value=" " />
              {yourTeams.map((team, i) => (
                <Picker.Item
                  key={i}
                  label={team.firstName + " " + team.secondName}
                  value={team.firstName + "..." + team.secondName + "..." + team.img}
                />
              ))}
            </Picker>
          </View>
        </View>
      )}
    </>
  );
};

export default YourTeam;

const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    padding: 10,
    height: 40,
    width: "100%",
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 10,
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
