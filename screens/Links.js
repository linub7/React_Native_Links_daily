import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useToast } from 'react-native-toast-notifications';

import FooterTabs from '../components/nav/footer/FooterTabs';
import { useAuth, useLinks } from '../hooks';
import { deleteMyLink, getMyLinks, updateMyLink } from '../api/link';
import UserProfileScreenLinks from '../components/user-profile/links';

const Links = () => {
  const [loading, setLoading] = useState(false);
  const [myLinks, setMyLinks] = useState([]);
  const { auth } = useAuth();
  const { links, setLinks } = useLinks();
  const toast = useToast();

  useEffect(() => {
    handleGetMyLinks();

    return () => {
      setMyLinks([]);
    };
  }, [links]);

  const handleGetMyLinks = async () => {
    setLoading(true);
    const { err, data } = await getMyLinks(auth?.token);
    if (err) {
      console.log(err);
      setLoading(false);
      return toast.show(err?.error, { type: 'danger' });
    }
    setLoading(false);
    setMyLinks(data?.links);
  };

  const handleUpdateLink = async (id) => {
    console.log('update: ', id);
    // setLoading(true);
    // const { err, data } = await updateMyLink(id, auth?.token);
    // if (err) {
    //   console.log(err);
    //   setLoading(false);
    //   return toast.show(err?.error, { type: 'danger' });
    // }
    // const idx = links?.findIndex(
    //   (item) => item?._id?.toString() === id?.toString()
    // );
    // myLinks[idx] = data?.link;
    // links[idx] = data?.link;
  };

  const handleDeleteLink = async (id) => {
    console.log('delete: ', id);
    setLoading(true);
    const { err, data } = await deleteMyLink(id, auth?.token);
    if (err) {
      console.log(err);
      setLoading(false);
      return toast.show(err?.error, { type: 'danger' });
    }
    setLoading(false);
    setLinks((links) => {
      const idx = links?.findIndex(
        (item) => item?._id?.toString() === id?.toString()
      );
      links.splice(idx, 1);
      return [...links];
    });
    setMyLinks((myLinks) => {
      const idx = myLinks?.findIndex(
        (item) => item?._id?.toString() === id?.toString()
      );
      myLinks.splice(idx, 1);
      return [...myLinks];
    });
    toast.show('deleted successfully', { type: 'success' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <UserProfileScreenLinks
        userLinks={myLinks}
        isVisible={false}
        handleDelete={handleDeleteLink}
        handleUpdate={handleUpdateLink}
        isIconVisible={true}
      />
      <View>
        <FooterTabs />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 90,
  },
});

export default Links;
