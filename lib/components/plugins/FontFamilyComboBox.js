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

var _ComboBox = require('../base/ComboBox');

var _ComboBox2 = _interopRequireDefault(_ComboBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var FontFamilyDropdown = function (_Component) {
	(0, _inherits3['default'])(FontFamilyDropdown, _Component);

	function FontFamilyDropdown(props) {
		(0, _classCallCheck3['default'])(this, FontFamilyDropdown);

		var _this = (0, _possibleConstructorReturn3['default'])(this, (FontFamilyDropdown.__proto__ || Object.getPrototypeOf(FontFamilyDropdown)).call(this, props));

		_this.state = {
			handle: function handle() {}
		};
		return _this;
	}

	(0, _createClass3['default'])(FontFamilyDropdown, [{
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
		key: 'handleSelect',
		value: function handleSelect(e) {
			e = e || event;
			var target = e.target || e.srcElement;
			var value = target.getAttribute('data-value');
			if (this.state.handle) {
				this.state.handle(value);
			}
			if (e.stopPropagation) {
				e.stopPropagation();
			} else {
				e.cancelBubble = true;
			}
			this.close();
		}
	}, {
		key: 'render',
		value: function render() {
			var handleSelect = this.handleSelect.bind(this);
			var fontfamily = this.props.fontfamily ? this.props.fontfamily : [];
			var props = this.props;
			if (this.props.hidden) {
				return _react2['default'].createElement('div', null);
			} else {
				return _react2['default'].createElement(
					_ComboBox2['default'],
					{ ref: 'root', className: 'fontfamily-combobox' },
					_react2['default'].createElement(
						'ul',
						null,
						fontfamily.map(function (ele, pos) {
							return _react2['default'].createElement(
								'li',
								{ className: ele.value == props.value ? "active" : "", key: pos, 'data-value': ele.value, onClick: handleSelect },
								_react2['default'].createElement(
									'span',
									{ 'data-value': ele.value, style: { "fontFamily": ele.value } },
									ele.name
								)
							);
						})
					)
				);
			}
		}
	}]);
	return FontFamilyDropdown;
}(_react.Component);

exports['default'] = FontFamilyDropdown;
module.exports = exports['default'];