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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _EditorDom = require('./EditorDom');

var _EditorDom2 = _interopRequireDefault(_EditorDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// resize context
var minWidth = 12;
var minHeight = 12;

var EditorResize = function (_Component) {
	(0, _inherits3['default'])(EditorResize, _Component);

	function EditorResize() {
		var _ref;

		var _temp, _this, _ret;

		(0, _classCallCheck3['default'])(this, EditorResize);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = EditorResize.__proto__ || Object.getPrototypeOf(EditorResize)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			direction: null,
			target: null,
			position: {
				x: 0,
				y: 0
			},
			width: 0,
			height: 0
		}, _this.componentDidMount = function () {
			_this.parentElement = _this.root.parentElement.querySelector('.editable-range');
			_this.parentElement.addEventListener('scroll', _this.resetPosition);
		}, _this.componentWillUnmount = function () {
			_this.parentElement.removeEventListener('scroll', _this.resetPosition);
		}, _this.resetPosition = function () {
			if (!_this.state.target) return;
			if (!_this.state.show) return;
			if (_this.state.direction) return;
			var position = _EditorDom2['default'].getOffsetRootParentPosition(_this.state.target, _this.parentElement);
			_this.setState({
				position: { x: position.x, y: position.y }
			});
		}, _this.handleMouseDown = function (e) {
			e = e || event;
			var target = e.target || e.srcElement;
			var className = target.className;
			_this.startPosition = _this.getMousePosition(e);
			_this.targetPosition = _this.state.target.getBoundingClientRect();

			var direction = null;
			_this.clearSelect();
			if (className.indexOf("nw-resize") != -1) direction = "nw-resize";
			if (className.indexOf("ne-resize") != -1) direction = "ne-resize";
			if (className.indexOf("sw-resize") != -1) direction = "sw-resize";
			if (className.indexOf("se-resize") != -1) direction = "se-resize";

			window.removeEventListener("mouseup", _this.handleMouseUp);
			window.removeEventListener("mousemove", _this.handleMouseMove);
			window.addEventListener("mouseup", _this.handleMouseUp);
			window.addEventListener("mousemove", _this.handleMouseMove);

			_this.setState({
				direction: direction
			});

			_EditorDom2['default'].stopPropagation(e);
		}, _this.handleMouseMove = function (e) {
			_this.updatePosition(e, _this.state.direction);
		}, _this.handleMouseUp = function (e) {
			window.removeEventListener("mouseup", _this.handleMouseUp);
			window.removeEventListener("mousemove", _this.handleMouseMove);
			_this.updatePosition(e, null);
		}, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
	}

	(0, _createClass3['default'])(EditorResize, [{
		key: 'setTarget',
		value: function setTarget(target) {
			var position = _EditorDom2['default'].getOffsetRootParentPosition(target, this.parentElement);
			var width = position.w;
			var height = position.h;
			var offsetPosition = { x: position.x, y: position.y };
			this.setState({
				target: target,
				width: width,
				height: height,
				show: true,
				position: offsetPosition
			});
		}
	}, {
		key: 'getTarget',
		value: function getTarget() {
			return this.state.target;
		}
	}, {
		key: 'clearTarget',
		value: function clearTarget() {
			this.setState({
				target: null,
				show: false
			});
		}
	}, {
		key: 'clearSelect',
		value: function clearSelect(e) {
			if (window.getSelection) {
				window.getSelection().removeAllRanges();
			} else {
				document.selection.empty();
			}
		}
	}, {
		key: 'getMousePosition',
		value: function getMousePosition(e) {
			e = e || window.event;
			var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
			var scrollY = document.documentElement.scrollTop || document.body.scrollTop;

			var x = parseFloat(e.pageX || e.clientX + scrollX);
			var y = parseFloat(e.pageY || e.clientY + scrollY);

			return { x: x, y: y };
		}
	}, {
		key: 'updatePosition',
		value: function updatePosition(e, direction) {
			if (!this.state.direction) return;
			if (!this.state.show) return;
			this.clearSelect();
			var curPosition = this.getMousePosition(e);
			var startPosition = this.startPosition;
			var dx = curPosition.x - startPosition.x;
			var dy = curPosition.y - startPosition.y;
			var width = this.state.width;
			var height = this.state.height;

			switch (this.state.direction) {
				case "nw-resize":
					width -= dx;
					height -= dy;
					break;
				case "ne-resize":
					width += dx;
					height -= dy;
					break;
				case "sw-resize":
					width -= dx;
					height += dy;
					break;
				case "se-resize":
					width += dx;
					height += dy;
					break;
			}

			this.startPosition = curPosition;

			if (width < minWidth) width = minWidth;
			if (height < minHeight) height = minHeight;

			if (this.state.target) {
				this.state.target.style.width = width + "px";
				this.state.target.style.height = height + "px";
			}

			var position = _EditorDom2['default'].getOffsetRootParentPosition(this.state.target, this.parentElement);

			this.setState({
				width: width,
				height: height,
				position: { x: position.x, y: position.y },
				direction: direction
			});

			_EditorDom2['default'].stopPropagation(e);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var style = {
				width: this.state.width,
				height: this.state.height,
				left: this.state.position.x,
				top: this.state.position.y,
				display: this.state.show ? "block" : "none",
				positoin: "absolute"
			};
			return _react2['default'].createElement(
				'div',
				{ className: 'editor-resize-container', ref: function ref(_ref2) {
						return _this2.root = _ref2;
					} },
				_react2['default'].createElement(
					'div',
					{ className: 'editor-resize', style: style },
					_react2['default'].createElement('div', { className: 'block-resize nw-resize', onMouseDown: this.handleMouseDown, onMouseMove: this.handleMouseMove, onMouseUp: this.handleMouseUp }),
					_react2['default'].createElement('div', { className: 'block-resize ne-resize', onMouseDown: this.handleMouseDown, onMouseMove: this.handleMouseMove, onMouseUp: this.handleMouseUp }),
					_react2['default'].createElement('div', { className: 'block-resize sw-resize', onMouseDown: this.handleMouseDown, onMouseMove: this.handleMouseMove, onMouseUp: this.handleMouseUp }),
					_react2['default'].createElement('div', { className: 'block-resize se-resize', onMouseDown: this.handleMouseDown, onMouseMove: this.handleMouseMove, onMouseUp: this.handleMouseUp })
				)
			);
		}
	}]);
	return EditorResize;
}(_react.Component);

exports['default'] = EditorResize;
module.exports = exports['default'];