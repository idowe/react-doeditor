"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ComboBox = function (_Component) {
  (0, _inherits3["default"])(ComboBox, _Component);

  function ComboBox(props) {
    (0, _classCallCheck3["default"])(this, ComboBox);

    var _this = (0, _possibleConstructorReturn3["default"])(this, (ComboBox.__proto__ || Object.getPrototypeOf(ComboBox)).call(this, props));

    _this.state = {
      show: false,
      position: {
        x: 0,
        y: 0
      }
    };
    return _this;
  }

  (0, _createClass3["default"])(ComboBox, [{
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
          others = (0, _objectWithoutProperties3["default"])(_props, ["className", "style"]);

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

      return _react2["default"].createElement(
        "div",
        (0, _extends3["default"])({
          style: style,
          className: "combobox" + (className ? " " + className : "")
        }, others),
        this.props.children
      );
    }
  }]);
  return ComboBox;
}(_react.Component);

exports["default"] = ComboBox;
module.exports = exports['default'];