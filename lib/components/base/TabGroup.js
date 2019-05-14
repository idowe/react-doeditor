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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var React = require("react");

var TabGroup = function (_React$Component) {
  (0, _inherits3["default"])(TabGroup, _React$Component);

  function TabGroup(props) {
    (0, _classCallCheck3["default"])(this, TabGroup);

    var _this = (0, _possibleConstructorReturn3["default"])(this, (TabGroup.__proto__ || Object.getPrototypeOf(TabGroup)).call(this, props));

    _this.state = {
      tabIndex: 0
    };
    return _this;
  }

  (0, _createClass3["default"])(TabGroup, [{
    key: "setTabIndex",
    value: function setTabIndex(index) {
      this.setState({
        tabIndex: index
      });
    }
  }, {
    key: "getTabIndex",
    value: function getTabIndex() {
      return this.state.tabIndex;
    }
  }, {
    key: "handleClick",
    value: function handleClick(e) {
      e = e || event;
      var target = e.target || e.srcElement;
      var index = parseInt(target.getAttribute("data-index"));
      this.setTabIndex(index);
      if (e.stopPropagation) {
        e.stopPropagation();
      } else {
        e.cancelBubble = true;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var tabIndex = this.state.tabIndex;
      var tabs = this.props.tabs || [];
      var component = tabs[tabIndex] ? tabs[tabIndex].component : "";
      var handleClick = this.handleClick.bind(this);
      return React.createElement(
        "div",
        { className: "tab-group" },
        React.createElement(
          "ul",
          { className: "tab-nav" },
          tabs.map(function (ele, pos) {
            return React.createElement(
              "li",
              {
                key: pos,
                className: "tab-item" + (tabIndex == pos ? " active" : "")
              },
              React.createElement(
                "a",
                { "data-index": pos, className: "tab-text", onClick: handleClick },
                ele.title
              )
            );
          })
        ),
        React.createElement(
          "div",
          { className: "tab-content" },
          component
        )
      );
    }
  }]);
  return TabGroup;
}(React.Component);

exports["default"] = TabGroup;
module.exports = exports['default'];