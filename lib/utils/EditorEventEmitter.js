'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.EditorEventEmitter = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var EditorEventEmitter = exports.EditorEventEmitter = function (_EventEmitter) {
	(0, _inherits3['default'])(EditorEventEmitter, _EventEmitter);

	function EditorEventEmitter() {
		(0, _classCallCheck3['default'])(this, EditorEventEmitter);

		var _this = (0, _possibleConstructorReturn3['default'])(this, (EditorEventEmitter.__proto__ || Object.getPrototypeOf(EditorEventEmitter)).call(this));

		_this.editorStack = [];
		_this.isStart = false;
		_this.startTime = null;
		_this.editorIndex = null;
		return _this;
	}

	(0, _createClass3['default'])(EditorEventEmitter, [{
		key: 'addStartListener',
		value: function addStartListener(type, callback) {
			if (this.editorStack.length == 0 && this.isStart == false) {
				this.startTime = this.startTime || new Date();
			}
			this.editorIndex = EditorEventEmitter.EditorIndex++;
			this.editorStack.push(type);
			this.on(type, callback);

			this.emitNextListener();
		}
	}, {
		key: 'emitNextListener',
		value: function emitNextListener() {
			if (this.editorStack.length == 0) this.isStart = false;else if (this.isStart == false) {
				this.isStart = true;
				var type = this.editorStack.shift();
				this.emit(type);
				this.startTime = this.startTime || new Date();
			}
		}
	}, {
		key: 'removeStartListener',
		value: function removeStartListener(type, callback) {
			this.removeListener(type, callback);
			var index = this.editorStack.indexOf(type);
			this.editorStack.splice(index, 1);
		}
	}, {
		key: 'mountEditorSuccess',
		value: function mountEditorSuccess() {
			this.isStart = false;
			this.emitNextListener();
		}
	}]);
	return EditorEventEmitter;
}(_events2['default']);

EditorEventEmitter.EditorIndex = 0;


var editorEventEmitter = new EditorEventEmitter();
editorEventEmitter.setMaxListeners(10000);

exports['default'] = editorEventEmitter;