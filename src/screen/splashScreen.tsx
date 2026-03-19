import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../theme/colors';


const SplashScreen = () => {
    const navigation = useNavigation<any>();

    useEffect(() => {
      const timer = setTimeout(() => {
        navigation.replace('Home');
      }, 3000);
  
      return () => clearTimeout(timer);
    }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Splash Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:Colors.primary, // Optional: adds a clean background
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SplashScreen;