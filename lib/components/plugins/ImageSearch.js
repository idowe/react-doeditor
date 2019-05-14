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

var ImageSearch = function (_Component) {
	(0, _inherits3['default'])(ImageSearch, _Component);

	function ImageSearch(props) {
		(0, _classCallCheck3['default'])(this, ImageSearch);

		var _this = (0, _possibleConstructorReturn3['default'])(this, (ImageSearch.__proto__ || Object.getPrototypeOf(ImageSearch)).call(this, props));

		_this.state = {
			images: []
		};
		return _this;
	}

	(0, _createClass3['default'])(ImageSearch, [{
		key: 'getImages',
		value: function getImages() {
			return this.state.images;
		}
	}, {
		key: 'clearImages',
		value: function clearImages() {
			this.setState({
				images: []
			});
		}
	}, {
		key: 'handleClick',
		value: function handleClick(e) {
			var text = _reactDom2['default'].findDOMNode(this.refs.text);
			var src = text.value;
			var images = this.state.images;
			if (src && src.length > 0) {
				images.push({ src: src });
				this.setState({
					images: images
				});
				if (this.props.onChange) this.props.onChange(1, images);
				text.value = "";
			}
		}
	}, {
		key: 'handleRemoveImage',
		value: function handleRemoveImage(e) {
			e = e || event;
			var target = e.target || e.srcElement;
			var index = parseInt(target.getAttribute("data-index"));
			var images = this.state.images;
			images.splice(index, 1);
			this.setState({
				images: images
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var images = this.state.images;
			var handleRemoveImage = this.handleRemoveImage.bind(this);
			return _react2['default'].createElement(
				'div',
				{ className: 'tab-panel' },
				_react2['default'].createElement(
					'table',
					{ className: 'search-bar' },
					_react2['default'].createElement(
						'tbody',
						null,
						_react2['default'].createElement(
							'tr',
							null,
							_react2['default'].createElement(
								'td',
								null,
								_react2['default'].createElement('input', { className: 'image-searchTxt', type: 'text', ref: 'text' })
							),
							_react2['default'].createElement(
								'td',
								null,
								_react2['default'].createElement(
									'div',
									{ className: 'image-searchAdd', onClick: this.handleClick.bind(this) },
									'\u6DFB\u52A0'
								)
							)
						)
					)
				),
				_react2['default'].createElement(
					'div',
					{ className: 'image-content' },
					images.map(function (ele, pos) {
						return _react2['default'].createElement(
							'div',
							{ key: pos, className: 'image-item' },
							_react2['default'].createElement('div', { className: 'image-close', 'data-index': pos, onClick: handleRemoveImage }),
							_react2['default'].createElement('img', { src: ele.src, className: 'image-pic', height: '75', width: '120' })
						);
					})
				)
			);
		}
	}]);
	return ImageSearch;
}(_react.Component);

exports['default'] = ImageSearch;
module.exports = exports['default'];