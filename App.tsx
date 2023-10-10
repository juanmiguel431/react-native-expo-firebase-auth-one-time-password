import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SignupForm from './src/components/SignupForm';
import axios, { AxiosError } from 'axios';
import LoginForm from './src/components/LoginForm';

type Response = {
  token: string;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <SignupForm
          onSubmit={async (phone) => {
            try {
              await axios.post('https://createuser-jc7q5p2tqq-uc.a.run.app', { phone });
              await axios.post('https://requestonetimepassword-jc7q5p2tqq-uc.a.run.app', { phone });
            } catch (e) {
              if (e instanceof AxiosError) {
                console.log(e.response?.data);
              }
            }
          }}
        />

        <LoginForm
          onSubmit={async (phone, code) => {
            try {
              const response = await axios.post('https://verifyonetimepassword-jc7q5p2tqq-uc.a.run.app ', { phone, code });
              const data = response.data as Response;

            } catch (e) {
              if (e instanceof AxiosError) {
                console.log(e.response?.data);
              }
            }
          }}
        />
        <StatusBar style="auto"/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
