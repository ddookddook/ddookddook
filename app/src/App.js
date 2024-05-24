import React from 'react';
import StackNavigation from './navigation/StackNavigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import { Provider } from 'react-redux';
import Store from './redux/Store';

/**
 * Main App
 * @param props
 * @returns
 */

const queryClient = new QueryClient();


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={Store}>
      <QueryClientProvider client={queryClient}>
       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <StackNavigation />
      </QueryClientProvider>
    </Provider>
  );
};
export default App;
