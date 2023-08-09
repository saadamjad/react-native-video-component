/** @format */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import Errorboundary from './src/component/error-boundaries';
// import ErrorBoundary from 'react-native-error-boundary';

// const ErrorScreen = ({ errorText }) => {
// 	const [error, setError] = useState(false);
// 	const [errorText, setErrorText] = useState('');
// 	console.log('ERRORRR AYAA', errorText);

// 	useEffect(() => {
// 		if (errorText) {
// 			setError(true);
// 			setErrorText(errorText);
// 		}
// 	}, [errorText]);
// 	return (
// 		<View style={{ flex: 1 }}>
// 			<Text>Error Screen</Text>
// 		</View>
// 	);
// };

const App = () => {
	return <Errorboundary />;
};



export default App;
