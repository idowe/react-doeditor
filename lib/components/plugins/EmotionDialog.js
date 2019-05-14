'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.EmotionPanel = undefined;

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

var _TabGroup = require('../base/TabGroup');

var _TabGroup2 = _interopRequireDefault(_TabGroup);

var _Dialog = require('../base/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _EditorConstants = require('../../constants/EditorConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var EmotionPanel = exports.EmotionPanel = function (_Component) {
	(0, _inherits3['default'])(EmotionPanel, _Component);

	function EmotionPanel() {
		(0, _classCallCheck3['default'])(this, EmotionPanel);
		return (0, _possibleConstructorReturn3['default'])(this, (EmotionPanel.__proto__ || Object.getPrototypeOf(EmotionPanel)).apply(this, arguments));
	}

	(0, _createClass3['default'])(EmotionPanel, [{
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
			return _react2['default'].createElement(
				'ul',
				{ className: "emotion-images " + this.props.name },
				images.map(function (ele, pos) {
					return _react2['default'].createElement(
						'li',
						{ className: 'emotion-image', key: pos, 'data-url': ele.url, 'data-title': ele.title, onClick: handleClick },
						_react2['default'].createElement('img', { src: ele.url, title: ele.title, 'data-url': ele.url, 'data-title': ele.title })
					);
				})
			);
		}
	}]);
	return EmotionPanel;
}(_react.Component);

var EmotionDialog = function (_Component2) {
	(0, _inherits3['default'])(EmotionDialog, _Component2);

	function EmotionDialog(props) {
		(0, _classCallCheck3['default'])(this, EmotionDialog);

		var _this2 = (0, _possibleConstructorReturn3['default'])(this, (EmotionDialog.__proto__ || Object.getPrototypeOf(EmotionDialog)).call(this, props));

		_this2.state = {
			handle: function handle() {}
		};
		return _this2;
	}

	(0, _createClass3['default'])(EmotionDialog, [{
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
			var EmotionTabs = _EditorConstants.EmotionImages.EmotionTabs,
			    BaseUrl = _EditorConstants.EmotionImages.BaseUrl,
			    SmileyInfor = _EditorConstants.EmotionImages.SmileyInfor;

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
					component: _react2['default'].createElement(EmotionPanel, { images: EmotionTabs[i].images, name: 'common-images', onSelectImage: this.handleSelectImage.bind(this) })
				});
			}
			var buttons = [];
			if (this.props.hidden) {
				return _react2['default'].createElement('div', null);
			} else {
				return _react2['default'].createElement(
					_Dialog2['default'],
					{ ref: 'root', className: 'emotion-dropdwon', width: 700, height: 508, title: '\u8868\u60C5', buttons: buttons, onClose: this.close.bind(this) },
					_react2['default'].createElement(_TabGroup2['default'], { tabs: tabs })
				);
			}
		}
	}]);
	return EmotionDialog;
}(_react.Component);

exports['default'] = EmotionDialog;