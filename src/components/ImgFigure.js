var React = require('react');

/*
 * ImgFigure component
 */
var ImgFigure = React.createClass({
	
  //img handleClick function
  _handleClick: function (e) {

    if (this.props.arrange.isCenter) {
      this.props.inverse();
    } else {
      this.props.center();
    }
    e.stopPropagation();
    e.preventDefault();
  },

	render: function () {
		
		var styleObj = {};
		if (this.props.arrange.pos) {
			styleObj = this.props.arrange.pos;
		}
    
    if (this.props.arrange.rotate) {
      (['MozTransform', 'msTransform', 'WebkitTransform', '']).forEach(function(value) {
        styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg';
      }.bind(this));
    }

    if (this.props.arrange.isCenter) {
      styleObj.zIndex = 11;
      styleObj.border = '5px solid #73AD21';
      styleObj.borderRadius = '0px';
    }

    var imgFigureClassName = 'img-figure';
        imgFigureClassName += this.props.arrange.isInverse ? ' is-inversed' : '';
		return (
			<figure className={imgFigureClassName} style={styleObj}
              onClick={this._handleClick}>
				<img src={this.props.data.imageURL}
					   alt={this.props.data.title}/>
				<figcaption>
					<h2 className="img-title"> {this.props.data.title} </h2>
          <div className="img-back" onClick={this._handleClick}>
            <p> {this.props.data.desc} </p>
          </div>
				</figcaption>
			</figure>
		);
	}
});

module.exports = ImgFigure;