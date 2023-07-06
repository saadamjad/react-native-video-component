/** @format */

import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';

const FullScreenHandler = ({ fullScreenHanlderCall }) => {
	const [state, setState] = useState({
		fullScreen: false,
	});

	const fullScreenHanlder = () => {
		setState({
			...state,
			fullScreen: !state.fullScreen,
		});
		fullScreenHanlderCall(!state.fullScreen);
	};

	const renderFullScreenMode = () => (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={fullScreenHanlder}
			style={styles.backgroundVideo}>
			<Image
				source={
					state.fullScreen || state.ScreenOrientation
						? require('../../image/minimize.png')
						: require('../../image/full-screen.png')
				}
				style={{ height: 30, width: 30, tintColor: 'white' }}
			/>
		</TouchableOpacity>
	);

	return renderFullScreenMode();
};

FullScreenHandler.PropTypes = {
	fullScreenHanlderCall: PropTypes.bool,
};
FullScreenHandler.defaultProps = {
	fullScreenHanlderCall: false,
};

var styles = StyleSheet.create({
	backgroundVideo: {
		position: 'absolute',
		right: 10,
		zIndex: 100000,
		bottom: 30,
	},
});
export { FullScreenHandler };
