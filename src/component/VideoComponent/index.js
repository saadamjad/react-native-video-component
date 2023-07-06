/** @format */

import React, { useCallback, useRef, useState } from 'react';
import { OrientationLocker } from 'react-native-orientation-locker';
import { ActivityIndicator, StyleSheet, View, Platform } from 'react-native';
import MuteUnmute from './mute-unmute';
import { FullScreenHandler } from './full-screen';
import VideoDescription from './video-description';
import ScreenOrientationComponent from './orientation';
import VideoPlayer from './video-player';
import PropTypes from 'prop-types';
import { videoUrl } from './constant';

const VideoScreen = ({
	isVideoDescriptionShown = true,
	isShownScreenOrientation = true,
	src,
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
			screenOrientationCallBack={(res) =>
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
					src={src}
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

VideoScreen.propTypes = {
	isVideoDescriptionShown: PropTypes.bool,
	isShownScreenOrientation: PropTypes.bool,
	src: PropTypes.string.isRequired,
};
VideoScreen.defaultProps = {
	isVideoDescriptionShown: true,
	isShownScreenOrientation: true,
	src: videoUrl,
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
