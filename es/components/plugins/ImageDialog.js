import _extends from "babel-runtime/helpers/extends";
import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";
import _possibleConstructorReturn from "babel-runtime/helpers/possibleConstructorReturn";
import _inherits from "babel-runtime/helpers/inherits";
import React, { Component } from "react";
import PropTypes from "prop-types";

import Dialog from "../base/Dialog";
import TabGroup from "../base/TabGroup";

import ImageUpload from "./ImageUpload";
import ImageSearch from "./ImageSearch";

var ImageDialog = function (_Component) {
  _inherits(ImageDialog, _Component);

  function ImageDialog(props) {
    _classCallCheck(this, ImageDialog);

    var _this = _possibleConstructorReturn(this, (ImageDialog.__proto__ || Object.getPrototypeOf(ImageDialog)).call(this, props));

    _this.state = {
      images: [[], []],
      handle: function handle() {}
    };
    return _this;
  }

  _createClass(ImageDialog, [{
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
        component: React.createElement(ImageUpload, _extends({
          ref: "image"
        }, uploader, {
          onChange: this.handleChange.bind(this),
          customUploader: customUploader,
          uploadImageCallback: this.props.uploadImageCallback
        }))
      }, {
        title: "网络图片",
        component: React.createElement(ImageSearch, { ref: "image", onChange: this.handleChange.bind(this) })
      }];
      if (this.props.hidden) {
        return React.createElement("div", null);
      } else {
        return React.createElement(
          Dialog,
          {
            ref: "modal",
            className: "image-dialog",
            width: 700,
            height: 528,
            title: "\u56FE\u7247",
            buttons: buttons,
            onClose: this.close.bind(this)
          },
          React.createElement(TabGroup, { tabs: tabs, ref: "tab" })
        );
      }
    }
  }]);

  return ImageDialog;
}(Component);

export default ImageDialog;


ImageDialog.propTypes = {
  uploader: PropTypes.object,
  customUploader: PropTypes.object
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