import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  margin: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
    width: "100%",
  },
  inputCenter: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    marginLeft: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#7f7f7f",
    padding: 10,
    width: "100%",
    height: 50,
    alignContent: "center",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  picker: {
    borderWidth: 1,
    marginTop: 20,
    borderColor: "#7f7f7f",
    padding: 10,
    width: "100%",
    height: 50,
    alignContent: "center",
    justifyContent: "center",
  },
});
