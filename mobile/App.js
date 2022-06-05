import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';

import { Provider } from 'react-redux';
import Amplify, { Storage, Auth } from 'aws-amplify';
import { StorageChunkUpload } from 'amplify-s3-chunk-upload';
import { Credentials } from '@aws-amplify/core';
import store from './src/redux/store';

import MasterStack from './src/MasterStack';

import awsconfig from './src/aws-exports';
import { Colors } from './src/resources/project';

Amplify.configure(awsconfig);

// Configures Amplify plugin for uploading large videos
const storagePlugin = new StorageChunkUpload({}, Credentials);
Storage.addPluggable(storagePlugin);
storagePlugin.configure(awsconfig);

// App entry point. Configured only for navigation and authentication. Descend to TabNav for the next layer.
function App() {
  // Imports fonts for use across the app
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading autoHideSplash={false} />;
  }

  const AppTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Colors.Secondary,
    },
  };

  Auth.configure({
    authenticationFlowType: 'CUSTOM_AUTH',
  });

  return (
    <Provider store={store}>
      <NavigationContainer theme={AppTheme}>
        <MasterStack />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
