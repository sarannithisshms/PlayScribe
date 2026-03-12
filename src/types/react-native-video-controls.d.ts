declare module 'react-native-video-controls' {
    import { ComponentType } from 'react';
    import { VideoProperties } from 'react-native-video';
  
    const VideoPlayer: ComponentType<VideoProperties & any>;
    export default VideoPlayer;
  }