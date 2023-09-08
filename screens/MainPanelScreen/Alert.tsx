import React from 'react'
import { Text, View } from 'react-native'
import Title from '../components/Title'
import RoundedButton from '../components/RoundedButton'

const Alert = ({handlePressAlert}) => {
  return (
    <View>
      <Title name='Uwaga' />
      <View style={{margin: 5}}>
        <Text style={{fontFamily: "Poppins_Medium", fontSize: 15}}>
          Jeżeli jesteś już klientem posiadającym grafiki indywidualne i nie ładuje się elementy w panelu edycji, oznacza to że jeszcze nie 
          zostały one podłączone i należy je tworzyć w naszej aplikacji internetowej. Dokonamy wszelkich starań, aby jak najszybciej dodać możliwość ich tworzenia.
          Grafiki których się to głównie tyczy to terminarze, banery czy wyniki ligowe, czyli grafiki na których dodaje się wiele meczów, ale również tyczy się to pojedynczych zapowiedzi meczów.  
        </Text>
      </View>
      <View style={{width: "100%", alignItems: "center"}}>
        <View style={{width: "80%", marginTop: 50}}>
        <RoundedButton text='Zamknij' onPress={handlePressAlert} />
        </View>
      </View>
      
    </View>
  )
}

export default Alert
