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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var EditorTextArea = function (_Component) {
	(0, _inherits3['default'])(EditorTextArea, _Component);

	function EditorTextArea(props) {
		(0, _classCallCheck3['default'])(this, EditorTextArea);

		var _this = (0, _possibleConstructorReturn3['default'])(this, (EditorTextArea.__proto__ || Object.getPrototypeOf(EditorTextArea)).call(this, props));

		_this.state = {
			content: ""
		};
		return _this;
	}

	(0, _createClass3['default'])(EditorTextArea, [{
		key: 'getContent',
		value: function getContent() {
			var target = _reactDom2['default'].findDOMNode(this.refs.root);
			return target.value;
		}
	}, {
		key: 'setContent',
		value: function setContent(content) {
			this.setState({
				content: content
			});
		}
	}, {
		key: 'getName',
		value: function getName() {
			return "textarea";
		}
	}, {
		key: 'handleChange',
		value: function handleChange() {
			var content = this.getContent();
			this.setState({
				content: content
			});
			if (this.props.onChange) {
				this.props.onChange(content);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2['default'].createElement('textarea', { ref: 'root', className: 'editor-textarea', value: this.state.content, onChange: this.handleChange.bind(this) });
		}
	}]);
	return EditorTextArea;
}(_react.Component);

exports['default'] = EditorTextArea;
module.exports = exports['default'];