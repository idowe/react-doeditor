import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

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
	_inherits(EditorIcon, _Component);

	function EditorIcon() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, EditorIcon);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EditorIcon.__proto__ || Object.getPrototypeOf(EditorIcon)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (e) {
			e = e || event;
			var target = e.target || e.srcElement;
			while (target.className.indexOf("editor-icon") == -1) {
				target = target.parentElement;
			}
			e.target = target;

			var _this$props = _this.props,
			    onClick = _this$props.onClick,
			    props = _objectWithoutProperties(_this$props, ['onClick']);

			if (_this.props.onClick) {
				_this.props.onClick(e, _extends({}, props));
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(EditorIcon, [{
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
			var root = ReactDOM.findDOMNode(this.refs.root);
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
			    props = _objectWithoutProperties(_props, ['icon', 'active', 'disabled', 'showHtml', 'onClick', 'className']);

			var _disabled = showHtml && icon != "source" && icon != "separator";
			var _className = className || "editor-icon icon-" + icon;
			if (icon == "fontsize" || icon == "fontfamily" || icon == "paragraph") {
				return React.createElement(
					'span',
					_extends({ ref: 'root', className: classNames(_className, { active: active, disabled: disabled || _disabled }), onClick: this.handleClick }, props),
					React.createElement(
						'span',
						{ className: 'icon-label' },
						props.name
					),
					React.createElement('span', { className: 'icon-caret' })
				);
			} else {
				return React.createElement('span', _extends({ ref: 'root', className: classNames(_className, { active: active, disabled: disabled || _disabled }), onClick: this.handleClick }, props));
			}
		}
	}]);

	return EditorIcon;
}(Component);

export default EditorIcon;