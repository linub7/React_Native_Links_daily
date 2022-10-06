import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Text from '@kaloraat/react-native-text';
import FooterTabsItem from './FooterTabsItem';
import { useNavigation, useRoute } from '@react-navigation/native';

const FooterTabs = () => {
  const { name } = useRoute();

  return (
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
      <FooterTabsItem
        tabLabel={'Account'}
        icon="person-outline"
        activeIcon="person"
        isActive={name === 'Account' ? true : false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    marginHorizontal: 30,
    justifyContent: 'space-between',
  },
});

export default FooterTabs;
