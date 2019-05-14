'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Dropdown = require('../base/Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TablePickerDropdown = function (_Component) {
  (0, _inherits3['default'])(TablePickerDropdown, _Component);

  function TablePickerDropdown(props) {
    (0, _classCallCheck3['default'])(this, TablePickerDropdown);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (TablePickerDropdown.__proto__ || Object.getPrototypeOf(TablePickerDropdown)).call(this, props));

    _this.state = {
      row: 0,
      column: 0,
      handle: function handle() {}
    };
    return _this;
  }

  (0, _createClass3['default'])(TablePickerDropdown, [{
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
        return _react2['default'].createElement('div', null);
      } else {
        return _react2['default'].createElement(
          _Dropdown2['default'],
          { ref: 'root', className: 'tablepicker-dropdown' },
          _react2['default'].createElement(
            'div',
            { className: 'infoarea' },
            ' ',
            _react2['default'].createElement(
              'span',
              null,
              row + "行 x " + column + "列"
            )
          ),
          _react2['default'].createElement(
            'div',
            { className: 'pickarea', onMouseOver: this.handleMouseEvent.bind(this), onMouseMove: this.handleMouseEvent.bind(this),
              onMouseOut: this.handleMouseOut.bind(this), onClick: this.handleClick.bind(this) },
            _react2['default'].createElement('div', { className: 'overlay', style: { width: column * 22, height: row * 22 } })
          )
        );
      }
    }
  }]);
  return TablePickerDropdown;
}(_react.Component);

exports['default'] = TablePickerDropdown;
module.exports = exports['default'];