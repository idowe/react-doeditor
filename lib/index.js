"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dialog = exports.EditorSelection = exports.EditorDOM = undefined;

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

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _EditorCore = require("./components/core/EditorCore");

var _EditorCore2 = _interopRequireDefault(_EditorCore);

var _EditorEventEmitter = require("./utils/EditorEventEmitter");

var _EditorEventEmitter2 = _interopRequireDefault(_EditorEventEmitter);

var _EditorDOM = require("./utils/EditorDOM");

var _EditorDOM2 = _interopRequireDefault(_EditorDOM);

var _EditorSelection = require("./utils/EditorSelection");

var _EditorSelection2 = _interopRequireDefault(_EditorSelection);

var _Dialog = require("./components/base/Dialog");

var _Dialog2 = _interopRequireDefault(_Dialog);

require("./less/editor.less");

require("./utils/Date.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports.EditorDOM = _EditorDOM2["default"];
exports.EditorSelection = _EditorSelection2["default"];
exports.Dialog = _Dialog2["default"];

var App = function (_React$Component) {
  (0, _inherits3["default"])(App, _React$Component);

  function App(props) {
    (0, _classCallCheck3["default"])(this, App);

    var _this = (0, _possibleConstructorReturn3["default"])(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.handleChange = function () {
      _this.setState({
        loaded: true
      });
    };

    _this.state = {
      loaded: false,
      reload: true
    };
    return _this;
  }

  (0, _createClass3["default"])(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.index = _EditorEventEmitter2["default"].editorIndex;
      _EditorEventEmitter2["default"].addStartListener("start-" + this.index, this.handleChange);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var index = this.index;
      _EditorEventEmitter2["default"].removeStartListener("start-" + index, this.handleChange);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.state.loaded && this.state.reload) {
        this.refs.editor.setContent(this.props.value || this.props.defaultValue);
      }
    }
  }, {
    key: "handleMountSuccess",
    value: function handleMountSuccess() {
      _EditorEventEmitter2["default"].mountEditorSuccess();
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      // reload判断当前是否可以允许刷新
      // loaded状态变化时，务必重新刷新
      var currentValue = nextProps.value;
      var editorValue = this.getContent();

      if (this.state.loaded != nextState.loaded) {
        return true;
      } else if (currentValue == editorValue) {
        return false;
      }
      return true;
    }
  }, {
    key: "getContent",
    value: function getContent() {
      return this.refs.editor ? this.refs.editor.getContent() : "";
    }
  }, {
    key: "setContent",
    value: function setContent(content) {
      return this.refs.editor ? this.refs.editor.setContent(content) : "";
    }
  }, {
    key: "focusEditor",
    value: function focusEditor() {
      return this.refs.editor ? this.refs.editor.focusEditor() : "";
    }
  }, {
    key: "findDOMNode",
    value: function findDOMNode(refName) {
      return this.refs.editor ? this.refs.editor.findDOMNode(refName) : "";
    }
  }, {
    key: "render",
    value: function render() {
      var loaded = this.state.loaded;
      var _props = this.props,
          value = _props.value,
          defaultValue = _props.defaultValue,
          props = (0, _objectWithoutProperties3["default"])(_props, ["value", "defaultValue"]);

      if (!this.state.loaded) {
        return _react2["default"].createElement(
          "div",
          {
            id: props.id,
            className: "editor-contenteditable-div",
            style: { minHeight: "30px", border: "1px solid #ddd" }
          },
          "\u6B63\u5728\u52A0\u8F7D..."
        );
      } else {
        return _react2["default"].createElement(_EditorCore2["default"], (0, _extends3["default"])({
          ref: "editor"
        }, props, {
          onEditorMount: this.handleMountSuccess
        }));
      }
    }
  }]);
  return App;
}(_react2["default"].Component);

exports["default"] = App;


App.propTypes = {
  plugins: _propTypes2["default"].object,
  fontFamily: _propTypes2["default"].array,
  fontSize: _propTypes2["default"].array,
  paragraph: _propTypes2["default"].array,
  icons: _propTypes2["default"].arrayOf(_propTypes2["default"].string),
  value: _propTypes2["default"].string,
  defaultValue: _propTypes2["default"].string
};

App.defaultProps = {
  plugins: {
    image: {
      uploader: {
        name: "file",
        url: "/upload",
        data: {},
        filter: function filter(res) {
          return res.url;
        }
      }
    },
    toolbar: {
      icons: []
    }
  },
  fontFamily: [{
    name: "宋体",
    value: "宋体, SimSun",
    defualt: true
  }, {
    name: "隶书",
    value: "隶书, SimLi"
  }, {
    name: "楷体",
    value: "楷体, SimKai"
  }, {
    name: "微软雅黑",
    value: "微软雅黑, Microsoft YaHei"
  }, {
    name: "黑体",
    value: "黑体, SimHei"
  }, {
    name: "arial",
    value: "arial, helvetica, sans-serif"
  }, {
    name: "arial black",
    value: "arial black, avant garde"
  }, {
    name: "omic sans ms",
    value: "omic sans ms"
  }, {
    name: "impact",
    value: "impact, chicago"
  }, {
    name: "times new roman",
    value: "times new roman"
  }, {
    name: "andale mono",
    value: "andale mono"
  }],
  fontSize: [{
    name: "10px",
    value: "10"
  }, {
    name: "12px",
    value: "12"
  }, {
    name: "14px",
    value: "14",
    defualt: true
  }, {
    name: "16px",
    value: "16"
  }, {
    name: "18px",
    value: "18"
  }, {
    name: "24px",
    value: "24"
  }, {
    name: "32px",
    value: "32"
  }, {
    name: "38px",
    value: "38"
  }],
  paragraph: [{
    name: "段落",
    value: "p",
    defualt: true
  }, {
    name: "标题1",
    value: "h1"
  }, {
    name: "标题2",
    value: "h2"
  }, {
    name: "标题3",
    value: "h3"
  }, {
    name: "标题4",
    value: "h4"
  }, {
    name: "标题5",
    value: "h5"
  }, {
    name: "标题6",
    value: "h6"
  }],
  icons: [
  // video map print preview drafts link unlink formula
  "source | undo redo | bold italic underline strikethrough fontborder emphasis | ", "paragraph fontfamily fontsize | superscript subscript | ", "forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ", "cleardoc  | indent outdent | justifyleft justifycenter justifyright justifyjustify | touppercase tolowercase | ", "horizontal date time  | image emotion spechars | inserttable"],
  value: "",
  defaultValue: ""
};