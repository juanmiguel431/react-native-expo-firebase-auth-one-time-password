import React from 'react';
import SignupForm from './components/SignupForm';
import axios, { AxiosError } from 'axios';
import LoginForm from './components/LoginForm';
import { getAuth, signInWithCustomToken } from 'firebase/auth';

type Response = {
  token: string;
}

const AppContainer: React.FC = () => {
  return (
    <>
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
    </>
  );
};

export default AppContainer;
