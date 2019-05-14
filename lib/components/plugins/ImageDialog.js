"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Dialog = require("../base/Dialog");

var _Dialog2 = _interopRequireDefault(_Dialog);

var _TabGroup = require("../base/TabGroup");

var _TabGroup2 = _interopRequireDefault(_TabGroup);

var _ImageUpload = require("./ImageUpload");

var _ImageUpload2 = _interopRequireDefault(_ImageUpload);

var _ImageSearch = require("./ImageSearch");

var _ImageSearch2 = _interopRequireDefault(_ImageSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ImageDialog = function (_Component) {
  (0, _inherits3["default"])(ImageDialog, _Component);

  function ImageDialog(props) {
    (0, _classCallCheck3["default"])(this, ImageDialog);

    var _this = (0, _possibleConstructorReturn3["default"])(this, (ImageDialog.__proto__ || Object.getPrototypeOf(ImageDialog)).call(this, props));

    _this.state = {
      images: [[], []],
      handle: function handle() {}
    };
    return _this;
  }

  (0, _createClass3["default"])(ImageDialog, [{
    key: "open",
    value: function open(handle) {
      this.setState({
        handle: handle
      });
      this.refs.modal.open();
    }
  }, {
    key: "close",
    value: function close() {
      if (this.refs.modal) {
        this.refs.modal.close();
        if (this.state.handle) {
          this.state.handle();
        }
        this.refs.image.clearImages();
      }
    }
  }, {
    key: "toggle",
    value: function toggle(handle) {
      this.setState({
        handle: handle
      });
      this.refs.modal.toggle();
    }
  }, {
    key: "handleOkClick",
    value: function handleOkClick(e) {
      // 做相应的处理做相应的处理
      var tabIndex = this.refs.tab.getTabIndex();
      var images = this.state.images[tabIndex];
      var strImgs = "";
      if (images.length > 0 && this.state.handle) {
        for (var i = 0; i < images.length; i++) {
          var src = images[i].src;
          var str = "<img src='" + src + "'/>";
          strImgs += str;
        }
        this.state.handle(strImgs);
      }
      this.close();
    }
  }, {
    key: "handleChange",
    value: function handleChange(index, imgs) {
      var images = this.state.images;
      images[index] = imgs;
      this.setState({
        images: images
      });
    }
  }, {
    key: "render",
    value: function render() {
      var uploader = this.props.uploader;
      var customUploader = this.props.customUploader;
      var buttons = [{
        name: "btn-ok",
        content: "确定",
        onClick: this.handleOkClick.bind(this)
      }, {
        name: "btn-cancel",
        content: "取消",
        onClick: this.close.bind(this)
      }];
      var tabs = [{
        title: "本地上传",
        component: _react2["default"].createElement(_ImageUpload2["default"], (0, _extends3["default"])({
          ref: "image"
        }, uploader, {
          onChange: this.handleChange.bind(this),
          customUploader: customUploader,
          uploadImageCallback: this.props.uploadImageCallback
        }))
      }, {
        title: "网络图片",
        component: _react2["default"].createElement(_ImageSearch2["default"], { ref: "image", onChange: this.handleChange.bind(this) })
      }];
      if (this.props.hidden) {
        return _react2["default"].createElement("div", null);
      } else {
        return _react2["default"].createElement(
          _Dialog2["default"],
          {
            ref: "modal",
            className: "image-dialog",
            width: 700,
            height: 528,
            title: "\u56FE\u7247",
            buttons: buttons,
            onClose: this.close.bind(this)
          },
          _react2["default"].createElement(_TabGroup2["default"], { tabs: tabs, ref: "tab" })
        );
      }
    }
  }]);
  return ImageDialog;
}(_react.Component);

exports["default"] = ImageDialog;


ImageDialog.propTypes = {
  uploader: _propTypes2["default"].object,
  customUploader: _propTypes2["default"].object
};

ImageDialog.defaultProps = {
  uploader: {
    name: "file",
    url: "/upload",
    filter: function filter(res) {
      return res.url;
    },
    data: {}
  }
};
module.exports = exports['default'];