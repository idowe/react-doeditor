import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";
import _possibleConstructorReturn from "babel-runtime/helpers/possibleConstructorReturn";
import _inherits from "babel-runtime/helpers/inherits";
import React from "react";
import ReactDOM from "react-dom";
import EditorSelection from "../../utils/EditorSelection";
import EditorDom from "../../utils/EditorDom";
import EditorResize from "../../utils/EditorResize";

var EditorContentEditableDiv = function (_React$Component) {
  _inherits(EditorContentEditableDiv, _React$Component);

  function EditorContentEditableDiv(props) {
    _classCallCheck(this, EditorContentEditableDiv);

    var _this = _possibleConstructorReturn(this, (EditorContentEditableDiv.__proto__ || Object.getPrototypeOf(EditorContentEditableDiv)).call(this, props));

    _this.handleWindowMouseDown = function (e) {
      e = e || event;
      var target = e.target || e.srcElement;
      var tagName = target.tagName.toUpperCase();
      var FormControls = ["TEXTAREA", "INPUT", "SELECT", "OPTIONS"];
      if (FormControls.indexOf(tagName) != -1) {
        return;
      }
      EditorSelection.clearRange();
    };

    _this.handleMouseDown = function (e) {
      EditorSelection.clearRange();
      EditorDom.stopPropagation(e);
    };

    _this.handleMouseUp = function (e) {
      EditorSelection.createRange();
      if (_this.props.onRangeChange) {
        _this.props.onRangeChange(e);
      }
      EditorDom.stopPropagation(e);
    };

    _this.state = {
      content: ""
    };
    return _this;
  }

  _createClass(EditorContentEditableDiv, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener("keydown", this.props.handleKeyDown);
      window.addEventListener("keyup", this.props.handleKeyUp);
      window.addEventListener("mousedown", this.handleWindowMouseDown);
      window.addEventListener("mouseup", this.handleMouseUp);
      setTimeout(this.props.onEditorMount, 50);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      // reload判断当前是否可以允许刷新
      // loaded状态变化时，务必重新刷新
      var currentValue = nextProps.value;
      var editorValue = this.getContent();

      if (currentValue == editorValue) {
        return false;
      }
      return true;
    }
  }, {
    key: "componentWillUpdate",
    value: function componentWillUpdate() {
      // EditorSelection.cloneRange();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      // EditorSelection.cloneRange();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("mousedown", this.handleWindowMouseDown);
      window.removeEventListener("mouseup", this.handleMouseUp);
      window.removeEventListener("keydown", this.props.handleKeyDown);
      window.removeEventListener("keyup", this.props.handleKeyUp);
    }
  }, {
    key: "getContent",
    value: function getContent() {
      var target = ReactDOM.findDOMNode(this.refs.edit);
      return target.innerHTML;
    }
  }, {
    key: "setContent",
    value: function setContent(content) {
      if (this.getContent() == content) return;
      this.setState({
        content: content
      });
      var target = ReactDOM.findDOMNode(this.refs.edit);
      target.innerHTML = content;
    }
  }, {
    key: "getName",
    value: function getName() {
      return "div";
    }
  }, {
    key: "setResizeTarget",
    value: function setResizeTarget(target) {
      this.refs.resize.setTarget(target);
    }
  }, {
    key: "clearResizeTarget",
    value: function clearResizeTarget() {
      this.refs.resize.clearTarget();
    }
  }, {
    key: "getEditorRange",
    value: function getEditorRange() {
      return ReactDOM.findDOMNode(this.refs.edit);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "editor-contenteditable-div" },
        React.createElement(EditorResize, { ref: "resize" }),
        React.createElement("div", {
          className: "editable-range",
          ref: "edit",
          onMouseUp: this.handleMouseUp,
          onMouseDown: this.handleMouseDown,
          onInput: function onInput(e) {
            EditorSelection.selection = EditorSelection.getSelection();
            if (EditorSelection.selection && EditorSelection.selection.rangeCount > 0) {
              EditorSelection.range = EditorSelection.selection.getRangeAt(0).cloneRange();
            } else {
              EditorSelection.range = null;
            }
          },
          contentEditable: true,
          dangerouslySetInnerHTML: { __html: this.state.content }
        })
      );
    }
  }]);

  return EditorContentEditableDiv;
}(React.Component);

export default EditorContentEditableDiv;