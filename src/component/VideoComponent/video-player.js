/** @format */

import React, { useState } from 'react';

import { Alert, StyleSheet } from 'react-native';
import Video from 'react-native-fast-video';
import PropTypes from 'prop-types';
import { videoUrl } from './constant';

const bufferConfig = {
	minBufferMs: 15000,
	maxBufferMs: 50000,
	bufferForPlaybackMs: 2500,
	bufferForPlaybackAfterRebufferMs: 5000,
};

const VideoPlayer = ({ isBufferingCallBack, videoRefHandler, volume, src }) => {
	const [state, setState] = useState({
		muted: true,
		ScreenOrientation: 'PORTRAIT',
		videoBuffering: false,
		fullScreen: false,
	});

	return (
		<Video
			source={{ uri: src }} // Can be a URL or a local file.
			onBuffer={({ isBuffering }) => {
				console.log({ isBuffering });
				setState({ ...state, videoBuffering: isBuffering });
				isBufferingCallBack(isBuffering);
			}}
			onError={(error) =>
				Alert.alert('Error', JSON.stringify(error), [
					{
						text: 'Cancel',
						onPress: () => Alert.alert('Cancel Pressed'),
						style: 'cancel',
					},
				])
			}
			style={styles.backgroundVideo}
			bufferConfig={bufferConfig}
			controls={true}
			ignoreSilentSwitch={'ignore'} //'obey' check mobile device is silent or not
			mixWithOthers={'mix'} //mix' duck
			muted={volume}
			playInBackground={true}
			playWhenInactive={true} //Determine whether the media should continue playing when notifications or the Control Center are in front of the video.
			poster={videoUrl}
			posterResizeMode='cover'
			resizeMode='cover'
			// onPlaybackRateChange={({ playbackRate }) => {
			// 	setState({ ...state, videoBuffering: playbackRate === 0 }); //1 for onplaying
			// }}
		/>
	);
};

VideoPlayer.PropTypes = {
	isBufferingCallBack: PropTypes.bool,
	videoRefHandler: PropTypes.object,
	volume: PropTypes.bool,
	src: PropTypes.string,
};
VideoPlayer.defaultProps = {
	isBufferingCallBack: false,
	videoRefHandler: null,
	volume: true,
	src: videoUrl,
};

var styles = StyleSheet.create({
	backgroundVideo: {
		width: '100%',
		height: '100%',
		backgroundColor: 'blue',
	},
});
export default React.memo(VideoPlayer);
