import { Button, Platform, StyleSheet, Text, View } from 'react-native';
import * as ExpoWidgetsModule from '@bittingz/expo-widgets';
import Constants from 'expo-constants';

// Import the extensions to register them
import './expo-widgets-extension';

/*
  A super simple example of using widgets

  For multiple widget support, the android setWidgetData now needs a package
  parameter passed as the second argument.

  To run this locally you can do the following in the example project folder

  > npm run prebuild:ios
  > npm run ios
  
  and
  > npm run prebuild:android
  > npm run android
*/
export default function App() {
  function sendWidgetData() {
    const androidPackage = Constants.expoConfig?.android?.package;

    if (Platform.OS === 'ios') {
      const json = JSON.stringify({ message: 'Hello from app!' });
      ExpoWidgetsModule.setWidgetData(json);
    } else if (androidPackage) {
      const json = JSON.stringify({ message: 'Hello from app!' });
      ExpoWidgetsModule.setWidgetData(json, androidPackage);
    }
  }

  function deleteWidgetData() {
    // Now we can safely call the extended method with full type safety
    ExpoWidgetsModule.default.fns.deleteWidgetData();
  }

  function clearWidgetData() {
    ExpoWidgetsModule.default.fns.clearAllWidgetData();
  }

  return (
    <View style={styles.container}>
      <Text>Example App!</Text>
      <Button title='Send Widget Data!' onPress={sendWidgetData} />
      <Button title='Delete Widget Data!' onPress={deleteWidgetData} />
      <Button title='Clear All Widget Data!' onPress={clearWidgetData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
