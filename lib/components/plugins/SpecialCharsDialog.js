"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _TabGroup = require("../base/TabGroup");

var _TabGroup2 = _interopRequireDefault(_TabGroup);

var _Dialog = require("../base/Dialog");

var _Dialog2 = _interopRequireDefault(_Dialog);

var _EditorConstants = require("../../constants/EditorConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SCChars = function (_React$Component) {
  (0, _inherits3["default"])(SCChars, _React$Component);

  function SCChars() {
    (0, _classCallCheck3["default"])(this, SCChars);
    return (0, _possibleConstructorReturn3["default"])(this, (SCChars.__proto__ || Object.getPrototypeOf(SCChars)).apply(this, arguments));
  }

  (0, _createClass3["default"])(SCChars, [{
    key: "handleClick",
    value: function handleClick(e) {
      e = e || event;
      var target = e.target || e.srcElement;
      var char = target.getAttribute("data-char");
      var id = "char-" + new Date().valueOf();
      if (this.props.onSelectChar) {
        this.props.onSelectChar(e, char);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var chars = this.props.chars;
      var handleClick = this.handleClick.bind(this);
      return _react2["default"].createElement(
        "ul",
        { className: "special-chars " + this.props.name },
        chars.map(function (ele, pos) {
          return _react2["default"].createElement(
            "li",
            {
              className: "special-char",
              key: pos,
              "data-char": ele,
              onClick: handleClick
            },
            ele
          );
        })
      );
    }
  }]);
  return SCChars;
}(_react2["default"].Component);

var SpecialCharsDialog = function (_React$Component2) {
  (0, _inherits3["default"])(SpecialCharsDialog, _React$Component2);

  function SpecialCharsDialog(props) {
    (0, _classCallCheck3["default"])(this, SpecialCharsDialog);

    var _this2 = (0, _possibleConstructorReturn3["default"])(this, (SpecialCharsDialog.__proto__ || Object.getPrototypeOf(SpecialCharsDialog)).call(this, props));

    _this2.state = {
      handle: function handle() {}
    };
    return _this2;
  }

  (0, _createClass3["default"])(SpecialCharsDialog, [{
    key: "open",
    value: function open(handle) {
      this.setState({
        handle: handle
      });
      this.refs.root.open();
    }
  }, {
    key: "close",
    value: function close() {
      if (this.refs.root) this.refs.root.close();
    }
  }, {
    key: "toggle",
    value: function toggle(handle) {
      this.setState({
        handle: handle
      });
      this.refs.root.toggle();
    }
  }, {
    key: "handleSelectChar",
    value: function handleSelectChar(e, char) {
      e = e || event;
      if (this.state.handle) {
        this.state.handle(char);
      }
      if (e.stopPropagation) {
        e.stopPropagation();
      } else {
        e.cancelBubble = true;
      }
      this.close();
    }
  }, {
    key: "render",
    value: function render() {
      var tabs = [];
      for (var i = 0; i < _EditorConstants.SpecialChars.length; i++) {
        tabs.push({
          title: _EditorConstants.SpecialChars[i].title,
          chars: _EditorConstants.SpecialChars[i].chars,
          component: _react2["default"].createElement(SCChars, {
            chars: _EditorConstants.SpecialChars[i].chars,
            name: "common-chars",
            onSelectChar: this.handleSelectChar.bind(this)
          })
        });
      }
      var buttons = [];
      if (this.props.hidden) {
        return _react2["default"].createElement("div", null);
      } else {
        return _react2["default"].createElement(
          _Dialog2["default"],
          {
            ref: "root",
            className: "special-chars-dialog",
            width: 700,
            height: 508,
            title: "\u7279\u6B8A\u5B57\u7B26",
            buttons: buttons,
            onClose: this.close.bind(this)
          },
          _react2["default"].createElement(_TabGroup2["default"], { tabs: tabs })
        );
      }
    }
  }]);
  return SpecialCharsDialog;
}(_react2["default"].Component);

exports["default"] = SpecialCharsDialog;
module.exports = exports['default'];