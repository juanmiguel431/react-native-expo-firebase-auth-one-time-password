import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Button, Input } from '@rneui/themed';

type LoginFormProps = {
  onSubmit: (phone: string, code: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');

  return (
    <View>
      <Text h1>Login Form</Text>
      <Input
        label="Phone Number"
        value={phone}
        onChangeText={setPhone}
      />
      <Input
        label="Code"
        value={code}
        onChangeText={setCode}
      />
      <Button
        title="Submit"
        onPress={() => {
          onSubmit(phone, code);
        }}
      />
    </View>
  )
};

export default LoginForm;
