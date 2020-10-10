import { _ as _slicedToArray, a as _inherits, b as _getPrototypeOf, c as _possibleConstructorReturn, d as _classCallCheck, i as init, s as safe_not_equal, e as _assertThisInitialized, f as dispatch_dev, g as _createClass, S as SvelteComponentDev, h as create_slot, v as validate_slots, j as svg_element, t as text, k as claim_element, l as children, m as claim_text, n as detach_dev, o as add_location, p as insert_dev, q as append_dev, r as set_data_dev, u as empty, w as attr_dev, x as update_slot, y as transition_in, z as transition_out, A as assign, B as exclude_internal_props, C as create_component, D as claim_component, E as mount_component, F as get_spread_update, G as get_spread_object, H as destroy_component, I as regenerator, J as listen, K as element, L as action_destroyer, M as is_function, N as validate_each_argument, O as globals, P as group_outros, Q as check_outros, R as destroy_each, T as noop, U as space, V as claim_space, W as toggle_class, X as identity, Y as onMount, Z as onDestroy, $ as add_render_callback, a0 as create_bidirectional_transition, a1 as set_style, a2 as listen_dev, a3 as run_all, a4 as _toConsumableArray, a5 as binding_callbacks, a6 as query_selector_all } from './client.a246a37c.js';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
function isObject(o) {
  return Object.prototype.toString.call(o) === '[object Object]';
}

function isPlainObject(o) {
  var ctor, prot;
  if (isObject(o) === false) return false; // If has modified constructor

  ctor = o.constructor;
  if (ctor === undefined) return true; // If has modified prototype

  prot = ctor.prototype;
  if (isObject(prot) === false) return false; // If constructor does not have an Object-specific method

  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  } // Most likely a plain Object


  return true;
}

var renderPluralisedLabel = function renderPluralisedLabel(label, num) {
  return num > 0 ? "".concat(num, " ").concat(label) + (num === 1 ? '' : 's') : '';
};

function getNumberOfMonthsBetweenDates(fromDate, toDate) {
  var months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  var pad = function pad(num) {
    return ('00' + num).slice(-2);
  };

  var startDate = new Date("".concat(fromDate.year, "-").concat(pad(months.indexOf(fromDate.month))));
  var endDate = toDate ? new Date(toDate && "".concat(toDate.year, "-").concat(pad(months.indexOf(toDate.month)))) : new Date();
  return endDate.getMonth() - startDate.getMonth() + 12 * (endDate.getFullYear() - startDate.getFullYear());
}
function periodDuration(fromDate, toDate) {
  if (!fromDate && !toDate) {
    throw new Error('fromDate and toDate objects or numberOfMonths number are required');
  }

  var numberOfMonths = getNumberOfMonthsBetweenDates(fromDate, toDate);
  var duration = {
    years: Math.floor(numberOfMonths / 12),
    months: numberOfMonths % 12
  };
  return [renderPluralisedLabel('year', duration.years), renderPluralisedLabel('month', duration.months)].filter(Boolean).join(', ');
}
function buildList() {
  var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var linkerFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (item) {
    return [{
      name: item
    }];
  };
  return list.map(function (item) {
    var result = {
      name: item,
      links: linkerFn(item)
    };

    if (isPlainObject(item)) {
      var _Object$entries$ = _slicedToArray(Object.entries(item)[0], 2),
          name = _Object$entries$[0],
          children = _Object$entries$[1];

      result.name = name;
      result.children = buildList(children, linkerFn);
    }

    return result;
  });
}
function createDefinitionFinder() {
  var definitions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var separatorRe = /\s?,|\/\s?/;

  var define = function define(term) {
    return definitions.find(function (d) {
      return term.match(new RegExp("^".concat(d.name, "$"), 'i'));
    }) || {
      name: term
    };
  };

  var processWikipediaLink = function processWikipediaLink(item) {
    var result = Object.assign({}, item);

    if (result.wikipedia) {
      result.wikipedia = "https://en.wikipedia.org/api/rest_v1/page/summary/".concat(item.wikipedia);
    }

    return result;
  };

  return function findDefinition(term) {
    if (typeof term === 'string') {
      return term.split(separatorRe).map(define).map(processWikipediaLink);
    }

    var containerName = term.name || Object.keys(term)[0];
    var containerDefinition = define(containerName);
    var result = processWikipediaLink(containerDefinition);
    var children = term[containerName];

    if (Array.isArray(children)) {
      result.children = children.map(findDefinition);
    }

    return [result];
  };
}

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file = "node_modules/svelte-icons/components/IconBase.svelte"; // (18:2) {#if title}

function create_if_block(ctx) {
  var title_1;
  var t;
  var block = {
    c: function create() {
      title_1 = svg_element("title");
      t = text(
      /*title*/
      ctx[0]);
      this.h();
    },
    l: function claim(nodes) {
      title_1 = claim_element(nodes, "title", {}, 1);
      var title_1_nodes = children(title_1);
      t = claim_text(title_1_nodes,
      /*title*/
      ctx[0]);
      title_1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(title_1, file, 18, 4, 961);
    },
    m: function mount(target, anchor) {
      insert_dev(target, title_1, anchor);
      append_dev(title_1, t);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*title*/
      1) set_data_dev(t,
      /*title*/
      ctx[0]);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(title_1);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block.name,
    type: "if",
    source: "(18:2) {#if title}",
    ctx: ctx
  });
  return block;
}

function create_fragment(ctx) {
  var svg;
  var if_block_anchor;
  var current;
  var if_block =
  /*title*/
  ctx[0] && create_if_block(ctx);
  var default_slot_template =
  /*#slots*/
  ctx[3].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[2], null);
  var block = {
    c: function create() {
      svg = svg_element("svg");
      if (if_block) if_block.c();
      if_block_anchor = empty();
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      svg = claim_element(nodes, "svg", {
        xmlns: true,
        viewBox: true,
        class: true
      }, 1);
      var svg_nodes = children(svg);
      if (if_block) if_block.l(svg_nodes);
      if_block_anchor = empty();
      if (default_slot) default_slot.l(svg_nodes);
      svg_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr_dev(svg, "viewBox",
      /*viewBox*/
      ctx[1]);
      attr_dev(svg, "class", "svelte-eaehr");
      add_location(svg, file, 16, 0, 892);
    },
    m: function mount(target, anchor) {
      insert_dev(target, svg, anchor);
      if (if_block) if_block.m(svg, null);
      append_dev(svg, if_block_anchor);

      if (default_slot) {
        default_slot.m(svg, null);
      }

      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (
      /*title*/
      ctx[0]) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block(ctx);
          if_block.c();
          if_block.m(svg, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        4) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[2], dirty, null, null);
        }
      }

      if (!current || dirty &
      /*viewBox*/
      2) {
        attr_dev(svg, "viewBox",
        /*viewBox*/
        ctx[1]);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(svg);
      if (if_block) if_block.d();
      if (default_slot) default_slot.d(detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance($$self, $$props, $$invalidate) {
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("IconBase", slots, ['default']);
  var _$$props$title = $$props.title,
      title = _$$props$title === void 0 ? null : _$$props$title;
  var viewBox = $$props.viewBox;
  var writable_props = ["title", "viewBox"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<IconBase> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$$set = function ($$props) {
    if ("title" in $$props) $$invalidate(0, title = $$props.title);
    if ("viewBox" in $$props) $$invalidate(1, viewBox = $$props.viewBox);
    if ("$$scope" in $$props) $$invalidate(2, $$scope = $$props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      title: title,
      viewBox: viewBox
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("title" in $$props) $$invalidate(0, title = $$props.title);
    if ("viewBox" in $$props) $$invalidate(1, viewBox = $$props.viewBox);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [title, viewBox, $$scope, slots];
}

var IconBase = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(IconBase, _SvelteComponentDev);

  var _super = _createSuper(IconBase);

  function IconBase(options) {
    var _this;

    _classCallCheck(this, IconBase);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
      title: 0,
      viewBox: 1
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "IconBase",
      options: options,
      id: create_fragment.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*viewBox*/
    ctx[1] === undefined && !("viewBox" in props)) {
      console.warn("<IconBase> was created without expected prop 'viewBox'");
    }

    return _this;
  }

  _createClass(IconBase, [{
    key: "title",
    get: function get() {
      throw new Error("<IconBase>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<IconBase>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "viewBox",
    get: function get() {
      throw new Error("<IconBase>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<IconBase>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return IconBase;
}(SvelteComponentDev);

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$1 = "node_modules/svelte-icons/fa/FaInfoCircle.svelte"; // (4:8) <IconBase viewBox="0 0 512 512" {...$$props}>

function create_default_slot(ctx) {
  var path;
  var block = {
    c: function create() {
      path = svg_element("path");
      this.h();
    },
    l: function claim(nodes) {
      path = claim_element(nodes, "path", {
        d: true
      }, 1);
      children(path).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(path, "d", "M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z");
      add_location(path, file$1, 4, 10, 153);
    },
    m: function mount(target, anchor) {
      insert_dev(target, path, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(path);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot.name,
    type: "slot",
    source: "(4:8) <IconBase viewBox=\\\"0 0 512 512\\\" {...$$props}>",
    ctx: ctx
  });
  return block;
}

function create_fragment$1(ctx) {
  var iconbase;
  var current;
  var iconbase_spread_levels = [{
    viewBox: "0 0 512 512"
  },
  /*$$props*/
  ctx[0]];
  var iconbase_props = {
    $$slots: {
      default: [create_default_slot]
    },
    $$scope: {
      ctx: ctx
    }
  };

  for (var i = 0; i < iconbase_spread_levels.length; i += 1) {
    iconbase_props = assign(iconbase_props, iconbase_spread_levels[i]);
  }

  iconbase = new IconBase({
    props: iconbase_props,
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(iconbase.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(iconbase.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(iconbase, target, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var iconbase_changes = dirty &
      /*$$props*/
      1 ? get_spread_update(iconbase_spread_levels, [iconbase_spread_levels[0], get_spread_object(
      /*$$props*/
      ctx[0])]) : {};

      if (dirty &
      /*$$scope*/
      2) {
        iconbase_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      iconbase.$set(iconbase_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(iconbase.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(iconbase.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(iconbase, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$1.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$1($$self, $$props, $$invalidate) {
  var _$$props = $$props,
      _$$props$$$slots = _$$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = _$$props.$$scope;
  validate_slots("FaInfoCircle", slots, []);

  $$self.$$set = function ($$new_props) {
    $$invalidate(0, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
  };

  $$self.$capture_state = function () {
    return {
      IconBase: IconBase
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(0, $$props = assign(assign({}, $$props), $$new_props));
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$props = exclude_internal_props($$props);
  return [$$props];
}

var FaInfoCircle = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(FaInfoCircle, _SvelteComponentDev);

  var _super = _createSuper$1(FaInfoCircle);

  function FaInfoCircle(options) {
    var _this;

    _classCallCheck(this, FaInfoCircle);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$1, create_fragment$1, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "FaInfoCircle",
      options: options,
      id: create_fragment$1.name
    });
    return _this;
  }

  return FaInfoCircle;
}(SvelteComponentDev);

/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.16.1
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';

var timeoutDuration = function () {
  var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];

  for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
    if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
      return 1;
    }
  }

  return 0;
}();

function microtaskDebounce(fn) {
  var called = false;
  return function () {
    if (called) {
      return;
    }

    called = true;
    window.Promise.resolve().then(function () {
      called = false;
      fn();
    });
  };
}

function taskDebounce(fn) {
  var scheduled = false;
  return function () {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}

var supportsMicroTasks = isBrowser && window.Promise;
/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/

var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;
/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */

function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}
/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */


function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  } // NOTE: 1 DOM access here


  var window = element.ownerDocument.defaultView;
  var css = window.getComputedStyle(element, null);
  return property ? css[property] : css;
}
/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */


function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }

  return element.parentNode || element.host;
}
/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} scroll parent
 */


function getScrollParent(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element) {
    return document.body;
  }

  switch (element.nodeName) {
    case 'HTML':
    case 'BODY':
      return element.ownerDocument.body;

    case '#document':
      return element.body;
  } // Firefox want us to check `-x` and `-y` variations as well


  var _getStyleComputedProp = getStyleComputedProperty(element),
      overflow = _getStyleComputedProp.overflow,
      overflowX = _getStyleComputedProp.overflowX,
      overflowY = _getStyleComputedProp.overflowY;

  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element));
}
/**
 * Returns the reference node of the reference object, or the reference object itself.
 * @method
 * @memberof Popper.Utils
 * @param {Element|Object} reference - the reference element (the popper will be relative to this)
 * @returns {Element} parent
 */


function getReferenceNode(reference) {
  return reference && reference.referenceNode ? reference.referenceNode : reference;
}

var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);
/**
 * Determines if the browser is Internet Explorer
 * @method
 * @memberof Popper.Utils
 * @param {Number} version to check
 * @returns {Boolean} isIE
 */

function isIE(version) {
  if (version === 11) {
    return isIE11;
  }

  if (version === 10) {
    return isIE10;
  }

  return isIE11 || isIE10;
}
/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */


function getOffsetParent(element) {
  if (!element) {
    return document.documentElement;
  }

  var noOffsetParent = isIE(10) ? document.body : null; // NOTE: 1 DOM access here

  var offsetParent = element.offsetParent || null; // Skip hidden elements which don't have an offsetParent

  while (offsetParent === noOffsetParent && element.nextElementSibling) {
    offsetParent = (element = element.nextElementSibling).offsetParent;
  }

  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return element ? element.ownerDocument.documentElement : document.documentElement;
  } // .offsetParent will return the closest TH, TD or TABLE in case
  // no offsetParent is present, I hate this job...


  if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}

function isOffsetContainer(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY') {
    return false;
  }

  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}
/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */


function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}
/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */


function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return document.documentElement;
  } // Here we make sure to give as "start" the element that comes first in the DOM


  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1; // Get common ancestor container

  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer; // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  } // one of the nodes is inside shadowDOM, find which one


  var element1root = getRoot(element1);

  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}
/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */


function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';
  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    var html = element.ownerDocument.documentElement;
    var scrollingElement = element.ownerDocument.scrollingElement || html;
    return scrollingElement[upperSide];
  }

  return element[upperSide];
}
/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */


function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var scrollTop = getScroll(element, 'top');
  var scrollLeft = getScroll(element, 'left');
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}
/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */


function getBordersSize(styles, axis) {
  var sideA = axis === 'x' ? 'Left' : 'Top';
  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';
  return parseFloat(styles['border' + sideA + 'Width']) + parseFloat(styles['border' + sideB + 'Width']);
}

function getSize(axis, body, html, computedStyle) {
  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
}

function getWindowSizes(document) {
  var body = document.body;
  var html = document.documentElement;
  var computedStyle = isIE(10) && getComputedStyle(html);
  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}

var classCallCheck = function classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineProperty = function defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};
/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */


function getClientRect(offsets) {
  return _extends({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}
/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */


function getBoundingClientRect(element) {
  var rect = {}; // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11

  try {
    if (isIE(10)) {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } else {
      rect = element.getBoundingClientRect();
    }
  } catch (e) {}

  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  }; // subtract scrollbar size from sizes

  var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
  var width = sizes.width || element.clientWidth || result.width;
  var height = sizes.height || element.clientHeight || result.height;
  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height; // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons

  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');
    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }

  return getClientRect(result);
}

function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var isIE10 = isIE(10);
  var isHTML = parent.nodeName === 'HTML';
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);
  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = parseFloat(styles.borderTopWidth);
  var borderLeftWidth = parseFloat(styles.borderLeftWidth); // In cases where the parent is fixed, we must ignore negative scroll in offset calc

  if (fixedPosition && isHTML) {
    parentRect.top = Math.max(parentRect.top, 0);
    parentRect.left = Math.max(parentRect.left, 0);
  }

  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0; // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.

  if (!isIE10 && isHTML) {
    var marginTop = parseFloat(styles.marginTop);
    var marginLeft = parseFloat(styles.marginLeft);
    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft; // Attach marginTop and marginLeft because in some circumstances we may need them

    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }

  if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
    offsets = includeScroll(offsets, parent);
  }

  return offsets;
}

function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var html = element.ownerDocument.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);
  var scrollTop = !excludeScroll ? getScroll(html) : 0;
  var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;
  var offset = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width: width,
    height: height
  };
  return getClientRect(offset);
}
/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */


function isFixed(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }

  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }

  var parentNode = getParentNode(element);

  if (!parentNode) {
    return false;
  }

  return isFixed(parentNode);
}
/**
 * Finds the first parent of an element that has a transformed property defined
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} first transformed parent or documentElement
 */


function getFixedPositionOffsetParent(element) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element || !element.parentElement || isIE()) {
    return document.documentElement;
  }

  var el = element.parentElement;

  while (el && getStyleComputedProperty(el, 'transform') === 'none') {
    el = el.parentElement;
  }

  return el || document.documentElement;
}
/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @param {Boolean} fixedPosition - Is in fixed position mode
 * @returns {Object} Coordinates of the boundaries
 */


function getBoundaries(popper, reference, padding, boundariesElement) {
  var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false; // NOTE: 1 DOM access here

  var boundaries = {
    top: 0,
    left: 0
  };
  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference)); // Handle viewport case

  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
  } else {
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode = void 0;

    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent(getParentNode(reference));

      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = popper.ownerDocument.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = popper.ownerDocument.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }

    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition); // In case of HTML, we need a different computation

    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(popper.ownerDocument),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  } // Add paddings


  padding = padding || 0;
  var isPaddingNumber = typeof padding === 'number';
  boundaries.left += isPaddingNumber ? padding : padding.left || 0;
  boundaries.top += isPaddingNumber ? padding : padding.top || 0;
  boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
  boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;
  return boundaries;
}

function getArea(_ref) {
  var width = _ref.width,
      height = _ref.height;
  return width * height;
}
/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);
  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };
  var sortedAreas = Object.keys(rects).map(function (key) {
    return _extends({
      key: key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function (a, b) {
    return b.area - a.area;
  });
  var filteredAreas = sortedAreas.filter(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });
  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;
  var variation = placement.split('-')[1];
  return computedPlacement + (variation ? '-' + variation : '');
}
/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @param {Element} fixedPosition - is in fixed position mode
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */


function getReferenceOffsets(state, popper, reference) {
  var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
}
/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */


function getOuterSizes(element) {
  var window = element.ownerDocument.defaultView;
  var styles = window.getComputedStyle(element);
  var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
  var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}
/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */


function getOppositePlacement(placement) {
  var hash = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
  };
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}
/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */


function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0]; // Get popper node sizes

  var popperRect = getOuterSizes(popper); // Add position, width and height to our offsets object

  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  }; // depending by the popper placement we have to compute its offsets slightly differently

  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  var mainSide = isHoriz ? 'top' : 'left';
  var secondarySide = isHoriz ? 'left' : 'top';
  var measurement = isHoriz ? 'height' : 'width';
  var secondaryMeasurement = !isHoriz ? 'height' : 'width';
  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;

  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }

  return popperOffsets;
}
/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */


function find(arr, check) {
  // use native find if supported
  if (Array.prototype.find) {
    return arr.find(check);
  } // use `filter` to obtain the same behavior of `find`


  return arr.filter(check)[0];
}
/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */


function findIndex(arr, prop, value) {
  // use native findIndex if supported
  if (Array.prototype.findIndex) {
    return arr.findIndex(function (cur) {
      return cur[prop] === value;
    });
  } // use `find` + `indexOf` if `findIndex` isn't supported


  var match = find(arr, function (obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}
/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */


function runModifiers(modifiers, data, ends) {
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));
  modifiersToRun.forEach(function (modifier) {
    if (modifier['function']) {
      // eslint-disable-line dot-notation
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }

    var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation

    if (modifier.enabled && isFunction(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);
      data = fn(data, modifier);
    }
  });
  return data;
}
/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */


function update() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }

  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  }; // compute reference element offsets

  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed); // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value

  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding); // store the computed placement inside `originalPlacement`

  data.originalPlacement = data.placement;
  data.positionFixed = this.options.positionFixed; // compute the popper offsets

  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);
  data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute'; // run the modifiers

  data = runModifiers(this.modifiers, data); // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback

  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}
/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */


function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(function (_ref) {
    var name = _ref.name,
        enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}
/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */


function getSupportedPropertyName(property) {
  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (var i = 0; i < prefixes.length; i++) {
    var prefix = prefixes[i];
    var toCheck = prefix ? '' + prefix + upperProp : property;

    if (typeof document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }

  return null;
}
/**
 * Destroys the popper.
 * @method
 * @memberof Popper
 */


function destroy() {
  this.state.isDestroyed = true; // touch DOM only if `applyStyle` modifier is enabled

  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
    this.popper.removeAttribute('x-placement');
    this.popper.style.position = '';
    this.popper.style.top = '';
    this.popper.style.left = '';
    this.popper.style.right = '';
    this.popper.style.bottom = '';
    this.popper.style.willChange = '';
    this.popper.style[getSupportedPropertyName('transform')] = '';
  }

  this.disableEventListeners(); // remove the popper if user explicitly asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it

  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }

  return this;
}
/**
 * Get the window associated with the element
 * @argument {Element} element
 * @returns {Window}
 */


function getWindow(element) {
  var ownerDocument = element.ownerDocument;
  return ownerDocument ? ownerDocument.defaultView : window;
}

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
  target.addEventListener(event, callback, {
    passive: true
  });

  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }

  scrollParents.push(target);
}
/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */


