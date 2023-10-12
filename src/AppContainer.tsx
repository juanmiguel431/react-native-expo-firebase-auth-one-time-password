import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList, SCREEN } from './models/screen';
import SignScreen from './screens/SignScreen';
import AccountScreen from './screens/AccountScreen';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './context/auth-context';
import ResolveAuthScreen from './screens/ResolveAuthScreen';

const Stack = createStackNavigator<RootStackParamList>();

const LoginFlow: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName={SCREEN.Signin}>
      <Stack.Screen name={SCREEN.Signin} component={SignScreen} options={{ title: 'Login' }}/>
    </Stack.Navigator>
  );
};

const MainFlow: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName={SCREEN.Account}>
      <Stack.Screen name={SCREEN.Account} component={AccountScreen} options={{ title: 'Account' }}/>
    </Stack.Navigator>
  );
};

const resolveAuth = (isSignedIn: boolean | null) => {
  switch (isSignedIn) {
    case true:
      return <Stack.Screen name={SCREEN.MainFlow} component={MainFlow} options={{ headerShown: false }}/>;
    case false:
      return <Stack.Screen name={SCREEN.LoginFlow} component={LoginFlow} options={{ headerShown: false }}/>;
    default:
      return <Stack.Screen name={SCREEN.ResolveAuth} component={ResolveAuthScreen} options={{ headerShown: false }}/>
  }
};

const AppContainer: React.FC = () => {
  const { isLogin } = useContext(AuthContext);

  return (
    <React.Fragment>
      <StatusBar style="auto"/>
      <NavigationContainer>
        <Stack.Navigator>
          {resolveAuth(isLogin)}
        </Stack.Navigator>
      </NavigationContainer>
    </React.Fragment>
  );
};

export default AppContainer;
