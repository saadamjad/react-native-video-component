/** @format */

import React, { useState } from 'react';
import { View, Text } from 'react-native';

const ErrorBoundary = ({ children, receivedError }) => {
	const [hasError, setHasError] = useState(false);

	const handleCatchError = (error, info) => {
		// You can log the error or perform any other necessary action
		console.log('Error:', error);
		console.log('Error Info:', info);
		setHasError(true);
		return receivedError(error);
	};

	if (hasError) {
		// Render a fallback UI when an error occurs
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>An error occurred. Please try again.</Text>
			</View>
		);
	}

	return (
		<React.Fragment>
			{React.Children.map(children, (child) =>
				React.cloneElement(child, {
					onError: handleCatchError,
				})
			)}
		</React.Fragment>
	);
};

export default ErrorBoundary;