function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  getWindow(reference).addEventListener('resize', state.updateBound, {
    passive: true
  }); // Scroll event listener on scroll parents

  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;
  return state;
}
/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */


function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}
/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */


function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  getWindow(reference).removeEventListener('resize', state.updateBound); // Remove scroll event listener on scroll parents

  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  }); // Reset state

  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}
/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger `onUpdate` callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */


function disableEventListeners() {
  if (this.state.eventsEnabled) {
    cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}
/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */


function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}
/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */


function setStyles(element, styles) {
  Object.keys(styles).forEach(function (prop) {
    var unit = ''; // add unit if the value is numeric and is one of the following

    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }

    element.style[prop] = styles[prop] + unit;
  });
}
/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */


function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (prop) {
    var value = attributes[prop];

    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */


function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles); // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element

  setAttributes(data.instance.popper, data.attributes); // if arrowElement is defined and arrowStyles has some properties

  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }

  return data;
}
/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper
 * @param {Object} options - Popper.js options
 */


function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  // compute reference element offsets
  var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed); // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value

  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);
  popper.setAttribute('x-placement', placement); // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations

  setStyles(popper, {
    position: options.positionFixed ? 'fixed' : 'absolute'
  });
  return options;
}
/**
 * @function
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Boolean} shouldRound - If the offsets should be rounded at all
 * @returns {Object} The popper's position offsets rounded
 *
 * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
 * good as it can be within reason.
 * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
 *
 * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
 * as well on High DPI screens).
 *
 * Firefox prefers no rounding for positioning and does not have blurriness on
 * high DPI screens.
 *
 * Only horizontal placement and left/right values need to be considered.
 */


function getRoundedOffsets(data, shouldRound) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var round = Math.round,
      floor = Math.floor;

  var noRound = function noRound(v) {
    return v;
  };

  var referenceWidth = round(reference.width);
  var popperWidth = round(popper.width);
  var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
  var isVariation = data.placement.indexOf('-') !== -1;
  var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
  var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;
  var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
  var verticalToInteger = !shouldRound ? noRound : round;
  return {
    left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
    top: verticalToInteger(popper.top),
    bottom: verticalToInteger(popper.bottom),
    right: horizontalToInteger(popper.right)
  };
}

var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */

function computeStyle(data, options) {
  var x = options.x,
      y = options.y;
  var popper = data.offsets.popper; // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;

  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }

  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;
  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent); // Styles

  var styles = {
    position: popper.position
  };
  var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);
  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right'; // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed

  var prefixedProperty = getSupportedPropertyName('transform'); // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.

  var left = void 0,
      top = void 0;

  if (sideA === 'bottom') {
    // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
    // and not the bottom of the html element
    if (offsetParent.nodeName === 'HTML') {
      top = -offsetParent.clientHeight + offsets.bottom;
    } else {
      top = -offsetParentRect.height + offsets.bottom;
    }
  } else {
    top = offsets.top;
  }

  if (sideB === 'right') {
    if (offsetParent.nodeName === 'HTML') {
      left = -offsetParent.clientWidth + offsets.right;
    } else {
      left = -offsetParentRect.width + offsets.right;
    }
  } else {
    left = offsets.left;
  }

  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ', ' + sideB;
  } // Attributes


  var attributes = {
    'x-placement': data.placement
  }; // Update `data` attributes, styles and arrowStyles

  data.attributes = _extends({}, attributes, data.attributes);
  data.styles = _extends({}, styles, data.styles);
  data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);
  return data;
}
/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */


function isModifierRequired(modifiers, requestingName, requestedName) {
  var requesting = find(modifiers, function (_ref) {
    var name = _ref.name;
    return name === requestingName;
  });
  var isRequired = !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });

  if (!isRequired) {
    var _requesting = '`' + requestingName + '`';

    var requested = '`' + requestedName + '`';
    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
  }

  return isRequired;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function arrow(data, options) {
  var _data$offsets$arrow; // arrow depends on keepTogether in order to work


  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
    return data;
  }

  var arrowElement = options.element; // if arrowElement is a string, suppose it's a CSS selector

  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement); // if arrowElement is not found, don't run the modifier

    if (!arrowElement) {
      return data;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn('WARNING: `arrow.element` must be child of its popper element!');
      return data;
    }
  }

  var placement = data.placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var isVertical = ['left', 'right'].indexOf(placement) !== -1;
  var len = isVertical ? 'height' : 'width';
  var sideCapitalized = isVertical ? 'Top' : 'Left';
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? 'left' : 'top';
  var opSide = isVertical ? 'bottom' : 'right';
  var arrowElementSize = getOuterSizes(arrowElement)[len]; //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjunction
  //
  // top/left side

  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  } // bottom/right side


  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }

  data.offsets.popper = getClientRect(data.offsets.popper); // compute center of the popper

  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2; // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available

  var css = getStyleComputedProperty(data.instance.popper);
  var popperMarginSide = parseFloat(css['margin' + sideCapitalized]);
  var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width']);
  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide; // prevent arrowElement from being placed not contiguously to its popper

  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);
  data.arrowElement = arrowElement;
  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);
  return data;
}
/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */


