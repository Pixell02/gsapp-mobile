import React from 'react';
import { View } from 'react-native';
import useNavItems from '../hooks/useNavItems';
import NavBlock from './NavBlock';


const NavContainer = () => {

  const navItem = useNavItems();
  

  return (
    <View>
        {navItem.map((item, i: number) => (
          <NavBlock key={i} name={item.name} link={item.link} image={item.image} sign={item.sign} />
        ))}
    </View>
  )
}

export default NavContainer
