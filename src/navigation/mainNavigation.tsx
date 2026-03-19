import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your screens
import SplashScreen from '../screen/splashScreen'; 
import HomeScreen from '../screen/homeScreen';
import VideoListScreen from '../screen/listingVideo';
import CustomVideoPlayer from '../screen/videoPlayer';

const Stack = createNativeStackNavigator();

function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        {/* Hide header for Splash Screen */}
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="VideoList" component={VideoListScreen} />
        <Stack.Screen name="CustomVideoPlayer" component={CustomVideoPlayer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;