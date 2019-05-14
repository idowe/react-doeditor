'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _EditorIcon = require('./EditorIcon');

var _EditorIcon2 = _interopRequireDefault(_EditorIcon);

var _EditorDom = require('../../utils/EditorDom');

var _EditorDom2 = _interopRequireDefault(_EditorDom);

var _EditorConstants = require('../../constants/EditorConstants');

var _EditorHistory = require('../../utils/EditorHistory');

var _EditorHistory2 = _interopRequireDefault(_EditorHistory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var EditorToolbar = function (_React$Component) {
	(0, _inherits3['default'])(EditorToolbar, _React$Component);

	function EditorToolbar() {
		var _ref;

		var _temp, _this, _ret;

		(0, _classCallCheck3['default'])(this, EditorToolbar);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = EditorToolbar.__proto__ || Object.getPrototypeOf(EditorToolbar)).call.apply(_ref, [this].concat(args))), _this), _this.handleIconClick = function (e, state) {
			if (_this.props.onIconClick) {
				_this.props.onIconClick(e, state);
			}
		}, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
	}

	(0, _createClass3['default'])(EditorToolbar, [{
		key: 'getNameByValue',
		value: function getNameByValue(arr, value) {
			var filterArr = arr.filter(function (ele) {
				return ele.value == value;
			});
			if (filterArr.length > 0) {
				return filterArr[0].name;
			} else {
				return "";
			}
		}
	}, {
		key: 'getIcons',
		value: function getIcons() {
			var editorState = this.props.editorState;
			editorState.icons["undo"] = { disabled: !_EditorHistory2['default'].canUndo() };
			editorState.icons["redo"] = { disabled: !_EditorHistory2['default'].canRedo() };
			if (editorState.icons["fontsize"]) editorState.icons["fontsize"].name = this.getNameByValue(this.props.fontsize, editorState.icons["fontsize"].value);
			if (editorState.icons["paragraph"]) editorState.icons["paragraph"].name = this.getNameByValue(this.props.paragraph, editorState.icons["paragraph"].value);
			if (editorState.icons["fontfamily"]) editorState.icons["fontfamily"].name = this.getNameByValue(this.props.fontfamily, editorState.icons["fontfamily"].value);

			var icons = this.props.icons;
			var customIcons = this.props.customIcons;
			var _icons = icons.join(" ").replace(/\|/gm, "separator").split(" ");
			_icons = _icons.filter(function (ico) {
				return ico != "";
			});
			var returnArray = [];
			for (var i = 0; i < _icons.length; i++) {
				returnArray[i] = _EditorConstants.EditorIconTypes[_icons[i]] || customIcons.find(function (cusIcon) {
					return cusIcon.name === _icons[i];
				}) || { title: "自定义按钮" };
				returnArray[i].onClick = this.handleIconClick;
				returnArray[i].icon = _icons[i];
				if (editorState.icons[_icons[i]]) {
					returnArray[i].disabled = !!editorState.icons[_icons[i]].disabled;
					returnArray[i].active = !!editorState.icons[_icons[i]].active;
					returnArray[i].color = editorState.icons[_icons[i]].color;
					returnArray[i].value = editorState.icons[_icons[i]].value;
					returnArray[i].name = editorState.icons[_icons[i]].name;
				}
				returnArray[i].showHtml = !!editorState.showHtml;
			}
			return returnArray;
		}
	}, {
		key: 'render',
		value: function render() {
			var icons = this.getIcons();
			return _react2['default'].createElement(
				'div',
				{ className: 'editor-toolbar', onMouseDown: _EditorDom2['default'].stopPropagation, onClick: _EditorDom2['default'].stopPropagation },
				icons.map(function (icon, pos) {
					var props = icon;
					return _react2['default'].createElement(_EditorIcon2['default'], (0, _extends3['default'])({ key: pos }, props));
				}),
				this.props.children
			);
		}
	}]);
	return EditorToolbar;
}(_react2['default'].Component);

exports['default'] = EditorToolbar;


EditorToolbar.propTypes = {
	icons: _propTypes2['default'].array
};
EditorToolbar.defaultProps = {
	icons: []
};
module.exports = exports['default'];