require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let imageData = require('../data/imageData.json');
let yeomanImage = require('../images/yeoman.png');

function genImageURL(imageDataArr) {
	for (let i = 0, j = imageDataArr.length; i < j; ++i) {
		let imageDataItem = imageDataArr[i];
		
		imageDataItem.imageURL = require('../images/' + imageDataItem.fileName);
		imageDataArr[i] = imageDataItem;
		
		return imageDataArr;
	}
}
imageData = genImageURL(imageData);

class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
      	<section className="img-sec">
      	</section>
      	<nav className="controller-nav">
      	</nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
