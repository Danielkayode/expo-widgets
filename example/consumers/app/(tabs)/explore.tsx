import { Platform, StyleSheet, View, Text, Button } from 'react-native';
import { ExtendedExpoWidgets } from '../../expo-widgets-extension';
import Constants from 'expo-constants';

function sendWidgetData() {
  const androidPackage = Constants.expoConfig?.android?.package;

  if (Platform.OS === 'ios') {
    const json = JSON.stringify({ message: 'Hello from app!' });
    ExtendedExpoWidgets.setWidgetData(json);
  } else if (androidPackage) {
    const json = JSON.stringify({ message: 'Hello from app!' });
    ExtendedExpoWidgets.setWidgetData(json, androidPackage);
  }
}

function sendWidgetDataWithRetry() {
  const androidPackage = Constants.expoConfig?.android?.package;
  const json = JSON.stringify({ message: 'Hello from app with retry!' });

  if (Platform.OS === 'ios') {
    ExtendedExpoWidgets.setWidgetDataWithRetry(json, undefined, 3);
  } else if (androidPackage) {
    ExtendedExpoWidgets.setWidgetDataWithRetry(json, androidPackage, 3);
  }
}

// TODO: implement in android
function clearAllWidgetData() {
  ExtendedExpoWidgets.clearAllWidgetData();
}

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text>Example App!</Text>
      <Button title='Send Widget Data!' onPress={sendWidgetData} />
      <Button
        title='Send Widget Data with Retry!'
        onPress={sendWidgetDataWithRetry}
      />
      <Button title='Delete Widget Data!' onPress={clearAllWidgetData} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
