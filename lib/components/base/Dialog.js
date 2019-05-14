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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @width: 对话框宽度
 * @height: 对话框高度
 * @style: 样式
 * @buttons: 对话框按钮组
 * @title: 对话框标题
 * @className: 对话框类名
 **/
var Dialog = function (_React$Component) {
  (0, _inherits3["default"])(Dialog, _React$Component);

  function Dialog(props) {
    (0, _classCallCheck3["default"])(this, Dialog);

    var _this = (0, _possibleConstructorReturn3["default"])(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this, props));

    _this.state = {
      show: false
    };
    return _this;
  }

  (0, _createClass3["default"])(Dialog, [{
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
    value: function open() {
      this.setState({
        show: true
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
    value: function toggle() {
      this.setState({
        show: !this.state.show
      });
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(e) {
      e = e || event;
      if (e.stopPropagation) {
        e.stopPropagation();
      } else {
        e.cancelBubble = true;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          className = _props.className,
          buttons = _props.buttons,
          title = _props.title,
          style = _props.style,
          width = _props.width,
          height = _props.height,
          onClose = _props.onClose,
          children = _props.children;

      style = style ? style : {};
      if (width) {
        style.width = width;
        style.marginLeft = -width / 2;
      }
      if (height) {
        style.height = height;
      }
      style.display = this.state.show ? "" : "none";
      var _className = "dialog" + (className ? " " + className : "");
      return _react2["default"].createElement(
        "div",
        {
          className: "dialog-container",
          ref: "root",
          onMouseDown: this.handleMouseDown.bind(this)
        },
        _react2["default"].createElement(
          "div",
          { className: _className, ref: "dialog", style: style },
          _react2["default"].createElement(
            "div",
            { className: "dialog-header", ref: "header" },
            _react2["default"].createElement("a", { className: "dialog-close", onClick: onClose }),
            _react2["default"].createElement(
              "h3",
              { className: "dialog-title" },
              title
            )
          ),
          _react2["default"].createElement(
            "div",
            { className: "dialog-body", ref: "body" },
            children
          ),
          _react2["default"].createElement(
            "div",
            { className: "dialog-footer", ref: "footer" },
            buttons.map(function (ele, pos) {
              return _react2["default"].createElement(
                "a",
                {
                  className: "dialog-button",
                  key: pos,
                  "data-name": ele.name,
                  onClick: ele.onClick
                },
                ele.content
              );
            })
          )
        ),
        _react2["default"].createElement("div", {
          className: "dialog-backdrop",
          ref: "backdrop",
          style: { display: this.state.show ? "" : "none" }
        })
      );
    }
  }]);
  return Dialog;
}(_react2["default"].Component);

exports["default"] = Dialog;
module.exports = exports['default'];