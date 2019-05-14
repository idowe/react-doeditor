import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import TabGroup from '../base/TabGroup';
import Dialog from '../base/Dialog';
import { EmotionImages } from '../../constants/EditorConstants';

export var EmotionPanel = function (_Component) {
	_inherits(EmotionPanel, _Component);

	function EmotionPanel() {
		_classCallCheck(this, EmotionPanel);

		return _possibleConstructorReturn(this, (EmotionPanel.__proto__ || Object.getPrototypeOf(EmotionPanel)).apply(this, arguments));
	}

	_createClass(EmotionPanel, [{
		key: 'handleClick',
		value: function handleClick(e) {
			e = e || event;
			var target = e.target || e.srcElement;
			var url = target.getAttribute("data-url");
			var title = target.getAttribute("data-title");

			if (this.props.onSelectImage) {
				var img = document.createElement('img');
				img.src = url;
				img.title = title;
				this.props.onSelectImage(e, img);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var images = this.props.images;
			var handleClick = this.handleClick.bind(this);
			return React.createElement(
				'ul',
				{ className: "emotion-images " + this.props.name },
				images.map(function (ele, pos) {
					return React.createElement(
						'li',
						{ className: 'emotion-image', key: pos, 'data-url': ele.url, 'data-title': ele.title, onClick: handleClick },
						React.createElement('img', { src: ele.url, title: ele.title, 'data-url': ele.url, 'data-title': ele.title })
					);
				})
			);
		}
	}]);

	return EmotionPanel;
}(Component);

var EmotionDialog = function (_Component2) {
	_inherits(EmotionDialog, _Component2);

	function EmotionDialog(props) {
		_classCallCheck(this, EmotionDialog);

		var _this2 = _possibleConstructorReturn(this, (EmotionDialog.__proto__ || Object.getPrototypeOf(EmotionDialog)).call(this, props));

		_this2.state = {
			handle: function handle() {}
		};
		return _this2;
	}

	_createClass(EmotionDialog, [{
		key: 'open',
		value: function open(handle) {
			this.setState({
				handle: handle
			});
			this.refs.root.open();
		}
	}, {
		key: 'close',
		value: function close() {
			if (this.refs.root) this.refs.root.close();
		}
	}, {
		key: 'toggle',
		value: function toggle(handle) {
			this.setState({
				handle: handle
			});
			this.refs.root.toggle();
		}
	}, {
		key: 'handleSelectImage',
		value: function handleSelectImage(e, img) {
			e = e || event;
			if (this.state.handle) {
				this.state.handle(img);
			}
			if (e.stopPropagation) {
				e.stopPropagation();
			} else {
				e.cancelBubble = true;
			}
			this.close();
		}
	}, {
		key: 'getEmotionTabs',
		value: function getEmotionTabs() {
			var EmotionTabs = EmotionImages.EmotionTabs,
			    BaseUrl = EmotionImages.BaseUrl,
			    SmileyInfor = EmotionImages.SmileyInfor;

			var tabs = [];
			for (var key in EmotionTabs) {
				var tab = { title: EmotionTabs[key].name };
				var images = [];
				var titles = SmileyInfor[key];
				for (var i = 0; i < titles.length; i++) {
					var index = (i + 1).toString();
					index = index.length == 1 ? "0" + index : index;
					var image = {
						title: titles[i],
						url: BaseUrl + EmotionTabs[key].path + EmotionTabs[key].prefix + index + ".gif?v=1.1"
					};
					images.push(image);
				}
				tab.images = images;
				tabs.push(tab);
			}
			return tabs;
		}
	}, {
		key: 'render',
		value: function render() {
			var tabs = [];
			var EmotionTabs = this.getEmotionTabs();

			for (var i = 0; i < EmotionTabs.length; i++) {
				tabs.push({
					title: EmotionTabs[i].title,
					images: EmotionTabs[i].images,
					component: React.createElement(EmotionPanel, { images: EmotionTabs[i].images, name: 'common-images', onSelectImage: this.handleSelectImage.bind(this) })
				});
			}
			var buttons = [];
			if (this.props.hidden) {
				return React.createElement('div', null);
			} else {
				return React.createElement(
					Dialog,
					{ ref: 'root', className: 'emotion-dropdwon', width: 700, height: 508, title: '\u8868\u60C5', buttons: buttons, onClose: this.close.bind(this) },
					React.createElement(TabGroup, { tabs: tabs })
				);
			}
		}
	}]);

	return EmotionDialog;
}(Component);

export default EmotionDialog;