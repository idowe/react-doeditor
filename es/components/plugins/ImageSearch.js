import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

var ImageSearch = function (_Component) {
	_inherits(ImageSearch, _Component);

	function ImageSearch(props) {
		_classCallCheck(this, ImageSearch);

		var _this = _possibleConstructorReturn(this, (ImageSearch.__proto__ || Object.getPrototypeOf(ImageSearch)).call(this, props));

		_this.state = {
			images: []
		};
		return _this;
	}

	_createClass(ImageSearch, [{
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
			var text = ReactDOM.findDOMNode(this.refs.text);
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
			return React.createElement(
				'div',
				{ className: 'tab-panel' },
				React.createElement(
					'table',
					{ className: 'search-bar' },
					React.createElement(
						'tbody',
						null,
						React.createElement(
							'tr',
							null,
							React.createElement(
								'td',
								null,
								React.createElement('input', { className: 'image-searchTxt', type: 'text', ref: 'text' })
							),
							React.createElement(
								'td',
								null,
								React.createElement(
									'div',
									{ className: 'image-searchAdd', onClick: this.handleClick.bind(this) },
									'\u6DFB\u52A0'
								)
							)
						)
					)
				),
				React.createElement(
					'div',
					{ className: 'image-content' },
					images.map(function (ele, pos) {
						return React.createElement(
							'div',
							{ key: pos, className: 'image-item' },
							React.createElement('div', { className: 'image-close', 'data-index': pos, onClick: handleRemoveImage }),
							React.createElement('img', { src: ele.src, className: 'image-pic', height: '75', width: '120' })
						);
					})
				)
			);
		}
	}]);

	return ImageSearch;
}(Component);

export default ImageSearch;