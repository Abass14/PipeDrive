import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import config from './config';
import RootNavigation from './src/navigation/RootNavigation';
import { persistor, store } from './src/redux/store';

export default function App() {
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
