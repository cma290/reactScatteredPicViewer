require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

let imageData = require('../data/imageData.json');
//let yeomanImage = require('../images/yeoman.png');

/*
 *
 */  
function genImageURL(imageDataArr) {
	for (let i = 0, j = imageDataArr.length; i < j; ++i) {
		let imageDataItem = imageDataArr[i];
		
		imageDataItem.imageURL = require('../images/' + imageDataItem.fileName);
		imageDataArr[i] = imageDataItem;
	}
	return imageDataArr;
}
imageData = genImageURL(imageData);

/*
 * get a random number from a given range
 */
function randomRange(low, high) {
	return Math.ceil(Math.random() * (high - low) + low);
}

/*
 *
 */
var RandomRange = 35;
function getRandomDegree() {
  return ((Math.random() > 0.5 ? '' : '-') + Math.random() * RandomRange);
}

var ImgFigure = React.createClass({
	
	render: function () {
		
		var styleObj = {};
		if (this.props.arrange.pos) {
			styleObj = this.props.arrange.pos;
		}
    if (this.props.arrange.rotate) {
      (['-moz-', '-ms-', '-webkit-', '']).forEach(function(value) {
        styleObj[value + 'transform'] = 'rotate(' + this.props.arrange.rotate + 'deg';
      }.bind(this));
    }

		return (
			<figure className="img-figure" style={styleObj}>
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
  
  //image's topleft cornor position range. To make it not overlap with centered pic or out of the screen too much.
  constructor (props) {
  	super(props);
  	this.state = {
	  	centerPos: {
	  		left: 800,
	  		top: 200
	  	},
	  	hPosRange: { // hori
	  		leftSecX: [0, 0],
	  		rightSecX: [0, 0],
	  		y: [0, 0]
	  	},
	    vPosRange: { //verti
	    	x: [0, 0],
	    	topY: [0, 0]
	    },
	    imgsArrangeArr: [
	    	/*{
	    		pos: {
	    			left: '0',
	    			top: '0'
	    		}
          rotate : 0
	    	}*/
	    ]
  	};
  }

  componentDidMount() {
  	this.setState({
  		centerPos: {
	  		left: 0,
	  		top: 0
	  	},
	  	hPosRange: { // hori
	  		leftSecX: [0, 0],
	  		rightSecX: [0, 0],
	  		y: [0, 0]
	  	},
	    vPosRange: { //verti
	    	x: [0, 0],
	    	topY: [0, 0]
	    }
  	});
  	this.rearrange(0); //center img arr[0]
  }

  rearrange(centerIndex) {
  	var imgsArrangeArr = this.state.imgsArrangeArr,
  		centerPos = this.state.centerPos,
  		hPosRange = this.state.hPosRange,
  		vPosRange = this.state.vPosRange;

      imgsArrangeArr[centerIndex].pos = centerPos;
  		imgsArrangeArr[centerIndex].rotate = 0;

  		imgsArrangeArr.forEach(function(value,index) {
  			//if (index == centerIndex) {
  				//continue;//Unsyntactic continue
  			//}
  			if (index !== centerIndex) {
  				value.pos = {
  					left: randomRange(0, 2000),
  					top: randomRange(0, 500)
  				};
          value.rotate = getRandomDegree();
  			}
  		});
  		this.setState({imgsArrangeArr: imgsArrangeArr 
  		});
  }

  render() {
  	var controllerUnits =[],
  	imgFigures =[];

  	imageData.forEach(function (value, index) {
  		
  		if(!this.state.imgsArrangeArr[index]) {
  			this.state.imgsArrangeArr[index] = {
  				pos: {
  					left: 0,
  					top: 0
  				},
          rotate: 0
  			}
  		}

  		imgFigures.push(<ImgFigure data={value}
  						ref={'imgFigure' + index}
  						arrange={this.state.imgsArrangeArr[index]}
  						/>);
  	}.bind(this));


    return (
      <section className="stage" ref="stage">
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
