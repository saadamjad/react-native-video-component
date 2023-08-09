/** @format */

import React from 'react';
import ErrorBoundary from './product';
import { Text, View } from 'react-native';

const MyComponent = () => {
	// Your component code

	return (
		<ErrorBoundary>
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>component</Text>
			</View>
		</ErrorBoundary>
	);
};

export default MyComponent;
