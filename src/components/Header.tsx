import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../theme/colors';


type Props = {
  title: string;
  showBack?: boolean;
  onSearchPress?: () => void;
};

const CommonHeader = ({ title, showBack = true, onSearchPress }: Props) => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      {showBack ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" color={Colors.primary} size={24} />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 30 }} />
      )}

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity onPress={onSearchPress}>
        <Feather name="search" size={22} color={Colors.primary}  />
      </TouchableOpacity>
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  back: {
    fontSize: 24,
    color: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  search: {
    fontSize: 22,
    color: '#fff',
  },
});
