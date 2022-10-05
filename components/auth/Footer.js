import Text from '@kaloraat/react-native-text';

const Footer = ({ text, link, onPress }) => {
  return (
    <Text small center>
      {text}{' '}
      <Text onPress={onPress} color="#ff2222">
        {link}
      </Text>
    </Text>
  );
};

export default Footer;
