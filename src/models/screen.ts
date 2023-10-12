import { NativeStackScreenProps } from 'react-native-screens/native-stack';

export const enum SCREEN {
  Signin = 'Signin',
  MainFlow = 'MainFlow',
  LoginFlow = 'LoginFlow',
  ResolveAuth = 'ResolveAuth',
  Account = 'Account',
}

export type RootStackParamList = {
  [SCREEN.Signin]: undefined;
  [SCREEN.MainFlow]: undefined;
  [SCREEN.LoginFlow]: undefined;
  [SCREEN.ResolveAuth]: undefined;
  [SCREEN.Account]: undefined;
};

export type MainFlowScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.MainFlow>;
export type LoginFlowScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.LoginFlow>;
export type ResolveAuthScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.ResolveAuth>;

export type SigninScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.Signin>;
export type AccountScreenProps = NativeStackScreenProps<RootStackParamList, SCREEN.Account>;
