import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Text from '@kaloraat/react-native-text';
import FooterTabsItem from './FooterTabsItem';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Divider } from 'react-native-elements';
import { useAuth } from '../../../hooks';
import { Image } from 'react-native';

const FooterTabs = () => {
  const { name } = useRoute();
  const navigation = useNavigation();

  const { auth } = useAuth();

  const handleNavigate = () => navigation.navigate('Account');

  return (
    <>
      <Divider width={1} />
      <View style={styles.container}>
        <FooterTabsItem
          tabLabel={'Home'}
          icon="md-home-outline"
          activeIcon="md-home"
          isActive={name === 'Home' ? true : false}
        />
        <FooterTabsItem
          tabLabel={'Post'}
          icon="add-circle-outline"
          activeIcon="add-circle"
          isActive={name === 'Post' ? true : false}
        />
        <FooterTabsItem
          tabLabel={'Links'}
          icon="list-outline"
          activeIcon="list"
          isActive={name === 'Links' ? true : false}
        />
        {auth?.user?.image?.url ? (
          <TouchableOpacity onPress={handleNavigate}>
            <Image
              source={{ uri: auth?.user?.image?.url }}
              style={styles.profile}
            />
          </TouchableOpacity>
        ) : (
          <FooterTabsItem
            tabLabel={'Account'}
            icon="person-outline"
            activeIcon="person"
            isActive={name === 'Account' ? true : false}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    marginHorizontal: 30,
    justifyContent: 'space-between',
  },
  profile: {
    height: 40,
    width: 40,
    borderRadius: 50,
    alignSelf: 'center',
  },
});

export default FooterTabs;
