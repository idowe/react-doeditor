import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

var EditorTextArea = function (_Component) {
	_inherits(EditorTextArea, _Component);

	function EditorTextArea(props) {
		_classCallCheck(this, EditorTextArea);

		var _this = _possibleConstructorReturn(this, (EditorTextArea.__proto__ || Object.getPrototypeOf(EditorTextArea)).call(this, props));

		_this.state = {
			content: ""
		};
		return _this;
	}

	_createClass(EditorTextArea, [{
		key: 'getContent',
		value: function getContent() {
			var target = ReactDOM.findDOMNode(this.refs.root);
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
			return React.createElement('textarea', { ref: 'root', className: 'editor-textarea', value: this.state.content, onChange: this.handleChange.bind(this) });
		}
	}]);

	return EditorTextArea;
}(Component);

export default EditorTextArea;