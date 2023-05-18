import { WebView } from 'react-native-webview';
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
