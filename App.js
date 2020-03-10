import * as React from 'react';
import { StyleSheet, Text, View,ScrollView,ImageBackground } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Index from './index'
import Detail from './detail'


const Stack = createStackNavigator();


export default function App() {
  return (
     
       <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Index"
          component={Index}
          options={{title: 'Forum'}}
        />
        <Stack.Screen 
        name="detail" 
        component={Detail}
        options={{title: 'Detail'}}
        />
      </Stack.Navigator>
    </NavigationContainer>


      
  );
}


