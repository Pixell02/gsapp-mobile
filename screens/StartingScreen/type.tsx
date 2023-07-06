import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  StartingScreen: undefined;
  Login: undefined;
  Register: undefined;
  MainScreen: undefined;
  CatalogScreen: undefined;
  CreatorScreen: any;
  YourCatalogScreen: undefined;
  PlayersScreen: undefined;
  OpponentsScreen: undefined;
  AccountScreen: undefined;
  OfferScreen: undefined;
  GuideScreen: undefined;
};

export type RootStackNavProps<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};
