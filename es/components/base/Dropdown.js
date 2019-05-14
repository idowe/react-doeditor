import _extends from "babel-runtime/helpers/extends";
import _objectWithoutProperties from "babel-runtime/helpers/objectWithoutProperties";
import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";
import _possibleConstructorReturn from "babel-runtime/helpers/possibleConstructorReturn";
import _inherits from "babel-runtime/helpers/inherits";
var React = require("react");

var Dropdown = function (_React$Component) {
  _inherits(Dropdown, _React$Component);

  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

    _this.state = {
      show: false,
      position: {
        x: 0,
        y: 0
      }
    };
    return _this;
  }

  _createClass(Dropdown, [{
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
          props = _objectWithoutProperties(_props, ["className", "style"]);

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
          className: "dropdown" + (className ? " " + className : "")
        }, props),
        React.createElement("div", { className: "dropdown-caret" }),
        this.props.children
      );
    }
  }]);

  return Dropdown;
}(React.Component);

export default Dropdown;