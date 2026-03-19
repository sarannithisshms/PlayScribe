import React, { useRef, useState, } from 'react';
import { View, StyleSheet, TouchableOpacity, Text ,StatusBar} from 'react-native';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import { useEffect } from 'react';
import Orientation from 'react-native-orientation-locker';
import colors from '../theme/colors';

export default function CustomVideoPlayer({ route }: any) {
  const { videoPath, videoName } = route.params;
  const playerRef = useRef<any>(null);

  const [paused, setPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    if (Orientation?.lockToLandscape) {
        Orientation.lockToLandscape();
      }
    setPaused(false); // auto play
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const finalPath = videoPath.startsWith('file://')
  ? videoPath
  : 'file://' + videoPath;

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Video
        ref={playerRef}
        source={{ uri:finalPath }}
        style={styles.video}
        resizeMode="contain"
        paused={paused}
        controls={false}
        onProgress={(data) => {
          if (!isSliding) {
            setCurrentTime(data.currentTime);
          }
        }}
        onLoad={(data) => setDuration(data.duration)}
      />

      <View style={styles.controls}>
      <Text>{videoName}</Text>
        <Slider
          style={{ width: '100%' }}
          minimumValue={0}
          maximumValue={duration}
          value={currentTime}
          onSlidingStart={() => setIsSliding(true)}
          onValueChange={(value) => {
            playerRef.current.seek(value);
          }}
          onSlidingComplete={(value) => {
            playerRef.current.seek(value);
            setIsSliding(false);
          }}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.sliderInactive}
          thumbTintColor={colors.white}
        />

        <View style={styles.timeRow}>
          <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>

        <View style={styles.buttonControl}>
          <TouchableOpacity onPress={() => playerRef.current.seek(currentTime - 10)}>
            <Text style={styles.controlText}>⏪ 10s</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setPaused(!paused)}>
            <Text style={styles.controlText}>
              {paused ? '▶️ Play' : '⏸ Pause'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => playerRef.current.seek(currentTime + 10)}>
            <Text style={styles.controlText}>10s ⏩</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  video: {
    //   width: '100%',
    //   height: 300,
    ...StyleSheet.absoluteFillObject,
  },
  controls: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    backgroundColor: 'transparent',
  },
  controlText: {
    color: colors.textPrimary,
    fontSize: 16,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  timeText: {
    color: colors.textPrimary,
  },
  subtitleContainer: {
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
  },
  subtitleText: {
    color: colors.textPrimary,
    fontSize: 18,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 6,
    borderRadius: 5,
  },
  buttonControl: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
});
