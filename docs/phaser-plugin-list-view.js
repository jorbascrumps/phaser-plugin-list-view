var ListViewPlugin = (function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  var GetFastValue = Phaser.Utils.Objects.GetFastValue;

  var ListView =
  /*#__PURE__*/
  function (_Phaser$GameObjects$G) {
    _inherits(ListView, _Phaser$GameObjects$G);

    function ListView() {
      var _this;

      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          id = _ref.id,
          context = _ref.context,
          _ref$height = _ref.height,
          height = _ref$height === void 0 ? 100 : _ref$height,
          _ref$width = _ref.width,
          width = _ref$width === void 0 ? 100 : _ref$width,
          _ref$x = _ref.x,
          x = _ref$x === void 0 ? 0 : _ref$x,
          _ref$y = _ref.y,
          y = _ref$y === void 0 ? 0 : _ref$y;

      _classCallCheck(this, ListView);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ListView).call(this, context, null, {}));
      _this.id = id;
      _this.width = width;
      _this.height = height;
      _this.x = x;
      _this.y = y;
      _this.events = {};
      _this.hideScrollbarWhenEmpty = false;
      _this.createCallback = _this.settle;
      _this.removeCallback = _this.settle;
      _this.zone = new Phaser.GameObjects.Zone(context, x, y, width, height).setInteractive({
        hitArea: new Phaser.Geom.Rectangle(width / 2, height / 2, width, height),
        hitAreaCallback: Phaser.Geom.Rectangle.Contains,
        draggable: true
      });
      var cameraName = "ListViewCamera".concat(_this.id);
      _this.camera = _this.scene.cameras.add(x, y, width, height).setOrigin(0, 0).setName(cameraName);
      /*
      NOTE: Drag is temporarily disabled
       this.scrollPos = 0;
      this.zone.on('dragstart', (pointer, x, y) => this.scrollPos = this.camera.scrollY);
      this.zone.on('drag', (pointer, x, y) => {
          const min = this.y;
          const max = this.y + this.camera._bounds.height - this.camera.height;
           const clampedValue = Phaser.Math.Clamp(y, min, max);
          const scrollPerc = Phaser.Math.Clamp((clampedValue - min) / (max - min), 0, 1);
          const cameraScroll = this.camera.height - clampedValue;
           if (isNaN(scrollPerc)) {
              return;
          }
           this.camera.setScroll(0, this.scrollPos + cameraScroll);
           if (undefined !== this.scrollBar) {
              const barScroll = this.y + (this.height - this.scrollBar.displayHeight) * (1 - scrollPerc);
               this.scrollBar.setY(barScroll);
          }
      });
      */

      return _this;
    }

    _createClass(ListView, [{
      key: "setScrollbarEnabled",
      value: function setScrollbarEnabled(config) {
        var _this2 = this;

        if (!config) {
          return this;
        }

        var colour = GetFastValue(config, 'colour', 0xffffff);
        var alpha = colour ? GetFastValue(config, 'alpha', 1) : 0;
        var width = GetFastValue(config, 'width', 10);
        var textureName = "ListViewScrollBarTex".concat(this.id);
        this.hideScrollbarWhenEmpty = GetFastValue(config, 'hideWhenEmpty', false);
        this.scene.make.graphics({
          x: 0,
          y: 0,
          add: false
        }).fillStyle(colour, alpha).fillRect(0, 0, 100, 100).generateTexture(textureName, 10, 10);
        this.scrollBar = this.scene.add.image(0, 0, textureName).setOrigin(0, 0).setDisplaySize(width, this.height).setPosition(this.x + this.width, this.y).setInteractive({
          useHandCursor: true
        }).setDepth(1);
        this.scene.input.setDraggable(this.scrollBar);
        this.scrollBar.on('drag', function (pointer, x, y) {
          var min = _this2.y;
          var max = _this2.y + _this2.height - _this2.scrollBar.displayHeight;
          var clampedValue = Phaser.Math.Clamp(y, min, max);
          var scrollPerc = Phaser.Math.Clamp((clampedValue - min) / (max - min), 0, 1);
          var barScroll = clampedValue;

          if (isNaN(scrollPerc)) {
            return;
          }

          var cameraScroll = _this2.y + (_this2.camera._bounds.height - _this2.camera.height) * scrollPerc;

          _this2.scrollBar.setY(barScroll);

          _this2.camera.setScroll(0, cameraScroll);
        });
        this.settle();
        return this;
      }
    }, {
      key: "preUpdate",
      value: function preUpdate() {
        var cameras = this.scene.cameras.cameras;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.getChildren()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var child = _step.value;
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = cameras[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var camera = _step3.value;

                if (camera.id === this.camera.id) {
                  continue;
                }

                camera.ignore(child);
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                  _iterator3.return();
                }
              } finally {
                if (_didIteratorError3) {
                  throw _iteratorError3;
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.scene.sys.displayList.getAll()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _child = _step2.value;

            if (this.contains(_child)) {
              continue;
            }

            this.camera.ignore(_child);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    }, {
      key: "update",
      value: function update() {
        var height = this.camera._bounds.height;
        var percHeight = Phaser.Math.Clamp(this.camera.height / height, 0.1, 1);
        var scrollbarHeight = Phaser.Math.Clamp(percHeight * this.height, 10, this.height);
        this.scrollBar && this.scrollBar.setDisplaySize(this.scrollBar.displayWidth, scrollbarHeight);
      }
    }, {
      key: "add",
      value: function add() {
        var _this3 = this;

        var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          var _loop = function _loop() {
            var item = _step4.value;

            var listBounds = _this3.getBounds();

            var itemBounds = item.getBounds();
            item.setPosition(_this3.x, _this3.y + listBounds.height).setInteractive({
              hitArea: new Phaser.Geom.Rectangle(0, 0, itemBounds.width, itemBounds.height),
              hitAreaCallback: Phaser.Geom.Rectangle.Contains,
              useHandCursor: true,
              draggable: true
            });

            var _loop2 = function _loop2(event) {
              item.on(event, function () {
                return _this3.events[event](item, _this3.getChildren().indexOf(item), _this3.getChildren());
              });
            };

            for (var event in _this3.events) {
              _loop2(event);
            }

            _get(_getPrototypeOf(ListView.prototype), "add", _this3).call(_this3, item);
          };

          for (var _iterator4 = (Array.isArray(items) ? items : [items])[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            _loop();
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }

        var _this$getBounds = this.getBounds(),
            height = _this$getBounds.height,
            width = _this$getBounds.width;

        this.camera.setBounds(this.x, this.y, width, height);
        return this;
      }
    }, {
      key: "removeAt",
      value: function removeAt(index) {
        var childToRemove = this.children.entries[index];

        if ('undefined' === typeof childToRemove) {
          return this;
        }

        return this.remove(childToRemove);
      }
    }, {
      key: "settle",
      value: function settle() {
        var children = this.getChildren();
        var childY = this.y;
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = children[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var child = _step5.value;
            child.setPosition(this.x, childY);
            childY += child.getBounds().height;
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
              _iterator5.return();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }

        var _this$getBounds2 = this.getBounds(),
            height = _this$getBounds2.height,
            width = _this$getBounds2.width,
            x = _this$getBounds2.x,
            y = _this$getBounds2.y;

        this.camera.setBounds(x, y, width, height);
        var percHeight = Phaser.Math.Clamp(this.camera.height / this.camera._bounds.height, 0.1, 1);
        var scrollbarHeight = Phaser.Math.Clamp(percHeight * this.height, 10, this.height);

        if (this.scrollBar) {
          this.scrollBar.setDisplaySize(this.scrollBar.displayWidth, scrollbarHeight);

          if (this.hideScrollbarWhenEmpty && children.length === 0) {
            this.scrollBar.setVisible(false);
          } else {
            this.scrollBar.setVisible(true);
          }
        }

        return this;
      }
    }, {
      key: "on",
      value: function on(event, fn) {
        this.events[event] = fn;
        return this;
      }
    }, {
      key: "getBounds",
      value: function getBounds() {
        var bounds = new Phaser.Geom.Rectangle(this.x, this.y, 0, 0);
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = this.getChildren()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var child = _step6.value;
            Phaser.Geom.Rectangle.MergeRect(bounds, child.getBounds());
          }
        } catch (err) {
          _didIteratorError6 = true;
          _iteratorError6 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
              _iterator6.return();
            }
          } finally {
            if (_didIteratorError6) {
              throw _iteratorError6;
            }
          }
        }

        return bounds;
      }
    }]);

    return ListView;
  }(Phaser.GameObjects.Group);

  var ListViewPlugin =
  /*#__PURE__*/
  function (_Phaser$Plugins$BaseP) {
    _inherits(ListViewPlugin, _Phaser$Plugins$BaseP);

    function ListViewPlugin(scene, pluginManager) {
      var _this;

      _classCallCheck(this, ListViewPlugin);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ListViewPlugin).call(this, scene, pluginManager));
      pluginManager.registerGameObject('listview', _this.createListView);
      return _this;
    }

    _createClass(ListViewPlugin, [{
      key: "createListView",
      value: function createListView(x, y, width, height) {
        var listview = new ListView({
          id: Date.now(),
          context: this.scene,
          height: height,
          width: width,
          x: x,
          y: y
        });
        this.updateList.add(listview);
        return listview;
      }
    }]);

    return ListViewPlugin;
  }(Phaser.Plugins.BasePlugin);

  return ListViewPlugin;

}());
