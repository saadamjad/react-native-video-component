/** @format */

import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';

const ScreenOrientationComponent = ({ screenOrientationCallBack }) => {
	const landScape = 'LANDSCAPE';
	const portrait = 'PORTRAIT';
	const [state, setState] = useState({
		muted: true,
		ScreenOrientation: 'PORTRAIT',
		videoBuffering: false,
		fullScreen: false,
	});

	const portraitAndScreenOrientation = useCallback(() => {
		setState({
			...state,
			ScreenOrientation:
				state.ScreenOrientation === landScape ? portrait : landScape,
		});
		screenOrientationCallBack(
			state.ScreenOrientation === landScape ? portrait : landScape
		);
	}, [state.ScreenOrientation]);

	const renderScreenOrientationOrPortraite = () => (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={portraitAndScreenOrientation}
			style={{
				position: 'absolute',
				left: 10,
				zIndex: 1000,
				top: 10,
			}}>
			<Image
				source={
					state.ScreenOrientation == 'LANDSCAPE'
						? require('../../image/close.png')
						: require('../../image/expand.png')
				}
				style={styles.image}
			/>
		</TouchableOpacity>
	);

	return renderScreenOrientationOrPortraite();
};

ScreenOrientationComponent.PropTypes = {
	screenOrientationCallBack: PropTypes.string,
};
ScreenOrientationComponent.defaultProps = {
	screenOrientationCallBack: 'PORTRAIT',
};
var styles = StyleSheet.create({
	backgroundVideo: {
		width: '100%',
		height: '100%',
		backgroundColor: 'blue',
	},
	image: { height: 25, width: 25, tintColor: 'white' },
});
export default React.memo(ScreenOrientationComponent);
