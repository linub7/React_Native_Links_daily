import { NavigationContainer } from '@react-navigation/native';
import { ToastProvider } from 'react-native-toast-notifications';

import { AuthProvider } from './context/auth';
import { LinkProvider } from './context/link';
import ScreensNav from './routes/ScreensNav';

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <LinkProvider>
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
            <ScreensNav />
          </ToastProvider>
        </LinkProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default RootNavigation;
