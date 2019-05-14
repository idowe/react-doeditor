import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import ComboBox from '../base/ComboBox';

var FontSizeDropdown = function (_Component) {
	_inherits(FontSizeDropdown, _Component);

	function FontSizeDropdown(props) {
		_classCallCheck(this, FontSizeDropdown);

		var _this = _possibleConstructorReturn(this, (FontSizeDropdown.__proto__ || Object.getPrototypeOf(FontSizeDropdown)).call(this, props));

		_this.state = {
			handle: function handle() {}
		};
		return _this;
	}

	_createClass(FontSizeDropdown, [{
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
			var fontsize = this.props.fontsize ? this.props.fontsize : [];
			var props = this.props;
			if (this.props.hidden) {
				return React.createElement('div', null);
			} else {
				return React.createElement(
					ComboBox,
					{ ref: 'root', className: 'fontsize-combobox' },
					React.createElement(
						'ul',
						null,
						fontsize.map(function (ele, pos) {
							return React.createElement(
								'li',
								{ className: ele.value == props.value ? "active" : "", key: pos, 'data-value': ele.value, onClick: handleSelect },
								React.createElement(
									'span',
									{ 'data-value': ele.value, style: { "fontSize": ele.name } },
									ele.name
								)
							);
						})
					)
				);
			}
		}
	}]);

	return FontSizeDropdown;
}(Component);

export default FontSizeDropdown;