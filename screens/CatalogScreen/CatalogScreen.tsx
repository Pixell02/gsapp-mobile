import React from 'react'
import ScreenContainer from '../components/ScreenContainer';
import TopBar from '../components/TopBar';
import MainContent from '../components/MainContent';
import CatalogContent from './component/CatalogContent';
import { TeamProvider } from './context/TeamContext';



export default function CatalogScreen({navigation}): JSX.Element {
    
  return (
    <TeamProvider>
    <ScreenContainer>
      <TopBar />
      <MainContent>
        <CatalogContent />
      </MainContent>
      {/* <NavBar /> */}
    </ScreenContainer>
    </TeamProvider>
  )
}
