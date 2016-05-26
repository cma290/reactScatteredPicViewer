require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let imageData = require('../data/imageData.json');
//let yeomanImage = require('../images/yeoman.png');

function genImageURL(imageDataArr) {
	for (let i = 0, j = imageDataArr.length; i < j; ++i) {
		let imageDataItem = imageDataArr[i];
		
		imageDataItem.imageURL = require('../images/' + imageDataItem.fileName);
		imageDataArr[i] = imageDataItem;
	}
	return imageDataArr;
}
imageData = genImageURL(imageData);

var ImgFigure = React.createClass({
	render: function () {
		return (
			<figure className="img-figure">
				<img src={this.props.data.imageURL}
					 alt={this.props.data.title}
				/>
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
				</figcaption>
			</figure>
		);
	}
});

class AppComponent extends React.Component {
  render() {
  	var controllerUnits =[],
  	imgFigures =[];

  	imageData.forEach(function (value) {
  		imgFigures.push(<ImgFigure data={value}/>);
  	});


    return (
      <section className="stage">
      	<section className="img-sec">
      	{imgFigures}
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
