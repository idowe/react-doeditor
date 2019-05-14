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

var _EditorConstants = require('../../constants/EditorConstants');

var _EditorDom = require('../../utils/EditorDom');

var _EditorDom2 = _interopRequireDefault(_EditorDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ColorDropdown = function (_React$Component) {
	(0, _inherits3['default'])(ColorDropdown, _React$Component);

	function ColorDropdown(props) {
		(0, _classCallCheck3['default'])(this, ColorDropdown);

		var _this = (0, _possibleConstructorReturn3['default'])(this, (ColorDropdown.__proto__ || Object.getPrototypeOf(ColorDropdown)).call(this, props));

		_this.state = {
			handle: function handle() {}
		};
		return _this;
	}

	(0, _createClass3['default'])(ColorDropdown, [{
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
		key: 'handleSelectColor',
		value: function handleSelectColor(e) {
			e = e || event;
			var target = e.target || e.srcElement;
			var color = target.getAttribute('data-color');
			if (this.state.handle) {
				this.state.handle(color);
			}
			this.close();
			_EditorDom2['default'].stopPropagation(e);
		}
	}, {
		key: 'render',
		value: function render() {
			var handleSelectColor = this.handleSelectColor.bind(this);
			if (this.props.hidden) {
				return _react2['default'].createElement('div', null);
			} else {
				return _react2['default'].createElement(
					_Dropdown2['default'],
					{ ref: 'root', className: 'color-dropdown' },
					_react2['default'].createElement(
						'table',
						null,
						_react2['default'].createElement(
							'tbody',
							null,
							_react2['default'].createElement(
								'tr',
								{ className: 'title-row', key: "title-row" },
								_react2['default'].createElement(
									'td',
									{ colSpan: 10 },
									'\u4E3B\u9898\u989C\u8272'
								)
							),
							_EditorConstants.ColorTypes.themeColors.map(function (colors, pos) {
								var firstRow = pos == 0;
								return _react2['default'].createElement(
									'tr',
									{ key: pos, className: firstRow ? "first-row" : "" },
									colors.map(function (color, index) {
										return _react2['default'].createElement(
											'td',
											{ key: index },
											_react2['default'].createElement('a', { className: 'color-anchor', 'data-color': color, style: { "backgroundColor": color }, onClick: handleSelectColor })
										);
									})
								);
							}),
							_react2['default'].createElement(
								'tr',
								{ className: 'title-row', key: "title-row2" },
								_react2['default'].createElement(
									'td',
									{ colSpan: 10 },
									'\u6807\u51C6\u989C\u8272'
								)
							),
							_react2['default'].createElement(
								'tr',
								{ className: 'last-row', key: "last-row" },
								_EditorConstants.ColorTypes.standardColors.map(function (color, pos) {
									return _react2['default'].createElement(
										'td',
										{ key: pos },
										_react2['default'].createElement('a', { className: 'color-anchor', 'data-color': color, style: { "backgroundColor": color }, onClick: handleSelectColor })
									);
								})
							)
						)
					)
				);
			}
		}
	}]);
	return ColorDropdown;
}(_react2['default'].Component);

exports['default'] = ColorDropdown;
module.exports = exports['default'];