import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";
import _possibleConstructorReturn from "babel-runtime/helpers/possibleConstructorReturn";
import _inherits from "babel-runtime/helpers/inherits";
var React = require("react");

var TabGroup = function (_React$Component) {
  _inherits(TabGroup, _React$Component);

  function TabGroup(props) {
    _classCallCheck(this, TabGroup);

    var _this = _possibleConstructorReturn(this, (TabGroup.__proto__ || Object.getPrototypeOf(TabGroup)).call(this, props));

    _this.state = {
      tabIndex: 0
    };
    return _this;
  }

  _createClass(TabGroup, [{
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

export default TabGroup;