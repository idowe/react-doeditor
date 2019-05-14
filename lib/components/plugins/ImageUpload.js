'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _FileUpload = require('../../utils/FileUpload');

var _FileUpload2 = _interopRequireDefault(_FileUpload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ImageUpload = function (_Component) {
	(0, _inherits3['default'])(ImageUpload, _Component);

	function ImageUpload(props) {
		(0, _classCallCheck3['default'])(this, ImageUpload);

		var _this = (0, _possibleConstructorReturn3['default'])(this, (ImageUpload.__proto__ || Object.getPrototypeOf(ImageUpload)).call(this, props));

		_this.argumentUpload = function (file, files, fileIndex, obj) {
			var _self = _this;
			var _this$props = _this.props,
			    customUploader = _this$props.customUploader,
			    name = _this$props.name,
			    data = _this$props.data,
			    url = _this$props.url,
			    filter = _this$props.filter,
			    others = (0, _objectWithoutProperties3['default'])(_this$props, ['customUploader', 'name', 'data', 'url', 'filter']);


			var uploader = _this.props.customUploader ? _this.props.customUploader : _FileUpload2['default'];

			uploader.uploadFile((0, _extends3['default'])({
				file: file,
				filename: name,
				data: data,
				url: url,
				filter: filter
			}, others, {
				onLoad: function onLoad() {
					_self.beforeUploading(files, fileIndex);
				},
				onSuccess: function onSuccess(res) {
					var url = _self.props.filter(res);
					_self.updateImage(url);

					setTimeout(function () {
						if (fileIndex + 1 < files.length) {
							//判断是否还有图片没有上传
							fileIndex += 1;
							_self.argumentUpload(files[fileIndex], files, fileIndex, obj);
						} else {
							//图片上传完毕，重置文件索引 fileIndex
							fileIndex = 0;
							if (!obj.dropEffect) {
								obj.value = "";
							}
							_self.afterUploading();
						}
					}, 200);
				},
				onError: function onError() {
					_self.errorUploading();
				}
			}));
		};

		_this.beforeUploading = function (files, fileIndex) {
			var mask = _reactDom2['default'].findDOMNode(_this.refs.mask);
			mask.style.display = "block";
			mask.innerHTML = fileIndex + 1 + '/' + files.length + ' Uploading...';
		};

		_this.afterUploading = function () {
			// 去除遮罩层
			var mask = _reactDom2['default'].findDOMNode(_this.refs.mask);
			mask.style.display = "none";
			mask.innerHTML = "Load Success";
		};

		_this.errorUploading = function () {
			var mask = _reactDom2['default'].findDOMNode(_this.refs.mask);
			mask.style.display = "block";
			mask.innerHTML = "Load Error";
			setTimeout(function () {
				mask.style.display = "none";
			}, 200);
		};

		_this.updateImage = function (image) {
			var images = _this.state.images;
			images.push({
				src: image
			});
			_this.setState({
				images: images
			});
			if (_this.props.onChange) {
				_this.props.onChange(0, images);
			}
		};

		_this.state = {
			images: [],
			dragEnter: false
		};
		return _this;
	}

	(0, _createClass3['default'])(ImageUpload, [{
		key: 'handleUploadFile',
		value: function handleUploadFile(obj) {
			var file = obj.files[0];
			this.argumentUpload(file, obj.files, 0, obj);
		}
	}, {
		key: 'handleChange',
		value: function handleChange(e) {
			e = e || event;
			var target = e.target || e.srcElement;
			if (target.files.length > 0) {
				this.handleUploadFile(target);
				// clear value
				// target.value = "";
			}
		}
	}, {
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
			if (this.props.onChange) this.props.onChange(0, images);
		}
	}, {
		key: 'handleDrop',
		value: function handleDrop(e) {
			e.preventDefault();
			var files = e.dataTransfer.files;
			if (files.length > 0) {
				// this.handleUploadFile(files[0]);
				this.handleUploadFile(e.dataTransfer);
			}
			this.setState({
				dragEnter: false
			});
			// console.log(e.type);
		}
	}, {
		key: 'handleDragOver',
		value: function handleDragOver(e) {
			e.preventDefault();
			// console.log(e.type);
		}
	}, {
		key: 'handleDragEnter',
		value: function handleDragEnter(e) {
			this.setState({
				dragEnter: true
			});
			// console.log(e.type);
		}
	}, {
		key: 'handleDragLeave',
		value: function handleDragLeave(e) {
			this.setState({
				dragEnter: false
			});
			// console.log(e.type);
		}
	}, {
		key: 'render',
		value: function render() {
			var images = this.state.images;
			var dragEnter = this.state.dragEnter;
			var handleRemoveImage = this.handleRemoveImage.bind(this);
			var action = this.props.action ? this.props.action : "/upload";
			var showStyle = {
				"display": "block"
			};
			var hideStyle = {
				"display": "none"
			};

			var hasImages = images.length > 0;
			return _react2['default'].createElement(
				'div',
				{ className: 'tab-panel' },
				_react2['default'].createElement(
					'div',
					{ className: (0, _classnames2['default'])("image-content", { " drag-enter": dragEnter }), onDrop: this.handleDrop.bind(this),
						onDragOver: this.handleDragOver.bind(this),
						onDragEnter: this.handleDragEnter.bind(this),
						onDragLeave: this.handleDragLeave.bind(this),
						onDragEnd: this.handleDragLeave.bind(this),
						onDragStart: this.handleDragEnter.bind(this) },
					images.map(function (ele, pos) {
						return _react2['default'].createElement(
							'div',
							{ key: pos, className: 'image-item' },
							_react2['default'].createElement('div', { className: 'image-close', 'data-index': pos, onClick: handleRemoveImage }),
							_react2['default'].createElement('img', { src: ele.src, className: 'image-pic', height: '75', width: '120' })
						);
					}),
					_react2['default'].createElement(
						'div',
						{ className: 'image-upload2', style: hasImages ? showStyle : hideStyle },
						_react2['default'].createElement('span', { className: 'image-icon' }),
						_react2['default'].createElement(
							'form',
							{ className: 'image-form', method: 'post', encType: 'multipart/form-data', target: 'up', action: action },
							_react2['default'].createElement('input', { onChange: this.handleChange.bind(this), multiple: 'multiple', style: { filter: "alpha(opacity=0)" }, className: 'image-file', type: 'file', name: 'file', accept: 'image/gif,image/jpeg,image/png,image/jpg,image/bmp' })
						)
					)
				),
				_react2['default'].createElement(
					'div',
					{ className: 'image-dragTip', style: hasImages ? hideStyle : showStyle },
					'\u652F\u6301\u56FE\u7247\u62D6\u62FD\u4E0A\u4F20'
				),
				_react2['default'].createElement(
					'div',
					{ className: 'image-upload1', style: hasImages ? hideStyle : showStyle },
					_react2['default'].createElement('span', { className: 'image-icon' }),
					_react2['default'].createElement(
						'form',
						{ className: 'image-form', method: 'post', encType: 'multipart/form-data', target: 'up', action: action },
						_react2['default'].createElement('input', { onChange: this.handleChange.bind(this), multiple: 'multiple', style: { filter: "alpha(opacity=0)" }, className: 'image-file', type: 'file', name: 'file', accept: 'image/gif,image/jpeg,image/png,image/jpg,image/bmp' })
					)
				),
				_react2['default'].createElement(
					'div',
					{ className: 'image-mask', ref: 'mask' },
					"Loading...."
				)
			);
		}
	}]);
	return ImageUpload;
}(_react.Component);

exports['default'] = ImageUpload;
module.exports = exports['default'];