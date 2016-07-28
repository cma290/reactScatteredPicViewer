var React = require('react');


var ControllerUnit = React.createClass({

  _handleClick: function(e){

  	if (this.props.arrange.isCenter){
  		this.props.inverse();
  	} else {
  		this.props.center();
  	}

    e.preventDefault();
    e.stopPropagation();
  },
  render: function(){
  	var controllerUnitClassName = 'controller-unit';

  	//append class to controll unit
  	if(this.props.arrange.isCenter){
  		controllerUnitClassName += ' is-center';
  		
  		if(this.props.arrange.isInverse){
  			controllerUnitClassName += ' is-inverse';
  		}
  	}
    return (
      // <span className="controller-unit" onClick={this._handleClick}><i className="fa fa-share"></i></span>
      <span className={controllerUnitClassName} onClick={this._handleClick}></span>
      // <span className="controller-unit iconfont" onClick={this._handleClick}>&#xe8a8;</span>
    );
  }
});

module.exports = ControllerUnit;