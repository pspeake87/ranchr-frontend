import React, { PropTypes } from 'react';


module.exports = class RectButton extends React.Component {

  setNativeProps() {
    var text = this.refs.text;
    var width = this.refs.width;
    var height = this.refs.height;
    var backgroundColor = this.refs.backgroundColor;
    var bottom = this.refs.bottom;
    text.setNativeProps.apply(text, arguments);
    width.setNativeProps.apply(width, arguments);
    height.setNativeProps.apply(height, arguments);
    marginTop.setNativeProps.apply(marginTop, arguments);
    backgroundColor.setNativeProps.apply(backgroundColor, arguments);
    bottom.setNativeProps.apply(bottom, arguments);
  }

  render() {
    var text = {
      color: 'white',
      fontSize: 16,
      textAlign: 'center',
      paddingTop: 12,
      fontFamily: 'Helvetica Neue'
    };
    var view = {
      backgroundColor: '#00000077',
      backgroundColor: this.props.backgroundColor,
      height: Number(this.props.height),
      width: Number(this.props.width)
    };
    return (
      <div onClick={this.props.onPress} style={view}>
        <div>
          <p style={text}>{this.props.title}</p>
        </div>
      </div>
    );
  }
};
