import { N as _typeof, O as _slicedToArray, _ as _inherits, a as _classCallCheck, b as _possibleConstructorReturn, c as _getPrototypeOf, i as init, s as safe_not_equal, d as _assertThisInitialized, e as dispatch_dev, r as _createClass, S as SvelteComponentDev, f as create_slot, P as svg_element, v as text, h as claim_element, j as children, w as claim_text, k as detach_dev, l as add_location, m as insert_dev, x as append_dev, y as set_data_dev, A as empty, C as attr_dev, o as get_slot_changes, p as get_slot_context, t as transition_in, q as transition_out, D as assign, Q as _defineProperty, R as exclude_internal_props, E as mount_component, F as get_spread_update, G as get_spread_object, H as destroy_component, g as element, L as _asyncToGenerator, M as _regeneratorRuntime, T as listen, u as globals, J as group_outros, K as check_outros, U as destroy_each, n as noop, z as space, B as claim_space, V as toggle_class, W as onMount, X as onDestroy, Y as add_render_callback, Z as create_bidirectional_transition, $ as set_style, a0 as _toConsumableArray } from './index.d976ff0f.js';

/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
function isObject(val) {
  return val != null && _typeof(val) === 'object' && Array.isArray(val) === false;
}

/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

function isObjectObject(o) {
  return isObject(o) === true && Object.prototype.toString.call(o) === '[object Object]';
}

function isPlainObject(o) {
  var ctor, prot;
  if (isObjectObject(o) === false) return false; // If has modified constructor

  ctor = o.constructor;
  if (typeof ctor !== 'function') return false; // If has modified prototype

  prot = ctor.prototype;
  if (isObjectObject(prot) === false) return false; // If constructor does not have an Object-specific method

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
  var endDate = new Date("".concat(toDate.year, "-").concat(pad(months.indexOf(toDate.month))));
  return endDate.getMonth() - startDate.getMonth() + 12 * (endDate.getFullYear() - startDate.getFullYear());
}
function durationInMonths(fromDate, toDate) {
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

var file = "node_modules/svelte-icons/components/IconBase.svelte"; // (19:2) {#if title}

function create_if_block(ctx) {
  var title_1, t;
  var block = {
    c: function create() {
      title_1 = svg_element("title");
      t = text(ctx.title);
      this.h();
    },
    l: function claim(nodes) {
      title_1 = claim_element(nodes, "title", {}, true);
      var title_1_nodes = children(title_1);
      t = claim_text(title_1_nodes, ctx.title);
      title_1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(title_1, file, 19, 4, 912);
    },
    m: function mount(target, anchor) {
      insert_dev(target, title_1, anchor);
      append_dev(title_1, t);
    },
    p: function update(changed, ctx) {
      if (changed.title) {
        set_data_dev(t, ctx.title);
      }
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(title_1);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block.name,
    type: "if",
    source: "(19:2) {#if title}",
    ctx: ctx
  });
  return block;
}

function create_fragment(ctx) {
  var svg, if_block_anchor, current;
  var if_block = ctx.title && create_if_block(ctx);
  var default_slot_template = ctx.$$slots.default;
  var default_slot = create_slot(default_slot_template, ctx, null);
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
      }, true);
      var svg_nodes = children(svg);
      if (if_block) if_block.l(svg_nodes);
      if_block_anchor = empty();
      if (default_slot) default_slot.l(svg_nodes);
      svg_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr_dev(svg, "viewBox", ctx.viewBox);
      attr_dev(svg, "class", "svelte-1b3s8r4");
      add_location(svg, file, 17, 0, 843);
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
    p: function update(changed, ctx) {
      if (ctx.title) {
        if (if_block) {
          if_block.p(changed, ctx);
        } else {
          if_block = create_if_block(ctx);
          if_block.c();
          if_block.m(svg, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }

      if (default_slot && default_slot.p && changed.$$scope) {
        default_slot.p(get_slot_changes(default_slot_template, ctx, changed, null), get_slot_context(default_slot_template, ctx, null));
      }

      if (!current || changed.viewBox) {
        attr_dev(svg, "viewBox", ctx.viewBox);
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
      if (detaching) {
        detach_dev(svg);
      }

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
  var _$$props$title = $$props.title,
      title = _$$props$title === void 0 ? null : _$$props$title,
      viewBox = $$props.viewBox;
  var writable_props = ['title', 'viewBox'];
  Object.keys($$props).forEach(function (key) {
    if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn("<IconBase> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;

  $$self.$set = function ($$props) {
    if ('title' in $$props) $$invalidate('title', title = $$props.title);
    if ('viewBox' in $$props) $$invalidate('viewBox', viewBox = $$props.viewBox);
    if ('$$scope' in $$props) $$invalidate('$$scope', $$scope = $$props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      title: title,
      viewBox: viewBox
    };
  };

  $$self.$inject_state = function ($$props) {
    if ('title' in $$props) $$invalidate('title', title = $$props.title);
    if ('viewBox' in $$props) $$invalidate('viewBox', viewBox = $$props.viewBox);
  };

  return {
    title: title,
    viewBox: viewBox,
    $$slots: $$slots,
    $$scope: $$scope
  };
}

var IconBase =
/*#__PURE__*/
function (_SvelteComponentDev) {
  _inherits(IconBase, _SvelteComponentDev);

  function IconBase(options) {
    var _this;

    _classCallCheck(this, IconBase);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(IconBase).call(this, options));
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, ["title", "viewBox"]);
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "IconBase",
      options: options,
      id: create_fragment.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (ctx.viewBox === undefined && !('viewBox' in props)) {
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
      }, true);
      var path_nodes = children(path);
      path_nodes.forEach(detach_dev);
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
      if (detaching) {
        detach_dev(path);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot.name,
    type: "slot",
    source: "(4:8) <IconBase viewBox=\"0 0 512 512\" {...$$props}>",
    ctx: ctx
  });
  return block;
}

function create_fragment$1(ctx) {
  var current;
  var iconbase_spread_levels = [{
    viewBox: "0 0 512 512"
  }, ctx.$$props];
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

  var iconbase = new IconBase({
    props: iconbase_props,
    $$inline: true
  });
  var block = {
    c: function create() {
      iconbase.$$.fragment.c();
    },
    l: function claim(nodes) {
      iconbase.$$.fragment.l(nodes);
    },
    m: function mount(target, anchor) {
      mount_component(iconbase, target, anchor);
      current = true;
    },
    p: function update(changed, ctx) {
      var iconbase_changes = changed.$$props ? get_spread_update(iconbase_spread_levels, [iconbase_spread_levels[0], get_spread_object(ctx.$$props)]) : {};
      if (changed.$$scope) iconbase_changes.$$scope = {
        changed: changed,
        ctx: ctx
      };
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
  $$self.$set = function ($$new_props) {
    $$invalidate('$$props', $$props = assign(assign({}, $$props), $$new_props));
  };

  $$self.$capture_state = function () {
    return {};
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate('$$props', $$props = assign(assign({}, $$props), $$new_props));
  };

  return _defineProperty({
    $$props: $$props
  }, "$$props", $$props = exclude_internal_props($$props));
}

var FaInfoCircle =
/*#__PURE__*/
function (_SvelteComponentDev) {
  _inherits(FaInfoCircle, _SvelteComponentDev);

  function FaInfoCircle(options) {
    var _this;

    _classCallCheck(this, FaInfoCircle);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FaInfoCircle).call(this, options));
    init(_assertThisInitialized(_this), options, instance$1, create_fragment$1, safe_not_equal, []);
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
 * @version 1.15.0
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
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
var timeoutDuration = 0;

for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
  if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
    timeoutDuration = 1;
    break;
  }
}

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
  return parseFloat(styles['border' + sideA + 'Width'], 10) + parseFloat(styles['border' + sideB + 'Width'], 10);
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
  var width = sizes.width || element.clientWidth || result.right - result.left;
  var height = sizes.height || element.clientHeight || result.bottom - result.top;
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
  var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
  var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10); // In cases where the parent is fixed, we must ignore negative scroll in offset calc

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
    var marginTop = parseFloat(styles.marginTop, 10);
    var marginLeft = parseFloat(styles.marginLeft, 10);
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
  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference); // Handle viewport case

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
  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);
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

  this.disableEventListeners(); // remove the popper if user explicity asked for the deletion on destroy
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
  var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);
  var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width'], 10);
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

var file$2 = "src/components/LinkWithPreview.svelte";

