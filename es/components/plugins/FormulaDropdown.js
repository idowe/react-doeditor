import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";
import _possibleConstructorReturn from "babel-runtime/helpers/possibleConstructorReturn";
import _inherits from "babel-runtime/helpers/inherits";
import React, { Component } from "react";

import TabGroup from "../base/TabGroup";
import Dropdown from "../base/Dropdown";
import { FormulaTypes } from "../../constants/EditorConstants";

export var FormulaIcons = function (_Component) {
  _inherits(FormulaIcons, _Component);

  function FormulaIcons() {
    _classCallCheck(this, FormulaIcons);

    return _possibleConstructorReturn(this, (FormulaIcons.__proto__ || Object.getPrototypeOf(FormulaIcons)).apply(this, arguments));
  }

  _createClass(FormulaIcons, [{
    key: "handleClick",
    value: function handleClick(e) {
      e = e || event;
      var target = e.target || e.srcElement;
      var latex = target.getAttribute("data-latex");
      var id = "mathquill-" + new Date().valueOf();
      if (this.props.onSelectFormula) {
        this.props.onSelectFormula(e, latex, id);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var icons = this.props.icons;
      var handleClick = this.handleClick.bind(this);
      return React.createElement(
        "ul",
        { className: "formulas-icons " + this.props.name },
        icons.map(function (ele, pos) {
          return React.createElement("li", {
            className: "latex-icon",
            key: pos,
            "data-latex": ele.latex,
            style: { backgroundPosition: ele.backgroundPosition },
            onClick: handleClick
          });
        })
      );
    }
  }]);

  return FormulaIcons;
}(Component);

var FormulaDropdown = function (_React$Component) {
  _inherits(FormulaDropdown, _React$Component);

  function FormulaDropdown(props) {
    _classCallCheck(this, FormulaDropdown);

    var _this2 = _possibleConstructorReturn(this, (FormulaDropdown.__proto__ || Object.getPrototypeOf(FormulaDropdown)).call(this, props));

    _this2.state = {
      handle: function handle() {}
    };
    return _this2;
  }

  _createClass(FormulaDropdown, [{
    key: "open",
    value: function open(position, handle) {
      this.setState({
        handle: handle
      });
      this.refs.root.open(position);
    }
  }, {
    key: "close",
    value: function close() {
      if (this.refs.root) this.refs.root.close();
    }
  }, {
    key: "toggle",
    value: function toggle(position, handle) {
      this.setState({
        handle: handle
      });
      this.refs.root.toggle(position);
    }
  }, {
    key: "handleSelectFormula",
    value: function handleSelectFormula(e, latex, id) {
      e = e || event;
      if (this.state.handle) {
        this.state.handle(latex, id);
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
      var tabs = [{
        title: "常用公式",
        component: React.createElement(FormulaIcons, {
          icons: FormulaTypes.commonFormulas,
          name: "common-formulas",
          onSelectFormula: this.handleSelectFormula.bind(this)
        })
      }, {
        title: "符号",
        component: React.createElement(FormulaIcons, {
          icons: FormulaTypes.symbolFormulas,
          name: "symbol-formulas",
          onSelectFormula: this.handleSelectFormula.bind(this)
        })
      }, {
        title: "字母",
        component: React.createElement(FormulaIcons, {
          icons: FormulaTypes.arabicFormulas,
          name: "arabic-formulas",
          onSelectFormula: this.handleSelectFormula.bind(this)
        })
      }];
      if (this.props.hidden) {
        return React.createElement("div", null);
      } else {
        return React.createElement(
          Dropdown,
          { ref: "root", className: "formula-dropdown" },
          React.createElement(TabGroup, { tabs: tabs })
        );
      }
    }
  }]);

  return FormulaDropdown;
}(React.Component);

export default FormulaDropdown;