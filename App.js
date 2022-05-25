import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/view/Login';
import RegistroScreen from './src/view/Registro'
import PrincipalScreen from './src/view/Principal';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='loginScreen'>
        <Stack.Screen name="loginScreen"      component={LoginScreen}     options={{ headerShown: false }} />
        <Stack.Screen name="registroScreen"   component={RegistroScreen}  options={{ title: 'Nueva cuenta' }} />
        <Stack.Screen name="principalScreen"  component={PrincipalScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;