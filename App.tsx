import { Platform, StatusBar, StyleSheet, Text, View, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import RootNavigation from './src/navigation/RootNavigation';
import { store } from './src/redux/store';

export default function App() {
  LogBox.ignoreLogs(['Sending onAnimatedValueUpdate with no listeners registered']);
  return (
    <Provider store={store}>
      <StatusBar barStyle={"dark-content"} backgroundColor={"#fff"} />
      <View style={styles.container}>
        <RootNavigation />
      </View>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Platform.OS == "ios" ? 30 : 0
  },
});
