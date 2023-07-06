/** @format */

import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';

const MuteUnMute = ({ volumeCallBack }) => {
	const [state, setState] = useState({
		muted: false,
	});

	const muteUnmute = useCallback(() => {
		volumeCallBack(!state.muted);
		setState({ ...state, muted: !state.muted });
	}, [state.muted]);

	const renderMuteUnmuteComponent = () => (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={muteUnmute}
			style={styles.backgroundVideo}>
			<Image
				source={
					state.muted
						? require('../../image/volume.png')
						: require('../../image/mute.png')
				}
				style={{ height: 25, width: 25, tintColor: 'white' }}
			/>
		</TouchableOpacity>
	);

	return renderMuteUnmuteComponent();
};
MuteUnMute.PropTypes = {
	volumeCallBack: PropTypes.bool,
};
MuteUnMute.defaultProps = {
	volumeCallBack: false,
};

var styles = StyleSheet.create({
	backgroundVideo: {
		position: 'absolute',
		right: 10,
		zIndex: 1000,
		top: 10,
	},
});
export default React.memo(MuteUnMute);
