'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
* @icon: 图标名称 string
* @disabled: 是否禁用 bool
* @onClick: 暴露点击事件 function
* @title: 提示 string
* @active: 是否选中 bool
* @showHtml: 是否当前是显示html属性
* @color: 前景色和背景色
**/
var EditorIcon = function (_Component) {
	(0, _inherits3['default'])(EditorIcon, _Component);

	function EditorIcon() {
		var _ref;

		var _temp, _this, _ret;

		(0, _classCallCheck3['default'])(this, EditorIcon);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = EditorIcon.__proto__ || Object.getPrototypeOf(EditorIcon)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (e) {
			e = e || event;
			var target = e.target || e.srcElement;
			while (target.className.indexOf("editor-icon") == -1) {
				target = target.parentElement;
			}
			e.target = target;

			var _this$props = _this.props,
			    onClick = _this$props.onClick,
			    props = (0, _objectWithoutProperties3['default'])(_this$props, ['onClick']);

			if (_this.props.onClick) {
				_this.props.onClick(e, (0, _extends3['default'])({}, props));
			}
		}, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
	}

	(0, _createClass3['default'])(EditorIcon, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.updateStyle();
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			this.updateStyle();
		}
	}, {
		key: 'updateStyle',
		value: function updateStyle() {
			var root = _reactDom2['default'].findDOMNode(this.refs.root);
			var icon = this.props.icon;
			switch (this.props.icon) {
				case "forecolor":
				case "backcolor":
					var color = this.props.color ? this.props.color : "transparent";
					root.id = icon + "_" + new Date().valueOf();
					var style = root.childElementCount > 0 ? root.children[0] : document.createElement('style');
					style.innerHTML = ".icon-" + icon + "#" + root.id + ":before{content:'';border-bottom:3px solid " + color + ";}";
					if (root.childElementCount == 0) root.appendChild(style);
					break;
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    icon = _props.icon,
			    active = _props.active,
			    disabled = _props.disabled,
			    showHtml = _props.showHtml,
			    onClick = _props.onClick,
			    className = _props.className,
			    props = (0, _objectWithoutProperties3['default'])(_props, ['icon', 'active', 'disabled', 'showHtml', 'onClick', 'className']);

			var _disabled = showHtml && icon != "source" && icon != "separator";
			var _className = className || "editor-icon icon-" + icon;
			if (icon == "fontsize" || icon == "fontfamily" || icon == "paragraph") {
				return _react2['default'].createElement(
					'span',
					(0, _extends3['default'])({ ref: 'root', className: (0, _classnames2['default'])(_className, { active: active, disabled: disabled || _disabled }), onClick: this.handleClick }, props),
					_react2['default'].createElement(
						'span',
						{ className: 'icon-label' },
						props.name
					),
					_react2['default'].createElement('span', { className: 'icon-caret' })
				);
			} else {
				return _react2['default'].createElement('span', (0, _extends3['default'])({ ref: 'root', className: (0, _classnames2['default'])(_className, { active: active, disabled: disabled || _disabled }), onClick: this.handleClick }, props));
			}
		}
	}]);
	return EditorIcon;
}(_react.Component);

exports['default'] = EditorIcon;
module.exports = exports['default'];