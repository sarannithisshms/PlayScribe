import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import RNFS from 'react-native-fs';
import CommonLoader from '../components/CommonLoader';
import { useNavigation } from '@react-navigation/native';
import Colors from '../theme/colors';


const VideoFoldersOnly = () => {
  const [folders, setFolders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const permission =
        Platform.Version >= 33
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO
          : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

      const granted = await PermissionsAndroid.request(permission);

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        scanFolders();
      }
    } else {
      scanFolders();
    }
  };

  const scanFolders = async () => {
    const folderMap: any = {};

    const scan = async (path: string) => {
      

      try {
        const items = await RNFS.readDir(path);

        for (const item of items) {
          if (item.isDirectory()) {
            await scan(item.path);
          } else {
            if (
              item.name.endsWith('.mp4') ||
              item.name.endsWith('.mkv') ||
              item.name.endsWith('.avi') ||
              item.name.endsWith('.mov')
            ) {
              const folderPath = item.path.substring(
                0,
                item.path.lastIndexOf('/'),
              );

              if (!folderMap[folderPath]) {
                folderMap[folderPath] = [];
              }

              folderMap[folderPath].push(item);
            }
          }
        }
      } catch (error) {
        console.log('Skip:', path);
      }
    };

    await scan(RNFS.ExternalStorageDirectoryPath);
    setLoading(true);
    const folderArray = Object.keys(folderMap).map(path => ({
      name: path.split('/').pop(),
      count: folderMap[path].length,
      path,
      files: folderMap[path],
    }));

    setFolders(folderArray);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {loading && <CommonLoader />}
      <FlatList
        data={folders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate('VideoList', {
              videos: item.files,
              folderName: item.name,
            })
          }
        >
          <Text style={styles.icon}>📁</Text>
          <View>
            <Text style={styles.folderName}>{item.name}</Text>
            <Text style={styles.count}>{item.count} Videos</Text>
          </View>
        </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default VideoFoldersOnly;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    padding: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  icon: {
    fontSize: 42,
    marginRight: 15,
  },
  folderName: {
    fontSize: 20,
    fontWeight: '600',
  },
  count: {
    fontSize: 15,
    color: '#888',
  },
});
