'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.FormulaIcons = undefined;

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

var _TabGroup = require('../base/TabGroup');

var _TabGroup2 = _interopRequireDefault(_TabGroup);

var _Dropdown = require('../base/Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _EditorConstants = require('../../constants/EditorConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var FormulaIcons = exports.FormulaIcons = function (_Component) {
	(0, _inherits3['default'])(FormulaIcons, _Component);

	function FormulaIcons() {
		(0, _classCallCheck3['default'])(this, FormulaIcons);
		return (0, _possibleConstructorReturn3['default'])(this, (FormulaIcons.__proto__ || Object.getPrototypeOf(FormulaIcons)).apply(this, arguments));
	}

	(0, _createClass3['default'])(FormulaIcons, [{
		key: 'handleClick',
		value: function handleClick(e) {
			e = e || event;
			var target = e.target || e.srcElement;
			var latex = target.getAttribute("data-latex");
			var id = 'mathquill-' + new Date().valueOf();
			if (this.props.onSelectFormula) {
				this.props.onSelectFormula(e, latex, id);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var icons = this.props.icons;
			var handleClick = this.handleClick.bind(this);
			return _react2['default'].createElement(
				'ul',
				{ className: "formulas-icons " + this.props.name },
				icons.map(function (ele, pos) {
					return _react2['default'].createElement('li', { className: 'latex-icon', key: pos, 'data-latex': ele.latex, style: { "backgroundPosition": ele.backgroundPosition }, onClick: handleClick });
				})
			);
		}
	}]);
	return FormulaIcons;
}(_react.Component);

var FormulaDropdown = function (_React$Component) {
	(0, _inherits3['default'])(FormulaDropdown, _React$Component);

	function FormulaDropdown(props) {
		(0, _classCallCheck3['default'])(this, FormulaDropdown);

		var _this2 = (0, _possibleConstructorReturn3['default'])(this, (FormulaDropdown.__proto__ || Object.getPrototypeOf(FormulaDropdown)).call(this, props));

		_this2.state = {
			handle: function handle() {}
		};
		return _this2;
	}

	(0, _createClass3['default'])(FormulaDropdown, [{
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
		key: 'handleSelectFormula',
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
		key: 'render',
		value: function render() {
			var tabs = [{ title: "常用公式", component: _react2['default'].createElement(FormulaIcons, { icons: _EditorConstants.FormulaTypes.commonFormulas, name: 'common-formulas', onSelectFormula: this.handleSelectFormula.bind(this) }) }, { title: "符号", component: _react2['default'].createElement(FormulaIcons, { icons: _EditorConstants.FormulaTypes.symbolFormulas, name: 'symbol-formulas', onSelectFormula: this.handleSelectFormula.bind(this) }) }, { title: "字母", component: _react2['default'].createElement(FormulaIcons, { icons: _EditorConstants.FormulaTypes.arabicFormulas, name: 'arabic-formulas', onSelectFormula: this.handleSelectFormula.bind(this) }) }];
			if (this.props.hidden) {
				return _react2['default'].createElement('div', null);
			} else {
				return _react2['default'].createElement(
					_Dropdown2['default'],
					{ ref: 'root', className: 'formula-dropdown' },
					_react2['default'].createElement(_TabGroup2['default'], { tabs: tabs })
				);
			}
		}
	}]);
	return FormulaDropdown;
}(_react2['default'].Component);

exports['default'] = FormulaDropdown;


module.exports = FormulaDropdown;