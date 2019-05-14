import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';

import EditorIcon from './EditorIcon';
import EditorDom from '../../utils/EditorDom';
import { EditorIconTypes } from '../../constants/EditorConstants';
import EditorHistory from '../../utils/EditorHistory';

var EditorToolbar = function (_React$Component) {
	_inherits(EditorToolbar, _React$Component);

	function EditorToolbar() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, EditorToolbar);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EditorToolbar.__proto__ || Object.getPrototypeOf(EditorToolbar)).call.apply(_ref, [this].concat(args))), _this), _this.handleIconClick = function (e, state) {
			if (_this.props.onIconClick) {
				_this.props.onIconClick(e, state);
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(EditorToolbar, [{
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
			editorState.icons["undo"] = { disabled: !EditorHistory.canUndo() };
			editorState.icons["redo"] = { disabled: !EditorHistory.canRedo() };
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
				returnArray[i] = EditorIconTypes[_icons[i]] || customIcons.find(function (cusIcon) {
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
			return React.createElement(
				'div',
				{ className: 'editor-toolbar', onMouseDown: EditorDom.stopPropagation, onClick: EditorDom.stopPropagation },
				icons.map(function (icon, pos) {
					var props = icon;
					return React.createElement(EditorIcon, _extends({ key: pos }, props));
				}),
				this.props.children
			);
		}
	}]);

	return EditorToolbar;
}(React.Component);

export default EditorToolbar;


EditorToolbar.propTypes = {
	icons: PropTypes.array
};
EditorToolbar.defaultProps = {
	icons: []
};