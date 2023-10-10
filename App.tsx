import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import axios, { AxiosError } from 'axios';
import SignupForm from './src/components/SignupForm';
import LoginForm from './src/components/LoginForm';
import { useEffect } from 'react';
import { initializeAuth, getReactNativePersistence, getAuth, signInWithCustomToken } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

type Response = {
  token: string;
}

export default function App() {

  useEffect(() => {
    // Your web app's Firebase configuration // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      databaseURL: process.env.DATABASE_URL,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    // https://stackoverflow.com/questions/76914913/cannot-import-getreactnativepersistence-in-firebase10-1-0
    initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });
  }, []);

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

              const userCredential = await signInWithCustomToken(getAuth(), data.token);

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
