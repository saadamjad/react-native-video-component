/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import { VideoScreen } from './src/component/VideoComponent';
import { videoUrl } from './src/component/VideoComponent/constant.js';

const App = () => {
	return <VideoScreen src={videoUrl} />;
};

App.propTypes = {
	src: PropTypes.string.isRequired,
};

export default App;
