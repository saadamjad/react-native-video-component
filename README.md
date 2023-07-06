# React Native Component: VideoScreen

The `VideoScreen` component is a React Native component that allows playing videos with various functionalities. It utilizes the `react-native-fast-video` and `react-native-orientation-locker` libraries to enhance video playback and control screen orientation.

## Installation

To use the `VideoScreen` component, follow these steps:

1. Install the required libraries:
   - `react-native-fast-video`
   - `react-native-orientation-locker`

2. Import the necessary components:
   ```javascript
   import React, { useCallback, useRef, useState } from 'react';
   import { OrientationLocker } from 'react-native-orientation-locker';
   import { ActivityIndicator, StyleSheet, View, Platform } from 'react-native';
   import MuteUnmute from './mute-unmute';
   import { FullScreenHandler } from './full-screen';
   import VideoDescription from './video-description';
   import ScreenOrientationComponent from './orientation';
   import VideoPlayer from './video-player';
   ```

3. Define the `VideoScreen` component in your project.

## Usage

The `VideoScreen` component provides the following functionalities:

1. Play any video.
2. Mute and unmute the video.
3. Enter fullscreen mode.
4. Support for both portrait and landscape orientations.
5. Pause and unpause the video.

To use the `VideoScreen` component, create an instance of it in your app and customize the props as needed:

```javascript
const App = () => {
  return (
    <View>
      {/* Other components */}
      <VideoScreen
        isVideoDescriptionShown={true}  // Show video description
        isShownScreenOrientation={true} // Show screen orientation options
      />
    </View>
  );
};
```

## Component Structure

The `VideoScreen` component is composed of the following sub-components:

- `MuteUnmute`: A component to handle mute and unmute functionality.
- `FullScreenHandler`: A component to handle fullscreen mode.
- `VideoDescription`: A component to display video description.
- `ScreenOrientationComponent`: A component to handle screen orientation changes.
- `VideoPlayer`: The main video player component.

## Example Code

```javascript
import React, { useCallback, useRef, useState } from 'react';
import { OrientationLocker } from 'react-native-orientation-locker';
import { ActivityIndicator, StyleSheet, View, Platform } from 'react-native';
import MuteUnmute from './mute-unmute';
import { FullScreenHandler } from './full-screen';
import VideoDescription from './video-description';
import ScreenOrientationComponent from './orientation';
import VideoPlayer from './video-player';

const VideoScreen = ({
  isVideoDescriptionShown = true,
  isShownScreenOrientation = true,
}) => {
  let videoRef = useRef('');
  const portrait = 'PORTRAIT';
  const [state, setState] = useState({
    muted: true,
    ScreenOrientation: 'PORTRAIT',
    videoBuffering: false,
    fullScreen: false,
  });

  const isLandScape = state.ScreenOrientation != portrait;
  const isAndroid = Platform.OS === 'android';

  const loader = useCallback(() => {
    if (state.videoBuffering)
      return (
        <ActivityIndicator
          size={'large'}
          color={'black'}
        />
      );
    return;
  }, [state.videoBuffering]);

  const renderMuteUnmuteComponent = () => {
    return (
      <MuteUnmute
        volumeCallBack={(res) => setState({ ...state, muted: !res })}
      />
    );
  };

  const renderScreenOrientationOrPortraite = () => (
    <ScreenOrientationComponent
      screenOrientationCallBack={(res

) =>
        setState({
          ...state,
          ScreenOrientation: res,
        })
      }
    />
  );
  const renderFullScreenMode = () => (
    <FullScreenHandler
      fullScreenHanlderCall={(res) => {
        setState({
          ...state,
          fullScreen: res,
        });
      }}
    />
  );

  const ScreenOrientationHanlder = useCallback(() => {
    if (isShownScreenOrientation)
      return (
        <OrientationLocker
          orientation={state.ScreenOrientation}
          onChange={(orientation) => console.log('onChang e', orientation)}
          onDeviceChange={(orientation) => {
            setState({ ...state, ScreenOrientation: orientation });
          }}
        />
      );
  }, [state.ScreenOrientation, isShownScreenOrientation]);

  return (
    <View style={styles.container}>
      {isAndroid && ScreenOrientationHanlder()}
      <View
        style={{
          height: state.fullScreen || isLandScape ? '100%' : '60%',
          width: '100%',
        }}>
        {isAndroid && renderMuteUnmuteComponent()}

        {isAndroid && renderScreenOrientationOrPortraite()}
        {isAndroid && renderFullScreenMode()}
        <VideoPlayer
          volume={state.muted}
          videoRefHandler={videoRef}
          isBufferingCallBack={(res) =>
            setState({ ...state, videoBuffering: res })
          }
        />
      </View>
      {isVideoDescriptionShown && <VideoDescription />}
      {loader()}
    </View>
  );
};

var styles = StyleSheet.create({
  backgroundVideo: {
    width: '100%',
    height: '100%',
  },
  container: {
    overflow: 'hidden',
    flex: 1,
  },
});

export { VideoScreen };
```

Please note that you may need to import additional dependencies and customize the component according to your project's requirements.