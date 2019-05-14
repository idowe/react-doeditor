import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import Dropdown from '../base/Dropdown';
import { ColorTypes } from '../../constants/EditorConstants';
import EditorDom from '../../utils/EditorDom';

var ColorDropdown = function (_React$Component) {
	_inherits(ColorDropdown, _React$Component);

	function ColorDropdown(props) {
		_classCallCheck(this, ColorDropdown);

		var _this = _possibleConstructorReturn(this, (ColorDropdown.__proto__ || Object.getPrototypeOf(ColorDropdown)).call(this, props));

		_this.state = {
			handle: function handle() {}
		};
		return _this;
	}

	_createClass(ColorDropdown, [{
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
		key: 'handleSelectColor',
		value: function handleSelectColor(e) {
			e = e || event;
			var target = e.target || e.srcElement;
			var color = target.getAttribute('data-color');
			if (this.state.handle) {
				this.state.handle(color);
			}
			this.close();
			EditorDom.stopPropagation(e);
		}
	}, {
		key: 'render',
		value: function render() {
			var handleSelectColor = this.handleSelectColor.bind(this);
			if (this.props.hidden) {
				return React.createElement('div', null);
			} else {
				return React.createElement(
					Dropdown,
					{ ref: 'root', className: 'color-dropdown' },
					React.createElement(
						'table',
						null,
						React.createElement(
							'tbody',
							null,
							React.createElement(
								'tr',
								{ className: 'title-row', key: "title-row" },
								React.createElement(
									'td',
									{ colSpan: 10 },
									'\u4E3B\u9898\u989C\u8272'
								)
							),
							ColorTypes.themeColors.map(function (colors, pos) {
								var firstRow = pos == 0;
								return React.createElement(
									'tr',
									{ key: pos, className: firstRow ? "first-row" : "" },
									colors.map(function (color, index) {
										return React.createElement(
											'td',
											{ key: index },
											React.createElement('a', { className: 'color-anchor', 'data-color': color, style: { "backgroundColor": color }, onClick: handleSelectColor })
										);
									})
								);
							}),
							React.createElement(
								'tr',
								{ className: 'title-row', key: "title-row2" },
								React.createElement(
									'td',
									{ colSpan: 10 },
									'\u6807\u51C6\u989C\u8272'
								)
							),
							React.createElement(
								'tr',
								{ className: 'last-row', key: "last-row" },
								ColorTypes.standardColors.map(function (color, pos) {
									return React.createElement(
										'td',
										{ key: pos },
										React.createElement('a', { className: 'color-anchor', 'data-color': color, style: { "backgroundColor": color }, onClick: handleSelectColor })
									);
								})
							)
						)
					)
				);
			}
		}
	}]);

	return ColorDropdown;
}(React.Component);

export default ColorDropdown;