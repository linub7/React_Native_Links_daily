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

const Post = () => {
  const [values, setValues] = useState({
    link: '',
    title: '',
  });
  const [loading, setLoading] = useState(false);
  const [urlPreview, setUrlPreview] = useState({});

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
          console.log(results);
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

  const handleSubmit = () => {
    console.log({ values });
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
