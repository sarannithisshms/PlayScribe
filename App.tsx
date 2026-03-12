/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme, } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import VideoScreen from './src/screen/videoPlayer';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <VideoScreen/>
    </SafeAreaProvider>
  );
}



export default App;
