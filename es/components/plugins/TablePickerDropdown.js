import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import Dropdown from '../base/Dropdown';

var TablePickerDropdown = function (_Component) {
  _inherits(TablePickerDropdown, _Component);

  function TablePickerDropdown(props) {
    _classCallCheck(this, TablePickerDropdown);

    var _this = _possibleConstructorReturn(this, (TablePickerDropdown.__proto__ || Object.getPrototypeOf(TablePickerDropdown)).call(this, props));

    _this.state = {
      row: 0,
      column: 0,
      handle: function handle() {}
    };
    return _this;
  }

  _createClass(TablePickerDropdown, [{
    key: 'open',
    value: function open(position, handle) {
      this.setState({
        handle: handle
      });
      this.refs.root.open(position);
    }
  }, {
    key: 'close',
    value: function close() {
      if (this.refs.root) this.refs.root.close();
    }
  }, {
    key: 'toggle',
    value: function toggle(position, handle) {
      this.setState({
        handle: handle
      });
      this.refs.root.toggle(position);
    }
  }, {
    key: 'handleMouseEvent',
    value: function handleMouseEvent(e) {
      e = e || event;
      var target = e.target || e.srcElement;
      var parentPostion = target.getBoundingClientRect();
      var column = Math.ceil((e.clientX - parentPostion.left) / 22);
      var row = Math.ceil((e.clientY - parentPostion.top) / 22);
      if (row < 0) row = 0;
      if (column < 0) column = 0;

      if (row > 10) row = 10;
      if (column > 10) column = 10;
      this.setState({
        row: row,
        column: column
      });
    }
  }, {
    key: 'handleMouseOut',
    value: function handleMouseOut(e) {
      this.setState({
        row: 0,
        column: 0
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      // insert table
      var Table = document.createElement("table");
      Table.className = "editor-table";
      var TBody = Table.createTBody();
      for (var i = 0; i < this.state.row; i++) {
        var Tr = TBody.insertRow();
        for (var j = 0; j < this.state.column; j++) {
          var Td = Tr.insertCell();
          Td.width = 200;
        }
      }
      this.state.handle(Table);
      this.refs.root.close();
    }
  }, {
    key: 'render',
    value: function render() {
      var row = this.state.row;
      var column = this.state.column;
      if (this.props.hidden) {
        return React.createElement('div', null);
      } else {
        return React.createElement(
          Dropdown,
          { ref: 'root', className: 'tablepicker-dropdown' },
          React.createElement(
            'div',
            { className: 'infoarea' },
            ' ',
            React.createElement(
              'span',
              null,
              row + "行 x " + column + "列"
            )
          ),
          React.createElement(
            'div',
            { className: 'pickarea', onMouseOver: this.handleMouseEvent.bind(this), onMouseMove: this.handleMouseEvent.bind(this),
              onMouseOut: this.handleMouseOut.bind(this), onClick: this.handleClick.bind(this) },
            React.createElement('div', { className: 'overlay', style: { width: column * 22, height: row * 22 } })
          )
        );
      }
    }
  }]);

  return TablePickerDropdown;
}(Component);

export default TablePickerDropdown;