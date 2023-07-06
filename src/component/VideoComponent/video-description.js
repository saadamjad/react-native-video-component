/** @format */

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const VideoTextShown = () => {
	return (
		<View style={styles.background}>
			<Text style={styles.text}>Main Heading</Text>
			<Text>
				Lorem Ipsum is simply dummy text of the printing and typesetting
				industry. Lorem Ipsum has been the industry's standard dummy text ever
				since the 1500s, when an unknown printer took a galley of type and
				scrambled it to make a type specimen book. It has survived not only five
				centuries, but also the leap into electronic typesetting, remaining
				essentially unchanged. It was popularised in the 1960s with the release
				of Letraset sheets containing Lorem Ipsum passages, and more recently
				with desktop publishing software like Aldus PageMaker including versions
				of Lorem Ipsum.
			</Text>
		</View>
	);
};

var styles = StyleSheet.create({
	background: {
		paddingHorizontal: 10,
		paddingVertical: 10,
	},
	text: {
		color: 'black',
		fontWeight: 'bold',
		fontSize: 20,
	},
});
export default React.memo(VideoTextShown);
