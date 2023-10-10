import React from 'react';
import MainContent from '../../components/MainContent';
import ScreenContainer from '../../components/ScreenContainer';
import TopBar from '../../components/TopBar';
import CatalogContent from './component/CatalogContent';
import { TeamProvider } from './context/TeamContext';



export default function CatalogScreen(): JSX.Element {
    
  return (
    <TeamProvider>
    <ScreenContainer>
      <TopBar />
      <MainContent>
        <CatalogContent />
      </MainContent>
    </ScreenContainer>
    </TeamProvider>
  )
}
