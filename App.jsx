import 'react-native-gesture-handler';

import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import AppRoutes from './app/navigation';
import Toast from 'react-native-toast-message';
import {COLORS} from './app/utils/theme';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      <GestureHandlerRootView style={{flex: 1}}>
        <BottomSheetModalProvider>
          <AppRoutes />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