function create_fragment$2(ctx) {
  var a, tooltip_action, current;
  var default_slot_template = ctx.$$slots.default;
  var default_slot = create_slot(default_slot_template, ctx, null);
  var block = {
    c: function create() {
      a = element("a");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      a = claim_element(nodes, "A", {
        href: true
      }, false);
      var a_nodes = children(a);
      if (default_slot) default_slot.l(a_nodes);
      a_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(a, "href", ctx.href);
      add_location(a, file$2, 128, 0, 6478);
    },
    m: function mount(target, anchor) {
      insert_dev(target, a, anchor);

      if (default_slot) {
        default_slot.m(a, null);
      }

      tooltip_action = ctx.tooltip.call(null, a, {
        text: ctx.description,
        url: ctx.descriptionUrl,
        resultProp: 'extract'
      }) || {};
      current = true;
    },
    p: function update(changed, ctx) {
      if (default_slot && default_slot.p && changed.$$scope) {
        default_slot.p(get_slot_changes(default_slot_template, ctx, changed, null), get_slot_context(default_slot_template, ctx, null));
      }

      if (!current || changed.href) {
        attr_dev(a, "href", ctx.href);
      }

      if (typeof tooltip_action.update === 'function' && (changed.description || changed.descriptionUrl)) {
        tooltip_action.update.call(null, {
          text: ctx.description,
          url: ctx.descriptionUrl,
          resultProp: 'extract'
        });
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
      if (detaching) {
        detach_dev(a);
      }

      if (default_slot) default_slot.d(detaching);
      if (tooltip_action && typeof tooltip_action.destroy === 'function') tooltip_action.destroy();
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
  var tooltipText;

  function tooltip(_x, _x2) {
    return _tooltip.apply(this, arguments);
  }

  function _tooltip() {
    _tooltip = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee2(node, _ref) {
      var text, url, resultProp, el, arrowEl, append, _append, remove, cancelMouseEnter, cancelMouseLeave;

      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              remove = function _ref4() {
                el.remove();
              };

              _append = function _ref3() {
                _append = _asyncToGenerator(
                /*#__PURE__*/
                _regeneratorRuntime.mark(function _callee() {
                  var result;
                  return _regeneratorRuntime.wrap(function _callee$(_context) {
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

              append = function _ref2() {
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
              tooltipText = text || tooltipText;
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

  var href = $$props.href,
      description = $$props.description,
      descriptionUrl = $$props.descriptionUrl;
  var writable_props = ['href', 'description', 'descriptionUrl'];
  Object.keys($$props).forEach(function (key) {
    if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn("<LinkWithPreview> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;

  $$self.$set = function ($$props) {
    if ('href' in $$props) $$invalidate('href', href = $$props.href);
    if ('description' in $$props) $$invalidate('description', description = $$props.description);
    if ('descriptionUrl' in $$props) $$invalidate('descriptionUrl', descriptionUrl = $$props.descriptionUrl);
    if ('$$scope' in $$props) $$invalidate('$$scope', $$scope = $$props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      tooltipText: tooltipText,
      href: href,
      description: description,
      descriptionUrl: descriptionUrl
    };
  };

  $$self.$inject_state = function ($$props) {
    if ('tooltipText' in $$props) tooltipText = $$props.tooltipText;
    if ('href' in $$props) $$invalidate('href', href = $$props.href);
    if ('description' in $$props) $$invalidate('description', description = $$props.description);
    if ('descriptionUrl' in $$props) $$invalidate('descriptionUrl', descriptionUrl = $$props.descriptionUrl);
  };

  return {
    tooltip: tooltip,
    href: href,
    description: description,
    descriptionUrl: descriptionUrl,
    $$slots: $$slots,
    $$scope: $$scope
  };
}

var LinkWithPreview =
/*#__PURE__*/
function (_SvelteComponentDev) {
  _inherits(LinkWithPreview, _SvelteComponentDev);

  function LinkWithPreview(options) {
    var _this;

    _classCallCheck(this, LinkWithPreview);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LinkWithPreview).call(this, options));
    init(_assertThisInitialized(_this), options, instance$2, create_fragment$2, safe_not_equal, ["href", "description", "descriptionUrl"]);
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "LinkWithPreview",
      options: options,
      id: create_fragment$2.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (ctx.href === undefined && !('href' in props)) {
      console.warn("<LinkWithPreview> was created without expected prop 'href'");
    }

    if (ctx.description === undefined && !('description' in props)) {
      console.warn("<LinkWithPreview> was created without expected prop 'description'");
    }

    if (ctx.descriptionUrl === undefined && !('descriptionUrl' in props)) {
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

var Object_1 = globals.Object;

function get_each_context_1(ctx, list, i) {
  var child_ctx = Object_1.create(ctx);
  child_ctx.link = list[i];
  child_ctx.idx = i;
  return child_ctx;
}

function get_each_context(ctx, list, i) {
  var child_ctx = Object_1.create(ctx);
  child_ctx.item = list[i];
  child_ctx.idx = i;
  return child_ctx;
} // (19:2) {:else}


function create_else_block_1(ctx) {
  var t0_value = ctx.getPlainItemName(ctx.item) + "",
      t0,
      t1_value = ctx.separator(ctx.idx, ctx.items) + "",
      t1,
      current;
  var if_block = ctx.item.children && create_if_block_3(ctx);
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
    p: function update(changed, ctx) {
      if ((!current || changed.items) && t0_value !== (t0_value = ctx.getPlainItemName(ctx.item) + "")) {
        set_data_dev(t0, t0_value);
      }

      if (ctx.item.children) {
        if (if_block) {
          if_block.p(changed, ctx);
          transition_in(if_block, 1);
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

      if ((!current || changed.items) && t1_value !== (t1_value = ctx.separator(ctx.idx, ctx.items) + "")) {
        set_data_dev(t1, t1_value);
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
      if (detaching) {
        detach_dev(t0);
      }

      if (if_block) if_block.d(detaching);

      if (detaching) {
        detach_dev(t1);
      }
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
  var each_1_anchor,
      t_value = ctx.separator(ctx.idx, ctx.items) + "",
      t,
      current;
  var each_value_1 = ctx.item.links;
  var each_blocks = [];

  for (var i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }

  var out = function out(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };

  var if_block = ctx.item.children && create_if_block_1(ctx);
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
    p: function update(changed, ctx) {
      if (changed.separator || changed.items) {
        each_value_1 = ctx.item.links;

        var _i4;

        for (_i4 = 0; _i4 < each_value_1.length; _i4 += 1) {
          var child_ctx = get_each_context_1(ctx, each_value_1, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(changed, child_ctx);

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

      if (ctx.item.children) {
        if (if_block) {
          if_block.p(changed, ctx);
          transition_in(if_block, 1);
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

      if ((!current || changed.items) && t_value !== (t_value = ctx.separator(ctx.idx, ctx.items) + "")) {
        set_data_dev(t, t_value);
      }
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

      if (detaching) {
        detach_dev(each_1_anchor);
      }

      if (if_block) if_block.d(detaching);

      if (detaching) {
        detach_dev(t);
      }
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
  var t0_value = ' ' + "",
      t0,
      t1,
      t2,
      current;
  var inlinelist = new InlineList({
    props: {
      items: ctx.item.children
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      t0 = text(t0_value);
      t1 = text("(");
      inlinelist.$$.fragment.c();
      t2 = text(")");
    },
    l: function claim(nodes) {
      t0 = claim_text(nodes, t0_value);
      t1 = claim_text(nodes, "(");
      inlinelist.$$.fragment.l(nodes);
      t2 = claim_text(nodes, ")");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, t1, anchor);
      mount_component(inlinelist, target, anchor);
      insert_dev(target, t2, anchor);
      current = true;
    },
    p: function update(changed, ctx) {
      var inlinelist_changes = {};
      if (changed.items) inlinelist_changes.items = ctx.item.children;
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
      if (detaching) {
        detach_dev(t0);
        detach_dev(t1);
      }

      destroy_component(inlinelist, detaching);

      if (detaching) {
        detach_dev(t2);
      }
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
  var t_value = ctx.link.name + "",
      t;
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
    p: function update(changed, ctx) {
      if (changed.items && t_value !== (t_value = ctx.link.name + "")) {
        set_data_dev(t, t_value);
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
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
  var current;
  var linkwithpreview = new LinkWithPreview({
    props: {
      href: ctx.link.url,
      descriptionUrl: ctx.link.wikipedia,
      description: ctx.link.description,
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
      linkwithpreview.$$.fragment.c();
    },
    l: function claim(nodes) {
      linkwithpreview.$$.fragment.l(nodes);
    },
    m: function mount(target, anchor) {
      mount_component(linkwithpreview, target, anchor);
      current = true;
    },
    p: function update(changed, ctx) {
      var linkwithpreview_changes = {};
      if (changed.items) linkwithpreview_changes.href = ctx.link.url;
      if (changed.items) linkwithpreview_changes.descriptionUrl = ctx.link.wikipedia;
      if (changed.items) linkwithpreview_changes.description = ctx.link.description;
      if (changed.$$scope || changed.items) linkwithpreview_changes.$$scope = {
        changed: changed,
        ctx: ctx
      };
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
  var t_value = ctx.link.name + "",
      t;
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
    p: function update(changed, ctx) {
      if (changed.items && t_value !== (t_value = ctx.link.name + "")) {
        set_data_dev(t, t_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
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
  var current_block_type_index,
      if_block,
      t_value = ctx.separator(ctx.idx, ctx.item.links) + "",
      t,
      current;
  var if_block_creators = [create_if_block_2, create_else_block];
  var if_blocks = [];

  function select_block_type_1(changed, ctx) {
    if (ctx.link.url) return 0;
    return 1;
  }

  current_block_type_index = select_block_type_1(null, ctx);
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
    p: function update(changed, ctx) {
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_1(changed, ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(changed, ctx);
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

      if ((!current || changed.items) && t_value !== (t_value = ctx.separator(ctx.idx, ctx.item.links) + "")) {
        set_data_dev(t, t_value);
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

      if (detaching) {
        detach_dev(t);
      }
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
  var t0_value = ' ' + "",
      t0,
      t1,
      t2,
      current;
  var inlinelist = new InlineList({
    props: {
      items: ctx.item.children
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      t0 = text(t0_value);
      t1 = text("(");
      inlinelist.$$.fragment.c();
      t2 = text(")");
    },
    l: function claim(nodes) {
      t0 = claim_text(nodes, t0_value);
      t1 = claim_text(nodes, "(");
      inlinelist.$$.fragment.l(nodes);
      t2 = claim_text(nodes, ")");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, t1, anchor);
      mount_component(inlinelist, target, anchor);
      insert_dev(target, t2, anchor);
      current = true;
    },
    p: function update(changed, ctx) {
      var inlinelist_changes = {};
      if (changed.items) inlinelist_changes.items = ctx.item.children;
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
      if (detaching) {
        detach_dev(t0);
        detach_dev(t1);
      }

      destroy_component(inlinelist, detaching);

      if (detaching) {
        detach_dev(t2);
      }
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
  var current_block_type_index, if_block, if_block_anchor, current;
  var if_block_creators = [create_if_block$1, create_else_block_1];
  var if_blocks = [];

  function select_block_type(changed, ctx) {
    if (ctx.item.links) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(null, ctx);
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
    p: function update(changed, ctx) {
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(changed, ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(changed, ctx);
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

      if (detaching) {
        detach_dev(if_block_anchor);
      }
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
  var each_1_anchor, current;
  var each_value = ctx.items;
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
    p: function update(changed, ctx) {
      if (changed.items || changed.separator || changed.getPlainItemName) {
        each_value = ctx.items;

        var _i10;

        for (_i10 = 0; _i10 < each_value.length; _i10 += 1) {
          var child_ctx = get_each_context(ctx, each_value, _i10);

          if (each_blocks[_i10]) {
            each_blocks[_i10].p(changed, child_ctx);

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

      if (detaching) {
        detach_dev(each_1_anchor);
      }
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
  var _$$props$items = $$props.items,
      items = _$$props$items === void 0 ? [] : _$$props$items;

  var separator = function separator(idx, list) {
    return idx < list.length - 1 ? ', ' : '';
  };

  var getPlainItemName = function getPlainItemName(item) {
    if (typeof item.name === 'string') {
      return item.name;
    }

    var _Object$entries$ = _slicedToArray(Object.entries(item.name)[0], 2),
        parentName = _Object$entries$[0],
        children = _Object$entries$[1];

    return "".concat(parentName, " (").concat(children.join(', '), ")");
  };

  var writable_props = ['items'];
  Object_1.keys($$props).forEach(function (key) {
    if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn("<InlineList> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$set = function ($$props) {
    if ('items' in $$props) $$invalidate('items', items = $$props.items);
  };

  $$self.$capture_state = function () {
    return {
      items: items
    };
  };

  $$self.$inject_state = function ($$props) {
    if ('items' in $$props) $$invalidate('items', items = $$props.items);
  };

  return {
    items: items,
    separator: separator,
    getPlainItemName: getPlainItemName
  };
}

var InlineList =
/*#__PURE__*/
function (_SvelteComponentDev) {
  _inherits(InlineList, _SvelteComponentDev);

  function InlineList(options) {
    var _this;

    _classCallCheck(this, InlineList);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InlineList).call(this, options));
    init(_assertThisInitialized(_this), options, instance$3, create_fragment$3, safe_not_equal, ["items"]);
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

var file$3 = "src/components/List/BlockList.svelte";

function get_each_context_1$1(ctx, list, i) {
  var child_ctx = Object.create(ctx);
  child_ctx.link = list[i];
  child_ctx.idx = i;
  return child_ctx;
}

function get_each_context$1(ctx, list, i) {
  var child_ctx = Object.create(ctx);
  child_ctx.item = list[i];
  return child_ctx;
} // (28:6) {:else}


function create_else_block_1$1(ctx) {
  var t_value = ctx.item.name + "",
      t;
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
    p: function update(changed, ctx) {
      if (changed.items && t_value !== (t_value = ctx.item.name + "")) {
        set_data_dev(t, t_value);
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block_1$1.name,
    type: "else",
    source: "(28:6) {:else}",
    ctx: ctx
  });
  return block;
} // (24:6) {#if item.links}


function create_if_block$2(ctx) {
  var each_1_anchor, current;
  var each_value_1 = ctx.item.links;
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
    p: function update(changed, ctx) {
      if (changed.separator || changed.items) {
        each_value_1 = ctx.item.links;

        var _i4;

        for (_i4 = 0; _i4 < each_value_1.length; _i4 += 1) {
          var child_ctx = get_each_context_1$1(ctx, each_value_1, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(changed, child_ctx);

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

      if (detaching) {
        detach_dev(each_1_anchor);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$2.name,
    type: "if",
    source: "(24:6) {#if item.links}",
    ctx: ctx
  });
  return block;
} // (26:149) {:else}


function create_else_block$1(ctx) {
  var t_value = ctx.link.name + "",
      t;
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
    p: function update(changed, ctx) {
      if (changed.items && t_value !== (t_value = ctx.link.name + "")) {
        set_data_dev(t, t_value);
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block$1.name,
    type: "else",
    source: "(26:149) {:else}",
    ctx: ctx
  });
  return block;
} // (26:10) {#if link.url}


function create_if_block_1$1(ctx) {
  var current;
  var linkwithpreview = new LinkWithPreview({
    props: {
      href: ctx.link.url,
      descriptionUrl: ctx.link.wikipedia,
      description: ctx.link.description,
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
      linkwithpreview.$$.fragment.c();
    },
    l: function claim(nodes) {
      linkwithpreview.$$.fragment.l(nodes);
    },
    m: function mount(target, anchor) {
      mount_component(linkwithpreview, target, anchor);
      current = true;
    },
    p: function update(changed, ctx) {
      var linkwithpreview_changes = {};
      if (changed.items) linkwithpreview_changes.href = ctx.link.url;
      if (changed.items) linkwithpreview_changes.descriptionUrl = ctx.link.wikipedia;
      if (changed.items) linkwithpreview_changes.description = ctx.link.description;
      if (changed.$$scope || changed.items) linkwithpreview_changes.$$scope = {
        changed: changed,
        ctx: ctx
      };
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
    id: create_if_block_1$1.name,
    type: "if",
    source: "(26:10) {#if link.url}",
    ctx: ctx
  });
  return block;
} // (26:24) <LinkWithPreview href={link.url} descriptionUrl={link.wikipedia} description={link.description}>


function create_default_slot$2(ctx) {
  var t_value = ctx.link.name + "",
      t;
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
    p: function update(changed, ctx) {
      if (changed.items && t_value !== (t_value = ctx.link.name + "")) {
        set_data_dev(t, t_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(t);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot$2.name,
    type: "slot",
    source: "(26:24) <LinkWithPreview href={link.url} descriptionUrl={link.wikipedia} description={link.description}>",
    ctx: ctx
  });
  return block;
} // (25:8) {#each item.links as link, idx}


function create_each_block_1$1(ctx) {
  var current_block_type_index,
      if_block,
      t_value = ctx.separator(ctx.idx, ctx.item.links) + "",
      t,
      current;
  var if_block_creators = [create_if_block_1$1, create_else_block$1];
  var if_blocks = [];

  function select_block_type_1(changed, ctx) {
    if (ctx.link.url) return 0;
    return 1;
  }

  current_block_type_index = select_block_type_1(null, ctx);
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
    p: function update(changed, ctx) {
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_1(changed, ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(changed, ctx);
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

      if ((!current || changed.items) && t_value !== (t_value = ctx.separator(ctx.idx, ctx.item.links) + "")) {
        set_data_dev(t, t_value);
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

      if (detaching) {
        detach_dev(t);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_1$1.name,
    type: "each",
    source: "(25:8) {#each item.links as link, idx}",
    ctx: ctx
  });
  return block;
} // (22:2) {#each items as item}


function create_each_block$1(ctx) {
  var li, current_block_type_index, if_block, t0, t1, current;
  var if_block_creators = [create_if_block$2, create_else_block_1$1];
  var if_blocks = [];

  function select_block_type(changed, ctx) {
    if (ctx.item.links) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(null, ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var blocklist = new BlockList({
    props: {
      items: ctx.item.children
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      li = element("li");
      if_block.c();
      t0 = space();
      blocklist.$$.fragment.c();
      t1 = space();
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {}, false);
      var li_nodes = children(li);
      if_block.l(li_nodes);
      t0 = claim_space(li_nodes);
      blocklist.$$.fragment.l(li_nodes);
      t1 = claim_space(li_nodes);
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(li, file$3, 22, 4, 812);
    },
    m: function mount(target, anchor) {
      insert_dev(target, li, anchor);
      if_blocks[current_block_type_index].m(li, null);
      append_dev(li, t0);
      mount_component(blocklist, li, null);
      append_dev(li, t1);
      current = true;
    },
    p: function update(changed, ctx) {
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(changed, ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(changed, ctx);
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
        if_block.m(li, t0);
      }

      var blocklist_changes = {};
      if (changed.items) blocklist_changes.items = ctx.item.children;
      blocklist.$set(blocklist_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      transition_in(blocklist.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      transition_out(blocklist.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(li);
      }

      if_blocks[current_block_type_index].d();
      destroy_component(blocklist);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block$1.name,
    type: "each",
    source: "(22:2) {#each items as item}",
    ctx: ctx
  });
  return block;
}

function create_fragment$4(ctx) {
  var ul, current;
  var each_value = ctx.items;
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
      }, false);
      var ul_nodes = children(ul);

      for (var _i8 = 0; _i8 < each_blocks.length; _i8 += 1) {
        each_blocks[_i8].l(ul_nodes);
      }

      ul_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(ul, "class", "plain-list svelte-8qcibv");
      add_location(ul, file$3, 20, 0, 760);
    },
    m: function mount(target, anchor) {
      insert_dev(target, ul, anchor);

      for (var _i9 = 0; _i9 < each_blocks.length; _i9 += 1) {
        each_blocks[_i9].m(ul, null);
      }

      current = true;
    },
    p: function update(changed, ctx) {
      if (changed.items || changed.separator) {
        each_value = ctx.items;

        var _i10;

        for (_i10 = 0; _i10 < each_value.length; _i10 += 1) {
          var child_ctx = get_each_context$1(ctx, each_value, _i10);

          if (each_blocks[_i10]) {
            each_blocks[_i10].p(changed, child_ctx);

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
      if (detaching) {
        detach_dev(ul);
      }

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
  var _$$props$items = $$props.items,
      items = _$$props$items === void 0 ? [] : _$$props$items;

  var separator = function separator(idx, list) {
    return idx < list.length - 1 ? ', ' : '';
  };

  var writable_props = ['items'];
  Object.keys($$props).forEach(function (key) {
    if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn("<BlockList> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$set = function ($$props) {
    if ('items' in $$props) $$invalidate('items', items = $$props.items);
  };

  $$self.$capture_state = function () {
    return {
      items: items
    };
  };

  $$self.$inject_state = function ($$props) {
    if ('items' in $$props) $$invalidate('items', items = $$props.items);
  };

  return {
    items: items,
    separator: separator
  };
}

var BlockList =
/*#__PURE__*/
function (_SvelteComponentDev) {
  _inherits(BlockList, _SvelteComponentDev);

  function BlockList(options) {
    var _this;

    _classCallCheck(this, BlockList);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BlockList).call(this, options));
    init(_assertThisInitialized(_this), options, instance$4, create_fragment$4, safe_not_equal, ["items"]);
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

var file$4 = "src/components/List/List.svelte"; // (17:0) {:else}

function create_else_block$2(ctx) {
  var current;
  var blocklist = new BlockList({
    props: {
      items: ctx.formattedList
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      blocklist.$$.fragment.c();
    },
    l: function claim(nodes) {
      blocklist.$$.fragment.l(nodes);
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
  var div, current;
  var inlinelist = new InlineList({
    props: {
      items: ctx.formattedList
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      div = element("div");
      inlinelist.$$.fragment.c();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      }, false);
      var div_nodes = children(div);
      inlinelist.$$.fragment.l(div_nodes);
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
      if (detaching) {
        detach_dev(div);
      }

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
  var current_block_type_index, if_block, if_block_anchor, current;
  var if_block_creators = [create_if_block$3, create_else_block$2];
  var if_blocks = [];

  function select_block_type(changed, ctx) {
    if (ctx.inline) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(null, ctx);
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
    p: function update(changed, ctx) {
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(changed, ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(changed, ctx);
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

      if (detaching) {
        detach_dev(if_block_anchor);
      }
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
  var _$$props$items = $$props.items,
      items = _$$props$items === void 0 ? [] : _$$props$items,
      _$$props$inline = $$props.inline,
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
  var writable_props = ['items', 'inline'];
  Object.keys($$props).forEach(function (key) {
    if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn("<List> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$set = function ($$props) {
    if ('items' in $$props) $$invalidate('items', items = $$props.items);
    if ('inline' in $$props) $$invalidate('inline', inline = $$props.inline);
  };

  $$self.$capture_state = function () {
    return {
      items: items,
      inline: inline
    };
  };

  $$self.$inject_state = function ($$props) {
    if ('items' in $$props) $$invalidate('items', items = $$props.items);
    if ('inline' in $$props) $$invalidate('inline', inline = $$props.inline);
  };

  return {
    items: items,
    inline: inline,
    formattedList: formattedList
  };
}

var List =
/*#__PURE__*/
function (_SvelteComponentDev) {
  _inherits(List, _SvelteComponentDev);

  function List(options) {
    var _this;

    _classCallCheck(this, List);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(List).call(this, options));
    init(_assertThisInitialized(_this), options, instance$5, create_fragment$5, safe_not_equal, ["items", "inline"]);
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

var file$5 = "src/components/ExperienceItem.svelte"; // (106:6) {#if location}

function create_if_block_4(ctx) {
  var span, t0, t1, t2;
  var block = {
    c: function create() {
      span = element("span");
      t0 = text("(");
      t1 = text(ctx.location);
      t2 = text(")");
      this.h();
    },
    l: function claim(nodes) {
      span = claim_element(nodes, "SPAN", {
        class: true
      }, false);
      var span_nodes = children(span);
      t0 = claim_text(span_nodes, "(");
      t1 = claim_text(span_nodes, ctx.location);
      t2 = claim_text(span_nodes, ")");
      span_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span, "class", "location svelte-1s4coi2");
      add_location(span, file$5, 106, 8, 5137);
    },
    m: function mount(target, anchor) {
      insert_dev(target, span, anchor);
      append_dev(span, t0);
      append_dev(span, t1);
      append_dev(span, t2);
    },
    p: function update(changed, ctx) {
      if (changed.location) {
        set_data_dev(t1, ctx.location);
      }
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(span);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_4.name,
    type: "if",
    source: "(106:6) {#if location}",
    ctx: ctx
  });
  return block;
} // (112:6) {#if isDefunct}


function create_if_block_3$1(ctx) {
  var span, t;
  var block = {
    c: function create() {
      span = element("span");
      t = text("(defunct)");
      this.h();
    },
    l: function claim(nodes) {
      span = claim_element(nodes, "SPAN", {
        class: true
      }, false);
      var span_nodes = children(span);
      t = claim_text(span_nodes, "(defunct)");
      span_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span, "class", "defunct svelte-1s4coi2");
      add_location(span, file$5, 112, 8, 5268);
    },
    m: function mount(target, anchor) {
      insert_dev(target, span, anchor);
      append_dev(span, t);
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(span);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_3$1.name,
    type: "if",
    source: "(112:6) {#if isDefunct}",
    ctx: ctx
  });
  return block;
} // (118:6) {#if isContractor}


function create_if_block_2$1(ctx) {
  var span, t;
  var block = {
    c: function create() {
      span = element("span");
      t = text("Contractor");
      this.h();
    },
    l: function claim(nodes) {
      span = claim_element(nodes, "SPAN", {
        class: true
      }, false);
      var span_nodes = children(span);
      t = claim_text(span_nodes, "Contractor");
      span_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span, "class", "type svelte-1s4coi2");
      add_location(span, file$5, 118, 8, 5398);
    },
    m: function mount(target, anchor) {
      insert_dev(target, span, anchor);
      append_dev(span, t);
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(span);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2$1.name,
    type: "if",
    source: "(118:6) {#if isContractor}",
    ctx: ctx
  });
  return block;
} // (123:2) {#if description}


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
      }, false);
      var div_nodes = children(div);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "description svelte-1s4coi2");
      add_location(div, file$5, 123, 4, 5494);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      div.innerHTML = ctx.description;
    },
    p: function update(changed, ctx) {
      if (changed.description) {
        div.innerHTML = ctx.description;
      }
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(div);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$2.name,
    type: "if",
    source: "(123:2) {#if description}",
    ctx: ctx
  });
  return block;
} // (128:2) {#if technologies.length}


function create_if_block$4(ctx) {
  var footer, h4, t0, t1, current;
  var list = new List({
    props: {
      items: ctx.technologies,
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
      list.$$.fragment.c();
      this.h();
    },
    l: function claim(nodes) {
      footer = claim_element(nodes, "FOOTER", {
        class: true
      }, false);
      var footer_nodes = children(footer);
      h4 = claim_element(footer_nodes, "H4", {
        class: true
      }, false);
      var h4_nodes = children(h4);
      t0 = claim_text(h4_nodes, "Technologies & tools");
      h4_nodes.forEach(detach_dev);
      t1 = claim_space(footer_nodes);
      list.$$.fragment.l(footer_nodes);
      footer_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h4, "class", "svelte-1s4coi2");
      add_location(h4, file$5, 129, 6, 5612);
      attr_dev(footer, "class", "svelte-1s4coi2");
      add_location(footer, file$5, 128, 4, 5597);
    },
    m: function mount(target, anchor) {
      insert_dev(target, footer, anchor);
      append_dev(footer, h4);
      append_dev(h4, t0);
      append_dev(footer, t1);
      mount_component(list, footer, null);
      current = true;
    },
    p: function update(changed, ctx) {
      var list_changes = {};
      if (changed.technologies) list_changes.items = ctx.technologies;
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
      if (detaching) {
        detach_dev(footer);
      }

      destroy_component(list);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$4.name,
    type: "if",
    source: "(128:2) {#if technologies.length}",
    ctx: ctx
  });
  return block;
}

function create_fragment$6(ctx) {
  var div2,
      header,
      div0,
      t0_value = ctx.start.month + "",
      t0,
      t1,
      t2_value = ctx.start.year + "",
      t2,
      t3,
      t4_value = ctx.end.month + "",
      t4,
      t5,
      t6_value = ctx.end.year + "",
      t6,
      t7,
      span,
      t8,
      t9_value = durationInMonths(ctx.start, ctx.end) + "",
      t9,
      t10,
      t11,
      t12,
      h3,
      t13,
      t14,
      t15,
      div1,
      t16,
      t17,
      t18,
      t19,
      current;
  var if_block0 = ctx.location && create_if_block_4(ctx);
  var if_block1 = ctx.isDefunct && create_if_block_3$1(ctx);
  var if_block2 = ctx.isContractor && create_if_block_2$1(ctx);
  var if_block3 = ctx.description && create_if_block_1$2(ctx);
  var if_block4 = ctx.technologies.length && create_if_block$4(ctx);
  var block = {
    c: function create() {
      div2 = element("div");
      header = element("header");
      div0 = element("div");
      t0 = text(t0_value);
      t1 = space();
      t2 = text(t2_value);
      t3 = text(" - ");
      t4 = text(t4_value);
      t5 = space();
      t6 = text(t6_value);
      t7 = space();
      span = element("span");
      t8 = text("(");
      t9 = text(t9_value);
      t10 = text(")");
      t11 = space();
      if (if_block0) if_block0.c();
      t12 = space();
      h3 = element("h3");
      t13 = text(ctx.name);
      t14 = space();
      if (if_block1) if_block1.c();
      t15 = space();
      div1 = element("div");
      t16 = text(ctx.role);
      t17 = space();
      if (if_block2) if_block2.c();
      t18 = space();
      if (if_block3) if_block3.c();
      t19 = space();
      if (if_block4) if_block4.c();
      this.h();
    },
    l: function claim(nodes) {
      div2 = claim_element(nodes, "DIV", {
        class: true
      }, false);
      var div2_nodes = children(div2);
      header = claim_element(div2_nodes, "HEADER", {
        class: true
      }, false);
      var header_nodes = children(header);
      div0 = claim_element(header_nodes, "DIV", {
        class: true
      }, false);
      var div0_nodes = children(div0);
      t0 = claim_text(div0_nodes, t0_value);
      t1 = claim_space(div0_nodes);
      t2 = claim_text(div0_nodes, t2_value);
      t3 = claim_text(div0_nodes, " - ");
      t4 = claim_text(div0_nodes, t4_value);
      t5 = claim_space(div0_nodes);
      t6 = claim_text(div0_nodes, t6_value);
      t7 = claim_space(div0_nodes);
      span = claim_element(div0_nodes, "SPAN", {
        class: true
      }, false);
      var span_nodes = children(span);
      t8 = claim_text(span_nodes, "(");
      t9 = claim_text(span_nodes, t9_value);
      t10 = claim_text(span_nodes, ")");
      span_nodes.forEach(detach_dev);
      t11 = claim_space(div0_nodes);
      if (if_block0) if_block0.l(div0_nodes);
      div0_nodes.forEach(detach_dev);
      t12 = claim_space(header_nodes);
      h3 = claim_element(header_nodes, "H3", {
        class: true
      }, false);
      var h3_nodes = children(h3);
      t13 = claim_text(h3_nodes, ctx.name);
      t14 = claim_space(h3_nodes);
      if (if_block1) if_block1.l(h3_nodes);
      h3_nodes.forEach(detach_dev);
      t15 = claim_space(header_nodes);
      div1 = claim_element(header_nodes, "DIV", {
        class: true
      }, false);
      var div1_nodes = children(div1);
      t16 = claim_text(div1_nodes, ctx.role);
      t17 = claim_space(div1_nodes);
      if (if_block2) if_block2.l(div1_nodes);
      div1_nodes.forEach(detach_dev);
      header_nodes.forEach(detach_dev);
      t18 = claim_space(div2_nodes);
      if (if_block3) if_block3.l(div2_nodes);
      t19 = claim_space(div2_nodes);
      if (if_block4) if_block4.l(div2_nodes);
      div2_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span, "class", "duration svelte-1s4coi2");
      add_location(span, file$5, 104, 6, 5045);
      attr_dev(div0, "class", "period svelte-1s4coi2");
      add_location(div0, file$5, 102, 4, 4960);
      attr_dev(h3, "class", "name svelte-1s4coi2");
      add_location(h3, file$5, 109, 4, 5207);
      attr_dev(div1, "class", "role svelte-1s4coi2");
      add_location(div1, file$5, 115, 4, 5333);
      attr_dev(header, "class", "svelte-1s4coi2");
      add_location(header, file$5, 101, 2, 4947);
      attr_dev(div2, "class", "experience-item divided svelte-1s4coi2");
      toggle_class(div2, "u-print-hidden", ctx.shouldHideFromPrint());
      add_location(div2, file$5, 98, 0, 4858);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div2, anchor);
      append_dev(div2, header);
      append_dev(header, div0);
      append_dev(div0, t0);
      append_dev(div0, t1);
      append_dev(div0, t2);
      append_dev(div0, t3);
      append_dev(div0, t4);
      append_dev(div0, t5);
      append_dev(div0, t6);
      append_dev(div0, t7);
      append_dev(div0, span);
      append_dev(span, t8);
      append_dev(span, t9);
      append_dev(span, t10);
      append_dev(div0, t11);
      if (if_block0) if_block0.m(div0, null);
      append_dev(header, t12);
      append_dev(header, h3);
      append_dev(h3, t13);
      append_dev(h3, t14);
      if (if_block1) if_block1.m(h3, null);
      append_dev(header, t15);
      append_dev(header, div1);
      append_dev(div1, t16);
      append_dev(div1, t17);
      if (if_block2) if_block2.m(div1, null);
      append_dev(div2, t18);
      if (if_block3) if_block3.m(div2, null);
      append_dev(div2, t19);
      if (if_block4) if_block4.m(div2, null);
      current = true;
    },
    p: function update(changed, ctx) {
      if ((!current || changed.start) && t0_value !== (t0_value = ctx.start.month + "")) {
        set_data_dev(t0, t0_value);
      }

      if ((!current || changed.start) && t2_value !== (t2_value = ctx.start.year + "")) {
        set_data_dev(t2, t2_value);
      }

      if ((!current || changed.end) && t4_value !== (t4_value = ctx.end.month + "")) {
        set_data_dev(t4, t4_value);
      }

      if ((!current || changed.end) && t6_value !== (t6_value = ctx.end.year + "")) {
        set_data_dev(t6, t6_value);
      }

      if ((!current || changed.start || changed.end) && t9_value !== (t9_value = durationInMonths(ctx.start, ctx.end) + "")) {
        set_data_dev(t9, t9_value);
      }

      if (ctx.location) {
        if (if_block0) {
          if_block0.p(changed, ctx);
        } else {
          if_block0 = create_if_block_4(ctx);
          if_block0.c();
          if_block0.m(div0, null);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }

      if (!current || changed.name) {
        set_data_dev(t13, ctx.name);
      }

      if (ctx.isDefunct) {
        if (!if_block1) {
          if_block1 = create_if_block_3$1(ctx);
          if_block1.c();
          if_block1.m(h3, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }

      if (!current || changed.role) {
        set_data_dev(t16, ctx.role);
      }

      if (ctx.isContractor) {
        if (!if_block2) {
          if_block2 = create_if_block_2$1(ctx);
          if_block2.c();
          if_block2.m(div1, null);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }

      if (ctx.description) {
        if (if_block3) {
          if_block3.p(changed, ctx);
        } else {
          if_block3 = create_if_block_1$2(ctx);
          if_block3.c();
          if_block3.m(div2, t19);
        }
      } else if (if_block3) {
        if_block3.d(1);
        if_block3 = null;
      }

      if (ctx.technologies.length) {
        if (if_block4) {
          if_block4.p(changed, ctx);
          transition_in(if_block4, 1);
        } else {
          if_block4 = create_if_block$4(ctx);
          if_block4.c();
          transition_in(if_block4, 1);
          if_block4.m(div2, null);
        }
      } else if (if_block4) {
        group_outros();
        transition_out(if_block4, 1, 1, function () {
          if_block4 = null;
        });
        check_outros();
      }

      if (changed.shouldHideFromPrint) {
        toggle_class(div2, "u-print-hidden", ctx.shouldHideFromPrint());
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block4);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block4);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(div2);
      }

      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
      if (if_block2) if_block2.d();
      if (if_block3) if_block3.d();
      if (if_block4) if_block4.d();
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
  function shouldHideFromPrint() {
    var itemStartYear = parseInt(end.year);
    var yearsAgo = new Date().getFullYear() - PRINT_TRUNCATE_NUMBER_OF_YEARS;
    return itemStartYear < yearsAgo;
  }

  var name = $$props.name,
      _$$props$description = $$props.description,
      description = _$$props$description === void 0 ? null : _$$props$description,
      _$$props$start = $$props.start,
      start = _$$props$start === void 0 ? {} : _$$props$start,
      _$$props$end = $$props.end,
      end = _$$props$end === void 0 ? {} : _$$props$end,
      _$$props$location = $$props.location,
      location = _$$props$location === void 0 ? null : _$$props$location,
      _$$props$role = $$props.role,
      role = _$$props$role === void 0 ? '' : _$$props$role,
      _$$props$isDefunct = $$props.isDefunct,
      isDefunct = _$$props$isDefunct === void 0 ? false : _$$props$isDefunct,
      _$$props$isContractor = $$props.isContractor,
      isContractor = _$$props$isContractor === void 0 ? false : _$$props$isContractor,
      _$$props$technologies = $$props.technologies,
      technologies = _$$props$technologies === void 0 ? [] : _$$props$technologies;
  var writable_props = ['name', 'description', 'start', 'end', 'location', 'role', 'isDefunct', 'isContractor', 'technologies'];
  Object.keys($$props).forEach(function (key) {
    if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn("<ExperienceItem> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$set = function ($$props) {
    if ('name' in $$props) $$invalidate('name', name = $$props.name);
    if ('description' in $$props) $$invalidate('description', description = $$props.description);
    if ('start' in $$props) $$invalidate('start', start = $$props.start);
    if ('end' in $$props) $$invalidate('end', end = $$props.end);
    if ('location' in $$props) $$invalidate('location', location = $$props.location);
    if ('role' in $$props) $$invalidate('role', role = $$props.role);
    if ('isDefunct' in $$props) $$invalidate('isDefunct', isDefunct = $$props.isDefunct);
    if ('isContractor' in $$props) $$invalidate('isContractor', isContractor = $$props.isContractor);
    if ('technologies' in $$props) $$invalidate('technologies', technologies = $$props.technologies);
  };

  $$self.$capture_state = function () {
    return {
      name: name,
      description: description,
      start: start,
      end: end,
      location: location,
      role: role,
      isDefunct: isDefunct,
      isContractor: isContractor,
      technologies: technologies
    };
  };

  $$self.$inject_state = function ($$props) {
    if ('name' in $$props) $$invalidate('name', name = $$props.name);
    if ('description' in $$props) $$invalidate('description', description = $$props.description);
    if ('start' in $$props) $$invalidate('start', start = $$props.start);
    if ('end' in $$props) $$invalidate('end', end = $$props.end);
    if ('location' in $$props) $$invalidate('location', location = $$props.location);
    if ('role' in $$props) $$invalidate('role', role = $$props.role);
    if ('isDefunct' in $$props) $$invalidate('isDefunct', isDefunct = $$props.isDefunct);
    if ('isContractor' in $$props) $$invalidate('isContractor', isContractor = $$props.isContractor);
    if ('technologies' in $$props) $$invalidate('technologies', technologies = $$props.technologies);
  };

  return {
    shouldHideFromPrint: shouldHideFromPrint,
    name: name,
    description: description,
    start: start,
    end: end,
    location: location,
    role: role,
    isDefunct: isDefunct,
    isContractor: isContractor,
    technologies: technologies
  };
}

var ExperienceItem =
/*#__PURE__*/
function (_SvelteComponentDev) {
  _inherits(ExperienceItem, _SvelteComponentDev);

  function ExperienceItem(options) {
    var _this;

    _classCallCheck(this, ExperienceItem);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ExperienceItem).call(this, options));
    init(_assertThisInitialized(_this), options, instance$6, create_fragment$6, safe_not_equal, ["name", "description", "start", "end", "location", "role", "isDefunct", "isContractor", "technologies"]);
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "ExperienceItem",
      options: options,
      id: create_fragment$6.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (ctx.name === undefined && !('name' in props)) {
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
      }, true);
      var path_nodes = children(path);
      path_nodes.forEach(detach_dev);
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
      if (detaching) {
        detach_dev(path);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot$3.name,
    type: "slot",
    source: "(4:8) <IconBase viewBox=\"0 0 496 512\" {...$$props}>",
    ctx: ctx
  });
  return block;
}

function create_fragment$7(ctx) {
  var current;
  var iconbase_spread_levels = [{
    viewBox: "0 0 496 512"
  }, ctx.$$props];
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

  var iconbase = new IconBase({
    props: iconbase_props,
    $$inline: true
  });
  var block = {
    c: function create() {
      iconbase.$$.fragment.c();
    },
    l: function claim(nodes) {
      iconbase.$$.fragment.l(nodes);
    },
    m: function mount(target, anchor) {
      mount_component(iconbase, target, anchor);
      current = true;
    },
    p: function update(changed, ctx) {
      var iconbase_changes = changed.$$props ? get_spread_update(iconbase_spread_levels, [iconbase_spread_levels[0], get_spread_object(ctx.$$props)]) : {};
      if (changed.$$scope) iconbase_changes.$$scope = {
        changed: changed,
        ctx: ctx
      };
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
  $$self.$set = function ($$new_props) {
    $$invalidate('$$props', $$props = assign(assign({}, $$props), $$new_props));
  };

  $$self.$capture_state = function () {
    return {};
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate('$$props', $$props = assign(assign({}, $$props), $$new_props));
  };

  return _defineProperty({
    $$props: $$props
  }, "$$props", $$props = exclude_internal_props($$props));
}

var FaGithub =
/*#__PURE__*/
function (_SvelteComponentDev) {
  _inherits(FaGithub, _SvelteComponentDev);

  function FaGithub(options) {
    var _this;

    _classCallCheck(this, FaGithub);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FaGithub).call(this, options));
    init(_assertThisInitialized(_this), options, instance$7, create_fragment$7, safe_not_equal, []);
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
      }, true);
      var path_nodes = children(path);
      path_nodes.forEach(detach_dev);
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
      if (detaching) {
        detach_dev(path);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot$4.name,
    type: "slot",
    source: "(4:8) <IconBase viewBox=\"0 0 448 512\" {...$$props}>",
    ctx: ctx
  });
  return block;
}

function create_fragment$8(ctx) {
  var current;
  var iconbase_spread_levels = [{
    viewBox: "0 0 448 512"
  }, ctx.$$props];
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

  var iconbase = new IconBase({
    props: iconbase_props,
    $$inline: true
  });
  var block = {
    c: function create() {
      iconbase.$$.fragment.c();
    },
    l: function claim(nodes) {
      iconbase.$$.fragment.l(nodes);
    },
    m: function mount(target, anchor) {
      mount_component(iconbase, target, anchor);
      current = true;
    },
    p: function update(changed, ctx) {
      var iconbase_changes = changed.$$props ? get_spread_update(iconbase_spread_levels, [iconbase_spread_levels[0], get_spread_object(ctx.$$props)]) : {};
      if (changed.$$scope) iconbase_changes.$$scope = {
        changed: changed,
        ctx: ctx
      };
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
  $$self.$set = function ($$new_props) {
    $$invalidate('$$props', $$props = assign(assign({}, $$props), $$new_props));
  };

  $$self.$capture_state = function () {
    return {};
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate('$$props', $$props = assign(assign({}, $$props), $$new_props));
  };

  return _defineProperty({
    $$props: $$props
  }, "$$props", $$props = exclude_internal_props($$props));
}

var FaLinkedin =
/*#__PURE__*/
function (_SvelteComponentDev) {
  _inherits(FaLinkedin, _SvelteComponentDev);

  function FaLinkedin(options) {
    var _this;

    _classCallCheck(this, FaLinkedin);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FaLinkedin).call(this, options));
    init(_assertThisInitialized(_this), options, instance$8, create_fragment$8, safe_not_equal, []);
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
      }, true);
      var path_nodes = children(path);
      path_nodes.forEach(detach_dev);
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
      if (detaching) {
        detach_dev(path);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot$5.name,
    type: "slot",
    source: "(4:8) <IconBase viewBox=\"0 0 512 512\" {...$$props}>",
    ctx: ctx
  });
  return block;
}

function create_fragment$9(ctx) {
  var current;
  var iconbase_spread_levels = [{
    viewBox: "0 0 512 512"
  }, ctx.$$props];
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

  var iconbase = new IconBase({
    props: iconbase_props,
    $$inline: true
  });
  var block = {
    c: function create() {
      iconbase.$$.fragment.c();
    },
    l: function claim(nodes) {
      iconbase.$$.fragment.l(nodes);
    },
    m: function mount(target, anchor) {
      mount_component(iconbase, target, anchor);
      current = true;
    },
    p: function update(changed, ctx) {
      var iconbase_changes = changed.$$props ? get_spread_update(iconbase_spread_levels, [iconbase_spread_levels[0], get_spread_object(ctx.$$props)]) : {};
      if (changed.$$scope) iconbase_changes.$$scope = {
        changed: changed,
        ctx: ctx
      };
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
  $$self.$set = function ($$new_props) {
    $$invalidate('$$props', $$props = assign(assign({}, $$props), $$new_props));
  };

  $$self.$capture_state = function () {
    return {};
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate('$$props', $$props = assign(assign({}, $$props), $$new_props));
  };

  return _defineProperty({
    $$props: $$props
  }, "$$props", $$props = exclude_internal_props($$props));
}

var FaTwitter =
/*#__PURE__*/
function (_SvelteComponentDev) {
  _inherits(FaTwitter, _SvelteComponentDev);

  function FaTwitter(options) {
    var _this;

    _classCallCheck(this, FaTwitter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FaTwitter).call(this, options));
    init(_assertThisInitialized(_this), options, instance$9, create_fragment$9, safe_not_equal, []);
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
      }, true);
      var path_nodes = children(path);
      path_nodes.forEach(detach_dev);
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
      if (detaching) {
        detach_dev(path);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot$6.name,
    type: "slot",
    source: "(4:8) <IconBase viewBox=\"0 0 384 512\" {...$$props}>",
    ctx: ctx
  });
  return block;
}

function create_fragment$a(ctx) {
  var current;
  var iconbase_spread_levels = [{
    viewBox: "0 0 384 512"
  }, ctx.$$props];
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

  var iconbase = new IconBase({
    props: iconbase_props,
    $$inline: true
  });
  var block = {
    c: function create() {
      iconbase.$$.fragment.c();
    },
    l: function claim(nodes) {
      iconbase.$$.fragment.l(nodes);
    },
    m: function mount(target, anchor) {
      mount_component(iconbase, target, anchor);
      current = true;
    },
    p: function update(changed, ctx) {
      var iconbase_changes = changed.$$props ? get_spread_update(iconbase_spread_levels, [iconbase_spread_levels[0], get_spread_object(ctx.$$props)]) : {};
      if (changed.$$scope) iconbase_changes.$$scope = {
        changed: changed,
        ctx: ctx
      };
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
  $$self.$set = function ($$new_props) {
    $$invalidate('$$props', $$props = assign(assign({}, $$props), $$new_props));
  };

  $$self.$capture_state = function () {
    return {};
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate('$$props', $$props = assign(assign({}, $$props), $$new_props));
  };

  return _defineProperty({
    $$props: $$props
  }, "$$props", $$props = exclude_internal_props($$props));
}

var FaFilePdf =
/*#__PURE__*/
function (_SvelteComponentDev) {
  _inherits(FaFilePdf, _SvelteComponentDev);

  function FaFilePdf(options) {
    var _this;

    _classCallCheck(this, FaFilePdf);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FaFilePdf).call(this, options));
    init(_assertThisInitialized(_this), options, instance$a, create_fragment$a, safe_not_equal, []);
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

var file$a = "src/components/Summary.svelte";

function get_each_context$2(ctx, list, i) {
  var child_ctx = Object.create(ctx);
  child_ctx.type = list[i][0];
  child_ctx.details = list[i][1];
  return child_ctx;
}

function get_each_context_1$2(ctx, list, i) {
  var child_ctx = Object.create(ctx);
  child_ctx.item = list[i];
  return child_ctx;
} // (266:2) {#if coreSkills || currentInterests}


function create_if_block_4$1(ctx) {
  var div, t, current;
  var if_block0 = ctx.coreSkills && create_if_block_6(ctx);
  var if_block1 = ctx.currentInterests && create_if_block_5(ctx);
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
      }, false);
      var div_nodes = children(div);
      if (if_block0) if_block0.l(div_nodes);
      t = claim_space(div_nodes);
      if (if_block1) if_block1.l(div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "skill-set svelte-f0majr");
      add_location(div, file$a, 266, 4, 12098);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      if (if_block0) if_block0.m(div, null);
      append_dev(div, t);
      if (if_block1) if_block1.m(div, null);
      current = true;
    },
    p: function update(changed, ctx) {
      if (ctx.coreSkills) {
        if (if_block0) {
          if_block0.p(changed, ctx);
          transition_in(if_block0, 1);
        } else {
          if_block0 = create_if_block_6(ctx);
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

      if (ctx.currentInterests) {
        if (if_block1) {
          if_block1.p(changed, ctx);
          transition_in(if_block1, 1);
        } else {
          if_block1 = create_if_block_5(ctx);
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
      if (detaching) {
        detach_dev(div);
      }

      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_4$1.name,
    type: "if",
    source: "(266:2) {#if coreSkills || currentInterests}",
    ctx: ctx
  });
  return block;
} // (268:6) {#if coreSkills}


function create_if_block_6(ctx) {
  var section, h3, t0, t1, current;
  var list = new List({
    props: {
      items: ctx.coreSkills
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      section = element("section");
      h3 = element("h3");
      t0 = text("Core skills");
      t1 = space();
      list.$$.fragment.c();
      this.h();
    },
    l: function claim(nodes) {
      section = claim_element(nodes, "SECTION", {
        class: true
      }, false);
      var section_nodes = children(section);
      h3 = claim_element(section_nodes, "H3", {
        class: true
      }, false);
      var h3_nodes = children(h3);
      t0 = claim_text(h3_nodes, "Core skills");
      h3_nodes.forEach(detach_dev);
      t1 = claim_space(section_nodes);
      list.$$.fragment.l(section_nodes);
      section_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h3, "class", "svelte-f0majr");
      add_location(h3, file$a, 269, 10, 12173);
      attr_dev(section, "class", "svelte-f0majr");
      add_location(section, file$a, 268, 8, 12153);
    },
    m: function mount(target, anchor) {
      insert_dev(target, section, anchor);
      append_dev(section, h3);
      append_dev(h3, t0);
      append_dev(section, t1);
      mount_component(list, section, null);
      current = true;
    },
    p: function update(changed, ctx) {
      var list_changes = {};
      if (changed.coreSkills) list_changes.items = ctx.coreSkills;
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
      if (detaching) {
        detach_dev(section);
      }

      destroy_component(list);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_6.name,
    type: "if",
    source: "(268:6) {#if coreSkills}",
    ctx: ctx
  });
  return block;
} // (274:6) {#if currentInterests}


function create_if_block_5(ctx) {
  var section, h3, t0, t1, current;
  var list = new List({
    props: {
      items: ctx.currentInterests
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      section = element("section");
      h3 = element("h3");
      t0 = text("Current focus");
      t1 = space();
      list.$$.fragment.c();
      this.h();
    },
    l: function claim(nodes) {
      section = claim_element(nodes, "SECTION", {
        class: true
      }, false);
      var section_nodes = children(section);
      h3 = claim_element(section_nodes, "H3", {
        class: true
      }, false);
      var h3_nodes = children(h3);
      t0 = claim_text(h3_nodes, "Current focus");
      h3_nodes.forEach(detach_dev);
      t1 = claim_space(section_nodes);
      list.$$.fragment.l(section_nodes);
      section_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h3, "class", "svelte-f0majr");
      add_location(h3, file$a, 275, 10, 12320);
      attr_dev(section, "class", "svelte-f0majr");
      add_location(section, file$a, 274, 8, 12300);
    },
    m: function mount(target, anchor) {
      insert_dev(target, section, anchor);
      append_dev(section, h3);
      append_dev(h3, t0);
      append_dev(section, t1);
      mount_component(list, section, null);
      current = true;
    },
    p: function update(changed, ctx) {
      var list_changes = {};
      if (changed.currentInterests) list_changes.items = ctx.currentInterests;
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
      if (detaching) {
        detach_dev(section);
      }

      destroy_component(list);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_5.name,
    type: "if",
    source: "(274:6) {#if currentInterests}",
    ctx: ctx
  });
  return block;
} // (282:2) {#if social || pdfLink}


function create_if_block$5(ctx) {
  var footer, hr, t0, div, t1, t2, current;
  var if_block0 = ctx.social && create_if_block_3$2(ctx);
  var if_block1 = ctx.pdfLink && create_if_block_2$2(ctx);
  var if_block2 = ctx.contact && create_if_block_1$3(ctx);
  var block = {
    c: function create() {
      footer = element("footer");
      hr = element("hr");
      t0 = space();
      div = element("div");
      if (if_block0) if_block0.c();
      t1 = space();
      if (if_block1) if_block1.c();
      t2 = space();
      if (if_block2) if_block2.c();
      this.h();
    },
    l: function claim(nodes) {
      footer = claim_element(nodes, "FOOTER", {
        class: true
      }, false);
      var footer_nodes = children(footer);
      hr = claim_element(footer_nodes, "HR", {
        class: true
      }, false);
      var hr_nodes = children(hr);
      hr_nodes.forEach(detach_dev);
      t0 = claim_space(footer_nodes);
      div = claim_element(footer_nodes, "DIV", {
        class: true
      }, false);
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
      attr_dev(hr, "class", "svelte-f0majr");
      add_location(hr, file$a, 283, 6, 12482);
      attr_dev(div, "class", "footer-layout svelte-f0majr");
      add_location(div, file$a, 284, 6, 12495);
      attr_dev(footer, "class", "svelte-f0majr");
      add_location(footer, file$a, 282, 4, 12467);
    },
    m: function mount(target, anchor) {
      insert_dev(target, footer, anchor);
      append_dev(footer, hr);
      append_dev(footer, t0);
      append_dev(footer, div);
      if (if_block0) if_block0.m(div, null);
      append_dev(div, t1);
      if (if_block1) if_block1.m(div, null);
      append_dev(footer, t2);
      if (if_block2) if_block2.m(footer, null);
      current = true;
    },
    p: function update(changed, ctx) {
      if (ctx.social) {
        if (if_block0) {
          if_block0.p(changed, ctx);
          transition_in(if_block0, 1);
        } else {
          if_block0 = create_if_block_3$2(ctx);
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

      if (ctx.pdfLink) {
        if (if_block1) {
          if_block1.p(changed, ctx);
          transition_in(if_block1, 1);
        } else {
          if_block1 = create_if_block_2$2(ctx);
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

      if (ctx.contact) {
        if (if_block2) {
          if_block2.p(changed, ctx);
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
      if (detaching) {
        detach_dev(footer);
      }

      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
      if (if_block2) if_block2.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$5.name,
    type: "if",
    source: "(282:2) {#if social || pdfLink}",
    ctx: ctx
  });
  return block;
} // (286:8) {#if social}


function create_if_block_3$2(ctx) {
  var div, current;
  var each_value_1 = ctx.social;
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
      }, false);
      var div_nodes = children(div);

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(div_nodes);
      }

      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "social-links footer-layout svelte-f0majr");
      add_location(div, file$a, 286, 10, 12554);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(div, null);
      }

      current = true;
    },
    p: function update(changed, ctx) {
      if (changed.social || changed.truncateUrl || changed.icons) {
        each_value_1 = ctx.social;

        var _i4;

        for (_i4 = 0; _i4 < each_value_1.length; _i4 += 1) {
          var child_ctx = get_each_context_1$2(ctx, each_value_1, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(changed, child_ctx);

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
      if (detaching) {
        detach_dev(div);
      }

      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_3$2.name,
    type: "if",
    source: "(286:8) {#if social}",
    ctx: ctx
  });
  return block;
} // (288:12) {#each social as item}


function create_each_block_1$2(ctx) {
  var a,
      span0,
      span0_aria_label_value,
      t0,
      span2,
      span1,
      t1_value = ctx.truncateUrl(ctx.item.url) + "",
      t1,
      t2,
      a_href_value,
      a_title_value,
      current;
  var switch_value = ctx.icons[ctx.item.icon];

  function switch_props(ctx) {
    return {
      $$inline: true
    };
  }

  if (switch_value) {
    var switch_instance = new switch_value(switch_props());
  }

  var block = {
    c: function create() {
      a = element("a");
      span0 = element("span");
      if (switch_instance) switch_instance.$$.fragment.c();
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
      }, false);
      var a_nodes = children(a);
      span0 = claim_element(a_nodes, "SPAN", {
        class: true,
        "aria-label": true
      }, false);
      var span0_nodes = children(span0);
      if (switch_instance) switch_instance.$$.fragment.l(span0_nodes);
      span0_nodes.forEach(detach_dev);
      t0 = claim_space(a_nodes);
      span2 = claim_element(a_nodes, "SPAN", {
        class: true
      }, false);
      var span2_nodes = children(span2);
      span1 = claim_element(span2_nodes, "SPAN", {
        class: true
      }, false);
      var span1_nodes = children(span1);
      t1 = claim_text(span1_nodes, t1_value);
      span1_nodes.forEach(detach_dev);
      span2_nodes.forEach(detach_dev);
      t2 = claim_space(a_nodes);
      a_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span0, "class", "icon svelte-f0majr");
      attr_dev(span0, "aria-label", span0_aria_label_value = ctx.item.label);
      add_location(span0, file$a, 289, 16, 12699);
      attr_dev(span1, "class", "u-print-only svelte-f0majr");
      add_location(span1, file$a, 293, 18, 12892);
      attr_dev(span2, "class", "u-print-only svelte-f0majr");
      add_location(span2, file$a, 292, 16, 12846);
      attr_dev(a, "href", a_href_value = ctx.item.url);
      attr_dev(a, "title", a_title_value = ctx.item.label);
      attr_dev(a, "class", "svelte-f0majr");
      add_location(a, file$a, 288, 14, 12644);
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
    p: function update(changed, ctx) {
      if (switch_value !== (switch_value = ctx.icons[ctx.item.icon])) {
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
          switch_instance.$$.fragment.c();
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, span0, null);
        } else {
          switch_instance = null;
        }
      }

      if ((!current || changed.social) && span0_aria_label_value !== (span0_aria_label_value = ctx.item.label)) {
        attr_dev(span0, "aria-label", span0_aria_label_value);
      }

      if ((!current || changed.social) && t1_value !== (t1_value = ctx.truncateUrl(ctx.item.url) + "")) {
        set_data_dev(t1, t1_value);
      }

      if ((!current || changed.social) && a_href_value !== (a_href_value = ctx.item.url)) {
        attr_dev(a, "href", a_href_value);
      }

      if ((!current || changed.social) && a_title_value !== (a_title_value = ctx.item.label)) {
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
      if (detaching) {
        detach_dev(a);
      }

      if (switch_instance) destroy_component(switch_instance);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_1$2.name,
    type: "each",
    source: "(288:12) {#each social as item}",
    ctx: ctx
  });
  return block;
} // (300:8) {#if pdfLink}


function create_if_block_2$2(ctx) {
  var div, a, span0, t0, t1, span1, current;
  var pdf = new FaFilePdf({
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
      pdf.$$.fragment.c();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      }, false);
      var div_nodes = children(div);
      a = claim_element(div_nodes, "A", {
        href: true,
        title: true,
        "aria-label": true,
        class: true
      }, false);
      var a_nodes = children(a);
      span0 = claim_element(a_nodes, "SPAN", {
        class: true
      }, false);
      var span0_nodes = children(span0);
      t0 = claim_text(span0_nodes, "Download PDF");
      span0_nodes.forEach(detach_dev);
      t1 = claim_space(a_nodes);
      span1 = claim_element(a_nodes, "SPAN", {
        class: true
      }, false);
      var span1_nodes = children(span1);
      pdf.$$.fragment.l(span1_nodes);
      span1_nodes.forEach(detach_dev);
      a_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(span0, "class", "download-label svelte-f0majr");
      add_location(span0, file$a, 305, 14, 13252);
      attr_dev(span1, "class", "icon svelte-f0majr");
      add_location(span1, file$a, 306, 14, 13315);
      attr_dev(a, "href", ctx.pdfLink);
      attr_dev(a, "title", "Open PDF version");
      attr_dev(a, "aria-label", "Download PDF");
      attr_dev(a, "class", "svelte-f0majr");
      add_location(a, file$a, 301, 12, 13126);
      attr_dev(div, "class", "download u-print-hidden svelte-f0majr");
      add_location(div, file$a, 300, 10, 13076);
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
    p: function update(changed, ctx) {
      if (!current || changed.pdfLink) {
        attr_dev(a, "href", ctx.pdfLink);
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
      if (detaching) {
        detach_dev(div);
      }

      destroy_component(pdf);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2$2.name,
    type: "if",
    source: "(300:8) {#if pdfLink}",
    ctx: ctx
  });
  return block;
} // (314:6) {#if contact}


function create_if_block_1$3(ctx) {
  var dl;
  var each_value = Object.entries(ctx.contact);
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
      }, false);
      var dl_nodes = children(dl);

      for (var _i8 = 0; _i8 < each_blocks.length; _i8 += 1) {
        each_blocks[_i8].l(dl_nodes);
      }

      dl_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(dl, "class", "contact svelte-f0majr");
      add_location(dl, file$a, 314, 8, 13470);
    },
    m: function mount(target, anchor) {
      insert_dev(target, dl, anchor);

      for (var _i9 = 0; _i9 < each_blocks.length; _i9 += 1) {
        each_blocks[_i9].m(dl, null);
      }
    },
    p: function update(changed, ctx) {
      if (changed.contact) {
        each_value = Object.entries(ctx.contact);

        var _i10;

        for (_i10 = 0; _i10 < each_value.length; _i10 += 1) {
          var child_ctx = get_each_context$2(ctx, each_value, _i10);

          if (each_blocks[_i10]) {
            each_blocks[_i10].p(changed, child_ctx);
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
      if (detaching) {
        detach_dev(dl);
      }

      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1$3.name,
    type: "if",
    source: "(314:6) {#if contact}",
    ctx: ctx
  });
  return block;
} // (316:10) {#each Object.entries(contact) as [type, details]}


function create_each_block$2(ctx) {
  var div,
      dt,
      t0_value = ctx.type + "",
      t0,
      t1,
      dd,
      raw_value = ctx.details + "",
      t2;
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
      }, false);
      var div_nodes = children(div);
      dt = claim_element(div_nodes, "DT", {
        class: true
      }, false);
      var dt_nodes = children(dt);
      t0 = claim_text(dt_nodes, t0_value);
      dt_nodes.forEach(detach_dev);
      t1 = claim_space(div_nodes);
      dd = claim_element(div_nodes, "DD", {
        class: true
      }, false);
      var dd_nodes = children(dd);
      dd_nodes.forEach(detach_dev);
      t2 = claim_space(div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(dt, "class", "visually-hidden svelte-f0majr");
      add_location(dt, file$a, 317, 14, 13584);
      attr_dev(dd, "class", "svelte-f0majr");
      add_location(dd, file$a, 318, 14, 13638);
      attr_dev(div, "class", "svelte-f0majr");
      add_location(div, file$a, 316, 12, 13564);
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
    p: function update(changed, ctx) {
      if (changed.contact && t0_value !== (t0_value = ctx.type + "")) {
        set_data_dev(t0, t0_value);
      }

      if (changed.contact && raw_value !== (raw_value = ctx.details + "")) {
        dd.innerHTML = raw_value;
      }
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(div);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block$2.name,
    type: "each",
    source: "(316:10) {#each Object.entries(contact) as [type, details]}",
    ctx: ctx
  });
  return block;
}

function create_fragment$b(ctx) {
  var div1, h1, t0, t1, h2, t2, t3, div0, t4, t5, current;
  var if_block0 = (ctx.coreSkills || ctx.currentInterests) && create_if_block_4$1(ctx);
  var if_block1 = (ctx.social || ctx.pdfLink) && create_if_block$5(ctx);
  var block = {
    c: function create() {
      div1 = element("div");
      h1 = element("h1");
      t0 = text(ctx.name);
      t1 = space();
      h2 = element("h2");
      t2 = text(ctx.title);
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
      }, false);
      var div1_nodes = children(div1);
      h1 = claim_element(div1_nodes, "H1", {
        class: true
      }, false);
      var h1_nodes = children(h1);
      t0 = claim_text(h1_nodes, ctx.name);
      h1_nodes.forEach(detach_dev);
      t1 = claim_space(div1_nodes);
      h2 = claim_element(div1_nodes, "H2", {
        class: true
      }, false);
      var h2_nodes = children(h2);
      t2 = claim_text(h2_nodes, ctx.title);
      h2_nodes.forEach(detach_dev);
      t3 = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true
      }, false);
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
      attr_dev(h1, "class", "svelte-f0majr");
      add_location(h1, file$a, 260, 2, 11967);
      attr_dev(h2, "class", "svelte-f0majr");
      add_location(h2, file$a, 261, 2, 11985);
      attr_dev(div0, "class", "details svelte-f0majr");
      add_location(div0, file$a, 262, 2, 12004);
      attr_dev(div1, "class", "summary svelte-f0majr");
      add_location(div1, file$a, 259, 0, 11943);
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
      div0.innerHTML = ctx.details;
      append_dev(div1, t4);
      if (if_block0) if_block0.m(div1, null);
      append_dev(div1, t5);
      if (if_block1) if_block1.m(div1, null);
      current = true;
    },
    p: function update(changed, ctx) {
      if (!current || changed.name) {
        set_data_dev(t0, ctx.name);
      }

      if (!current || changed.title) {
        set_data_dev(t2, ctx.title);
      }

      if (!current || changed.details) {
        div0.innerHTML = ctx.details;
      }

      if (ctx.coreSkills || ctx.currentInterests) {
        if (if_block0) {
          if_block0.p(changed, ctx);
          transition_in(if_block0, 1);
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

      if (ctx.social || ctx.pdfLink) {
        if (if_block1) {
          if_block1.p(changed, ctx);
          transition_in(if_block1, 1);
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
      if (detaching) {
        detach_dev(div1);
      }

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
  var truncateUrl = function truncateUrl(url) {
    return url.replace(/https:\/\//, '');
  };

  var _$$props$name = $$props.name,
      name = _$$props$name === void 0 ? '[Name]' : _$$props$name,
      _$$props$title = $$props.title,
      title = _$$props$title === void 0 ? '[Title]' : _$$props$title,
      _$$props$details = $$props.details,
      details = _$$props$details === void 0 ? '[Details]' : _$$props$details,
      description = $$props.description,
      contact = $$props.contact,
      social = $$props.social,
      coreSkills = $$props.coreSkills,
      currentInterests = $$props.currentInterests,
      pdfLink = $$props.pdfLink,
      _$$props$icons = $$props.icons,
      icons = _$$props$icons === void 0 ? {
    github: FaGithub,
    linkedin: FaLinkedin,
    twitter: FaTwitter
  } : _$$props$icons;
  var writable_props = ['name', 'title', 'details', 'description', 'contact', 'social', 'coreSkills', 'currentInterests', 'pdfLink', 'icons'];
  Object.keys($$props).forEach(function (key) {
    if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn("<Summary> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$set = function ($$props) {
    if ('name' in $$props) $$invalidate('name', name = $$props.name);
    if ('title' in $$props) $$invalidate('title', title = $$props.title);
    if ('details' in $$props) $$invalidate('details', details = $$props.details);
    if ('description' in $$props) $$invalidate('description', description = $$props.description);
    if ('contact' in $$props) $$invalidate('contact', contact = $$props.contact);
    if ('social' in $$props) $$invalidate('social', social = $$props.social);
    if ('coreSkills' in $$props) $$invalidate('coreSkills', coreSkills = $$props.coreSkills);
    if ('currentInterests' in $$props) $$invalidate('currentInterests', currentInterests = $$props.currentInterests);
    if ('pdfLink' in $$props) $$invalidate('pdfLink', pdfLink = $$props.pdfLink);
    if ('icons' in $$props) $$invalidate('icons', icons = $$props.icons);
  };

  $$self.$capture_state = function () {
    return {
      name: name,
      title: title,
      details: details,
      description: description,
      contact: contact,
      social: social,
      coreSkills: coreSkills,
      currentInterests: currentInterests,
      pdfLink: pdfLink,
      icons: icons
    };
  };

  $$self.$inject_state = function ($$props) {
    if ('name' in $$props) $$invalidate('name', name = $$props.name);
    if ('title' in $$props) $$invalidate('title', title = $$props.title);
    if ('details' in $$props) $$invalidate('details', details = $$props.details);
    if ('description' in $$props) $$invalidate('description', description = $$props.description);
    if ('contact' in $$props) $$invalidate('contact', contact = $$props.contact);
    if ('social' in $$props) $$invalidate('social', social = $$props.social);
    if ('coreSkills' in $$props) $$invalidate('coreSkills', coreSkills = $$props.coreSkills);
    if ('currentInterests' in $$props) $$invalidate('currentInterests', currentInterests = $$props.currentInterests);
    if ('pdfLink' in $$props) $$invalidate('pdfLink', pdfLink = $$props.pdfLink);
    if ('icons' in $$props) $$invalidate('icons', icons = $$props.icons);
  };

  return {
    truncateUrl: truncateUrl,
    name: name,
    title: title,
    details: details,
    description: description,
    contact: contact,
    social: social,
    coreSkills: coreSkills,
    currentInterests: currentInterests,
    pdfLink: pdfLink,
    icons: icons
  };
}

var Summary =
/*#__PURE__*/
function (_SvelteComponentDev) {
  _inherits(Summary, _SvelteComponentDev);

  function Summary(options) {
    var _this;

    _classCallCheck(this, Summary);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Summary).call(this, options));
    init(_assertThisInitialized(_this), options, instance$b, create_fragment$b, safe_not_equal, ["name", "title", "details", "description", "contact", "social", "coreSkills", "currentInterests", "pdfLink", "icons"]);
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Summary",
      options: options,
      id: create_fragment$b.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (ctx.description === undefined && !('description' in props)) {
      console.warn("<Summary> was created without expected prop 'description'");
    }

    if (ctx.contact === undefined && !('contact' in props)) {
      console.warn("<Summary> was created without expected prop 'contact'");
    }

    if (ctx.social === undefined && !('social' in props)) {
      console.warn("<Summary> was created without expected prop 'social'");
    }

    if (ctx.coreSkills === undefined && !('coreSkills' in props)) {
      console.warn("<Summary> was created without expected prop 'coreSkills'");
    }

    if (ctx.currentInterests === undefined && !('currentInterests' in props)) {
      console.warn("<Summary> was created without expected prop 'currentInterests'");
    }

    if (ctx.pdfLink === undefined && !('pdfLink' in props)) {
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
    key: "description",
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
      duration = _ref2$duration === void 0 ? 400 : _ref2$duration;
  var o = +getComputedStyle(node).opacity;
  return {
    delay: delay,
    duration: duration,
    css: function css(t) {
      return "opacity: ".concat(t * o);
    }
  };
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var file$b = "src/components/Timeline.svelte";

function get_each_context$3(ctx, list, i) {
  var child_ctx = Object.create(ctx);
  child_ctx.event = list[i];
  return child_ctx;
} // (111:0) {#if timelineEvents}


function create_if_block$6(ctx) {
  var div3,
      div0,
      t0_value = ctx.firstDate.year + "",
      t0,
      t1,
      div1,
      t2,
      div2,
      t3_value = ctx.lastDate.year + "",
      t3,
      div3_transition,
      current;
  var each_value = ctx.timelineEvents;
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
      }, false);
      var div3_nodes = children(div3);
      div0 = claim_element(div3_nodes, "DIV", {
        class: true
      }, false);
      var div0_nodes = children(div0);
      t0 = claim_text(div0_nodes, t0_value);
      div0_nodes.forEach(detach_dev);
      t1 = claim_space(div3_nodes);
      div1 = claim_element(div3_nodes, "DIV", {
        class: true
      }, false);
      var div1_nodes = children(div1);

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(div1_nodes);
      }

      div1_nodes.forEach(detach_dev);
      t2 = claim_space(div3_nodes);
      div2 = claim_element(div3_nodes, "DIV", {
        class: true
      }, false);
      var div2_nodes = children(div2);
      t3 = claim_text(div2_nodes, t3_value);
      div2_nodes.forEach(detach_dev);
      div3_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div0, "class", "from-year svelte-ecgmls");
      add_location(div0, file$b, 112, 4, 3925);
      attr_dev(div1, "class", "events svelte-ecgmls");
      add_location(div1, file$b, 113, 4, 3975);
      attr_dev(div2, "class", "to-year svelte-ecgmls");
      add_location(div2, file$b, 122, 4, 4242);
      attr_dev(div3, "class", "timeline svelte-ecgmls");
      add_location(div3, file$b, 111, 2, 3850);
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
      current = true;
    },
    p: function update(changed, ctx) {
      if (changed.timelineEvents) {
        each_value = ctx.timelineEvents;

        var _i4;

        for (_i4 = 0; _i4 < each_value.length; _i4 += 1) {
          var child_ctx = get_each_context$3(ctx, each_value, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(changed, child_ctx);
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
          delay: 250,
          duration: 300
        }, true);
        div3_transition.run(1);
      });
      current = true;
    },
    o: function outro(local) {
      if (!div3_transition) div3_transition = create_bidirectional_transition(div3, fade, {
        delay: 250,
        duration: 300
      }, false);
      div3_transition.run(0);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(div3);
      }

      destroy_each(each_blocks, detaching);

      if (detaching) {
        if (div3_transition) div3_transition.end();
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$6.name,
    type: "if",
    source: "(111:0) {#if timelineEvents}",
    ctx: ctx
  });
  return block;
} // (115:6) {#each timelineEvents as event}


function create_each_block$3(ctx) {
  var div, div_class_value, div_title_value;
  var block = {
    c: function create() {
      div = element("div");
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true,
        style: true,
        title: true
      }, false);
      var div_nodes = children(div);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", div_class_value = "timeline-event " + ctx.event.modifier + " svelte-ecgmls");
      set_style(div, "width", "" + ctx.event.percent + "%");
      attr_dev(div, "title", div_title_value = ctx.event.name);
      toggle_class(div, "visible", ctx.event.isVisible);
      add_location(div, file$b, 115, 8, 4042);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
    },
    p: function update(changed, ctx) {
      if (changed.timelineEvents && div_class_value !== (div_class_value = "timeline-event " + ctx.event.modifier + " svelte-ecgmls")) {
        attr_dev(div, "class", div_class_value);
      }

      if (changed.timelineEvents) {
        set_style(div, "width", "" + ctx.event.percent + "%");
      }

      if (changed.timelineEvents && div_title_value !== (div_title_value = ctx.event.name)) {
        attr_dev(div, "title", div_title_value);
      }

      if (changed.timelineEvents || changed.timelineEvents) {
        toggle_class(div, "visible", ctx.event.isVisible);
      }
    },
    d: function destroy(detaching) {
      if (detaching) {
        detach_dev(div);
      }
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block$3.name,
    type: "each",
    source: "(115:6) {#each timelineEvents as event}",
    ctx: ctx
  });
  return block;
}

function create_fragment$c(ctx) {
  var if_block_anchor, current;
  var if_block = ctx.timelineEvents && create_if_block$6(ctx);
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
    p: function update(changed, ctx) {
      if (ctx.timelineEvents) {
        if (if_block) {
          if_block.p(changed, ctx);
          transition_in(if_block, 1);
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

      if (detaching) {
        detach_dev(if_block_anchor);
      }
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

function instance$c($$self, $$props, $$invalidate) {
  var events = $$props.events,
      intersectionNodes = $$props.intersectionNodes;
  var eventsMonthWithLength = events.map(function (event) {
    return {
      name: event.name,
      modifier: event.isContractor ? 'contract' : 'permanent',
      monthLength: getNumberOfMonthsBetweenDates(event.start, event.end)
    };
  });
  var totalTimelineInMonths = eventsMonthWithLength.reduce(function (acc, curr) {
    return acc + curr.monthLength;
  }, 0);
  var firstDate = events[events.length - 1].start;
  var lastDate = events[0].end;
  var scaledEvents = eventsMonthWithLength.map(function (event) {
    return _objectSpread({}, event, {
      percent: 100 / totalTimelineInMonths * event.monthLength
    });
  });
  var timelineEvents;
  var observer;

  function intersectionCallback(entries) {
    var updatedEvents = _toConsumableArray(scaledEvents);

    entries.forEach(function (entry) {
      var event = updatedEvents.find(function (x) {
        return x.target === entry.target;
      });
      event.isVisible = entry.isIntersecting;
    });
    $$invalidate('timelineEvents', timelineEvents = updatedEvents);
  }

  onMount(function () {
    if (!window.IntersectionObserver) {
      return;
    }

    observer = new IntersectionObserver(intersectionCallback, {
      threshold: 0.5
    });
    intersectionNodes.forEach(function (node, i) {
      if (!scaledEvents[i]) return;
      scaledEvents[i].target = node;
      observer.observe(node);
    });
  });
  onDestroy(function () {
    observer && observer.destroy();
  });
  var writable_props = ['events', 'intersectionNodes'];
  Object.keys($$props).forEach(function (key) {
    if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn("<Timeline> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$set = function ($$props) {
    if ('events' in $$props) $$invalidate('events', events = $$props.events);
    if ('intersectionNodes' in $$props) $$invalidate('intersectionNodes', intersectionNodes = $$props.intersectionNodes);
  };

  $$self.$capture_state = function () {
    return {
      events: events,
      intersectionNodes: intersectionNodes,
      timelineEvents: timelineEvents,
      observer: observer
    };
  };

  $$self.$inject_state = function ($$props) {
    if ('events' in $$props) $$invalidate('events', events = $$props.events);
    if ('intersectionNodes' in $$props) $$invalidate('intersectionNodes', intersectionNodes = $$props.intersectionNodes);
    if ('timelineEvents' in $$props) $$invalidate('timelineEvents', timelineEvents = $$props.timelineEvents);
    if ('observer' in $$props) observer = $$props.observer;
  };

  return {
    events: events,
    intersectionNodes: intersectionNodes,
    firstDate: firstDate,
    lastDate: lastDate,
    timelineEvents: timelineEvents
  };
}

var Timeline =
/*#__PURE__*/
function (_SvelteComponentDev) {
  _inherits(Timeline, _SvelteComponentDev);

  function Timeline(options) {
    var _this;

    _classCallCheck(this, Timeline);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Timeline).call(this, options));
    init(_assertThisInitialized(_this), options, instance$c, create_fragment$c, safe_not_equal, ["events", "intersectionNodes"]);
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Timeline",
      options: options,
      id: create_fragment$c.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (ctx.events === undefined && !('events' in props)) {
      console.warn("<Timeline> was created without expected prop 'events'");
    }

    if (ctx.intersectionNodes === undefined && !('intersectionNodes' in props)) {
      console.warn("<Timeline> was created without expected prop 'intersectionNodes'");
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

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var Object_1$1 = globals.Object,
    document_1 = globals.document;
var file$c = "src/routes/index.svelte";

function get_each_context$4(ctx, list, i) {
  var child_ctx = Object_1$1.create(ctx);
  child_ctx.experience = list[i];
  return child_ctx;
}

function get_each_context_1$3(ctx, list, i) {
  var child_ctx = Object_1$1.create(ctx);
  child_ctx.experience = list[i];
  return child_ctx;
} // (165:6) {#if intersectionNodes}


function create_if_block$7(ctx) {
  var current;
  var timeline = new Timeline({
    props: {
      events: ctx.experienceItems,
      intersectionNodes: ctx.intersectionNodes
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      timeline.$$.fragment.c();
    },
    l: function claim(nodes) {
      timeline.$$.fragment.l(nodes);
    },
    m: function mount(target, anchor) {
      mount_component(timeline, target, anchor);
      current = true;
    },
    p: function update(changed, ctx) {
      var timeline_changes = {};
      if (changed.experienceItems) timeline_changes.events = ctx.experienceItems;
      if (changed.intersectionNodes) timeline_changes.intersectionNodes = ctx.intersectionNodes;
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
    source: "(165:6) {#if intersectionNodes}",
    ctx: ctx
  });
  return block;
} // (169:4) {#each linkedExperienceItems as experience}


function create_each_block_1$3(ctx) {
  var current;
  var experienceitem_spread_levels = [ctx.experience];
  var experienceitem_props = {};

  for (var i = 0; i < experienceitem_spread_levels.length; i += 1) {
    experienceitem_props = assign(experienceitem_props, experienceitem_spread_levels[i]);
  }

  var experienceitem = new ExperienceItem({
    props: experienceitem_props,
    $$inline: true
  });
  var block = {
    c: function create() {
      experienceitem.$$.fragment.c();
    },
    l: function claim(nodes) {
      experienceitem.$$.fragment.l(nodes);
    },
    m: function mount(target, anchor) {
      mount_component(experienceitem, target, anchor);
      current = true;
    },
    p: function update(changed, ctx) {
      var experienceitem_changes = changed.linkedExperienceItems ? get_spread_update(experienceitem_spread_levels, [get_spread_object(ctx.experience)]) : {};
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
    source: "(169:4) {#each linkedExperienceItems as experience}",
    ctx: ctx
  });
  return block;
} // (177:4) {#each educationItems as experience}


function create_each_block$4(ctx) {
  var current;
  var experienceitem_spread_levels = [ctx.experience];
  var experienceitem_props = {};

  for (var i = 0; i < experienceitem_spread_levels.length; i += 1) {
    experienceitem_props = assign(experienceitem_props, experienceitem_spread_levels[i]);
  }

  var experienceitem = new ExperienceItem({
    props: experienceitem_props,
    $$inline: true
  });
  var block = {
    c: function create() {
      experienceitem.$$.fragment.c();
    },
    l: function claim(nodes) {
      experienceitem.$$.fragment.l(nodes);
    },
    m: function mount(target, anchor) {
      mount_component(experienceitem, target, anchor);
      current = true;
    },
    p: function update(changed, ctx) {
      var experienceitem_changes = changed.educationItems ? get_spread_update(experienceitem_spread_levels, [get_spread_object(ctx.experience)]) : {};
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
    source: "(177:4) {#each educationItems as experience}",
    ctx: ctx
  });
  return block;
}

function create_fragment$d(ctx) {
  var title_value, meta0, meta0_content_value, meta1, meta2, meta3, meta3_content_value, meta4, meta4_content_value, meta5, meta6, meta7, meta8, meta8_content_value, meta9, meta9_content_value, meta10, t0, aside, t1, article, section0, header0, h20, t2, t3, t4, t5, section1, header1, h21, t6, t7, t8, p, t9, br, t10, current;
  document_1.title = title_value = "" + ctx.about.name + " - " + ctx.about.title + ": CV";
  var summary_1_spread_levels = [ctx.summary, {
    pdfLink: "tyom-semonov-cv.pdf"
  }];
  var summary_1_props = {};

  for (var i = 0; i < summary_1_spread_levels.length; i += 1) {
    summary_1_props = assign(summary_1_props, summary_1_spread_levels[i]);
  }

  var summary_1 = new Summary({
    props: summary_1_props,
    $$inline: true
  });
  var if_block = ctx.intersectionNodes && create_if_block$7(ctx);
  var each_value_1 = ctx.linkedExperienceItems;
  var each_blocks_1 = [];

  for (var _i = 0; _i < each_value_1.length; _i += 1) {
    each_blocks_1[_i] = create_each_block_1$3(get_each_context_1$3(ctx, each_value_1, _i));
  }

  var out = function out(i) {
    return transition_out(each_blocks_1[i], 1, 1, function () {
      each_blocks_1[i] = null;
    });
  };

  var each_value = ctx.educationItems;
  var each_blocks = [];

  for (var _i2 = 0; _i2 < each_value.length; _i2 += 1) {
    each_blocks[_i2] = create_each_block$4(get_each_context$4(ctx, each_value, _i2));
  }

  var out_1 = function out_1(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };

  var infoicon = new FaInfoCircle({
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
      summary_1.$$.fragment.c();
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
      infoicon.$$.fragment.c();
      t9 = text("\n    For brevity only the last few years are shown here.\n    ");
      br = element("br");
      t10 = text("\n    See more at tyom.semonov.com.");
      this.h();
    },
    l: function claim(nodes) {
      meta0 = claim_element(nodes, "META", {
        name: true,
        content: true,
        class: true
      }, false);
      var meta0_nodes = children(meta0);
      meta0_nodes.forEach(detach_dev);
      meta1 = claim_element(nodes, "META", {
        property: true,
        content: true,
        class: true
      }, false);
      var meta1_nodes = children(meta1);
      meta1_nodes.forEach(detach_dev);
      meta2 = claim_element(nodes, "META", {
        property: true,
        content: true,
        class: true
      }, false);
      var meta2_nodes = children(meta2);
      meta2_nodes.forEach(detach_dev);
      meta3 = claim_element(nodes, "META", {
        property: true,
        content: true,
        class: true
      }, false);
      var meta3_nodes = children(meta3);
      meta3_nodes.forEach(detach_dev);
      meta4 = claim_element(nodes, "META", {
        property: true,
        content: true,
        class: true
      }, false);
      var meta4_nodes = children(meta4);
      meta4_nodes.forEach(detach_dev);
      meta5 = claim_element(nodes, "META", {
        property: true,
        content: true,
        class: true
      }, false);
      var meta5_nodes = children(meta5);
      meta5_nodes.forEach(detach_dev);
      meta6 = claim_element(nodes, "META", {
        property: true,
        content: true,
        class: true
      }, false);
      var meta6_nodes = children(meta6);
      meta6_nodes.forEach(detach_dev);
      meta7 = claim_element(nodes, "META", {
        property: true,
        content: true,
        class: true
      }, false);
      var meta7_nodes = children(meta7);
      meta7_nodes.forEach(detach_dev);
      meta8 = claim_element(nodes, "META", {
        property: true,
        content: true,
        class: true
      }, false);
      var meta8_nodes = children(meta8);
      meta8_nodes.forEach(detach_dev);
      meta9 = claim_element(nodes, "META", {
        property: true,
        content: true,
        class: true
      }, false);
      var meta9_nodes = children(meta9);
      meta9_nodes.forEach(detach_dev);
      meta10 = claim_element(nodes, "META", {
        property: true,
        content: true,
        class: true
      }, false);
      var meta10_nodes = children(meta10);
      meta10_nodes.forEach(detach_dev);
      t0 = claim_space(nodes);
      aside = claim_element(nodes, "ASIDE", {
        class: true
      }, false);
      var aside_nodes = children(aside);
      summary_1.$$.fragment.l(aside_nodes);
      aside_nodes.forEach(detach_dev);
      t1 = claim_space(nodes);
      article = claim_element(nodes, "ARTICLE", {
        class: true
      }, false);
      var article_nodes = children(article);
      section0 = claim_element(article_nodes, "SECTION", {
        class: true
      }, false);
      var section0_nodes = children(section0);
      header0 = claim_element(section0_nodes, "HEADER", {
        class: true
      }, false);
      var header0_nodes = children(header0);
      h20 = claim_element(header0_nodes, "H2", {
        class: true
      }, false);
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
      }, false);
      var section1_nodes = children(section1);
      header1 = claim_element(section1_nodes, "HEADER", {
        class: true
      }, false);
      var header1_nodes = children(header1);
      h21 = claim_element(header1_nodes, "H2", {
        class: true
      }, false);
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
      }, false);
      var p_nodes = children(p);
      infoicon.$$.fragment.l(p_nodes);
      t9 = claim_text(p_nodes, "\n    For brevity only the last few years are shown here.\n    ");
      br = claim_element(p_nodes, "BR", {
        class: true
      }, false);
      var br_nodes = children(br);
      br_nodes.forEach(detach_dev);
      t10 = claim_text(p_nodes, "\n    See more at tyom.semonov.com.");
      p_nodes.forEach(detach_dev);
      article_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(meta0, "name", "description");
      attr_dev(meta0, "content", meta0_content_value = ctx.about.description);
      attr_dev(meta0, "class", "svelte-7ba723");
      add_location(meta0, file$c, 141, 2, 7082);
      attr_dev(meta1, "property", "og:type");
      attr_dev(meta1, "content", "website");
      attr_dev(meta1, "class", "svelte-7ba723");
      add_location(meta1, file$c, 143, 2, 7173);
      attr_dev(meta2, "property", "og:url");
      attr_dev(meta2, "content", "https://tyom.semonov.com/");
      attr_dev(meta2, "class", "svelte-7ba723");
      add_location(meta2, file$c, 144, 2, 7221);
      attr_dev(meta3, "property", "og:title");
      attr_dev(meta3, "content", meta3_content_value = "" + ctx.about.name + " - " + ctx.about.title + ": CV");
      attr_dev(meta3, "class", "svelte-7ba723");
      add_location(meta3, file$c, 145, 2, 7286);
      attr_dev(meta4, "property", "og:description");
      attr_dev(meta4, "content", meta4_content_value = ctx.about.description);
      attr_dev(meta4, "class", "svelte-7ba723");
      add_location(meta4, file$c, 146, 2, 7360);
      attr_dev(meta5, "property", "og:image");
      attr_dev(meta5, "content", "https://tyom.semonov.com/logo.png");
      attr_dev(meta5, "class", "svelte-7ba723");
      add_location(meta5, file$c, 147, 2, 7425);
      attr_dev(meta6, "property", "twitter:card");
      attr_dev(meta6, "content", "summary_large_image");
      attr_dev(meta6, "class", "svelte-7ba723");
      add_location(meta6, file$c, 149, 2, 7519);
      attr_dev(meta7, "property", "twitter:url");
      attr_dev(meta7, "content", "https://tyom.semonov.com/");
      attr_dev(meta7, "class", "svelte-7ba723");
      add_location(meta7, file$c, 150, 2, 7584);
      attr_dev(meta8, "property", "twitter:title");
      attr_dev(meta8, "content", meta8_content_value = "" + ctx.about.name + " - " + ctx.about.title + ": CV");
      attr_dev(meta8, "class", "svelte-7ba723");
      add_location(meta8, file$c, 151, 2, 7654);
      attr_dev(meta9, "property", "twitter:description");
      attr_dev(meta9, "content", meta9_content_value = ctx.about.description);
      attr_dev(meta9, "class", "svelte-7ba723");
      add_location(meta9, file$c, 152, 2, 7733);
      attr_dev(meta10, "property", "twitter:image");
      attr_dev(meta10, "content", "https://tyom.semonov.com/logo.png");
      attr_dev(meta10, "class", "svelte-7ba723");
      add_location(meta10, file$c, 153, 2, 7803);
      attr_dev(aside, "class", "svelte-7ba723");
      add_location(aside, file$c, 156, 0, 7897);
      attr_dev(h20, "class", "svelte-7ba723");
      add_location(h20, file$c, 163, 6, 8048);
      attr_dev(header0, "class", "svelte-7ba723");
      add_location(header0, file$c, 162, 4, 8033);
      attr_dev(section0, "class", "experience svelte-7ba723");
      add_location(section0, file$c, 161, 2, 8000);
      attr_dev(h21, "class", "svelte-7ba723");
      add_location(h21, file$c, 174, 6, 8353);
      attr_dev(header1, "class", "svelte-7ba723");
      add_location(header1, file$c, 173, 4, 8338);
      attr_dev(section1, "class", "education svelte-7ba723");
      add_location(section1, file$c, 172, 2, 8306);
      attr_dev(br, "class", "svelte-7ba723");
      add_location(br, file$c, 184, 4, 8617);
      attr_dev(p, "class", "u-print-only print-details-info svelte-7ba723");
      add_location(p, file$c, 181, 2, 8496);
      attr_dev(article, "class", "content svelte-7ba723");
      add_location(article, file$c, 160, 0, 7972);
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
    p: function update(changed, ctx) {
      if ((!current || changed.about) && title_value !== (title_value = "" + ctx.about.name + " - " + ctx.about.title + ": CV")) {
        document_1.title = title_value;
      }

      if ((!current || changed.about) && meta0_content_value !== (meta0_content_value = ctx.about.description)) {
        attr_dev(meta0, "content", meta0_content_value);
      }

      if ((!current || changed.about) && meta3_content_value !== (meta3_content_value = "" + ctx.about.name + " - " + ctx.about.title + ": CV")) {
        attr_dev(meta3, "content", meta3_content_value);
      }

      if ((!current || changed.about) && meta4_content_value !== (meta4_content_value = ctx.about.description)) {
        attr_dev(meta4, "content", meta4_content_value);
      }

      if ((!current || changed.about) && meta8_content_value !== (meta8_content_value = "" + ctx.about.name + " - " + ctx.about.title + ": CV")) {
        attr_dev(meta8, "content", meta8_content_value);
      }

      if ((!current || changed.about) && meta9_content_value !== (meta9_content_value = ctx.about.description)) {
        attr_dev(meta9, "content", meta9_content_value);
      }

      var summary_1_changes = changed.summary ? get_spread_update(summary_1_spread_levels, [get_spread_object(ctx.summary), summary_1_spread_levels[1]]) : {};
      summary_1.$set(summary_1_changes);

      if (ctx.intersectionNodes) {
        if (if_block) {
          if_block.p(changed, ctx);
          transition_in(if_block, 1);
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

      if (changed.linkedExperienceItems) {
        each_value_1 = ctx.linkedExperienceItems;

        var _i9;

        for (_i9 = 0; _i9 < each_value_1.length; _i9 += 1) {
          var child_ctx = get_each_context_1$3(ctx, each_value_1, _i9);

          if (each_blocks_1[_i9]) {
            each_blocks_1[_i9].p(changed, child_ctx);

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

      if (changed.educationItems) {
        each_value = ctx.educationItems;

        var _i10;

        for (_i10 = 0; _i10 < each_value.length; _i10 += 1) {
          var _child_ctx = get_each_context$4(ctx, each_value, _i10);

          if (each_blocks[_i10]) {
            each_blocks[_i10].p(changed, _child_ctx);

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

      if (detaching) {
        detach_dev(t0);
        detach_dev(aside);
      }

      destroy_component(summary_1);

      if (detaching) {
        detach_dev(t1);
        detach_dev(article);
      }

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
  _preload = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee() {
    var _this2 = this;

    var getData, about, experienceItems, educationItems, definitions;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            getData = function getData(resourceName) {
              return _this2.fetch(resourceName).then(function (res) {
                return res.json();
              });
            };

            _context.next = 3;
            return getData('about.json');

          case 3:
            about = _context.sent;
            _context.next = 6;
            return getData('experience.json');

          case 6:
            experienceItems = _context.sent;
            _context.next = 9;
            return getData('education.json');

          case 9:
            educationItems = _context.sent;
            _context.next = 12;
            return getData('definitions.json');

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
  var about = $$props.about,
      experienceItems = $$props.experienceItems,
      educationItems = $$props.educationItems,
      definitions = $$props.definitions;
  var defLinker = createDefinitionFinder(definitions);
  var coreSkills = buildList(about.coreSkills, defLinker);
  var currentInterests = buildList(about.currentInterests, defLinker);

  var summary = _objectSpread$1({}, about, {
    coreSkills: coreSkills,
    currentInterests: currentInterests
  });

  var linkedExperienceItems = experienceItems.map(function (item) {
    return Object.assign({}, item, {
      technologies: buildList(item.technologies, defLinker)
    });
  });
  var experienceSectionEl;
  var intersectionNodes;
  onMount(function () {
    $$invalidate('intersectionNodes', intersectionNodes = document.querySelectorAll('.experience .experience-item'));
  });
  var writable_props = ['about', 'experienceItems', 'educationItems', 'definitions'];
  Object_1$1.keys($$props).forEach(function (key) {
    if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn("<Index> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$set = function ($$props) {
    if ('about' in $$props) $$invalidate('about', about = $$props.about);
    if ('experienceItems' in $$props) $$invalidate('experienceItems', experienceItems = $$props.experienceItems);
    if ('educationItems' in $$props) $$invalidate('educationItems', educationItems = $$props.educationItems);
    if ('definitions' in $$props) $$invalidate('definitions', definitions = $$props.definitions);
  };

  $$self.$capture_state = function () {
    return {
      about: about,
      experienceItems: experienceItems,
      educationItems: educationItems,
      definitions: definitions,
      experienceSectionEl: experienceSectionEl,
      intersectionNodes: intersectionNodes
    };
  };

  $$self.$inject_state = function ($$props) {
    if ('about' in $$props) $$invalidate('about', about = $$props.about);
    if ('experienceItems' in $$props) $$invalidate('experienceItems', experienceItems = $$props.experienceItems);
    if ('educationItems' in $$props) $$invalidate('educationItems', educationItems = $$props.educationItems);
    if ('definitions' in $$props) $$invalidate('definitions', definitions = $$props.definitions);
    if ('experienceSectionEl' in $$props) experienceSectionEl = $$props.experienceSectionEl;
    if ('intersectionNodes' in $$props) $$invalidate('intersectionNodes', intersectionNodes = $$props.intersectionNodes);
  };

  return {
    about: about,
    experienceItems: experienceItems,
    educationItems: educationItems,
    definitions: definitions,
    summary: summary,
    linkedExperienceItems: linkedExperienceItems,
    intersectionNodes: intersectionNodes
  };
}

var Index =
/*#__PURE__*/
function (_SvelteComponentDev) {
  _inherits(Index, _SvelteComponentDev);

  function Index(options) {
    var _this;

    _classCallCheck(this, Index);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Index).call(this, options));
    init(_assertThisInitialized(_this), options, instance$d, create_fragment$d, safe_not_equal, ["about", "experienceItems", "educationItems", "definitions"]);
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Index",
      options: options,
      id: create_fragment$d.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (ctx.about === undefined && !('about' in props)) {
      console.warn("<Index> was created without expected prop 'about'");
    }

    if (ctx.experienceItems === undefined && !('experienceItems' in props)) {
      console.warn("<Index> was created without expected prop 'experienceItems'");
    }

    if (ctx.educationItems === undefined && !('educationItems' in props)) {
      console.warn("<Index> was created without expected prop 'educationItems'");
    }

    if (ctx.definitions === undefined && !('definitions' in props)) {
      console.warn("<Index> was created without expected prop 'definitions'");
    }

    return _this;
  }

  _createClass(Index, [{
    key: "about",
    get: function get() {
      throw new Error("<Index>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Index>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "experienceItems",
    get: function get() {
      throw new Error("<Index>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Index>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "educationItems",
    get: function get() {
      throw new Error("<Index>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Index>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "definitions",
    get: function get() {
      throw new Error("<Index>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Index>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Index;
}(SvelteComponentDev);

export default Index;
export { preload };
