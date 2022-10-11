import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Text from '@kaloraat/react-native-text';
import urlRegex from 'url-regex';
import ogs from '@uehreka/open-graph-scraper-react-native';

import FooterTabs from '../components/nav/footer/FooterTabs';
import SubmitButton from '../components/auth/SubmitButton';
import PreviewCard from '../components/post/PreviewCard';
import { useToast } from 'react-native-toast-notifications';
import { createLink } from '../api/link';
import { useAuth, useLinks } from '../hooks';

const Post = ({ navigation }) => {
  const [values, setValues] = useState({
    link: '',
    title: '',
  });
  const [loading, setLoading] = useState(false);
  const [urlPreview, setUrlPreview] = useState({});

  const toast = useToast();
  const { auth } = useAuth();
  const { links, setLinks } = useLinks();

  const handleChange = async (text) => {
    try {
      setLoading(true);
      setValues((currentValues) => {
        return {
          ...currentValues,
          link: text,
        };
      });

      if (urlRegex({ strict: false }).test(text)) {
        ogs({ url: text }, (error, results, response) => {
          if (results.success) {
            setUrlPreview(results);
          }
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!values.link || !values.title) {
      toast.show('Please provide correct link & title 😊', { type: 'warning' });
      return;
    }
    setLoading(true);
    const payload = {
      link: values.link,
      title: values.title,
      urlPreview,
    };
    const { err, data } = await createLink(payload, auth?.token);
    if (err) {
      console.log(err);
      toast.show(err?.error, { type: 'danger' });
      setLoading(false);
      return;
    }
    setLoading(false);
    setLinks([data?.link, ...links]);
    // update link context
    setTimeout(() => {
      toast.show('Link posted successfully 👌', { type: 'success' });
    }, 1000);
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text light center style={styles.text}>
          Past Website url
        </Text>
        <TextInput
          value={values?.link}
          onChangeText={(value) => handleChange(value)}
          placeholder="Paste the URL"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        <TextInput
          value={values?.title}
          onChangeText={(value) =>
            setValues((currentValues) => {
              return {
                ...currentValues,
                title: value,
              };
            })
          }
          placeholder="Enter a title"
          autoCapitalize="none"
          style={styles.input}
        />

        {urlPreview.success && (
          <View style={styles.previewCardContainer}>
            <PreviewCard {...urlPreview} />
          </View>
        )}

        {/* <Text>{JSON.stringify(urlPreview, null, 4)}</Text> */}

        <SubmitButton
          label={'Submit'}
          loading={loading}
          onPress={handleSubmit}
          additionalStyle={styles.submitButton}
        />
      </ScrollView>
      <View>
        <FooterTabs />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    paddingTop: 30,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    height: 50,
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 30,
    padding: 15,
  },
  submitButton: {
    marginTop: 20,
  },
  previewCardContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
});

export default Post;
