import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { createThumbnail } from 'react-native-create-thumbnail';
import Colors from '../theme/colors';
import { useNavigation } from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';
import { useFocusEffect } from '@react-navigation/native';
import CommonHeader from '../components/Header';


const VideoListScreen = ({ route }: any) => {
  const { videos = [], folderName } = route.params;
  const [videoList, setVideoList] = useState<any[]>([]);
  const navigation = useNavigation<any>();

  useEffect(() => {
    loadThumbnails();
  }, []);

 
  useFocusEffect(
    useCallback(() => {
      // 1. Lock to Portrait when the screen is focused
      Orientation.lockToPortrait();
      return () => {
      };
    }, [])
  );
  const loadThumbnails = async () => {
    const updatedVideos = await Promise.all(
      videos.map(async (video: any) => {
        try {
          const thumb = await createThumbnail({
            url: 'file://' + video.path,
          });

          return {
            ...video,
            thumbnail: thumb.path,
          };
        } catch {
          return {
            ...video,
            thumbnail: null,
          };
        }
      }),
    );

    setVideoList(updatedVideos);
  };

  return (
    <>
     <CommonHeader
        title={folderName}
        onSearchPress={() => console.log('Search clicked')}
      />
    <View style={styles.container}>
      <FlatList
        data={videoList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
            <TouchableOpacity
            style={styles.videoCard}
            onPress={() =>
              navigation.navigate('CustomVideoPlayer', {
                videoPath: item.path,
                videoName: item.name,
              })
            }
          >
            {item.thumbnail && (
              <Image
                source={{ uri: item.thumbnail }}
                style={styles.thumbnail}
              />
            )}
        
            <View style={styles.info}>
              <Text style={styles.videoName}>{item.name}</Text>
              <Text style={styles.videoSize}>
                {(item.size / 1024 / 1024).toFixed(2)} MB
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
    </>
  );
};

export default VideoListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: Colors.primary,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
  },
  videoCard: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  thumbnail: {
    width: 100,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  videoName: {
    fontSize: 16,
    fontWeight: '600',
  },
  videoSize: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
});