function getOppositeVariation(variation) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }

  return variation;
}
/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-end` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */


var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start']; // Get rid of `auto` `auto-start` and `auto-end`

var validPlacements = placements.slice(3);
/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */

function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}

var BEHAVIORS = {
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */

function flip(data, options) {
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
    return data;
  }

  if (data.flipped && data.placement === data.originalPlacement) {
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
    return data;
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);
  var placement = data.placement.split('-')[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split('-')[1] || '';
  var flipOrder = [];

  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;

    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;

    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;

    default:
      flipOrder = options.behavior;
  }

  flipOrder.forEach(function (step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }

    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);
    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference; // using floor because the reference offsets may contain decimals we are not going to consider here

    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);
    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);
    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom; // flip the variation if required

    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1; // flips variation if reference element overflows boundaries

    var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom); // flips variation if popper content overflows boundaries

    var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);
    var flippedVariation = flippedVariationByRef || flippedVariationByContent;

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? '-' + variation : ''); // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future

      data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));
      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function keepTogether(data) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var placement = data.placement.split('-')[0];
  var floor = Math.floor;
  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  var side = isVertical ? 'right' : 'bottom';
  var opSide = isVertical ? 'left' : 'top';
  var measurement = isVertical ? 'width' : 'height';

  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }

  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }

  return data;
}
/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */


function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2]; // If it's not a number it's an operator, I guess

  if (!value) {
    return str;
  }

  if (unit.indexOf('%') === 0) {
    var element = void 0;

    switch (unit) {
      case '%p':
        element = popperOffsets;
        break;

      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    }

    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === 'vh' || unit === 'vw') {
    // if is a vh or vw, we calculate the size based on the viewport
    var size = void 0;

    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }

    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}
/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */


function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0]; // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one

  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1; // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)

  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  }); // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space

  var divider = fragments.indexOf(find(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  } // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.


  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments]; // Convert the values with units to absolute pixels to allow our computations

  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce(function (a, b) {
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, []) // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  }); // Loop trough the offsets arrays and execute the operations

  ops.forEach(function (op, index) {
    op.forEach(function (frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */


function offset(data, _ref) {
  var offset = _ref.offset;
  var placement = data.placement,
      _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var basePlacement = placement.split('-')[0];
  var offsets = void 0;

  if (isNumeric(+offset)) {
    offsets = [+offset, 0];
  } else {
    offsets = parseOffset(offset, popper, reference, basePlacement);
  }

  if (basePlacement === 'left') {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === 'right') {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === 'top') {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === 'bottom') {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }

  data.popper = popper;
  return data;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper); // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken

  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  } // NOTE: DOM access here
  // resets the popper's position so that the document size can be calculated excluding
  // the size of the popper element itself


  var transformProp = getSupportedPropertyName('transform');
  var popperStyles = data.instance.popper.style; // assignment to help minification

  var top = popperStyles.top,
      left = popperStyles.left,
      transform = popperStyles[transformProp];
  popperStyles.top = '';
  popperStyles.left = '';
  popperStyles[transformProp] = '';
  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed); // NOTE: DOM access here
  // restores the original style properties after the offsets have been computed

  popperStyles.top = top;
  popperStyles.left = left;
  popperStyles[transformProp] = transform;
  options.boundaries = boundaries;
  var order = options.priority;
  var popper = data.offsets.popper;
  var check = {
    primary: function primary(placement) {
      var value = popper[placement];

      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }

      return defineProperty({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === 'right' ? 'left' : 'top';
      var value = popper[mainSide];

      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }

      return defineProperty({}, mainSide, value);
    }
  };
  order.forEach(function (placement) {
    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends({}, popper, check[side](placement));
  });
  data.offsets.popper = popper;
  return data;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var shiftvariation = placement.split('-')[1]; // if shift shiftvariation is specified, run the modifier

  if (shiftvariation) {
    var _data$offsets = data.offsets,
        reference = _data$offsets.reference,
        popper = _data$offsets.popper;
    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    var side = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';
    var shiftOffsets = {
      start: defineProperty({}, side, reference[side]),
      end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
    };
    data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
  }

  return data;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }

  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'preventOverflow';
  }).boundaries;

  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) {
      return data;
    }

    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  } else {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) {
      return data;
    }

    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  }

  return data;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;
  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;
  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);
  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);
  return data;
}
/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */


var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: shift
  },

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unit-less, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the `height`.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: offset,

    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * A scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: preventOverflow,

    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],

    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper. This makes sure the popper always has a little padding
     * between the edges of its container
     */
    padding: 5,

    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier. Can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },

  /**
   * Modifier used to make sure the reference and its popper stay near each other
   * without leaving any gap between the two. Especially useful when the arrow is
   * enabled and you want to ensure that it points to its reference element.
   * It cares only about the first axis. You can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: keepTogether
  },

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjunction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: arrow,

    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: flip,

    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations)
     */
    behavior: 'flip',

    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,

    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position.
     * The popper will never be placed outside of the defined boundaries
     * (except if `keepTogether` is enabled)
     */
    boundariesElement: 'viewport',

    /**
     * @prop {Boolean} flipVariations=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the reference element overlaps its boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariations: false,

    /**
     * @prop {Boolean} flipVariationsByContent=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the popper element overlaps its reference boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariationsByContent: false
  },

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,

    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,

    /** @prop {ModifierFn} */
    fn: inner
  },

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: hide
  },

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: computeStyle,

    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: true,

    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',

    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define your own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: applyStyle,

    /** @prop {Function} */
    onLoad: applyStyleOnLoad,

    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: undefined
  }
};
/**
 * The `dataObject` is an object containing all the information used by Popper.js.
 * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overridden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass an object with the same
 * structure of the `options` object, as the 3rd argument. For example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */

var Defaults = {
  /**
   * Popper's placement.
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',

  /**
   * Set this to true if you want popper to position it self in 'fixed' mode
   * @prop {Boolean} positionFixed=false
   */
  positionFixed: false,

  /**
   * Whether events (resize, scroll) are initially enabled.
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {},

  /**
   * Callback called when the popper is updated. This callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {},

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js.
   * @prop {modifiers}
   */
  modifiers: modifiers
};
/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */
// Utils
// Methods

var Popper = function () {
  /**
   * Creates a new Popper.js instance.
   * @class Popper
   * @param {Element|referenceObject} reference - The reference element used to position the popper
   * @param {Element} popper - The HTML / XML element used as the popper
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, Popper);

    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    }; // make update() debounced, so that it only runs at most once-per-tick


    this.update = debounce(this.update.bind(this)); // with {} we create a new object with the options inside it

    this.options = _extends({}, Popper.Defaults, options); // init state

    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    }; // get reference and popper elements (allow jQuery wrappers)

    this.reference = reference && reference.jquery ? reference[0] : reference;
    this.popper = popper && popper.jquery ? popper[0] : popper; // Deep merge modifiers options

    this.options.modifiers = {};
    Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    }); // Refactoring modifiers' list (Object => Array)

    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends({
        name: name
      }, _this.options.modifiers[name]);
    }) // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    }); // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!

    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    }); // fire the first update to position the popper in the right place

    this.update();
    var eventsEnabled = this.options.eventsEnabled;

    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  } // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs


  createClass(Popper, [{
    key: 'update',
    value: function update$$1() {
      return update.call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy$$1() {
      return destroy.call(this);
    }
  }, {
    key: 'enableEventListeners',
    value: function enableEventListeners$$1() {
      return enableEventListeners.call(this);
    }
  }, {
    key: 'disableEventListeners',
    value: function disableEventListeners$$1() {
      return disableEventListeners.call(this);
    }
    /**
     * Schedules an update. It will run on the next UI update available.
     * @method scheduleUpdate
     * @memberof Popper
     */

    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */

  }]);
  return Popper;
}();
/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10.
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */


Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;

function tooltip(_x, _x2) {
  return _tooltip.apply(this, arguments);
}

function _tooltip() {
  _tooltip = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(node, _ref) {
    var text, url, resultProp, el, arrowEl, tooltipText, append, _append, remove, cancelMouseEnter, cancelMouseLeave;

    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            remove = function _remove() {
              el.remove();
            };

            _append = function _append3() {
              _append = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
                var result;
                return regenerator.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        document.body.appendChild(el);
                        el.style.zIndex = '10';
                        el.style.opacity = '0';

                        if (!(!tooltipText && url)) {
                          _context.next = 8;
                          break;
                        }

                        _context.next = 6;
                        return fetch(url).then(function (res) {
                          return res.json();
                        });

                      case 6:
                        result = _context.sent;
                        tooltipText = resultProp ? result[resultProp] : result;

                      case 8:
                        el.textContent = tooltipText;
                        new Popper(node, el, {
                          placement: 'bottom',
                          positionFixed: true
                        });
                        setTimeout(function () {
                          el.style.opacity = '1';
                        });
                        el.appendChild(arrowEl);

                      case 12:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));
              return _append.apply(this, arguments);
            };

            append = function _append2() {
              return _append.apply(this, arguments);
            };

            text = _ref.text, url = _ref.url, resultProp = _ref.resultProp;

            if (!(!text && !url)) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return");

          case 6:
            el = document.createElement('div');
            arrowEl = document.createElement('div');
            el.className = 'popper';
            arrowEl.className = 'popper__arrow';
            arrowEl.setAttribute('x-arrow', '');
            tooltipText = text;
            cancelMouseEnter = listen(node, 'mouseenter', append);
            cancelMouseLeave = listen(node, 'mouseleave', remove);
            return _context2.abrupt("return", {
              destroy: function destroy() {
                remove();
                cancelMouseEnter();
                cancelMouseLeave();
              }
            });

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _tooltip.apply(this, arguments);
}

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$2 = "src/components/LinkWithPreview.svelte";

function create_fragment$2(ctx) {
  var a;
  var tooltip_action;
  var current;
  var mounted;
  var dispose;
  var default_slot_template =
  /*#slots*/
  ctx[4].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[3], null);
  var block = {
    c: function create() {
      a = element("a");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      a = claim_element(nodes, "A", {
        href: true,
        class: true
      });
      var a_nodes = children(a);
      if (default_slot) default_slot.l(a_nodes);
      a_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(a, "href",
      /*href*/
      ctx[0]);
      attr_dev(a, "class", "svelte-1ci29ca");
      add_location(a, file$2, 17, 0, 804);
    },
    m: function mount(target, anchor) {
      insert_dev(target, a, anchor);

      if (default_slot) {
        default_slot.m(a, null);
      }

      current = true;

      if (!mounted) {
        dispose = action_destroyer(tooltip_action = tooltip.call(null, a, {
          text:
          /*description*/
          ctx[1],
          url:
          /*descriptionUrl*/
          ctx[2],
          resultProp: "extract"
        }));
        mounted = true;
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        8) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[3], dirty, null, null);
        }
      }

      if (!current || dirty &
      /*href*/
      1) {
        attr_dev(a, "href",
        /*href*/
        ctx[0]);
      }

      if (tooltip_action && is_function(tooltip_action.update) && dirty &
      /*description, descriptionUrl*/
      6) tooltip_action.update.call(null, {
        text:
        /*description*/
        ctx[1],
        url:
        /*descriptionUrl*/
        ctx[2],
        resultProp: "extract"
      });
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(a);
      if (default_slot) default_slot.d(detaching);
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$2.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$2($$self, $$props, $$invalidate) {
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("LinkWithPreview", slots, ['default']);
  var href = $$props.href;
  var description = $$props.description;
  var descriptionUrl = $$props.descriptionUrl;
  var writable_props = ["href", "description", "descriptionUrl"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<LinkWithPreview> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$$set = function ($$props) {
    if ("href" in $$props) $$invalidate(0, href = $$props.href);
    if ("description" in $$props) $$invalidate(1, description = $$props.description);
    if ("descriptionUrl" in $$props) $$invalidate(2, descriptionUrl = $$props.descriptionUrl);
    if ("$$scope" in $$props) $$invalidate(3, $$scope = $$props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      tooltip: tooltip,
      href: href,
      description: description,
      descriptionUrl: descriptionUrl
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("href" in $$props) $$invalidate(0, href = $$props.href);
    if ("description" in $$props) $$invalidate(1, description = $$props.description);
    if ("descriptionUrl" in $$props) $$invalidate(2, descriptionUrl = $$props.descriptionUrl);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [href, description, descriptionUrl, $$scope, slots];
}

var LinkWithPreview = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(LinkWithPreview, _SvelteComponentDev);

  var _super = _createSuper$2(LinkWithPreview);

  function LinkWithPreview(options) {
    var _this;

    _classCallCheck(this, LinkWithPreview);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$2, create_fragment$2, safe_not_equal, {
      href: 0,
      description: 1,
      descriptionUrl: 2
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "LinkWithPreview",
      options: options,
      id: create_fragment$2.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*href*/
    ctx[0] === undefined && !("href" in props)) {
      console.warn("<LinkWithPreview> was created without expected prop 'href'");
    }

    if (
    /*description*/
    ctx[1] === undefined && !("description" in props)) {
      console.warn("<LinkWithPreview> was created without expected prop 'description'");
    }

    if (
    /*descriptionUrl*/
    ctx[2] === undefined && !("descriptionUrl" in props)) {
      console.warn("<LinkWithPreview> was created without expected prop 'descriptionUrl'");
    }

    return _this;
  }

  _createClass(LinkWithPreview, [{
    key: "href",
    get: function get() {
      throw new Error("<LinkWithPreview>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<LinkWithPreview>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "description",
    get: function get() {
      throw new Error("<LinkWithPreview>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<LinkWithPreview>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "descriptionUrl",
    get: function get() {
      throw new Error("<LinkWithPreview>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<LinkWithPreview>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return LinkWithPreview;
}(SvelteComponentDev);

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Object_1 = globals.Object;

function get_each_context_1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[6] = list[i];
  child_ctx[5] = i;
  return child_ctx;
}

function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[3] = list[i];
  child_ctx[5] = i;
  return child_ctx;
} // (19:2) {:else}


function create_else_block_1(ctx) {
  var t0_value =
  /*getPlainItemName*/
  ctx[2](
  /*item*/
  ctx[3]) + "";
  var t0;
  var t1_value =
  /*separator*/
  ctx[1](
  /*idx*/
  ctx[5],
  /*items*/
  ctx[0]) + "";
  var t1;
  var current;
  var if_block =
  /*item*/
  ctx[3].children && create_if_block_3(ctx);
  var block = {
    c: function create() {
      t0 = text(t0_value);
      if (if_block) if_block.c();
      t1 = text(t1_value);
    },
    l: function claim(nodes) {
      t0 = claim_text(nodes, t0_value);
      if (if_block) if_block.l(nodes);
      t1 = claim_text(nodes, t1_value);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      if (if_block) if_block.m(target, anchor);
      insert_dev(target, t1, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      if ((!current || dirty &
      /*items*/
      1) && t0_value !== (t0_value =
      /*getPlainItemName*/
      ctx[2](
      /*item*/
      ctx[3]) + "")) set_data_dev(t0, t0_value);

      if (
      /*item*/
      ctx[3].children) {
        if (if_block) {
          if_block.p(ctx, dirty);

          if (dirty &
          /*items*/
          1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_3(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(t1.parentNode, t1);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, function () {
          if_block = null;
        });
        check_outros();
      }

      if ((!current || dirty &
      /*items*/
      1) && t1_value !== (t1_value =
      /*separator*/
      ctx[1](
      /*idx*/
      ctx[5],
      /*items*/
      ctx[0]) + "")) set_data_dev(t1, t1_value);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (if_block) if_block.d(detaching);
      if (detaching) detach_dev(t1);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block_1.name,
    type: "else",
    source: "(19:2) {:else}",
    ctx: ctx
  });
  return block;
} // (17:2) {#if item.links}


function create_if_block$1(ctx) {
  var each_1_anchor;
  var t_value =
  /*separator*/
  ctx[1](
  /*idx*/
  ctx[5],
  /*items*/
  ctx[0]) + "";
  var t;
  var current;
  var each_value_1 =
  /*item*/
  ctx[3].links;
  validate_each_argument(each_value_1);
  var each_blocks = [];

  for (var i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }

  var out = function out(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };

  var if_block =
  /*item*/
  ctx[3].children && create_if_block_1(ctx);
  var block = {
    c: function create() {
      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      each_1_anchor = empty();
      if (if_block) if_block.c();
      t = text(t_value);
    },
    l: function claim(nodes) {
      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(nodes);
      }

      each_1_anchor = empty();
      if (if_block) if_block.l(nodes);
      t = claim_text(nodes, t_value);
    },
    m: function mount(target, anchor) {
      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(target, anchor);
      }

      insert_dev(target, each_1_anchor, anchor);
      if (if_block) if_block.m(target, anchor);
      insert_dev(target, t, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*separator, items*/
      3) {
        each_value_1 =
        /*item*/
        ctx[3].links;
        validate_each_argument(each_value_1);

        var _i4;

        for (_i4 = 0; _i4 < each_value_1.length; _i4 += 1) {
          var child_ctx = get_each_context_1(ctx, each_value_1, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);

            transition_in(each_blocks[_i4], 1);
          } else {
            each_blocks[_i4] = create_each_block_1(child_ctx);

            each_blocks[_i4].c();

            transition_in(each_blocks[_i4], 1);

            each_blocks[_i4].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }

        group_outros();

        for (_i4 = each_value_1.length; _i4 < each_blocks.length; _i4 += 1) {
          out(_i4);
        }

        check_outros();
      }

      if (
      /*item*/
      ctx[3].children) {
        if (if_block) {
          if_block.p(ctx, dirty);

          if (dirty &
          /*items*/
          1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_1(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(t.parentNode, t);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, function () {
          if_block = null;
        });
        check_outros();
      }

      if ((!current || dirty &
      /*items*/
      1) && t_value !== (t_value =
      /*separator*/
      ctx[1](
      /*idx*/
      ctx[5],
      /*items*/
      ctx[0]) + "")) set_data_dev(t, t_value);
    },
    i: function intro(local) {
      if (current) return;

      for (var _i5 = 0; _i5 < each_value_1.length; _i5 += 1) {
        transition_in(each_blocks[_i5]);
      }

      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      each_blocks = each_blocks.filter(Boolean);

      for (var _i6 = 0; _i6 < each_blocks.length; _i6 += 1) {
        transition_out(each_blocks[_i6]);
      }

      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching) detach_dev(each_1_anchor);
      if (if_block) if_block.d(detaching);
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$1.name,
    type: "if",
    source: "(17:2) {#if item.links}",
    ctx: ctx
  });
  return block;
} // (20:28) {#if item.children}


function create_if_block_3(ctx) {
  var t0_value = " " + "";
  var t0;
  var t1;
  var inlinelist;
  var t2;
  var current;
  inlinelist = new InlineList({
    props: {
      items:
      /*item*/
      ctx[3].children
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      t0 = text(t0_value);
      t1 = text("(");
      create_component(inlinelist.$$.fragment);
      t2 = text(")");
    },
    l: function claim(nodes) {
      t0 = claim_text(nodes, t0_value);
      t1 = claim_text(nodes, "(");
      claim_component(inlinelist.$$.fragment, nodes);
      t2 = claim_text(nodes, ")");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, t1, anchor);
      mount_component(inlinelist, target, anchor);
      insert_dev(target, t2, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var inlinelist_changes = {};
      if (dirty &
      /*items*/
      1) inlinelist_changes.items =
      /*item*/
      ctx[3].children;
      inlinelist.$set(inlinelist_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(inlinelist.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(inlinelist.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(t1);
      destroy_component(inlinelist, detaching);
      if (detaching) detach_dev(t2);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_3.name,
    type: "if",
    source: "(20:28) {#if item.children}",
    ctx: ctx
  });
  return block;
} // (18:174) {:else}


function create_else_block(ctx) {
  var t_value =
  /*link*/
  ctx[6].name + "";
  var t;
  var block = {
    c: function create() {
      t = text(t_value);
    },
    l: function claim(nodes) {
      t = claim_text(nodes, t_value);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*items*/
      1 && t_value !== (t_value =
      /*link*/
      ctx[6].name + "")) set_data_dev(t, t_value);
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block.name,
    type: "else",
    source: "(18:174) {:else}",
    ctx: ctx
  });
  return block;
} // (18:35) {#if link.url}


function create_if_block_2(ctx) {
  var linkwithpreview;
  var current;
  linkwithpreview = new LinkWithPreview({
    props: {
      href:
      /*link*/
      ctx[6].url,
      descriptionUrl:
      /*link*/
      ctx[6].wikipedia,
      description:
      /*link*/
      ctx[6].description,
      $$slots: {
        default: [create_default_slot$1]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(linkwithpreview.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(linkwithpreview.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(linkwithpreview, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var linkwithpreview_changes = {};
      if (dirty &
      /*items*/
      1) linkwithpreview_changes.href =
      /*link*/
      ctx[6].url;
      if (dirty &
      /*items*/
      1) linkwithpreview_changes.descriptionUrl =
      /*link*/
      ctx[6].wikipedia;
      if (dirty &
      /*items*/
      1) linkwithpreview_changes.description =
      /*link*/
      ctx[6].description;

      if (dirty &
      /*$$scope, items*/
      257) {
        linkwithpreview_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      linkwithpreview.$set(linkwithpreview_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(linkwithpreview.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(linkwithpreview.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(linkwithpreview, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2.name,
    type: "if",
    source: "(18:35) {#if link.url}",
    ctx: ctx
  });
  return block;
} // (18:49) <LinkWithPreview href={link.url} descriptionUrl={link.wikipedia} description={link.description}>


function create_default_slot$1(ctx) {
  var t_value =
  /*link*/
  ctx[6].name + "";
  var t;
  var block = {
    c: function create() {
      t = text(t_value);
    },
    l: function claim(nodes) {
      t = claim_text(nodes, t_value);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*items*/
      1 && t_value !== (t_value =
      /*link*/
      ctx[6].name + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot$1.name,
    type: "slot",
    source: "(18:49) <LinkWithPreview href={link.url} descriptionUrl={link.wikipedia} description={link.description}>",
    ctx: ctx
  });
  return block;
} // (18:4) {#each item.links as link, idx}


function create_each_block_1(ctx) {
  var current_block_type_index;
  var if_block;
  var t_value =
  /*separator*/
  ctx[1](
  /*idx*/
  ctx[5],
  /*item*/
  ctx[3].links) + "";
  var t;
  var current;
  var if_block_creators = [create_if_block_2, create_else_block];
  var if_blocks = [];

  function select_block_type_1(ctx, dirty) {
    if (
    /*link*/
    ctx[6].url) return 0;
    return 1;
  }

  current_block_type_index = select_block_type_1(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      if_block.c();
      t = text(t_value);
    },
    l: function claim(nodes) {
      if_block.l(nodes);
      t = claim_text(nodes, t_value);
    },
    m: function mount(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert_dev(target, t, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_1(ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];

        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        }

        transition_in(if_block, 1);
        if_block.m(t.parentNode, t);
      }

      if ((!current || dirty &
      /*items*/
      1) && t_value !== (t_value =
      /*separator*/
      ctx[1](
      /*idx*/
      ctx[5],
      /*item*/
      ctx[3].links) + "")) set_data_dev(t, t_value);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_1.name,
    type: "each",
    source: "(18:4) {#each item.links as link, idx}",
    ctx: ctx
  });
  return block;
} // (18:232) {#if item.children}


function create_if_block_1(ctx) {
  var t0_value = " " + "";
  var t0;
  var t1;
  var inlinelist;
  var t2;
  var current;
  inlinelist = new InlineList({
    props: {
      items:
      /*item*/
      ctx[3].children
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      t0 = text(t0_value);
      t1 = text("(");
      create_component(inlinelist.$$.fragment);
      t2 = text(")");
    },
    l: function claim(nodes) {
      t0 = claim_text(nodes, t0_value);
      t1 = claim_text(nodes, "(");
      claim_component(inlinelist.$$.fragment, nodes);
      t2 = claim_text(nodes, ")");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, t1, anchor);
      mount_component(inlinelist, target, anchor);
      insert_dev(target, t2, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var inlinelist_changes = {};
      if (dirty &
      /*items*/
      1) inlinelist_changes.items =
      /*item*/
      ctx[3].children;
      inlinelist.$set(inlinelist_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(inlinelist.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(inlinelist.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(t1);
      destroy_component(inlinelist, detaching);
      if (detaching) detach_dev(t2);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1.name,
    type: "if",
    source: "(18:232) {#if item.children}",
    ctx: ctx
  });
  return block;
} // (16:0) {#each items as item, idx}


function create_each_block(ctx) {
  var current_block_type_index;
  var if_block;
  var if_block_anchor;
  var current;
  var if_block_creators = [create_if_block$1, create_else_block_1];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*item*/
    ctx[3].links) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];

        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        }

        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block.name,
    type: "each",
    source: "(16:0) {#each items as item, idx}",
    ctx: ctx
  });
  return block;
}

function create_fragment$3(ctx) {
  var each_1_anchor;
  var current;
  var each_value =
  /*items*/
  ctx[0];
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }

  var out = function out(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };

  var block = {
    c: function create() {
      for (var _i7 = 0; _i7 < each_blocks.length; _i7 += 1) {
        each_blocks[_i7].c();
      }

      each_1_anchor = empty();
    },
    l: function claim(nodes) {
      for (var _i8 = 0; _i8 < each_blocks.length; _i8 += 1) {
        each_blocks[_i8].l(nodes);
      }

      each_1_anchor = empty();
    },
    m: function mount(target, anchor) {
      for (var _i9 = 0; _i9 < each_blocks.length; _i9 += 1) {
        each_blocks[_i9].m(target, anchor);
      }

      insert_dev(target, each_1_anchor, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*separator, items, getPlainItemName*/
      7) {
        each_value =
        /*items*/
        ctx[0];
        validate_each_argument(each_value);

        var _i10;

        for (_i10 = 0; _i10 < each_value.length; _i10 += 1) {
          var child_ctx = get_each_context(ctx, each_value, _i10);

          if (each_blocks[_i10]) {
            each_blocks[_i10].p(child_ctx, dirty);

            transition_in(each_blocks[_i10], 1);
          } else {
            each_blocks[_i10] = create_each_block(child_ctx);

            each_blocks[_i10].c();

            transition_in(each_blocks[_i10], 1);

            each_blocks[_i10].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }

        group_outros();

        for (_i10 = each_value.length; _i10 < each_blocks.length; _i10 += 1) {
          out(_i10);
        }

        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;

      for (var _i11 = 0; _i11 < each_value.length; _i11 += 1) {
        transition_in(each_blocks[_i11]);
      }

      current = true;
    },
    o: function outro(local) {
      each_blocks = each_blocks.filter(Boolean);

      for (var _i12 = 0; _i12 < each_blocks.length; _i12 += 1) {
        transition_out(each_blocks[_i12]);
      }

      current = false;
    },
    d: function destroy(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching) detach_dev(each_1_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$3.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$3($$self, $$props, $$invalidate) {
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("InlineList", slots, []);
  var _$$props$items = $$props.items,
      items = _$$props$items === void 0 ? [] : _$$props$items;

  var separator = function separator(idx, list) {
    return idx < list.length - 1 ? ", " : "";
  };

  var getPlainItemName = function getPlainItemName(item) {
    if (typeof item.name === "string") {
      return item.name;
    }

    var _Object$entries$ = _slicedToArray(Object.entries(item.name)[0], 2),
        parentName = _Object$entries$[0],
        children = _Object$entries$[1];

    return "".concat(parentName, " (").concat(children.join(", "), ")");
  };

  var writable_props = ["items"];
  Object_1.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<InlineList> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$$set = function ($$props) {
    if ("items" in $$props) $$invalidate(0, items = $$props.items);
  };

  $$self.$capture_state = function () {
    return {
      LinkWithPreview: LinkWithPreview,
      items: items,
      separator: separator,
      getPlainItemName: getPlainItemName
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("items" in $$props) $$invalidate(0, items = $$props.items);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [items, separator, getPlainItemName];
}

var InlineList = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(InlineList, _SvelteComponentDev);

  var _super = _createSuper$3(InlineList);

  function InlineList(options) {
    var _this;

    _classCallCheck(this, InlineList);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$3, create_fragment$3, safe_not_equal, {
      items: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "InlineList",
      options: options,
      id: create_fragment$3.name
    });
    return _this;
  }

  _createClass(InlineList, [{
    key: "items",
    get: function get() {
      throw new Error("<InlineList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<InlineList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return InlineList;
}(SvelteComponentDev);

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$3 = "src/components/List/BlockList.svelte";

function get_each_context_1$1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[5] = list[i];
  child_ctx[7] = i;
  return child_ctx;
}

function get_each_context$1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[2] = list[i];
  return child_ctx;
} // (27:6) {:else}


function create_else_block_1$1(ctx) {
  var t_value =
  /*item*/
  ctx[2].name + "";
  var t;
  var block = {
    c: function create() {
      t = text(t_value);
    },
    l: function claim(nodes) {
      t = claim_text(nodes, t_value);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*items*/
      1 && t_value !== (t_value =
      /*item*/
      ctx[2].name + "")) set_data_dev(t, t_value);
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block_1$1.name,
    type: "else",
    source: "(27:6) {:else}",
    ctx: ctx
  });
  return block;
} // (19:6) {#if item.links}


function create_if_block_1$1(ctx) {
  var each_1_anchor;
  var current;
  var each_value_1 =
  /*item*/
  ctx[2].links;
  validate_each_argument(each_value_1);
  var each_blocks = [];

  for (var i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
  }

  var out = function out(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };

  var block = {
    c: function create() {
      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      each_1_anchor = empty();
    },
    l: function claim(nodes) {
      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(nodes);
      }

      each_1_anchor = empty();
    },
    m: function mount(target, anchor) {
      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(target, anchor);
      }

      insert_dev(target, each_1_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*separator, items*/
      3) {
        each_value_1 =
        /*item*/
        ctx[2].links;
        validate_each_argument(each_value_1);

        var _i4;

        for (_i4 = 0; _i4 < each_value_1.length; _i4 += 1) {
          var child_ctx = get_each_context_1$1(ctx, each_value_1, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);

            transition_in(each_blocks[_i4], 1);
          } else {
            each_blocks[_i4] = create_each_block_1$1(child_ctx);

            each_blocks[_i4].c();

            transition_in(each_blocks[_i4], 1);

            each_blocks[_i4].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }

        group_outros();

        for (_i4 = each_value_1.length; _i4 < each_blocks.length; _i4 += 1) {
          out(_i4);
        }

        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;

      for (var _i5 = 0; _i5 < each_value_1.length; _i5 += 1) {
        transition_in(each_blocks[_i5]);
      }

      current = true;
    },
    o: function outro(local) {
      each_blocks = each_blocks.filter(Boolean);

      for (var _i6 = 0; _i6 < each_blocks.length; _i6 += 1) {
        transition_out(each_blocks[_i6]);
      }

      current = false;
    },
    d: function destroy(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching) detach_dev(each_1_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$1.name,
    type: "if",
    source: "(19:6) {#if item.links}",
    ctx: ctx
  });
  return block;
} // (25:74) {:else}


function create_else_block$1(ctx) {
  var t_value =
  /*link*/
  ctx[5].name + "";
  var t;
  var block = {
    c: function create() {
      t = text(t_value);
    },
    l: function claim(nodes) {
      t = claim_text(nodes, t_value);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*items*/
      1 && t_value !== (t_value =
      /*link*/
      ctx[5].name + "")) set_data_dev(t, t_value);
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block$1.name,
    type: "else",
    source: "(25:74) {:else}",
    ctx: ctx
  });
  return block;
} // (21:10) {#if link.url}


function create_if_block_3$1(ctx) {
  var linkwithpreview;
  var current;
  linkwithpreview = new LinkWithPreview({
    props: {
      href:
      /*link*/
      ctx[5].url,
      descriptionUrl:
      /*link*/
      ctx[5].wikipedia,
      description:
      /*link*/
      ctx[5].description,
      $$slots: {
        default: [create_default_slot$2]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(linkwithpreview.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(linkwithpreview.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(linkwithpreview, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var linkwithpreview_changes = {};
      if (dirty &
      /*items*/
      1) linkwithpreview_changes.href =
      /*link*/
      ctx[5].url;
      if (dirty &
      /*items*/
      1) linkwithpreview_changes.descriptionUrl =
      /*link*/
      ctx[5].wikipedia;
      if (dirty &
      /*items*/
      1) linkwithpreview_changes.description =
      /*link*/
      ctx[5].description;

      if (dirty &
      /*$$scope, items*/
      257) {
        linkwithpreview_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      linkwithpreview.$set(linkwithpreview_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(linkwithpreview.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(linkwithpreview.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(linkwithpreview, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_3$1.name,
    type: "if",
    source: "(21:10) {#if link.url}",
    ctx: ctx
  });
  return block;
} // (22:12) <LinkWithPreview               href={link.url}               descriptionUrl={link.wikipedia}               description={link.description}>


function create_default_slot$2(ctx) {
  var t_value =
  /*link*/
  ctx[5].name + "";
  var t;
  var block = {
    c: function create() {
      t = text(t_value);
    },
    l: function claim(nodes) {
      t = claim_text(nodes, t_value);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*items*/
      1 && t_value !== (t_value =
      /*link*/
      ctx[5].name + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot$2.name,
    type: "slot",
    source: "(22:12) <LinkWithPreview               href={link.url}               descriptionUrl={link.wikipedia}               description={link.description}>",
    ctx: ctx
  });
  return block;
} // (25:97) {#if separator(idx, item.links)}


function create_if_block_2$1(ctx) {
  var t_value =
  /*separator*/
  ctx[1](
  /*idx*/
  ctx[7],
  /*item*/
  ctx[2].links) + "";
  var t;
  var block = {
    c: function create() {
      t = text(t_value);
    },
    l: function claim(nodes) {
      t = claim_text(nodes, t_value);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*items*/
      1 && t_value !== (t_value =
      /*separator*/
      ctx[1](
      /*idx*/
      ctx[7],
      /*item*/
      ctx[2].links) + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2$1.name,
    type: "if",
    source: "(25:97) {#if separator(idx, item.links)}",
    ctx: ctx
  });
  return block;
} // (20:8) {#each item.links as link, idx}


function create_each_block_1$1(ctx) {
  var current_block_type_index;
  var if_block0;
  var if_block0_anchor;
  var show_if =
  /*separator*/
  ctx[1](
  /*idx*/
  ctx[7],
  /*item*/
  ctx[2].links);
  var if_block1_anchor;
  var current;
  var if_block_creators = [create_if_block_3$1, create_else_block$1];
  var if_blocks = [];

  function select_block_type_1(ctx, dirty) {
    if (
    /*link*/
    ctx[5].url) return 0;
    return 1;
  }

  current_block_type_index = select_block_type_1(ctx);
  if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var if_block1 = show_if && create_if_block_2$1(ctx);
  var block = {
    c: function create() {
      if_block0.c();
      if_block0_anchor = empty();
      if (if_block1) if_block1.c();
      if_block1_anchor = empty();
    },
    l: function claim(nodes) {
      if_block0.l(nodes);
      if_block0_anchor = empty();
      if (if_block1) if_block1.l(nodes);
      if_block1_anchor = empty();
    },
    m: function mount(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert_dev(target, if_block0_anchor, anchor);
      if (if_block1) if_block1.m(target, anchor);
      insert_dev(target, if_block1_anchor, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_1(ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block0 = if_blocks[current_block_type_index];

        if (!if_block0) {
          if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block0.c();
        }

        transition_in(if_block0, 1);
        if_block0.m(if_block0_anchor.parentNode, if_block0_anchor);
      }

      if (dirty &
      /*items*/
      1) show_if =
      /*separator*/
      ctx[1](
      /*idx*/
      ctx[7],
      /*item*/
      ctx[2].links);

      if (show_if) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_2$1(ctx);
          if_block1.c();
          if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block0);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block0);
      current = false;
    },
    d: function destroy(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching) detach_dev(if_block0_anchor);
      if (if_block1) if_block1.d(detaching);
      if (detaching) detach_dev(if_block1_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_1$1.name,
    type: "each",
    source: "(20:8) {#each item.links as link, idx}",
    ctx: ctx
  });
  return block;
} // (28:6) {#if item.children}


function create_if_block$2(ctx) {
  var blocklist;
  var current;
  blocklist = new BlockList({
    props: {
      items:
      /*item*/
      ctx[2].children
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(blocklist.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(blocklist.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(blocklist, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var blocklist_changes = {};
      if (dirty &
      /*items*/
      1) blocklist_changes.items =
      /*item*/
      ctx[2].children;
      blocklist.$set(blocklist_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(blocklist.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(blocklist.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(blocklist, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$2.name,
    type: "if",
    source: "(28:6) {#if item.children}",
    ctx: ctx
  });
  return block;
} // (17:2) {#each items as item}


function create_each_block$1(ctx) {
  var li;
  var current_block_type_index;
  var if_block0;
  var t0;
  var t1;
  var current;
  var if_block_creators = [create_if_block_1$1, create_else_block_1$1];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*item*/
    ctx[2].links) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx);
  if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var if_block1 =
  /*item*/
  ctx[2].children && create_if_block$2(ctx);
  var block = {
    c: function create() {
      li = element("li");
      if_block0.c();
      t0 = space();
      if (if_block1) if_block1.c();
      t1 = space();
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {});
      var li_nodes = children(li);
      if_block0.l(li_nodes);
      t0 = claim_space(li_nodes);
      if (if_block1) if_block1.l(li_nodes);
      t1 = claim_space(li_nodes);
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(li, file$3, 17, 4, 708);
    },
    m: function mount(target, anchor) {
      insert_dev(target, li, anchor);
      if_blocks[current_block_type_index].m(li, null);
      append_dev(li, t0);
      if (if_block1) if_block1.m(li, null);
      append_dev(li, t1);
      current = true;
    },
    p: function update(ctx, dirty) {
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block0 = if_blocks[current_block_type_index];

        if (!if_block0) {
          if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block0.c();
        }

        transition_in(if_block0, 1);
        if_block0.m(li, t0);
      }

      if (
      /*item*/
      ctx[2].children) {
        if (if_block1) {
          if_block1.p(ctx, dirty);

          if (dirty &
          /*items*/
          1) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block$2(ctx);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(li, t1);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, function () {
          if_block1 = null;
        });
        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block0);
      transition_in(if_block1);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
      if_blocks[current_block_type_index].d();
      if (if_block1) if_block1.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block$1.name,
    type: "each",
    source: "(17:2) {#each items as item}",
    ctx: ctx
  });
  return block;
}

function create_fragment$4(ctx) {
  var ul;
  var current;
  var each_value =
  /*items*/
  ctx[0];
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  }

  var out = function out(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };

  var block = {
    c: function create() {
      ul = element("ul");

      for (var _i7 = 0; _i7 < each_blocks.length; _i7 += 1) {
        each_blocks[_i7].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      ul = claim_element(nodes, "UL", {
        class: true
      });
      var ul_nodes = children(ul);

      for (var _i8 = 0; _i8 < each_blocks.length; _i8 += 1) {
        each_blocks[_i8].l(ul_nodes);
      }

      ul_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(ul, "class", "plain-list svelte-bl411x");
      add_location(ul, file$3, 15, 0, 656);
    },
    m: function mount(target, anchor) {
      insert_dev(target, ul, anchor);

      for (var _i9 = 0; _i9 < each_blocks.length; _i9 += 1) {
        each_blocks[_i9].m(ul, null);
      }

      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*items, separator*/
      3) {
        each_value =
        /*items*/
        ctx[0];
        validate_each_argument(each_value);

        var _i10;

        for (_i10 = 0; _i10 < each_value.length; _i10 += 1) {
          var child_ctx = get_each_context$1(ctx, each_value, _i10);

          if (each_blocks[_i10]) {
            each_blocks[_i10].p(child_ctx, dirty);

            transition_in(each_blocks[_i10], 1);
          } else {
            each_blocks[_i10] = create_each_block$1(child_ctx);

            each_blocks[_i10].c();

            transition_in(each_blocks[_i10], 1);

            each_blocks[_i10].m(ul, null);
          }
        }

        group_outros();

        for (_i10 = each_value.length; _i10 < each_blocks.length; _i10 += 1) {
          out(_i10);
        }

        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;

      for (var _i11 = 0; _i11 < each_value.length; _i11 += 1) {
        transition_in(each_blocks[_i11]);
      }

      current = true;
    },
    o: function outro(local) {
      each_blocks = each_blocks.filter(Boolean);

      for (var _i12 = 0; _i12 < each_blocks.length; _i12 += 1) {
        transition_out(each_blocks[_i12]);
      }

      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(ul);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$4.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$4($$self, $$props, $$invalidate) {
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("BlockList", slots, []);
  var _$$props$items = $$props.items,
      items = _$$props$items === void 0 ? [] : _$$props$items;

  var separator = function separator(idx, list) {
    return idx < list.length - 1 ? ", " : "";
  };

  var writable_props = ["items"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<BlockList> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$$set = function ($$props) {
    if ("items" in $$props) $$invalidate(0, items = $$props.items);
  };

  $$self.$capture_state = function () {
    return {
      LinkWithPreview: LinkWithPreview,
      items: items,
      separator: separator
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("items" in $$props) $$invalidate(0, items = $$props.items);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [items, separator];
}

var BlockList = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(BlockList, _SvelteComponentDev);

  var _super = _createSuper$4(BlockList);

  function BlockList(options) {
    var _this;

    _classCallCheck(this, BlockList);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$4, create_fragment$4, safe_not_equal, {
      items: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "BlockList",
      options: options,
      id: create_fragment$4.name
    });
    return _this;
  }

  _createClass(BlockList, [{
    key: "items",
    get: function get() {
      throw new Error("<BlockList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<BlockList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return BlockList;
}(SvelteComponentDev);

function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$4 = "src/components/List/List.svelte"; // (17:0) {:else}

function create_else_block$2(ctx) {
  var blocklist;
  var current;
  blocklist = new BlockList({
    props: {
      items:
      /*formattedList*/
      ctx[1]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(blocklist.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(blocklist.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(blocklist, target, anchor);
      current = true;
    },
    p: noop,
    i: function intro(local) {
      if (current) return;
      transition_in(blocklist.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(blocklist.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(blocklist, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block$2.name,
    type: "else",
    source: "(17:0) {:else}",
    ctx: ctx
  });
  return block;
} // (13:0) {#if inline}


function create_if_block$3(ctx) {
  var div;
  var inlinelist;
  var current;
  inlinelist = new InlineList({
    props: {
      items:
      /*formattedList*/
      ctx[1]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      div = element("div");
      create_component(inlinelist.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      claim_component(inlinelist.$$.fragment, div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "plain-list-inline");
      add_location(div, file$4, 13, 2, 318);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      mount_component(inlinelist, div, null);
      current = true;
    },
    p: noop,
    i: function intro(local) {
      if (current) return;
      transition_in(inlinelist.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(inlinelist.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      destroy_component(inlinelist);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$3.name,
    type: "if",
    source: "(13:0) {#if inline}",
    ctx: ctx
  });
  return block;
}

function create_fragment$5(ctx) {
  var current_block_type_index;
  var if_block;
  var if_block_anchor;
  var current;
  var if_block_creators = [create_if_block$3, create_else_block$2];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*inline*/
    ctx[0]) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];

        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        }

        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$5.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$5($$self, $$props, $$invalidate) {
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("List", slots, []);
  var _$$props$items = $$props.items,
      items = _$$props$items === void 0 ? [] : _$$props$items;
  var _$$props$inline = $$props.inline,
      inline = _$$props$inline === void 0 ? false : _$$props$inline;
  var formattedList = items.map(function (x) {
    return {
      name: x.name || x,
      links: x.links,
      children: x.children
    };
  }).filter(function (x) {
    return x.name;
  });
  var writable_props = ["items", "inline"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<List> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$$set = function ($$props) {
    if ("items" in $$props) $$invalidate(2, items = $$props.items);
    if ("inline" in $$props) $$invalidate(0, inline = $$props.inline);
  };

  $$self.$capture_state = function () {
    return {
      InlineList: InlineList,
      BlockList: BlockList,
      items: items,
      inline: inline,
      formattedList: formattedList
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("items" in $$props) $$invalidate(2, items = $$props.items);
    if ("inline" in $$props) $$invalidate(0, inline = $$props.inline);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [inline, formattedList, items];
}

var List = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(List, _SvelteComponentDev);

  var _super = _createSuper$5(List);

  function List(options) {
    var _this;

    _classCallCheck(this, List);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$5, create_fragment$5, safe_not_equal, {
      items: 2,
      inline: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "List",
      options: options,
      id: create_fragment$5.name
    });
    return _this;
  }

  _createClass(List, [{
    key: "items",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "inline",
    get: function get() {
      throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return List;
}(SvelteComponentDev);

function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$5 = "src/components/ExperienceItem.svelte"; // (113:42) {:else}

function create_else_block$3(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text("present");
    },
    l: function claim(nodes) {
      t = claim_text(nodes, "present");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    p: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block$3.name,
    type: "else",
    source: "(113:42) {:else}",
    ctx: ctx
  });
  return block;
} // (113:6) {#if end.year}


function create_if_block_6(ctx) {
  var t0_value =
  /*end*/
  ctx[3].month + "";
  var t0;
  var t1;
  var t2_value =
  /*end*/
  ctx[3].year + "";
  var t2;
  var block = {
    c: function create() {
      t0 = text(t0_value);
      t1 = space();
      t2 = text(t2_value);
    },
    l: function claim(nodes) {
      t0 = claim_text(nodes, t0_value);
      t1 = claim_space(nodes);
      t2 = claim_text(nodes, t2_value);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, t1, anchor);
      insert_dev(target, t2, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*end*/
      8 && t0_value !== (t0_value =
      /*end*/
      ctx[3].month + "")) set_data_dev(t0, t0_value);
      if (dirty &
      /*end*/
      8 && t2_value !== (t2_value =
      /*end*/
      ctx[3].year + "")) set_data_dev(t2, t2_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(t1);
      if (detaching) detach_dev(t2);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_6.name,
    type: "if",
    source: "(113:6) {#if end.year}",
    ctx: ctx
  });
  return block;
} // (114:6) {#if duration}


function create_if_block_5(ctx) {
  var span;
  var t0;
  var t1;
  var t2;
  var block = {
    c: function create() {
      span = element("span");
      t0 = text("(");
      t1 = text(
      /*duration*/
      ctx[10]);
      t2 = text(")");
      this.h();
    },
    l: function claim(nodes) {
      span = claim_element(nodes, "SPAN", {
        class: true
      });
      var span_nodes = children(span);
      t0 = claim_text(span_nodes, "(");
      t1 = claim_text(span_nodes,
      /*duration*/
      ctx[10]);
      t2 = claim_text(span_nodes, ")");
      span_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span, "class", "duration svelte-8cgelk");
      add_location(span, file$5, 114, 8, 5679);
    },
    m: function mount(target, anchor) {
      insert_dev(target, span, anchor);
      append_dev(span, t0);
      append_dev(span, t1);
      append_dev(span, t2);
    },
    p: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(span);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_5.name,
    type: "if",
    source: "(114:6) {#if duration}",
    ctx: ctx
  });
  return block;
} // (117:6) {#if location}


function create_if_block_4(ctx) {
  var span;
  var t0;
  var t1;
  var t2;
  var block = {
    c: function create() {
      span = element("span");
      t0 = text("(");
      t1 = text(
      /*location*/
      ctx[4]);
      t2 = text(")");
      this.h();
    },
    l: function claim(nodes) {
      span = claim_element(nodes, "SPAN", {
        class: true
      });
      var span_nodes = children(span);
      t0 = claim_text(span_nodes, "(");
      t1 = claim_text(span_nodes,
      /*location*/
      ctx[4]);
      t2 = claim_text(span_nodes, ")");
      span_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span, "class", "location svelte-8cgelk");
      add_location(span, file$5, 117, 8, 5763);
    },
    m: function mount(target, anchor) {
      insert_dev(target, span, anchor);
      append_dev(span, t0);
      append_dev(span, t1);
      append_dev(span, t2);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*location*/
      16) set_data_dev(t1,
      /*location*/
      ctx[4]);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(span);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_4.name,
    type: "if",
    source: "(117:6) {#if location}",
    ctx: ctx
  });
  return block;
} // (123:6) {#if isDefunct}


function create_if_block_3$2(ctx) {
  var span;
  var t;
  var block = {
    c: function create() {
      span = element("span");
      t = text("(defunct)");
      this.h();
    },
    l: function claim(nodes) {
      span = claim_element(nodes, "SPAN", {
        class: true
      });
      var span_nodes = children(span);
      t = claim_text(span_nodes, "(defunct)");
      span_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span, "class", "defunct svelte-8cgelk");
      add_location(span, file$5, 123, 8, 5894);
    },
    m: function mount(target, anchor) {
      insert_dev(target, span, anchor);
      append_dev(span, t);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(span);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_3$2.name,
    type: "if",
    source: "(123:6) {#if isDefunct}",
    ctx: ctx
  });
  return block;
} // (129:6) {#if isContractor}


function create_if_block_2$2(ctx) {
  var span;
  var t;
  var block = {
    c: function create() {
      span = element("span");
      t = text("Contract");
      this.h();
    },
    l: function claim(nodes) {
      span = claim_element(nodes, "SPAN", {
        class: true
      });
      var span_nodes = children(span);
      t = claim_text(span_nodes, "Contract");
      span_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span, "class", "type svelte-8cgelk");
      add_location(span, file$5, 129, 8, 6024);
    },
    m: function mount(target, anchor) {
      insert_dev(target, span, anchor);
      append_dev(span, t);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(span);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2$2.name,
    type: "if",
    source: "(129:6) {#if isContractor}",
    ctx: ctx
  });
  return block;
} // (134:2) {#if description}


function create_if_block_1$2(ctx) {
  var div;
  var block = {
    c: function create() {
      div = element("div");
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "description svelte-8cgelk");
      add_location(div, file$5, 134, 4, 6118);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      div.innerHTML =
      /*description*/
      ctx[1];
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*description*/
      2) div.innerHTML =
      /*description*/
      ctx[1];
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$2.name,
    type: "if",
    source: "(134:2) {#if description}",
    ctx: ctx
  });
  return block;
} // (139:2) {#if technologies.length}


function create_if_block$4(ctx) {
  var footer;
  var h4;
  var t0;
  var t1;
  var list;
  var current;
  list = new List({
    props: {
      items:
      /*technologies*/
      ctx[8],
      inline: true
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      footer = element("footer");
      h4 = element("h4");
      t0 = text("Technologies & tools");
      t1 = space();
      create_component(list.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      footer = claim_element(nodes, "FOOTER", {
        class: true
      });
      var footer_nodes = children(footer);
      h4 = claim_element(footer_nodes, "H4", {
        class: true
      });
      var h4_nodes = children(h4);
      t0 = claim_text(h4_nodes, "Technologies & tools");
      h4_nodes.forEach(detach_dev);
      t1 = claim_space(footer_nodes);
      claim_component(list.$$.fragment, footer_nodes);
      footer_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h4, "class", "svelte-8cgelk");
      add_location(h4, file$5, 140, 6, 6236);
      attr_dev(footer, "class", "svelte-8cgelk");
      add_location(footer, file$5, 139, 4, 6221);
    },
    m: function mount(target, anchor) {
      insert_dev(target, footer, anchor);
      append_dev(footer, h4);
      append_dev(h4, t0);
      append_dev(footer, t1);
      mount_component(list, footer, null);
      current = true;
    },
    p: function update(ctx, dirty) {
      var list_changes = {};
      if (dirty &
      /*technologies*/
      256) list_changes.items =
      /*technologies*/
      ctx[8];
      list.$set(list_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(list.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(list.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(footer);
      destroy_component(list);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$4.name,
    type: "if",
    source: "(139:2) {#if technologies.length}",
    ctx: ctx
  });
  return block;
}

function create_fragment$6(ctx) {
  var div2;
  var header;
  var div0;
  var t0_value =
  /*start*/
  ctx[2].month + "";
  var t0;
  var t1;
  var t2_value =
  /*start*/
  ctx[2].year + "";
  var t2;
  var t3;
  var t4;
  var t5;
  var t6;
  var h3;
  var t7;
  var t8;
  var t9;
  var div1;
  var t10;
  var t11;
  var t12;
  var t13;
  var current;

  function select_block_type(ctx, dirty) {
    if (
    /*end*/
    ctx[3].year) return create_if_block_6;
    return create_else_block$3;
  }

  var current_block_type = select_block_type(ctx);
  var if_block0 = current_block_type(ctx);
  var if_block1 =
  /*duration*/
  ctx[10] && create_if_block_5(ctx);
  var if_block2 =
  /*location*/
  ctx[4] && create_if_block_4(ctx);
  var if_block3 =
  /*isDefunct*/
  ctx[6] && create_if_block_3$2(ctx);
  var if_block4 =
  /*isContractor*/
  ctx[7] && create_if_block_2$2(ctx);
  var if_block5 =
  /*description*/
  ctx[1] && create_if_block_1$2(ctx);
  var if_block6 =
  /*technologies*/
  ctx[8].length && create_if_block$4(ctx);
  var block = {
    c: function create() {
      div2 = element("div");
      header = element("header");
      div0 = element("div");
      t0 = text(t0_value);
      t1 = space();
      t2 = text(t2_value);
      t3 = text(" -\n      ");
      if_block0.c();
      t4 = space();
      if (if_block1) if_block1.c();
      t5 = space();
      if (if_block2) if_block2.c();
      t6 = space();
      h3 = element("h3");
      t7 = text(
      /*name*/
      ctx[0]);
      t8 = space();
      if (if_block3) if_block3.c();
      t9 = space();
      div1 = element("div");
      t10 = text(
      /*role*/
      ctx[5]);
      t11 = space();
      if (if_block4) if_block4.c();
      t12 = space();
      if (if_block5) if_block5.c();
      t13 = space();
      if (if_block6) if_block6.c();
      this.h();
    },
    l: function claim(nodes) {
      div2 = claim_element(nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      header = claim_element(div2_nodes, "HEADER", {
        class: true
      });
      var header_nodes = children(header);
      div0 = claim_element(header_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      t0 = claim_text(div0_nodes, t0_value);
      t1 = claim_space(div0_nodes);
      t2 = claim_text(div0_nodes, t2_value);
      t3 = claim_text(div0_nodes, " -\n      ");
      if_block0.l(div0_nodes);
      t4 = claim_space(div0_nodes);
      if (if_block1) if_block1.l(div0_nodes);
      t5 = claim_space(div0_nodes);
      if (if_block2) if_block2.l(div0_nodes);
      div0_nodes.forEach(detach_dev);
      t6 = claim_space(header_nodes);
      h3 = claim_element(header_nodes, "H3", {
        class: true
      });
      var h3_nodes = children(h3);
      t7 = claim_text(h3_nodes,
      /*name*/
      ctx[0]);
      t8 = claim_space(h3_nodes);
      if (if_block3) if_block3.l(h3_nodes);
      h3_nodes.forEach(detach_dev);
      t9 = claim_space(header_nodes);
      div1 = claim_element(header_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      t10 = claim_text(div1_nodes,
      /*role*/
      ctx[5]);
      t11 = claim_space(div1_nodes);
      if (if_block4) if_block4.l(div1_nodes);
      div1_nodes.forEach(detach_dev);
      header_nodes.forEach(detach_dev);
      t12 = claim_space(div2_nodes);
      if (if_block5) if_block5.l(div2_nodes);
      t13 = claim_space(div2_nodes);
      if (if_block6) if_block6.l(div2_nodes);
      div2_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div0, "class", "period svelte-8cgelk");
      add_location(div0, file$5, 110, 4, 5532);
      attr_dev(h3, "class", "name svelte-8cgelk");
      add_location(h3, file$5, 120, 4, 5833);
      attr_dev(div1, "class", "role svelte-8cgelk");
      add_location(div1, file$5, 126, 4, 5959);
      attr_dev(header, "class", "svelte-8cgelk");
      add_location(header, file$5, 109, 2, 5519);
      attr_dev(div2, "class", "experience-item divided svelte-8cgelk");
      toggle_class(div2, "u-print-hidden",
      /*shouldHideFromPrint*/
      ctx[9]());
      add_location(div2, file$5, 106, 0, 5430);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div2, anchor);
      append_dev(div2, header);
      append_dev(header, div0);
      append_dev(div0, t0);
      append_dev(div0, t1);
      append_dev(div0, t2);
      append_dev(div0, t3);
      if_block0.m(div0, null);
      append_dev(div0, t4);
      if (if_block1) if_block1.m(div0, null);
      append_dev(div0, t5);
      if (if_block2) if_block2.m(div0, null);
      append_dev(header, t6);
      append_dev(header, h3);
      append_dev(h3, t7);
      append_dev(h3, t8);
      if (if_block3) if_block3.m(h3, null);
      append_dev(header, t9);
      append_dev(header, div1);
      append_dev(div1, t10);
      append_dev(div1, t11);
      if (if_block4) if_block4.m(div1, null);
      append_dev(div2, t12);
      if (if_block5) if_block5.m(div2, null);
      append_dev(div2, t13);
      if (if_block6) if_block6.m(div2, null);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if ((!current || dirty &
      /*start*/
      4) && t0_value !== (t0_value =
      /*start*/
      ctx[2].month + "")) set_data_dev(t0, t0_value);
      if ((!current || dirty &
      /*start*/
      4) && t2_value !== (t2_value =
      /*start*/
      ctx[2].year + "")) set_data_dev(t2, t2_value);

      if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
        if_block0.p(ctx, dirty);
      } else {
        if_block0.d(1);
        if_block0 = current_block_type(ctx);

        if (if_block0) {
          if_block0.c();
          if_block0.m(div0, t4);
        }
      }

      if (
      /*duration*/
      ctx[10]) if_block1.p(ctx, dirty);

      if (
      /*location*/
      ctx[4]) {
        if (if_block2) {
          if_block2.p(ctx, dirty);
        } else {
          if_block2 = create_if_block_4(ctx);
          if_block2.c();
          if_block2.m(div0, null);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }

      if (!current || dirty &
      /*name*/
      1) set_data_dev(t7,
      /*name*/
      ctx[0]);

      if (
      /*isDefunct*/
      ctx[6]) {
        if (if_block3) ; else {
          if_block3 = create_if_block_3$2(ctx);
          if_block3.c();
          if_block3.m(h3, null);
        }
      } else if (if_block3) {
        if_block3.d(1);
        if_block3 = null;
      }

      if (!current || dirty &
      /*role*/
      32) set_data_dev(t10,
      /*role*/
      ctx[5]);

      if (
      /*isContractor*/
      ctx[7]) {
        if (if_block4) ; else {
          if_block4 = create_if_block_2$2(ctx);
          if_block4.c();
          if_block4.m(div1, null);
        }
      } else if (if_block4) {
        if_block4.d(1);
        if_block4 = null;
      }

      if (
      /*description*/
      ctx[1]) {
        if (if_block5) {
          if_block5.p(ctx, dirty);
        } else {
          if_block5 = create_if_block_1$2(ctx);
          if_block5.c();
          if_block5.m(div2, t13);
        }
      } else if (if_block5) {
        if_block5.d(1);
        if_block5 = null;
      }

      if (
      /*technologies*/
      ctx[8].length) {
        if (if_block6) {
          if_block6.p(ctx, dirty);

          if (dirty &
          /*technologies*/
          256) {
            transition_in(if_block6, 1);
          }
        } else {
          if_block6 = create_if_block$4(ctx);
          if_block6.c();
          transition_in(if_block6, 1);
          if_block6.m(div2, null);
        }
      } else if (if_block6) {
        group_outros();
        transition_out(if_block6, 1, 1, function () {
          if_block6 = null;
        });
        check_outros();
      }

      if (dirty &
      /*shouldHideFromPrint*/
      512) {
        toggle_class(div2, "u-print-hidden",
        /*shouldHideFromPrint*/
        ctx[9]());
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block6);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block6);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div2);
      if_block0.d();
      if (if_block1) if_block1.d();
      if (if_block2) if_block2.d();
      if (if_block3) if_block3.d();
      if (if_block4) if_block4.d();
      if (if_block5) if_block5.d();
      if (if_block6) if_block6.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$6.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

var PRINT_TRUNCATE_NUMBER_OF_YEARS = 4;

function instance$6($$self, $$props, $$invalidate) {
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("ExperienceItem", slots, []);

  function shouldHideFromPrint() {
    var itemStartYear = parseInt(end.year);
    var yearsAgo = new Date().getFullYear() - PRINT_TRUNCATE_NUMBER_OF_YEARS;
    return itemStartYear < yearsAgo;
  }

  var name = $$props.name;
  var _$$props$description = $$props.description,
      description = _$$props$description === void 0 ? null : _$$props$description;
  var _$$props$start = $$props.start,
      start = _$$props$start === void 0 ? {} : _$$props$start;
  var _$$props$end = $$props.end,
      end = _$$props$end === void 0 ? {} : _$$props$end;
  var _$$props$location = $$props.location,
      location = _$$props$location === void 0 ? null : _$$props$location;
  var _$$props$role = $$props.role,
      role = _$$props$role === void 0 ? "" : _$$props$role;
  var _$$props$isDefunct = $$props.isDefunct,
      isDefunct = _$$props$isDefunct === void 0 ? false : _$$props$isDefunct;
  var _$$props$isContractor = $$props.isContractor,
      isContractor = _$$props$isContractor === void 0 ? false : _$$props$isContractor;
  var _$$props$technologies = $$props.technologies,
      technologies = _$$props$technologies === void 0 ? [] : _$$props$technologies;
  var duration = periodDuration(start, end);
  var writable_props = ["name", "description", "start", "end", "location", "role", "isDefunct", "isContractor", "technologies"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<ExperienceItem> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$$set = function ($$props) {
    if ("name" in $$props) $$invalidate(0, name = $$props.name);
    if ("description" in $$props) $$invalidate(1, description = $$props.description);
    if ("start" in $$props) $$invalidate(2, start = $$props.start);
    if ("end" in $$props) $$invalidate(3, end = $$props.end);
    if ("location" in $$props) $$invalidate(4, location = $$props.location);
    if ("role" in $$props) $$invalidate(5, role = $$props.role);
    if ("isDefunct" in $$props) $$invalidate(6, isDefunct = $$props.isDefunct);
    if ("isContractor" in $$props) $$invalidate(7, isContractor = $$props.isContractor);
    if ("technologies" in $$props) $$invalidate(8, technologies = $$props.technologies);
  };

  $$self.$capture_state = function () {
    return {
      List: List,
      periodDuration: periodDuration,
      PRINT_TRUNCATE_NUMBER_OF_YEARS: PRINT_TRUNCATE_NUMBER_OF_YEARS,
      shouldHideFromPrint: shouldHideFromPrint,
      name: name,
      description: description,
      start: start,
      end: end,
      location: location,
      role: role,
      isDefunct: isDefunct,
      isContractor: isContractor,
      technologies: technologies,
      duration: duration
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("name" in $$props) $$invalidate(0, name = $$props.name);
    if ("description" in $$props) $$invalidate(1, description = $$props.description);
    if ("start" in $$props) $$invalidate(2, start = $$props.start);
    if ("end" in $$props) $$invalidate(3, end = $$props.end);
    if ("location" in $$props) $$invalidate(4, location = $$props.location);
    if ("role" in $$props) $$invalidate(5, role = $$props.role);
    if ("isDefunct" in $$props) $$invalidate(6, isDefunct = $$props.isDefunct);
    if ("isContractor" in $$props) $$invalidate(7, isContractor = $$props.isContractor);
    if ("technologies" in $$props) $$invalidate(8, technologies = $$props.technologies);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [name, description, start, end, location, role, isDefunct, isContractor, technologies, shouldHideFromPrint, duration];
}

var ExperienceItem = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(ExperienceItem, _SvelteComponentDev);

  var _super = _createSuper$6(ExperienceItem);

  function ExperienceItem(options) {
    var _this;

    _classCallCheck(this, ExperienceItem);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$6, create_fragment$6, safe_not_equal, {
      name: 0,
      description: 1,
      start: 2,
      end: 3,
      location: 4,
      role: 5,
      isDefunct: 6,
      isContractor: 7,
      technologies: 8
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "ExperienceItem",
      options: options,
      id: create_fragment$6.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*name*/
    ctx[0] === undefined && !("name" in props)) {
      console.warn("<ExperienceItem> was created without expected prop 'name'");
    }

    return _this;
  }

  _createClass(ExperienceItem, [{
    key: "name",
    get: function get() {
      throw new Error("<ExperienceItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ExperienceItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "description",
    get: function get() {
      throw new Error("<ExperienceItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ExperienceItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "start",
    get: function get() {
      throw new Error("<ExperienceItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ExperienceItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "end",
    get: function get() {
      throw new Error("<ExperienceItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ExperienceItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "location",
    get: function get() {
      throw new Error("<ExperienceItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ExperienceItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "role",
    get: function get() {
      throw new Error("<ExperienceItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ExperienceItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isDefunct",
    get: function get() {
      throw new Error("<ExperienceItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ExperienceItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "isContractor",
    get: function get() {
      throw new Error("<ExperienceItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ExperienceItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "technologies",
    get: function get() {
      throw new Error("<ExperienceItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ExperienceItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return ExperienceItem;
}(SvelteComponentDev);

function _createSuper$7(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$7(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$6 = "node_modules/svelte-icons/fa/FaGithub.svelte"; // (4:8) <IconBase viewBox="0 0 496 512" {...$$props}>

function create_default_slot$3(ctx) {
  var path;
  var block = {
    c: function create() {
      path = svg_element("path");
      this.h();
    },
    l: function claim(nodes) {
      path = claim_element(nodes, "path", {
        d: true
      }, 1);
      children(path).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(path, "d", "M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z");
      add_location(path, file$6, 4, 10, 153);
    },
    m: function mount(target, anchor) {
      insert_dev(target, path, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(path);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot$3.name,
    type: "slot",
    source: "(4:8) <IconBase viewBox=\\\"0 0 496 512\\\" {...$$props}>",
    ctx: ctx
  });
  return block;
}

function create_fragment$7(ctx) {
  var iconbase;
  var current;
  var iconbase_spread_levels = [{
    viewBox: "0 0 496 512"
  },
  /*$$props*/
  ctx[0]];
  var iconbase_props = {
    $$slots: {
      default: [create_default_slot$3]
    },
    $$scope: {
      ctx: ctx
    }
  };

  for (var i = 0; i < iconbase_spread_levels.length; i += 1) {
    iconbase_props = assign(iconbase_props, iconbase_spread_levels[i]);
  }

  iconbase = new IconBase({
    props: iconbase_props,
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(iconbase.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(iconbase.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(iconbase, target, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var iconbase_changes = dirty &
      /*$$props*/
      1 ? get_spread_update(iconbase_spread_levels, [iconbase_spread_levels[0], get_spread_object(
      /*$$props*/
      ctx[0])]) : {};

      if (dirty &
      /*$$scope*/
      2) {
        iconbase_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      iconbase.$set(iconbase_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(iconbase.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(iconbase.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(iconbase, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$7.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$7($$self, $$props, $$invalidate) {
  var _$$props = $$props,
      _$$props$$$slots = _$$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = _$$props.$$scope;
  validate_slots("FaGithub", slots, []);

  $$self.$$set = function ($$new_props) {
    $$invalidate(0, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
  };

  $$self.$capture_state = function () {
    return {
      IconBase: IconBase
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(0, $$props = assign(assign({}, $$props), $$new_props));
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$props = exclude_internal_props($$props);
  return [$$props];
}

var FaGithub = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(FaGithub, _SvelteComponentDev);

  var _super = _createSuper$7(FaGithub);

  function FaGithub(options) {
    var _this;

    _classCallCheck(this, FaGithub);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$7, create_fragment$7, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "FaGithub",
      options: options,
      id: create_fragment$7.name
    });
    return _this;
  }

  return FaGithub;
}(SvelteComponentDev);

function _createSuper$8(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$8(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$7 = "node_modules/svelte-icons/fa/FaLinkedin.svelte"; // (4:8) <IconBase viewBox="0 0 448 512" {...$$props}>

function create_default_slot$4(ctx) {
  var path;
  var block = {
    c: function create() {
      path = svg_element("path");
      this.h();
    },
    l: function claim(nodes) {
      path = claim_element(nodes, "path", {
        d: true
      }, 1);
      children(path).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(path, "d", "M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z");
      add_location(path, file$7, 4, 10, 153);
    },
    m: function mount(target, anchor) {
      insert_dev(target, path, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(path);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot$4.name,
    type: "slot",
    source: "(4:8) <IconBase viewBox=\\\"0 0 448 512\\\" {...$$props}>",
    ctx: ctx
  });
  return block;
}

function create_fragment$8(ctx) {
  var iconbase;
  var current;
  var iconbase_spread_levels = [{
    viewBox: "0 0 448 512"
  },
  /*$$props*/
  ctx[0]];
  var iconbase_props = {
    $$slots: {
      default: [create_default_slot$4]
    },
    $$scope: {
      ctx: ctx
    }
  };

  for (var i = 0; i < iconbase_spread_levels.length; i += 1) {
    iconbase_props = assign(iconbase_props, iconbase_spread_levels[i]);
  }

  iconbase = new IconBase({
    props: iconbase_props,
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(iconbase.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(iconbase.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(iconbase, target, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var iconbase_changes = dirty &
      /*$$props*/
      1 ? get_spread_update(iconbase_spread_levels, [iconbase_spread_levels[0], get_spread_object(
      /*$$props*/
      ctx[0])]) : {};

      if (dirty &
      /*$$scope*/
      2) {
        iconbase_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      iconbase.$set(iconbase_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(iconbase.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(iconbase.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(iconbase, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$8.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$8($$self, $$props, $$invalidate) {
  var _$$props = $$props,
      _$$props$$$slots = _$$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = _$$props.$$scope;
  validate_slots("FaLinkedin", slots, []);

  $$self.$$set = function ($$new_props) {
    $$invalidate(0, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
  };

  $$self.$capture_state = function () {
    return {
      IconBase: IconBase
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(0, $$props = assign(assign({}, $$props), $$new_props));
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$props = exclude_internal_props($$props);
  return [$$props];
}

var FaLinkedin = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(FaLinkedin, _SvelteComponentDev);

  var _super = _createSuper$8(FaLinkedin);

  function FaLinkedin(options) {
    var _this;

    _classCallCheck(this, FaLinkedin);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$8, create_fragment$8, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "FaLinkedin",
      options: options,
      id: create_fragment$8.name
    });
    return _this;
  }

  return FaLinkedin;
}(SvelteComponentDev);

function _createSuper$9(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$9(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$9() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$8 = "node_modules/svelte-icons/fa/FaTwitter.svelte"; // (4:8) <IconBase viewBox="0 0 512 512" {...$$props}>

function create_default_slot$5(ctx) {
  var path;
  var block = {
    c: function create() {
      path = svg_element("path");
      this.h();
    },
    l: function claim(nodes) {
      path = claim_element(nodes, "path", {
        d: true
      }, 1);
      children(path).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(path, "d", "M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z");
      add_location(path, file$8, 4, 10, 153);
    },
    m: function mount(target, anchor) {
      insert_dev(target, path, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(path);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot$5.name,
    type: "slot",
    source: "(4:8) <IconBase viewBox=\\\"0 0 512 512\\\" {...$$props}>",
    ctx: ctx
  });
  return block;
}

function create_fragment$9(ctx) {
  var iconbase;
  var current;
  var iconbase_spread_levels = [{
    viewBox: "0 0 512 512"
  },
  /*$$props*/
  ctx[0]];
  var iconbase_props = {
    $$slots: {
      default: [create_default_slot$5]
    },
    $$scope: {
      ctx: ctx
    }
  };

  for (var i = 0; i < iconbase_spread_levels.length; i += 1) {
    iconbase_props = assign(iconbase_props, iconbase_spread_levels[i]);
  }

  iconbase = new IconBase({
    props: iconbase_props,
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(iconbase.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(iconbase.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(iconbase, target, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var iconbase_changes = dirty &
      /*$$props*/
      1 ? get_spread_update(iconbase_spread_levels, [iconbase_spread_levels[0], get_spread_object(
      /*$$props*/
      ctx[0])]) : {};

      if (dirty &
      /*$$scope*/
      2) {
        iconbase_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      iconbase.$set(iconbase_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(iconbase.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(iconbase.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(iconbase, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$9.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$9($$self, $$props, $$invalidate) {
  var _$$props = $$props,
      _$$props$$$slots = _$$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = _$$props.$$scope;
  validate_slots("FaTwitter", slots, []);

  $$self.$$set = function ($$new_props) {
    $$invalidate(0, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
  };

  $$self.$capture_state = function () {
    return {
      IconBase: IconBase
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(0, $$props = assign(assign({}, $$props), $$new_props));
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$props = exclude_internal_props($$props);
  return [$$props];
}

var FaTwitter = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(FaTwitter, _SvelteComponentDev);

  var _super = _createSuper$9(FaTwitter);

  function FaTwitter(options) {
    var _this;

    _classCallCheck(this, FaTwitter);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$9, create_fragment$9, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "FaTwitter",
      options: options,
      id: create_fragment$9.name
    });
    return _this;
  }

  return FaTwitter;
}(SvelteComponentDev);

function _createSuper$a(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$a(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$a() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$9 = "node_modules/svelte-icons/fa/FaFilePdf.svelte"; // (4:8) <IconBase viewBox="0 0 384 512" {...$$props}>

function create_default_slot$6(ctx) {
  var path;
  var block = {
    c: function create() {
      path = svg_element("path");
      this.h();
    },
    l: function claim(nodes) {
      path = claim_element(nodes, "path", {
        d: true
      }, 1);
      children(path).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(path, "d", "M181.9 256.1c-5-16-4.9-46.9-2-46.9 8.4 0 7.6 36.9 2 46.9zm-1.7 47.2c-7.7 20.2-17.3 43.3-28.4 62.7 18.3-7 39-17.2 62.9-21.9-12.7-9.6-24.9-23.4-34.5-40.8zM86.1 428.1c0 .8 13.2-5.4 34.9-40.2-6.7 6.3-29.1 24.5-34.9 40.2zM248 160h136v328c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V24C0 10.7 10.7 0 24 0h200v136c0 13.2 10.8 24 24 24zm-8 171.8c-20-12.2-33.3-29-42.7-53.8 4.5-18.5 11.6-46.6 6.2-64.2-4.7-29.4-42.4-26.5-47.8-6.8-5 18.3-.4 44.1 8.1 77-11.6 27.6-28.7 64.6-40.8 85.8-.1 0-.1.1-.2.1-27.1 13.9-73.6 44.5-54.5 68 5.6 6.9 16 10 21.5 10 17.9 0 35.7-18 61.1-61.8 25.8-8.5 54.1-19.1 79-23.2 21.7 11.8 47.1 19.5 64 19.5 29.2 0 31.2-32 19.7-43.4-13.9-13.6-54.3-9.7-73.6-7.2zM377 105L279 7c-4.5-4.5-10.6-7-17-7h-6v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-74.1 255.3c4.1-2.7-2.5-11.9-42.8-9 37.1 15.8 42.8 9 42.8 9z");
      add_location(path, file$9, 4, 10, 153);
    },
    m: function mount(target, anchor) {
      insert_dev(target, path, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(path);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot$6.name,
    type: "slot",
    source: "(4:8) <IconBase viewBox=\\\"0 0 384 512\\\" {...$$props}>",
    ctx: ctx
  });
  return block;
}

function create_fragment$a(ctx) {
  var iconbase;
  var current;
  var iconbase_spread_levels = [{
    viewBox: "0 0 384 512"
  },
  /*$$props*/
  ctx[0]];
  var iconbase_props = {
    $$slots: {
      default: [create_default_slot$6]
    },
    $$scope: {
      ctx: ctx
    }
  };

  for (var i = 0; i < iconbase_spread_levels.length; i += 1) {
    iconbase_props = assign(iconbase_props, iconbase_spread_levels[i]);
  }

  iconbase = new IconBase({
    props: iconbase_props,
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(iconbase.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(iconbase.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(iconbase, target, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var iconbase_changes = dirty &
      /*$$props*/
      1 ? get_spread_update(iconbase_spread_levels, [iconbase_spread_levels[0], get_spread_object(
      /*$$props*/
      ctx[0])]) : {};

      if (dirty &
      /*$$scope*/
      2) {
        iconbase_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      iconbase.$set(iconbase_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(iconbase.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(iconbase.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(iconbase, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$a.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$a($$self, $$props, $$invalidate) {
  var _$$props = $$props,
      _$$props$$$slots = _$$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = _$$props.$$scope;
  validate_slots("FaFilePdf", slots, []);

  $$self.$$set = function ($$new_props) {
    $$invalidate(0, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
  };

  $$self.$capture_state = function () {
    return {
      IconBase: IconBase
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(0, $$props = assign(assign({}, $$props), $$new_props));
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$props = exclude_internal_props($$props);
  return [$$props];
}

var FaFilePdf = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(FaFilePdf, _SvelteComponentDev);

  var _super = _createSuper$a(FaFilePdf);

  function FaFilePdf(options) {
    var _this;

    _classCallCheck(this, FaFilePdf);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$a, create_fragment$a, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "FaFilePdf",
      options: options,
      id: create_fragment$a.name
    });
    return _this;
  }

  return FaFilePdf;
}(SvelteComponentDev);

function _createSuper$b(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$b(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$b() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Object_1$1 = globals.Object;
var file$a = "src/components/Summary.svelte";

function get_each_context$2(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[10] = list[i][0];
  child_ctx[8] = list[i][1];
  return child_ctx;
}

function get_each_context_1$2(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[13] = list[i];
  return child_ctx;
} // (275:2) {#if coreSkills || currentInterests}


function create_if_block_4$1(ctx) {
  var div;
  var t;
  var current;
  var if_block0 =
  /*coreSkills*/
  ctx[4] && create_if_block_6$1(ctx);
  var if_block1 =
  /*currentInterests*/
  ctx[5] && create_if_block_5$1(ctx);
  var block = {
    c: function create() {
      div = element("div");
      if (if_block0) if_block0.c();
      t = space();
      if (if_block1) if_block1.c();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      if (if_block0) if_block0.l(div_nodes);
      t = claim_space(div_nodes);
      if (if_block1) if_block1.l(div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "skill-set svelte-aanufo");
      add_location(div, file$a, 275, 4, 12805);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      if (if_block0) if_block0.m(div, null);
      append_dev(div, t);
      if (if_block1) if_block1.m(div, null);
      current = true;
    },
    p: function update(ctx, dirty) {
      if (
      /*coreSkills*/
      ctx[4]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);

          if (dirty &
          /*coreSkills*/
          16) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_6$1(ctx);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(div, t);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, function () {
          if_block0 = null;
        });
        check_outros();
      }

      if (
      /*currentInterests*/
      ctx[5]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);

          if (dirty &
          /*currentInterests*/
          32) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_5$1(ctx);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, function () {
          if_block1 = null;
        });
        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block0);
      transition_in(if_block1);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_4$1.name,
    type: "if",
    source: "(275:2) {#if coreSkills || currentInterests}",
    ctx: ctx
  });
  return block;
} // (277:6) {#if coreSkills}


function create_if_block_6$1(ctx) {
  var section;
  var h3;
  var t0;
  var t1;
  var list;
  var current;
  list = new List({
    props: {
      items:
      /*coreSkills*/
      ctx[4]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      section = element("section");
      h3 = element("h3");
      t0 = text("Core skills");
      t1 = space();
      create_component(list.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      section = claim_element(nodes, "SECTION", {
        class: true
      });
      var section_nodes = children(section);
      h3 = claim_element(section_nodes, "H3", {
        class: true
      });
      var h3_nodes = children(h3);
      t0 = claim_text(h3_nodes, "Core skills");
      h3_nodes.forEach(detach_dev);
      t1 = claim_space(section_nodes);
      claim_component(list.$$.fragment, section_nodes);
      section_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h3, "class", "svelte-aanufo");
      add_location(h3, file$a, 278, 10, 12880);
      attr_dev(section, "class", "svelte-aanufo");
      add_location(section, file$a, 277, 8, 12860);
    },
    m: function mount(target, anchor) {
      insert_dev(target, section, anchor);
      append_dev(section, h3);
      append_dev(h3, t0);
      append_dev(section, t1);
      mount_component(list, section, null);
      current = true;
    },
    p: function update(ctx, dirty) {
      var list_changes = {};
      if (dirty &
      /*coreSkills*/
      16) list_changes.items =
      /*coreSkills*/
      ctx[4];
      list.$set(list_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(list.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(list.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(section);
      destroy_component(list);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_6$1.name,
    type: "if",
    source: "(277:6) {#if coreSkills}",
    ctx: ctx
  });
  return block;
} // (283:6) {#if currentInterests}


function create_if_block_5$1(ctx) {
  var section;
  var h3;
  var t0;
  var t1;
  var list;
  var current;
  list = new List({
    props: {
      items:
      /*currentInterests*/
      ctx[5]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      section = element("section");
      h3 = element("h3");
      t0 = text("Current interests");
      t1 = space();
      create_component(list.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      section = claim_element(nodes, "SECTION", {
        class: true
      });
      var section_nodes = children(section);
      h3 = claim_element(section_nodes, "H3", {
        class: true
      });
      var h3_nodes = children(h3);
      t0 = claim_text(h3_nodes, "Current interests");
      h3_nodes.forEach(detach_dev);
      t1 = claim_space(section_nodes);
      claim_component(list.$$.fragment, section_nodes);
      section_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h3, "class", "svelte-aanufo");
      add_location(h3, file$a, 284, 10, 13027);
      attr_dev(section, "class", "svelte-aanufo");
      add_location(section, file$a, 283, 8, 13007);
    },
    m: function mount(target, anchor) {
      insert_dev(target, section, anchor);
      append_dev(section, h3);
      append_dev(h3, t0);
      append_dev(section, t1);
      mount_component(list, section, null);
      current = true;
    },
    p: function update(ctx, dirty) {
      var list_changes = {};
      if (dirty &
      /*currentInterests*/
      32) list_changes.items =
      /*currentInterests*/
      ctx[5];
      list.$set(list_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(list.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(list.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(section);
      destroy_component(list);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_5$1.name,
    type: "if",
    source: "(283:6) {#if currentInterests}",
    ctx: ctx
  });
  return block;
} // (291:2) {#if social || pdfLink}


function create_if_block$5(ctx) {
  var hr;
  var t0;
  var footer;
  var div;
  var t1;
  var t2;
  var current;
  var if_block0 =
  /*social*/
  ctx[3] && create_if_block_3$3(ctx);
  var if_block1 =
  /*pdfLink*/
  ctx[6] && create_if_block_2$3(ctx);
  var if_block2 =
  /*contact*/
  ctx[2] && create_if_block_1$3(ctx);
  var block = {
    c: function create() {
      hr = element("hr");
      t0 = space();
      footer = element("footer");
      div = element("div");
      if (if_block0) if_block0.c();
      t1 = space();
      if (if_block1) if_block1.c();
      t2 = space();
      if (if_block2) if_block2.c();
      this.h();
    },
    l: function claim(nodes) {
      hr = claim_element(nodes, "HR", {
        class: true
      });
      t0 = claim_space(nodes);
      footer = claim_element(nodes, "FOOTER", {
        class: true
      });
      var footer_nodes = children(footer);
      div = claim_element(footer_nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      if (if_block0) if_block0.l(div_nodes);
      t1 = claim_space(div_nodes);
      if (if_block1) if_block1.l(div_nodes);
      div_nodes.forEach(detach_dev);
      t2 = claim_space(footer_nodes);
      if (if_block2) if_block2.l(footer_nodes);
      footer_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(hr, "class", "svelte-aanufo");
      add_location(hr, file$a, 291, 4, 13178);
      attr_dev(div, "class", "footer-layout svelte-aanufo");
      add_location(div, file$a, 293, 6, 13202);
      attr_dev(footer, "class", "svelte-aanufo");
      add_location(footer, file$a, 292, 4, 13187);
    },
    m: function mount(target, anchor) {
      insert_dev(target, hr, anchor);
      insert_dev(target, t0, anchor);
      insert_dev(target, footer, anchor);
      append_dev(footer, div);
      if (if_block0) if_block0.m(div, null);
      append_dev(div, t1);
      if (if_block1) if_block1.m(div, null);
      append_dev(footer, t2);
      if (if_block2) if_block2.m(footer, null);
      current = true;
    },
    p: function update(ctx, dirty) {
      if (
      /*social*/
      ctx[3]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);

          if (dirty &
          /*social*/
          8) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_3$3(ctx);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(div, t1);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, function () {
          if_block0 = null;
        });
        check_outros();
      }

      if (
      /*pdfLink*/
      ctx[6]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);

          if (dirty &
          /*pdfLink*/
          64) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_2$3(ctx);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, function () {
          if_block1 = null;
        });
        check_outros();
      }

      if (
      /*contact*/
      ctx[2]) {
        if (if_block2) {
          if_block2.p(ctx, dirty);
        } else {
          if_block2 = create_if_block_1$3(ctx);
          if_block2.c();
          if_block2.m(footer, null);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block0);
      transition_in(if_block1);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(hr);
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(footer);
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
      if (if_block2) if_block2.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$5.name,
    type: "if",
    source: "(291:2) {#if social || pdfLink}",
    ctx: ctx
  });
  return block;
} // (295:8) {#if social}


function create_if_block_3$3(ctx) {
  var div;
  var current;
  var each_value_1 =
  /*social*/
  ctx[3];
  validate_each_argument(each_value_1);
  var each_blocks = [];

  for (var i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1$2(get_each_context_1$2(ctx, each_value_1, i));
  }

  var out = function out(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };

  var block = {
    c: function create() {
      div = element("div");

      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(div_nodes);
      }

      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "social-links footer-layout svelte-aanufo");
      add_location(div, file$a, 295, 10, 13261);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(div, null);
      }

      current = true;
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*social, truncateUrl, icons*/
      648) {
        each_value_1 =
        /*social*/
        ctx[3];
        validate_each_argument(each_value_1);

        var _i4;

        for (_i4 = 0; _i4 < each_value_1.length; _i4 += 1) {
          var child_ctx = get_each_context_1$2(ctx, each_value_1, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);

            transition_in(each_blocks[_i4], 1);
          } else {
            each_blocks[_i4] = create_each_block_1$2(child_ctx);

            each_blocks[_i4].c();

            transition_in(each_blocks[_i4], 1);

            each_blocks[_i4].m(div, null);
          }
        }

        group_outros();

        for (_i4 = each_value_1.length; _i4 < each_blocks.length; _i4 += 1) {
          out(_i4);
        }

        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;

      for (var _i5 = 0; _i5 < each_value_1.length; _i5 += 1) {
        transition_in(each_blocks[_i5]);
      }

      current = true;
    },
    o: function outro(local) {
      each_blocks = each_blocks.filter(Boolean);

      for (var _i6 = 0; _i6 < each_blocks.length; _i6 += 1) {
        transition_out(each_blocks[_i6]);
      }

      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_3$3.name,
    type: "if",
    source: "(295:8) {#if social}",
    ctx: ctx
  });
  return block;
} // (297:12) {#each social as item}


function create_each_block_1$2(ctx) {
  var a;
  var span0;
  var switch_instance;
  var span0_aria_label_value;
  var t0;
  var span2;
  var span1;
  var t1_value =
  /*truncateUrl*/
  ctx[9](
  /*item*/
  ctx[13].url) + "";
  var t1;
  var t2;
  var a_href_value;
  var a_title_value;
  var current;
  var switch_value =
  /*icons*/
  ctx[7][
  /*item*/
  ctx[13].icon];

  function switch_props(ctx) {
    return {
      $$inline: true
    };
  }

  if (switch_value) {
    switch_instance = new switch_value(switch_props());
  }

  var block = {
    c: function create() {
      a = element("a");
      span0 = element("span");
      if (switch_instance) create_component(switch_instance.$$.fragment);
      t0 = space();
      span2 = element("span");
      span1 = element("span");
      t1 = text(t1_value);
      t2 = space();
      this.h();
    },
    l: function claim(nodes) {
      a = claim_element(nodes, "A", {
        href: true,
        title: true,
        class: true
      });
      var a_nodes = children(a);
      span0 = claim_element(a_nodes, "SPAN", {
        class: true,
        "aria-label": true
      });
      var span0_nodes = children(span0);
      if (switch_instance) claim_component(switch_instance.$$.fragment, span0_nodes);
      span0_nodes.forEach(detach_dev);
      t0 = claim_space(a_nodes);
      span2 = claim_element(a_nodes, "SPAN", {
        class: true
      });
      var span2_nodes = children(span2);
      span1 = claim_element(span2_nodes, "SPAN", {
        class: true
      });
      var span1_nodes = children(span1);
      t1 = claim_text(span1_nodes, t1_value);
      span1_nodes.forEach(detach_dev);
      span2_nodes.forEach(detach_dev);
      t2 = claim_space(a_nodes);
      a_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span0, "class", "icon svelte-aanufo");
      attr_dev(span0, "aria-label", span0_aria_label_value =
      /*item*/
      ctx[13].label);
      add_location(span0, file$a, 298, 16, 13406);
      attr_dev(span1, "class", "u-print-only svelte-aanufo");
      add_location(span1, file$a, 302, 18, 13599);
      attr_dev(span2, "class", "u-print-only svelte-aanufo");
      add_location(span2, file$a, 301, 16, 13553);
      attr_dev(a, "href", a_href_value =
      /*item*/
      ctx[13].url);
      attr_dev(a, "title", a_title_value =
      /*item*/
      ctx[13].label);
      attr_dev(a, "class", "svelte-aanufo");
      add_location(a, file$a, 297, 14, 13351);
    },
    m: function mount(target, anchor) {
      insert_dev(target, a, anchor);
      append_dev(a, span0);

      if (switch_instance) {
        mount_component(switch_instance, span0, null);
      }

      append_dev(a, t0);
      append_dev(a, span2);
      append_dev(span2, span1);
      append_dev(span1, t1);
      append_dev(a, t2);
      current = true;
    },
    p: function update(ctx, dirty) {
      if (switch_value !== (switch_value =
      /*icons*/
      ctx[7][
      /*item*/
      ctx[13].icon])) {
        if (switch_instance) {
          group_outros();
          var old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, function () {
            destroy_component(old_component, 1);
          });
          check_outros();
        }

        if (switch_value) {
          switch_instance = new switch_value(switch_props());
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, span0, null);
        } else {
          switch_instance = null;
        }
      }

      if (!current || dirty &
      /*social*/
      8 && span0_aria_label_value !== (span0_aria_label_value =
      /*item*/
      ctx[13].label)) {
        attr_dev(span0, "aria-label", span0_aria_label_value);
      }

      if ((!current || dirty &
      /*social*/
      8) && t1_value !== (t1_value =
      /*truncateUrl*/
      ctx[9](
      /*item*/
      ctx[13].url) + "")) set_data_dev(t1, t1_value);

      if (!current || dirty &
      /*social*/
      8 && a_href_value !== (a_href_value =
      /*item*/
      ctx[13].url)) {
        attr_dev(a, "href", a_href_value);
      }

      if (!current || dirty &
      /*social*/
      8 && a_title_value !== (a_title_value =
      /*item*/
      ctx[13].label)) {
        attr_dev(a, "title", a_title_value);
      }
    },
    i: function intro(local) {
      if (current) return;
      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(a);
      if (switch_instance) destroy_component(switch_instance);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_1$2.name,
    type: "each",
    source: "(297:12) {#each social as item}",
    ctx: ctx
  });
  return block;
} // (309:8) {#if pdfLink}


function create_if_block_2$3(ctx) {
  var div;
  var a;
  var span0;
  var t0;
  var t1;
  var span1;
  var pdf;
  var current;
  pdf = new FaFilePdf({
    $$inline: true
  });
  var block = {
    c: function create() {
      div = element("div");
      a = element("a");
      span0 = element("span");
      t0 = text("Download PDF");
      t1 = space();
      span1 = element("span");
      create_component(pdf.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      a = claim_element(div_nodes, "A", {
        href: true,
        title: true,
        "aria-label": true,
        class: true
      });
      var a_nodes = children(a);
      span0 = claim_element(a_nodes, "SPAN", {
        class: true
      });
      var span0_nodes = children(span0);
      t0 = claim_text(span0_nodes, "Download PDF");
      span0_nodes.forEach(detach_dev);
      t1 = claim_space(a_nodes);
      span1 = claim_element(a_nodes, "SPAN", {
        class: true
      });
      var span1_nodes = children(span1);
      claim_component(pdf.$$.fragment, span1_nodes);
      span1_nodes.forEach(detach_dev);
      a_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span0, "class", "download-label svelte-aanufo");
      add_location(span0, file$a, 314, 14, 13959);
      attr_dev(span1, "class", "icon svelte-aanufo");
      add_location(span1, file$a, 315, 14, 14022);
      attr_dev(a, "href",
      /*pdfLink*/
      ctx[6]);
      attr_dev(a, "title", "Open PDF version");
      attr_dev(a, "aria-label", "Download PDF");
      attr_dev(a, "class", "svelte-aanufo");
      add_location(a, file$a, 310, 12, 13833);
      attr_dev(div, "class", "download u-print-hidden svelte-aanufo");
      add_location(div, file$a, 309, 10, 13783);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, a);
      append_dev(a, span0);
      append_dev(span0, t0);
      append_dev(a, t1);
      append_dev(a, span1);
      mount_component(pdf, span1, null);
      current = true;
    },
    p: function update(ctx, dirty) {
      if (!current || dirty &
      /*pdfLink*/
      64) {
        attr_dev(a, "href",
        /*pdfLink*/
        ctx[6]);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(pdf.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(pdf.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      destroy_component(pdf);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2$3.name,
    type: "if",
    source: "(309:8) {#if pdfLink}",
    ctx: ctx
  });
  return block;
} // (323:6) {#if contact}


function create_if_block_1$3(ctx) {
  var dl;
  var each_value = Object.entries(
  /*contact*/
  ctx[2]);
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
  }

  var block = {
    c: function create() {
      dl = element("dl");

      for (var _i7 = 0; _i7 < each_blocks.length; _i7 += 1) {
        each_blocks[_i7].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      dl = claim_element(nodes, "DL", {
        class: true
      });
      var dl_nodes = children(dl);

      for (var _i8 = 0; _i8 < each_blocks.length; _i8 += 1) {
        each_blocks[_i8].l(dl_nodes);
      }

      dl_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(dl, "class", "contact svelte-aanufo");
      add_location(dl, file$a, 323, 8, 14177);
    },
    m: function mount(target, anchor) {
      insert_dev(target, dl, anchor);

      for (var _i9 = 0; _i9 < each_blocks.length; _i9 += 1) {
        each_blocks[_i9].m(dl, null);
      }
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*Object, contact*/
      4) {
        each_value = Object.entries(
        /*contact*/
        ctx[2]);
        validate_each_argument(each_value);

        var _i10;

        for (_i10 = 0; _i10 < each_value.length; _i10 += 1) {
          var child_ctx = get_each_context$2(ctx, each_value, _i10);

          if (each_blocks[_i10]) {
            each_blocks[_i10].p(child_ctx, dirty);
          } else {
            each_blocks[_i10] = create_each_block$2(child_ctx);

            each_blocks[_i10].c();

            each_blocks[_i10].m(dl, null);
          }
        }

        for (; _i10 < each_blocks.length; _i10 += 1) {
          each_blocks[_i10].d(1);
        }

        each_blocks.length = each_value.length;
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(dl);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$3.name,
    type: "if",
    source: "(323:6) {#if contact}",
    ctx: ctx
  });
  return block;
} // (325:10) {#each Object.entries(contact) as [type, details]}


function create_each_block$2(ctx) {
  var div;
  var dt;
  var t0_value =
  /*type*/
  ctx[10] + "";
  var t0;
  var t1;
  var dd;
  var raw_value =
  /*details*/
  ctx[8] + "";
  var t2;
  var block = {
    c: function create() {
      div = element("div");
      dt = element("dt");
      t0 = text(t0_value);
      t1 = space();
      dd = element("dd");
      t2 = space();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      dt = claim_element(div_nodes, "DT", {
        class: true
      });
      var dt_nodes = children(dt);
      t0 = claim_text(dt_nodes, t0_value);
      dt_nodes.forEach(detach_dev);
      t1 = claim_space(div_nodes);
      dd = claim_element(div_nodes, "DD", {
        class: true
      });
      var dd_nodes = children(dd);
      dd_nodes.forEach(detach_dev);
      t2 = claim_space(div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(dt, "class", "visually-hidden svelte-aanufo");
      add_location(dt, file$a, 326, 14, 14291);
      attr_dev(dd, "class", "svelte-aanufo");
      add_location(dd, file$a, 327, 14, 14345);
      attr_dev(div, "class", "svelte-aanufo");
      add_location(div, file$a, 325, 12, 14271);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, dt);
      append_dev(dt, t0);
      append_dev(div, t1);
      append_dev(div, dd);
      dd.innerHTML = raw_value;
      append_dev(div, t2);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*contact*/
      4 && t0_value !== (t0_value =
      /*type*/
      ctx[10] + "")) set_data_dev(t0, t0_value);
      if (dirty &
      /*contact*/
      4 && raw_value !== (raw_value =
      /*details*/
      ctx[8] + "")) dd.innerHTML = raw_value;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block$2.name,
    type: "each",
    source: "(325:10) {#each Object.entries(contact) as [type, details]}",
    ctx: ctx
  });
  return block;
}

function create_fragment$b(ctx) {
  var div1;
  var h1;
  var t0;
  var t1;
  var h2;
  var t2;
  var t3;
  var div0;
  var t4;
  var t5;
  var current;
  var if_block0 = (
  /*coreSkills*/
  ctx[4] ||
  /*currentInterests*/
  ctx[5]) && create_if_block_4$1(ctx);
  var if_block1 = (
  /*social*/
  ctx[3] ||
  /*pdfLink*/
  ctx[6]) && create_if_block$5(ctx);
  var block = {
    c: function create() {
      div1 = element("div");
      h1 = element("h1");
      t0 = text(
      /*name*/
      ctx[0]);
      t1 = space();
      h2 = element("h2");
      t2 = text(
      /*title*/
      ctx[1]);
      t3 = space();
      div0 = element("div");
      t4 = space();
      if (if_block0) if_block0.c();
      t5 = space();
      if (if_block1) if_block1.c();
      this.h();
    },
    l: function claim(nodes) {
      div1 = claim_element(nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      h1 = claim_element(div1_nodes, "H1", {
        class: true
      });
      var h1_nodes = children(h1);
      t0 = claim_text(h1_nodes,
      /*name*/
      ctx[0]);
      h1_nodes.forEach(detach_dev);
      t1 = claim_space(div1_nodes);
      h2 = claim_element(div1_nodes, "H2", {
        class: true
      });
      var h2_nodes = children(h2);
      t2 = claim_text(h2_nodes,
      /*title*/
      ctx[1]);
      h2_nodes.forEach(detach_dev);
      t3 = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      div0_nodes.forEach(detach_dev);
      t4 = claim_space(div1_nodes);
      if (if_block0) if_block0.l(div1_nodes);
      t5 = claim_space(div1_nodes);
      if (if_block1) if_block1.l(div1_nodes);
      div1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h1, "class", "svelte-aanufo");
      add_location(h1, file$a, 269, 2, 12674);
      attr_dev(h2, "class", "svelte-aanufo");
      add_location(h2, file$a, 270, 2, 12692);
      attr_dev(div0, "class", "details svelte-aanufo");
      add_location(div0, file$a, 271, 2, 12711);
      attr_dev(div1, "class", "summary svelte-aanufo");
      add_location(div1, file$a, 268, 0, 12650);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div1, anchor);
      append_dev(div1, h1);
      append_dev(h1, t0);
      append_dev(div1, t1);
      append_dev(div1, h2);
      append_dev(h2, t2);
      append_dev(div1, t3);
      append_dev(div1, div0);
      div0.innerHTML =
      /*details*/
      ctx[8];
      append_dev(div1, t4);
      if (if_block0) if_block0.m(div1, null);
      append_dev(div1, t5);
      if (if_block1) if_block1.m(div1, null);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (!current || dirty &
      /*name*/
      1) set_data_dev(t0,
      /*name*/
      ctx[0]);
      if (!current || dirty &
      /*title*/
      2) set_data_dev(t2,
      /*title*/
      ctx[1]);
      if (!current || dirty &
      /*details*/
      256) div0.innerHTML =
      /*details*/
      ctx[8];

      if (
      /*coreSkills*/
      ctx[4] ||
      /*currentInterests*/
      ctx[5]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);

          if (dirty &
          /*coreSkills, currentInterests*/
          48) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_4$1(ctx);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(div1, t5);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, function () {
          if_block0 = null;
        });
        check_outros();
      }

      if (
      /*social*/
      ctx[3] ||
      /*pdfLink*/
      ctx[6]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);

          if (dirty &
          /*social, pdfLink*/
          72) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block$5(ctx);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div1, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, function () {
          if_block1 = null;
        });
        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block0);
      transition_in(if_block1);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div1);
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$b.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$b($$self, $$props, $$invalidate) {
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Summary", slots, []);

  var truncateUrl = function truncateUrl(url) {
    return url.replace(/https:\/\//, "");
  };

  var _$$props$name = $$props.name,
      name = _$$props$name === void 0 ? "[Name]" : _$$props$name;
  var _$$props$title = $$props.title,
      title = _$$props$title === void 0 ? "[Title]" : _$$props$title;
  var _$$props$details = $$props.details,
      details = _$$props$details === void 0 ? "[Details]" : _$$props$details;
  var contact = $$props.contact;
  var social = $$props.social;
  var coreSkills = $$props.coreSkills;
  var currentInterests = $$props.currentInterests;
  var pdfLink = $$props.pdfLink;
  var _$$props$icons = $$props.icons,
      icons = _$$props$icons === void 0 ? {
    github: FaGithub,
    linkedin: FaLinkedin,
    twitter: FaTwitter
  } : _$$props$icons;
  var writable_props = ["name", "title", "details", "contact", "social", "coreSkills", "currentInterests", "pdfLink", "icons"];
  Object_1$1.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Summary> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$$set = function ($$props) {
    if ("name" in $$props) $$invalidate(0, name = $$props.name);
    if ("title" in $$props) $$invalidate(1, title = $$props.title);
    if ("details" in $$props) $$invalidate(8, details = $$props.details);
    if ("contact" in $$props) $$invalidate(2, contact = $$props.contact);
    if ("social" in $$props) $$invalidate(3, social = $$props.social);
    if ("coreSkills" in $$props) $$invalidate(4, coreSkills = $$props.coreSkills);
    if ("currentInterests" in $$props) $$invalidate(5, currentInterests = $$props.currentInterests);
    if ("pdfLink" in $$props) $$invalidate(6, pdfLink = $$props.pdfLink);
    if ("icons" in $$props) $$invalidate(7, icons = $$props.icons);
  };

  $$self.$capture_state = function () {
    return {
      GitHub: FaGithub,
      LinkedIn: FaLinkedin,
      Twitter: FaTwitter,
      PDF: FaFilePdf,
      List: List,
      truncateUrl: truncateUrl,
      name: name,
      title: title,
      details: details,
      contact: contact,
      social: social,
      coreSkills: coreSkills,
      currentInterests: currentInterests,
      pdfLink: pdfLink,
      icons: icons
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("name" in $$props) $$invalidate(0, name = $$props.name);
    if ("title" in $$props) $$invalidate(1, title = $$props.title);
    if ("details" in $$props) $$invalidate(8, details = $$props.details);
    if ("contact" in $$props) $$invalidate(2, contact = $$props.contact);
    if ("social" in $$props) $$invalidate(3, social = $$props.social);
    if ("coreSkills" in $$props) $$invalidate(4, coreSkills = $$props.coreSkills);
    if ("currentInterests" in $$props) $$invalidate(5, currentInterests = $$props.currentInterests);
    if ("pdfLink" in $$props) $$invalidate(6, pdfLink = $$props.pdfLink);
    if ("icons" in $$props) $$invalidate(7, icons = $$props.icons);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [name, title, contact, social, coreSkills, currentInterests, pdfLink, icons, details, truncateUrl];
}

var Summary = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Summary, _SvelteComponentDev);

  var _super = _createSuper$b(Summary);

  function Summary(options) {
    var _this;

    _classCallCheck(this, Summary);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$b, create_fragment$b, safe_not_equal, {
      name: 0,
      title: 1,
      details: 8,
      contact: 2,
      social: 3,
      coreSkills: 4,
      currentInterests: 5,
      pdfLink: 6,
      icons: 7
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Summary",
      options: options,
      id: create_fragment$b.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*contact*/
    ctx[2] === undefined && !("contact" in props)) {
      console.warn("<Summary> was created without expected prop 'contact'");
    }

    if (
    /*social*/
    ctx[3] === undefined && !("social" in props)) {
      console.warn("<Summary> was created without expected prop 'social'");
    }

    if (
    /*coreSkills*/
    ctx[4] === undefined && !("coreSkills" in props)) {
      console.warn("<Summary> was created without expected prop 'coreSkills'");
    }

    if (
    /*currentInterests*/
    ctx[5] === undefined && !("currentInterests" in props)) {
      console.warn("<Summary> was created without expected prop 'currentInterests'");
    }

    if (
    /*pdfLink*/
    ctx[6] === undefined && !("pdfLink" in props)) {
      console.warn("<Summary> was created without expected prop 'pdfLink'");
    }

    return _this;
  }

  _createClass(Summary, [{
    key: "name",
    get: function get() {
      throw new Error("<Summary>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Summary>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "title",
    get: function get() {
      throw new Error("<Summary>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Summary>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "details",
    get: function get() {
      throw new Error("<Summary>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Summary>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "contact",
    get: function get() {
      throw new Error("<Summary>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Summary>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "social",
    get: function get() {
      throw new Error("<Summary>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Summary>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "coreSkills",
    get: function get() {
      throw new Error("<Summary>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Summary>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "currentInterests",
    get: function get() {
      throw new Error("<Summary>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Summary>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "pdfLink",
    get: function get() {
      throw new Error("<Summary>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Summary>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "icons",
    get: function get() {
      throw new Error("<Summary>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Summary>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Summary;
}(SvelteComponentDev);

function fade(node, _ref2) {
  var _ref2$delay = _ref2.delay,
      delay = _ref2$delay === void 0 ? 0 : _ref2$delay,
      _ref2$duration = _ref2.duration,
      duration = _ref2$duration === void 0 ? 400 : _ref2$duration,
      _ref2$easing = _ref2.easing,
      easing = _ref2$easing === void 0 ? identity : _ref2$easing;
  var o = +getComputedStyle(node).opacity;
  return {
    delay: delay,
    duration: duration,
    easing: easing,
    css: function css(t) {
      return "opacity: ".concat(t * o);
    }
  };
}

function _createSuper$c(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$c(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$c() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Object_1$2 = globals.Object;
var file$b = "src/components/Timeline.svelte";

function get_each_context$3(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[15] = list[i];
  return child_ctx;
} // (163:0) {#if timelineEvents}


function create_if_block$6(ctx) {
  var div3;
  var div0;
  var t0_value =
  /*lastDate*/
  ctx[3].year + "";
  var t0;
  var t1;
  var div1;
  var t2;
  var div2;
  var t3_value =
  /*firstDate*/
  ctx[2].year + "";
  var t3;
  var div3_transition;
  var current;
  var each_value =
  /*timelineEvents*/
  ctx[1];
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
  }

  var block = {
    c: function create() {
      div3 = element("div");
      div0 = element("div");
      t0 = text(t0_value);
      t1 = space();
      div1 = element("div");

      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      t2 = space();
      div2 = element("div");
      t3 = text(t3_value);
      this.h();
    },
    l: function claim(nodes) {
      div3 = claim_element(nodes, "DIV", {
        class: true
      });
      var div3_nodes = children(div3);
      div0 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      t0 = claim_text(div0_nodes, t0_value);
      div0_nodes.forEach(detach_dev);
      t1 = claim_space(div3_nodes);
      div1 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(div1_nodes);
      }

      div1_nodes.forEach(detach_dev);
      t2 = claim_space(div3_nodes);
      div2 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      t3 = claim_text(div2_nodes, t3_value);
      div2_nodes.forEach(detach_dev);
      div3_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div0, "class", "end-year svelte-moq7j1");
      add_location(div0, file$b, 168, 4, 6123);
      attr_dev(div1, "class", "events svelte-moq7j1");
      add_location(div1, file$b, 169, 4, 6171);
      attr_dev(div2, "class", "start-year svelte-moq7j1");
      add_location(div2, file$b, 179, 4, 6505);
      attr_dev(div3, "class", "timeline svelte-moq7j1");
      add_location(div3, file$b, 163, 2, 6021);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div3, anchor);
      append_dev(div3, div0);
      append_dev(div0, t0);
      append_dev(div3, t1);
      append_dev(div3, div1);

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(div1, null);
      }

      append_dev(div3, t2);
      append_dev(div3, div2);
      append_dev(div2, t3);
      /*div3_binding*/

      ctx[8](div3);
      current = true;
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*timelineEvents, scrollTo*/
      18) {
        each_value =
        /*timelineEvents*/
        ctx[1];
        validate_each_argument(each_value);

        var _i4;

        for (_i4 = 0; _i4 < each_value.length; _i4 += 1) {
          var child_ctx = get_each_context$3(ctx, each_value, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
          } else {
            each_blocks[_i4] = create_each_block$3(child_ctx);

            each_blocks[_i4].c();

            each_blocks[_i4].m(div1, null);
          }
        }

        for (; _i4 < each_blocks.length; _i4 += 1) {
          each_blocks[_i4].d(1);
        }

        each_blocks.length = each_value.length;
      }
    },
    i: function intro(local) {
      if (current) return;
      add_render_callback(function () {
        if (!div3_transition) div3_transition = create_bidirectional_transition(div3, fade, {
          duration: 200
        }, true);
        div3_transition.run(1);
      });
      current = true;
    },
    o: function outro(local) {
      if (!div3_transition) div3_transition = create_bidirectional_transition(div3, fade, {
        duration: 200
      }, false);
      div3_transition.run(0);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div3);
      destroy_each(each_blocks, detaching);
      /*div3_binding*/

      ctx[8](null);
      if (detaching && div3_transition) div3_transition.end();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$6.name,
    type: "if",
    source: "(163:0) {#if timelineEvents}",
    ctx: ctx
  });
  return block;
} // (171:6) {#each timelineEvents as event}


function create_each_block$3(ctx) {
  var div;
  var div_class_value;
  var tooltip_action;
  var mounted;
  var dispose;

  function click_handler() {
    var _ctx;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (
      /*click_handler*/
      (_ctx = ctx)[7].apply(_ctx, [
      /*event*/
      ctx[15]].concat(args))
    );
  }

  var block = {
    c: function create() {
      div = element("div");
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true,
        style: true
      });
      children(div).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", div_class_value = "timeline-event " +
      /*event*/
      ctx[15].modifier + " svelte-moq7j1");
      set_style(div, "width",
      /*event*/
      ctx[15].percent + "%");
      toggle_class(div, "visible",
      /*event*/
      ctx[15].isVisible);
      add_location(div, file$b, 171, 8, 6238);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);

      if (!mounted) {
        dispose = [listen_dev(div, "click", click_handler, false, false, false), action_destroyer(tooltip_action = tooltip.call(null, div, {
          text:
          /*event*/
          ctx[15].label
        }))];
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;

      if (dirty &
      /*timelineEvents*/
      2 && div_class_value !== (div_class_value = "timeline-event " +
      /*event*/
      ctx[15].modifier + " svelte-moq7j1")) {
        attr_dev(div, "class", div_class_value);
      }

      if (dirty &
      /*timelineEvents*/
      2) {
        set_style(div, "width",
        /*event*/
        ctx[15].percent + "%");
      }

      if (tooltip_action && is_function(tooltip_action.update) && dirty &
      /*timelineEvents*/
      2) tooltip_action.update.call(null, {
        text:
        /*event*/
        ctx[15].label
      });

      if (dirty &
      /*timelineEvents, timelineEvents*/
      2) {
        toggle_class(div, "visible",
        /*event*/
        ctx[15].isVisible);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      mounted = false;
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block$3.name,
    type: "each",
    source: "(171:6) {#each timelineEvents as event}",
    ctx: ctx
  });
  return block;
}

function create_fragment$c(ctx) {
  var if_block_anchor;
  var current;
  var if_block =
  /*timelineEvents*/
  ctx[1] && create_if_block$6(ctx);
  var block = {
    c: function create() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    l: function claim(nodes) {
      if (if_block) if_block.l(nodes);
      if_block_anchor = empty();
    },
    m: function mount(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert_dev(target, if_block_anchor, anchor);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (
      /*timelineEvents*/
      ctx[1]) {
        if (if_block) {
          if_block.p(ctx, dirty);

          if (dirty &
          /*timelineEvents*/
          2) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$6(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, function () {
          if_block = null;
        });
        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if (if_block) if_block.d(detaching);
      if (detaching) detach_dev(if_block_anchor);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$c.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

var INTERSECTION_RATIO = 0.6;

function instance$c($$self, $$props, $$invalidate) {
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Timeline", slots, []);
  var events = $$props.events;
  var _$$props$intersection = $$props.intersectionNodes,
      intersectionNodes = _$$props$intersection === void 0 ? [] : _$$props$intersection;
  var containerEl;
  var intersectedEvents = [];
  var eventsWithMonthLength = events.map(function (event, idx) {
    return {
      name: event.name,
      modifier: event.isContractor ? "contract" : "permanent",
      monthLength: getNumberOfMonthsBetweenDates(event.start, event.end),
      label: "".concat(event.name, ": ").concat(periodDuration(event.start, event.end)),
      target: intersectionNodes[idx]
    };
  });
  var totalTimelineInMonths = eventsWithMonthLength.reduce(function (acc, curr) {
    return acc + curr.monthLength;
  }, 0);
  var firstDate = events[events.length - 1].start;
  var lastDate = events[0].end ? events[0].end : {
    year: new Date().getFullYear()
  };
  var scaledEvents = eventsWithMonthLength.map(function (event) {
    return Object.assign({}, event, {
      percent: 100 / totalTimelineInMonths * event.monthLength
    });
  });
  var timelineEvents = scaledEvents;
  var observer;

  function intersectionCallback(entries) {
    var updatedEvents = _toConsumableArray(scaledEvents);

    entries.forEach(function (entry) {
      var event = updatedEvents.find(function (x) {
        return x.target === entry.target;
      });
      event.isVisible = entry.intersectionRatio >= INTERSECTION_RATIO;

      if (event.isVisible) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
    $$invalidate(1, timelineEvents = updatedEvents);
  }

  function scrollTo(node) {
    var scrollPosition = node.getBoundingClientRect().top + window.pageYOffset;
    var offset = containerEl.getBoundingClientRect().top;
    var scrollOffset = scrollPosition - offset;
    var supportsNativeSmoothScroll = ("scrollBehavior" in document.documentElement.style);

    if (supportsNativeSmoothScroll) {
      window.scrollTo({
        top: scrollOffset,
        behavior: "smooth"
      });
    } else {
      window.scrollTo(0, scrollOffset);
    }
  }

  onMount(function () {
    if (!window.IntersectionObserver) {
      return;
    }

    observer = new IntersectionObserver(intersectionCallback, {
      threshold: INTERSECTION_RATIO
    });
    intersectionNodes.forEach(function (node, i) {
      if (!scaledEvents[i]) return;
      scaledEvents[i].target = node;
      observer.observe(node);
    });
  });
  onDestroy(function () {
    observer && observer.disconnect();
  });
  var writable_props = ["events", "intersectionNodes"];
  Object_1$2.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Timeline> was created with unknown prop '".concat(key, "'"));
  });

  var click_handler = function click_handler(event) {
    return scrollTo(event.target);
  };

  function div3_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      containerEl = $$value;
      $$invalidate(0, containerEl);
    });
  }

  $$self.$$set = function ($$props) {
    if ("events" in $$props) $$invalidate(5, events = $$props.events);
    if ("intersectionNodes" in $$props) $$invalidate(6, intersectionNodes = $$props.intersectionNodes);
  };

  $$self.$capture_state = function () {
    return {
      onMount: onMount,
      onDestroy: onDestroy,
      fade: fade,
      getNumberOfMonthsBetweenDates: getNumberOfMonthsBetweenDates,
      periodDuration: periodDuration,
      tooltip: tooltip,
      INTERSECTION_RATIO: INTERSECTION_RATIO,
      events: events,
      intersectionNodes: intersectionNodes,
      containerEl: containerEl,
      intersectedEvents: intersectedEvents,
      eventsWithMonthLength: eventsWithMonthLength,
      totalTimelineInMonths: totalTimelineInMonths,
      firstDate: firstDate,
      lastDate: lastDate,
      scaledEvents: scaledEvents,
      timelineEvents: timelineEvents,
      observer: observer,
      intersectionCallback: intersectionCallback,
      scrollTo: scrollTo
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("events" in $$props) $$invalidate(5, events = $$props.events);
    if ("intersectionNodes" in $$props) $$invalidate(6, intersectionNodes = $$props.intersectionNodes);
    if ("containerEl" in $$props) $$invalidate(0, containerEl = $$props.containerEl);
    if ("timelineEvents" in $$props) $$invalidate(1, timelineEvents = $$props.timelineEvents);
    if ("observer" in $$props) observer = $$props.observer;
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [containerEl, timelineEvents, firstDate, lastDate, scrollTo, events, intersectionNodes, click_handler, div3_binding];
}

var Timeline = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Timeline, _SvelteComponentDev);

  var _super = _createSuper$c(Timeline);

  function Timeline(options) {
    var _this;

    _classCallCheck(this, Timeline);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$c, create_fragment$c, safe_not_equal, {
      events: 5,
      intersectionNodes: 6
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Timeline",
      options: options,
      id: create_fragment$c.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*events*/
    ctx[5] === undefined && !("events" in props)) {
      console.warn("<Timeline> was created without expected prop 'events'");
    }

    return _this;
  }

  _createClass(Timeline, [{
    key: "events",
    get: function get() {
      throw new Error("<Timeline>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Timeline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "intersectionNodes",
    get: function get() {
      throw new Error("<Timeline>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Timeline>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Timeline;
}(SvelteComponentDev);

function _createSuper$d(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$d(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$d() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Object_1$3 = globals.Object,
    document_1 = globals.document;
var file$c = "src/routes/index.svelte";

function get_each_context$4(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[11] = list[i];
  return child_ctx;
}

function get_each_context_1$3(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[11] = list[i];
  return child_ctx;
} // (158:6) {#if intersectionNodes}


function create_if_block$7(ctx) {
  var timeline;
  var current;
  timeline = new Timeline({
    props: {
      events:
      /*experienceItems*/
      ctx[1],
      intersectionNodes:
      /*intersectionNodes*/
      ctx[3]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(timeline.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(timeline.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(timeline, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var timeline_changes = {};
      if (dirty &
      /*experienceItems*/
      2) timeline_changes.events =
      /*experienceItems*/
      ctx[1];
      if (dirty &
      /*intersectionNodes*/
      8) timeline_changes.intersectionNodes =
      /*intersectionNodes*/
      ctx[3];
      timeline.$set(timeline_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(timeline.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(timeline.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(timeline, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$7.name,
    type: "if",
    source: "(158:6) {#if intersectionNodes}",
    ctx: ctx
  });
  return block;
} // (162:4) {#each linkedExperienceItems as experience}


function create_each_block_1$3(ctx) {
  var experienceitem;
  var current;
  var experienceitem_spread_levels = [
  /*experience*/
  ctx[11]];
  var experienceitem_props = {};

  for (var i = 0; i < experienceitem_spread_levels.length; i += 1) {
    experienceitem_props = assign(experienceitem_props, experienceitem_spread_levels[i]);
  }

  experienceitem = new ExperienceItem({
    props: experienceitem_props,
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(experienceitem.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(experienceitem.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(experienceitem, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var experienceitem_changes = dirty &
      /*linkedExperienceItems*/
      32 ? get_spread_update(experienceitem_spread_levels, [get_spread_object(
      /*experience*/
      ctx[11])]) : {};
      experienceitem.$set(experienceitem_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(experienceitem.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(experienceitem.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(experienceitem, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_1$3.name,
    type: "each",
    source: "(162:4) {#each linkedExperienceItems as experience}",
    ctx: ctx
  });
  return block;
} // (170:4) {#each educationItems as experience}


function create_each_block$4(ctx) {
  var experienceitem;
  var current;
  var experienceitem_spread_levels = [
  /*experience*/
  ctx[11]];
  var experienceitem_props = {};

  for (var i = 0; i < experienceitem_spread_levels.length; i += 1) {
    experienceitem_props = assign(experienceitem_props, experienceitem_spread_levels[i]);
  }

  experienceitem = new ExperienceItem({
    props: experienceitem_props,
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(experienceitem.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(experienceitem.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(experienceitem, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var experienceitem_changes = dirty &
      /*educationItems*/
      4 ? get_spread_update(experienceitem_spread_levels, [get_spread_object(
      /*experience*/
      ctx[11])]) : {};
      experienceitem.$set(experienceitem_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(experienceitem.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(experienceitem.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(experienceitem, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block$4.name,
    type: "each",
    source: "(170:4) {#each educationItems as experience}",
    ctx: ctx
  });
  return block;
}

function create_fragment$d(ctx) {
  var title_value;
  var meta0;
  var meta0_content_value;
  var meta1;
  var meta2;
  var meta3;
  var meta3_content_value;
  var meta4;
  var meta4_content_value;
  var meta5;
  var meta6;
  var meta7;
  var meta8;
  var meta8_content_value;
  var meta9;
  var meta9_content_value;
  var meta10;
  var t0;
  var aside;
  var summary_1;
  var t1;
  var article;
  var section0;
  var header0;
  var h20;
  var t2;
  var t3;
  var t4;
  var t5;
  var section1;
  var header1;
  var h21;
  var t6;
  var t7;
  var t8;
  var p;
  var infoicon;
  var t9;
  var br;
  var t10;
  var current;
  document_1.title = title_value = "" + (
  /*about*/
  ctx[0].name + " - " +
  /*about*/
  ctx[0].title + ": CV");
  var summary_1_spread_levels = [
  /*summary*/
  ctx[4], {
    pdfLink: "tyom-semonov-cv.pdf"
  }];
  var summary_1_props = {};

  for (var i = 0; i < summary_1_spread_levels.length; i += 1) {
    summary_1_props = assign(summary_1_props, summary_1_spread_levels[i]);
  }

  summary_1 = new Summary({
    props: summary_1_props,
    $$inline: true
  });
  var if_block =
  /*intersectionNodes*/
  ctx[3] && create_if_block$7(ctx);
  var each_value_1 =
  /*linkedExperienceItems*/
  ctx[5];
  validate_each_argument(each_value_1);
  var each_blocks_1 = [];

  for (var _i = 0; _i < each_value_1.length; _i += 1) {
    each_blocks_1[_i] = create_each_block_1$3(get_each_context_1$3(ctx, each_value_1, _i));
  }

  var out = function out(i) {
    return transition_out(each_blocks_1[i], 1, 1, function () {
      each_blocks_1[i] = null;
    });
  };

  var each_value =
  /*educationItems*/
  ctx[2];
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var _i2 = 0; _i2 < each_value.length; _i2 += 1) {
    each_blocks[_i2] = create_each_block$4(get_each_context$4(ctx, each_value, _i2));
  }

  var out_1 = function out_1(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };

  infoicon = new FaInfoCircle({
    $$inline: true
  });
  var block = {
    c: function create() {
      meta0 = element("meta");
      meta1 = element("meta");
      meta2 = element("meta");
      meta3 = element("meta");
      meta4 = element("meta");
      meta5 = element("meta");
      meta6 = element("meta");
      meta7 = element("meta");
      meta8 = element("meta");
      meta9 = element("meta");
      meta10 = element("meta");
      t0 = space();
      aside = element("aside");
      create_component(summary_1.$$.fragment);
      t1 = space();
      article = element("article");
      section0 = element("section");
      header0 = element("header");
      h20 = element("h2");
      t2 = text("Experience");
      t3 = space();
      if (if_block) if_block.c();
      t4 = space();

      for (var _i3 = 0; _i3 < each_blocks_1.length; _i3 += 1) {
        each_blocks_1[_i3].c();
      }

      t5 = space();
      section1 = element("section");
      header1 = element("header");
      h21 = element("h2");
      t6 = text("Education");
      t7 = space();

      for (var _i4 = 0; _i4 < each_blocks.length; _i4 += 1) {
        each_blocks[_i4].c();
      }

      t8 = space();
      p = element("p");
      create_component(infoicon.$$.fragment);
      t9 = text("\n    For brevity only the last few years are shown here.\n    ");
      br = element("br");
      t10 = text("\n    See more at tyom.semonov.com.");
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all("[data-svelte=\"svelte-vpsd5d\"]", document_1.head);
      meta0 = claim_element(head_nodes, "META", {
        name: true,
        content: true,
        class: true
      });
      meta1 = claim_element(head_nodes, "META", {
        property: true,
        content: true,
        class: true
      });
      meta2 = claim_element(head_nodes, "META", {
        property: true,
        content: true,
        class: true
      });
      meta3 = claim_element(head_nodes, "META", {
        property: true,
        content: true,
        class: true
      });
      meta4 = claim_element(head_nodes, "META", {
        property: true,
        content: true,
        class: true
      });
      meta5 = claim_element(head_nodes, "META", {
        property: true,
        content: true,
        class: true
      });
      meta6 = claim_element(head_nodes, "META", {
        property: true,
        content: true,
        class: true
      });
      meta7 = claim_element(head_nodes, "META", {
        property: true,
        content: true,
        class: true
      });
      meta8 = claim_element(head_nodes, "META", {
        property: true,
        content: true,
        class: true
      });
      meta9 = claim_element(head_nodes, "META", {
        property: true,
        content: true,
        class: true
      });
      meta10 = claim_element(head_nodes, "META", {
        property: true,
        content: true,
        class: true
      });
      head_nodes.forEach(detach_dev);
      t0 = claim_space(nodes);
      aside = claim_element(nodes, "ASIDE", {
        class: true
      });
      var aside_nodes = children(aside);
      claim_component(summary_1.$$.fragment, aside_nodes);
      aside_nodes.forEach(detach_dev);
      t1 = claim_space(nodes);
      article = claim_element(nodes, "ARTICLE", {
        class: true
      });
      var article_nodes = children(article);
      section0 = claim_element(article_nodes, "SECTION", {
        class: true
      });
      var section0_nodes = children(section0);
      header0 = claim_element(section0_nodes, "HEADER", {
        class: true
      });
      var header0_nodes = children(header0);
      h20 = claim_element(header0_nodes, "H2", {
        class: true
      });
      var h20_nodes = children(h20);
      t2 = claim_text(h20_nodes, "Experience");
      h20_nodes.forEach(detach_dev);
      t3 = claim_space(header0_nodes);
      if (if_block) if_block.l(header0_nodes);
      header0_nodes.forEach(detach_dev);
      t4 = claim_space(section0_nodes);

      for (var _i5 = 0; _i5 < each_blocks_1.length; _i5 += 1) {
        each_blocks_1[_i5].l(section0_nodes);
      }

      section0_nodes.forEach(detach_dev);
      t5 = claim_space(article_nodes);
      section1 = claim_element(article_nodes, "SECTION", {
        class: true
      });
      var section1_nodes = children(section1);
      header1 = claim_element(section1_nodes, "HEADER", {
        class: true
      });
      var header1_nodes = children(header1);
      h21 = claim_element(header1_nodes, "H2", {
        class: true
      });
      var h21_nodes = children(h21);
      t6 = claim_text(h21_nodes, "Education");
      h21_nodes.forEach(detach_dev);
      header1_nodes.forEach(detach_dev);
      t7 = claim_space(section1_nodes);

      for (var _i6 = 0; _i6 < each_blocks.length; _i6 += 1) {
        each_blocks[_i6].l(section1_nodes);
      }

      section1_nodes.forEach(detach_dev);
      t8 = claim_space(article_nodes);
      p = claim_element(article_nodes, "P", {
        class: true
      });
      var p_nodes = children(p);
      claim_component(infoicon.$$.fragment, p_nodes);
      t9 = claim_text(p_nodes, "\n    For brevity only the last few years are shown here.\n    ");
      br = claim_element(p_nodes, "BR", {
        class: true
      });
      t10 = claim_text(p_nodes, "\n    See more at tyom.semonov.com.");
      p_nodes.forEach(detach_dev);
      article_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(meta0, "name", "description");
      attr_dev(meta0, "content", meta0_content_value =
      /*about*/
      ctx[0].description);
      attr_dev(meta0, "class", "svelte-15gx184");
      add_location(meta0, file$c, 134, 2, 6896);
      attr_dev(meta1, "property", "og:type");
      attr_dev(meta1, "content", "website");
      attr_dev(meta1, "class", "svelte-15gx184");
      add_location(meta1, file$c, 136, 2, 6987);
      attr_dev(meta2, "property", "og:url");
      attr_dev(meta2, "content", "https://tyom.semonov.com/");
      attr_dev(meta2, "class", "svelte-15gx184");
      add_location(meta2, file$c, 137, 2, 7035);
      attr_dev(meta3, "property", "og:title");
      attr_dev(meta3, "content", meta3_content_value = "" + (
      /*about*/
      ctx[0].name + " - " +
      /*about*/
      ctx[0].title + ": CV"));
      attr_dev(meta3, "class", "svelte-15gx184");
      add_location(meta3, file$c, 138, 2, 7100);
      attr_dev(meta4, "property", "og:description");
      attr_dev(meta4, "content", meta4_content_value =
      /*about*/
      ctx[0].description);
      attr_dev(meta4, "class", "svelte-15gx184");
      add_location(meta4, file$c, 139, 2, 7174);
      attr_dev(meta5, "property", "og:image");
      attr_dev(meta5, "content", "https://tyom.semonov.com/logo.png");
      attr_dev(meta5, "class", "svelte-15gx184");
      add_location(meta5, file$c, 140, 2, 7239);
      attr_dev(meta6, "property", "twitter:card");
      attr_dev(meta6, "content", "summary_large_image");
      attr_dev(meta6, "class", "svelte-15gx184");
      add_location(meta6, file$c, 142, 2, 7333);
      attr_dev(meta7, "property", "twitter:url");
      attr_dev(meta7, "content", "https://tyom.semonov.com/");
      attr_dev(meta7, "class", "svelte-15gx184");
      add_location(meta7, file$c, 143, 2, 7398);
      attr_dev(meta8, "property", "twitter:title");
      attr_dev(meta8, "content", meta8_content_value = "" + (
      /*about*/
      ctx[0].name + " - " +
      /*about*/
      ctx[0].title + ": CV"));
      attr_dev(meta8, "class", "svelte-15gx184");
      add_location(meta8, file$c, 144, 2, 7468);
      attr_dev(meta9, "property", "twitter:description");
      attr_dev(meta9, "content", meta9_content_value =
      /*about*/
      ctx[0].description);
      attr_dev(meta9, "class", "svelte-15gx184");
      add_location(meta9, file$c, 145, 2, 7547);
      attr_dev(meta10, "property", "twitter:image");
      attr_dev(meta10, "content", "https://tyom.semonov.com/logo.png");
      attr_dev(meta10, "class", "svelte-15gx184");
      add_location(meta10, file$c, 146, 2, 7617);
      attr_dev(aside, "class", "svelte-15gx184");
      add_location(aside, file$c, 149, 0, 7711);
      attr_dev(h20, "class", "svelte-15gx184");
      add_location(h20, file$c, 156, 6, 7862);
      attr_dev(header0, "class", "svelte-15gx184");
      add_location(header0, file$c, 155, 4, 7847);
      attr_dev(section0, "class", "experience svelte-15gx184");
      add_location(section0, file$c, 154, 2, 7814);
      attr_dev(h21, "class", "svelte-15gx184");
      add_location(h21, file$c, 167, 6, 8167);
      attr_dev(header1, "class", "svelte-15gx184");
      add_location(header1, file$c, 166, 4, 8152);
      attr_dev(section1, "class", "education svelte-15gx184");
      add_location(section1, file$c, 165, 2, 8120);
      attr_dev(br, "class", "svelte-15gx184");
      add_location(br, file$c, 177, 4, 8431);
      attr_dev(p, "class", "u-print-only print-details-info svelte-15gx184");
      add_location(p, file$c, 174, 2, 8310);
      attr_dev(article, "class", "content svelte-15gx184");
      add_location(article, file$c, 153, 0, 7786);
    },
    m: function mount(target, anchor) {
      append_dev(document_1.head, meta0);
      append_dev(document_1.head, meta1);
      append_dev(document_1.head, meta2);
      append_dev(document_1.head, meta3);
      append_dev(document_1.head, meta4);
      append_dev(document_1.head, meta5);
      append_dev(document_1.head, meta6);
      append_dev(document_1.head, meta7);
      append_dev(document_1.head, meta8);
      append_dev(document_1.head, meta9);
      append_dev(document_1.head, meta10);
      insert_dev(target, t0, anchor);
      insert_dev(target, aside, anchor);
      mount_component(summary_1, aside, null);
      insert_dev(target, t1, anchor);
      insert_dev(target, article, anchor);
      append_dev(article, section0);
      append_dev(section0, header0);
      append_dev(header0, h20);
      append_dev(h20, t2);
      append_dev(header0, t3);
      if (if_block) if_block.m(header0, null);
      append_dev(section0, t4);

      for (var _i7 = 0; _i7 < each_blocks_1.length; _i7 += 1) {
        each_blocks_1[_i7].m(section0, null);
      }

      append_dev(article, t5);
      append_dev(article, section1);
      append_dev(section1, header1);
      append_dev(header1, h21);
      append_dev(h21, t6);
      append_dev(section1, t7);

      for (var _i8 = 0; _i8 < each_blocks.length; _i8 += 1) {
        each_blocks[_i8].m(section1, null);
      }

      append_dev(article, t8);
      append_dev(article, p);
      mount_component(infoicon, p, null);
      append_dev(p, t9);
      append_dev(p, br);
      append_dev(p, t10);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if ((!current || dirty &
      /*about*/
      1) && title_value !== (title_value = "" + (
      /*about*/
      ctx[0].name + " - " +
      /*about*/
      ctx[0].title + ": CV"))) {
        document_1.title = title_value;
      }

      if (!current || dirty &
      /*about*/
      1 && meta0_content_value !== (meta0_content_value =
      /*about*/
      ctx[0].description)) {
        attr_dev(meta0, "content", meta0_content_value);
      }

      if (!current || dirty &
      /*about*/
      1 && meta3_content_value !== (meta3_content_value = "" + (
      /*about*/
      ctx[0].name + " - " +
      /*about*/
      ctx[0].title + ": CV"))) {
        attr_dev(meta3, "content", meta3_content_value);
      }

      if (!current || dirty &
      /*about*/
      1 && meta4_content_value !== (meta4_content_value =
      /*about*/
      ctx[0].description)) {
        attr_dev(meta4, "content", meta4_content_value);
      }

      if (!current || dirty &
      /*about*/
      1 && meta8_content_value !== (meta8_content_value = "" + (
      /*about*/
      ctx[0].name + " - " +
      /*about*/
      ctx[0].title + ": CV"))) {
        attr_dev(meta8, "content", meta8_content_value);
      }

      if (!current || dirty &
      /*about*/
      1 && meta9_content_value !== (meta9_content_value =
      /*about*/
      ctx[0].description)) {
        attr_dev(meta9, "content", meta9_content_value);
      }

      var summary_1_changes = dirty &
      /*summary*/
      16 ? get_spread_update(summary_1_spread_levels, [get_spread_object(
      /*summary*/
      ctx[4]), summary_1_spread_levels[1]]) : {};
      summary_1.$set(summary_1_changes);

      if (
      /*intersectionNodes*/
      ctx[3]) {
        if (if_block) {
          if_block.p(ctx, dirty);

          if (dirty &
          /*intersectionNodes*/
          8) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$7(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(header0, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, function () {
          if_block = null;
        });
        check_outros();
      }

      if (dirty &
      /*linkedExperienceItems*/
      32) {
        each_value_1 =
        /*linkedExperienceItems*/
        ctx[5];
        validate_each_argument(each_value_1);

        var _i9;

        for (_i9 = 0; _i9 < each_value_1.length; _i9 += 1) {
          var child_ctx = get_each_context_1$3(ctx, each_value_1, _i9);

          if (each_blocks_1[_i9]) {
            each_blocks_1[_i9].p(child_ctx, dirty);

            transition_in(each_blocks_1[_i9], 1);
          } else {
            each_blocks_1[_i9] = create_each_block_1$3(child_ctx);

            each_blocks_1[_i9].c();

            transition_in(each_blocks_1[_i9], 1);

            each_blocks_1[_i9].m(section0, null);
          }
        }

        group_outros();

        for (_i9 = each_value_1.length; _i9 < each_blocks_1.length; _i9 += 1) {
          out(_i9);
        }

        check_outros();
      }

      if (dirty &
      /*educationItems*/
      4) {
        each_value =
        /*educationItems*/
        ctx[2];
        validate_each_argument(each_value);

        var _i10;

        for (_i10 = 0; _i10 < each_value.length; _i10 += 1) {
          var _child_ctx = get_each_context$4(ctx, each_value, _i10);

          if (each_blocks[_i10]) {
            each_blocks[_i10].p(_child_ctx, dirty);

            transition_in(each_blocks[_i10], 1);
          } else {
            each_blocks[_i10] = create_each_block$4(_child_ctx);

            each_blocks[_i10].c();

            transition_in(each_blocks[_i10], 1);

            each_blocks[_i10].m(section1, null);
          }
        }

        group_outros();

        for (_i10 = each_value.length; _i10 < each_blocks.length; _i10 += 1) {
          out_1(_i10);
        }

        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(summary_1.$$.fragment, local);
      transition_in(if_block);

      for (var _i11 = 0; _i11 < each_value_1.length; _i11 += 1) {
        transition_in(each_blocks_1[_i11]);
      }

      for (var _i12 = 0; _i12 < each_value.length; _i12 += 1) {
        transition_in(each_blocks[_i12]);
      }

      transition_in(infoicon.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(summary_1.$$.fragment, local);
      transition_out(if_block);
      each_blocks_1 = each_blocks_1.filter(Boolean);

      for (var _i13 = 0; _i13 < each_blocks_1.length; _i13 += 1) {
        transition_out(each_blocks_1[_i13]);
      }

      each_blocks = each_blocks.filter(Boolean);

      for (var _i14 = 0; _i14 < each_blocks.length; _i14 += 1) {
        transition_out(each_blocks[_i14]);
      }

      transition_out(infoicon.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      detach_dev(meta0);
      detach_dev(meta1);
      detach_dev(meta2);
      detach_dev(meta3);
      detach_dev(meta4);
      detach_dev(meta5);
      detach_dev(meta6);
      detach_dev(meta7);
      detach_dev(meta8);
      detach_dev(meta9);
      detach_dev(meta10);
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(aside);
      destroy_component(summary_1);
      if (detaching) detach_dev(t1);
      if (detaching) detach_dev(article);
      if (if_block) if_block.d();
      destroy_each(each_blocks_1, detaching);
      destroy_each(each_blocks, detaching);
      destroy_component(infoicon);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$d.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function preload() {
  return _preload.apply(this, arguments);
}

function _preload() {
  _preload = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
    var _this2 = this;

    var getData, about, experienceItems, educationItems, definitions;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            getData = function getData(resourceName) {
              return _this2.fetch(resourceName).then(function (res) {
                return res.json();
              });
            };

            _context.next = 3;
            return getData("about.json");

          case 3:
            about = _context.sent;
            _context.next = 6;
            return getData("experience.json");

          case 6:
            experienceItems = _context.sent;
            _context.next = 9;
            return getData("education.json");

          case 9:
            educationItems = _context.sent;
            _context.next = 12;
            return getData("definitions.json");

          case 12:
            definitions = _context.sent;
            return _context.abrupt("return", {
              about: about,
              experienceItems: experienceItems,
              educationItems: educationItems,
              definitions: definitions
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _preload.apply(this, arguments);
}

function instance$d($$self, $$props, $$invalidate) {
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Routes", slots, []);
  var about = $$props.about;
  var experienceItems = $$props.experienceItems;
  var educationItems = $$props.educationItems;
  var definitions = $$props.definitions;
  var defLinker = createDefinitionFinder(definitions);
  var coreSkills = buildList(about.coreSkills, defLinker);
  var currentInterests = buildList(about.currentInterests, defLinker);
  var summary = Object.assign({}, about, {
    coreSkills: coreSkills,
    currentInterests: currentInterests
  });
  delete summary.description;
  var linkedExperienceItems = experienceItems.map(function (item) {
    return Object.assign({}, item, {
      technologies: buildList(item.technologies, defLinker)
    });
  });
  var experienceSectionEl;
  var intersectionNodes;
  onMount(function () {
    $$invalidate(3, intersectionNodes = document.querySelectorAll(".experience .experience-item"));
  });
  var writable_props = ["about", "experienceItems", "educationItems", "definitions"];
  Object_1$3.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Routes> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$$set = function ($$props) {
    if ("about" in $$props) $$invalidate(0, about = $$props.about);
    if ("experienceItems" in $$props) $$invalidate(1, experienceItems = $$props.experienceItems);
    if ("educationItems" in $$props) $$invalidate(2, educationItems = $$props.educationItems);
    if ("definitions" in $$props) $$invalidate(6, definitions = $$props.definitions);
  };

  $$self.$capture_state = function () {
    return {
      preload: preload,
      onMount: onMount,
      buildList: buildList,
      createDefinitionFinder: createDefinitionFinder,
      InfoIcon: FaInfoCircle,
      ExperienceItem: ExperienceItem,
      Summary: Summary,
      Timeline: Timeline,
      about: about,
      experienceItems: experienceItems,
      educationItems: educationItems,
      definitions: definitions,
      defLinker: defLinker,
      coreSkills: coreSkills,
      currentInterests: currentInterests,
      summary: summary,
      linkedExperienceItems: linkedExperienceItems,
      experienceSectionEl: experienceSectionEl,
      intersectionNodes: intersectionNodes
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("about" in $$props) $$invalidate(0, about = $$props.about);
    if ("experienceItems" in $$props) $$invalidate(1, experienceItems = $$props.experienceItems);
    if ("educationItems" in $$props) $$invalidate(2, educationItems = $$props.educationItems);
    if ("definitions" in $$props) $$invalidate(6, definitions = $$props.definitions);
    if ("experienceSectionEl" in $$props) experienceSectionEl = $$props.experienceSectionEl;
    if ("intersectionNodes" in $$props) $$invalidate(3, intersectionNodes = $$props.intersectionNodes);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [about, experienceItems, educationItems, intersectionNodes, summary, linkedExperienceItems, definitions];
}

var Routes = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Routes, _SvelteComponentDev);

  var _super = _createSuper$d(Routes);

  function Routes(options) {
    var _this;

    _classCallCheck(this, Routes);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$d, create_fragment$d, safe_not_equal, {
      about: 0,
      experienceItems: 1,
      educationItems: 2,
      definitions: 6
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Routes",
      options: options,
      id: create_fragment$d.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*about*/
    ctx[0] === undefined && !("about" in props)) {
      console.warn("<Routes> was created without expected prop 'about'");
    }

    if (
    /*experienceItems*/
    ctx[1] === undefined && !("experienceItems" in props)) {
      console.warn("<Routes> was created without expected prop 'experienceItems'");
    }

    if (
    /*educationItems*/
    ctx[2] === undefined && !("educationItems" in props)) {
      console.warn("<Routes> was created without expected prop 'educationItems'");
    }

    if (
    /*definitions*/
    ctx[6] === undefined && !("definitions" in props)) {
      console.warn("<Routes> was created without expected prop 'definitions'");
    }

    return _this;
  }

  _createClass(Routes, [{
    key: "about",
    get: function get() {
      throw new Error("<Routes>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Routes>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "experienceItems",
    get: function get() {
      throw new Error("<Routes>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Routes>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "educationItems",
    get: function get() {
      throw new Error("<Routes>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Routes>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "definitions",
    get: function get() {
      throw new Error("<Routes>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Routes>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Routes;
}(SvelteComponentDev);

export default Routes;
export { preload };
