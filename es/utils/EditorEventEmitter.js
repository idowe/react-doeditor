import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import EventEmitter from 'events';

export var EditorEventEmitter = function (_EventEmitter) {
	_inherits(EditorEventEmitter, _EventEmitter);

	function EditorEventEmitter() {
		_classCallCheck(this, EditorEventEmitter);

		var _this = _possibleConstructorReturn(this, (EditorEventEmitter.__proto__ || Object.getPrototypeOf(EditorEventEmitter)).call(this));

		_this.editorStack = [];
		_this.isStart = false;
		_this.startTime = null;
		_this.editorIndex = null;
		return _this;
	}

	_createClass(EditorEventEmitter, [{
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
}(EventEmitter);

EditorEventEmitter.EditorIndex = 0;
var editorEventEmitter = new EditorEventEmitter();
editorEventEmitter.setMaxListeners(10000);

export default editorEventEmitter;