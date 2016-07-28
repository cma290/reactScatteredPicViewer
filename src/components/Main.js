'use strict'

require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
var ReactDOM = require('react-dom');
var ImgFigure = require('./ImgFigure');
var ControllerUnit = require('./ControllerUnit');
var imageData = require('../data/imageData.json');
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

/*
 * get a random number from a given range
 */
 function randomRange(low, high) {
   return Math.ceil(Math.random() * (high - low) + low);
 }

 var RotateRange = 30;
 function getRandomDegree() {
  return ((Math.random() > 0.5 ? '' : '-') + Math.random() * RotateRange);
}

class AppComponent extends React.Component {

  //image's topleft cornor position range. To make it not overlap with centered pic or out of the screen too much.
  constructor (props) {
  	super(props);
  	this.state = {
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
    // this.setState({
    //   centerPos: {
    //     left: halfStageW - halfImgW,
    //     top: halfStageH - halfImgH
    //   },
    //   hPosRange: { // hori
    //     leftSecX: [0, 0],
    //     rightSecX: [0, 0],
    //     y: [0, 0]
    //   },
    //   vPosRange: { //verti
    //     x: [0, 0],
    //     topY: [0, 0]
    //   }
    // });

  	this.rearrange(0); //center img arr[0]
  }

  // _rearrange
  rearrange(centerIndex) {
  	var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
    stageW = stageDOM.scrollWidth,
    stageH = stageDOM.scrollHeight,
    halfStageW = Math.ceil(stageW/2),
    halfStageH = Math.ceil(stageH/2);

    // get img size.
    var imgDOM = ReactDOM.findDOMNode(this.refs.imgFigure0), // the first pic's size, assuming all same size
    imgW = imgDOM.scrollWidth,
    imgH = imgDOM.scrollHeight,
    halfImgW = Math.ceil(imgW/2),
    halfImgH = Math.ceil(imgH/2),
    sectionW = halfStageW - 1.5 * imgW,
    vertOverflow = halfImgH/2,
    HoriOverflow = halfImgW/2;


    var imgsArrangeArr = this.state.imgsArrangeArr;
    var centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    };
    
    //centered item
    var imgsCenter = imgsArrangeArr.splice(centerIndex,1);
    imgsCenter[0] = {
      pos: centerPos,
      rotate: 0,
      isCenter: true
    };

    //other items are split into left and right section
    for (var i = 0, j = imgsArrangeArr.length, mid = j/2; i < j; i++) {
      var x0 = null;
      
      if (i < mid) {
        x0 = 0;
      } else {
        x0 = halfStageW + halfImgW;
      }

      imgsArrangeArr[i] = {
        pos: {
          top: randomRange(0 - vertOverflow, stageH - imgH + vertOverflow),
          left: randomRange(x0 - HoriOverflow, x0 + sectionW + HoriOverflow)
        },
        rotate: getRandomDegree(),
        isCenter: false
      };
    }

    //insert centered item back
    imgsArrangeArr.splice(centerIndex, 0, imgsCenter[0]);
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
