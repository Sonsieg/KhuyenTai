import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Colors from './src/assets/Colors';
import DashboardScreen from './src/screens/DashboardScreen';

const App: () => Node = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView>
        <StatusBar barStyle={'light-content'} />
        <View>
          <View style={styles.header}>
            <Text style={styles.title}>Bling Vision</Text>
          </View>
          <DashboardScreen />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    backgroundColor: Colors.GREEN,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: Colors.WHITE,
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'serif', // Hoặc có thể dùng font Google Fonts nếu tích hợp
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
