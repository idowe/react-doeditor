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

var _EditorSelection = require('../../utils/EditorSelection');

var _EditorSelection2 = _interopRequireDefault(_EditorSelection);

var _EditorDom = require('../../utils/EditorDom');

var _EditorDom2 = _interopRequireDefault(_EditorDom);

var _EditorResize = require('../../utils/EditorResize');

var _EditorResize2 = _interopRequireDefault(_EditorResize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var EditorContentEditableDiv = function (_React$Component) {
	(0, _inherits3['default'])(EditorContentEditableDiv, _React$Component);

	function EditorContentEditableDiv(props) {
		(0, _classCallCheck3['default'])(this, EditorContentEditableDiv);

		var _this = (0, _possibleConstructorReturn3['default'])(this, (EditorContentEditableDiv.__proto__ || Object.getPrototypeOf(EditorContentEditableDiv)).call(this, props));

		_this.handleWindowMouseDown = function (e) {
			e = e || event;
			var target = e.target || e.srcElement;
			var tagName = target.tagName.toUpperCase();
			var FormControls = ["TEXTAREA", "INPUT", "SELECT", "OPTIONS"];
			if (FormControls.indexOf(tagName) != -1) {
				return;
			}
			_EditorSelection2['default'].clearRange();
		};

		_this.handleMouseDown = function (e) {
			_EditorSelection2['default'].clearRange();
			_EditorDom2['default'].stopPropagation(e);
		};

		_this.handleMouseUp = function (e) {
			_EditorSelection2['default'].createRange();
			if (_this.props.onRangeChange) {
				_this.props.onRangeChange(e);
			}
			_EditorDom2['default'].stopPropagation(e);
		};

		_this.state = {
			content: ""
		};
		return _this;
	}

	(0, _createClass3['default'])(EditorContentEditableDiv, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			window.addEventListener('keydown', this.props.handleKeyDown);
			window.addEventListener('keyup', this.props.handleKeyUp);
			window.addEventListener("mousedown", this.handleWindowMouseDown);
			window.addEventListener("mouseup", this.handleMouseUp);
			setTimeout(this.props.onEditorMount, 50);
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			// reload判断当前是否可以允许刷新
			// loaded状态变化时，务必重新刷新
			var currentValue = nextProps.value;
			var editorValue = this.getContent();

			if (currentValue == editorValue) {
				return false;
			}
			return true;
		}
	}, {
		key: 'componentWillUpdate',
		value: function componentWillUpdate() {
			// EditorSelection.cloneRange();
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			// EditorSelection.cloneRange();
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			window.removeEventListener("mousedown", this.handleWindowMouseDown);
			window.removeEventListener("mouseup", this.handleMouseUp);
			window.removeEventListener("keydown", this.props.handleKeyDown);
			window.removeEventListener("keyup", this.props.handleKeyUp);
		}
	}, {
		key: 'getContent',
		value: function getContent() {
			var target = _reactDom2['default'].findDOMNode(this.refs.edit);
			return target.innerHTML;
		}
	}, {
		key: 'setContent',
		value: function setContent(content) {
			if (this.getContent() == content) return;
			this.setState({
				content: content
			});
			var target = _reactDom2['default'].findDOMNode(this.refs.edit);
			target.innerHTML = content;
		}
	}, {
		key: 'getName',
		value: function getName() {
			return "div";
		}
	}, {
		key: 'setResizeTarget',
		value: function setResizeTarget(target) {
			this.refs.resize.setTarget(target);
		}
	}, {
		key: 'clearResizeTarget',
		value: function clearResizeTarget() {
			this.refs.resize.clearTarget();
		}
	}, {
		key: 'getEditorRange',
		value: function getEditorRange() {
			return _reactDom2['default'].findDOMNode(this.refs.edit);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2['default'].createElement(
				'div',
				{ className: 'editor-contenteditable-div' },
				_react2['default'].createElement(_EditorResize2['default'], { ref: 'resize' }),
				_react2['default'].createElement('div', { className: 'editable-range',
					ref: 'edit',
					onMouseUp: this.handleMouseUp,
					onMouseDown: this.handleMouseDown,
					onInput: function onInput(e) {
						_EditorSelection2['default'].selection = _EditorSelection2['default'].getSelection();
						if (_EditorSelection2['default'].selection && _EditorSelection2['default'].selection.rangeCount > 0) {
							_EditorSelection2['default'].range = _EditorSelection2['default'].selection.getRangeAt(0).cloneRange();
						} else {
							_EditorSelection2['default'].range = null;
						}
					},
					contentEditable: true,
					dangerouslySetInnerHTML: { __html: this.state.content } })
			);
		}
	}]);
	return EditorContentEditableDiv;
}(_react2['default'].Component);

exports['default'] = EditorContentEditableDiv;

module.exports = EditorContentEditableDiv;
module.exports = exports['default'];