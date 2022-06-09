import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  Main: NavigatorScreenParams<MainTabParamList>;
  Setting: NavigatorScreenParams<SettingParamList>;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type MainTabParamList = {
  Portfolio: NavigatorScreenParams<PortfolioParamList>;
  Home: NavigatorScreenParams<HomeParamList>;
  News: NavigatorScreenParams<NewsParamList>;
};

export type SettingParamList = {
  Overview: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ChangePassword: undefined;
  AuthSetting: undefined;
  EmailVerification: undefined;
  ScreenTheme: undefined;
  Language: undefined;
  Currency: undefined;
  LaunchScreen: undefined;
};

export type PortfolioParamList = {
  PortfolioOverview: undefined;
  AddNewCoin: undefined;
  PortfolioCoinDetail: NavigatorScreenParams<CoinDetailParamList>;
};

export type NewsParamList = {
  NewsOverview: undefined;
};

export type CoinDetailParams = { symbol: string; id: string };

export type HomeParamList = {
  CoinMarketHome: undefined;
  CoinDetail: NavigatorScreenParams<CoinDetailParamList>;
  NewCoin: undefined;
  CoinHighMarketCap: undefined;
  CoinHighVolume: undefined;
  Gainers: undefined;
  Losers: undefined;
  CoinSearch: undefined;
};

export type CoinDetailParamList = Record<
  'Overview' | 'Profile' | 'News' | 'Transactions' | 'Notice' | 'Discussion',
  CoinDetailParams
>;

export type MainTabScreenProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type SettingScreenProps<T extends keyof SettingParamList> =
  CompositeScreenProps<
    StackScreenProps<SettingParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type PortfolioScreenProps<T extends keyof PortfolioParamList> =
  CompositeScreenProps<
    StackScreenProps<PortfolioParamList, T>,
    MainTabScreenProps<'Portfolio'>
  >;

export type HomeScreenProps<T extends keyof HomeParamList> =
  CompositeScreenProps<
    StackScreenProps<HomeParamList, T>,
    MainTabScreenProps<'Home'>
  >;

export type NewsScreenProps<T extends keyof NewsParamList> =
  CompositeScreenProps<
    StackScreenProps<NewsParamList, T>,
    MainTabScreenProps<'News'>
  >;

export type CoinDetailScreenProps<T extends keyof CoinDetailParamList> =
  CompositeScreenProps<
    StackScreenProps<CoinDetailParamList, T>,
    HomeScreenProps<keyof HomeParamList>
  >;
