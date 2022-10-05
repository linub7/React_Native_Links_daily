import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Text from '@kaloraat/react-native-text';
import CircleLogo from '../CircleLogo';

const AuthCommonLayout = ({ children, pageTitle }) => {
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <CircleLogo />
        <Text title center>
          {pageTitle}
        </Text>

        {children}
      </View>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  innerContainer: {
    marginVertical: 100,
  },
});

export default AuthCommonLayout;
