import _extends from "babel-runtime/helpers/extends";
import _objectWithoutProperties from "babel-runtime/helpers/objectWithoutProperties";
import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";
import _possibleConstructorReturn from "babel-runtime/helpers/possibleConstructorReturn";
import _inherits from "babel-runtime/helpers/inherits";
import React, { Component } from "react";

var ComboBox = function (_Component) {
  _inherits(ComboBox, _Component);

  function ComboBox(props) {
    _classCallCheck(this, ComboBox);

    var _this = _possibleConstructorReturn(this, (ComboBox.__proto__ || Object.getPrototypeOf(ComboBox)).call(this, props));

    _this.state = {
      show: false,
      position: {
        x: 0,
        y: 0
      }
    };
    return _this;
  }

  _createClass(ComboBox, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener("click", this.close.bind(this));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("click", this.close.bind(this));
    }
  }, {
    key: "open",
    value: function open(position) {
      this.setState({
        show: true,
        position: position
      });
    }
  }, {
    key: "close",
    value: function close() {
      if (!this.state.show) return;
      this.setState({
        show: false
      });
    }
  }, {
    key: "toggle",
    value: function toggle(position) {
      this.setState({
        show: !this.state.show,
        position: position
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          className = _props.className,
          style = _props.style,
          others = _objectWithoutProperties(_props, ["className", "style"]);

      style = style || {};
      if (!this.state.show) {
        style["display"] = "none";
      } else {
        style["display"] = "";
      }
      if (this.state.position) {
        style["left"] = this.state.position.x;
        style["top"] = this.state.position.y;
      }

      return React.createElement(
        "div",
        _extends({
          style: style,
          className: "combobox" + (className ? " " + className : "")
        }, others),
        this.props.children
      );
    }
  }]);

  return ComboBox;
}(Component);

export default ComboBox;