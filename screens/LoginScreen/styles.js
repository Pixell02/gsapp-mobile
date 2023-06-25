import { StyleSheet } from "react-native";


export default StyleSheet.create({
  
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  container: {
    paddingTop: 30,
    height: "100%",
    alignItems: "center",
    width: 250
  },
  inputContainer: {
    marginTop: 10
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: 20,
    justifyContent: "space-between",
  },
  footerContainer: {
    height: "50%",
    justifyContent: "flex-end"
  },
  footer: {
    color: "#909090",
    fontSize: 10,
    textAlign: "center",
    fontFamily: "Poppins-SemiBold"
  }
})


