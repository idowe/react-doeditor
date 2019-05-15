import _extends from "babel-runtime/helpers/extends";
import _objectWithoutProperties from "babel-runtime/helpers/objectWithoutProperties";
import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";
import _possibleConstructorReturn from "babel-runtime/helpers/possibleConstructorReturn";
import _inherits from "babel-runtime/helpers/inherits";
import React from "react";
import PropTypes from "prop-types";
import EditorCore from "./components/core/EditorCore";
import EditorEventEmitter from "./utils/EditorEventEmitter";
import EditorDOM from "./utils/EditorDOM";
import EditorSelection from "./utils/EditorSelection";
import Dialog from "./components/base/Dialog";

import "./less/editor.less";
import "./utils/Date.js";

export { EditorDOM, EditorSelection, Dialog };

var App = (function(_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(
      this,
      (App.__proto__ || Object.getPrototypeOf(App)).call(this, props)
    );

    _this.handleChange = function() {
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

  _createClass(App, [
    {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.index = EditorEventEmitter.editorIndex;
        EditorEventEmitter.addStartListener(
          "start-" + this.index,
          this.handleChange
        );
      }
    },
    {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var index = this.index;
        EditorEventEmitter.removeStartListener(
          "start-" + index,
          this.handleChange
        );
      }
    },
    {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        if (this.state.loaded && this.state.reload) {
          this.refs.editor.setContent(
            this.props.value || this.props.defaultValue
          );
        }
      }
    },
    {
      key: "handleMountSuccess",
      value: function handleMountSuccess() {
        EditorEventEmitter.mountEditorSuccess();
      }
    },
    {
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
    },
    {
      key: "getContent",
      value: function getContent() {
        return this.refs.editor ? this.refs.editor.getContent() : "";
      }
    },
    {
      key: "setContent",
      value: function setContent(content) {
        return this.refs.editor ? this.refs.editor.setContent(content) : "";
      }
    },
    {
      key: "focusEditor",
      value: function focusEditor() {
        return this.refs.editor ? this.refs.editor.focusEditor() : "";
      }
    },
    {
      key: "findDOMNode",
      value: function findDOMNode(refName) {
        return this.refs.editor ? this.refs.editor.findDOMNode(refName) : "";
      }
    },
    {
      key: "render",
      value: function render() {
        var loaded = this.state.loaded;

        var _props = this.props,
          value = _props.value,
          defaultValue = _props.defaultValue,
          props = _objectWithoutProperties(_props, ["value", "defaultValue"]);

        if (!this.state.loaded) {
          return React.createElement(
            "div",
            {
              id: props.id,
              className: "editor-contenteditable-div",
              style: { minHeight: "30px", border: "1px solid #ddd" }
            },
            "\u6B63\u5728\u52A0\u8F7D..."
          );
        } else {
          return React.createElement(
            EditorCore,
            _extends(
              {
                ref: "editor"
              },
              props,
              {
                onEditorMount: this.handleMountSuccess
              }
            )
          );
        }
      }
    }
  ]);

  return App;
})(React.Component);

export default App;

App.propTypes = {
  plugins: PropTypes.object,
  fontFamily: PropTypes.array,
  fontSize: PropTypes.array,
  paragraph: PropTypes.array,
  icons: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  defaultValue: PropTypes.string
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
  fontFamily: [
    {
      name: "宋体",
      value: "宋体, SimSun",
      defualt: true
    },
    {
      name: "隶书",
      value: "隶书, SimLi"
    },
    {
      name: "楷体",
      value: "楷体, SimKai"
    },
    {
      name: "微软雅黑",
      value: "微软雅黑, Microsoft YaHei"
    },
    {
      name: "黑体",
      value: "黑体, SimHei"
    },
    {
      name: "arial",
      value: "arial, helvetica, sans-serif"
    },
    {
      name: "arial black",
      value: "arial black, avant garde"
    },
    {
      name: "omic sans ms",
      value: "omic sans ms"
    },
    {
      name: "impact",
      value: "impact, chicago"
    },
    {
      name: "times new roman",
      value: "times new roman"
    },
    {
      name: "andale mono",
      value: "andale mono"
    }
  ],
  fontSize: [
    {
      name: "10px",
      value: "10"
    },
    {
      name: "12px",
      value: "12"
    },
    {
      name: "14px",
      value: "14",
      defualt: true
    },
    {
      name: "16px",
      value: "16"
    },
    {
      name: "18px",
      value: "18"
    },
    {
      name: "24px",
      value: "24"
    },
    {
      name: "32px",
      value: "32"
    },
    {
      name: "38px",
      value: "38"
    }
  ],
  paragraph: [
    {
      name: "段落",
      value: "p",
      defualt: true
    },
    {
      name: "标题1",
      value: "h1"
    },
    {
      name: "标题2",
      value: "h2"
    },
    {
      name: "标题3",
      value: "h3"
    },
    {
      name: "标题4",
      value: "h4"
    },
    {
      name: "标题5",
      value: "h5"
    },
    {
      name: "标题6",
      value: "h6"
    }
  ],
  icons: [
    // video map print preview drafts link unlink formula
    "source | undo redo | bold italic underline strikethrough fontborder emphasis | ",
    "paragraph fontfamily fontsize | superscript subscript | ",
    "forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ",
    "cleardoc  | indent outdent | justifyleft justifycenter justifyright justifyjustify | touppercase tolowercase | ",
    "horizontal date time  | image emotion spechars | inserttable"
  ],
  value: "",
  defaultValue: ""
};
