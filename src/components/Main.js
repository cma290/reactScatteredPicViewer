require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
var ReactDOM = require('react-dom');
var ImgFigure = require('./ImgFigure');
var ControllerUnit = require('./ControllerUnit');
var imageData = require('../data/imageData.json');
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

class AppComponent extends React.Component {

  //image's topleft cornor position range. To make it not overlap with centered pic or out of the screen too much.
  constructor (props) {
  	super(props);
  	this.state = {
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
	    },
	    imgsArrangeArr: [
	    	/*{
	    		pos: {
	    			left: '0',
	    			top: '0'
	    		}
          rotate : 0,
          isInverse: false, // img
          isCenter: false
        }*/
        ]
      };
    }

  /*
   * closure function for inverse
   * _inverse
   */
   inverse(index) {
     return function () {
      var imgsArrangeArr = this.state.imgsArrangeArr;
      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
      this.setState({
          imgsArrangeArr: imgsArrangeArr //could just update arr[index]?
        });
    }.bind(this);
  }

  componentDidMount() {
    //get screen size
    var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
    stageW = stageDOM.scrollWidth,
    stageH = stageDOM.scrollHeight,
    halfStageW = Math.ceil(stageW/2),
    halfStageH = Math.ceil(stageH/2);

    // get img size      
    var imgDOM = ReactDOM.findDOMNode(this.refs.imgFigure0), // the first pic's size
    imgW = imgDOM.scrollWidth,
    imgH = imgDOM.scrollHeight,
    halfImgW = Math.ceil(imgW/2),
    halfImgH = Math.ceil(imgH/2);
    
    this.setState({
      centerPos: {
        left: halfStageW - halfImgW,
        top: halfStageH - halfImgH
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

  // _rearrange
  rearrange(centerIndex) {
  	var imgsArrangeArr = this.state.imgsArrangeArr,
    centerPos = this.state.centerPos,
    hPosRange = this.state.hPosRange,
    vPosRange = this.state.vPosRange;

    imgsArrangeArr[centerIndex] = {
     pos: centerPos,

     rotate: 0,
     isCenter: true
   };

   imgsArrangeArr.forEach(function(value,index) {
  			//if (index == centerIndex) {
  				//continue;//Unsyntactic continue
  			//}
  			if (index !== centerIndex) {
  				imgsArrangeArr[index] = {
            pos: {
              left: randomRange(0, this.state.centerPos.left * 2),
              top: randomRange(0, this.state.centerPos.top * 2)
            },
            rotate: getRandomDegree(),
            isCenter: false
          }
        }
      }.bind(this));
   this.setState({imgsArrangeArr: imgsArrangeArr});
 }

  // later change to _center for naming convention
  center(index) {
    return function () {
      this.rearrange(index);
    }.bind(this);
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
          rotate: 0,
          isInverse: false,
          isCenter: false
        }
      }

      imgFigures.push(<ImgFigure key={index} data={value}
        ref={'imgFigure' + index}
        arrange={this.state.imgsArrangeArr[index]}
        inverse={this.inverse(index)}
        center={this.center(index)} />);

      controllerUnits.push(<ControllerUnit key={index} arrange={this.state.imgsArrangeArr[index]}
        inverse={this.inverse(index)}
        center={this.center(index)}/>);

    }.bind(this));

      return (
        <section className="stage" ref="stage">
          <section className="img-sec"> {imgFigures} </section>
          <nav className="controller-nav"> {controllerUnits} </nav>
        </section>
      );
    }
  }

  AppComponent.defaultProps = {
  };

  export default AppComponent;
