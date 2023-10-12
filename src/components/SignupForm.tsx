import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Button, Input } from '@rneui/themed';

type SignupFormProps = {
  onSubmit: (phone: string) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit }) => {
  const [phone, setPhone] = useState('');

  return (
    <View>
      <Text h1>Sign up Form</Text>
      <Input
        label="Phone Number"
        textContentType="telephoneNumber"
        keyboardType="number-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <Button
        title="Submit"
        type="clear"
        onPress={() => {
          onSubmit(phone);
        }}
      />
    </View>
  )
};

export default SignupForm;
