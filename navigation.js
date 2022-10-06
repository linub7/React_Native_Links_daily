import { NavigationContainer } from '@react-navigation/native';
import { ToastProvider } from 'react-native-toast-notifications';

import { AuthProvider } from './context/auth';
import ScreensNav from './routes/ScreensNav';

const RootNavigation = () => {
  return (
    <AuthProvider>
      <ToastProvider
        placement="top"
        duration={2000}
        animationType="zoom-in"
        animationDuration={250}
        successColor="green"
        dangerColor="red"
        warningColor="orange"
        normalColor="gray"
        offsetTop={60}
      >
        <NavigationContainer>
          <ScreensNav />
        </NavigationContainer>
      </ToastProvider>
    </AuthProvider>
  );
};

export default RootNavigation;
