import { SafeAreaView, View } from 'react-native';
import Text from '@kaloraat/react-native-text';
import { WebView } from 'react-native-webview';
import { StyleSheet } from 'react-native';

const LinkView = ({ route }) => {
  const { params } = route;

  return (
    <WebView
      startInLoadingState
      source={{ uri: params?.item?.urlPreview?.ogUrl }}
    />
  );
};

export default LinkView;
