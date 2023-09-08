import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import usePromoCodeContext from '../hooks/usePromoCodeContext'

const PriceContainer = ({totalAmount, radioType, products, setProducts}) => {

  const {promoCode} = usePromoCodeContext();

  useEffect(() => {
    if (promoCode.products === 1) {
      const updatedProducts = [...products];
      const product = updatedProducts[0];
      if (product?.name === "Licencja MAX 1 miesiąc") { // Zastąp "desired_product_name" nazwą pożądanego produktu
        product.unitPrice = 5000 * (1 - promoCode.percentage / 100);
      }
      setProducts(updatedProducts);
    }
  },[promoCode, radioType])

  return (
   <View style={styles.container}>
    <Text style={styles.text}>{totalAmount/100} PLN</Text>
   </View>
  )
}

export default PriceContainer


const styles = StyleSheet.create({
  container: {
    height: 80, 
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    fontFamily: "Poppins_Medium",
  }
})