import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import Uploader from '../../utils/FileUpload';

var ImageUpload = function (_Component) {
	_inherits(ImageUpload, _Component);

	function ImageUpload(props) {
		_classCallCheck(this, ImageUpload);

		var _this = _possibleConstructorReturn(this, (ImageUpload.__proto__ || Object.getPrototypeOf(ImageUpload)).call(this, props));

		_this.argumentUpload = function (file, files, fileIndex, obj) {
			var _self = _this;

			var _this$props = _this.props,
			    customUploader = _this$props.customUploader,
			    name = _this$props.name,
			    data = _this$props.data,
			    url = _this$props.url,
			    filter = _this$props.filter,
			    others = _objectWithoutProperties(_this$props, ['customUploader', 'name', 'data', 'url', 'filter']);

			var uploader = _this.props.customUploader ? _this.props.customUploader : Uploader;

			uploader.uploadFile(_extends({
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
			var mask = ReactDOM.findDOMNode(_this.refs.mask);
			mask.style.display = "block";
			mask.innerHTML = fileIndex + 1 + '/' + files.length + ' Uploading...';
		};

		_this.afterUploading = function () {
			// 去除遮罩层
			var mask = ReactDOM.findDOMNode(_this.refs.mask);
			mask.style.display = "none";
			mask.innerHTML = "Load Success";
		};

		_this.errorUploading = function () {
			var mask = ReactDOM.findDOMNode(_this.refs.mask);
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

	_createClass(ImageUpload, [{
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
			return React.createElement(
				'div',
				{ className: 'tab-panel' },
				React.createElement(
					'div',
					{ className: classnames("image-content", { " drag-enter": dragEnter }), onDrop: this.handleDrop.bind(this),
						onDragOver: this.handleDragOver.bind(this),
						onDragEnter: this.handleDragEnter.bind(this),
						onDragLeave: this.handleDragLeave.bind(this),
						onDragEnd: this.handleDragLeave.bind(this),
						onDragStart: this.handleDragEnter.bind(this) },
					images.map(function (ele, pos) {
						return React.createElement(
							'div',
							{ key: pos, className: 'image-item' },
							React.createElement('div', { className: 'image-close', 'data-index': pos, onClick: handleRemoveImage }),
							React.createElement('img', { src: ele.src, className: 'image-pic', height: '75', width: '120' })
						);
					}),
					React.createElement(
						'div',
						{ className: 'image-upload2', style: hasImages ? showStyle : hideStyle },
						React.createElement('span', { className: 'image-icon' }),
						React.createElement(
							'form',
							{ className: 'image-form', method: 'post', encType: 'multipart/form-data', target: 'up', action: action },
							React.createElement('input', { onChange: this.handleChange.bind(this), multiple: 'multiple', style: { filter: "alpha(opacity=0)" }, className: 'image-file', type: 'file', name: 'file', accept: 'image/gif,image/jpeg,image/png,image/jpg,image/bmp' })
						)
					)
				),
				React.createElement(
					'div',
					{ className: 'image-dragTip', style: hasImages ? hideStyle : showStyle },
					'\u652F\u6301\u56FE\u7247\u62D6\u62FD\u4E0A\u4F20'
				),
				React.createElement(
					'div',
					{ className: 'image-upload1', style: hasImages ? hideStyle : showStyle },
					React.createElement('span', { className: 'image-icon' }),
					React.createElement(
						'form',
						{ className: 'image-form', method: 'post', encType: 'multipart/form-data', target: 'up', action: action },
						React.createElement('input', { onChange: this.handleChange.bind(this), multiple: 'multiple', style: { filter: "alpha(opacity=0)" }, className: 'image-file', type: 'file', name: 'file', accept: 'image/gif,image/jpeg,image/png,image/jpg,image/bmp' })
					)
				),
				React.createElement(
					'div',
					{ className: 'image-mask', ref: 'mask' },
					"Loading...."
				)
			);
		}
	}]);

	return ImageUpload;
}(Component);

export default ImageUpload;