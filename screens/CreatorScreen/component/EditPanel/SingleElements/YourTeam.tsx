import { Picker } from "@react-native-picker/picker";
import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import useLanguageContext from "../../../../../hooks/useLanguageContext";
import RadioContext from "../../../context/radioContext";
import { ThemeOptionContext } from "../../../context/themeOptionContext";
import useYourTeam from "../../../hooks/useYourTeam";
import translate from "../../../locales/translate.json";
const YourTeam = ({ webViewRef, coords }) => {
  const { language } = useLanguageContext();
  const { yourTeams, selectedTeam, handleSelectTeam } = useYourTeam();
  const { selectedTheme } = useContext(ThemeOptionContext);
  const { radioChecked } = useContext(RadioContext);

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
          if(${coords.yourTeamLogo?.ScaleToWidth}){
            if (image.width * image.scaleX > ${coords.yourTeamLogo.ScaleToWidth}) {
              image.scaleToWidth(${coords.yourTeamLogo?.ScaleToWidth});
            }
          }
          fabricCanvas.add(image);
          fabricCanvas.renderAll();
        };
      `);
    }

    if (webViewRef.current && selectedTeam && coords.yourTeamFirstName) {
      webViewRef.current.injectJavaScript(`
        fabricCanvas._objects.forEach((item, i) => {
          if (item.className === "yourTeamFirstName") {
            fabricCanvas.remove(item);
          }
        });
        fabricCanvas.renderAll();
        var themeOption = ${JSON.stringify(coords.yourTeamFirstName.themeOption)}
        var font = new FontFaceObserver("${coords.yourTeamFirstName.FontFamily}")
      font.load().then(() => {
           var text = new fabric.Text("${selectedTeam.firstName}", {
            top: ${radioChecked === "radio1" ? coords.yourTeamFirstName.Top : coords.opponentFirstName.Top},
            left: ${radioChecked === "radio1" ? coords.yourTeamFirstName.Left : coords.opponentFirstName.Left},
            className: "yourTeamFirstName",
            selectable: false,
            fontFamily: "${coords.yourTeamFirstName.FontFamily}",
            fontSize: ${coords.yourTeamFirstName.FontSize},
            fill: "${coords.yourTeamFirstName.Fill}",
            originX: "${
              radioChecked === "radio1" ? coords.yourTeamFirstName.OriginX : coords.opponentFirstName.OriginX
            }",
            originY: "${
              radioChecked === "radio1" ? coords.yourTeamFirstName.OriginY : coords.opponentFirstName.OriginY
            }",
          });
          if(text.width > ${coords.yourTeamFirstName.ScaleToWidth}){
            text.scaleToWidth(${coords.yourTeamFirstName.ScaleToWidth});
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
    if (webViewRef.current && selectedTeam && coords.yourTeamSecondName) {
      webViewRef.current.injectJavaScript(`
        fabricCanvas._objects.forEach((item, i) => {
          if (item.className === "yourTeamSecondName") {
            fabricCanvas.remove(item);
          }
        });
        fabricCanvas.renderAll();
        var themeOption = ${JSON.stringify(coords.yourTeamSecondName.themeOption)}
        var font = new FontFaceObserver("${coords.yourTeamSecondName.FontFamily}")
      font.load().then(() => {
          var text = new fabric.Text("${selectedTeam.secondName}", {
            top: ${radioChecked === "radio1" ? coords.yourTeamSecondName.Top : coords.opponentSecondName.Top},
            left: ${radioChecked === "radio1" ? coords.yourTeamSecondName.Left : coords.opponentSecondName.Left},
            className: "yourTeamSecondName",
            selectable: false,
            fontFamily: "${coords.yourTeamSecondName.FontFamily}",
            fontSize: ${coords.yourTeamSecondName.FontSize},
            fill: "${coords.yourTeamSecondName.Fill}",
            originX: "${
              radioChecked === "radio1" ? coords.yourTeamSecondName.OriginX : coords.opponentSecondName.OriginX
            }",
            originY: "${
              radioChecked === "radio1" ? coords.yourTeamSecondName.OriginY : coords.opponentSecondName.OriginY
            }",
          });
          if(text.width > ${coords.yourTeamSecondName.ScaleToWidth}){
            text.scaleToWidth(${coords.yourTeamSecondName.ScaleToWidth});
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
    if (webViewRef.current && selectedTeam && coords.yourTeamName) {
      webViewRef.current.injectJavaScript(`
      fabricCanvas._objects.forEach((item, i) => {
        if (item.className === "yourTeamName") {
          fabricCanvas.remove(item);
        }
      });
      fabricCanvas.renderAll();
      var themeOption = ${JSON.stringify(coords.yourTeamName.themeOption)}
      var font = new FontFaceObserver("${coords.yourTeamName.FontFamily}")
      font.load().then(() => {
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
  }, [selectedTeam, radioChecked, selectedTheme]);

  return (
    <>
     { (coords?.yourTeamName || coords?.yourTeamSecondName || coords?.yourTeamFirstName || coords?.yourTeamLogo) && (
       <View style={{ width: "100%" }}>
          <Text style={styles.textStyle}>{translate.yourTeam[language] || translate.yourTeam["en"]}</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedTeam ? selectedTeam.value : ""}
              onValueChange={(value) => handleSelectTeam(value)}
            >
              <Picker.Item label=" " value=" " />
              {yourTeams && yourTeams.map((team, i) => (
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
    width: "100%",
  },
  textStyle: {
    fontFamily: "Poppins-SemiBold",
  },
});
