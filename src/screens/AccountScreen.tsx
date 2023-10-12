import React, { useContext } from 'react';
import { AccountScreenProps } from '../models/screen';
import { View } from 'react-native';
import { Text, Button } from '@rneui/themed';
import { AuthContext } from '../context/auth-context';
import { getAuth, signOut } from 'firebase/auth';

const AccountScreen: React.FC<AccountScreenProps> = () => {
  const { user } = useContext(AuthContext);

  return (
    <View>
      <Text h4>{user?.uid}</Text>
      <Button
        onPress={() => {
          signOut(getAuth());
        }}
        title="Sign Out"/>
    </View>
  );
};

export default AccountScreen;
