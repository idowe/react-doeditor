import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import ComboBox from '../base/ComboBox';

var ParagraphDropdown = function (_Component) {
	_inherits(ParagraphDropdown, _Component);

	function ParagraphDropdown(props) {
		_classCallCheck(this, ParagraphDropdown);

		var _this = _possibleConstructorReturn(this, (ParagraphDropdown.__proto__ || Object.getPrototypeOf(ParagraphDropdown)).call(this, props));

		_this.state = {
			handle: function handle() {}
		};
		return _this;
	}

	_createClass(ParagraphDropdown, [{
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
		key: 'handleSelect',
		value: function handleSelect(e) {
			e = e || event;
			var target = e.target || e.srcElement;
			var value = target.getAttribute('data-value');
			if (this.state.handle) {
				this.state.handle(value);
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
			var handleSelect = this.handleSelect.bind(this);
			var paragraph = this.props.paragraph ? this.props.paragraph : [];
			var props = this.props;
			if (this.props.hidden) {
				return React.createElement('div', null);
			} else {
				return React.createElement(
					ComboBox,
					{ ref: 'root', className: 'paragraph-combobox' },
					React.createElement(
						'ul',
						null,
						paragraph.map(function (ele, pos) {
							return React.createElement(
								'li',
								{ className: ele.value == props.value ? "active" : "", key: pos, 'data-value': ele.value, onClick: handleSelect },
								React.createElement(ele.value, { "data-value": ele.value }, ele.name)
							);
						})
					)
				);
			}
		}
	}]);

	return ParagraphDropdown;
}(Component);

export default ParagraphDropdown;