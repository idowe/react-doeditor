import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";
import _possibleConstructorReturn from "babel-runtime/helpers/possibleConstructorReturn";
import _inherits from "babel-runtime/helpers/inherits";
import React from "react";
import TabGroup from "../base/TabGroup";
import Dialog from "../base/Dialog";

import { SpecialChars } from "../../constants/EditorConstants";

var SCChars = function (_React$Component) {
  _inherits(SCChars, _React$Component);

  function SCChars() {
    _classCallCheck(this, SCChars);

    return _possibleConstructorReturn(this, (SCChars.__proto__ || Object.getPrototypeOf(SCChars)).apply(this, arguments));
  }

  _createClass(SCChars, [{
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
      return React.createElement(
        "ul",
        { className: "special-chars " + this.props.name },
        chars.map(function (ele, pos) {
          return React.createElement(
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
}(React.Component);

var SpecialCharsDialog = function (_React$Component2) {
  _inherits(SpecialCharsDialog, _React$Component2);

  function SpecialCharsDialog(props) {
    _classCallCheck(this, SpecialCharsDialog);

    var _this2 = _possibleConstructorReturn(this, (SpecialCharsDialog.__proto__ || Object.getPrototypeOf(SpecialCharsDialog)).call(this, props));

    _this2.state = {
      handle: function handle() {}
    };
    return _this2;
  }

  _createClass(SpecialCharsDialog, [{
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
      for (var i = 0; i < SpecialChars.length; i++) {
        tabs.push({
          title: SpecialChars[i].title,
          chars: SpecialChars[i].chars,
          component: React.createElement(SCChars, {
            chars: SpecialChars[i].chars,
            name: "common-chars",
            onSelectChar: this.handleSelectChar.bind(this)
          })
        });
      }
      var buttons = [];
      if (this.props.hidden) {
        return React.createElement("div", null);
      } else {
        return React.createElement(
          Dialog,
          {
            ref: "root",
            className: "special-chars-dialog",
            width: 700,
            height: 508,
            title: "\u7279\u6B8A\u5B57\u7B26",
            buttons: buttons,
            onClose: this.close.bind(this)
          },
          React.createElement(TabGroup, { tabs: tabs })
        );
      }
    }
  }]);

  return SpecialCharsDialog;
}(React.Component);

export default SpecialCharsDialog;