import { SafeAreaView, View } from 'react-native';
import Text from '@kaloraat/react-native-text';
import { WebView } from 'react-native-webview';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';

const LinkView = ({ route }) => {
  const [webLink, setWebLink] = useState('');
  const { params } = route;

  useEffect(() => {
    if (params?.item?.urlPreview?.ogUrl)
      setWebLink(params?.item?.urlPreview?.ogUrl);

    return () => {
      setWebLink('');
    };
  }, [params?.item]);

  return <WebView startInLoadingState source={{ uri: webLink }} />;
};

export default LinkView;
