const Fc = {}, Uc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Fc
}, Symbol.toStringTag, { value: "Module" }));
var Mt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Hc(r) {
  if (r.__esModule)
    return r;
  var e = r.default;
  if (typeof e == "function") {
    var t = function n() {
      if (this instanceof n) {
        var i = [null];
        i.push.apply(i, arguments);
        var a = Function.bind.apply(e, i);
        return new a();
      }
      return e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else
    t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(r).forEach(function(n) {
    var i = Object.getOwnPropertyDescriptor(r, n);
    Object.defineProperty(t, n, i.get ? i : {
      enumerable: !0,
      get: function() {
        return r[n];
      }
    });
  }), t;
}
var Mi = { exports: {} }, Zi = {}, es = {}, rr = {};
Object.defineProperty(rr, "__esModule", { value: !0 });
let Vc = class extends Error {
};
rr.TimeoutError = Vc;
var ie = {}, ts = {};
Object.defineProperty(ts, "__esModule", { value: !0 });
class Wc {
  constructor(e) {
    this._value = e.value, this._error = e.error;
  }
  value() {
    return this._value;
  }
  reason() {
    return this._error;
  }
  isRejected() {
    return !!this._error;
  }
  isFulfilled() {
    return !!this._value;
  }
}
ts.PromiseInspection = Wc;
Object.defineProperty(ie, "__esModule", { value: !0 });
const Qs = ts;
function zc() {
  let r = null, e = null;
  return {
    promise: new Promise((n, i) => {
      r = n, e = i;
    }),
    resolve: r,
    reject: e
  };
}
ie.defer = zc;
function Jc() {
  return Date.now();
}
ie.now = Jc;
function Kc(r, e) {
  return Math.abs(e - r);
}
ie.duration = Kc;
function Gc(r) {
  return typeof r > "u" ? !0 : Jl(r);
}
ie.checkOptionalTime = Gc;
function Jl(r) {
  return typeof r == "number" && r === Math.round(r) && r > 0;
}
ie.checkRequiredTime = Jl;
function Yc(r) {
  return new Promise((e) => setTimeout(e, r));
}
ie.delay = Yc;
function Xc(r) {
  return r.then((e) => new Qs.PromiseInspection({ value: e })).catch((e) => new Qs.PromiseInspection({ error: e }));
}
ie.reflect = Xc;
function Zc(r) {
  try {
    const e = r();
    return Promise.resolve(e);
  } catch (e) {
    return Promise.reject(e);
  }
}
ie.tryPromise = Zc;
Object.defineProperty(es, "__esModule", { value: !0 });
const Jt = rr, eh = ie;
class th {
  constructor(e) {
    this.timeoutMillis = e, this.deferred = eh.defer(), this.possibleTimeoutCause = null, this.isRejected = !1, this.promise = rh(this.deferred.promise, e).catch((t) => (t instanceof Jt.TimeoutError && (this.possibleTimeoutCause ? t = new Jt.TimeoutError(this.possibleTimeoutCause.message) : t = new Jt.TimeoutError("operation timed out for an unknown reason")), this.isRejected = !0, Promise.reject(t)));
  }
  abort() {
    this.reject(new Error("aborted"));
  }
  reject(e) {
    this.deferred.reject(e);
  }
  resolve(e) {
    this.deferred.resolve(e);
  }
}
es.PendingOperation = th;
function rh(r, e) {
  return new Promise((t, n) => {
    const i = setTimeout(() => n(new Jt.TimeoutError()), e);
    r.then((a) => {
      clearTimeout(i), t(a);
    }).catch((a) => {
      clearTimeout(i), n(a);
    });
  });
}
var rs = {};
Object.defineProperty(rs, "__esModule", { value: !0 });
const Ds = ie;
class ns {
  constructor(e) {
    this.resource = e, this.resource = e, this.timestamp = Ds.now(), this.deferred = Ds.defer();
  }
  get promise() {
    return this.deferred.promise;
  }
  resolve() {
    return this.deferred.resolve(void 0), new ns(this.resource);
  }
}
rs.Resource = ns;
const P = /* @__PURE__ */ Hc(Uc);
Object.defineProperty(Zi, "__esModule", { value: !0 });
const Qt = es, nh = rs, Z = ie, ih = P, Fs = P;
let sh = class {
  constructor(e) {
    if (this.destroyed = !1, this.emitter = new ih.EventEmitter(), e = e || {}, !e.create)
      throw new Error("Tarn: opt.create function most be provided");
    if (!e.destroy)
      throw new Error("Tarn: opt.destroy function most be provided");
    if (typeof e.min != "number" || e.min < 0 || e.min !== Math.round(e.min))
      throw new Error("Tarn: opt.min must be an integer >= 0");
    if (typeof e.max != "number" || e.max <= 0 || e.max !== Math.round(e.max))
      throw new Error("Tarn: opt.max must be an integer > 0");
    if (e.min > e.max)
      throw new Error("Tarn: opt.max is smaller than opt.min");
    if (!Z.checkOptionalTime(e.acquireTimeoutMillis))
      throw new Error("Tarn: invalid opt.acquireTimeoutMillis " + JSON.stringify(e.acquireTimeoutMillis));
    if (!Z.checkOptionalTime(e.createTimeoutMillis))
      throw new Error("Tarn: invalid opt.createTimeoutMillis " + JSON.stringify(e.createTimeoutMillis));
    if (!Z.checkOptionalTime(e.destroyTimeoutMillis))
      throw new Error("Tarn: invalid opt.destroyTimeoutMillis " + JSON.stringify(e.destroyTimeoutMillis));
    if (!Z.checkOptionalTime(e.idleTimeoutMillis))
      throw new Error("Tarn: invalid opt.idleTimeoutMillis " + JSON.stringify(e.idleTimeoutMillis));
    if (!Z.checkOptionalTime(e.reapIntervalMillis))
      throw new Error("Tarn: invalid opt.reapIntervalMillis " + JSON.stringify(e.reapIntervalMillis));
    if (!Z.checkOptionalTime(e.createRetryIntervalMillis))
      throw new Error("Tarn: invalid opt.createRetryIntervalMillis " + JSON.stringify(e.createRetryIntervalMillis));
    const t = {
      create: !0,
      validate: !0,
      destroy: !0,
      log: !0,
      min: !0,
      max: !0,
      acquireTimeoutMillis: !0,
      createTimeoutMillis: !0,
      destroyTimeoutMillis: !0,
      idleTimeoutMillis: !0,
      reapIntervalMillis: !0,
      createRetryIntervalMillis: !0,
      propagateCreateError: !0
    };
    for (const n of Object.keys(e))
      if (!t[n])
        throw new Error(`Tarn: unsupported option opt.${n}`);
    this.creator = e.create, this.destroyer = e.destroy, this.validate = typeof e.validate == "function" ? e.validate : () => !0, this.log = e.log || (() => {
    }), this.acquireTimeoutMillis = e.acquireTimeoutMillis || 3e4, this.createTimeoutMillis = e.createTimeoutMillis || 3e4, this.destroyTimeoutMillis = e.destroyTimeoutMillis || 5e3, this.idleTimeoutMillis = e.idleTimeoutMillis || 3e4, this.reapIntervalMillis = e.reapIntervalMillis || 1e3, this.createRetryIntervalMillis = e.createRetryIntervalMillis || 200, this.propagateCreateError = !!e.propagateCreateError, this.min = e.min, this.max = e.max, this.used = [], this.free = [], this.pendingCreates = [], this.pendingAcquires = [], this.pendingDestroys = [], this.pendingValidations = [], this.destroyed = !1, this.interval = null, this.eventId = 1;
  }
  numUsed() {
    return this.used.length;
  }
  numFree() {
    return this.free.length;
  }
  numPendingAcquires() {
    return this.pendingAcquires.length;
  }
  numPendingValidations() {
    return this.pendingValidations.length;
  }
  numPendingCreates() {
    return this.pendingCreates.length;
  }
  acquire() {
    const e = this.eventId++;
    this._executeEventHandlers("acquireRequest", e);
    const t = new Qt.PendingOperation(this.acquireTimeoutMillis);
    return this.pendingAcquires.push(t), t.promise = t.promise.then((n) => (this._executeEventHandlers("acquireSuccess", e, n), n)).catch((n) => (this._executeEventHandlers("acquireFail", e, n), Ke(this.pendingAcquires, t), Promise.reject(n))), this._tryAcquireOrCreate(), t;
  }
  release(e) {
    this._executeEventHandlers("release", e);
    for (let t = 0, n = this.used.length; t < n; ++t) {
      const i = this.used[t];
      if (i.resource === e)
        return this.used.splice(t, 1), this.free.push(i.resolve()), this._tryAcquireOrCreate(), !0;
    }
    return !1;
  }
  isEmpty() {
    return [
      this.numFree(),
      this.numUsed(),
      this.numPendingAcquires(),
      this.numPendingValidations(),
      this.numPendingCreates()
    ].reduce((e, t) => e + t) === 0;
  }
  /**
   * Reaping cycle.
   */
  check() {
    const e = Z.now(), t = [], n = this.min - this.used.length, i = this.free.length - n;
    let a = 0;
    this.free.forEach((o) => {
      Z.duration(e, o.timestamp) >= this.idleTimeoutMillis && a < i ? (a++, this._destroy(o.resource)) : t.push(o);
    }), this.free = t, this.isEmpty() && this._stopReaping();
  }
  destroy() {
    const e = this.eventId++;
    return this._executeEventHandlers("poolDestroyRequest", e), this._stopReaping(), this.destroyed = !0, Z.reflect(Promise.all(this.pendingCreates.map((t) => Z.reflect(t.promise))).then(() => new Promise((t, n) => {
      if (this.numPendingValidations() === 0) {
        t();
        return;
      }
      const i = setInterval(() => {
        this.numPendingValidations() === 0 && (Fs.clearInterval(i), t());
      }, 100);
    })).then(() => Promise.all(this.used.map((t) => Z.reflect(t.promise)))).then(() => Promise.all(this.pendingAcquires.map((t) => (t.abort(), Z.reflect(t.promise))))).then(() => Promise.all(this.free.map((t) => Z.reflect(this._destroy(t.resource))))).then(() => Promise.all(this.pendingDestroys.map((t) => t.promise))).then(() => {
      this.free = [], this.pendingAcquires = [];
    })).then((t) => (this._executeEventHandlers("poolDestroySuccess", e), this.emitter.removeAllListeners(), t));
  }
  on(e, t) {
    this.emitter.on(e, t);
  }
  removeListener(e, t) {
    this.emitter.removeListener(e, t);
  }
  removeAllListeners(e) {
    this.emitter.removeAllListeners(e);
  }
  /**
   * The most important method that is called always when resources
   * are created / destroyed / acquired / released. In other words
   * every time when resources are moved from used to free or vice
   * versa.
   *
   * Either assigns free resources to pendingAcquires or creates new
   * resources if there is room for it in the pool.
   */
  _tryAcquireOrCreate() {
    this.destroyed || (this._hasFreeResources() ? this._doAcquire() : this._shouldCreateMoreResources() && this._doCreate());
  }
  _hasFreeResources() {
    return this.free.length > 0;
  }
  _doAcquire() {
    for (; this._canAcquire(); ) {
      const e = this.pendingAcquires.shift(), t = this.free.pop();
      if (t === void 0 || e === void 0) {
        const i = "this.free was empty while trying to acquire resource";
        throw this.log(`Tarn: ${i}`, "warn"), new Error(`Internal error, should never happen. ${i}`);
      }
      this.pendingValidations.push(e), this.used.push(t);
      const n = new Qt.PendingOperation(this.acquireTimeoutMillis);
      e.promise.catch((i) => {
        n.abort();
      }), n.promise.catch((i) => (this.log("Tarn: resource validator threw an exception " + i.stack, "warn"), !1)).then((i) => {
        try {
          i && !e.isRejected ? (this._startReaping(), e.resolve(t.resource)) : (Ke(this.used, t), i ? this.free.push(t) : (this._destroy(t.resource), setTimeout(() => {
            this._tryAcquireOrCreate();
          }, 0)), e.isRejected || this.pendingAcquires.unshift(e));
        } finally {
          Ke(this.pendingValidations, e);
        }
      }), this._validateResource(t.resource).then((i) => {
        n.resolve(i);
      }).catch((i) => {
        n.reject(i);
      });
    }
  }
  _canAcquire() {
    return this.free.length > 0 && this.pendingAcquires.length > 0;
  }
  _validateResource(e) {
    try {
      return Promise.resolve(this.validate(e));
    } catch (t) {
      return Promise.reject(t);
    }
  }
  _shouldCreateMoreResources() {
    return this.used.length + this.pendingCreates.length < this.max && this.pendingCreates.length < this.pendingAcquires.length;
  }
  _doCreate() {
    const e = this.pendingAcquires.slice();
    this._create().promise.then(() => (this._tryAcquireOrCreate(), null)).catch((n) => {
      this.propagateCreateError && this.pendingAcquires.length !== 0 && this.pendingAcquires[0].reject(n), e.forEach((i) => {
        i.possibleTimeoutCause = n;
      }), Z.delay(this.createRetryIntervalMillis).then(() => this._tryAcquireOrCreate());
    });
  }
  _create() {
    const e = this.eventId++;
    this._executeEventHandlers("createRequest", e);
    const t = new Qt.PendingOperation(this.createTimeoutMillis);
    return t.promise = t.promise.catch((n) => {
      throw Ke(this.pendingCreates, t) && this._executeEventHandlers("createFail", e, n), n;
    }), this.pendingCreates.push(t), oh(this.creator).then((n) => t.isRejected ? (this.destroyer(n), null) : (Ke(this.pendingCreates, t), this.free.push(new nh.Resource(n)), t.resolve(n), this._executeEventHandlers("createSuccess", e, n), null)).catch((n) => (t.isRejected || (Ke(this.pendingCreates, t) && this._executeEventHandlers("createFail", e, n), t.reject(n)), null)), t;
  }
  _destroy(e) {
    const t = this.eventId++;
    this._executeEventHandlers("destroyRequest", t, e);
    const n = new Qt.PendingOperation(this.destroyTimeoutMillis);
    return Promise.resolve().then(() => this.destroyer(e)).then(() => {
      n.resolve(e);
    }).catch((a) => {
      n.reject(a);
    }), this.pendingDestroys.push(n), n.promise.then((a) => (this._executeEventHandlers("destroySuccess", t, e), a)).catch((a) => this._logDestroyerError(t, e, a)).then((a) => {
      const o = this.pendingDestroys.findIndex((s) => s === n);
      return this.pendingDestroys.splice(o, 1), a;
    });
  }
  _logDestroyerError(e, t, n) {
    this._executeEventHandlers("destroyFail", e, t, n), this.log("Tarn: resource destroyer threw an exception " + n.stack, "warn");
  }
  _startReaping() {
    this.interval || (this._executeEventHandlers("startReaping"), this.interval = setInterval(() => this.check(), this.reapIntervalMillis));
  }
  _stopReaping() {
    this.interval !== null && (this._executeEventHandlers("stopReaping"), Fs.clearInterval(this.interval)), this.interval = null;
  }
  _executeEventHandlers(e, ...t) {
    this.emitter.listeners(e).forEach((i) => {
      try {
        i(...t);
      } catch (a) {
        this.log(`Tarn: event handler "${e}" threw an exception ${a.stack}`, "warn");
      }
    });
  }
};
Zi.Pool = sh;
function Ke(r, e) {
  const t = r.indexOf(e);
  return t === -1 ? !1 : (r.splice(t, 1), !0);
}
function oh(r) {
  return new Promise((e, t) => {
    const n = (i, a) => {
      i ? t(i) : e(a);
    };
    Z.tryPromise(() => r(n)).then((i) => {
      i && e(i);
    }).catch((i) => {
      t(i);
    });
  });
}
(function(r, e) {
  Object.defineProperty(e, "__esModule", { value: !0 });
  const t = Zi;
  e.Pool = t.Pool;
  const n = rr;
  e.TimeoutError = n.TimeoutError, r.exports = {
    Pool: t.Pool,
    TimeoutError: n.TimeoutError
  };
})(Mi, Mi.exports);
var ah = Mi.exports;
const Kt = /[\0\b\t\n\r\x1a"'\\]/g, Kl = {
  "\0": "\\0",
  "\b": "\\b",
  "	": "\\t",
  "\n": "\\n",
  "\r": "\\r",
  "": "\\Z",
  '"': '\\"',
  "'": "\\'",
  "\\": "\\\\"
};
function lh(r) {
  return function e(t, n = {}) {
    return r(t, e, n);
  };
}
function uh(r = {}) {
  const e = r.escapeDate || Xl, t = r.escapeArray || is, n = r.escapeBuffer || Yl, i = r.escapeString || ss, a = r.escapeObject || Gl, o = r.wrap || lh;
  function s(l, u, h) {
    if (l == null)
      return "NULL";
    switch (typeof l) {
      case "boolean":
        return l ? "true" : "false";
      case "number":
        return l + "";
      case "object":
        if (l instanceof Date)
          l = e(l, u, h);
        else
          return Array.isArray(l) ? t(l, u, h) : Buffer.isBuffer(l) ? n(l, u, h) : a(l, u, h);
    }
    return i(l, u, h);
  }
  return o ? o(s) : s;
}
function Gl(r, e, t) {
  return r && typeof r.toSQL == "function" ? r.toSQL(t) : JSON.stringify(r);
}
function is(r, e, t) {
  let n = "";
  for (let i = 0; i < r.length; i++) {
    const a = r[i];
    Array.isArray(a) ? n += (i === 0 ? "" : ", ") + "(" + is(a, e, t) + ")" : n += (i === 0 ? "" : ", ") + e(a, t);
  }
  return n;
}
function Yl(r) {
  return "X" + ss(r.toString("hex"));
}
function ss(r, e, t) {
  let n = Kt.lastIndex = 0, i = "", a;
  for (; a = Kt.exec(r); )
    i += r.slice(n, a.index) + Kl[a[0]], n = Kt.lastIndex;
  return n === 0 ? "'" + r + "'" : n < r.length ? "'" + i + r.slice(n) + "'" : "'" + i + "'";
}
function Xl(r, e, t = {}) {
  const n = t.timeZone || "local", i = new Date(r);
  let a, o, s, l, u, h, c;
  if (n === "local")
    a = i.getFullYear(), o = i.getMonth() + 1, s = i.getDate(), l = i.getHours(), u = i.getMinutes(), h = i.getSeconds(), c = i.getMilliseconds();
  else {
    const d = ch(n);
    d !== !1 && d !== 0 && i.setTime(i.getTime() + d * 6e4), a = i.getUTCFullYear(), o = i.getUTCMonth() + 1, s = i.getUTCDate(), l = i.getUTCHours(), u = i.getUTCMinutes(), h = i.getUTCSeconds(), c = i.getUTCMilliseconds();
  }
  return xe(a, 4) + "-" + xe(o, 2) + "-" + xe(s, 2) + " " + xe(l, 2) + ":" + xe(u, 2) + ":" + xe(h, 2) + "." + xe(c, 3);
}
function xe(r, e) {
  for (r = r.toString(); r.length < e; )
    r = "0" + r;
  return r;
}
function ch(r) {
  if (r === "Z")
    return 0;
  const e = r.match(/([+\-\s])(\d\d):?(\d\d)?/);
  return e ? (e[1] == "-" ? -1 : 1) * (parseInt(e[2], 10) + (e[3] ? parseInt(e[3], 10) : 0) / 60) * 60 : !1;
}
var os = {
  arrayToList: is,
  bufferToString: Yl,
  dateToString: Xl,
  escapeString: ss,
  charsRegex: Kt,
  charsMap: Kl,
  escapeObject: Gl,
  makeEscape: uh
};
function hh() {
  this.__data__ = [], this.size = 0;
}
var dh = hh;
function fh(r, e) {
  return r === e || r !== r && e !== e;
}
var tt = fh, ph = tt;
function mh(r, e) {
  for (var t = r.length; t--; )
    if (ph(r[t][0], e))
      return t;
  return -1;
}
var nr = mh, gh = nr, yh = Array.prototype, bh = yh.splice;
function _h(r) {
  var e = this.__data__, t = gh(e, r);
  if (t < 0)
    return !1;
  var n = e.length - 1;
  return t == n ? e.pop() : bh.call(e, t, 1), --this.size, !0;
}
var wh = _h, $h = nr;
function Ch(r) {
  var e = this.__data__, t = $h(e, r);
  return t < 0 ? void 0 : e[t][1];
}
var vh = Ch, Eh = nr;
function Th(r) {
  return Eh(this.__data__, r) > -1;
}
var Ah = Th, Oh = nr;
function Nh(r, e) {
  var t = this.__data__, n = Oh(t, r);
  return n < 0 ? (++this.size, t.push([r, e])) : t[n][1] = e, this;
}
var qh = Nh, Rh = dh, Sh = wh, xh = vh, Ih = Ah, Ph = qh;
function rt(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.clear(); ++e < t; ) {
    var n = r[e];
    this.set(n[0], n[1]);
  }
}
rt.prototype.clear = Rh;
rt.prototype.delete = Sh;
rt.prototype.get = xh;
rt.prototype.has = Ih;
rt.prototype.set = Ph;
var ir = rt, Lh = ir;
function Bh() {
  this.__data__ = new Lh(), this.size = 0;
}
var kh = Bh;
function jh(r) {
  var e = this.__data__, t = e.delete(r);
  return this.size = e.size, t;
}
var Mh = jh;
function Qh(r) {
  return this.__data__.get(r);
}
var Dh = Qh;
function Fh(r) {
  return this.__data__.has(r);
}
var Uh = Fh, Hh = typeof Mt == "object" && Mt && Mt.Object === Object && Mt, Zl = Hh, Vh = Zl, Wh = typeof self == "object" && self && self.Object === Object && self, zh = Vh || Wh || Function("return this")(), he = zh, Jh = he, Kh = Jh.Symbol, Be = Kh, Us = Be, eu = Object.prototype, Gh = eu.hasOwnProperty, Yh = eu.toString, bt = Us ? Us.toStringTag : void 0;
function Xh(r) {
  var e = Gh.call(r, bt), t = r[bt];
  try {
    r[bt] = void 0;
    var n = !0;
  } catch {
  }
  var i = Yh.call(r);
  return n && (e ? r[bt] = t : delete r[bt]), i;
}
var Zh = Xh, ed = Object.prototype, td = ed.toString;
function rd(r) {
  return td.call(r);
}
var nd = rd, Hs = Be, id = Zh, sd = nd, od = "[object Null]", ad = "[object Undefined]", Vs = Hs ? Hs.toStringTag : void 0;
function ld(r) {
  return r == null ? r === void 0 ? ad : od : Vs && Vs in Object(r) ? id(r) : sd(r);
}
var ke = ld;
function ud(r) {
  var e = typeof r;
  return r != null && (e == "object" || e == "function");
}
var se = ud, cd = ke, hd = se, dd = "[object AsyncFunction]", fd = "[object Function]", pd = "[object GeneratorFunction]", md = "[object Proxy]";
function gd(r) {
  if (!hd(r))
    return !1;
  var e = cd(r);
  return e == fd || e == pd || e == dd || e == md;
}
var sr = gd, yd = he, bd = yd["__core-js_shared__"], _d = bd, Mr = _d, Ws = function() {
  var r = /[^.]+$/.exec(Mr && Mr.keys && Mr.keys.IE_PROTO || "");
  return r ? "Symbol(src)_1." + r : "";
}();
function wd(r) {
  return !!Ws && Ws in r;
}
var $d = wd, Cd = Function.prototype, vd = Cd.toString;
function Ed(r) {
  if (r != null) {
    try {
      return vd.call(r);
    } catch {
    }
    try {
      return r + "";
    } catch {
    }
  }
  return "";
}
var tu = Ed, Td = sr, Ad = $d, Od = se, Nd = tu, qd = /[\\^$.*+?()[\]{}|]/g, Rd = /^\[object .+?Constructor\]$/, Sd = Function.prototype, xd = Object.prototype, Id = Sd.toString, Pd = xd.hasOwnProperty, Ld = RegExp(
  "^" + Id.call(Pd).replace(qd, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Bd(r) {
  if (!Od(r) || Ad(r))
    return !1;
  var e = Td(r) ? Ld : Rd;
  return e.test(Nd(r));
}
var kd = Bd;
function jd(r, e) {
  return r == null ? void 0 : r[e];
}
var Md = jd, Qd = kd, Dd = Md;
function Fd(r, e) {
  var t = Dd(r, e);
  return Qd(t) ? t : void 0;
}
var je = Fd, Ud = je, Hd = he, Vd = Ud(Hd, "Map"), as = Vd, Wd = je, zd = Wd(Object, "create"), or = zd, zs = or;
function Jd() {
  this.__data__ = zs ? zs(null) : {}, this.size = 0;
}
var Kd = Jd;
function Gd(r) {
  var e = this.has(r) && delete this.__data__[r];
  return this.size -= e ? 1 : 0, e;
}
var Yd = Gd, Xd = or, Zd = "__lodash_hash_undefined__", ef = Object.prototype, tf = ef.hasOwnProperty;
function rf(r) {
  var e = this.__data__;
  if (Xd) {
    var t = e[r];
    return t === Zd ? void 0 : t;
  }
  return tf.call(e, r) ? e[r] : void 0;
}
var nf = rf, sf = or, of = Object.prototype, af = of.hasOwnProperty;
function lf(r) {
  var e = this.__data__;
  return sf ? e[r] !== void 0 : af.call(e, r);
}
var uf = lf, cf = or, hf = "__lodash_hash_undefined__";
function df(r, e) {
  var t = this.__data__;
  return this.size += this.has(r) ? 0 : 1, t[r] = cf && e === void 0 ? hf : e, this;
}
var ff = df, pf = Kd, mf = Yd, gf = nf, yf = uf, bf = ff;
function nt(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.clear(); ++e < t; ) {
    var n = r[e];
    this.set(n[0], n[1]);
  }
}
nt.prototype.clear = pf;
nt.prototype.delete = mf;
nt.prototype.get = gf;
nt.prototype.has = yf;
nt.prototype.set = bf;
var _f = nt, Js = _f, wf = ir, $f = as;
function Cf() {
  this.size = 0, this.__data__ = {
    hash: new Js(),
    map: new ($f || wf)(),
    string: new Js()
  };
}
var vf = Cf;
function Ef(r) {
  var e = typeof r;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? r !== "__proto__" : r === null;
}
var Tf = Ef, Af = Tf;
function Of(r, e) {
  var t = r.__data__;
  return Af(e) ? t[typeof e == "string" ? "string" : "hash"] : t.map;
}
var ar = Of, Nf = ar;
function qf(r) {
  var e = Nf(this, r).delete(r);
  return this.size -= e ? 1 : 0, e;
}
var Rf = qf, Sf = ar;
function xf(r) {
  return Sf(this, r).get(r);
}
var If = xf, Pf = ar;
function Lf(r) {
  return Pf(this, r).has(r);
}
var Bf = Lf, kf = ar;
function jf(r, e) {
  var t = kf(this, r), n = t.size;
  return t.set(r, e), this.size += t.size == n ? 0 : 1, this;
}
var Mf = jf, Qf = vf, Df = Rf, Ff = If, Uf = Bf, Hf = Mf;
function it(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.clear(); ++e < t; ) {
    var n = r[e];
    this.set(n[0], n[1]);
  }
}
it.prototype.clear = Qf;
it.prototype.delete = Df;
it.prototype.get = Ff;
it.prototype.has = Uf;
it.prototype.set = Hf;
var ls = it, Vf = ir, Wf = as, zf = ls, Jf = 200;
function Kf(r, e) {
  var t = this.__data__;
  if (t instanceof Vf) {
    var n = t.__data__;
    if (!Wf || n.length < Jf - 1)
      return n.push([r, e]), this.size = ++t.size, this;
    t = this.__data__ = new zf(n);
  }
  return t.set(r, e), this.size = t.size, this;
}
var Gf = Kf, Yf = ir, Xf = kh, Zf = Mh, ep = Dh, tp = Uh, rp = Gf;
function st(r) {
  var e = this.__data__ = new Yf(r);
  this.size = e.size;
}
st.prototype.clear = Xf;
st.prototype.delete = Zf;
st.prototype.get = ep;
st.prototype.has = tp;
st.prototype.set = rp;
var lr = st;
function np(r, e) {
  for (var t = -1, n = r == null ? 0 : r.length; ++t < n && e(r[t], t, r) !== !1; )
    ;
  return r;
}
var us = np, ip = je, sp = function() {
  try {
    var r = ip(Object, "defineProperty");
    return r({}, "", {}), r;
  } catch {
  }
}(), ru = sp, Ks = ru;
function op(r, e, t) {
  e == "__proto__" && Ks ? Ks(r, e, {
    configurable: !0,
    enumerable: !0,
    value: t,
    writable: !0
  }) : r[e] = t;
}
var ur = op, ap = ur, lp = tt, up = Object.prototype, cp = up.hasOwnProperty;
function hp(r, e, t) {
  var n = r[e];
  (!(cp.call(r, e) && lp(n, t)) || t === void 0 && !(e in r)) && ap(r, e, t);
}
var cr = hp, dp = cr, fp = ur;
function pp(r, e, t, n) {
  var i = !t;
  t || (t = {});
  for (var a = -1, o = e.length; ++a < o; ) {
    var s = e[a], l = n ? n(t[s], r[s], s, t, r) : void 0;
    l === void 0 && (l = r[s]), i ? fp(t, s, l) : dp(t, s, l);
  }
  return t;
}
var Me = pp;
function mp(r, e) {
  for (var t = -1, n = Array(r); ++t < r; )
    n[t] = e(t);
  return n;
}
var gp = mp;
function yp(r) {
  return r != null && typeof r == "object";
}
var de = yp, bp = ke, _p = de, wp = "[object Arguments]";
function $p(r) {
  return _p(r) && bp(r) == wp;
}
var Cp = $p, Gs = Cp, vp = de, nu = Object.prototype, Ep = nu.hasOwnProperty, Tp = nu.propertyIsEnumerable, Ap = Gs(function() {
  return arguments;
}()) ? Gs : function(r) {
  return vp(r) && Ep.call(r, "callee") && !Tp.call(r, "callee");
}, Nt = Ap, Op = Array.isArray, U = Op, Yt = { exports: {} };
function Np() {
  return !1;
}
var qp = Np;
Yt.exports;
(function(r, e) {
  var t = he, n = qp, i = e && !e.nodeType && e, a = i && !0 && r && !r.nodeType && r, o = a && a.exports === i, s = o ? t.Buffer : void 0, l = s ? s.isBuffer : void 0, u = l || n;
  r.exports = u;
})(Yt, Yt.exports);
var ot = Yt.exports, Rp = 9007199254740991, Sp = /^(?:0|[1-9]\d*)$/;
function xp(r, e) {
  var t = typeof r;
  return e = e ?? Rp, !!e && (t == "number" || t != "symbol" && Sp.test(r)) && r > -1 && r % 1 == 0 && r < e;
}
var hr = xp, Ip = 9007199254740991;
function Pp(r) {
  return typeof r == "number" && r > -1 && r % 1 == 0 && r <= Ip;
}
var cs = Pp, Lp = ke, Bp = cs, kp = de, jp = "[object Arguments]", Mp = "[object Array]", Qp = "[object Boolean]", Dp = "[object Date]", Fp = "[object Error]", Up = "[object Function]", Hp = "[object Map]", Vp = "[object Number]", Wp = "[object Object]", zp = "[object RegExp]", Jp = "[object Set]", Kp = "[object String]", Gp = "[object WeakMap]", Yp = "[object ArrayBuffer]", Xp = "[object DataView]", Zp = "[object Float32Array]", em = "[object Float64Array]", tm = "[object Int8Array]", rm = "[object Int16Array]", nm = "[object Int32Array]", im = "[object Uint8Array]", sm = "[object Uint8ClampedArray]", om = "[object Uint16Array]", am = "[object Uint32Array]", k = {};
k[Zp] = k[em] = k[tm] = k[rm] = k[nm] = k[im] = k[sm] = k[om] = k[am] = !0;
k[jp] = k[Mp] = k[Yp] = k[Qp] = k[Xp] = k[Dp] = k[Fp] = k[Up] = k[Hp] = k[Vp] = k[Wp] = k[zp] = k[Jp] = k[Kp] = k[Gp] = !1;
function lm(r) {
  return kp(r) && Bp(r.length) && !!k[Lp(r)];
}
var um = lm;
function cm(r) {
  return function(e) {
    return r(e);
  };
}
var hs = cm, Xt = { exports: {} };
Xt.exports;
(function(r, e) {
  var t = Zl, n = e && !e.nodeType && e, i = n && !0 && r && !r.nodeType && r, a = i && i.exports === n, o = a && t.process, s = function() {
    try {
      var l = i && i.require && i.require("util").types;
      return l || o && o.binding && o.binding("util");
    } catch {
    }
  }();
  r.exports = s;
})(Xt, Xt.exports);
var ds = Xt.exports, hm = um, dm = hs, Ys = ds, Xs = Ys && Ys.isTypedArray, fm = Xs ? dm(Xs) : hm, at = fm, pm = gp, mm = Nt, gm = U, ym = ot, bm = hr, _m = at, wm = Object.prototype, $m = wm.hasOwnProperty;
function Cm(r, e) {
  var t = gm(r), n = !t && mm(r), i = !t && !n && ym(r), a = !t && !n && !i && _m(r), o = t || n || i || a, s = o ? pm(r.length, String) : [], l = s.length;
  for (var u in r)
    (e || $m.call(r, u)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    a && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    bm(u, l))) && s.push(u);
  return s;
}
var iu = Cm, vm = Object.prototype;
function Em(r) {
  var e = r && r.constructor, t = typeof e == "function" && e.prototype || vm;
  return r === t;
}
var qt = Em;
function Tm(r, e) {
  return function(t) {
    return r(e(t));
  };
}
var su = Tm, Am = su, Om = Am(Object.keys, Object), Nm = Om, qm = qt, Rm = Nm, Sm = Object.prototype, xm = Sm.hasOwnProperty;
function Im(r) {
  if (!qm(r))
    return Rm(r);
  var e = [];
  for (var t in Object(r))
    xm.call(r, t) && t != "constructor" && e.push(t);
  return e;
}
var ou = Im, Pm = sr, Lm = cs;
function Bm(r) {
  return r != null && Lm(r.length) && !Pm(r);
}
var be = Bm, km = iu, jm = ou, Mm = be;
function Qm(r) {
  return Mm(r) ? km(r) : jm(r);
}
var Qe = Qm, Dm = Me, Fm = Qe;
function Um(r, e) {
  return r && Dm(e, Fm(e), r);
}
var Hm = Um;
function Vm(r) {
  var e = [];
  if (r != null)
    for (var t in Object(r))
      e.push(t);
  return e;
}
var Wm = Vm, zm = se, Jm = qt, Km = Wm, Gm = Object.prototype, Ym = Gm.hasOwnProperty;
function Xm(r) {
  if (!zm(r))
    return Km(r);
  var e = Jm(r), t = [];
  for (var n in r)
    n == "constructor" && (e || !Ym.call(r, n)) || t.push(n);
  return t;
}
var Zm = Xm, eg = iu, tg = Zm, rg = be;
function ng(r) {
  return rg(r) ? eg(r, !0) : tg(r);
}
var De = ng, ig = Me, sg = De;
function og(r, e) {
  return r && ig(e, sg(e), r);
}
var ag = og, Zt = { exports: {} };
Zt.exports;
(function(r, e) {
  var t = he, n = e && !e.nodeType && e, i = n && !0 && r && !r.nodeType && r, a = i && i.exports === n, o = a ? t.Buffer : void 0, s = o ? o.allocUnsafe : void 0;
  function l(u, h) {
    if (h)
      return u.slice();
    var c = u.length, d = s ? s(c) : new u.constructor(c);
    return u.copy(d), d;
  }
  r.exports = l;
})(Zt, Zt.exports);
var au = Zt.exports;
function lg(r, e) {
  var t = -1, n = r.length;
  for (e || (e = Array(n)); ++t < n; )
    e[t] = r[t];
  return e;
}
var fs = lg;
function ug(r, e) {
  for (var t = -1, n = r == null ? 0 : r.length, i = 0, a = []; ++t < n; ) {
    var o = r[t];
    e(o, t, r) && (a[i++] = o);
  }
  return a;
}
var ps = ug;
function cg() {
  return [];
}
var lu = cg, hg = ps, dg = lu, fg = Object.prototype, pg = fg.propertyIsEnumerable, Zs = Object.getOwnPropertySymbols, mg = Zs ? function(r) {
  return r == null ? [] : (r = Object(r), hg(Zs(r), function(e) {
    return pg.call(r, e);
  }));
} : dg, ms = mg, gg = Me, yg = ms;
function bg(r, e) {
  return gg(r, yg(r), e);
}
var _g = bg;
function wg(r, e) {
  for (var t = -1, n = e.length, i = r.length; ++t < n; )
    r[i + t] = e[t];
  return r;
}
var gs = wg, $g = su, Cg = $g(Object.getPrototypeOf, Object), dr = Cg, vg = gs, Eg = dr, Tg = ms, Ag = lu, Og = Object.getOwnPropertySymbols, Ng = Og ? function(r) {
  for (var e = []; r; )
    vg(e, Tg(r)), r = Eg(r);
  return e;
} : Ag, uu = Ng, qg = Me, Rg = uu;
function Sg(r, e) {
  return qg(r, Rg(r), e);
}
var xg = Sg, Ig = gs, Pg = U;
function Lg(r, e, t) {
  var n = e(r);
  return Pg(r) ? n : Ig(n, t(r));
}
var cu = Lg, Bg = cu, kg = ms, jg = Qe;
function Mg(r) {
  return Bg(r, jg, kg);
}
var hu = Mg, Qg = cu, Dg = uu, Fg = De;
function Ug(r) {
  return Qg(r, Fg, Dg);
}
var du = Ug, Hg = je, Vg = he, Wg = Hg(Vg, "DataView"), zg = Wg, Jg = je, Kg = he, Gg = Jg(Kg, "Promise"), Yg = Gg, Xg = je, Zg = he, ey = Xg(Zg, "Set"), fu = ey, ty = je, ry = he, ny = ty(ry, "WeakMap"), iy = ny, Qi = zg, Di = as, Fi = Yg, Ui = fu, Hi = iy, pu = ke, lt = tu, eo = "[object Map]", sy = "[object Object]", to = "[object Promise]", ro = "[object Set]", no = "[object WeakMap]", io = "[object DataView]", oy = lt(Qi), ay = lt(Di), ly = lt(Fi), uy = lt(Ui), cy = lt(Hi), Ie = pu;
(Qi && Ie(new Qi(new ArrayBuffer(1))) != io || Di && Ie(new Di()) != eo || Fi && Ie(Fi.resolve()) != to || Ui && Ie(new Ui()) != ro || Hi && Ie(new Hi()) != no) && (Ie = function(r) {
  var e = pu(r), t = e == sy ? r.constructor : void 0, n = t ? lt(t) : "";
  if (n)
    switch (n) {
      case oy:
        return io;
      case ay:
        return eo;
      case ly:
        return to;
      case uy:
        return ro;
      case cy:
        return no;
    }
  return e;
});
var ut = Ie, hy = Object.prototype, dy = hy.hasOwnProperty;
function fy(r) {
  var e = r.length, t = new r.constructor(e);
  return e && typeof r[0] == "string" && dy.call(r, "index") && (t.index = r.index, t.input = r.input), t;
}
var py = fy, my = he, gy = my.Uint8Array, mu = gy, so = mu;
function yy(r) {
  var e = new r.constructor(r.byteLength);
  return new so(e).set(new so(r)), e;
}
var ys = yy, by = ys;
function _y(r, e) {
  var t = e ? by(r.buffer) : r.buffer;
  return new r.constructor(t, r.byteOffset, r.byteLength);
}
var wy = _y, $y = /\w*$/;
function Cy(r) {
  var e = new r.constructor(r.source, $y.exec(r));
  return e.lastIndex = r.lastIndex, e;
}
var vy = Cy, oo = Be, ao = oo ? oo.prototype : void 0, lo = ao ? ao.valueOf : void 0;
function Ey(r) {
  return lo ? Object(lo.call(r)) : {};
}
var Ty = Ey, Ay = ys;
function Oy(r, e) {
  var t = e ? Ay(r.buffer) : r.buffer;
  return new r.constructor(t, r.byteOffset, r.length);
}
var gu = Oy, Ny = ys, qy = wy, Ry = vy, Sy = Ty, xy = gu, Iy = "[object Boolean]", Py = "[object Date]", Ly = "[object Map]", By = "[object Number]", ky = "[object RegExp]", jy = "[object Set]", My = "[object String]", Qy = "[object Symbol]", Dy = "[object ArrayBuffer]", Fy = "[object DataView]", Uy = "[object Float32Array]", Hy = "[object Float64Array]", Vy = "[object Int8Array]", Wy = "[object Int16Array]", zy = "[object Int32Array]", Jy = "[object Uint8Array]", Ky = "[object Uint8ClampedArray]", Gy = "[object Uint16Array]", Yy = "[object Uint32Array]";
function Xy(r, e, t) {
  var n = r.constructor;
  switch (e) {
    case Dy:
      return Ny(r);
    case Iy:
    case Py:
      return new n(+r);
    case Fy:
      return qy(r, t);
    case Uy:
    case Hy:
    case Vy:
    case Wy:
    case zy:
    case Jy:
    case Ky:
    case Gy:
    case Yy:
      return xy(r, t);
    case Ly:
      return new n();
    case By:
    case My:
      return new n(r);
    case ky:
      return Ry(r);
    case jy:
      return new n();
    case Qy:
      return Sy(r);
  }
}
var Zy = Xy, eb = se, uo = Object.create, tb = function() {
  function r() {
  }
  return function(e) {
    if (!eb(e))
      return {};
    if (uo)
      return uo(e);
    r.prototype = e;
    var t = new r();
    return r.prototype = void 0, t;
  };
}(), yu = tb, rb = yu, nb = dr, ib = qt;
function sb(r) {
  return typeof r.constructor == "function" && !ib(r) ? rb(nb(r)) : {};
}
var bu = sb, ob = ut, ab = de, lb = "[object Map]";
function ub(r) {
  return ab(r) && ob(r) == lb;
}
var cb = ub, hb = cb, db = hs, co = ds, ho = co && co.isMap, fb = ho ? db(ho) : hb, pb = fb, mb = ut, gb = de, yb = "[object Set]";
function bb(r) {
  return gb(r) && mb(r) == yb;
}
var _b = bb, wb = _b, $b = hs, fo = ds, po = fo && fo.isSet, Cb = po ? $b(po) : wb, vb = Cb, Eb = lr, Tb = us, Ab = cr, Ob = Hm, Nb = ag, qb = au, Rb = fs, Sb = _g, xb = xg, Ib = hu, Pb = du, Lb = ut, Bb = py, kb = Zy, jb = bu, Mb = U, Qb = ot, Db = pb, Fb = se, Ub = vb, Hb = Qe, Vb = De, Wb = 1, zb = 2, Jb = 4, _u = "[object Arguments]", Kb = "[object Array]", Gb = "[object Boolean]", Yb = "[object Date]", Xb = "[object Error]", wu = "[object Function]", Zb = "[object GeneratorFunction]", e_ = "[object Map]", t_ = "[object Number]", $u = "[object Object]", r_ = "[object RegExp]", n_ = "[object Set]", i_ = "[object String]", s_ = "[object Symbol]", o_ = "[object WeakMap]", a_ = "[object ArrayBuffer]", l_ = "[object DataView]", u_ = "[object Float32Array]", c_ = "[object Float64Array]", h_ = "[object Int8Array]", d_ = "[object Int16Array]", f_ = "[object Int32Array]", p_ = "[object Uint8Array]", m_ = "[object Uint8ClampedArray]", g_ = "[object Uint16Array]", y_ = "[object Uint32Array]", B = {};
B[_u] = B[Kb] = B[a_] = B[l_] = B[Gb] = B[Yb] = B[u_] = B[c_] = B[h_] = B[d_] = B[f_] = B[e_] = B[t_] = B[$u] = B[r_] = B[n_] = B[i_] = B[s_] = B[p_] = B[m_] = B[g_] = B[y_] = !0;
B[Xb] = B[wu] = B[o_] = !1;
function Gt(r, e, t, n, i, a) {
  var o, s = e & Wb, l = e & zb, u = e & Jb;
  if (t && (o = i ? t(r, n, i, a) : t(r)), o !== void 0)
    return o;
  if (!Fb(r))
    return r;
  var h = Mb(r);
  if (h) {
    if (o = Bb(r), !s)
      return Rb(r, o);
  } else {
    var c = Lb(r), d = c == wu || c == Zb;
    if (Qb(r))
      return qb(r, s);
    if (c == $u || c == _u || d && !i) {
      if (o = l || d ? {} : jb(r), !s)
        return l ? xb(r, Nb(o, r)) : Sb(r, Ob(o, r));
    } else {
      if (!B[c])
        return i ? r : {};
      o = kb(r, c, s);
    }
  }
  a || (a = new Eb());
  var p = a.get(r);
  if (p)
    return p;
  a.set(r, o), Ub(r) ? r.forEach(function(f) {
    o.add(Gt(f, e, t, f, r, a));
  }) : Db(r) && r.forEach(function(f, m) {
    o.set(m, Gt(f, e, t, m, r, a));
  });
  var g = u ? l ? Pb : Ib : l ? Vb : Hb, _ = h ? void 0 : g(r);
  return Tb(_ || r, function(f, m) {
    _ && (m = f, f = r[m]), Ab(o, m, Gt(f, e, t, m, r, a));
  }), o;
}
var Cu = Gt, b_ = Cu, __ = 1, w_ = 4;
function $_(r) {
  return b_(r, __ | w_);
}
var C_ = $_;
function v_(r) {
  return r;
}
var oe = v_;
function E_(r, e, t) {
  switch (t.length) {
    case 0:
      return r.call(e);
    case 1:
      return r.call(e, t[0]);
    case 2:
      return r.call(e, t[0], t[1]);
    case 3:
      return r.call(e, t[0], t[1], t[2]);
  }
  return r.apply(e, t);
}
var T_ = E_, A_ = T_, mo = Math.max;
function O_(r, e, t) {
  return e = mo(e === void 0 ? r.length - 1 : e, 0), function() {
    for (var n = arguments, i = -1, a = mo(n.length - e, 0), o = Array(a); ++i < a; )
      o[i] = n[e + i];
    i = -1;
    for (var s = Array(e + 1); ++i < e; )
      s[i] = n[i];
    return s[e] = t(o), A_(r, this, s);
  };
}
var N_ = O_;
function q_(r) {
  return function() {
    return r;
  };
}
var vu = q_, R_ = vu, go = ru, S_ = oe, x_ = go ? function(r, e) {
  return go(r, "toString", {
    configurable: !0,
    enumerable: !1,
    value: R_(e),
    writable: !0
  });
} : S_, I_ = x_, P_ = 800, L_ = 16, B_ = Date.now;
function k_(r) {
  var e = 0, t = 0;
  return function() {
    var n = B_(), i = L_ - (n - t);
    if (t = n, i > 0) {
      if (++e >= P_)
        return arguments[0];
    } else
      e = 0;
    return r.apply(void 0, arguments);
  };
}
var j_ = k_, M_ = I_, Q_ = j_, D_ = Q_(M_), F_ = D_, U_ = oe, H_ = N_, V_ = F_;
function W_(r, e) {
  return V_(H_(r, e, U_), r + "");
}
var bs = W_, z_ = tt, J_ = be, K_ = hr, G_ = se;
function Y_(r, e, t) {
  if (!G_(t))
    return !1;
  var n = typeof e;
  return (n == "number" ? J_(t) && K_(e, t.length) : n == "string" && e in t) ? z_(t[e], r) : !1;
}
var fr = Y_, X_ = bs, Z_ = tt, ew = fr, tw = De, Eu = Object.prototype, rw = Eu.hasOwnProperty, nw = X_(function(r, e) {
  r = Object(r);
  var t = -1, n = e.length, i = n > 2 ? e[2] : void 0;
  for (i && ew(e[0], e[1], i) && (n = 1); ++t < n; )
    for (var a = e[t], o = tw(a), s = -1, l = o.length; ++s < l; ) {
      var u = o[s], h = r[u];
      (h === void 0 || Z_(h, Eu[u]) && !rw.call(r, u)) && (r[u] = a[u]);
    }
  return r;
}), Tu = nw;
function iw(r, e) {
  for (var t = -1, n = r == null ? 0 : r.length, i = Array(n); ++t < n; )
    i[t] = e(r[t], t, r);
  return i;
}
var pr = iw, sw = ke, ow = de, aw = "[object Symbol]";
function lw(r) {
  return typeof r == "symbol" || ow(r) && sw(r) == aw;
}
var mr = lw, yo = Be, uw = pr, cw = U, hw = mr, dw = 1 / 0, bo = yo ? yo.prototype : void 0, _o = bo ? bo.toString : void 0;
function Au(r) {
  if (typeof r == "string")
    return r;
  if (cw(r))
    return uw(r, Au) + "";
  if (hw(r))
    return _o ? _o.call(r) : "";
  var e = r + "";
  return e == "0" && 1 / r == -dw ? "-0" : e;
}
var fw = Au, pw = fw;
function mw(r) {
  return r == null ? "" : pw(r);
}
var Ou = mw, gw = Ou, yw = 0;
function bw(r) {
  var e = ++yw;
  return gw(r) + e;
}
var Nu = bw, Te = {};
let qu = class extends Error {
  constructor(e) {
    super(e), this.name = "KnexTimeoutError";
  }
};
function _w(r, e) {
  return new Promise(function(t, n) {
    const i = setTimeout(function() {
      n(new qu("operation timed out"));
    }, e);
    function a(s) {
      clearTimeout(i), t(s);
    }
    function o(s) {
      clearTimeout(i), n(s);
    }
    r.then(a, o);
  });
}
Te.KnexTimeoutError = qu;
Te.timeout = _w;
function ww(r) {
  r.client.emit("start", r.builder), r.builder.emit("start", r.builder);
  const e = r.builder.toSQL();
  return r.builder._debug && r.client.logger.debug(e), Array.isArray(e) ? r.queryArray(e) : r.query(e);
}
function $w(r, e) {
  try {
    const t = r.builder.toSQL();
    if (Array.isArray(t) && e.hasHandler)
      throw new Error(
        "The stream may only be used with a single query statement."
      );
    return r.client.stream(
      r.connection,
      t,
      e.stream,
      e.options
    );
  } catch (t) {
    throw e.stream.emit("error", t), t;
  }
}
var Cw = {
  ensureConnectionCallback: ww,
  ensureConnectionStreamCallback: $w
};
const { KnexTimeoutError: wo } = Te, { timeout: vw } = Te, {
  ensureConnectionCallback: Ew,
  ensureConnectionStreamCallback: Tw
} = Cw;
let Qr, Aw = class Ru {
  constructor(e, t) {
    this.client = e, this.builder = t, this.queries = [], this.connection = void 0;
  }
  // "Run" the target, calling "toSQL" on the builder, returning
  // an object or array of queries to run, each of which are run on
  // a single connection.
  async run() {
    const e = this;
    try {
      const t = await this.ensureConnection(Ew);
      return e.builder.emit("end"), t;
    } catch (t) {
      throw e.builder._events && e.builder._events.error && e.builder.emit("error", t), t;
    }
  }
  // Stream the result set, by passing through to the dialect's streaming
  // capabilities. If the options are
  stream(e, t) {
    const n = typeof e == "function" && arguments.length === 1, i = n ? {} : e, a = n ? e : t, o = typeof a == "function";
    Qr = Qr || P.Transform;
    const s = this.builder.queryContext(), l = new Qr({
      objectMode: !0,
      transform: (h, c, d) => {
        d(null, this.client.postProcessResponse(h, s));
      }
    });
    l.on("close", () => {
      this.client.releaseConnection(this.connection);
    });
    const u = this.ensureConnection(
      Tw,
      {
        options: i,
        hasHandler: o,
        stream: l
      }
    ).catch((h) => {
      this.connection || l.emit("error", h);
    });
    return o ? (a(l), u) : l;
  }
  // Allow you to pipe the stream to a writable stream.
  pipe(e, t) {
    return this.stream(t).pipe(e);
  }
  // "Runs" a query, returning a promise. All queries specified by the builder are guaranteed
  // to run in sequence, and on the same connection, especially helpful when schema building
  // and dealing with foreign key constraints, etc.
  async query(e) {
    const { __knexUid: t, __knexTxId: n } = this.connection;
    this.builder.emit("query", Object.assign({ __knexUid: t, __knexTxId: n }, e));
    const i = this, a = this.builder.queryContext();
    e !== null && typeof e == "object" && (e.queryContext = a);
    let o = this.client.query(this.connection, e);
    return e.timeout && (o = vw(o, e.timeout)), o.then((s) => this.client.processResponse(s, i)).then((s) => {
      const l = this.client.postProcessResponse(
        s,
        a
      );
      return this.builder.emit(
        "query-response",
        l,
        Object.assign({ __knexUid: t, __knexTxId: n }, e),
        this.builder
      ), this.client.emit(
        "query-response",
        l,
        Object.assign({ __knexUid: t, __knexTxId: n }, e),
        this.builder
      ), l;
    }).catch((s) => {
      if (!(s instanceof wo))
        return Promise.reject(s);
      const { timeout: l, sql: u, bindings: h } = e;
      let c;
      return e.cancelOnTimeout ? c = this.client.cancelQuery(this.connection) : (this.connection.__knex__disposed = s, c = Promise.resolve()), c.catch((d) => {
        throw this.connection.__knex__disposed = s, Object.assign(d, {
          message: `After query timeout of ${l}ms exceeded, cancelling of query failed.`,
          sql: u,
          bindings: h,
          timeout: l
        });
      }).then(() => {
        throw Object.assign(s, {
          message: `Defined query timeout of ${l}ms exceeded when running query.`,
          sql: u,
          bindings: h,
          timeout: l
        });
      });
    }).catch((s) => {
      throw this.builder.emit(
        "query-error",
        s,
        Object.assign({ __knexUid: t, __knexTxId: n, queryContext: a }, e)
      ), s;
    });
  }
  // In the case of the "schema builder" we call `queryArray`, which runs each
  // of the queries in sequence.
  async queryArray(e) {
    if (e.length === 1) {
      const n = e[0];
      if (!n.statementsProducer)
        return this.query(n);
      const i = await n.statementsProducer(
        void 0,
        this.connection
      ), a = i.sql.map((u) => ({
        sql: u,
        bindings: n.bindings
      })), o = i.pre.map((u) => ({
        sql: u,
        bindings: n.bindings
      })), s = i.post.map((u) => ({
        sql: u,
        bindings: n.bindings
      }));
      let l = [];
      await this.queryArray(o);
      try {
        await this.client.transaction(
          async (u) => {
            const h = new Ru(u.client, this.builder);
            if (h.connection = this.connection, l = await h.queryArray(a), i.check && (await u.raw(i.check)).length > 0)
              throw new Error("FOREIGN KEY constraint failed");
          },
          { connection: this.connection }
        );
      } finally {
        await this.queryArray(s);
      }
      return l;
    }
    const t = [];
    for (const n of e)
      t.push(await this.queryArray([n]));
    return t;
  }
  // Check whether there's a transaction flag, and that it has a connection.
  async ensureConnection(e, t) {
    if (this.builder._connection && (this.connection = this.builder._connection), this.connection)
      return e(this, t);
    let n;
    try {
      n = await this.client.acquireConnection();
    } catch (i) {
      if (!(i instanceof wo))
        return Promise.reject(i);
      throw this.builder && (i.sql = this.builder.sql, i.bindings = this.builder.bindings), i;
    }
    try {
      return this.connection = n, await e(this, t);
    } finally {
      await this.client.releaseConnection(n);
    }
  }
};
var Ow = Aw, Vi = { exports: {} }, Dr, $o;
function Nw() {
  if ($o)
    return Dr;
  $o = 1;
  var r = 1e3, e = r * 60, t = e * 60, n = t * 24, i = n * 7, a = n * 365.25;
  Dr = function(h, c) {
    c = c || {};
    var d = typeof h;
    if (d === "string" && h.length > 0)
      return o(h);
    if (d === "number" && isFinite(h))
      return c.long ? l(h) : s(h);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(h)
    );
  };
  function o(h) {
    if (h = String(h), !(h.length > 100)) {
      var c = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        h
      );
      if (c) {
        var d = parseFloat(c[1]), p = (c[2] || "ms").toLowerCase();
        switch (p) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return d * a;
          case "weeks":
          case "week":
          case "w":
            return d * i;
          case "days":
          case "day":
          case "d":
            return d * n;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return d * t;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return d * e;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return d * r;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return d;
          default:
            return;
        }
      }
    }
  }
  function s(h) {
    var c = Math.abs(h);
    return c >= n ? Math.round(h / n) + "d" : c >= t ? Math.round(h / t) + "h" : c >= e ? Math.round(h / e) + "m" : c >= r ? Math.round(h / r) + "s" : h + "ms";
  }
  function l(h) {
    var c = Math.abs(h);
    return c >= n ? u(h, c, n, "day") : c >= t ? u(h, c, t, "hour") : c >= e ? u(h, c, e, "minute") : c >= r ? u(h, c, r, "second") : h + " ms";
  }
  function u(h, c, d, p) {
    var g = c >= d * 1.5;
    return Math.round(h / d) + " " + p + (g ? "s" : "");
  }
  return Dr;
}
function qw(r) {
  t.debug = t, t.default = t, t.coerce = l, t.disable = a, t.enable = i, t.enabled = o, t.humanize = Nw(), t.destroy = u, Object.keys(r).forEach((h) => {
    t[h] = r[h];
  }), t.names = [], t.skips = [], t.formatters = {};
  function e(h) {
    let c = 0;
    for (let d = 0; d < h.length; d++)
      c = (c << 5) - c + h.charCodeAt(d), c |= 0;
    return t.colors[Math.abs(c) % t.colors.length];
  }
  t.selectColor = e;
  function t(h) {
    let c, d = null, p, g;
    function _(...f) {
      if (!_.enabled)
        return;
      const m = _, y = Number(/* @__PURE__ */ new Date()), w = y - (c || y);
      m.diff = w, m.prev = c, m.curr = y, c = y, f[0] = t.coerce(f[0]), typeof f[0] != "string" && f.unshift("%O");
      let $ = 0;
      f[0] = f[0].replace(/%([a-zA-Z%])/g, (C, T) => {
        if (C === "%%")
          return "%";
        $++;
        const N = t.formatters[T];
        if (typeof N == "function") {
          const I = f[$];
          C = N.call(m, I), f.splice($, 1), $--;
        }
        return C;
      }), t.formatArgs.call(m, f), (m.log || t.log).apply(m, f);
    }
    return _.namespace = h, _.useColors = t.useColors(), _.color = t.selectColor(h), _.extend = n, _.destroy = t.destroy, Object.defineProperty(_, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => d !== null ? d : (p !== t.namespaces && (p = t.namespaces, g = t.enabled(h)), g),
      set: (f) => {
        d = f;
      }
    }), typeof t.init == "function" && t.init(_), _;
  }
  function n(h, c) {
    const d = t(this.namespace + (typeof c > "u" ? ":" : c) + h);
    return d.log = this.log, d;
  }
  function i(h) {
    t.save(h), t.namespaces = h, t.names = [], t.skips = [];
    let c;
    const d = (typeof h == "string" ? h : "").split(/[\s,]+/), p = d.length;
    for (c = 0; c < p; c++)
      d[c] && (h = d[c].replace(/\*/g, ".*?"), h[0] === "-" ? t.skips.push(new RegExp("^" + h.slice(1) + "$")) : t.names.push(new RegExp("^" + h + "$")));
  }
  function a() {
    const h = [
      ...t.names.map(s),
      ...t.skips.map(s).map((c) => "-" + c)
    ].join(",");
    return t.enable(""), h;
  }
  function o(h) {
    if (h[h.length - 1] === "*")
      return !0;
    let c, d;
    for (c = 0, d = t.skips.length; c < d; c++)
      if (t.skips[c].test(h))
        return !1;
    for (c = 0, d = t.names.length; c < d; c++)
      if (t.names[c].test(h))
        return !0;
    return !1;
  }
  function s(h) {
    return h.toString().substring(2, h.toString().length - 2).replace(/\.\*\?$/, "*");
  }
  function l(h) {
    return h instanceof Error ? h.stack || h.message : h;
  }
  function u() {
    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  }
  return t.enable(t.load()), t;
}
var Rw = qw;
(function(r, e) {
  e.formatArgs = n, e.save = i, e.load = a, e.useColors = t, e.storage = o(), e.destroy = (() => {
    let l = !1;
    return () => {
      l || (l = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
    };
  })(), e.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33"
  ];
  function t() {
    return typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs) ? !0 : typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/) ? !1 : typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
    typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function n(l) {
    if (l[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + l[0] + (this.useColors ? "%c " : " ") + "+" + r.exports.humanize(this.diff), !this.useColors)
      return;
    const u = "color: " + this.color;
    l.splice(1, 0, u, "color: inherit");
    let h = 0, c = 0;
    l[0].replace(/%[a-zA-Z%]/g, (d) => {
      d !== "%%" && (h++, d === "%c" && (c = h));
    }), l.splice(c, 0, u);
  }
  e.log = console.debug || console.log || (() => {
  });
  function i(l) {
    try {
      l ? e.storage.setItem("debug", l) : e.storage.removeItem("debug");
    } catch {
    }
  }
  function a() {
    let l;
    try {
      l = e.storage.getItem("debug");
    } catch {
    }
    return !l && typeof process < "u" && "env" in process && (l = process.env.DEBUG), l;
  }
  function o() {
    try {
      return localStorage;
    } catch {
    }
  }
  r.exports = Rw(e);
  const { formatters: s } = r.exports;
  s.j = function(l) {
    try {
      return JSON.stringify(l);
    } catch (u) {
      return "[UnexpectedJSONParseError]: " + u.message;
    }
  };
})(Vi, Vi.exports);
var ae = Vi.exports, gr = function() {
};
let Sw = class {
  constructor(e) {
    this.client = e;
  }
  now(e) {
    return typeof e == "number" ? this.client.raw(`CURRENT_TIMESTAMP(${e})`) : this.client.raw("CURRENT_TIMESTAMP");
  }
  uuidToBin(e, t = !0) {
    const n = Buffer.from(e.replace(/-/g, ""), "hex");
    return t ? Buffer.concat([
      n.slice(6, 8),
      n.slice(4, 6),
      n.slice(0, 4),
      n.slice(8, 16)
    ]) : Buffer.concat([
      n.slice(0, 4),
      n.slice(4, 6),
      n.slice(6, 8),
      n.slice(8, 16)
    ]);
  }
  binToUuid(e, t = !0) {
    const n = Buffer.from(e, "hex");
    return t ? [
      n.toString("hex", 4, 8),
      n.toString("hex", 2, 4),
      n.toString("hex", 0, 2),
      n.toString("hex", 8, 10),
      n.toString("hex", 10, 16)
    ].join("-") : [
      n.toString("hex", 0, 4),
      n.toString("hex", 4, 6),
      n.toString("hex", 6, 8),
      n.toString("hex", 8, 10),
      n.toString("hex", 10, 16)
    ].join("-");
  }
};
var xw = Sw, Su = [
  "with",
  "withRecursive",
  "withMaterialized",
  "withNotMaterialized",
  "select",
  "as",
  "columns",
  "column",
  "from",
  "fromJS",
  "fromRaw",
  "into",
  "withSchema",
  "table",
  "distinct",
  "join",
  "joinRaw",
  "innerJoin",
  "leftJoin",
  "leftOuterJoin",
  "rightJoin",
  "rightOuterJoin",
  "outerJoin",
  "fullOuterJoin",
  "crossJoin",
  "where",
  "andWhere",
  "orWhere",
  "whereNot",
  "orWhereNot",
  "whereLike",
  "andWhereLike",
  "orWhereLike",
  "whereILike",
  "andWhereILike",
  "orWhereILike",
  "whereRaw",
  "whereWrapped",
  "havingWrapped",
  "orWhereRaw",
  "whereExists",
  "orWhereExists",
  "whereNotExists",
  "orWhereNotExists",
  "whereIn",
  "orWhereIn",
  "whereNotIn",
  "orWhereNotIn",
  "whereNull",
  "orWhereNull",
  "whereNotNull",
  "orWhereNotNull",
  "whereBetween",
  "whereNotBetween",
  "andWhereBetween",
  "andWhereNotBetween",
  "orWhereBetween",
  "orWhereNotBetween",
  "groupBy",
  "groupByRaw",
  "orderBy",
  "orderByRaw",
  "union",
  "unionAll",
  "intersect",
  "having",
  "havingRaw",
  "orHaving",
  "orHavingRaw",
  "offset",
  "limit",
  "count",
  "countDistinct",
  "min",
  "max",
  "sum",
  "sumDistinct",
  "avg",
  "avgDistinct",
  "increment",
  "decrement",
  "first",
  "debug",
  "pluck",
  "clearSelect",
  "clearWhere",
  "clearGroup",
  "clearOrder",
  "clearHaving",
  "insert",
  "update",
  "returning",
  "del",
  "delete",
  "truncate",
  "transacting",
  "connection",
  // JSON methods
  // Json manipulation functions
  "jsonExtract",
  "jsonSet",
  "jsonInsert",
  "jsonRemove",
  // Wheres Json
  "whereJsonObject",
  "orWhereJsonObject",
  "andWhereJsonObject",
  "whereNotJsonObject",
  "orWhereNotJsonObject",
  "andWhereNotJsonObject",
  "whereJsonPath",
  "orWhereJsonPath",
  "andWhereJsonPath",
  "whereJsonSupersetOf",
  "orWhereJsonSupersetOf",
  "andWhereJsonSupersetOf",
  "whereJsonNotSupersetOf",
  "orWhereJsonNotSupersetOf",
  "andWhereJsonNotSupersetOf",
  "whereJsonSubsetOf",
  "orWhereJsonSubsetOf",
  "andWhereJsonSubsetOf",
  "whereJsonNotSubsetOf",
  "orWhereJsonNotSubsetOf",
  "andWhereJsonNotSubsetOf"
], Iw = ur, Pw = tt;
function Lw(r, e, t) {
  (t !== void 0 && !Pw(r[e], t) || t === void 0 && !(e in r)) && Iw(r, e, t);
}
var xu = Lw;
function Bw(r) {
  return function(e, t, n) {
    for (var i = -1, a = Object(e), o = n(e), s = o.length; s--; ) {
      var l = o[r ? s : ++i];
      if (t(a[l], l, a) === !1)
        break;
    }
    return e;
  };
}
var kw = Bw, jw = kw, Mw = jw(), Iu = Mw, Qw = be, Dw = de;
function Fw(r) {
  return Dw(r) && Qw(r);
}
var Uw = Fw, Hw = ke, Vw = dr, Ww = de, zw = "[object Object]", Jw = Function.prototype, Kw = Object.prototype, Pu = Jw.toString, Gw = Kw.hasOwnProperty, Yw = Pu.call(Object);
function Xw(r) {
  if (!Ww(r) || Hw(r) != zw)
    return !1;
  var e = Vw(r);
  if (e === null)
    return !0;
  var t = Gw.call(e, "constructor") && e.constructor;
  return typeof t == "function" && t instanceof t && Pu.call(t) == Yw;
}
var Ae = Xw;
function Zw(r, e) {
  if (!(e === "constructor" && typeof r[e] == "function") && e != "__proto__")
    return r[e];
}
var Lu = Zw, e$ = Me, t$ = De;
function r$(r) {
  return e$(r, t$(r));
}
var n$ = r$, Co = xu, i$ = au, s$ = gu, o$ = fs, a$ = bu, vo = Nt, Eo = U, l$ = Uw, u$ = ot, c$ = sr, h$ = se, d$ = Ae, f$ = at, To = Lu, p$ = n$;
function m$(r, e, t, n, i, a, o) {
  var s = To(r, t), l = To(e, t), u = o.get(l);
  if (u) {
    Co(r, t, u);
    return;
  }
  var h = a ? a(s, l, t + "", r, e, o) : void 0, c = h === void 0;
  if (c) {
    var d = Eo(l), p = !d && u$(l), g = !d && !p && f$(l);
    h = l, d || p || g ? Eo(s) ? h = s : l$(s) ? h = o$(s) : p ? (c = !1, h = i$(l, !0)) : g ? (c = !1, h = s$(l, !0)) : h = [] : d$(l) || vo(l) ? (h = s, vo(s) ? h = p$(s) : (!h$(s) || c$(s)) && (h = a$(l))) : c = !1;
  }
  c && (o.set(l, h), i(h, l, n, a, o), o.delete(l)), Co(r, t, h);
}
var g$ = m$, y$ = lr, b$ = xu, _$ = Iu, w$ = g$, $$ = se, C$ = De, v$ = Lu;
function Bu(r, e, t, n, i) {
  r !== e && _$(e, function(a, o) {
    if (i || (i = new y$()), $$(a))
      w$(r, e, o, t, Bu, n, i);
    else {
      var s = n ? n(v$(r, o), a, o + "", r, e, i) : void 0;
      s === void 0 && (s = a), b$(r, o, s);
    }
  }, C$);
}
var E$ = Bu, T$ = bs, A$ = fr;
function O$(r) {
  return T$(function(e, t) {
    var n = -1, i = t.length, a = i > 1 ? t[i - 1] : void 0, o = i > 2 ? t[2] : void 0;
    for (a = r.length > 3 && typeof a == "function" ? (i--, a) : void 0, o && A$(t[0], t[1], o) && (a = i < 3 ? void 0 : a, i = 1), e = Object(e); ++n < i; ) {
      var s = t[n];
      s && r(e, s, n, a);
    }
    return e;
  });
}
var _s = O$, N$ = E$, q$ = _s, R$ = q$(function(r, e, t) {
  N$(r, e, t);
}), S$ = R$;
function x$(r, e, t) {
  var n = -1, i = r.length;
  e < 0 && (e = -e > i ? 0 : i + e), t = t > i ? i : t, t < 0 && (t += i), i = e > t ? 0 : t - e >>> 0, e >>>= 0;
  for (var a = Array(i); ++n < i; )
    a[n] = r[n + e];
  return a;
}
var ku = x$, I$ = /\s/;
function P$(r) {
  for (var e = r.length; e-- && I$.test(r.charAt(e)); )
    ;
  return e;
}
var L$ = P$, B$ = L$, k$ = /^\s+/;
function j$(r) {
  return r && r.slice(0, B$(r) + 1).replace(k$, "");
}
var M$ = j$, Q$ = M$, Ao = se, D$ = mr, Oo = 0 / 0, F$ = /^[-+]0x[0-9a-f]+$/i, U$ = /^0b[01]+$/i, H$ = /^0o[0-7]+$/i, V$ = parseInt;
function W$(r) {
  if (typeof r == "number")
    return r;
  if (D$(r))
    return Oo;
  if (Ao(r)) {
    var e = typeof r.valueOf == "function" ? r.valueOf() : r;
    r = Ao(e) ? e + "" : e;
  }
  if (typeof r != "string")
    return r === 0 ? r : +r;
  r = Q$(r);
  var t = U$.test(r);
  return t || H$.test(r) ? V$(r.slice(2), t ? 2 : 8) : F$.test(r) ? Oo : +r;
}
var z$ = W$, J$ = z$, No = 1 / 0, K$ = 17976931348623157e292;
function G$(r) {
  if (!r)
    return r === 0 ? r : 0;
  if (r = J$(r), r === No || r === -No) {
    var e = r < 0 ? -1 : 1;
    return e * K$;
  }
  return r === r ? r : 0;
}
var Y$ = G$, X$ = Y$;
function Z$(r) {
  var e = X$(r), t = e % 1;
  return e === e ? t ? e - t : e : 0;
}
var ju = Z$, eC = ku, tC = fr, rC = ju, nC = Math.ceil, iC = Math.max;
function sC(r, e, t) {
  (t ? tC(r, e, t) : e === void 0) ? e = 1 : e = iC(rC(e), 0);
  var n = r == null ? 0 : r.length;
  if (!n || e < 1)
    return [];
  for (var i = 0, a = 0, o = Array(nC(n / e)); i < n; )
    o[a++] = eC(r, i, i += e);
  return o;
}
var oC = sC, qo = Be, aC = Nt, lC = U, Ro = qo ? qo.isConcatSpreadable : void 0;
function uC(r) {
  return lC(r) || aC(r) || !!(Ro && r && r[Ro]);
}
var cC = uC, hC = gs, dC = cC;
function Mu(r, e, t, n, i) {
  var a = -1, o = r.length;
  for (t || (t = dC), i || (i = []); ++a < o; ) {
    var s = r[a];
    e > 0 && t(s) ? e > 1 ? Mu(s, e - 1, t, n, i) : hC(i, s) : n || (i[i.length] = s);
  }
  return i;
}
var fC = Mu, pC = fC;
function mC(r) {
  var e = r == null ? 0 : r.length;
  return e ? pC(r, 1) : [];
}
var Qu = mC, gC = (r) => new Promise((e) => setTimeout(e, r));
function yC(r) {
  return typeof r == "string";
}
function bC(r) {
  return typeof r == "number";
}
function _C(r) {
  return typeof r == "boolean";
}
function wC(r) {
  return typeof r > "u";
}
function $C(r) {
  return typeof r == "object" && r !== null;
}
function CC(r) {
  return typeof r == "function";
}
var Q = {
  isString: yC,
  isNumber: bC,
  isBoolean: _C,
  isUndefined: wC,
  isObject: $C,
  isFunction: CC
};
const vC = oC, EC = Qu, TC = gC, { isNumber: AC } = Q;
function OC(r, e, t, n = 1e3) {
  let i, a = null;
  if (!AC(n) || n < 1)
    throw new TypeError(`Invalid chunkSize: ${n}`);
  if (!Array.isArray(t))
    throw new TypeError(`Invalid batch: Expected array, got ${typeof t}`);
  const o = vC(t, n), s = (l) => a ? l(a) : r.transaction(l);
  return Object.assign(
    Promise.resolve().then(async () => (await TC(1), s(async (l) => {
      const u = [];
      for (const h of o)
        u.push(await l(e).insert(h, i));
      return EC(u);
    }))),
    {
      returning(l) {
        return i = l, this;
      },
      transacting(l) {
        return a = l, this;
      }
    }
  );
}
var NC = OC;
const { EventEmitter: qC } = P, { Migrator: RC } = gr, SC = gr, xC = xw, So = Su, IC = S$, PC = NC, { isObject: LC } = Q, Du = {
  client: {
    get() {
      return this.context.client;
    },
    set(r) {
      this.context.client = r;
    },
    configurable: !0
  },
  userParams: {
    get() {
      return this.context.userParams;
    },
    set(r) {
      this.context.userParams = r;
    },
    configurable: !0
  },
  schema: {
    get() {
      return this.client.schemaBuilder();
    },
    configurable: !0
  },
  migrate: {
    get() {
      return new RC(this);
    },
    configurable: !0
  },
  seed: {
    get() {
      return new SC();
    },
    configurable: !0
  },
  fn: {
    get() {
      return new xC(this.client);
    },
    configurable: !0
  }
}, BC = [
  "raw",
  "batchInsert",
  "transaction",
  "transactionProvider",
  "initialize",
  "destroy",
  "ref",
  "withUserParams",
  "queryBuilder",
  "disableProcessing",
  "enableProcessing"
];
for (const r of BC)
  Du[r] = {
    value: function(...e) {
      return this.context[r](...e);
    },
    configurable: !0
  };
function kC(r) {
  function e(t, n) {
    return Uu(e.context, t, n);
  }
  return Fu(e, r), e;
}
function jC(r) {
  const e = r.context || {};
  Object.assign(e, {
    queryBuilder() {
      return this.client.queryBuilder();
    },
    raw() {
      return this.client.raw.apply(this.client, arguments);
    },
    batchInsert(t, n, i = 1e3) {
      return PC(this, t, n, i);
    },
    // Creates a new transaction.
    // If container is provided, returns a promise for when the transaction is resolved.
    // If container is not provided, returns a promise with a transaction that is resolved
    // when transaction is ready to be used.
    transaction(t, n) {
      !n && LC(t) && (n = t, t = null);
      const i = Object.assign({}, n);
      return i.userParams = this.userParams || {}, i.doNotRejectOnRollback === void 0 && (i.doNotRejectOnRollback = !0), this._transaction(t, i);
    },
    // Internal method that actually establishes the Transaction.  It makes no assumptions
    // about the `config` or `outerTx`, and expects the caller to handle these details.
    _transaction(t, n, i = null) {
      return t ? this.client.transaction(t, n, i) : new Promise((a, o) => {
        this.client.transaction(a, n, i).catch(o);
      });
    },
    transactionProvider(t) {
      let n;
      return () => (n || (n = this.transaction(void 0, t)), n);
    },
    // Typically never needed, initializes the pool for a knex client.
    initialize(t) {
      return this.client.initializePool(t);
    },
    // Convenience method for tearing down the pool.
    destroy(t) {
      return this.client.destroy(t);
    },
    ref(t) {
      return this.client.ref(t);
    },
    // Do not document this as public API until naming and API is improved for general consumption
    // This method exists to disable processing of internal queries in migrations
    disableProcessing() {
      this.userParams.isProcessingDisabled || (this.userParams.wrapIdentifier = this.client.config.wrapIdentifier, this.userParams.postProcessResponse = this.client.config.postProcessResponse, this.client.config.wrapIdentifier = null, this.client.config.postProcessResponse = null, this.userParams.isProcessingDisabled = !0);
    },
    // Do not document this as public API until naming and API is improved for general consumption
    // This method exists to enable execution of non-internal queries with consistent identifier naming in migrations
    enableProcessing() {
      this.userParams.isProcessingDisabled && (this.client.config.wrapIdentifier = this.userParams.wrapIdentifier, this.client.config.postProcessResponse = this.userParams.postProcessResponse, this.userParams.isProcessingDisabled = !1);
    },
    withUserParams(t) {
      const n = MC(r);
      return this.client && (n.client = Object.create(this.client.constructor.prototype), IC(n.client, this.client), n.client.config = Object.assign({}, this.client.config)), Fu(n, n.client), Dt("query", r, n), Dt("query-error", r, n), Dt("query-response", r, n), Dt("start", r, n), n.userParams = t, n;
    }
  }), r.context || (r.context = e);
}
function Dt(r, e, t) {
  e.listeners(r).forEach((i) => {
    t.on(r, i);
  });
}
function Fu(r, e) {
  for (let n = 0; n < So.length; n++) {
    const i = So[n];
    r[i] = function() {
      const a = this.queryBuilder();
      return a[i].apply(a, arguments);
    };
  }
  Object.defineProperties(r, Du), jC(r), r.client = e, r.userParams = {};
  const t = new qC();
  for (const n in t)
    r[n] = t[n];
  r._internalListeners && r._internalListeners.forEach(({ eventName: n, listener: i }) => {
    r.client.removeListener(n, i);
  }), r._internalListeners = [], Ft(r, "start", (n) => {
    r.emit("start", n);
  }), Ft(r, "query", (n) => {
    r.emit("query", n);
  }), Ft(r, "query-error", (n, i) => {
    r.emit("query-error", n, i);
  }), Ft(r, "query-response", (n, i, a) => {
    r.emit("query-response", n, i, a);
  });
}
function Ft(r, e, t) {
  r.client.on(e, t), r._internalListeners.push({
    eventName: e,
    listener: t
  });
}
function Uu(r, e, t) {
  const n = r.queryBuilder();
  return e || r.client.logger.warn(
    "calling knex without a tableName is deprecated. Use knex.queryBuilder() instead."
  ), e ? n.table(e, t) : n;
}
function MC(r) {
  const e = Object.create(
    Object.getPrototypeOf(r),
    Object.getOwnPropertyDescriptors(r)
  ), t = {}, i = ((a, o) => Uu(t, a, o)).bind(e);
  return Object.assign(i, r), i.context = t, i;
}
var Hu = kC;
const QC = gr, DC = (r) => Object.assign(r, {
  finally(e) {
    return this.then().finally(e);
  }
});
var Vu = Promise.prototype.finally ? DC : QC;
const { EventEmitter: FC } = P, UC = ae, HC = Nu, { callbackify: VC } = P, WC = Hu, { timeout: xo, KnexTimeoutError: Io } = Te, zC = Vu, vt = UC("knex:tx");
function JC() {
  return {
    userParams: {},
    doNotRejectOnRollback: !0
  };
}
const Po = [
  // Doesn't really work in postgres, it treats it as read committed
  "read uncommitted",
  "read committed",
  "snapshot",
  // snapshot and repeatable read are basically the same, most "repeatable
  // read" implementations are actually "snapshot" also known as Multi Version
  // Concurrency Control (MVCC). Mssql's repeatable read doesn't stop
  // repeated reads for inserts as it uses a pessimistic locking system so
  // you should probably use 'snapshot' to stop read skew.
  "repeatable read",
  // mysql pretends to have serializable, but it is not
  "serializable"
];
let Wu = class extends FC {
  constructor(e, t, n = JC(), i = null) {
    super(), this.userParams = n.userParams, this.doNotRejectOnRollback = n.doNotRejectOnRollback;
    const a = this.txid = HC("trx");
    this.client = e, this.logger = e.logger, this.outerTx = i, this.trxClient = void 0, this._completed = !1, this._debug = e.config && e.config.debug, n.isolationLevel && this.setIsolationLevel(n.isolationLevel), vt(
      "%s: Starting %s transaction",
      a,
      i ? "nested" : "top level"
    ), this._lastChild = Promise.resolve();
    const s = (i ? i._lastChild : Promise.resolve()).then(
      () => this._evaluateContainer(n, t)
    );
    this._promise = s.then((l) => l), i && (i._lastChild = s.catch(() => {
    }));
  }
  isCompleted() {
    return this._completed || this.outerTx && this.outerTx.isCompleted() || !1;
  }
  begin(e) {
    return (this.isolationLevel ? this.query(
      e,
      `SET TRANSACTION ISOLATION LEVEL ${this.isolationLevel};`
    ) : Promise.resolve()).then(() => this.query(e, "BEGIN;"));
  }
  savepoint(e) {
    return this.query(e, `SAVEPOINT ${this.txid};`);
  }
  commit(e, t) {
    return this.query(e, "COMMIT;", 1, t);
  }
  release(e, t) {
    return this.query(e, `RELEASE SAVEPOINT ${this.txid};`, 1, t);
  }
  setIsolationLevel(e) {
    if (!Po.includes(e))
      throw new Error(
        `Invalid isolationLevel, supported isolation levels are: ${JSON.stringify(
          Po
        )}`
      );
    return this.isolationLevel = e, this;
  }
  rollback(e, t) {
    return xo(this.query(e, "ROLLBACK", 2, t), 5e3).catch(
      (n) => {
        if (!(n instanceof Io))
          return Promise.reject(n);
        this._rejecter(t);
      }
    );
  }
  rollbackTo(e, t) {
    return xo(
      this.query(e, `ROLLBACK TO SAVEPOINT ${this.txid}`, 2, t),
      5e3
    ).catch((n) => {
      if (!(n instanceof Io))
        return Promise.reject(n);
      this._rejecter(t);
    });
  }
  query(e, t, n, i) {
    const a = this.trxClient.query(e, t).catch((o) => {
      n = 2, i = o, this._completed = !0, vt("%s error running transaction query", this.txid);
    }).then((o) => {
      if (n === 1 && this._resolver(i), n === 2) {
        if (i === void 0) {
          if (this.doNotRejectOnRollback && /^ROLLBACK\b/i.test(t)) {
            this._resolver();
            return;
          }
          i = new Error(`Transaction rejected with non-error: ${i}`);
        }
        this._rejecter(i);
      }
      return o;
    });
    return (n === 1 || n === 2) && (this._completed = !0), a;
  }
  debug(e) {
    return this._debug = arguments.length ? e : !0, this;
  }
  async _evaluateContainer(e, t) {
    return this.acquireConnection(e, (n) => {
      const i = this.trxClient = GC(
        this,
        this.client,
        n
      ), a = this.client.transacting ? this.savepoint(n) : this.begin(n), o = new Promise((s, l) => {
        this._resolver = s, this._rejecter = l;
      });
      return a.then(() => KC(this, n, i)).then((s) => {
        s.executionPromise = o;
        let l;
        try {
          l = t(s);
        } catch (u) {
          l = Promise.reject(u);
        }
        return l && l.then && typeof l.then == "function" && l.then((u) => s.commit(u)).catch((u) => s.rollback(u)), null;
      }).catch((s) => this._rejecter(s)), o;
    });
  }
  // Acquire a connection and create a disposer - either using the one passed
  // via config or getting one off the client. The disposer will be called once
  // the original promise is marked completed.
  async acquireConnection(e, t) {
    const n = e && e.connection, i = n || await this.client.acquireConnection();
    try {
      return i.__knexTxId = this.txid, await t(i);
    } finally {
      n ? vt("%s: not releasing external connection", this.txid) : (vt("%s: releasing connection", this.txid), this.client.releaseConnection(i));
    }
  }
  then(e, t) {
    return this._promise.then(e, t);
  }
  catch(...e) {
    return this._promise.catch(...e);
  }
  asCallback(e) {
    return VC(() => this._promise)(e), this._promise;
  }
};
zC(Wu.prototype);
function KC(r, e, t) {
  const n = WC(t);
  return n.context.withUserParams = () => {
    throw new Error(
      "Cannot set user params on a transaction - it can only inherit params from main knex instance"
    );
  }, n.isTransaction = !0, n.userParams = r.userParams || {}, n.context.transaction = function(i, a) {
    return a ? a.doNotRejectOnRollback === void 0 && (a.doNotRejectOnRollback = !0) : a = { doNotRejectOnRollback: !0 }, this._transaction(i, a, r);
  }, n.savepoint = function(i, a) {
    return n.transaction(i, a);
  }, r.client.transacting ? (n.commit = (i) => r.release(e, i), n.rollback = (i) => r.rollbackTo(e, i)) : (n.commit = (i) => r.commit(e, i), n.rollback = (i) => r.rollback(e, i)), n.isCompleted = () => r.isCompleted(), n;
}
function GC(r, e, t) {
  const n = Object.create(e.constructor.prototype);
  n.version = e.version, n.config = e.config, n.driver = e.driver, n.connectionSettings = e.connectionSettings, n.transacting = !0, n.valueForUndefined = e.valueForUndefined, n.logger = e.logger, n.on("start", function(o) {
    r.emit("start", o), e.emit("start", o);
  }), n.on("query", function(o) {
    r.emit("query", o), e.emit("query", o);
  }), n.on("query-error", function(o, s) {
    r.emit("query-error", o, s), e.emit("query-error", o, s);
  }), n.on("query-response", function(o, s, l) {
    r.emit("query-response", o, s, l), e.emit("query-response", o, s, l);
  });
  const i = n.query;
  n.query = function(o, s) {
    const l = r.isCompleted();
    return new Promise(function(u, h) {
      try {
        if (o !== t)
          throw new Error("Invalid connection for transaction query.");
        l && Lo(r, s), u(i.call(n, o, s));
      } catch (c) {
        h(c);
      }
    });
  };
  const a = n.stream;
  return n.stream = function(o, s, l, u) {
    const h = r.isCompleted();
    return new Promise(function(c, d) {
      try {
        if (o !== t)
          throw new Error("Invalid connection for transaction query.");
        h && Lo(r, s), c(a.call(n, o, s, l, u));
      } catch (p) {
        d(p);
      }
    });
  }, n.acquireConnection = function() {
    return Promise.resolve(t);
  }, n.releaseConnection = function() {
    return Promise.resolve();
  }, n;
}
function Lo(r, e) {
  const t = typeof e == "string" ? e : e && e.sql;
  throw vt("%s: Transaction completed: %s", r.txid, t), new Error(
    "Transaction query already complete, run with DEBUG=knex:tx for more info"
  );
}
var Oe = Wu;
const YC = ae("knex:query"), XC = ae("knex:bindings"), ZC = (r, e) => YC(r.replace(/%/g, "%%"), e), { isString: ev } = Q;
function zu(r, e, t, n) {
  e = e == null ? [] : [].concat(e);
  let i = 0;
  return r.replace(/\\?\?/g, (a) => {
    if (a === "\\?")
      return "?";
    if (i === e.length)
      return a;
    const o = e[i++];
    return n._escapeBinding(o, { timeZone: t });
  });
}
function tv(r, e, t) {
  const n = ev(e) ? { sql: e } : e;
  n.bindings = t.prepBindings(n.bindings), n.sql = t.positionBindings(n.sql);
  const { __knexUid: i, __knexTxId: a } = r;
  return t.emit("query", Object.assign({ __knexUid: i, __knexTxId: a }, n)), ZC(n.sql, a), XC(n.bindings, a), n;
}
function rv(r, e, t) {
  return t._query(r, e).catch((n) => {
    throw t.config && t.config.compileSqlOnError === !1 ? n.message = e.sql + " - " + n.message : n.message = zu(e.sql, e.bindings, void 0, t) + " - " + n.message, t.emit(
      "query-error",
      n,
      Object.assign(
        { __knexUid: r.__knexUid, __knexTxId: r.__knexUid },
        e
      )
    ), n;
  });
}
var Ju = {
  enrichQueryObject: tv,
  executeQuery: rv,
  formatQuery: zu
}, nv = cr, iv = Me, sv = _s, ov = be, av = qt, lv = Qe, uv = Object.prototype, cv = uv.hasOwnProperty, hv = sv(function(r, e) {
  if (av(e) || ov(e)) {
    iv(e, lv(e), r);
    return;
  }
  for (var t in e)
    cv.call(e, t) && nv(r, t, e[t]);
}), Fe = hv, dv = Cu, fv = 4;
function pv(r) {
  return dv(r, fv);
}
var ws = pv, mv = Iu, gv = Qe;
function yv(r, e) {
  return r && mv(r, e, gv);
}
var Ku = yv, bv = be;
function _v(r, e) {
  return function(t, n) {
    if (t == null)
      return t;
    if (!bv(t))
      return r(t, n);
    for (var i = t.length, a = e ? i : -1, o = Object(t); (e ? a-- : ++a < i) && n(o[a], a, o) !== !1; )
      ;
    return t;
  };
}
var wv = _v, $v = Ku, Cv = wv, vv = Cv($v), ct = vv, Ev = oe;
function Tv(r) {
  return typeof r == "function" ? r : Ev;
}
var Av = Tv, Ov = us, Nv = ct, qv = Av, Rv = U;
function Sv(r, e) {
  var t = Rv(r) ? Ov : Nv;
  return t(r, qv(e));
}
var xv = Sv, Rt = xv, Iv = ou, Pv = ut, Lv = Nt, Bv = U, kv = be, jv = ot, Mv = qt, Qv = at, Dv = "[object Map]", Fv = "[object Set]", Uv = Object.prototype, Hv = Uv.hasOwnProperty;
function Vv(r) {
  if (r == null)
    return !0;
  if (kv(r) && (Bv(r) || typeof r == "string" || typeof r.splice == "function" || jv(r) || Qv(r) || Lv(r)))
    return !r.length;
  var e = Pv(r);
  if (e == Dv || e == Fv)
    return !r.size;
  if (Mv(r))
    return !Iv(r).length;
  for (var t in r)
    if (Hv.call(r, t))
      return !1;
  return !0;
}
var le = Vv;
function Wv(r) {
  var e = r == null ? 0 : r.length;
  return e ? r[e - 1] : void 0;
}
var zv = Wv, Jv = ct;
function Kv(r, e) {
  var t = [];
  return Jv(r, function(n, i, a) {
    e(n, i, a) && t.push(n);
  }), t;
}
var Gu = Kv, Fr, Bo;
function Gv() {
  if (Bo)
    return Fr;
  Bo = 1;
  var r = "__lodash_hash_undefined__";
  function e(t) {
    return this.__data__.set(t, r), this;
  }
  return Fr = e, Fr;
}
var Ur, ko;
function Yv() {
  if (ko)
    return Ur;
  ko = 1;
  function r(e) {
    return this.__data__.has(e);
  }
  return Ur = r, Ur;
}
var Hr, jo;
function Yu() {
  if (jo)
    return Hr;
  jo = 1;
  var r = ls, e = Gv(), t = Yv();
  function n(i) {
    var a = -1, o = i == null ? 0 : i.length;
    for (this.__data__ = new r(); ++a < o; )
      this.add(i[a]);
  }
  return n.prototype.add = n.prototype.push = e, n.prototype.has = t, Hr = n, Hr;
}
var Vr, Mo;
function Xu() {
  if (Mo)
    return Vr;
  Mo = 1;
  function r(e, t) {
    for (var n = -1, i = e == null ? 0 : e.length; ++n < i; )
      if (t(e[n], n, e))
        return !0;
    return !1;
  }
  return Vr = r, Vr;
}
var Wr, Qo;
function Zu() {
  if (Qo)
    return Wr;
  Qo = 1;
  function r(e, t) {
    return e.has(t);
  }
  return Wr = r, Wr;
}
var Xv = Yu(), Zv = Xu(), eE = Zu(), tE = 1, rE = 2;
function nE(r, e, t, n, i, a) {
  var o = t & tE, s = r.length, l = e.length;
  if (s != l && !(o && l > s))
    return !1;
  var u = a.get(r), h = a.get(e);
  if (u && h)
    return u == e && h == r;
  var c = -1, d = !0, p = t & rE ? new Xv() : void 0;
  for (a.set(r, e), a.set(e, r); ++c < s; ) {
    var g = r[c], _ = e[c];
    if (n)
      var f = o ? n(_, g, c, e, r, a) : n(g, _, c, r, e, a);
    if (f !== void 0) {
      if (f)
        continue;
      d = !1;
      break;
    }
    if (p) {
      if (!Zv(e, function(m, y) {
        if (!eE(p, y) && (g === m || i(g, m, t, n, a)))
          return p.push(y);
      })) {
        d = !1;
        break;
      }
    } else if (!(g === _ || i(g, _, t, n, a))) {
      d = !1;
      break;
    }
  }
  return a.delete(r), a.delete(e), d;
}
var ec = nE;
function iE(r) {
  var e = -1, t = Array(r.size);
  return r.forEach(function(n, i) {
    t[++e] = [i, n];
  }), t;
}
var tc = iE;
function sE(r) {
  var e = -1, t = Array(r.size);
  return r.forEach(function(n) {
    t[++e] = n;
  }), t;
}
var yr = sE, Do = Be, Fo = mu, oE = tt, aE = ec, lE = tc, uE = yr, cE = 1, hE = 2, dE = "[object Boolean]", fE = "[object Date]", pE = "[object Error]", mE = "[object Map]", gE = "[object Number]", yE = "[object RegExp]", bE = "[object Set]", _E = "[object String]", wE = "[object Symbol]", $E = "[object ArrayBuffer]", CE = "[object DataView]", Uo = Do ? Do.prototype : void 0, zr = Uo ? Uo.valueOf : void 0;
function vE(r, e, t, n, i, a, o) {
  switch (t) {
    case CE:
      if (r.byteLength != e.byteLength || r.byteOffset != e.byteOffset)
        return !1;
      r = r.buffer, e = e.buffer;
    case $E:
      return !(r.byteLength != e.byteLength || !a(new Fo(r), new Fo(e)));
    case dE:
    case fE:
    case gE:
      return oE(+r, +e);
    case pE:
      return r.name == e.name && r.message == e.message;
    case yE:
    case _E:
      return r == e + "";
    case mE:
      var s = lE;
    case bE:
      var l = n & cE;
      if (s || (s = uE), r.size != e.size && !l)
        return !1;
      var u = o.get(r);
      if (u)
        return u == e;
      n |= hE, o.set(r, e);
      var h = aE(s(r), s(e), n, i, a, o);
      return o.delete(r), h;
    case wE:
      if (zr)
        return zr.call(r) == zr.call(e);
  }
  return !1;
}
var EE = vE, Ho = hu, TE = 1, AE = Object.prototype, OE = AE.hasOwnProperty;
function NE(r, e, t, n, i, a) {
  var o = t & TE, s = Ho(r), l = s.length, u = Ho(e), h = u.length;
  if (l != h && !o)
    return !1;
  for (var c = l; c--; ) {
    var d = s[c];
    if (!(o ? d in e : OE.call(e, d)))
      return !1;
  }
  var p = a.get(r), g = a.get(e);
  if (p && g)
    return p == e && g == r;
  var _ = !0;
  a.set(r, e), a.set(e, r);
  for (var f = o; ++c < l; ) {
    d = s[c];
    var m = r[d], y = e[d];
    if (n)
      var w = o ? n(y, m, d, e, r, a) : n(m, y, d, r, e, a);
    if (!(w === void 0 ? m === y || i(m, y, t, n, a) : w)) {
      _ = !1;
      break;
    }
    f || (f = d == "constructor");
  }
  if (_ && !f) {
    var $ = r.constructor, E = e.constructor;
    $ != E && "constructor" in r && "constructor" in e && !(typeof $ == "function" && $ instanceof $ && typeof E == "function" && E instanceof E) && (_ = !1);
  }
  return a.delete(r), a.delete(e), _;
}
var qE = NE, Jr = lr, RE = ec, SE = EE, xE = qE, Vo = ut, Wo = U, zo = ot, IE = at, PE = 1, Jo = "[object Arguments]", Ko = "[object Array]", Ut = "[object Object]", LE = Object.prototype, Go = LE.hasOwnProperty;
function BE(r, e, t, n, i, a) {
  var o = Wo(r), s = Wo(e), l = o ? Ko : Vo(r), u = s ? Ko : Vo(e);
  l = l == Jo ? Ut : l, u = u == Jo ? Ut : u;
  var h = l == Ut, c = u == Ut, d = l == u;
  if (d && zo(r)) {
    if (!zo(e))
      return !1;
    o = !0, h = !1;
  }
  if (d && !h)
    return a || (a = new Jr()), o || IE(r) ? RE(r, e, t, n, i, a) : SE(r, e, l, t, n, i, a);
  if (!(t & PE)) {
    var p = h && Go.call(r, "__wrapped__"), g = c && Go.call(e, "__wrapped__");
    if (p || g) {
      var _ = p ? r.value() : r, f = g ? e.value() : e;
      return a || (a = new Jr()), i(_, f, t, n, a);
    }
  }
  return d ? (a || (a = new Jr()), xE(r, e, t, n, i, a)) : !1;
}
var kE = BE, jE = kE, Yo = de;
function rc(r, e, t, n, i) {
  return r === e ? !0 : r == null || e == null || !Yo(r) && !Yo(e) ? r !== r && e !== e : jE(r, e, t, n, rc, i);
}
var nc = rc, ME = lr, QE = nc, DE = 1, FE = 2;
function UE(r, e, t, n) {
  var i = t.length, a = i, o = !n;
  if (r == null)
    return !a;
  for (r = Object(r); i--; ) {
    var s = t[i];
    if (o && s[2] ? s[1] !== r[s[0]] : !(s[0] in r))
      return !1;
  }
  for (; ++i < a; ) {
    s = t[i];
    var l = s[0], u = r[l], h = s[1];
    if (o && s[2]) {
      if (u === void 0 && !(l in r))
        return !1;
    } else {
      var c = new ME();
      if (n)
        var d = n(u, h, l, r, e, c);
      if (!(d === void 0 ? QE(h, u, DE | FE, n, c) : d))
        return !1;
    }
  }
  return !0;
}
var HE = UE, VE = se;
function WE(r) {
  return r === r && !VE(r);
}
var ic = WE, zE = ic, JE = Qe;
function KE(r) {
  for (var e = JE(r), t = e.length; t--; ) {
    var n = e[t], i = r[n];
    e[t] = [n, i, zE(i)];
  }
  return e;
}
var GE = KE;
function YE(r, e) {
  return function(t) {
    return t == null ? !1 : t[r] === e && (e !== void 0 || r in Object(t));
  };
}
var sc = YE, XE = HE, ZE = GE, eT = sc;
function tT(r) {
  var e = ZE(r);
  return e.length == 1 && e[0][2] ? eT(e[0][0], e[0][1]) : function(t) {
    return t === r || XE(t, r, e);
  };
}
var rT = tT, nT = U, iT = mr, sT = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, oT = /^\w*$/;
function aT(r, e) {
  if (nT(r))
    return !1;
  var t = typeof r;
  return t == "number" || t == "symbol" || t == "boolean" || r == null || iT(r) ? !0 : oT.test(r) || !sT.test(r) || e != null && r in Object(e);
}
var $s = aT, oc = ls, lT = "Expected a function";
function Cs(r, e) {
  if (typeof r != "function" || e != null && typeof e != "function")
    throw new TypeError(lT);
  var t = function() {
    var n = arguments, i = e ? e.apply(this, n) : n[0], a = t.cache;
    if (a.has(i))
      return a.get(i);
    var o = r.apply(this, n);
    return t.cache = a.set(i, o) || a, o;
  };
  return t.cache = new (Cs.Cache || oc)(), t;
}
Cs.Cache = oc;
var uT = Cs, cT = uT, hT = 500;
function dT(r) {
  var e = cT(r, function(n) {
    return t.size === hT && t.clear(), n;
  }), t = e.cache;
  return e;
}
var fT = dT, pT = fT, mT = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, gT = /\\(\\)?/g, yT = pT(function(r) {
  var e = [];
  return r.charCodeAt(0) === 46 && e.push(""), r.replace(mT, function(t, n, i, a) {
    e.push(i ? a.replace(gT, "$1") : n || t);
  }), e;
}), bT = yT, _T = U, wT = $s, $T = bT, CT = Ou;
function vT(r, e) {
  return _T(r) ? r : wT(r, e) ? [r] : $T(CT(r));
}
var br = vT, ET = mr, TT = 1 / 0;
function AT(r) {
  if (typeof r == "string" || ET(r))
    return r;
  var e = r + "";
  return e == "0" && 1 / r == -TT ? "-0" : e;
}
var St = AT, OT = br, NT = St;
function qT(r, e) {
  e = OT(e, r);
  for (var t = 0, n = e.length; r != null && t < n; )
    r = r[NT(e[t++])];
  return t && t == n ? r : void 0;
}
var vs = qT, RT = vs;
function ST(r, e, t) {
  var n = r == null ? void 0 : RT(r, e);
  return n === void 0 ? t : n;
}
var xT = ST;
function IT(r, e) {
  return r != null && e in Object(r);
}
var PT = IT, LT = br, BT = Nt, kT = U, jT = hr, MT = cs, QT = St;
function DT(r, e, t) {
  e = LT(e, r);
  for (var n = -1, i = e.length, a = !1; ++n < i; ) {
    var o = QT(e[n]);
    if (!(a = r != null && t(r, o)))
      break;
    r = r[o];
  }
  return a || ++n != i ? a : (i = r == null ? 0 : r.length, !!i && MT(i) && jT(o, i) && (kT(r) || BT(r)));
}
var ac = DT, FT = PT, UT = ac;
function HT(r, e) {
  return r != null && UT(r, e, FT);
}
var VT = HT, WT = nc, zT = xT, JT = VT, KT = $s, GT = ic, YT = sc, XT = St, ZT = 1, eA = 2;
function tA(r, e) {
  return KT(r) && GT(e) ? YT(XT(r), e) : function(t) {
    var n = zT(t, r);
    return n === void 0 && n === e ? JT(t, r) : WT(e, n, ZT | eA);
  };
}
var rA = tA;
function nA(r) {
  return function(e) {
    return e == null ? void 0 : e[r];
  };
}
var iA = nA, sA = vs;
function oA(r) {
  return function(e) {
    return sA(e, r);
  };
}
var aA = oA, lA = iA, uA = aA, cA = $s, hA = St;
function dA(r) {
  return cA(r) ? lA(hA(r)) : uA(r);
}
var fA = dA, pA = rT, mA = rA, gA = oe, yA = U, bA = fA;
function _A(r) {
  return typeof r == "function" ? r : r == null ? gA : typeof r == "object" ? yA(r) ? mA(r[0], r[1]) : pA(r) : bA(r);
}
var _e = _A, wA = "Expected a function";
function $A(r) {
  if (typeof r != "function")
    throw new TypeError(wA);
  return function() {
    var e = arguments;
    switch (e.length) {
      case 0:
        return !r.call(this);
      case 1:
        return !r.call(this, e[0]);
      case 2:
        return !r.call(this, e[0], e[1]);
      case 3:
        return !r.call(this, e[0], e[1], e[2]);
    }
    return !r.apply(this, e);
  };
}
var lc = $A, CA = ps, vA = Gu, EA = _e, TA = U, AA = lc;
function OA(r, e) {
  var t = TA(r) ? CA : vA;
  return t(r, AA(EA(e)));
}
var NA = OA, qA = ku;
function RA(r) {
  var e = r == null ? 0 : r.length;
  return e ? qA(r, 1, e) : [];
}
var _r = RA, SA = ke, xA = U, IA = de, PA = "[object String]";
function LA(r) {
  return typeof r == "string" || !xA(r) && IA(r) && SA(r) == PA;
}
var BA = LA;
function kA(r) {
  for (var e, t = []; !(e = r.next()).done; )
    t.push(e.value);
  return t;
}
var jA = kA;
function MA(r) {
  return r.split("");
}
var QA = MA, DA = "\\ud800-\\udfff", FA = "\\u0300-\\u036f", UA = "\\ufe20-\\ufe2f", HA = "\\u20d0-\\u20ff", VA = FA + UA + HA, WA = "\\ufe0e\\ufe0f", zA = "\\u200d", JA = RegExp("[" + zA + DA + VA + WA + "]");
function KA(r) {
  return JA.test(r);
}
var GA = KA, uc = "\\ud800-\\udfff", YA = "\\u0300-\\u036f", XA = "\\ufe20-\\ufe2f", ZA = "\\u20d0-\\u20ff", eO = YA + XA + ZA, tO = "\\ufe0e\\ufe0f", rO = "[" + uc + "]", Wi = "[" + eO + "]", zi = "\\ud83c[\\udffb-\\udfff]", nO = "(?:" + Wi + "|" + zi + ")", cc = "[^" + uc + "]", hc = "(?:\\ud83c[\\udde6-\\uddff]){2}", dc = "[\\ud800-\\udbff][\\udc00-\\udfff]", iO = "\\u200d", fc = nO + "?", pc = "[" + tO + "]?", sO = "(?:" + iO + "(?:" + [cc, hc, dc].join("|") + ")" + pc + fc + ")*", oO = pc + fc + sO, aO = "(?:" + [cc + Wi + "?", Wi, hc, dc, rO].join("|") + ")", lO = RegExp(zi + "(?=" + zi + ")|" + aO + oO, "g");
function uO(r) {
  return r.match(lO) || [];
}
var cO = uO, hO = QA, dO = GA, fO = cO;
function pO(r) {
  return dO(r) ? fO(r) : hO(r);
}
var mO = pO, gO = pr;
function yO(r, e) {
  return gO(e, function(t) {
    return r[t];
  });
}
var bO = yO, _O = bO, wO = Qe;
function $O(r) {
  return r == null ? [] : _O(r, wO(r));
}
var mc = $O, Xo = Be, CO = fs, vO = ut, EO = be, TO = BA, AO = jA, OO = tc, NO = yr, qO = mO, RO = mc, SO = "[object Map]", xO = "[object Set]", Kr = Xo ? Xo.iterator : void 0;
function IO(r) {
  if (!r)
    return [];
  if (EO(r))
    return TO(r) ? qO(r) : CO(r);
  if (Kr && r[Kr])
    return AO(r[Kr]());
  var e = vO(r), t = e == SO ? OO : e == xO ? NO : RO;
  return t(r);
}
var xt = IO;
const gc = Object.freeze({
  pg: "postgres",
  postgresql: "postgres",
  sqlite: "sqlite3"
}), PO = Object.freeze(
  [
    "mssql",
    "mysql",
    "mysql2",
    "oracledb",
    "postgres",
    "pgnative",
    "redshift",
    "sqlite3",
    "cockroachdb",
    "better-sqlite3"
  ].concat(Object.keys(gc))
), LO = Object.freeze({
  MsSQL: "mssql",
  MySQL: "mysql",
  MySQL2: "mysql2",
  Oracle: "oracledb",
  PostgreSQL: "pg",
  PgNative: "pgnative",
  Redshift: "pg-redshift",
  SQLite: "sqlite3",
  CockroachDB: "cockroachdb",
  BetterSQLite3: "better-sqlite3"
}), BO = Object.freeze([
  "maxWaitingClients",
  "testOnBorrow",
  "fifo",
  "priorityRange",
  "autostart",
  "evictionRunIntervalMillis",
  "numTestsPerRun",
  "softIdleTimeoutMillis",
  "Promise"
]), kO = /,[\s](?![^(]*\))/g;
var Es = {
  CLIENT_ALIASES: gc,
  SUPPORTED_CLIENTS: PO,
  POOL_CONFIG_OPTIONS: BO,
  COMMA_NO_PAREN_REGEX: kO,
  DRIVER_NAMES: LO
};
const yc = Ae, jO = at, { CLIENT_ALIASES: MO } = Es, { isFunction: QO } = Q;
function DO(...r) {
  return Array.isArray(r[0]) ? r[0] : r;
}
function Tt(r) {
  let e = !1;
  if (jO(r))
    return !1;
  if (r && QO(r.toSQL))
    return e;
  if (Array.isArray(r))
    for (let t = 0; t < r.length && !e; t++)
      e = Tt(r[t]);
  else
    yc(r) ? Object.keys(r).forEach((t) => {
      e || (e = Tt(r[t]));
    }) : e = r === void 0;
  return e;
}
function FO(r) {
  const e = [];
  return Array.isArray(r) ? r.forEach((t, n) => {
    Tt(t) && e.push(n);
  }) : yc(r) ? Object.keys(r).forEach((t) => {
    Tt(r[t]) && e.push(t);
  }) : e.push(0), e;
}
function UO(r) {
  r.prototype.queryContext = function(e) {
    return e === void 0 ? this._queryContext : (this._queryContext = e, this);
  };
}
function HO(r) {
  return MO[r] || r;
}
function VO(r, e) {
  if (r == null)
    return e;
  const t = parseInt(r, 10);
  return isNaN(t) ? e : t;
}
var z = {
  addQueryContext: UO,
  containsUndefined: Tt,
  getUndefinedIndices: FO,
  normalizeArr: DO,
  resolveClientNameWithAliases: HO,
  toNumber: VO
};
const Zo = P;
function ea(r, e, t, n, i) {
  if (typeof t == "function")
    return {
      type: "onWrapped",
      value: t,
      bool: e
    };
  switch (arguments.length) {
    case 3:
      return { type: "onRaw", value: t, bool: e };
    case 4:
      return {
        type: r,
        column: t,
        operator: "=",
        value: n,
        bool: e
      };
    default:
      return {
        type: r,
        column: t,
        operator: n,
        value: i,
        bool: e
      };
  }
}
let D = class {
  constructor(e, t, n) {
    this.schema = n, this.table = e, this.joinType = t, this.and = this, this.clauses = [];
  }
  get or() {
    return this._bool("or");
  }
  // Adds an "on" clause to the current join object.
  on(e) {
    if (typeof e == "object" && typeof e.toSQL != "function") {
      const n = Object.keys(e);
      let i = -1;
      const a = this._bool() === "or" ? "orOn" : "on";
      for (; ++i < n.length; )
        this[a](n[i], e[n[i]]);
      return this;
    }
    const t = ea("onBasic", this._bool(), ...arguments);
    return t && this.clauses.push(t), this;
  }
  // Adds an "or on" clause to the current join object.
  orOn(e, t, n) {
    return this._bool("or").on.apply(this, arguments);
  }
  onJsonPathEquals(e, t, n, i) {
    return this.clauses.push({
      type: "onJsonPathEquals",
      columnFirst: e,
      jsonPathFirst: t,
      columnSecond: n,
      jsonPathSecond: i,
      bool: this._bool(),
      not: this._not()
    }), this;
  }
  orOnJsonPathEquals(e, t, n, i) {
    return this._bool("or").onJsonPathEquals.apply(this, arguments);
  }
  // Adds a "using" clause to the current join.
  using(e) {
    return this.clauses.push({ type: "onUsing", column: e, bool: this._bool() });
  }
  onVal(e) {
    if (typeof e == "object" && typeof e.toSQL != "function") {
      const n = Object.keys(e);
      let i = -1;
      const a = this._bool() === "or" ? "orOnVal" : "onVal";
      for (; ++i < n.length; )
        this[a](n[i], e[n[i]]);
      return this;
    }
    const t = ea("onVal", this._bool(), ...arguments);
    return t && this.clauses.push(t), this;
  }
  andOnVal() {
    return this.onVal(...arguments);
  }
  orOnVal() {
    return this._bool("or").onVal(...arguments);
  }
  onBetween(e, t) {
    return Zo(
      Array.isArray(t),
      "The second argument to onBetween must be an array."
    ), Zo(
      t.length === 2,
      "You must specify 2 values for the onBetween clause"
    ), this.clauses.push({
      type: "onBetween",
      column: e,
      value: t,
      bool: this._bool(),
      not: this._not()
    }), this;
  }
  onNotBetween(e, t) {
    return this._not(!0).onBetween(e, t);
  }
  orOnBetween(e, t) {
    return this._bool("or").onBetween(e, t);
  }
  orOnNotBetween(e, t) {
    return this._bool("or")._not(!0).onBetween(e, t);
  }
  onIn(e, t) {
    return Array.isArray(t) && t.length === 0 ? this.on(1, "=", 0) : (this.clauses.push({
      type: "onIn",
      column: e,
      value: t,
      not: this._not(),
      bool: this._bool()
    }), this);
  }
  onNotIn(e, t) {
    return this._not(!0).onIn(e, t);
  }
  orOnIn(e, t) {
    return this._bool("or").onIn(e, t);
  }
  orOnNotIn(e, t) {
    return this._bool("or")._not(!0).onIn(e, t);
  }
  onNull(e) {
    return this.clauses.push({
      type: "onNull",
      column: e,
      not: this._not(),
      bool: this._bool()
    }), this;
  }
  orOnNull(e) {
    return this._bool("or").onNull(e);
  }
  onNotNull(e) {
    return this._not(!0).onNull(e);
  }
  orOnNotNull(e) {
    return this._not(!0)._bool("or").onNull(e);
  }
  onExists(e) {
    return this.clauses.push({
      type: "onExists",
      value: e,
      not: this._not(),
      bool: this._bool()
    }), this;
  }
  orOnExists(e) {
    return this._bool("or").onExists(e);
  }
  onNotExists(e) {
    return this._not(!0).onExists(e);
  }
  orOnNotExists(e) {
    return this._not(!0)._bool("or").onExists(e);
  }
  // Explicitly set the type of join, useful within a function when creating a grouped join.
  type(e) {
    return this.joinType = e, this;
  }
  _bool(e) {
    if (arguments.length === 1)
      return this._boolFlag = e, this;
    const t = this._boolFlag || "and";
    return this._boolFlag = "and", t;
  }
  _not(e) {
    if (arguments.length === 1)
      return this._notFlag = e, this;
    const t = this._notFlag;
    return this._notFlag = !1, t;
  }
};
Object.assign(D.prototype, {
  grouping: "join"
});
D.prototype.andOn = D.prototype.on;
D.prototype.andOnIn = D.prototype.onIn;
D.prototype.andOnNotIn = D.prototype.onNotIn;
D.prototype.andOnNull = D.prototype.onNull;
D.prototype.andOnNotNull = D.prototype.onNotNull;
D.prototype.andOnExists = D.prototype.onExists;
D.prototype.andOnNotExists = D.prototype.onNotExists;
D.prototype.andOnBetween = D.prototype.onBetween;
D.prototype.andOnNotBetween = D.prototype.onNotBetween;
D.prototype.andOnJsonPathEquals = D.prototype.onJsonPathEquals;
var bc = D;
const ta = P;
let WO = class {
  constructor(e, t, n, i, a) {
    this.schema = t, this.type = "analytic", this.method = e, this.order = i || [], this.partitions = a || [], this.alias = n, this.and = this, this.grouping = "columns";
  }
  partitionBy(e, t) {
    return ta(
      Array.isArray(e) || typeof e == "string",
      `The argument to an analytic partitionBy function must be either a string
            or an array of string.`
    ), Array.isArray(e) ? this.partitions = this.partitions.concat(e) : this.partitions.push({ column: e, order: t }), this;
  }
  orderBy(e, t) {
    return ta(
      Array.isArray(e) || typeof e == "string",
      `The argument to an analytic orderBy function must be either a string
            or an array of string.`
    ), Array.isArray(e) ? this.order = this.order.concat(e) : this.order.push({ column: e, order: t }), this;
  }
};
var zO = WO, Ts = function(e, t) {
  e.client.config.asyncStackTraces && (e._asyncStack = {
    error: new Error(),
    lines: t
  });
}, JO = {
  lockMode: {
    forShare: "forShare",
    forUpdate: "forUpdate",
    forNoKeyUpdate: "forNoKeyUpdate",
    forKeyShare: "forKeyShare"
  },
  waitMode: {
    skipLocked: "skipLocked",
    noWait: "noWait"
  }
};
const KO = ws, GO = le, { callbackify: YO } = P, XO = Vu, { formatQuery: ZO } = Ju;
function eN(r) {
  r.prototype.toQuery = function(e) {
    let t = this.toSQL(this._method, e);
    return Array.isArray(t) || (t = [t]), t.length ? t.map((n) => ZO(n.sql, n.bindings, e, this.client)).reduce((n, i) => n.concat(n.endsWith(";") ? `
` : `;
`, i)) : "";
  }, r.prototype.then = function() {
    let e = this.client.runner(this).run();
    return this.client.config.asyncStackTraces && (e = e.catch((t) => {
      t.originalStack = t.stack;
      const n = t.stack.split(`
`)[0], { error: i, lines: a } = this._asyncStack, s = i.stack.split(`
`).slice(a);
      throw s.unshift(n), t.stack = s.join(`
`), t;
    })), e.then.apply(e, arguments);
  }, r.prototype.options = function(e) {
    return this._options = this._options || [], this._options.push(KO(e) || {}), this;
  }, r.prototype.connection = function(e) {
    return this._connection = e, this.client.processPassedConnection(e), this;
  }, r.prototype.debug = function(e) {
    return this._debug = arguments.length ? e : !0, this;
  }, r.prototype.transacting = function(e) {
    if (e && e.client && (e.client.transacting ? this.client = e.client : e.client.logger.warn(
      `Invalid transaction value: ${e.client}`
    )), GO(e))
      throw this.client.logger.error(
        "Invalid value on transacting call, potential bug"
      ), Error(
        "Invalid transacting value (null, undefined or empty object)"
      );
    return this;
  }, r.prototype.stream = function(e) {
    return this.client.runner(this).stream(e);
  }, r.prototype.pipe = function(e, t) {
    return this.client.runner(this).pipe(e, t);
  }, r.prototype.asCallback = function(e) {
    const t = this.then();
    return YO(() => t)(e), t;
  }, r.prototype.catch = function(e) {
    return this.then().catch(e);
  }, Object.defineProperty(r.prototype, Symbol.toStringTag, {
    get: () => "object"
  }), XO(r.prototype);
}
var As = {
  augmentWithBuilderInterface: eN
};
const Ge = P, { EventEmitter: tN } = P, rN = Fe, Ht = ws, nN = Rt, Ye = le, ra = Ae, iN = zv, sN = NA, oN = _r, na = xt, { addQueryContext: aN, normalizeArr: _t } = z, Gr = bc, lN = zO, uN = Ts, {
  isBoolean: wt,
  isNumber: cN,
  isObject: me,
  isString: Yr,
  isFunction: hN
} = Q, { lockMode: Ce, waitMode: Vt } = JO, {
  augmentWithBuilderInterface: dN
} = As, fN = /* @__PURE__ */ new Set(["pluck", "first", "select"]), pN = /* @__PURE__ */ new Set([
  "with",
  "select",
  "columns",
  "hintComments",
  "where",
  "union",
  "join",
  "group",
  "order",
  "having",
  "limit",
  "offset",
  "counter",
  "counters"
]), mN = /* @__PURE__ */ new Set([
  Ce.forShare,
  Ce.forUpdate,
  Ce.forNoKeyUpdate,
  Ce.forKeyShare
]);
class q extends tN {
  constructor(e) {
    super(), this.client = e, this.and = this, this._single = {}, this._statements = [], this._method = "select", e.config && (uN(this, 5), this._debug = e.config.debug), this._joinFlag = "inner", this._boolFlag = "and", this._notFlag = !1, this._asColumnFlag = !1;
  }
  toString() {
    return this.toQuery();
  }
  // Convert the current query "toSQL"
  toSQL(e, t) {
    return this.client.queryCompiler(this).toSQL(e || this._method, t);
  }
  // Create a shallow clone of the current query builder.
  clone() {
    const e = new this.constructor(this.client);
    return e._method = this._method, e._single = Ht(this._single), e._statements = Ht(this._statements), e._debug = this._debug, this._options !== void 0 && (e._options = Ht(this._options)), this._queryContext !== void 0 && (e._queryContext = Ht(this._queryContext)), this._connection !== void 0 && (e._connection = this._connection), e;
  }
  timeout(e, { cancel: t } = {}) {
    return cN(e) && e > 0 && (this._timeout = e, t && (this.client.assertCanCancelQuery(), this._cancelOnTimeout = !0)), this;
  }
  // With
  // ------
  isValidStatementArg(e) {
    return typeof e == "function" || e instanceof q || e && e.isRawInstance;
  }
  _validateWithArgs(e, t, n, i) {
    const [a, o] = typeof n > "u" ? [t, void 0] : [n, t];
    if (typeof e != "string")
      throw new Error(`${i}() first argument must be a string`);
    if (this.isValidStatementArg(a) && typeof o > "u")
      return;
    if (!(Array.isArray(o) && o.length > 0 && o.every((l) => typeof l == "string")))
      throw new Error(
        `${i}() second argument must be a statement or non-empty column name list.`
      );
    if (!this.isValidStatementArg(a))
      throw new Error(
        `${i}() third argument must be a function / QueryBuilder or a raw when its second argument is a column name list`
      );
  }
  with(e, t, n) {
    return this._validateWithArgs(
      e,
      t,
      n,
      "with"
    ), this.withWrapped(e, t, n);
  }
  withMaterialized(e, t, n) {
    throw new Error("With materialized is not supported by this dialect");
  }
  withNotMaterialized(e, t, n) {
    throw new Error("With materialized is not supported by this dialect");
  }
  // Helper for compiling any advanced `with` queries.
  withWrapped(e, t, n, i) {
    const [a, o] = typeof n > "u" ? [t, void 0] : [n, t], s = {
      grouping: "with",
      type: "withWrapped",
      alias: e,
      columnList: o,
      value: a
    };
    return i !== void 0 && (s.materialized = i), this._statements.push(s), this;
  }
  // With Recursive
  // ------
  withRecursive(e, t, n) {
    return this._validateWithArgs(
      e,
      t,
      n,
      "withRecursive"
    ), this.withRecursiveWrapped(
      e,
      t,
      n
    );
  }
  // Helper for compiling any advanced `withRecursive` queries.
  withRecursiveWrapped(e, t, n) {
    return this.withWrapped(e, t, n), this._statements[this._statements.length - 1].recursive = !0, this;
  }
  // Select
  // ------
  // Adds a column or columns to the list of "columns"
  // being selected on the query.
  columns(e) {
    return !e && e !== 0 ? this : (this._statements.push({
      grouping: "columns",
      value: _t(...arguments)
    }), this);
  }
  // Allow for a sub-select to be explicitly aliased as a column,
  // without needing to compile the query in a where.
  as(e) {
    return this._single.as = e, this;
  }
  // Adds a single hint or an array of hits to the list of "hintComments" on the query.
  hintComment(e) {
    if (e = Array.isArray(e) ? e : [e], e.some((t) => !Yr(t)))
      throw new Error("Hint comment must be a string");
    if (e.some((t) => t.includes("/*") || t.includes("*/")))
      throw new Error('Hint comment cannot include "/*" or "*/"');
    if (e.some((t) => t.includes("?")))
      throw new Error('Hint comment cannot include "?"');
    return this._statements.push({
      grouping: "hintComments",
      value: e
    }), this;
  }
  // Prepends the `schemaName` on `tableName` defined by `.table` and `.join`.
  withSchema(e) {
    return this._single.schema = e, this;
  }
  // Sets the `tableName` on the query.
  // Alias to "from" for select and "into" for insert statements
  // e.g. builder.insert({a: value}).into('tableName')
  // `options`: options object containing keys:
  //   - `only`: whether the query should use SQL's ONLY to not return
  //           inheriting table data. Defaults to false.
  table(e, t = {}) {
    return this._single.table = e, this._single.only = t.only === !0, this;
  }
  // Adds a `distinct` clause to the query.
  distinct(...e) {
    return this._statements.push({
      grouping: "columns",
      value: _t(...e),
      distinct: !0
    }), this;
  }
  distinctOn(...e) {
    if (Ye(e))
      throw new Error("distinctOn requires at least on argument");
    return this._statements.push({
      grouping: "columns",
      value: _t(...e),
      distinctOn: !0
    }), this;
  }
  // Adds a join clause to the query, allowing for advanced joins
  // with an anonymous function as the second argument.
  join(e, t, ...n) {
    let i;
    const a = e instanceof q || typeof e == "function" ? void 0 : this._single.schema, o = this._joinType();
    return typeof t == "function" ? (i = new Gr(e, o, a), t.call(i, i)) : o === "raw" ? i = new Gr(this.client.raw(e, t), "raw") : (i = new Gr(e, o, a), t && i.on(t, ...n)), this._statements.push(i), this;
  }
  using(e) {
    throw new Error(
      "'using' function is only available in PostgreSQL dialect with Delete statements."
    );
  }
  // JOIN blocks:
  innerJoin(...e) {
    return this._joinType("inner").join(...e);
  }
  leftJoin(...e) {
    return this._joinType("left").join(...e);
  }
  leftOuterJoin(...e) {
    return this._joinType("left outer").join(...e);
  }
  rightJoin(...e) {
    return this._joinType("right").join(...e);
  }
  rightOuterJoin(...e) {
    return this._joinType("right outer").join(...e);
  }
  outerJoin(...e) {
    return this._joinType("outer").join(...e);
  }
  fullOuterJoin(...e) {
    return this._joinType("full outer").join(...e);
  }
  crossJoin(...e) {
    return this._joinType("cross").join(...e);
  }
  joinRaw(...e) {
    return this._joinType("raw").join(...e);
  }
  // Where modifiers:
  get or() {
    return this._bool("or");
  }
  get not() {
    return this._not(!0);
  }
  // The where function can be used in several ways:
  // The most basic is `where(key, value)`, which expands to
  // where key = value.
  where(e, t, n) {
    const i = arguments.length;
    if (e === !1 || e === !0)
      return this.where(1, "=", e ? 1 : 0);
    if (typeof e == "function")
      return this.whereWrapped(e);
    if (me(e) && !e.isRawInstance)
      return this._objectWhere(e);
    if (e && e.isRawInstance && i === 1)
      return this.whereRaw(e);
    if (i === 2 && (n = t, t = "=", n === null))
      return this.whereNull(e);
    const a = `${t}`.toLowerCase().trim();
    if (i === 3) {
      if (a === "in" || a === "not in")
        return this._not(a === "not in").whereIn(e, n);
      if (a === "between" || a === "not between")
        return this._not(a === "not between").whereBetween(
          e,
          n
        );
    }
    return n === null && (a === "is" || a === "is not") ? this._not(a === "is not").whereNull(e) : (this._statements.push({
      grouping: "where",
      type: "whereBasic",
      column: e,
      operator: t,
      value: n,
      not: this._not(),
      bool: this._bool(),
      asColumn: this._asColumnFlag
    }), this);
  }
  whereColumn(...e) {
    return this._asColumnFlag = !0, this.where(...e), this._asColumnFlag = !1, this;
  }
  // Adds an `or where` clause to the query.
  orWhere(e, ...t) {
    this._bool("or");
    const n = e;
    return me(n) && !n.isRawInstance ? this.whereWrapped(function() {
      for (const i in n)
        this.andWhere(i, n[i]);
    }) : this.where(e, ...t);
  }
  orWhereColumn(e, ...t) {
    this._bool("or");
    const n = e;
    return me(n) && !n.isRawInstance ? this.whereWrapped(function() {
      for (const i in n)
        this.andWhereColumn(i, "=", n[i]);
    }) : this.whereColumn(e, ...t);
  }
  // Adds an `not where` clause to the query.
  whereNot(e, ...t) {
    return t.length >= 2 && (t[0] === "in" || t[0] === "between") && this.client.logger.warn(
      'whereNot is not suitable for "in" and "between" type subqueries. You should use "not in" and "not between" instead.'
    ), this._not(!0).where(e, ...t);
  }
  whereNotColumn(...e) {
    return this._not(!0).whereColumn(...e);
  }
  // Adds an `or not where` clause to the query.
  orWhereNot(...e) {
    return this._bool("or").whereNot(...e);
  }
  orWhereNotColumn(...e) {
    return this._bool("or").whereNotColumn(...e);
  }
  // Processes an object literal provided in a "where" clause.
  _objectWhere(e) {
    const t = this._bool(), n = this._not() ? "Not" : "";
    for (const i in e)
      this[t + "Where" + n](i, e[i]);
    return this;
  }
  // Adds a raw `where` clause to the query.
  whereRaw(e, t) {
    const n = e.isRawInstance ? e : this.client.raw(e, t);
    return this._statements.push({
      grouping: "where",
      type: "whereRaw",
      value: n,
      not: this._not(),
      bool: this._bool()
    }), this;
  }
  orWhereRaw(e, t) {
    return this._bool("or").whereRaw(e, t);
  }
  // Helper for compiling any advanced `where` queries.
  whereWrapped(e) {
    return this._statements.push({
      grouping: "where",
      type: "whereWrapped",
      value: e,
      not: this._not(),
      bool: this._bool()
    }), this;
  }
  // Adds a `where exists` clause to the query.
  whereExists(e) {
    return this._statements.push({
      grouping: "where",
      type: "whereExists",
      value: e,
      not: this._not(),
      bool: this._bool()
    }), this;
  }
  // Adds an `or where exists` clause to the query.
  orWhereExists(e) {
    return this._bool("or").whereExists(e);
  }
  // Adds a `where not exists` clause to the query.
  whereNotExists(e) {
    return this._not(!0).whereExists(e);
  }
  // Adds a `or where not exists` clause to the query.
  orWhereNotExists(e) {
    return this._bool("or").whereNotExists(e);
  }
  // Adds a `where in` clause to the query.
  whereIn(e, t) {
    return Array.isArray(t) && Ye(t) ? this.where(this._not()) : (this._statements.push({
      grouping: "where",
      type: "whereIn",
      column: e,
      value: t,
      not: this._not(),
      bool: this._bool()
    }), this);
  }
  // Adds a `or where in` clause to the query.
  orWhereIn(e, t) {
    return this._bool("or").whereIn(e, t);
  }
  // Adds a `where not in` clause to the query.
  whereNotIn(e, t) {
    return this._not(!0).whereIn(e, t);
  }
  // Adds a `or where not in` clause to the query.
  orWhereNotIn(e, t) {
    return this._bool("or")._not(!0).whereIn(e, t);
  }
  // Adds a `where null` clause to the query.
  whereNull(e) {
    return this._statements.push({
      grouping: "where",
      type: "whereNull",
      column: e,
      not: this._not(),
      bool: this._bool()
    }), this;
  }
  // Adds a `or where null` clause to the query.
  orWhereNull(e) {
    return this._bool("or").whereNull(e);
  }
  // Adds a `where not null` clause to the query.
  whereNotNull(e) {
    return this._not(!0).whereNull(e);
  }
  // Adds a `or where not null` clause to the query.
  orWhereNotNull(e) {
    return this._bool("or").whereNotNull(e);
  }
  // Adds a `where between` clause to the query.
  whereBetween(e, t) {
    return Ge(
      Array.isArray(t),
      "The second argument to whereBetween must be an array."
    ), Ge(
      t.length === 2,
      "You must specify 2 values for the whereBetween clause"
    ), this._statements.push({
      grouping: "where",
      type: "whereBetween",
      column: e,
      value: t,
      not: this._not(),
      bool: this._bool()
    }), this;
  }
  // Adds a `where not between` clause to the query.
  whereNotBetween(e, t) {
    return this._not(!0).whereBetween(e, t);
  }
  // Adds a `or where between` clause to the query.
  orWhereBetween(e, t) {
    return this._bool("or").whereBetween(e, t);
  }
  // Adds a `or where not between` clause to the query.
  orWhereNotBetween(e, t) {
    return this._bool("or").whereNotBetween(e, t);
  }
  _whereLike(e, t, n) {
    return this._statements.push({
      grouping: "where",
      type: e,
      column: t,
      value: n,
      not: this._not(),
      bool: this._bool(),
      asColumn: this._asColumnFlag
    }), this;
  }
  // Adds a `where like` clause to the query.
  whereLike(e, t) {
    return this._whereLike("whereLike", e, t);
  }
  // Adds a `or where like` clause to the query.
  orWhereLike(e, t) {
    return this._bool("or")._whereLike("whereLike", e, t);
  }
  // Adds a `where ilike` clause to the query.
  whereILike(e, t) {
    return this._whereLike("whereILike", e, t);
  }
  // Adds a `or where ilike` clause to the query.
  orWhereILike(e, t) {
    return this._bool("or")._whereLike("whereILike", e, t);
  }
  // Adds a `group by` clause to the query.
  groupBy(e) {
    return e && e.isRawInstance ? this.groupByRaw.apply(this, arguments) : (this._statements.push({
      grouping: "group",
      type: "groupByBasic",
      value: _t(...arguments)
    }), this);
  }
  // Adds a raw `group by` clause to the query.
  groupByRaw(e, t) {
    const n = e.isRawInstance ? e : this.client.raw(e, t);
    return this._statements.push({
      grouping: "group",
      type: "groupByRaw",
      value: n
    }), this;
  }
  // Adds a `order by` clause to the query.
  orderBy(e, t, n = "") {
    return Array.isArray(e) ? this._orderByArray(e) : (this._statements.push({
      grouping: "order",
      type: "orderByBasic",
      value: e,
      direction: t,
      nulls: n
    }), this);
  }
  // Adds a `order by` with multiple columns to the query.
  _orderByArray(e) {
    for (let t = 0; t < e.length; t++) {
      const n = e[t];
      me(n) ? this._statements.push({
        grouping: "order",
        type: "orderByBasic",
        value: n.column,
        direction: n.order,
        nulls: n.nulls
      }) : Yr(n) && this._statements.push({
        grouping: "order",
        type: "orderByBasic",
        value: n
      });
    }
    return this;
  }
  // Add a raw `order by` clause to the query.
  orderByRaw(e, t) {
    const n = e.isRawInstance ? e : this.client.raw(e, t);
    return this._statements.push({
      grouping: "order",
      type: "orderByRaw",
      value: n
    }), this;
  }
  _union(e, t) {
    let n = t[0], i = t[1];
    if (t.length === 1 || t.length === 2 && wt(i)) {
      Array.isArray(n) || (n = [n]);
      for (let a = 0, o = n.length; a < o; a++)
        this._statements.push({
          grouping: "union",
          clause: e,
          value: n[a],
          wrap: i || !1
        });
    } else
      n = na(t).slice(0, t.length - 1), i = t[t.length - 1], wt(i) || (n.push(i), i = !1), this._union(e, [n, i]);
    return this;
  }
  // Add a union statement to the query.
  union(...e) {
    return this._union("union", e);
  }
  // Adds a union all statement to the query.
  unionAll(...e) {
    return this._union("union all", e);
  }
  // Adds an intersect statement to the query
  intersect(e, t) {
    if (arguments.length === 1 || arguments.length === 2 && wt(t)) {
      Array.isArray(e) || (e = [e]);
      for (let n = 0, i = e.length; n < i; n++)
        this._statements.push({
          grouping: "union",
          clause: "intersect",
          value: e[n],
          wrap: t || !1
        });
    } else
      e = na(arguments).slice(0, arguments.length - 1), t = arguments[arguments.length - 1], wt(t) || (e.push(t), t = !1), this.intersect(e, t);
    return this;
  }
  // Adds a `having` clause to the query.
  having(e, t, n) {
    return e.isRawInstance && arguments.length === 1 ? this.havingRaw(e) : typeof e == "function" ? this.havingWrapped(e) : (this._statements.push({
      grouping: "having",
      type: "havingBasic",
      column: e,
      operator: t,
      value: n,
      bool: this._bool(),
      not: this._not()
    }), this);
  }
  orHaving(e, ...t) {
    this._bool("or");
    const n = e;
    return me(n) && !n.isRawInstance ? this.havingWrapped(function() {
      for (const i in n)
        this.andHaving(i, n[i]);
    }) : this.having(e, ...t);
  }
  // Helper for compiling any advanced `having` queries.
  havingWrapped(e) {
    return this._statements.push({
      grouping: "having",
      type: "havingWrapped",
      value: e,
      bool: this._bool(),
      not: this._not()
    }), this;
  }
  havingNull(e) {
    return this._statements.push({
      grouping: "having",
      type: "havingNull",
      column: e,
      not: this._not(),
      bool: this._bool()
    }), this;
  }
  orHavingNull(e) {
    return this._bool("or").havingNull(e);
  }
  havingNotNull(e) {
    return this._not(!0).havingNull(e);
  }
  orHavingNotNull(e) {
    return this._not(!0)._bool("or").havingNull(e);
  }
  havingExists(e) {
    return this._statements.push({
      grouping: "having",
      type: "havingExists",
      value: e,
      not: this._not(),
      bool: this._bool()
    }), this;
  }
  orHavingExists(e) {
    return this._bool("or").havingExists(e);
  }
  havingNotExists(e) {
    return this._not(!0).havingExists(e);
  }
  orHavingNotExists(e) {
    return this._not(!0)._bool("or").havingExists(e);
  }
  havingBetween(e, t) {
    return Ge(
      Array.isArray(t),
      "The second argument to havingBetween must be an array."
    ), Ge(
      t.length === 2,
      "You must specify 2 values for the havingBetween clause"
    ), this._statements.push({
      grouping: "having",
      type: "havingBetween",
      column: e,
      value: t,
      not: this._not(),
      bool: this._bool()
    }), this;
  }
  orHavingBetween(e, t) {
    return this._bool("or").havingBetween(e, t);
  }
  havingNotBetween(e, t) {
    return this._not(!0).havingBetween(e, t);
  }
  orHavingNotBetween(e, t) {
    return this._not(!0)._bool("or").havingBetween(e, t);
  }
  havingIn(e, t) {
    return Array.isArray(t) && Ye(t) ? this.where(this._not()) : (this._statements.push({
      grouping: "having",
      type: "havingIn",
      column: e,
      value: t,
      not: this._not(),
      bool: this._bool()
    }), this);
  }
  // Adds a `or where in` clause to the query.
  orHavingIn(e, t) {
    return this._bool("or").havingIn(e, t);
  }
  // Adds a `where not in` clause to the query.
  havingNotIn(e, t) {
    return this._not(!0).havingIn(e, t);
  }
  // Adds a `or where not in` clause to the query.
  orHavingNotIn(e, t) {
    return this._bool("or")._not(!0).havingIn(e, t);
  }
  // Adds a raw `having` clause to the query.
  havingRaw(e, t) {
    const n = e.isRawInstance ? e : this.client.raw(e, t);
    return this._statements.push({
      grouping: "having",
      type: "havingRaw",
      value: n,
      bool: this._bool(),
      not: this._not()
    }), this;
  }
  orHavingRaw(e, t) {
    return this._bool("or").havingRaw(e, t);
  }
  // set the skip binding parameter (= insert the raw value in the query) for an attribute.
  _setSkipBinding(e, t) {
    let n = t;
    me(t) && (n = t.skipBinding), this._single.skipBinding = this._single.skipBinding || {}, this._single.skipBinding[e] = n;
  }
  // Only allow a single "offset" to be set for the current query.
  offset(e, t) {
    if (e == null || e.isRawInstance || e instanceof q)
      this._single.offset = e;
    else {
      const n = parseInt(e, 10);
      if (isNaN(n))
        this.client.logger.warn("A valid integer must be provided to offset");
      else {
        if (n < 0)
          throw new Error("A non-negative integer must be provided to offset.");
        this._single.offset = n;
      }
    }
    return this._setSkipBinding("offset", t), this;
  }
  // Only allow a single "limit" to be set for the current query.
  limit(e, t) {
    const n = parseInt(e, 10);
    return isNaN(n) ? this.client.logger.warn("A valid integer must be provided to limit") : (this._single.limit = n, this._setSkipBinding("limit", t)), this;
  }
  // Retrieve the "count" result of the query.
  count(e, t) {
    return this._aggregate("count", e || "*", t);
  }
  // Retrieve the minimum value of a given column.
  min(e, t) {
    return this._aggregate("min", e, t);
  }
  // Retrieve the maximum value of a given column.
  max(e, t) {
    return this._aggregate("max", e, t);
  }
  // Retrieve the sum of the values of a given column.
  sum(e, t) {
    return this._aggregate("sum", e, t);
  }
  // Retrieve the average of the values of a given column.
  avg(e, t) {
    return this._aggregate("avg", e, t);
  }
  // Retrieve the "count" of the distinct results of the query.
  countDistinct(...e) {
    let t;
    return e.length > 1 && ra(iN(e)) && ([t] = e.splice(e.length - 1, 1)), e.length ? e.length === 1 && (e = e[0]) : e = "*", this._aggregate("count", e, { ...t, distinct: !0 });
  }
  // Retrieve the sum of the distinct values of a given column.
  sumDistinct(e, t) {
    return this._aggregate("sum", e, { ...t, distinct: !0 });
  }
  // Retrieve the vg of the distinct results of the query.
  avgDistinct(e, t) {
    return this._aggregate("avg", e, { ...t, distinct: !0 });
  }
  // Increments a column's value by the specified amount.
  increment(e, t = 1) {
    if (me(e)) {
      for (const n in e)
        this._counter(n, e[n]);
      return this;
    }
    return this._counter(e, t);
  }
  // Decrements a column's value by the specified amount.
  decrement(e, t = 1) {
    if (me(e)) {
      for (const n in e)
        this._counter(n, -e[n]);
      return this;
    }
    return this._counter(e, -t);
  }
  // Clears increments/decrements
  clearCounters() {
    return this._single.counter = {}, this;
  }
  // Sets the values for a `select` query, informing that only the first
  // row should be returned (limit 1).
  first(...e) {
    if (this._method && this._method !== "select")
      throw new Error(`Cannot chain .first() on "${this._method}" query`);
    return this.select(_t(...e)), this._method = "first", this.limit(1), this;
  }
  // Use existing connection to execute the query
  // Same value that client.acquireConnection() for an according client returns should be passed
  connection(e) {
    return this._connection = e, this.client.processPassedConnection(e), this;
  }
  // Pluck a column from a query.
  pluck(e) {
    if (this._method && this._method !== "select")
      throw new Error(`Cannot chain .pluck() on "${this._method}" query`);
    return this._method = "pluck", this._single.pluck = e, this._statements.push({
      grouping: "columns",
      type: "pluck",
      value: e
    }), this;
  }
  // Deprecated. Remove everything from select clause
  clearSelect() {
    return this._clearGrouping("columns"), this;
  }
  // Deprecated. Remove everything from where clause
  clearWhere() {
    return this._clearGrouping("where"), this;
  }
  // Deprecated. Remove everything from group clause
  clearGroup() {
    return this._clearGrouping("group"), this;
  }
  // Deprecated. Remove everything from order clause
  clearOrder() {
    return this._clearGrouping("order"), this;
  }
  // Deprecated. Remove everything from having clause
  clearHaving() {
    return this._clearGrouping("having"), this;
  }
  // Remove everything from statement clause
  clear(e) {
    if (!pN.has(e))
      throw new Error(`Knex Error: unknown statement '${e}'`);
    return e.startsWith("counter") ? this.clearCounters() : (e === "select" && (e = "columns"), this._clearGrouping(e), this);
  }
  // Insert & Update
  // ------
  // Sets the values for an `insert` query.
  insert(e, t, n) {
    return this._method = "insert", Ye(t) || this.returning(t, n), this._single.insert = e, this;
  }
  // Sets the values for an `update`, allowing for both
  // `.update(key, value, [returning])` and `.update(obj, [returning])` syntaxes.
  update(e, t, n) {
    let i;
    const a = this._single.update || {};
    if (this._method = "update", Yr(e))
      ra(t) ? a[e] = JSON.stringify(t) : a[e] = t, arguments.length > 2 && (i = arguments[2]);
    else {
      const o = Object.keys(e);
      this._single.update && this.client.logger.warn("Update called multiple times with objects.");
      let s = -1;
      for (; ++s < o.length; )
        a[o[s]] = e[o[s]];
      i = arguments[1];
    }
    return Ye(i) || this.returning(i, n), this._single.update = a, this;
  }
  // Sets the returning value for the query.
  returning(e, t) {
    return this._single.returning = e, this._single.options = t, this;
  }
  onConflict(e) {
    return typeof e == "string" && (e = [e]), new gN(this, e || !0);
  }
  // Delete
  // ------
  // Executes a delete statement on the query;
  delete(e, t) {
    return this._method = "del", Ye(e) || this.returning(e, t), this;
  }
  // Truncates a table, ends the query chain.
  truncate(e) {
    return this._method = "truncate", e && (this._single.table = e), this;
  }
  // Retrieves columns for the table specified by `knex(tableName)`
  columnInfo(e) {
    return this._method = "columnInfo", this._single.columnInfo = e, this;
  }
  // Set a lock for update constraint.
  forUpdate(...e) {
    return this._single.lock = Ce.forUpdate, e.length === 1 && Array.isArray(e[0]) ? this._single.lockTables = e[0] : this._single.lockTables = e, this;
  }
  // Set a lock for share constraint.
  forShare(...e) {
    return this._single.lock = Ce.forShare, this._single.lockTables = e, this;
  }
  // Set a lock for no key update constraint.
  forNoKeyUpdate(...e) {
    return this._single.lock = Ce.forNoKeyUpdate, this._single.lockTables = e, this;
  }
  // Set a lock for key share constraint.
  forKeyShare(...e) {
    return this._single.lock = Ce.forKeyShare, this._single.lockTables = e, this;
  }
  // Skips locked rows when using a lock constraint.
  skipLocked() {
    if (!this._isSelectQuery())
      throw new Error(`Cannot chain .skipLocked() on "${this._method}" query!`);
    if (!this._hasLockMode())
      throw new Error(
        ".skipLocked() can only be used after a call to .forShare() or .forUpdate()!"
      );
    if (this._single.waitMode === Vt.noWait)
      throw new Error(".skipLocked() cannot be used together with .noWait()!");
    return this._single.waitMode = Vt.skipLocked, this;
  }
  // Causes error when acessing a locked row instead of waiting for it to be released.
  noWait() {
    if (!this._isSelectQuery())
      throw new Error(`Cannot chain .noWait() on "${this._method}" query!`);
    if (!this._hasLockMode())
      throw new Error(
        ".noWait() can only be used after a call to .forShare() or .forUpdate()!"
      );
    if (this._single.waitMode === Vt.skipLocked)
      throw new Error(".noWait() cannot be used together with .skipLocked()!");
    return this._single.waitMode = Vt.noWait, this;
  }
  // Takes a JS object of methods to call and calls them
  fromJS(e) {
    return nN(e, (t, n) => {
      typeof this[n] != "function" && this.client.logger.warn(`Knex Error: unknown key ${n}`), Array.isArray(t) ? this[n].apply(this, t) : this[n](t);
    }), this;
  }
  fromRaw(e, t) {
    const n = e.isRawInstance ? e : this.client.raw(e, t);
    return this.from(n);
  }
  // Passes query to provided callback function, useful for e.g. composing
  // domain-specific helpers
  modify(e) {
    return e.apply(this, [this].concat(oN(arguments))), this;
  }
  upsert(e, t, n) {
    throw new Error(
      `Upsert is not yet supported for dialect ${this.client.dialect}`
    );
  }
  // JSON support functions
  _json(e, t) {
    return this._statements.push({
      grouping: "columns",
      type: "json",
      method: e,
      params: t
    }), this;
  }
  jsonExtract() {
    const e = arguments[0];
    let t, n, i = !0;
    return arguments.length >= 2 && (t = arguments[1]), arguments.length >= 3 && (n = arguments[2]), arguments.length === 4 && (i = arguments[3]), arguments.length === 2 && Array.isArray(arguments[0]) && wt(arguments[1]) && (i = arguments[1]), this._json("jsonExtract", {
      column: e,
      path: t,
      alias: n,
      singleValue: i
      // boolean used only in MSSQL to use function for extract value instead of object/array.
    });
  }
  jsonSet(e, t, n, i) {
    return this._json("jsonSet", {
      column: e,
      path: t,
      value: n,
      alias: i
    });
  }
  jsonInsert(e, t, n, i) {
    return this._json("jsonInsert", {
      column: e,
      path: t,
      value: n,
      alias: i
    });
  }
  jsonRemove(e, t, n) {
    return this._json("jsonRemove", {
      column: e,
      path: t,
      alias: n
    });
  }
  // Wheres for JSON
  _isJsonObject(e) {
    return me(e) && !(e instanceof q);
  }
  _whereJsonWrappedValue(e, t, n) {
    const i = {
      grouping: "where",
      type: e,
      column: t,
      value: n,
      not: this._not(),
      bool: this._bool(),
      asColumn: this._asColumnFlag
    };
    arguments[3] && (i.operator = arguments[3]), arguments[4] && (i.jsonPath = arguments[4]), this._statements.push(i);
  }
  whereJsonObject(e, t) {
    return this._whereJsonWrappedValue("whereJsonObject", e, t), this;
  }
  orWhereJsonObject(e, t) {
    return this._bool("or").whereJsonObject(e, t);
  }
  whereNotJsonObject(e, t) {
    return this._not(!0).whereJsonObject(e, t);
  }
  orWhereNotJsonObject(e, t) {
    return this._bool("or").whereNotJsonObject(e, t);
  }
  whereJsonPath(e, t, n, i) {
    return this._whereJsonWrappedValue("whereJsonPath", e, i, n, t), this;
  }
  orWhereJsonPath(e, t, n, i) {
    return this._bool("or").whereJsonPath(e, t, n, i);
  }
  // Json superset wheres
  whereJsonSupersetOf(e, t) {
    return this._whereJsonWrappedValue("whereJsonSupersetOf", e, t), this;
  }
  whereJsonNotSupersetOf(e, t) {
    return this._not(!0).whereJsonSupersetOf(e, t);
  }
  orWhereJsonSupersetOf(e, t) {
    return this._bool("or").whereJsonSupersetOf(e, t);
  }
  orWhereJsonNotSupersetOf(e, t) {
    return this._bool("or").whereJsonNotSupersetOf(e, t);
  }
  // Json subset wheres
  whereJsonSubsetOf(e, t) {
    return this._whereJsonWrappedValue("whereJsonSubsetOf", e, t), this;
  }
  whereJsonNotSubsetOf(e, t) {
    return this._not(!0).whereJsonSubsetOf(e, t);
  }
  orWhereJsonSubsetOf(e, t) {
    return this._bool("or").whereJsonSubsetOf(e, t);
  }
  orWhereJsonNotSubsetOf(e, t) {
    return this._bool("or").whereJsonNotSubsetOf(e, t);
  }
  whereJsonHasNone(e, t) {
    return this._not(!0).whereJsonHasAll(e, t), this;
  }
  // end of wheres for JSON
  _analytic(e, t, n) {
    let i;
    const { schema: a } = this._single, o = this._analyticMethod();
    if (e = typeof e == "string" ? e : null, Ge(
      typeof t == "function" || t.isRawInstance || Array.isArray(t) || typeof t == "string" || typeof t == "object",
      `The second argument to an analytic function must be either a function, a raw,
       an array of string or object, an object or a single string.`
    ), n && Ge(
      Array.isArray(n) || typeof n == "string" || typeof n == "object",
      "The third argument to an analytic function must be either a string, an array of string or object or an object."
    ), hN(t))
      i = new lN(o, a, e), t.call(i, i);
    else if (t.isRawInstance)
      i = {
        grouping: "columns",
        type: "analytic",
        method: o,
        raw: t,
        alias: e
      };
    else {
      const s = Array.isArray(t) ? t : [t];
      let l = n || [];
      l = Array.isArray(l) ? l : [l], i = {
        grouping: "columns",
        type: "analytic",
        method: o,
        order: s,
        alias: e,
        partitions: l
      };
    }
    return this._statements.push(i), this;
  }
  rank(...e) {
    return this._analyticMethod("rank")._analytic(...e);
  }
  denseRank(...e) {
    return this._analyticMethod("dense_rank")._analytic(...e);
  }
  rowNumber(...e) {
    return this._analyticMethod("row_number")._analytic(...e);
  }
  // ----------------------------------------------------------------------
  // Helper for the incrementing/decrementing queries.
  _counter(e, t) {
    return t = parseFloat(t), this._method = "update", this._single.counter = this._single.counter || {}, this._single.counter[e] = t, this;
  }
  // Helper to get or set the "boolFlag" value.
  _bool(e) {
    if (arguments.length === 1)
      return this._boolFlag = e, this;
    const t = this._boolFlag;
    return this._boolFlag = "and", t;
  }
  // Helper to get or set the "notFlag" value.
  _not(e) {
    if (arguments.length === 1)
      return this._notFlag = e, this;
    const t = this._notFlag;
    return this._notFlag = !1, t;
  }
  // Helper to get or set the "joinFlag" value.
  _joinType(e) {
    if (arguments.length === 1)
      return this._joinFlag = e, this;
    const t = this._joinFlag || "inner";
    return this._joinFlag = "inner", t;
  }
  _analyticMethod(e) {
    return arguments.length === 1 ? (this._analyticFlag = e, this) : this._analyticFlag || "row_number";
  }
  // Helper for compiling any aggregate queries.
  _aggregate(e, t, n = {}) {
    return this._statements.push({
      grouping: "columns",
      type: t.isRawInstance ? "aggregateRaw" : "aggregate",
      method: e,
      value: t,
      aggregateDistinct: n.distinct || !1,
      alias: n.as
    }), this;
  }
  // Helper function for clearing or reseting a grouping type from the builder
  _clearGrouping(e) {
    e in this._single ? this._single[e] = void 0 : this._statements = sN(this._statements, { grouping: e });
  }
  // Helper function that checks if the builder will emit a select query
  _isSelectQuery() {
    return fN.has(this._method);
  }
  // Helper function that checks if the query has a lock mode set
  _hasLockMode() {
    return mN.has(this._single.lock);
  }
}
q.prototype.select = q.prototype.columns;
q.prototype.column = q.prototype.columns;
q.prototype.andWhereNot = q.prototype.whereNot;
q.prototype.andWhereNotColumn = q.prototype.whereNotColumn;
q.prototype.andWhere = q.prototype.where;
q.prototype.andWhereColumn = q.prototype.whereColumn;
q.prototype.andWhereRaw = q.prototype.whereRaw;
q.prototype.andWhereBetween = q.prototype.whereBetween;
q.prototype.andWhereNotBetween = q.prototype.whereNotBetween;
q.prototype.andWhereJsonObject = q.prototype.whereJsonObject;
q.prototype.andWhereNotJsonObject = q.prototype.whereJsonObject;
q.prototype.andWhereJsonPath = q.prototype.whereJsonPath;
q.prototype.andWhereLike = q.prototype.whereLike;
q.prototype.andWhereILike = q.prototype.whereILike;
q.prototype.andHaving = q.prototype.having;
q.prototype.andHavingIn = q.prototype.havingIn;
q.prototype.andHavingNotIn = q.prototype.havingNotIn;
q.prototype.andHavingNull = q.prototype.havingNull;
q.prototype.andHavingNotNull = q.prototype.havingNotNull;
q.prototype.andHavingExists = q.prototype.havingExists;
q.prototype.andHavingNotExists = q.prototype.havingNotExists;
q.prototype.andHavingBetween = q.prototype.havingBetween;
q.prototype.andHavingNotBetween = q.prototype.havingNotBetween;
q.prototype.from = q.prototype.table;
q.prototype.into = q.prototype.table;
q.prototype.del = q.prototype.delete;
dN(q);
aN(q);
q.extend = (r, e) => {
  if (Object.prototype.hasOwnProperty.call(q.prototype, r))
    throw new Error(
      `Can't extend QueryBuilder with existing method ('${r}').`
    );
  rN(q.prototype, { [r]: e });
};
class gN {
  constructor(e, t) {
    this.builder = e, this._columns = t;
  }
  // Sets insert query to ignore conflicts
  ignore() {
    return this.builder._single.onConflict = this._columns, this.builder._single.ignore = !0, this.builder;
  }
  // Sets insert query to update on conflict
  merge(e) {
    return this.builder._single.onConflict = this._columns, this.builder._single.merge = { updates: e }, this.builder;
  }
  // Prevent
  then() {
    throw new Error(
      "Incomplete onConflict clause. .onConflict() must be directly followed by either .merge() or .ignore()"
    );
  }
}
var Ne = q;
function yN(r, e, t, n) {
  var i = -1, a = r == null ? 0 : r.length;
  for (n && a && (t = r[++i]); ++i < a; )
    t = e(t, r[i], i, r);
  return t;
}
var bN = yN;
function _N(r, e, t, n, i) {
  return i(r, function(a, o, s) {
    t = n ? (n = !1, a) : e(t, a, o, s);
  }), t;
}
var wN = _N, $N = bN, CN = ct, vN = _e, EN = wN, TN = U;
function AN(r, e, t) {
  var n = TN(r) ? $N : EN, i = arguments.length < 3;
  return n(r, vN(e), t, i, CN);
}
var It = AN, ON = us, NN = yu, qN = Ku, RN = _e, SN = dr, xN = U, IN = ot, PN = sr, LN = se, BN = at;
function kN(r, e, t) {
  var n = xN(r), i = n || IN(r) || BN(r);
  if (e = RN(e), t == null) {
    var a = r && r.constructor;
    i ? t = n ? new a() : [] : LN(r) ? t = PN(a) ? NN(SN(r)) : {} : t = {};
  }
  return (i ? ON : qN)(r, function(o, s, l) {
    return e(t, o, s, l);
  }), t;
}
var jN = kN;
const { isObject: MN } = Q;
function QN(r, e, t, n) {
  const i = t.queryBuilder();
  return r.call(i, i), t.queryCompiler(i, n.bindings).toSQL(e || i._method || "select");
}
function DN(r, e, t) {
  const n = e.queryContext();
  return t.wrapIdentifier((r || "").trim(), n);
}
function FN(r, e, t) {
  return r === void 0 ? "" : r === null ? "null" : r && r.isRawInstance ? r.toQuery() : e === "bool" ? (r === "false" && (r = 0), `'${r ? 1 : 0}'`) : (e === "json" || e === "jsonb") && MN(r) ? `'${JSON.stringify(r)}'` : t._escapeBinding(r.toString());
}
var Ue = {
  compileCallback: QN,
  wrapAsIdentifier: DN,
  formatDefault: FN
};
const UN = jN, _c = Ne, { compileCallback: Os, wrapAsIdentifier: er } = Ue, HN = ["asc", "desc"], VN = UN(
  [
    "=",
    "<",
    ">",
    "<=",
    ">=",
    "<>",
    "!=",
    "like",
    "not like",
    "between",
    "not between",
    "ilike",
    "not ilike",
    "exists",
    "not exist",
    "rlike",
    "not rlike",
    "regexp",
    "not regexp",
    "match",
    "&",
    "|",
    "^",
    "<<",
    ">>",
    "~",
    "~=",
    "~*",
    "!~",
    "!~*",
    "#",
    "&&",
    "@>",
    "<@",
    "||",
    "&<",
    "&>",
    "-|-",
    "@@",
    "!!",
    ["?", "\\?"],
    ["?|", "\\?|"],
    ["?&", "\\?&"]
  ],
  (r, e) => {
    Array.isArray(e) ? r[e[0]] = e[1] : r[e] = e;
  },
  {}
);
function WN(r, e, t, n) {
  const i = Array.isArray(r) ? r : [r];
  let a = "", o = -1;
  for (; ++o < i.length; )
    o > 0 && (a += ", "), a += tr(i[o], void 0, e, t, n);
  return a;
}
function tr(r, e, t, n, i) {
  const a = Pt(r, e, t, n, i);
  if (a)
    return a;
  switch (typeof r) {
    case "function":
      return Lt(
        Os(r, void 0, n, i),
        !0,
        t,
        n
      );
    case "object":
      return JN(r, t, n, i);
    case "number":
      return r;
    default:
      return At(r + "", t, n);
  }
}
function Pt(r, e, t, n, i) {
  let a;
  if (r instanceof _c)
    return a = n.queryCompiler(r).toSQL(), a.bindings && i.bindings.push(...a.bindings), Lt(a, e, t, n);
  if (r && r.isRawInstance)
    return r.client = n, t._queryContext && (r.queryContext = () => t._queryContext), a = r.toSQL(), a.bindings && i.bindings.push(...a.bindings), a.sql;
  e && i.bindings.push(r);
}
function zN(r, e, t, n) {
  const i = Pt(r, void 0, e, t, n);
  if (i)
    return i;
  const a = VN[(r || "").toLowerCase()];
  if (!a)
    throw new TypeError(`The operator "${r}" is not permitted`);
  return a;
}
function At(r, e, t) {
  const n = r.toLowerCase().indexOf(" as ");
  if (n !== -1) {
    const s = r.slice(0, n), l = r.slice(n + 4);
    return t.alias(
      At(s, e, t),
      er(l, e, t)
    );
  }
  const i = [];
  let a = -1;
  const o = r.split(".");
  for (; ++a < o.length; )
    r = o[a], a === 0 && o.length > 1 ? i.push(At((r || "").trim(), e, t)) : i.push(er(r, e, t));
  return i.join(".");
}
function JN(r, e, t, n) {
  const i = [];
  for (const a in r) {
    const o = r[a];
    if (typeof o == "function") {
      const s = Os(
        o,
        void 0,
        t,
        n
      );
      s.as = a, i.push(Lt(s, !0, e, t));
    } else
      o instanceof _c ? i.push(
        t.alias(
          `(${tr(o, void 0, e, t, n)})`,
          er(a, e, t)
        )
      ) : i.push(
        t.alias(
          tr(o, void 0, e, t, n),
          er(a, e, t)
        )
      );
  }
  return i.join(", ");
}
function Lt(r, e, t, n) {
  let i = r.sql || "";
  return i && (r.method === "select" || r.method === "first") && (e || r.as) && (i = `(${i})`, r.as) ? n.alias(i, At(r.as, t, n)) : i;
}
function KN(r, e, t, n, i) {
  return typeof r == "function" ? Lt(
    Os(r, e, n, i),
    void 0,
    t,
    n
  ) : Pt(r, void 0, t, n, i) || "";
}
function GN(r, e, t, n) {
  const i = Pt(r, void 0, e, t, n);
  return i || (HN.indexOf((r || "").toLowerCase()) !== -1 ? r : "asc");
}
var J = {
  columnize: WN,
  direction: GN,
  operator: zN,
  outputQuery: Lt,
  rawOrFn: KN,
  unwrapRaw: Pt,
  wrap: tr,
  wrapString: At
};
const { columnize: wc } = J;
function YN(r, e) {
  const t = {
    bindings: []
  }, n = r, i = r.bindings.length, a = r.bindings;
  let o = 0;
  const s = r.sql.replace(/\\?\?\??/g, function(l) {
    if (l === "\\?")
      return l;
    const u = a[o++];
    return l === "??" ? wc(u, n, e, t) : e.parameter(u, n, t);
  });
  if (i !== o)
    throw new Error(`Expected ${i} bindings, saw ${o}`);
  return {
    method: "raw",
    sql: s,
    bindings: t.bindings
  };
}
function XN(r, e) {
  const t = {
    bindings: []
  }, n = r, i = r.bindings, a = /\\?(:(\w+):(?=::)|:(\w+):(?!:)|:(\w+))/g;
  return {
    method: "raw",
    sql: r.sql.replace(a, function(s, l, u, h, c) {
      if (s !== l)
        return l;
      const d = u || h || c, p = s.trim(), g = p[p.length - 1] === ":", _ = i[d];
      return _ === void 0 ? (Object.prototype.hasOwnProperty.call(i, d) && t.bindings.push(_), s) : g ? s.replace(
        l,
        wc(_, n, e, t)
      ) : s.replace(l, e.parameter(_, n, t));
    }),
    bindings: t.bindings
  };
}
var ZN = {
  replaceKeyBindings: XN,
  replaceRawArrBindings: YN
};
const eq = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW", tq = "0123456789";
function rq(r = 21) {
  let e = "", t = r;
  for (; t--; )
    e += eq[Math.random() * 64 | 0];
  return e;
}
function nq(r = 21) {
  let e = "", t = r;
  for (; t--; )
    e += tq[Math.random() * 10 | 0];
  return e;
}
var Ns = { nanoid: rq, nanonum: nq };
const { EventEmitter: iq } = P, sq = ae, oq = Fe, aq = Ae, lq = It, {
  replaceRawArrBindings: uq,
  replaceKeyBindings: cq
} = ZN, Ji = z, hq = Ts, { nanoid: dq } = Ns, { isNumber: fq, isObject: pq } = Q, {
  augmentWithBuilderInterface: mq
} = As, gq = sq("knex:bindings");
let wr = class extends iq {
  constructor(e) {
    super(), this.client = e, this.sql = "", this.bindings = [], this._wrappedBefore = void 0, this._wrappedAfter = void 0, e && e.config && (this._debug = e.config.debug, hq(this, 4));
  }
  set(e, t) {
    return this.sql = e, this.bindings = pq(t) && !t.toSQL || t === void 0 ? t : [t], this;
  }
  timeout(e, { cancel: t } = {}) {
    return fq(e) && e > 0 && (this._timeout = e, t && (this.client.assertCanCancelQuery(), this._cancelOnTimeout = !0)), this;
  }
  // Wraps the current sql with `before` and `after`.
  wrap(e, t) {
    return this._wrappedBefore = e, this._wrappedAfter = t, this;
  }
  // Calls `toString` on the Knex object.
  toString() {
    return this.toQuery();
  }
  // Returns the raw sql for the query.
  toSQL(e, t) {
    let n;
    if (Array.isArray(this.bindings) ? n = uq(this, this.client) : this.bindings && aq(this.bindings) ? n = cq(this, this.client) : n = {
      method: "raw",
      sql: this.sql,
      bindings: this.bindings === void 0 ? [] : [this.bindings]
    }, this._wrappedBefore && (n.sql = this._wrappedBefore + n.sql), this._wrappedAfter && (n.sql = n.sql + this._wrappedAfter), n.options = lq(this._options, oq, {}), this._timeout && (n.timeout = this._timeout, this._cancelOnTimeout && (n.cancelOnTimeout = this._cancelOnTimeout)), n.bindings = n.bindings || [], Ji.containsUndefined(n.bindings)) {
      const i = Ji.getUndefinedIndices(
        this.bindings
      );
      throw gq(n.bindings), new Error(
        `Undefined binding(s) detected for keys [${i}] when compiling RAW query: ${n.sql}`
      );
    }
    return n.__knexQueryUid = dq(), Object.defineProperties(n, {
      toNative: {
        value: () => ({
          sql: this.client.positionBindings(n.sql),
          bindings: this.client.prepBindings(n.bindings)
        }),
        enumerable: !1
      }
    }), n;
  }
};
wr.prototype.isRawInstance = !0;
mq(wr);
Ji.addQueryContext(wr);
var ht = wr;
function yq(r) {
  for (var e = -1, t = r == null ? 0 : r.length, n = 0, i = []; ++e < t; ) {
    var a = r[e];
    a && (i[n++] = a);
  }
  return i;
}
var qs = yq;
function bq(r, e, t, n) {
  for (var i = -1, a = r == null ? 0 : r.length; ++i < a; ) {
    var o = r[i];
    e(n, o, t(o), r);
  }
  return n;
}
var _q = bq, wq = ct;
function $q(r, e, t, n) {
  return wq(r, function(i, a, o) {
    e(n, i, t(i), o);
  }), n;
}
var Cq = $q, vq = _q, Eq = Cq, Tq = _e, Aq = U;
function Oq(r, e) {
  return function(t, n) {
    var i = Aq(t) ? vq : Eq, a = e ? e() : {};
    return i(t, r, Tq(n), a);
  };
}
var Nq = Oq, qq = ur, Rq = Nq, Sq = Object.prototype, xq = Sq.hasOwnProperty, Iq = Rq(function(r, e, t) {
  xq.call(r, t) ? r[t].push(e) : qq(r, t, [e]);
}), $r = Iq, Pq = Object.prototype, Lq = Pq.hasOwnProperty;
function Bq(r, e) {
  return r != null && Lq.call(r, e);
}
var kq = Bq, jq = kq, Mq = ac;
function Qq(r, e) {
  return r != null && Mq(r, e, jq);
}
var Cr = Qq, Dq = ct, Fq = be;
function Uq(r, e) {
  var t = -1, n = Fq(r) ? Array(r.length) : [];
  return Dq(r, function(i, a, o) {
    n[++t] = e(i, a, o);
  }), n;
}
var Hq = Uq, Vq = pr, Wq = _e, zq = Hq, Jq = U;
function Kq(r, e) {
  var t = Jq(r) ? Vq : zq;
  return t(r, Wq(e));
}
var He = Kq, Gq = cr, Yq = br, Xq = hr, ia = se, Zq = St;
function eR(r, e, t, n) {
  if (!ia(r))
    return r;
  e = Yq(e, r);
  for (var i = -1, a = e.length, o = a - 1, s = r; s != null && ++i < a; ) {
    var l = Zq(e[i]), u = t;
    if (l === "__proto__" || l === "constructor" || l === "prototype")
      return r;
    if (i != o) {
      var h = s[l];
      u = n ? n(h, l, s) : void 0, u === void 0 && (u = ia(h) ? h : Xq(e[i + 1]) ? [] : {});
    }
    Gq(s, l, u), s = s[l];
  }
  return r;
}
var tR = eR, rR = vs, nR = tR, iR = br;
function sR(r, e, t) {
  for (var n = -1, i = e.length, a = {}; ++n < i; ) {
    var o = e[n], s = rR(r, o);
    t(s, o) && nR(a, iR(o, r), s);
  }
  return a;
}
var oR = sR, aR = pr, lR = _e, uR = oR, cR = du;
function hR(r, e) {
  if (r == null)
    return {};
  var t = aR(cR(r), function(n) {
    return [n];
  });
  return e = lR(e), uR(r, t, function(n, i) {
    return e(n, i[0]);
  });
}
var dR = hR, fR = _e, pR = lc, mR = dR;
function gR(r, e) {
  return mR(r, pR(fR(e)));
}
var yR = gR;
const bR = z, Xe = ht, Wt = Ne, _R = bc, wR = ae, sa = Fe, $t = qs, $R = $r, CR = Cr, oa = le, aa = He, vR = yR, ER = It, { nanoid: TR } = Ns, { isString: Xr, isUndefined: AR } = Q, {
  columnize: ge,
  direction: la,
  operator: Ct,
  wrap: F,
  unwrapRaw: Ze,
  rawOrFn: $e
} = J, OR = wR("knex:bindings"), NR = [
  "columns",
  "join",
  "where",
  "union",
  "group",
  "having",
  "order",
  "limit",
  "offset",
  "lock",
  "waitMode"
];
let qR = class {
  constructor(e, t, n) {
    this.client = e, this.method = t._method || "select", this.options = t._options, this.single = t._single, this.timeout = t._timeout || !1, this.cancelOnTimeout = t._cancelOnTimeout || !1, this.grouped = $R(t._statements, "grouping"), this.formatter = e.formatter(t), this._emptyInsertValue = "default values", this.first = this.select, this.bindings = n || [], this.formatter.bindings = this.bindings, this.bindingsHolder = this, this.builder = this.formatter.builder;
  }
  // Collapse the builder into a single object
  toSQL(e, t) {
    this._undefinedInWhereClause = !1, this.undefinedBindingsInfo = [], e = e || this.method;
    const n = this[e]() || "", i = {
      method: e,
      options: ER(this.options, sa, {}),
      timeout: this.timeout,
      cancelOnTimeout: this.cancelOnTimeout,
      bindings: this.bindingsHolder.bindings || [],
      __knexQueryUid: TR()
    };
    if (Object.defineProperties(i, {
      toNative: {
        value: () => ({
          sql: this.client.positionBindings(i.sql),
          bindings: this.client.prepBindings(i.bindings)
        }),
        enumerable: !1
      }
    }), Xr(n) ? i.sql = n : sa(i, n), (e === "select" || e === "first") && this.single.as && (i.as = this.single.as), this._undefinedInWhereClause)
      throw OR(i.bindings), new Error(
        `Undefined binding(s) detected when compiling ${e.toUpperCase()}. Undefined column(s): [${this.undefinedBindingsInfo.join(
          ", "
        )}] query: ${i.sql}`
      );
    return i;
  }
  // Compiles the `select` statement, or nested sub-selects by calling each of
  // the component compilers, trimming out the empties, and returning a
  // generated query string.
  select() {
    let e = this.with(), t = "";
    const n = [], i = [];
    NR.forEach((o) => {
      const s = this[o](this);
      switch (o) {
        case "union":
          t = s;
          break;
        case "columns":
        case "join":
        case "where":
          n.push(s);
          break;
        default:
          i.push(s);
          break;
      }
    });
    const a = this.grouped.union && this.grouped.union.map((o) => o.wrap).some((o) => o);
    if (this.onlyUnions()) {
      const o = $t(n.concat(i)).join(
        " "
      );
      e += t + (o ? " " + o : "");
    } else {
      const o = (a ? "(" : "") + $t(n).join(" ") + (a ? ")" : ""), s = $t(i).join(" ");
      e += o + (t ? " " + t : "") + (s && " " + s);
    }
    return e;
  }
  pluck() {
    let e = this.single.pluck;
    return e.indexOf(".") !== -1 && (e = e.split(".").slice(-1)[0]), {
      sql: this.select(),
      pluck: e
    };
  }
  // Compiles an "insert" query, allowing for multiple
  // inserts using a single query statement.
  insert() {
    const e = this.single.insert || [], t = this.with() + `insert into ${this.tableName} `, n = this._insertBody(e);
    return n === "" ? "" : t + n;
  }
  _onConflictClause(e) {
    return e instanceof Xe ? this.formatter.wrap(e) : `(${this.formatter.columnize(e)})`;
  }
  _buildInsertValues(e) {
    let t = "", n = -1;
    for (; ++n < e.values.length; )
      n !== 0 && (t += "), ("), t += this.client.parameterize(
        e.values[n],
        this.client.valueForUndefined,
        this.builder,
        this.bindingsHolder
      );
    return t;
  }
  _insertBody(e) {
    let t = "";
    if (Array.isArray(e)) {
      if (e.length === 0)
        return "";
    } else if (typeof e == "object" && oa(e))
      return t + this._emptyInsertValue;
    const n = this._prepInsert(e);
    return typeof n == "string" ? t += n : n.columns.length ? (t += `(${ge(
      n.columns,
      this.builder,
      this.client,
      this.bindingsHolder
    )}`, t += ") values (" + this._buildInsertValues(n) + ")") : e.length === 1 && e[0] ? t += this._emptyInsertValue : t = "", t;
  }
  // Compiles the "update" query.
  update() {
    const e = this.with(), { tableName: t } = this, n = this._prepUpdate(this.single.update), i = this.where();
    return e + `update ${this.single.only ? "only " : ""}${t} set ` + n.join(", ") + (i ? ` ${i}` : "");
  }
  _hintComments() {
    let e = this.grouped.hintComments || [];
    return e = e.map((t) => $t(t.value).join(" ")), e = $t(e).join(" "), e ? `/*+ ${e} */ ` : "";
  }
  // Compiles the columns in the query, specifying if an item was distinct.
  columns() {
    let e = "";
    if (this.onlyUnions())
      return "";
    const t = this._hintComments(), n = this.grouped.columns || [];
    let i = -1, a = [];
    if (n)
      for (; ++i < n.length; ) {
        const s = n[i];
        if (s.distinct && (e = "distinct "), s.distinctOn) {
          e = this.distinctOn(s.value);
          continue;
        }
        s.type === "aggregate" ? a.push(...this.aggregate(s)) : s.type === "aggregateRaw" ? a.push(this.aggregateRaw(s)) : s.type === "analytic" ? a.push(this.analytic(s)) : s.type === "json" ? a.push(this.json(s)) : s.value && s.value.length > 0 && a.push(
          ge(
            s.value,
            this.builder,
            this.client,
            this.bindingsHolder
          )
        );
      }
    return a.length === 0 && (a = ["*"]), `${this.onlyJson() ? "" : "select "}${t}${e}` + a.join(", ") + (this.tableName ? ` from ${this.single.only ? "only " : ""}${this.tableName}` : "");
  }
  _aggregate(e, { aliasSeparator: t = " as ", distinctParentheses: n } = {}) {
    const i = e.value, a = e.method, o = e.aggregateDistinct ? "distinct " : "", s = (g) => F(
      g,
      void 0,
      this.builder,
      this.client,
      this.bindingsHolder
    ), l = (g, _) => _ ? g + t + s(_) : g, u = (g, _) => {
      let f = g.map(s).join(", ");
      if (o) {
        const y = n ? "(" : " ", w = n ? ")" : "";
        f = o.trim() + y + f + w;
      }
      const m = `${a}(${f})`;
      return l(m, _);
    }, h = (g, _) => {
      const f = `${a}(${o + s(g)})`;
      return l(f, _);
    };
    if (Array.isArray(i))
      return [u(i)];
    if (typeof i == "object") {
      if (e.alias)
        throw new Error("When using an object explicit alias can not be used");
      return Object.entries(i).map(([g, _]) => Array.isArray(_) ? u(_, g) : h(_, g));
    }
    const c = i.toLowerCase().indexOf(" as ");
    let d = i, { alias: p } = e;
    if (c !== -1) {
      if (d = i.slice(0, c), p)
        throw new Error(`Found multiple aliases for same column: ${d}`);
      p = i.slice(c + 4);
    }
    return [h(d, p)];
  }
  aggregate(e) {
    return this._aggregate(e);
  }
  aggregateRaw(e) {
    const t = e.aggregateDistinct ? "distinct " : "";
    return `${e.method}(${t + Ze(
      e.value,
      void 0,
      this.builder,
      this.client,
      this.bindingsHolder
    )})`;
  }
  _joinTable(e) {
    return e.schema && !(e.table instanceof Xe) ? `${e.schema}.${e.table}` : e.table;
  }
  // Compiles all each of the `join` clauses on the query,
  // including any nested join queries.
  join() {
    let e = "", t = -1;
    const n = this.grouped.join;
    if (!n)
      return "";
    for (; ++t < n.length; ) {
      const i = n[t], a = this._joinTable(i);
      if (t > 0 && (e += " "), i.joinType === "raw")
        e += Ze(
          i.table,
          void 0,
          this.builder,
          this.client,
          this.bindingsHolder
        );
      else {
        e += i.joinType + " join " + F(
          a,
          void 0,
          this.builder,
          this.client,
          this.bindingsHolder
        );
        let o = -1;
        for (; ++o < i.clauses.length; ) {
          const s = i.clauses[o];
          o > 0 ? e += ` ${s.bool} ` : e += ` ${s.type === "onUsing" ? "using" : "on"} `;
          const l = this[s.type](s);
          l && (e += l);
        }
      }
    }
    return e;
  }
  onBetween(e) {
    return F(
      e.column,
      void 0,
      this.builder,
      this.client,
      this.bindingsHolder
    ) + " " + this._not(e, "between") + " " + e.value.map(
      (t) => this.client.parameter(t, this.builder, this.bindingsHolder)
    ).join(" and ");
  }
  onNull(e) {
    return F(
      e.column,
      void 0,
      this.builder,
      this.client,
      this.bindingsHolder
    ) + " is " + this._not(e, "null");
  }
  onExists(e) {
    return this._not(e, "exists") + " (" + $e(
      e.value,
      void 0,
      this.builder,
      this.client,
      this.bindingsHolder
    ) + ")";
  }
  onIn(e) {
    if (Array.isArray(e.column))
      return this.multiOnIn(e);
    let t;
    return e.value instanceof Xe ? t = this.client.parameter(
      e.value,
      this.builder,
      this.formatter
    ) : t = this.client.parameterize(
      e.value,
      void 0,
      this.builder,
      this.bindingsHolder
    ), F(
      e.column,
      void 0,
      this.builder,
      this.client,
      this.bindingsHolder
    ) + " " + this._not(e, "in ") + this.wrap(t);
  }
  multiOnIn(e) {
    let t = -1, n = `(${ge(
      e.column,
      this.builder,
      this.client,
      this.bindingsHolder
    )}) `;
    for (n += this._not(e, "in ") + "(("; ++t < e.value.length; )
      t !== 0 && (n += "),("), n += this.client.parameterize(
        e.value[t],
        void 0,
        this.builder,
        this.bindingsHolder
      );
    return n + "))";
  }
  // Compiles all `where` statements on the query.
  where() {
    const e = this.grouped.where;
    if (!e)
      return;
    const t = [];
    let n = -1;
    for (; ++n < e.length; ) {
      const i = e[n];
      Object.prototype.hasOwnProperty.call(i, "value") && bR.containsUndefined(i.value) && (this.undefinedBindingsInfo.push(i.column), this._undefinedInWhereClause = !0);
      const a = this[i.type](i);
      a && (t.length === 0 ? t[0] = "where" : t.push(i.bool), t.push(a));
    }
    return t.length > 1 ? t.join(" ") : "";
  }
  group() {
    return this._groupsOrders("group");
  }
  order() {
    return this._groupsOrders("order");
  }
  // Compiles the `having` statements.
  having() {
    const e = this.grouped.having;
    if (!e)
      return "";
    const t = ["having"];
    for (let n = 0, i = e.length; n < i; n++) {
      const a = e[n], o = this[a.type](a);
      o && (t.length === 0 && (t[0] = "where"), (t.length > 1 || t.length === 1 && t[0] !== "having") && t.push(a.bool), t.push(o));
    }
    return t.length > 1 ? t.join(" ") : "";
  }
  havingRaw(e) {
    return this._not(e, "") + Ze(
      e.value,
      void 0,
      this.builder,
      this.client,
      this.bindingsHolder
    );
  }
  havingWrapped(e) {
    const t = $e(
      e.value,
      "where",
      this.builder,
      this.client,
      this.bindingsHolder
    );
    return t && this._not(e, "") + "(" + t.slice(6) + ")" || "";
  }
  havingBasic(e) {
    return this._not(e, "") + F(
      e.column,
      void 0,
      this.builder,
      this.client,
      this.bindingsHolder
    ) + " " + Ct(
      e.operator,
      this.builder,
      this.client,
      this.bindingsHolder
    ) + " " + this.client.parameter(e.value, this.builder, this.bindingsHolder);
  }
  havingNull(e) {
    return F(
      e.column,
      void 0,
      this.builder,
      this.client,
      this.bindingsHolder
    ) + " is " + this._not(e, "null");
  }
  havingExists(e) {
    return this._not(e, "exists") + " (" + $e(
      e.value,
      void 0,
      this.builder,
      this.client,
      this.bindingsHolder
    ) + ")";
  }
  havingBetween(e) {
    return F(
      e.column,
      void 0,
      this.builder,
      this.client,
      this.bindingsHolder
    ) + " " + this._not(e, "between") + " " + e.value.map(
      (t) => this.client.parameter(t, this.builder, this.bindingsHolder)
    ).join(" and ");
  }
  havingIn(e) {
    return Array.isArray(e.column) ? this.multiHavingIn(e) : F(
      e.column,
      void 0,
      this.builder,
      this.client,
      this.bindingsHolder
    ) + " " + this._not(e, "in ") + this.wrap(
      this.client.parameterize(
        e.value,
        void 0,
        this.builder,
        this.bindingsHolder
      )
    );
  }
  multiHavingIn(e) {
    return this.multiOnIn(e);
  }
  // Compile the "union" queries attached to the main query.
  union() {
    const e = this.onlyUnions(), t = this.grouped.union;
    if (!t)
      return "";
    let n = "";
    for (let i = 0, a = t.length; i < a; i++) {
      const o = t[i];
      i > 0 && (n += " "), (i > 0 || !e) && (n += o.clause + " ");
      const s = $e(
        o.value,
        void 0,
        this.builder,
        this.client,
        this.bindingsHolder
      );
      if (s) {
        const l = o.wrap;
        l && (n += "("), n += s, l && (n += ")");
      }
    }
    return n;
  }
  // If we haven't specified any columns or a `tableName`, we're assuming this
  // is only being used for unions.
  onlyUnions() {
    return (!this.grouped.columns || !!this.grouped.columns[0].value) && this.grouped.union && !this.tableName;
  }
  _getValueOrParameterFromAttribute(e, t) {
    return this.single.skipBinding[e] === !0 ? t ?? this.single[e] : this.client.parameter(
      this.single[e],
      this.builder,
      this.bindingsHolder
    );
  }
  onlyJson() {
    return !this.tableName && this.grouped.columns && this.grouped.columns.length === 1 && this.grouped.columns[0].type === "json";
  }
  limit() {
    return !this.single.limit && this.single.limit !== 0 ? "" : `limit ${this._getValueOrParameterFromAttribute("limit")}`;
  }
  offset() {
    return this.single.offset ? `offset ${this._getValueOrParameterFromAttribute("offset")}` : "";
  }
  // Compiles a `delete` query.
  del() {
    const { tableName: e } = this, t = this.with(), n = this.where(), i = this.join(), a = i ? e + " " : "";
    return t + `delete ${a}from ${this.single.only ? "only " : ""}${e}` + (i ? ` ${i}` : "") + (n ? ` ${n}` : "");
  }
  // Compiles a `truncate` query.
  truncate() {
    return `truncate ${this.tableName}`;
  }
  // Compiles the "locks".
  lock() {
    if (this.single.lock)
      return this[this.single.lock]();
  }
  // Compiles the wait mode on the locks.
  waitMode() {
    if (this.single.waitMode)
      return this[this.single.waitMode]();
  }
  // Fail on unsupported databases
  skipLocked() {
    throw new Error(
      ".skipLocked() is currently only supported on MySQL 8.0+ and PostgreSQL 9.5+"
    );
  }
  // Fail on unsupported databases
  noWait() {
    throw new Error(
      ".noWait() is currently only supported on MySQL 8.0+, MariaDB 10.3.0+ and PostgreSQL 9.5+"
    );
  }
  distinctOn(e) {
    throw new Error(".distinctOn() is currently only supported on PostgreSQL");
  }
  // On Clause
  // ------
  onWrapped(e) {
    const t = this, n = new _R();
    e.value.call(n, n);
    let i = "";
    for (let a = 0; a < n.clauses.length; a++) {
      const o = n.clauses[a];
      a > 0 && (i += ` ${o.bool} `);
      const s = t[o.type](o);
      s && (i += s);
    }
    return i.length ? `(${i})` : "";
  }
  onBasic(e) {
    const t = e.value instanceof Wt;
    return F(
      e.column,
      void 0,
      this.builder,
      this.client,
      this.bindingsHolder
    ) + " " + Ct(
      e.operator,
      this.builder,
      this.client,
      this.bindingsHolder
    ) + " " + (t ? "(" : "") + F(
      e.value,
      void 0,
      this.builder,
      this.client,
      this.bindingsHolder
    ) + (t ? ")" : "");
  }
  onVal(e) {
    return F(
      e.column,
      void 0,
      this.builder,
      this.client,
      this.bindingsHolder
    ) + " " + Ct(
      e.operator,
      this.builder,
      this.client,
      this.bindingsHolder
    ) + " " + this.client.parameter(e.value, this.builder, this.bindingsHolder);
  }
  onRaw(e) {
    return Ze(
      e.value,
      void 0,
      this.builder,
      this.client,
      this.bindingsHolder
    );
  }
  onUsing(e) {
    return "(" + ge(
      e.column,
      this.builder,
      this.client,
      this.bindingsHolder
    ) + ")";
  }
  // Where Clause
  // ------
  _valueClause(e) {
    return e.asColumn ? F(
      e.value,
      void 0,
      this.builder,
      this.client,
      this.bindingsHolder
    ) : this.client.parameter(
      e.value,
      this.builder,
      this.bindingsHolder
    );
  }
  _columnClause(e) {
    let t;
    return Array.isArray(e.column) ? t = `(${ge(
      e.column,
      this.builder,
      this.client,
      this.bindingsHolder
    )})` : t = F(
      e.column,
      void 0,
      this.builder,
      this.client,
      this.bindingsHolder
    ), t;
  }
  whereIn(e) {
    const t = this.client.values(
      e.value,
      this.builder,
      this.bindingsHolder
    );
    return `${this._columnClause(e)} ${this._not(
      e,
      "in "
    )}${t}`;
  }
  whereLike(e) {
    return `${this._columnClause(e)} ${this._not(
      e,
      "like "
    )}${this._valueClause(e)}`;
  }
  whereILike(e) {
    return `${this._columnClause(e)} ${this._not(
      e,
      "ilike "
    )}${this._valueClause(e)}`;
  }
  whereNull(e) {
    return F(
      e.column,
      void 0,
      this.builder,
      this.client,
      this.bindingsHolder
    ) + " is " + this._not(e, "null");
  }
  // Compiles a basic "where" clause.
  whereBasic(e) {
    return this._not(e, "") + F(
      e.column,
      void 0,
      this.builder,
      this.client,
      this.bindingsHolder
    ) + " " + Ct(
      e.operator,
      this.builder,
      this.client,
      this.bindingsHolder
    ) + " " + this._valueClause(e);
  }
  whereExists(e) {
    return this._not(e, "exists") + " (" + $e(
      e.value,
      void 0,
      this.builder,
      this.client,
      this.bindingsHolder
    ) + ")";
  }
  whereWrapped(e) {
    const t = $e(
      e.value,
      "where",
      this.builder,
      this.client,
      this.bindingsHolder
    );
    return t && this._not(e, "") + "(" + t.slice(6) + ")" || "";
  }
  whereBetween(e) {
    return F(
      e.column,
      void 0,
      this.builder,
      this.client,
      this.bindingsHolder
    ) + " " + this._not(e, "between") + " " + e.value.map(
      (t) => this.client.parameter(t, this.builder, this.bindingsHolder)
    ).join(" and ");
  }
  // Compiles a "whereRaw" query.
  whereRaw(e) {
    return this._not(e, "") + Ze(
      e.value,
      void 0,
      this.builder,
      this.client,
      this.bindingsHolder
    );
  }
  _jsonWrapValue(e) {
    if (!this.builder._isJsonObject(e))
      try {
        return JSON.stringify(JSON.parse(e.replace(/\n|\t/g, "")));
      } catch {
        return e;
      }
    return JSON.stringify(e);
  }
  _jsonValueClause(e) {
    return e.value = this._jsonWrapValue(e.value), this._valueClause(e);
  }
  whereJsonObject(e) {
    return `${this._columnClause(e)} ${e.not ? "!=" : "="} ${this._jsonValueClause(e)}`;
  }
  wrap(e) {
    return e.charAt(0) !== "(" ? `(${e})` : e;
  }
  json(e) {
    return this[e.method](e.params);
  }
  analytic(e) {
    let t = "";
    const n = this;
    return t += e.method + "() over (", e.raw ? t += e.raw : (e.partitions.length && (t += "partition by ", t += aa(e.partitions, function(i) {
      return Xr(i) ? n.formatter.columnize(i) : n.formatter.columnize(i.column) + (i.order ? " " + i.order : "");
    }).join(", ") + " "), t += "order by ", t += aa(e.order, function(i) {
      return Xr(i) ? n.formatter.columnize(i) : n.formatter.columnize(i.column) + (i.order ? " " + i.order : "");
    }).join(", ")), t += ")", e.alias && (t += " as " + e.alias), t;
  }
  // Compiles all `with` statements on the query.
  with() {
    if (!this.grouped.with || !this.grouped.with.length)
      return "";
    const e = this.grouped.with;
    if (!e)
      return;
    const t = [];
    let n = -1, i = !1;
    for (; ++n < e.length; ) {
      const a = e[n];
      a.recursive && (i = !0);
      const o = this[a.type](a);
      t.push(o);
    }
    return `with ${i ? "recursive " : ""}${t.join(", ")} `;
  }
  withWrapped(e) {
    const t = $e(
      e.value,
      void 0,
      this.builder,
      this.client,
      this.bindingsHolder
    ), n = e.columnList ? "(" + ge(
      e.columnList,
      this.builder,
      this.client,
      this.bindingsHolder
    ) + ")" : "", i = e.materialized === void 0 ? "" : e.materialized ? "materialized " : "not materialized ";
    return t && ge(
      e.alias,
      this.builder,
      this.client,
      this.bindingsHolder
    ) + n + " as " + i + "(" + t + ")" || "";
  }
  // Determines whether to add a "not" prefix to the where clause.
  _not(e, t) {
    return e.not ? `not ${t}` : t;
  }
  _prepInsert(e) {
    const t = $e(
      e,
      void 0,
      this.builder,
      this.client,
      this.bindingsHolder
    );
    if (t)
      return t;
    let n = [];
    const i = [];
    Array.isArray(e) || (e = e ? [e] : []);
    let a = -1;
    for (; ++a < e.length && e[a] != null; ) {
      a === 0 && (n = Object.keys(e[a]).sort());
      const o = new Array(n.length), s = Object.keys(e[a]);
      let l = -1;
      for (; ++l < s.length; ) {
        const u = s[l];
        let h = n.indexOf(u);
        if (h === -1) {
          n = n.concat(u).sort(), h = n.indexOf(u);
          let c = -1;
          for (; ++c < i.length; )
            i[c].splice(h, 0, void 0);
          o.splice(h, 0, void 0);
        }
        o[h] = e[a][u];
      }
      i.push(o);
    }
    return {
      columns: n,
      values: i
    };
  }
  // "Preps" the update.
  _prepUpdate(e = {}) {
    const { counter: t = {} } = this.single;
    for (const o of Object.keys(t)) {
      if (CR(e, o)) {
        this.client.logger.warn(
          "increment/decrement called for a column that has already been specified in main .update() call. Ignoring increment/decrement and using value from .update() call."
        );
        continue;
      }
      let s = t[o];
      const l = s < 0 ? "-" : "+";
      l === "-" && (s = -s), e[o] = this.client.raw(`?? ${l} ?`, [o, s]);
    }
    e = vR(e, AR);
    const n = [], i = Object.keys(e);
    let a = -1;
    for (; ++a < i.length; )
      n.push(
        F(
          i[a],
          void 0,
          this.builder,
          this.client,
          this.bindingsHolder
        ) + " = " + this.client.parameter(
          e[i[a]],
          this.builder,
          this.bindingsHolder
        )
      );
    if (oa(n))
      throw new Error(
        [
          "Empty .update() call detected!",
          "Update data does not contain any values to update.",
          "This will result in a faulty query.",
          this.single.table ? `Table: ${this.single.table}.` : "",
          this.single.update ? `Columns: ${Object.keys(this.single.update)}.` : ""
        ].join(" ")
      );
    return n;
  }
  _formatGroupsItemValue(e, t) {
    const { formatter: n } = this;
    let i = "";
    t === "last" ? i = " is null" : t === "first" && (i = " is not null");
    let a;
    return e instanceof Xe ? a = Ze(
      e,
      void 0,
      this.builder,
      this.client,
      this.bindingsHolder
    ) : e instanceof Wt || t ? a = "(" + n.columnize(e) + i + ")" : a = n.columnize(e), a;
  }
  _basicGroupOrder(e, t) {
    const n = this._formatGroupsItemValue(e.value, e.nulls), i = t === "order" && e.type !== "orderByRaw" ? ` ${la(
      e.direction,
      this.builder,
      this.client,
      this.bindingsHolder
    )}` : "";
    return n + i;
  }
  _groupOrder(e, t) {
    return this._basicGroupOrder(e, t);
  }
  _groupOrderNulls(e, t) {
    const n = this._formatGroupsItemValue(e.value), i = t === "order" && e.type !== "orderByRaw" ? ` ${la(
      e.direction,
      this.builder,
      this.client,
      this.bindingsHolder
    )}` : "";
    return e.nulls && !(e.value instanceof Xe) ? `${n}${i || ""} nulls ${e.nulls}` : n + i;
  }
  // Compiles the `order by` statements.
  _groupsOrders(e) {
    const t = this.grouped[e];
    if (!t)
      return "";
    const n = t.map((i) => this._groupOrder(i, e));
    return n.length ? e + " by " + n.join(", ") : "";
  }
  // Get the table name, wrapping it if necessary.
  // Implemented as a property to prevent ordering issues as described in #704.
  get tableName() {
    if (!this._tableName) {
      let e = this.single.table;
      const t = this.single.schema;
      if (e && t) {
        const n = e instanceof Wt, i = e instanceof Xe;
        !n && !i && !(typeof e == "function") && (e = `${t}.${e}`);
      }
      this._tableName = e ? (
        // Wrap subQuery with parenthesis, #3485
        F(
          e,
          e instanceof Wt,
          this.builder,
          this.client,
          this.bindingsHolder
        )
      ) : "";
    }
    return this._tableName;
  }
  _jsonPathWrap(e) {
    return this.client.parameter(
      e.path || e[1],
      this.builder,
      this.bindingsHolder
    );
  }
  // Json common functions
  _jsonExtract(e, t) {
    let n;
    return Array.isArray(t.column) ? n = t.column : n = [t], Array.isArray(e) || (e = [e]), n.map((i) => {
      let a = `${ge(
        i.column || i[0],
        this.builder,
        this.client,
        this.bindingsHolder
      )}, ${this._jsonPathWrap(i)}`;
      e.forEach((s) => {
        a = s + "(" + a + ")";
      });
      const o = i.alias || i[2];
      return o ? this.client.alias(a, this.formatter.wrap(o)) : a;
    }).join(", ");
  }
  _jsonSet(e, t) {
    const n = `${e}(${ge(
      t.column,
      this.builder,
      this.client,
      this.bindingsHolder
    )}, ${this.client.parameter(
      t.path,
      this.builder,
      this.bindingsHolder
    )}, ${this.client.parameter(
      t.value,
      this.builder,
      this.bindingsHolder
    )})`;
    return t.alias ? this.client.alias(n, this.formatter.wrap(t.alias)) : n;
  }
  _whereJsonPath(e, t) {
    return `${e}(${this._columnClause(
      t
    )}, ${this._jsonPathWrap({ path: t.jsonPath })}) ${Ct(
      t.operator,
      this.builder,
      this.client,
      this.bindingsHolder
    )} ${this._jsonValueClause(t)}`;
  }
  _onJsonPathEquals(e, t) {
    return e + "(" + F(
      t.columnFirst,
      void 0,
      this.builder,
      this.client,
      this.bindingsHolder
    ) + ", " + this.client.parameter(
      t.jsonPathFirst,
      this.builder,
      this.bindingsHolder
    ) + ") = " + e + "(" + F(
      t.columnSecond,
      void 0,
      this.builder,
      this.client,
      this.bindingsHolder
    ) + ", " + this.client.parameter(
      t.jsonPathSecond,
      this.builder,
      this.bindingsHolder
    ) + ")";
  }
};
var Ve = qR;
const { EventEmitter: RR } = P, SR = xt, xR = Fe, { addQueryContext: IR } = z, PR = Ts, {
  augmentWithBuilderInterface: LR
} = As;
let Pe = class extends RR {
  constructor(e) {
    super(), this.client = e, this._sequence = [], e.config && (this._debug = e.config.debug, PR(this, 4));
  }
  withSchema(e) {
    return this._schema = e, this;
  }
  toString() {
    return this.toQuery();
  }
  toSQL() {
    return this.client.schemaCompiler(this).toSQL();
  }
  async generateDdlCommands() {
    return await this.client.schemaCompiler(this).generateDdlCommands();
  }
};
[
  "createTable",
  "createTableIfNotExists",
  "createTableLike",
  "createView",
  "createViewOrReplace",
  "createMaterializedView",
  "refreshMaterializedView",
  "dropView",
  "dropViewIfExists",
  "dropMaterializedView",
  "dropMaterializedViewIfExists",
  "createSchema",
  "createSchemaIfNotExists",
  "dropSchema",
  "dropSchemaIfExists",
  "createExtension",
  "createExtensionIfNotExists",
  "dropExtension",
  "dropExtensionIfExists",
  "table",
  "alterTable",
  "view",
  "alterView",
  "hasTable",
  "hasColumn",
  "dropTable",
  "renameTable",
  "renameView",
  "dropTableIfExists",
  "raw"
].forEach(function(r) {
  Pe.prototype[r] = function() {
    return r === "createTableIfNotExists" && this.client.logger.warn(
      [
        "Use async .hasTable to check if table exists and then use plain .createTable. Since ",
        '.createTableIfNotExists actually just generates plain "CREATE TABLE IF NOT EXIST..." ',
        "query it will not work correctly if there are any alter table queries generated for ",
        "columns afterwards. To not break old migrations this function is left untouched for now",
        ", but it should not be used when writing new code and it is removed from documentation."
      ].join("")
    ), r === "table" && (r = "alterTable"), r === "view" && (r = "alterView"), this._sequence.push({
      method: r,
      args: SR(arguments)
    }), this;
  };
});
Pe.extend = (r, e) => {
  if (Object.prototype.hasOwnProperty.call(Pe.prototype, r))
    throw new Error(
      `Can't extend SchemaBuilder with existing method ('${r}').`
    );
  xR(Pe.prototype, { [r]: e });
};
LR(Pe);
IR(Pe);
var $c = Pe;
const BR = _r, { isString: Cc } = Q;
function kR(r) {
  r && (Cc(r) && (r = { sql: r }), r.bindings || (r.bindings = this.bindingsHolder.bindings), this.sequence.push(r), this.formatter = this.client.formatter(this._commonBuilder), this.bindings = [], this.formatter.bindings = this.bindings);
}
function jR(r) {
  const e = new this.constructor(
    this.client,
    this.tableCompiler,
    this.columnBuilder
  );
  r.call(e, BR(arguments)), this.sequence.additional = (this.sequence.additional || []).concat(
    e.sequence
  );
}
function MR(r) {
  r && (Cc(r) && (r = { sql: r }), r.bindings || (r.bindings = this.bindingsHolder.bindings), this.sequence.unshift(r), this.formatter = this.client.formatter(this._commonBuilder), this.bindings = [], this.formatter.bindings = this.bindings);
}
var vr = {
  pushAdditional: jR,
  pushQuery: kR,
  unshiftQuery: MR
};
const {
  pushQuery: QR,
  pushAdditional: DR,
  unshiftQuery: FR
} = vr;
let Y = class {
  constructor(e, t) {
    this.builder = t, this._commonBuilder = this.builder, this.client = e, this.schema = t._schema, this.bindings = [], this.bindingsHolder = this, this.formatter = e.formatter(t), this.formatter.bindings = this.bindings, this.sequence = [];
  }
  createSchema() {
    zt("createSchema");
  }
  createSchemaIfNotExists() {
    zt("createSchemaIfNotExists");
  }
  dropSchema() {
    zt("dropSchema");
  }
  dropSchemaIfExists() {
    zt("dropSchemaIfExists");
  }
  dropTable(e) {
    this.pushQuery(
      this.dropTablePrefix + this.formatter.wrap(Zr(this.schema, e))
    );
  }
  dropTableIfExists(e) {
    this.pushQuery(
      this.dropTablePrefix + "if exists " + this.formatter.wrap(Zr(this.schema, e))
    );
  }
  dropView(e) {
    this._dropView(e, !1, !1);
  }
  dropViewIfExists(e) {
    this._dropView(e, !0, !1);
  }
  dropMaterializedView(e) {
    throw new Error("materialized views are not supported by this dialect.");
  }
  dropMaterializedViewIfExists(e) {
    throw new Error("materialized views are not supported by this dialect.");
  }
  renameView(e, t) {
    throw new Error(
      "rename view is not supported by this dialect (instead drop then create another view)."
    );
  }
  refreshMaterializedView() {
    throw new Error("materialized views are not supported by this dialect.");
  }
  _dropView(e, t, n) {
    this.pushQuery(
      (n ? this.dropMaterializedViewPrefix : this.dropViewPrefix) + (t ? "if exists " : "") + this.formatter.wrap(Zr(this.schema, e))
    );
  }
  raw(e, t) {
    this.sequence.push(this.client.raw(e, t).toSQL());
  }
  toSQL() {
    const e = this.builder._sequence;
    for (let t = 0, n = e.length; t < n; t++) {
      const i = e[t];
      this[i.method].apply(this, i.args);
    }
    return this.sequence;
  }
  async generateDdlCommands() {
    const e = this.toSQL();
    return {
      pre: [],
      sql: Array.isArray(e) ? e : [e],
      check: null,
      post: []
    };
  }
};
Y.prototype.dropTablePrefix = "drop table ";
Y.prototype.dropViewPrefix = "drop view ";
Y.prototype.dropMaterializedViewPrefix = "drop materialized view ";
Y.prototype.alterViewPrefix = "alter view ";
Y.prototype.alterTable = Er("alter");
Y.prototype.createTable = Er("create");
Y.prototype.createTableIfNotExists = Er("createIfNot");
Y.prototype.createTableLike = Er("createLike");
Y.prototype.createView = Tr("create");
Y.prototype.createViewOrReplace = Tr("createOrReplace");
Y.prototype.createMaterializedView = Tr(
  "createMaterializedView"
);
Y.prototype.alterView = Tr("alter");
Y.prototype.pushQuery = QR;
Y.prototype.pushAdditional = DR;
Y.prototype.unshiftQuery = FR;
function Ki(r) {
  const e = this.builder.queryContext();
  e !== void 0 && r.queryContext() === void 0 && r.queryContext(e), r.setSchema(this.schema);
  const t = r.toSQL();
  for (let n = 0, i = t.length; n < i; n++)
    this.sequence.push(t[n]);
}
function Er(r) {
  return r === "createLike" ? function(e, t, n) {
    const i = this.client.tableBuilder(
      r,
      e,
      t,
      n
    );
    Ki.call(this, i);
  } : function(e, t) {
    const n = this.client.tableBuilder(r, e, null, t);
    Ki.call(this, n);
  };
}
function Tr(r) {
  return function(e, t) {
    const n = this.client.viewBuilder(r, e, t);
    Ki.call(this, n);
  };
}
function Zr(r, e) {
  return r ? `${r}.${e}` : e;
}
function zt(r) {
  throw new Error(
    `${r} is not supported for this dialect (only PostgreSQL supports it currently).`
  );
}
var dt = Y, UR = Me, HR = _s, VR = De, WR = HR(function(r, e) {
  UR(e, VR(e), r);
}), zR = WR, Ar = zR;
const JR = Rt, ua = Ar, KR = Fe, Or = xt, GR = z, { isString: YR, isFunction: XR, isObject: ZR } = Q;
let Ee = class {
  constructor(e, t, n, i, a) {
    if (this.client = e, this._fn = a, this._method = t, this._schemaName = void 0, this._tableName = n, this._tableNameLike = i, this._statements = [], this._single = {}, !i && !XR(this._fn))
      throw new TypeError(
        "A callback function must be supplied to calls against `.createTable` and `.table`"
      );
  }
  setSchema(e) {
    this._schemaName = e;
  }
  // Convert the current tableBuilder object "toSQL"
  // giving us additional methods if we're altering
  // rather than creating the table.
  toSQL() {
    return this._method === "alter" && ua(this, Gi), this._fn && this._fn.call(this, this), this.client.tableCompiler(this).toSQL();
  }
  // The "timestamps" call is really just sets the `created_at` and `updated_at` columns.
  timestamps(e, t, n) {
    ZR(e) && ({ useTimestamps: e, defaultToNow: t, useCamelCase: n } = e);
    const i = e === !0 ? "timestamp" : "datetime", a = this[i](n ? "createdAt" : "created_at"), o = this[i](n ? "updatedAt" : "updated_at");
    if (t === !0) {
      const s = this.client.raw("CURRENT_TIMESTAMP");
      a.notNullable().defaultTo(s), o.notNullable().defaultTo(s);
    }
  }
  // Set the comment value for a table, they're only allowed to be called
  // once per table.
  comment(e) {
    if (typeof e != "string")
      throw new TypeError("Table comment must be string");
    this._single.comment = e;
  }
  // Set a foreign key on the table, calling
  // `table.foreign('column_name').references('column').on('table').onDelete()...
  // Also called from the ColumnBuilder context when chaining.
  foreign(e, t) {
    const n = { column: e, keyName: t };
    this._statements.push({
      grouping: "alterTable",
      method: "foreign",
      args: [n]
    });
    let i = {
      references(a) {
        let o;
        return YR(a) && (o = a.split(".")), !o || o.length === 1 ? (n.references = o ? o[0] : a, {
          on(s) {
            if (typeof s != "string")
              throw new TypeError(
                `Expected tableName to be a string, got: ${typeof s}`
              );
            return n.inTable = s, i;
          },
          inTable() {
            return this.on.apply(this, arguments);
          }
        }) : (n.inTable = o[0], n.references = o[1], i);
      },
      withKeyName(a) {
        return n.keyName = a, i;
      },
      onUpdate(a) {
        return n.onUpdate = a, i;
      },
      onDelete(a) {
        return n.onDelete = a, i;
      },
      deferrable: (a) => {
        if ([
          "mysql",
          "mssql",
          "redshift",
          "mysql2",
          "oracledb"
        ].indexOf(this.client.dialect) !== -1)
          throw new Error(`${this.client.dialect} does not support deferrable`);
        return n.deferrable = a, i;
      },
      _columnBuilder(a) {
        return ua(a, i), i = a, a;
      }
    };
    return i;
  }
  check(e, t, n) {
    return this._statements.push({
      grouping: "checks",
      args: [e, t, n]
    }), this;
  }
};
[
  // Each of the index methods can be called individually, with the
  // column name to be used, e.g. table.unique('column').
  "index",
  "primary",
  "unique",
  // Key specific
  "dropPrimary",
  "dropUnique",
  "dropIndex",
  "dropForeign"
].forEach((r) => {
  Ee.prototype[r] = function() {
    return this._statements.push({
      grouping: "alterTable",
      method: r,
      args: Or(arguments)
    }), this;
  };
});
const eS = {
  mysql: ["engine", "charset", "collate"],
  postgresql: ["inherits"]
};
JR(eS, function(r, e) {
  r.forEach(function(t) {
    Ee.prototype[t] = function(n) {
      if (this.client.dialect !== e)
        throw new Error(
          `Knex only supports ${t} statement with ${e}.`
        );
      if (this._method === "alter")
        throw new Error(
          `Knex does not support altering the ${t} outside of create table, please use knex.raw statement.`
        );
      this._single[t] = n;
    };
  });
});
GR.addQueryContext(Ee);
const tS = [
  // Numeric
  "tinyint",
  "smallint",
  "mediumint",
  "int",
  "bigint",
  "decimal",
  "float",
  "double",
  "real",
  "bit",
  "boolean",
  "serial",
  // Date / Time
  "date",
  "datetime",
  "timestamp",
  "time",
  "year",
  // Geometry
  "geometry",
  "geography",
  "point",
  // String
  "char",
  "varchar",
  "tinytext",
  "tinyText",
  "text",
  "mediumtext",
  "mediumText",
  "longtext",
  "longText",
  "binary",
  "varbinary",
  "tinyblob",
  "tinyBlob",
  "mediumblob",
  "mediumBlob",
  "blob",
  "longblob",
  "longBlob",
  "enum",
  "set",
  // Increments, Aliases, and Additional
  "bool",
  "dateTime",
  "increments",
  "bigincrements",
  "bigIncrements",
  "integer",
  "biginteger",
  "bigInteger",
  "string",
  "json",
  "jsonb",
  "uuid",
  "enu",
  "specificType"
];
tS.forEach((r) => {
  Ee.prototype[r] = function() {
    const e = Or(arguments), t = this.client.columnBuilder(this, r, e);
    return this._statements.push({
      grouping: "columns",
      builder: t
    }), t;
  };
});
const Gi = {
  // Renames the current column `from` the current
  // TODO: this.column(from).rename(to)
  renameColumn(r, e) {
    return this._statements.push({
      grouping: "alterTable",
      method: "renameColumn",
      args: [r, e]
    }), this;
  },
  dropTimestamps() {
    return this.dropColumns(
      arguments[0] === !0 ? ["createdAt", "updatedAt"] : ["created_at", "updated_at"]
    );
  },
  setNullable(r) {
    return this._statements.push({
      grouping: "alterTable",
      method: "setNullable",
      args: [r]
    }), this;
  },
  check(r, e, t) {
    this._statements.push({
      grouping: "alterTable",
      method: "check",
      args: [r, e, t]
    });
  },
  dropChecks() {
    this._statements.push({
      grouping: "alterTable",
      method: "dropChecks",
      args: Or(arguments)
    });
  },
  dropNullable(r) {
    return this._statements.push({
      grouping: "alterTable",
      method: "dropNullable",
      args: [r]
    }), this;
  }
  // TODO: changeType
};
Gi.dropColumn = Gi.dropColumns = function() {
  return this._statements.push({
    grouping: "alterTable",
    method: "dropColumn",
    args: Or(arguments)
  }), this;
};
Ee.extend = (r, e) => {
  if (Object.prototype.hasOwnProperty.call(Ee.prototype, r))
    throw new Error(
      `Can't extend TableBuilder with existing method ('${r}').`
    );
  KR(Ee.prototype, { [r]: e });
};
var vc = Ee;
function rS(r, e, t, n) {
  for (var i = r.length, a = t + (n ? 1 : -1); n ? a-- : ++a < i; )
    if (e(r[a], a, r))
      return a;
  return -1;
}
var nS = rS;
function iS(r) {
  return r !== r;
}
var sS = iS;
function oS(r, e, t) {
  for (var n = t - 1, i = r.length; ++n < i; )
    if (r[n] === e)
      return n;
  return -1;
}
var aS = oS, lS = nS, uS = sS, cS = aS;
function hS(r, e, t) {
  return e === e ? cS(r, e, t) : lS(r, uS, t);
}
var Ec = hS, dS = Ec, fS = ju, pS = Math.max;
function mS(r, e, t) {
  var n = r == null ? 0 : r.length;
  if (!n)
    return -1;
  var i = t == null ? 0 : fS(t);
  return i < 0 && (i = pS(n + i, 0)), dS(r, e, i);
}
var gS = mS;
const {
  pushAdditional: yS,
  pushQuery: bS,
  unshiftQuery: _S
} = vr, wS = z, $S = $r, CS = gS, ca = le, vS = _r, { normalizeArr: ES } = z;
let fe = class {
  constructor(e, t) {
    this.client = e, this.tableBuilder = t, this._commonBuilder = this.tableBuilder, this.method = t._method, this.schemaNameRaw = t._schemaName, this.tableNameRaw = t._tableName, this.tableNameLikeRaw = t._tableNameLike, this.single = t._single, this.grouped = $S(t._statements, "grouping"), this.formatter = e.formatter(t), this.bindings = [], this.formatter.bindings = this.bindings, this.bindingsHolder = this, this.sequence = [], this._formatting = e.config && e.config.formatting, this.checksCount = 0;
  }
  // Convert the tableCompiler toSQL
  toSQL() {
    return this[this.method](), this.sequence;
  }
  // Column Compilation
  // -------
  // If this is a table "creation", we need to first run through all
  // of the columns to build them into a single string,
  // and then run through anything else and push it to the query sequence.
  create(e, t) {
    const i = this.getColumns().map((o) => o.toSQL()), a = this.getColumnTypes(i);
    this.createAlterTableMethods && this.alterTableForCreate(a), this.createQuery(a, e, t), this.columnQueries(i), delete this.single.comment, this.alterTable();
  }
  // Only create the table if it doesn't exist.
  createIfNot() {
    this.create(!0);
  }
  createLike() {
    this.create(!1, !0);
  }
  createLikeIfNot() {
    this.create(!0, !0);
  }
  // If we're altering the table, we need to one-by-one
  // go through and handle each of the queries associated
  // with altering the table's schema.
  alter() {
    const t = this.getColumns().map((s) => s.toSQL()), n = this.getColumns("alter"), i = n.map((s) => s.toSQL()), a = this.getColumnTypes(t), o = this.getColumnTypes(i);
    this.addColumns(a), this.alterColumns(o, n), this.columnQueries(t), this.columnQueries(i), this.alterTable();
  }
  foreign(e) {
    if (e.inTable && e.references) {
      const t = e.keyName ? this.formatter.wrap(e.keyName) : this._indexCommand("foreign", this.tableNameRaw, e.column), n = this.formatter.columnize(e.column), i = this.formatter.columnize(e.references), a = this.formatter.wrap(e.inTable), o = e.onUpdate ? (this.lowerCase ? " on update " : " ON UPDATE ") + e.onUpdate : "", s = e.onDelete ? (this.lowerCase ? " on delete " : " ON DELETE ") + e.onDelete : "", l = e.deferrable ? this.lowerCase ? ` deferrable initially ${e.deferrable.toLowerCase()} ` : ` DEFERRABLE INITIALLY ${e.deferrable.toUpperCase()} ` : "";
      this.lowerCase ? this.pushQuery(
        (this.forCreate ? "" : `alter table ${this.tableName()} add `) + "constraint " + t + " foreign key (" + n + ") references " + a + " (" + i + ")" + o + s + l
      ) : this.pushQuery(
        (this.forCreate ? "" : `ALTER TABLE ${this.tableName()} ADD `) + "CONSTRAINT " + t + " FOREIGN KEY (" + n + ") REFERENCES " + a + " (" + i + ")" + o + s + l
      );
    }
  }
  // Get all of the column sql & bindings individually for building the table queries.
  getColumnTypes(e) {
    return e.reduce(
      function(t, n) {
        const i = n[0];
        return t.sql.push(i.sql), t.bindings.concat(i.bindings), t;
      },
      { sql: [], bindings: [] }
    );
  }
  // Adds all of the additional queries from the "column"
  columnQueries(e) {
    const t = e.reduce(function(n, i) {
      const a = vS(i);
      return ca(a) ? n : n.concat(a);
    }, []);
    for (const n of t)
      this.pushQuery(n);
  }
  // All of the columns to "add" for the query
  addColumns(e, t) {
    if (t = t || this.addColumnsPrefix, e.sql.length > 0) {
      const n = e.sql.map((i) => t + i);
      this.pushQuery({
        sql: (this.lowerCase ? "alter table " : "ALTER TABLE ") + this.tableName() + " " + n.join(", "),
        bindings: e.bindings
      });
    }
  }
  alterColumns(e, t) {
    e.sql.length > 0 && this.addColumns(e, this.alterColumnsPrefix, t);
  }
  // Compile the columns as needed for the current create or alter table
  getColumns(e) {
    const t = this.grouped.columns || [];
    e = e || "add";
    const n = this.tableBuilder.queryContext();
    return t.filter((i) => i.builder._method === e).map((i) => (n !== void 0 && i.builder.queryContext() === void 0 && i.builder.queryContext(n), this.client.columnCompiler(this, i.builder)));
  }
  tableName() {
    const e = this.schemaNameRaw ? `${this.schemaNameRaw}.${this.tableNameRaw}` : this.tableNameRaw;
    return this.formatter.wrap(e);
  }
  tableNameLike() {
    const e = this.schemaNameRaw ? `${this.schemaNameRaw}.${this.tableNameLikeRaw}` : this.tableNameLikeRaw;
    return this.formatter.wrap(e);
  }
  // Generate all of the alter column statements necessary for the query.
  alterTable() {
    const e = this.grouped.alterTable || [];
    for (let t = 0, n = e.length; t < n; t++) {
      const i = e[t];
      this[i.method] ? this[i.method].apply(this, i.args) : this.client.logger.error(`Debug: ${i.method} does not exist`);
    }
    for (const t in this.single)
      typeof this[t] == "function" && this[t](this.single[t]);
  }
  alterTableForCreate(e) {
    this.forCreate = !0;
    const t = this.sequence, n = this.grouped.alterTable || [];
    this.grouped.alterTable = [];
    for (let i = 0, a = n.length; i < a; i++) {
      const o = n[i];
      if (CS(this.createAlterTableMethods, o.method) < 0) {
        this.grouped.alterTable.push(o);
        continue;
      }
      this[o.method] ? (this.sequence = [], this[o.method].apply(this, o.args), e.sql.push(this.sequence[0].sql)) : this.client.logger.error(`Debug: ${o.method} does not exist`);
    }
    this.sequence = t, this.forCreate = !1;
  }
  // Drop the index on the current table.
  dropIndex(e) {
    this.pushQuery(`drop index${e}`);
  }
  dropUnique() {
    throw new Error("Method implemented in the dialect driver");
  }
  dropForeign() {
    throw new Error("Method implemented in the dialect driver");
  }
  dropColumn() {
    const e = wS.normalizeArr.apply(null, arguments), t = (Array.isArray(e) ? e : [e]).map(
      (n) => this.dropColumnPrefix + this.formatter.wrap(n)
    );
    this.pushQuery(
      (this.lowerCase ? "alter table " : "ALTER TABLE ") + this.tableName() + " " + t.join(", ")
    );
  }
  //Default implementation of setNullable. Overwrite on dialect-specific tablecompiler when needed
  //(See postgres/mssql for reference)
  _setNullableState(e, t) {
    const n = this.tableName(), i = this.formatter.columnize(e), a = this.alterColumnsPrefix;
    return this.pushQuery({
      sql: "SELECT 1",
      output: () => this.client.queryBuilder().from(this.tableNameRaw).columnInfo(e).then((o) => {
        if (ca(o))
          throw new Error(
            `.setNullable: Column ${i} does not exist in table ${n}.`
          );
        const s = t ? "null" : "not null", l = o.type + (o.maxLength ? `(${o.maxLength})` : ""), u = o.defaultValue !== null && o.defaultValue !== void 0 ? `default '${o.defaultValue}'` : "", h = `alter table ${n} ${a} ${i} ${l} ${s} ${u}`;
        return this.client.raw(h);
      })
    });
  }
  setNullable(e) {
    return this._setNullableState(e, !0);
  }
  dropNullable(e) {
    return this._setNullableState(e, !1);
  }
  dropChecks(e) {
    if (e === void 0)
      return "";
    e = ES(e);
    const n = `alter table ${this.tableName()} ${e.map((i) => `drop constraint ${i}`).join(", ")}`;
    this.pushQuery(n);
  }
  check(e, t, n) {
    const i = this.tableName();
    let a = n;
    a || (this.checksCount++, a = i + "_" + this.checksCount);
    const o = `alter table ${i} add constraint ${a} check(${e})`;
    this.pushQuery(o);
  }
  _addChecks() {
    return this.grouped.checks ? ", " + this.grouped.checks.map((e) => `${e.args[2] ? "constraint " + e.args[2] + " " : ""}check (${this.client.raw(e.args[0], e.args[1])})`).join(", ") : "";
  }
  // If no name was specified for this index, we will create one using a basic
  // convention of the table name, followed by the columns, followed by an
  // index type, such as primary or index, which makes the index unique.
  _indexCommand(e, t, n) {
    Array.isArray(n) || (n = n ? [n] : []);
    const a = (t.replace(/\.|-/g, "_") + "_" + n.join("_") + "_" + e).toLowerCase();
    return this.formatter.wrap(a);
  }
  _getPrimaryKeys() {
    return (this.grouped.alterTable || []).filter((e) => e.method === "primary").flatMap((e) => e.args).flat();
  }
  _canBeAddPrimaryKey(e) {
    return e.primaryKey && this._getPrimaryKeys().length === 0;
  }
  _getIncrementsColumnNames() {
    return this.grouped.columns.filter((e) => e.builder._type === "increments").map((e) => e.builder._args[0]);
  }
};
fe.prototype.pushQuery = bS;
fe.prototype.pushAdditional = yS;
fe.prototype.unshiftQuery = _S;
fe.prototype.lowerCase = !0;
fe.prototype.createAlterTableMethods = null;
fe.prototype.addColumnsPrefix = "add column ";
fe.prototype.alterColumnsPrefix = "alter column ";
fe.prototype.modifyColumnPrefix = "modify column ";
fe.prototype.dropColumnPrefix = "drop column ";
var ft = fe;
const TS = Ar, AS = Fe, Tc = xt, { addQueryContext: OS } = z;
let ye = class {
  constructor(e, t, n, i) {
    this.client = e, this._method = "add", this._single = {}, this._modifiers = {}, this._statements = [], this._type = RS[n] || n, this._args = i, this._tableBuilder = t, t._method === "alter" && TS(this, Nr);
  }
  // Specify that the current column "references" a column,
  // which may be tableName.column or just "column"
  references(e) {
    return this._tableBuilder.foreign.call(this._tableBuilder, this._args[0], void 0, this)._columnBuilder(this).references(e);
  }
};
const NS = [
  "default",
  "defaultsTo",
  "defaultTo",
  "unsigned",
  "nullable",
  "first",
  "after",
  "comment",
  "collate",
  "check",
  "checkPositive",
  "checkNegative",
  "checkIn",
  "checkNotIn",
  "checkBetween",
  "checkLength",
  "checkRegex"
], qS = {
  default: "defaultTo",
  defaultsTo: "defaultTo"
};
NS.forEach(function(r) {
  const e = qS[r] || r;
  ye.prototype[r] = function() {
    return this._modifiers[e] = Tc(arguments), this;
  };
});
OS(ye);
ye.prototype.notNull = ye.prototype.notNullable = function() {
  return this.nullable(!1);
};
["index", "primary", "unique"].forEach(function(r) {
  ye.prototype[r] = function() {
    return this._type.toLowerCase().indexOf("increments") === -1 && this._tableBuilder[r].apply(
      this._tableBuilder,
      [this._args[0]].concat(Tc(arguments))
    ), this;
  };
});
ye.extend = (r, e) => {
  if (Object.prototype.hasOwnProperty.call(ye.prototype, r))
    throw new Error(
      `Can't extend ColumnBuilder with existing method ('${r}').`
    );
  AS(ye.prototype, { [r]: e });
};
const Nr = {};
Nr.drop = function() {
  return this._single.drop = !0, this;
};
Nr.alterType = function(r) {
  return this._statements.push({
    grouping: "alterType",
    value: r
  }), this;
};
Nr.alter = function({
  alterNullable: r = !0,
  alterType: e = !0
} = {}) {
  return this._method = "alter", this.alterNullable = r, this.alterType = e, this;
};
const RS = {
  float: "floating",
  enum: "enu",
  boolean: "bool",
  string: "varchar",
  bigint: "bigInteger"
};
var qr = ye;
function SS(r) {
  return r && r.length ? r[0] : void 0;
}
var xS = SS, IS = xS;
const Rs = vr, PS = $r, LS = IS, BS = Cr, kS = _r, { toNumber: et } = z, { formatDefault: jS } = Ue, { operator: en } = J;
let M = class {
  constructor(e, t, n) {
    this.client = e, this.tableCompiler = t, this.columnBuilder = n, this._commonBuilder = this.columnBuilder, this.args = n._args, this.type = n._type.toLowerCase(), this.grouped = PS(n._statements, "grouping"), this.modified = n._modifiers, this.isIncrements = this.type.indexOf("increments") !== -1, this.formatter = e.formatter(n), this.bindings = [], this.formatter.bindings = this.bindings, this.bindingsHolder = this, this.sequence = [], this.modifiers = [], this.checksCount = 0;
  }
  _addCheckModifiers() {
    this.modifiers.push(
      "check",
      "checkPositive",
      "checkNegative",
      "checkIn",
      "checkNotIn",
      "checkBetween",
      "checkLength",
      "checkRegex"
    );
  }
  defaults(e) {
    if (Object.prototype.hasOwnProperty.call(this._defaultMap, e))
      return this._defaultMap[e].bind(this)();
    throw new Error(
      `There is no default for the specified identifier ${e}`
    );
  }
  // To convert to sql, we first go through and build the
  // column as it would be in the insert statement
  toSQL() {
    return this.pushQuery(this.compileColumn()), this.sequence.additional && (this.sequence = this.sequence.concat(this.sequence.additional)), this.sequence;
  }
  // Compiles a column.
  compileColumn() {
    return this.formatter.wrap(this.getColumnName()) + " " + this.getColumnType() + this.getModifiers();
  }
  // Assumes the autoincrementing key is named `id` if not otherwise specified.
  getColumnName() {
    return LS(this.args) || this.defaults("columnName");
  }
  getColumnType() {
    if (!this._columnType) {
      const e = this[this.type];
      this._columnType = typeof e == "function" ? e.apply(this, kS(this.args)) : e;
    }
    return this._columnType;
  }
  getModifiers() {
    const e = [];
    for (let t = 0, n = this.modifiers.length; t < n; t++) {
      const i = this.modifiers[t];
      if ((!this.isIncrements || this.isIncrements && i === "comment") && BS(this.modified, i)) {
        const a = this[i].apply(this, this.modified[i]);
        a && e.push(a);
      }
    }
    return e.length > 0 ? ` ${e.join(" ")}` : "";
  }
  // Types
  // ------
  varchar(e) {
    return `varchar(${et(e, 255)})`;
  }
  floating(e, t) {
    return `float(${et(e, 8)}, ${et(t, 2)})`;
  }
  decimal(e, t) {
    if (e === null)
      throw new Error(
        "Specifying no precision on decimal columns is not supported for that SQL dialect."
      );
    return `decimal(${et(e, 8)}, ${et(t, 2)})`;
  }
  // Used to support custom types
  specifictype(e) {
    return e;
  }
  // Modifiers
  // -------
  nullable(e) {
    return e === !1 ? "not null" : "null";
  }
  notNullable() {
    return this.nullable(!1);
  }
  defaultTo(e) {
    return `default ${jS(e, this.type, this.client)}`;
  }
  increments(e = { primaryKey: !0 }) {
    return "integer not null" + (this.tableCompiler._canBeAddPrimaryKey(e) ? " primary key" : "") + " autoincrement";
  }
  bigincrements(e = { primaryKey: !0 }) {
    return this.increments(e);
  }
  _pushAlterCheckQuery(e, t) {
    let n = t;
    n || (this.checksCount++, n = this.tableCompiler.tableNameRaw + "_" + this.getColumnName() + "_" + this.checksCount), this.pushAdditional(function() {
      this.pushQuery(
        `alter table ${this.tableCompiler.tableName()} add constraint ${n} check(${e})`
      );
    });
  }
  _checkConstraintName(e) {
    return e ? `constraint ${e} ` : "";
  }
  _check(e, t) {
    return this.columnBuilder._method === "alter" ? (this._pushAlterCheckQuery(e, t), "") : `${this._checkConstraintName(
      t
    )}check (${e})`;
  }
  checkPositive(e) {
    return this._check(
      `${this.formatter.wrap(this.getColumnName())} ${en(
        ">",
        this.columnBuilder,
        this.bindingsHolder
      )} 0`,
      e
    );
  }
  checkNegative(e) {
    return this._check(
      `${this.formatter.wrap(this.getColumnName())} ${en(
        "<",
        this.columnBuilder,
        this.bindingsHolder
      )} 0`,
      e
    );
  }
  _checkIn(e, t, n) {
    return this._check(
      `${this.formatter.wrap(this.getColumnName())} ${n ? "not " : ""}in (${e.map((i) => this.client._escapeBinding(i)).join(",")})`,
      t
    );
  }
  checkIn(e, t) {
    return this._checkIn(e, t);
  }
  checkNotIn(e, t) {
    return this._checkIn(e, t, !0);
  }
  checkBetween(e, t) {
    e.length === 2 && !Array.isArray(e[0]) && !Array.isArray(e[1]) && (e = [e]);
    const n = e.map((i) => `${this.formatter.wrap(
      this.getColumnName()
    )} between ${this.client._escapeBinding(
      i[0]
    )} and ${this.client._escapeBinding(i[1])}`).join(" or ");
    return this._check(n, t);
  }
  checkLength(e, t, n) {
    return this._check(
      `length(${this.formatter.wrap(this.getColumnName())}) ${en(
        e,
        this.columnBuilder,
        this.bindingsHolder
      )} ${et(t)}`,
      n
    );
  }
};
M.prototype.binary = "blob";
M.prototype.bool = "boolean";
M.prototype.date = "date";
M.prototype.datetime = "datetime";
M.prototype.time = "time";
M.prototype.timestamp = "timestamp";
M.prototype.geometry = "geometry";
M.prototype.geography = "geography";
M.prototype.point = "point";
M.prototype.enu = "varchar";
M.prototype.bit = M.prototype.json = "text";
M.prototype.uuid = ({
  useBinaryUuid: r = !1,
  primaryKey: e = !1
} = {}) => r ? "binary(16)" : "char(36)";
M.prototype.integer = M.prototype.smallint = M.prototype.mediumint = "integer";
M.prototype.biginteger = "bigint";
M.prototype.text = "text";
M.prototype.tinyint = "tinyint";
M.prototype.pushQuery = Rs.pushQuery;
M.prototype.pushAdditional = Rs.pushAdditional;
M.prototype.unshiftQuery = Rs.unshiftQuery;
M.prototype._defaultMap = {
  columnName: function() {
    if (!this.isIncrements)
      throw new Error(
        `You did not specify a column name for the ${this.type} column.`
      );
    return "id";
  }
};
var We = M;
const MS = ht;
let QS = class extends MS {
  constructor(e, t) {
    super(e), this.ref = t, this._schema = null, this._alias = null;
  }
  withSchema(e) {
    return this._schema = e, this;
  }
  as(e) {
    return this._alias = e, this;
  }
  toSQL() {
    const e = this._schema ? `${this._schema}.${this.ref}` : this.ref, t = this.client.formatter(this), n = t.columnize(e), i = this._alias ? `${n} as ${t.wrap(this._alias)}` : n;
    return this.set(i, []), super.toSQL(...arguments);
  }
};
var DS = QS;
const {
  columnize: FS,
  wrap: US
} = J;
let HS = class {
  constructor(e, t) {
    this.client = e, this.builder = t, this.bindings = [];
  }
  // Accepts a string or array of columns to wrap as appropriate.
  columnize(e) {
    return FS(e, this.builder, this.client, this);
  }
  // Puts the appropriate wrapper around a value depending on the database
  // engine, unless it's a knex.raw value, in which case it's left alone.
  wrap(e, t) {
    return US(e, t, this.builder, this.client, this);
  }
};
var Rr = HS, R = {};
Object.defineProperty(R, "__esModule", { value: !0 });
var VS = P;
function WS(r) {
  if (r && r.__esModule)
    return r;
  var e = /* @__PURE__ */ Object.create(null);
  return r && Object.keys(r).forEach(function(t) {
    if (t !== "default") {
      var n = Object.getOwnPropertyDescriptor(r, t);
      Object.defineProperty(e, t, n.get ? n : {
        enumerable: !0,
        get: function() {
          return r[t];
        }
      });
    }
  }), e.default = r, Object.freeze(e);
}
var tn = /* @__PURE__ */ WS(VS);
const {
  env: ve = {},
  argv: Ac = [],
  platform: zS = ""
} = typeof process > "u" ? {} : process, JS = "NO_COLOR" in ve || Ac.includes("--no-color"), KS = "FORCE_COLOR" in ve || Ac.includes("--color"), GS = zS === "win32", Oc = ve.TERM === "dumb", YS = tn && tn.isatty && tn.isatty(1) && ve.TERM && !Oc, XS = "CI" in ve && ("GITHUB_ACTIONS" in ve || "GITLAB_CI" in ve || "CIRCLECI" in ve), Nc = !JS && (KS || GS && !Oc || YS || XS), qc = (r, e, t, n, i = e.substring(0, r) + n, a = e.substring(r + t.length), o = a.indexOf(t)) => i + (o < 0 ? a : qc(o, a, t, n)), ZS = (r, e, t, n, i) => r < 0 ? t + e + n : t + qc(r, e, n, i) + n, e1 = (r, e, t = r, n = r.length + 1) => (i) => i || !(i === "" || i === void 0) ? ZS(
  ("" + i).indexOf(e, n),
  i,
  r,
  e,
  t
) : "", S = (r, e, t) => e1(`\x1B[${r}m`, `\x1B[${e}m`, t), ha = {
  reset: S(0, 0),
  bold: S(1, 22, "\x1B[22m\x1B[1m"),
  dim: S(2, 22, "\x1B[22m\x1B[2m"),
  italic: S(3, 23),
  underline: S(4, 24),
  inverse: S(7, 27),
  hidden: S(8, 28),
  strikethrough: S(9, 29),
  black: S(30, 39),
  red: S(31, 39),
  green: S(32, 39),
  yellow: S(33, 39),
  blue: S(34, 39),
  magenta: S(35, 39),
  cyan: S(36, 39),
  white: S(37, 39),
  gray: S(90, 39),
  bgBlack: S(40, 49),
  bgRed: S(41, 49),
  bgGreen: S(42, 49),
  bgYellow: S(43, 49),
  bgBlue: S(44, 49),
  bgMagenta: S(45, 49),
  bgCyan: S(46, 49),
  bgWhite: S(47, 49),
  blackBright: S(90, 39),
  redBright: S(91, 39),
  greenBright: S(92, 39),
  yellowBright: S(93, 39),
  blueBright: S(94, 39),
  magentaBright: S(95, 39),
  cyanBright: S(96, 39),
  whiteBright: S(97, 39),
  bgBlackBright: S(100, 49),
  bgRedBright: S(101, 49),
  bgGreenBright: S(102, 49),
  bgYellowBright: S(103, 49),
  bgBlueBright: S(104, 49),
  bgMagentaBright: S(105, 49),
  bgCyanBright: S(106, 49),
  bgWhiteBright: S(107, 49)
}, Rc = ({ useColor: r = Nc } = {}) => r ? ha : Object.keys(ha).reduce(
  (e, t) => ({ ...e, [t]: String }),
  {}
), {
  reset: t1,
  bold: r1,
  dim: n1,
  italic: i1,
  underline: s1,
  inverse: o1,
  hidden: a1,
  strikethrough: l1,
  black: u1,
  red: c1,
  green: h1,
  yellow: d1,
  blue: f1,
  magenta: p1,
  cyan: m1,
  white: g1,
  gray: y1,
  bgBlack: b1,
  bgRed: _1,
  bgGreen: w1,
  bgYellow: $1,
  bgBlue: C1,
  bgMagenta: v1,
  bgCyan: E1,
  bgWhite: T1,
  blackBright: A1,
  redBright: O1,
  greenBright: N1,
  yellowBright: q1,
  blueBright: R1,
  magentaBright: S1,
  cyanBright: x1,
  whiteBright: I1,
  bgBlackBright: P1,
  bgRedBright: L1,
  bgGreenBright: B1,
  bgYellowBright: k1,
  bgBlueBright: j1,
  bgMagentaBright: M1,
  bgCyanBright: Q1,
  bgWhiteBright: D1
} = Rc();
R.bgBlack = b1;
R.bgBlackBright = P1;
R.bgBlue = C1;
R.bgBlueBright = j1;
R.bgCyan = E1;
R.bgCyanBright = Q1;
R.bgGreen = w1;
R.bgGreenBright = B1;
R.bgMagenta = v1;
R.bgMagentaBright = M1;
R.bgRed = _1;
R.bgRedBright = L1;
R.bgWhite = T1;
R.bgWhiteBright = D1;
R.bgYellow = $1;
R.bgYellowBright = k1;
R.black = u1;
R.blackBright = A1;
R.blue = f1;
R.blueBright = R1;
R.bold = r1;
R.createColors = Rc;
R.cyan = m1;
R.cyanBright = x1;
R.dim = n1;
R.gray = y1;
R.green = h1;
R.greenBright = N1;
R.hidden = a1;
R.inverse = o1;
R.isColorSupported = Nc;
R.italic = i1;
R.magenta = p1;
R.magentaBright = S1;
R.red = c1;
R.redBright = O1;
R.reset = t1;
R.strikethrough = l1;
R.underline = s1;
R.white = g1;
R.whiteBright = I1;
R.yellow = d1;
R.yellowBright = q1;
const rn = R, { inspect: F1 } = P, { isString: U1, isFunction: da } = Q;
let H1 = class {
  constructor(e = {}) {
    const {
      log: {
        debug: t,
        warn: n,
        error: i,
        deprecate: a,
        inspectionDepth: o,
        enableColors: s
      } = {}
    } = e;
    this._inspectionDepth = o || 5, this._enableColors = V1(s), this._debug = t, this._warn = n, this._error = i, this._deprecate = a;
  }
  _log(e, t, n) {
    if (t != null && !da(t))
      throw new TypeError("Extensions to knex logger must be functions!");
    if (da(t)) {
      t(e);
      return;
    }
    U1(e) || (e = F1(e, {
      depth: this._inspectionDepth,
      colors: this._enableColors
    })), console.log(n ? n(e) : e);
  }
  debug(e) {
    this._log(e, this._debug);
  }
  warn(e) {
    this._log(e, this._warn, rn.yellow);
  }
  error(e) {
    this._log(e, this._error, rn.red);
  }
  deprecate(e, t) {
    const n = `${e} is deprecated, please use ${t}`;
    this._log(n, this._deprecate, rn.yellow);
  }
};
function V1(r) {
  return r ?? (process && process.stdout ? process.stdout.isTTY : !1);
}
var W1 = H1;
const z1 = z, J1 = Ar, K1 = Fe;
let Et = class {
  constructor(e, t, n, i) {
    this.client = e, this._method = t, this._schemaName = void 0, this._columns = void 0, this._fn = i, this._viewName = n, this._statements = [], this._single = {};
  }
  setSchema(e) {
    this._schemaName = e;
  }
  columns(e) {
    this._columns = e;
  }
  as(e) {
    this._selectQuery = e;
  }
  checkOption() {
    throw new Error(
      "check option definition is not supported by this dialect."
    );
  }
  localCheckOption() {
    throw new Error(
      "check option definition is not supported by this dialect."
    );
  }
  cascadedCheckOption() {
    throw new Error(
      "check option definition is not supported by this dialect."
    );
  }
  toSQL() {
    return this._method === "alter" && J1(this, G1), this._fn.call(this, this), this.client.viewCompiler(this).toSQL();
  }
};
const G1 = {
  column(r) {
    const e = this;
    return {
      rename: function(t) {
        return e._statements.push({
          grouping: "alterView",
          method: "renameColumn",
          args: [r, t]
        }), this;
      },
      defaultTo: function(t) {
        return e._statements.push({
          grouping: "alterView",
          method: "defaultTo",
          args: [r, t]
        }), this;
      }
    };
  }
};
z1.addQueryContext(Et);
Et.extend = (r, e) => {
  if (Object.prototype.hasOwnProperty.call(Et.prototype, r))
    throw new Error(
      `Can't extend ViewBuilder with existing method ('${r}').`
    );
  K1(Et.prototype, { [r]: e });
};
var Bt = Et;
const { pushQuery: Y1 } = vr, X1 = $r, { columnize: Z1 } = J;
let Sc = class {
  constructor(e, t) {
    this.client = e, this.viewBuilder = t, this._commonBuilder = this.viewBuilder, this.method = t._method, this.schemaNameRaw = t._schemaName, this.viewNameRaw = t._viewName, this.single = t._single, this.selectQuery = t._selectQuery, this.columns = t._columns, this.grouped = X1(t._statements, "grouping"), this.formatter = e.formatter(t), this.bindings = [], this.formatter.bindings = this.bindings, this.bindingsHolder = this, this.sequence = [];
  }
  // Convert the tableCompiler toSQL
  toSQL() {
    return this[this.method](), this.sequence;
  }
  // Column Compilation
  // -------
  create() {
    this.createQuery(this.columns, this.selectQuery);
  }
  createOrReplace() {
    throw new Error("replace views is not supported by this dialect.");
  }
  createMaterializedView() {
    throw new Error("materialized views are not supported by this dialect.");
  }
  createQuery(e, t, n, i) {
    const a = "create " + (n ? "materialized " : "") + (i ? "or replace " : "") + "view ", o = e ? " (" + Z1(
      e,
      this.viewBuilder,
      this.client,
      this.bindingsHolder
    ) + ")" : "";
    let s = a + this.viewName() + o;
    switch (s += " as ", s += t.toString(), this.single.checkOption) {
      case "default_option":
        s += " with check option";
        break;
      case "local":
        s += " with local check option";
        break;
      case "cascaded":
        s += " with cascaded check option";
        break;
    }
    this.pushQuery({
      sql: s
    });
  }
  renameView(e, t) {
    throw new Error(
      "rename view is not supported by this dialect (instead drop, then create another view)."
    );
  }
  refreshMaterializedView() {
    throw new Error("materialized views are not supported by this dialect.");
  }
  alter() {
    this.alterView();
  }
  alterView() {
    const e = this.grouped.alterView || [];
    for (let t = 0, n = e.length; t < n; t++) {
      const i = e[t];
      this[i.method] ? this[i.method].apply(this, i.args) : this.client.logger.error(`Debug: ${i.method} does not exist`);
    }
    for (const t in this.single)
      typeof this[t] == "function" && this[t](this.single[t]);
  }
  renameColumn(e, t) {
    throw new Error("rename column of views is not supported by this dialect.");
  }
  defaultTo(e, t) {
    throw new Error(
      "change default values of views is not supported by this dialect."
    );
  }
  viewName() {
    const e = this.schemaNameRaw ? `${this.schemaNameRaw}.${this.viewNameRaw}` : this.viewNameRaw;
    return this.formatter.wrap(e);
  }
};
Sc.prototype.pushQuery = Y1;
var pt = Sc;
const { Pool: ex, TimeoutError: tx } = ah, { EventEmitter: rx } = P, { promisify: nx } = P, { makeEscape: ix } = os, sx = C_, ox = Tu, ax = Nu, lx = Ow, ux = Oe, {
  executeQuery: cx,
  enrichQueryObject: fa
} = Ju, hx = Ne, dx = Ve, fx = $c, px = dt, mx = vc, gx = ft, yx = qr, bx = We, { KnexTimeoutError: _x } = Te, { outputQuery: wx, unwrapRaw: $x } = J, { compileCallback: Cx } = Ue, vx = ht, Ex = DS, Tx = Rr, Ax = W1, { POOL_CONFIG_OPTIONS: Ox } = Es, Nx = Bt, qx = pt, Rx = Ae, nn = ae("knex:client");
let xc = class extends rx {
  constructor(e = {}) {
    if (super(), this.config = e, this.logger = new Ax(e), this.dialect && !this.config.client && this.logger.warn(
      "Using 'this.dialect' to identify the client is deprecated and support for it will be removed in the future. Please use configuration option 'client' instead."
    ), !(this.config.client || this.dialect))
      throw new Error(
        "knex: Required configuration option 'client' is missing."
      );
    e.version && (this.version = e.version), e.connection && e.connection instanceof Function ? (this.connectionConfigProvider = e.connection, this.connectionConfigExpirationChecker = () => !0) : (this.connectionSettings = sx(e.connection || {}), this.connectionConfigExpirationChecker = null), this.driverName && e.connection && (this.initializeDriver(), (!e.pool || e.pool && e.pool.max !== 0) && this.initializePool(e)), this.valueForUndefined = this.raw("DEFAULT"), e.useNullAsDefault && (this.valueForUndefined = null);
  }
  formatter(e) {
    return new Tx(this, e);
  }
  queryBuilder() {
    return new hx(this);
  }
  queryCompiler(e, t) {
    return new dx(this, e, t);
  }
  schemaBuilder() {
    return new fx(this);
  }
  schemaCompiler(e) {
    return new px(this, e);
  }
  tableBuilder(e, t, n, i) {
    return new mx(this, e, t, n, i);
  }
  viewBuilder(e, t, n) {
    return new Nx(this, e, t, n);
  }
  tableCompiler(e) {
    return new gx(this, e);
  }
  viewCompiler(e) {
    return new qx(this, e);
  }
  columnBuilder(e, t, n) {
    return new yx(this, e, t, n);
  }
  columnCompiler(e, t) {
    return new bx(this, e, t);
  }
  runner(e) {
    return new lx(this, e);
  }
  transaction(e, t, n) {
    return new ux(this, e, t, n);
  }
  raw() {
    return new vx(this).set(...arguments);
  }
  ref() {
    return new Ex(this, ...arguments);
  }
  query(e, t) {
    const n = fa(e, t, this);
    return cx(e, n, this);
  }
  stream(e, t, n, i) {
    const a = fa(e, t, this);
    return this._stream(e, a, n, i);
  }
  prepBindings(e) {
    return e;
  }
  positionBindings(e) {
    return e;
  }
  postProcessResponse(e, t) {
    return this.config.postProcessResponse ? this.config.postProcessResponse(e, t) : e;
  }
  wrapIdentifier(e, t) {
    return this.customWrapIdentifier(
      e,
      this.wrapIdentifierImpl,
      t
    );
  }
  customWrapIdentifier(e, t, n) {
    return this.config.wrapIdentifier ? this.config.wrapIdentifier(e, t, n) : t(e);
  }
  wrapIdentifierImpl(e) {
    return e !== "*" ? `"${e.replace(/"/g, '""')}"` : "*";
  }
  initializeDriver() {
    try {
      this.driver = this._driver();
    } catch (e) {
      const t = `Knex: run
$ npm install ${this.driverName} --save`;
      throw this.logger.error(`${t}
${e.message}
${e.stack}`), new Error(`${t}
${e.message}`);
    }
  }
  poolDefaults() {
    return { min: 2, max: 10, propagateCreateError: !0 };
  }
  getPoolSettings(e) {
    e = ox({}, e, this.poolDefaults()), Ox.forEach((a) => {
      a in e && this.logger.warn(
        [
          `Pool config option "${a}" is no longer supported.`,
          "See https://github.com/Vincit/tarn.js for possible pool config options."
        ].join(" ")
      );
    });
    const t = 6e4, n = [
      this.config.acquireConnectionTimeout,
      e.acquireTimeoutMillis
    ].filter((a) => a !== void 0);
    n.length || n.push(t), e.acquireTimeoutMillis = Math.min(...n);
    const i = async () => {
      if (!this.connectionConfigProvider || !this.connectionConfigExpirationChecker || !this.connectionConfigExpirationChecker())
        return;
      const a = await this.connectionConfigProvider();
      a.expirationChecker ? (this.connectionConfigExpirationChecker = a.expirationChecker, delete a.expirationChecker) : this.connectionConfigExpirationChecker = null, this.connectionSettings = a;
    };
    return Object.assign(e, {
      create: async () => {
        await i();
        const a = await this.acquireRawConnection();
        return a.__knexUid = ax("__knexUid"), e.afterCreate && await nx(e.afterCreate)(a), a;
      },
      destroy: (a) => {
        if (a !== void 0)
          return this.destroyRawConnection(a);
      },
      validate: (a) => a.__knex__disposed ? (this.logger.warn(`Connection Error: ${a.__knex__disposed}`), !1) : this.validateConnection(a)
    });
  }
  initializePool(e = this.config) {
    if (this.pool) {
      this.logger.warn("The pool has already been initialized");
      return;
    }
    const t = {
      ...this.getPoolSettings(e.pool)
    };
    t.afterCreate && delete t.afterCreate, this.pool = new ex(t);
  }
  validateConnection(e) {
    return !0;
  }
  // Acquire a connection from the pool.
  async acquireConnection() {
    if (!this.pool)
      throw new Error("Unable to acquire a connection");
    try {
      const e = await this.pool.acquire().promise;
      return nn("acquired connection from pool: %s", e.__knexUid), e;
    } catch (e) {
      let t = e;
      throw e instanceof tx && (t = new _x(
        "Knex: Timeout acquiring a connection. The pool is probably full. Are you missing a .transacting(trx) call?"
      )), t;
    }
  }
  // Releases a connection back to the connection pool,
  // returning a promise resolved when the connection is released.
  releaseConnection(e) {
    return nn("releasing connection to pool: %s", e.__knexUid), this.pool.release(e) || nn("pool refused connection: %s", e.__knexUid), Promise.resolve();
  }
  // Destroy the current connection pool for the client.
  async destroy(e) {
    try {
      this.pool && this.pool.destroy && await this.pool.destroy(), this.pool = void 0, typeof e == "function" && e();
    } catch (t) {
      if (typeof e == "function")
        return e(t);
      throw t;
    }
  }
  // Return the database being used by this client.
  database() {
    return this.connectionSettings.database;
  }
  toString() {
    return "[object KnexClient]";
  }
  assertCanCancelQuery() {
    if (!this.canCancelQuery)
      throw new Error("Query cancelling not supported for this dialect");
  }
  cancelQuery() {
    throw new Error("Query cancelling not supported for this dialect");
  }
  // Formatter part
  alias(e, t) {
    return e + " as " + t;
  }
  // Checks whether a value is a function... if it is, we compile it
  // otherwise we check whether it's a raw
  parameter(e, t, n) {
    return typeof e == "function" ? wx(
      Cx(e, void 0, this, n),
      !0,
      t,
      this
    ) : $x(e, !0, t, this, n) || "?";
  }
  // Turns a list of values into a list of ?'s, joining them with commas unless
  // a "joining" value is specified (e.g. ' and ')
  parameterize(e, t, n, i) {
    if (typeof e == "function")
      return this.parameter(e, n, i);
    e = Array.isArray(e) ? e : [e];
    let a = "", o = -1;
    for (; ++o < e.length; ) {
      o > 0 && (a += ", ");
      let s = e[o];
      Rx(s) && (s = JSON.stringify(s)), a += this.parameter(
        s === void 0 ? t : s,
        n,
        i
      );
    }
    return a;
  }
  // Formats `values` into a parenthesized list of parameters for a `VALUES`
  // clause.
  //
  // [1, 2]                  -> '(?, ?)'
  // [[1, 2], [3, 4]]        -> '((?, ?), (?, ?))'
  // knex('table')           -> '(select * from "table")'
  // knex.raw('select ?', 1) -> '(select ?)'
  //
  values(e, t, n) {
    return Array.isArray(e) ? Array.isArray(e[0]) ? `(${e.map(
      (i) => `(${this.parameterize(
        i,
        void 0,
        t,
        n
      )})`
    ).join(", ")})` : `(${this.parameterize(
      e,
      void 0,
      t,
      n
    )})` : e && e.isRawInstance ? `(${this.parameter(e, t, n)})` : this.parameter(e, t, n);
  }
  processPassedConnection(e) {
  }
  toPathForJson(e) {
    return e;
  }
};
Object.assign(xc.prototype, {
  _escapeBinding: ix({
    escapeString(r) {
      return `'${r.replace(/'/g, "''")}'`;
    }
  }),
  canCancelQuery: !1
});
var ze = xc, Sx = P, sn = P;
function Yi(r) {
  if (r.charAt(0) === "/") {
    var t = r.split(" ");
    return { host: t[0], database: t[1] };
  }
  var e = Sx.parse(
    / |%[^a-f0-9]|%[a-f0-9][^a-f0-9]/i.test(r) ? encodeURI(r).replace(/\%25(\d\d)/g, "%$1") : r,
    !0
  ), t = e.query;
  for (var n in t)
    Array.isArray(t[n]) && (t[n] = t[n][t[n].length - 1]);
  var i = (e.auth || ":").split(":");
  if (t.user = i[0], t.password = i.splice(1).join(":"), t.port = e.port, e.protocol == "socket:")
    return t.host = decodeURI(e.pathname), t.database = e.query.db, t.client_encoding = e.query.encoding, t;
  t.host || (t.host = e.hostname);
  var a = e.pathname;
  if (!t.host && a && /^%2f/i.test(a)) {
    var o = a.split("/");
    t.host = decodeURIComponent(o[0]), a = o.splice(1).join("/");
  }
  switch (a && a.charAt(0) === "/" && (a = a.slice(1) || null), t.database = a && decodeURI(a), (t.ssl === "true" || t.ssl === "1") && (t.ssl = !0), t.ssl === "0" && (t.ssl = !1), (t.sslcert || t.sslkey || t.sslrootcert || t.sslmode) && (t.ssl = {}), t.sslcert && (t.ssl.cert = sn.readFileSync(t.sslcert).toString()), t.sslkey && (t.ssl.key = sn.readFileSync(t.sslkey).toString()), t.sslrootcert && (t.ssl.ca = sn.readFileSync(t.sslrootcert).toString()), t.sslmode) {
    case "disable": {
      t.ssl = !1;
      break;
    }
    case "prefer":
    case "require":
    case "verify-ca":
    case "verify-full":
      break;
    case "no-verify": {
      t.ssl.rejectUnauthorized = !1;
      break;
    }
  }
  return t;
}
var xx = Yi;
Yi.parse = Yi;
const { parse: Ix } = xx, Px = Ix, Lx = process && process.platform && process.platform === "win32";
function Bx(r) {
  try {
    return new URL(r);
  } catch {
    return null;
  }
}
var kx = function(e) {
  const t = Bx(e), n = Lx && t && t.protocol.length === 2;
  if (!t || n)
    return {
      client: "sqlite3",
      connection: {
        filename: e
      }
    };
  let { protocol: i } = t;
  i.slice(-1) === ":" && (i = i.slice(0, -1));
  const a = ["postgresql", "postgres"].includes(i);
  return {
    client: i,
    connection: a ? Px(e) : jx(t)
  };
};
function jx(r) {
  const e = {};
  let t = r.pathname;
  if (t[0] === "/" && (t = t.slice(1)), e.database = t, r.hostname && (r.protocol.indexOf("mssql") === 0 ? e.server = r.hostname : e.host = r.hostname), r.port && (e.port = r.port), (r.username || r.password) && (e.user = decodeURIComponent(r.username)), r.password && (e.password = decodeURIComponent(r.password)), r.searchParams)
    for (const [n, i] of r.searchParams.entries())
      if (["mysql:", "mariadb:", "mssql:"].includes(
        r.protocol
      ))
        try {
          e[n] = JSON.parse(i);
        } catch {
          e[n] = i;
        }
      else
        e[n] = i;
  return e;
}
var Sr = {}, on, pa;
function Mx() {
  if (pa)
    return on;
  pa = 1;
  const r = Oe;
  class e extends r {
    begin(n) {
      return this.isolationLevel && this.client.logger.warn(
        "sqlite3 only supports serializable transactions, ignoring the isolation level param"
      ), this.query(n, "BEGIN;");
    }
  }
  return on = e, on;
}
var an, ma;
function Qx() {
  if (ma)
    return an;
  ma = 1;
  const r = vu, e = Rt, t = oe, n = le, i = It, a = Ve, o = gr, { isString: s } = Q, {
    wrapString: l,
    columnize: u
  } = J, h = r("");
  class c extends a {
    constructor(p, g, _) {
      super(p, g, _), this.forShare = h, this.forKeyShare = h, this.forUpdate = h, this.forNoKeyUpdate = h;
    }
    // SQLite requires us to build the multi-row insert as a listing of select with
    // unions joining them together. So we'll build out this list of columns and
    // then join them all together with select unions to complete the queries.
    insert() {
      const p = this.single.insert || [];
      let g = this.with() + `insert into ${this.tableName} `;
      if (Array.isArray(p)) {
        if (p.length === 0)
          return "";
        if (p.length === 1 && p[0] && n(p[0]))
          return {
            sql: g + this._emptyInsertValue
          };
      } else if (typeof p == "object" && n(p))
        return {
          sql: g + this._emptyInsertValue
        };
      const _ = this._prepInsert(p);
      if (s(_))
        return {
          sql: g + _
        };
      if (_.columns.length === 0)
        return {
          sql: ""
        };
      if (g += `(${this.formatter.columnize(_.columns)})`, this.client.valueForUndefined !== null && _.values.forEach((C) => {
        e(C, (T) => {
          if (T === void 0)
            throw new TypeError(
              "`sqlite` does not support inserting default values. Specify values explicitly or use the `useNullAsDefault` config flag. (see docs https://knexjs.org/guide/query-builder.html#insert)."
            );
        });
      }), _.values.length === 1) {
        const C = this.client.parameterize(
          _.values[0],
          this.client.valueForUndefined,
          this.builder,
          this.bindingsHolder
        );
        g += ` values (${C})`;
        const { onConflict: T, ignore: N, merge: I } = this.single;
        if (T && N)
          g += this._ignore(T);
        else if (T && I) {
          g += this._merge(I.updates, T, p);
          const K = this.where();
          K && (g += ` ${K}`);
        }
        const { returning: L } = this.single;
        return L && (g += this._returning(L)), {
          sql: g,
          returning: L
        };
      }
      const f = [];
      let m = -1;
      for (; ++m < _.values.length; ) {
        let C = -1;
        const T = f[m] = [];
        let N = _.values[m];
        for (N = N === void 0 ? this.client.valueForUndefined : N; ++C < _.columns.length; )
          T.push(
            this.client.alias(
              this.client.parameter(
                N[C],
                this.builder,
                this.bindingsHolder
              ),
              this.formatter.wrap(_.columns[C])
            )
          );
        f[m] = T.join(", ");
      }
      g += " select " + f.join(" union all select ");
      const { onConflict: y, ignore: w, merge: $ } = this.single;
      y && w ? g += " where true" + this._ignore(y) : y && $ && (g += " where true" + this._merge($.updates, y, p));
      const { returning: E } = this.single;
      return E && (g += this._returning(E)), {
        sql: g,
        returning: E
      };
    }
    // Compiles an `update` query, allowing for a return value.
    update() {
      const p = this.with(), g = this._prepUpdate(this.single.update), _ = this.where(), { returning: f } = this.single;
      return {
        sql: p + `update ${this.single.only ? "only " : ""}${this.tableName} set ${g.join(", ")}` + (_ ? ` ${_}` : "") + this._returning(f),
        returning: f
      };
    }
    _ignore(p) {
      return p === !0 ? " on conflict do nothing" : ` on conflict ${this._onConflictClause(p)} do nothing`;
    }
    _merge(p, g, _) {
      let f = ` on conflict ${this._onConflictClause(g)} do update set `;
      if (p && Array.isArray(p))
        return f += p.map(
          (m) => l(
            m.split(".").pop(),
            this.formatter.builder,
            this.client,
            this.formatter
          )
        ).map((m) => `${m} = excluded.${m}`).join(", "), f;
      if (p && typeof p == "object") {
        const m = this._prepUpdate(p);
        return typeof m == "string" ? f += m : f += m.join(","), f;
      } else {
        const m = this._prepInsert(_);
        if (typeof m == "string")
          throw new Error(
            "If using merge with a raw insert query, then updates must be provided"
          );
        return f += m.columns.map(
          (y) => l(y.split(".").pop(), this.builder, this.client)
        ).map((y) => `${y} = excluded.${y}`).join(", "), f;
      }
    }
    _returning(p) {
      return p ? ` returning ${this.formatter.columnize(p)}` : "";
    }
    // Compile a truncate table statement into SQL.
    truncate() {
      const { table: p } = this.single;
      return {
        sql: `delete from ${this.tableName}`,
        output() {
          return this.query({
            sql: `delete from sqlite_sequence where name = '${p}'`
          }).catch(o);
        }
      };
    }
    // Compiles a `columnInfo` query
    columnInfo() {
      const p = this.single.columnInfo;
      return {
        sql: `PRAGMA table_info(\`${this.client.customWrapIdentifier(this.single.table, t)}\`)`,
        output(_) {
          const f = /.*\((\d+)\)/, m = i(
            _,
            function(y, w) {
              let { type: $ } = w, E = $.match(f);
              return E && (E = E[1]), $ = E ? $.split("(")[0] : $, y[w.name] = {
                type: $.toLowerCase(),
                maxLength: E,
                nullable: !w.notnull,
                defaultValue: w.dflt_value
              }, y;
            },
            {}
          );
          return p && m[p] || m;
        }
      };
    }
    limit() {
      const p = !this.single.limit && this.single.limit !== 0;
      return p && !this.single.offset ? "" : (this.single.limit = p ? -1 : this.single.limit, `limit ${this._getValueOrParameterFromAttribute("limit")}`);
    }
    // Json functions
    jsonExtract(p) {
      return this._jsonExtract("json_extract", p);
    }
    jsonSet(p) {
      return this._jsonSet("json_set", p);
    }
    jsonInsert(p) {
      return this._jsonSet("json_insert", p);
    }
    jsonRemove(p) {
      const g = `json_remove(${u(
        p.column,
        this.builder,
        this.client,
        this.bindingsHolder
      )},${this.client.parameter(
        p.path,
        this.builder,
        this.bindingsHolder
      )})`;
      return p.alias ? this.client.alias(g, this.formatter.wrap(p.alias)) : g;
    }
    whereJsonPath(p) {
      return this._whereJsonPath("json_extract", p);
    }
    whereJsonSupersetOf(p) {
      throw new Error(
        "Json superset where clause not actually supported by SQLite"
      );
    }
    whereJsonSubsetOf(p) {
      throw new Error(
        "Json subset where clause not actually supported by SQLite"
      );
    }
    onJsonPathEquals(p) {
      return this._onJsonPathEquals("json_extract", p);
    }
  }
  return an = c, an;
}
var ln, ga;
function Dx() {
  if (ga)
    return ln;
  ga = 1;
  var r = ct;
  function e(t, n) {
    var i;
    return r(t, function(a, o, s) {
      return i = n(a, o, s), !i;
    }), !!i;
  }
  return ln = e, ln;
}
var un, ya;
function Fx() {
  if (ya)
    return un;
  ya = 1;
  var r = Xu(), e = _e, t = Dx(), n = U, i = fr;
  function a(o, s, l) {
    var u = n(o) ? r : t;
    return l && i(o, s, l) && (s = void 0), u(o, e(s));
  }
  return un = a, un;
}
var cn, ba;
function Ux() {
  if (ba)
    return cn;
  ba = 1;
  const r = dt, e = Fx();
  class t extends r {
    constructor(i, a) {
      super(i, a);
    }
    // Compile the query to determine if a table exists.
    hasTable(i) {
      const a = `select * from sqlite_master where type = 'table' and name = ${this.client.parameter(
        this.formatter.wrap(i).replace(/`/g, ""),
        this.builder,
        this.bindingsHolder
      )}`;
      this.pushQuery({ sql: a, output: (o) => o.length > 0 });
    }
    // Compile the query to determine if a column exists.
    hasColumn(i, a) {
      this.pushQuery({
        sql: `PRAGMA table_info(${this.formatter.wrap(i)})`,
        output(o) {
          return e(o, (s) => this.client.wrapIdentifier(s.name.toLowerCase()) === this.client.wrapIdentifier(a.toLowerCase()));
        }
      });
    }
    // Compile a rename table command.
    renameTable(i, a) {
      this.pushQuery(
        `alter table ${this.formatter.wrap(i)} rename to ${this.formatter.wrap(
          a
        )}`
      );
    }
    async generateDdlCommands() {
      const i = this.builder._sequence;
      for (let o = 0, s = i.length; o < s; o++) {
        const l = i[o];
        this[l.method].apply(this, l.args);
      }
      const a = this.sequence;
      if (a.length === 1 && a[0].statementsProducer)
        return a[0].statementsProducer();
      {
        const o = [];
        for (const s of a) {
          const l = s.sql;
          Array.isArray(l) ? o.push(...l) : o.push(l);
        }
        return { pre: [], sql: o, check: null, post: [] };
      }
    }
  }
  return cn = t, cn;
}
var hn, _a;
function Hx() {
  if (_a)
    return hn;
  _a = 1;
  const r = We;
  class e extends r {
    constructor() {
      super(...arguments), this.modifiers = ["nullable", "defaultTo"], this._addCheckModifiers();
    }
    // Types
    // -------
    enu(n) {
      return `text check (${this.formatter.wrap(
        this.args[0]
      )} in ('${n.join("', '")}'))`;
    }
    _pushAlterCheckQuery(n, i) {
      throw new Error(
        "Alter table with to add constraints is not permitted in SQLite"
      );
    }
    checkRegex(n, i) {
      return this._check(
        `${this.formatter.wrap(
          this.getColumnName()
        )} REGEXP ${this.client._escapeBinding(n)}`,
        i
      );
    }
  }
  return e.prototype.json = "json", e.prototype.jsonb = "json", e.prototype.double = e.prototype.decimal = e.prototype.floating = "float", e.prototype.timestamp = "datetime", e.prototype.increments = e.prototype.bigincrements = "integer not null primary key autoincrement", hn = e, hn;
}
var dn, wa;
function Vx() {
  if (wa)
    return dn;
  wa = 1;
  var r = ps, e = Gu, t = _e, n = U;
  function i(a, o) {
    var s = n(a) ? r : e;
    return s(a, t(o));
  }
  return dn = i, dn;
}
var fn, $a;
function Wx() {
  if ($a)
    return fn;
  $a = 1;
  const r = Vx(), e = mc, t = oe, { isObject: n } = Q, i = ft, { formatDefault: a } = Ue;
  class o extends i {
    constructor() {
      super(...arguments);
    }
    // Create a new table.
    createQuery(l, u, h) {
      let d = (u ? "create table if not exists " : "create table ") + this.tableName();
      h && this.tableNameLike() ? d += " as select * from " + this.tableNameLike() + " where 0=1" : (d += " (" + l.sql.join(", "), d += this.foreignKeys() || "", d += this.primaryKeys() || "", d += this._addChecks(), d += ")"), this.pushQuery(d), h && this.addColumns(l, this.addColumnsPrefix);
    }
    addColumns(l, u, h) {
      if (u === this.alterColumnsPrefix) {
        const c = this, d = h.map((p) => {
          const g = this.client.customWrapIdentifier(
            p.getColumnName(),
            t,
            p.columnBuilder.queryContext()
          ), _ = p.getColumnType(), f = p.modified.defaultTo ? a(p.modified.defaultTo[0], p.type, this.client) : null, m = p.modified.nullable && p.modified.nullable[0] === !1;
          return { name: g, type: _, defaultTo: f, notNull: m };
        });
        this.pushQuery({
          sql: `PRAGMA table_info(${this.tableName()})`,
          statementsProducer(p, g) {
            return c.client.ddl(c, p, g).alterColumn(d);
          }
        });
      } else
        for (let c = 0, d = l.sql.length; c < d; c++)
          this.pushQuery({
            sql: `alter table ${this.tableName()} add column ${l.sql[c]}`,
            bindings: l.bindings[c]
          });
    }
    // Compile a drop unique key command.
    dropUnique(l, u) {
      u = u ? this.formatter.wrap(u) : this._indexCommand("unique", this.tableNameRaw, l), this.pushQuery(`drop index ${u}`);
    }
    // Compile a drop foreign key command.
    dropForeign(l, u) {
      const h = this;
      l = Array.isArray(l) ? l : [l], l = l.map(
        (c) => this.client.customWrapIdentifier(c, t)
      ), u = this.client.customWrapIdentifier(u, t), this.pushQuery({
        sql: `PRAGMA table_info(${this.tableName()})`,
        output(c) {
          return h.client.ddl(h, c, this.connection).dropForeign(l, u);
        }
      });
    }
    // Compile a drop primary key command.
    dropPrimary(l) {
      const u = this;
      l = this.client.customWrapIdentifier(l, t), this.pushQuery({
        sql: `PRAGMA table_info(${this.tableName()})`,
        output(h) {
          return u.client.ddl(u, h, this.connection).dropPrimary(l);
        }
      });
    }
    dropIndex(l, u) {
      u = u ? this.formatter.wrap(u) : this._indexCommand("index", this.tableNameRaw, l), this.pushQuery(`drop index ${u}`);
    }
    // Compile a unique key command.
    unique(l, u) {
      let h, c;
      n(u) && ({ indexName: u, deferrable: h, predicate: c } = u), h && h !== "not deferrable" && this.client.logger.warn(
        `sqlite3: unique index \`${u}\` will not be deferrable ${h} because sqlite3 does not support deferred constraints.`
      ), u = u ? this.formatter.wrap(u) : this._indexCommand("unique", this.tableNameRaw, l), l = this.formatter.columnize(l);
      const d = c ? " " + this.client.queryCompiler(c).where() : "";
      this.pushQuery(
        `create unique index ${u} on ${this.tableName()} (${l})${d}`
      );
    }
    // Compile a plain index key command.
    index(l, u, h) {
      u = u ? this.formatter.wrap(u) : this._indexCommand("index", this.tableNameRaw, l), l = this.formatter.columnize(l);
      let c;
      n(h) && ({ predicate: c } = h);
      const d = c ? " " + this.client.queryCompiler(c).where() : "";
      this.pushQuery(
        `create index ${u} on ${this.tableName()} (${l})${d}`
      );
    }
    /**
     * Add a primary key to an existing table.
     *
     * @NOTE The `createQuery` method above handles table creation. Don't do anything regarding table
     *       creation in this method
     *
     * @param {string | string[]} columns - Column name(s) to assign as primary keys
     * @param {string} [constraintName] - Custom name for the PK constraint
     */
    primary(l, u) {
      const h = this;
      l = Array.isArray(l) ? l : [l], l = l.map(
        (d) => this.client.customWrapIdentifier(d, t)
      );
      let c;
      n(u) && ({ constraintName: u, deferrable: c } = u), c && c !== "not deferrable" && this.client.logger.warn(
        `sqlite3: primary key constraint \`${u}\` will not be deferrable ${c} because sqlite3 does not support deferred constraints.`
      ), u = this.client.customWrapIdentifier(u, t), this.method !== "create" && this.method !== "createIfNot" && this.pushQuery({
        sql: `PRAGMA table_info(${this.tableName()})`,
        output(d) {
          return h.client.ddl(h, d, this.connection).primary(l, u);
        }
      });
    }
    /**
     * Add a foreign key constraint to an existing table
     *
     * @NOTE The `createQuery` method above handles foreign key constraints on table creation. Don't do
     *       anything regarding table creation in this method
     *
     * @param {object} foreignInfo - Information about the current column foreign setup
     * @param {string | string[]} [foreignInfo.column] - Column in the current constraint
     * @param {string | undefined} foreignInfo.keyName - Name of the foreign key constraint
     * @param {string | string[]} foreignInfo.references - What column it references in the other table
     * @param {string} foreignInfo.inTable - What table is referenced in this constraint
     * @param {string} [foreignInfo.onUpdate] - What to do on updates
     * @param {string} [foreignInfo.onDelete] - What to do on deletions
     */
    foreign(l) {
      const u = this;
      this.method !== "create" && this.method !== "createIfNot" && (l.column = Array.isArray(l.column) ? l.column : [l.column], l.column = l.column.map(
        (h) => this.client.customWrapIdentifier(h, t)
      ), l.inTable = this.client.customWrapIdentifier(
        l.inTable,
        t
      ), l.references = Array.isArray(l.references) ? l.references : [l.references], l.references = l.references.map(
        (h) => this.client.customWrapIdentifier(h, t)
      ), this.pushQuery({
        sql: `PRAGMA table_info(${this.tableName()})`,
        statementsProducer(h, c) {
          return u.client.ddl(u, h, c).foreign(l);
        }
      }));
    }
    primaryKeys() {
      const l = r(this.grouped.alterTable || [], { method: "primary" });
      if (l.length > 0 && l[0].args.length > 0) {
        const u = l[0].args[0];
        let h = l[0].args[1] || "";
        h && (h = " constraint " + this.formatter.wrap(h));
        const c = this.grouped.columns.filter((d) => d.builder._type === "increments").length > 0;
        return `,${h} ${c ? "unique" : "primary key"} (${this.formatter.columnize(u)})`;
      }
    }
    foreignKeys() {
      let l = "";
      const u = r(this.grouped.alterTable || [], {
        method: "foreign"
      });
      for (let h = 0, c = u.length; h < c; h++) {
        const d = u[h].args[0], p = this.formatter.columnize(d.column), g = this.formatter.columnize(d.references), _ = this.formatter.wrap(d.inTable);
        let f = d.keyName || "";
        f && (f = " constraint " + this.formatter.wrap(f)), l += `,${f} foreign key(${p}) references ${_}(${g})`, d.onDelete && (l += ` on delete ${d.onDelete}`), d.onUpdate && (l += ` on update ${d.onUpdate}`);
      }
      return l;
    }
    createTableBlock() {
      return this.getColumns().concat().join(",");
    }
    renameColumn(l, u) {
      this.pushQuery({
        sql: `alter table ${this.tableName()} rename ${this.formatter.wrap(
          l
        )} to ${this.formatter.wrap(u)}`
      });
    }
    _setNullableState(l, u) {
      const h = this;
      this.pushQuery({
        sql: `PRAGMA table_info(${this.tableName()})`,
        statementsProducer(c, d) {
          return h.client.ddl(h, c, d).setNullable(l, u);
        }
      });
    }
    dropColumn() {
      const l = this, h = e(arguments).map(
        (c) => this.client.customWrapIdentifier(c, t)
      );
      this.pushQuery({
        sql: `PRAGMA table_info(${this.tableName()})`,
        output(c) {
          return l.client.ddl(l, c, this.connection).dropColumn(h);
        }
      });
    }
  }
  return fn = o, fn;
}
var pn, Ca;
function zx() {
  if (Ca)
    return pn;
  Ca = 1;
  const r = pt, {
    columnize: e
  } = J;
  class t extends r {
    constructor(i, a) {
      super(i, a);
    }
    createOrReplace() {
      const i = this.columns, a = this.selectQuery.toString(), o = this.viewName(), s = i ? " (" + e(
        i,
        this.viewBuilder,
        this.client,
        this.bindingsHolder
      ) + ")" : "", l = `drop view if exists ${o}`, u = `create view ${o}${s} as ${a}`;
      this.pushQuery({
        sql: l
      }), this.pushQuery({
        sql: u
      });
    }
  }
  return pn = t, pn;
}
var mn, va;
function Jx() {
  if (va)
    return mn;
  va = 1;
  function r(s, l, u) {
    return `INSERT INTO "${l}" SELECT ${u === void 0 ? "*" : u.map((h) => `"${h}"`).join(", ")} FROM "${s}";`;
  }
  function e(s) {
    return `DROP TABLE "${s}"`;
  }
  function t(s, l) {
    return `ALTER TABLE "${s}" RENAME TO "${l}"`;
  }
  function n(s) {
    return `SELECT type, sql FROM sqlite_master WHERE (type='table' OR (type='index' AND sql IS NOT NULL)) AND tbl_name='${s}'`;
  }
  function i() {
    return "PRAGMA foreign_keys";
  }
  function a(s) {
    return `PRAGMA foreign_keys = ${s ? "ON" : "OFF"}`;
  }
  function o() {
    return "PRAGMA foreign_key_check";
  }
  return mn = {
    copyData: r,
    dropOriginal: e,
    renameTable: t,
    getTableSql: n,
    isForeignCheckEnabled: i,
    setForeignCheck: a,
    executeForeignCheck: o
  }, mn;
}
var gn, Ea;
function Kx() {
  if (Ea)
    return gn;
  Ea = 1;
  function r(e, t) {
    const n = new RegExp(
      Object.entries(t).map(([o, s]) => `(?<${o}>${s.source})`).join("|"),
      "yi"
    );
    let i = 0;
    const a = [];
    for (; i < e.length; ) {
      n.lastIndex = i;
      const o = e.match(n);
      if (o !== null) {
        const [s, l] = Object.entries(o.groups).find(
          ([u, h]) => h !== void 0
        );
        i += l.length, s.startsWith("_") || a.push({ type: s, text: l });
      } else
        throw new Error(
          `No matching tokenizer rule found at: [${e.substring(i)}]`
        );
    }
    return a;
  }
  return gn = {
    tokenize: r
  }, gn;
}
var yn, Ta;
function Gx() {
  if (Ta)
    return yn;
  Ta = 1;
  function r(u, h = (c) => c) {
    return function({ index: c = 0, input: d }) {
      let p = c;
      const g = [];
      for (const _ of u) {
        const f = _({ index: p, input: d });
        if (f.success)
          p = f.index, g.push(f.ast);
        else
          return f;
      }
      return { success: !0, ast: h(g), index: p, input: d };
    };
  }
  function e(u, h = (c) => c) {
    return function({ index: c = 0, input: d }) {
      for (const p of u) {
        const g = p({ index: c, input: d });
        if (g.success)
          return {
            success: !0,
            ast: h(g.ast),
            index: g.index,
            input: d
          };
      }
      return { success: !1, ast: null, index: c, input: d };
    };
  }
  function t(u, h = (c) => c) {
    return function({ index: c = 0, input: d }) {
      let p = {}, g = c;
      const _ = [];
      do
        p = u({ index: g, input: d }), p.success && (g = p.index, _.push(p.ast));
      while (p.success);
      return _.length > 0 ? { success: !0, ast: h(_), index: g, input: d } : { success: !1, ast: null, index: g, input: d };
    };
  }
  function n(u, h = (c) => c) {
    return function({ index: c = 0, input: d }) {
      const p = u({ index: c, input: d });
      return p.success ? {
        success: !0,
        ast: h(p.ast),
        index: p.index,
        input: d
      } : { success: !0, ast: h(null), index: c, input: d };
    };
  }
  function i(u, h = (c) => c) {
    return function({ index: c = 0, input: d }) {
      const p = u.do({ index: c, input: d });
      return p.success && u.next({ index: p.index, input: d }).success ? {
        success: !0,
        ast: h(p.ast),
        index: p.index,
        input: d
      } : { success: !1, ast: null, index: c, input: d };
    };
  }
  function a(u, h = (c) => c) {
    return function({ index: c = 0, input: d }) {
      const p = u.do({ index: c, input: d });
      return p.success && !u.not({ index: c, input: d }).success ? {
        success: !0,
        ast: h(p.ast),
        index: p.index,
        input: d
      } : { success: !1, ast: null, index: c, input: d };
    };
  }
  function o(u, h = (c) => c.text) {
    return function({ index: c = 0, input: d }) {
      const p = d[c];
      return p !== void 0 && (u.type === void 0 || u.type === p.type) && (u.text === void 0 || u.text.toUpperCase() === p.text.toUpperCase()) ? {
        success: !0,
        ast: h(p),
        index: c + 1,
        input: d
      } : { success: !1, ast: null, index: c, input: d };
    };
  }
  return yn = { s: r, a: e, m: t, o: n, l: i, n: a, t: o, e: function({ index: u = 0, input: h }) {
    return { success: !0, ast: null, index: u, input: h };
  }, f: function({ index: u = 0, input: h }) {
    return { success: u === h.length, ast: null, index: u, input: h };
  } }, yn;
}
var bn, Aa;
function Yx() {
  if (Aa)
    return bn;
  Aa = 1;
  const { tokenize: r } = Kx(), { s: e, a: t, m: n, o: i, l: a, n: o, t: s, e: l, f: u } = Gx(), h = {
    keyword: /(?:ABORT|ACTION|ADD|AFTER|ALL|ALTER|ALWAYS|ANALYZE|AND|AS|ASC|ATTACH|AUTOINCREMENT|BEFORE|BEGIN|BETWEEN|BY|CASCADE|CASE|CAST|CHECK|COLLATE|COLUMN|COMMIT|CONFLICT|CONSTRAINT|CREATE|CROSS|CURRENT|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|DATABASE|DEFAULT|DEFERRED|DEFERRABLE|DELETE|DESC|DETACH|DISTINCT|DO|DROP|END|EACH|ELSE|ESCAPE|EXCEPT|EXCLUSIVE|EXCLUDE|EXISTS|EXPLAIN|FAIL|FILTER|FIRST|FOLLOWING|FOR|FOREIGN|FROM|FULL|GENERATED|GLOB|GROUP|GROUPS|HAVING|IF|IGNORE|IMMEDIATE|IN|INDEX|INDEXED|INITIALLY|INNER|INSERT|INSTEAD|INTERSECT|INTO|IS|ISNULL|JOIN|KEY|LAST|LEFT|LIKE|LIMIT|MATCH|MATERIALIZED|NATURAL|NO|NOT|NOTHING|NOTNULL|NULL|NULLS|OF|OFFSET|ON|OR|ORDER|OTHERS|OUTER|OVER|PARTITION|PLAN|PRAGMA|PRECEDING|PRIMARY|QUERY|RAISE|RANGE|RECURSIVE|REFERENCES|REGEXP|REINDEX|RELEASE|RENAME|REPLACE|RESTRICT|RETURNING|RIGHT|ROLLBACK|ROW|ROWS|SAVEPOINT|SELECT|SET|TABLE|TEMP|TEMPORARY|THEN|TIES|TO|TRANSACTION|TRIGGER|UNBOUNDED|UNION|UNIQUE|UPDATE|USING|VACUUM|VALUES|VIEW|VIRTUAL|WHEN|WHERE|WINDOW|WITH|WITHOUT)(?=\s+|-|\(|\)|;|\+|\*|\/|%|==|=|<=|<>|<<|<|>=|>>|>|!=|,|&|~|\|\||\||\.)/,
    id: /"[^"]*(?:""[^"]*)*"|`[^`]*(?:``[^`]*)*`|\[[^[\]]*\]|[a-z_][a-z0-9_$]*/,
    string: /'[^']*(?:''[^']*)*'/,
    blob: /x'(?:[0-9a-f][0-9a-f])+'/,
    numeric: /(?:\d+(?:\.\d*)?|\.\d+)(?:e(?:\+|-)?\d+)?|0x[0-9a-f]+/,
    variable: /\?\d*|[@$:][a-z0-9_$]+/,
    operator: /-|\(|\)|;|\+|\*|\/|%|==|=|<=|<>|<<|<|>=|>>|>|!=|,|&|~|\|\||\||\./,
    _ws: /\s+/
  };
  function c(O) {
    const b = p({ input: r(O, h) });
    if (!b.success)
      throw new Error(
        `Parsing CREATE TABLE failed at [${b.input.slice(b.index).map((x) => x.text).join(" ")}] of "${O}"`
      );
    return b.ast;
  }
  function d(O) {
    const b = yt({ input: r(O, h) });
    if (!b.success)
      throw new Error(
        `Parsing CREATE INDEX failed at [${b.input.slice(b.index).map((x) => x.text).join(" ")}] of "${O}"`
      );
    return b.ast;
  }
  function p(O) {
    return e(
      [
        s({ text: "CREATE" }, (b) => null),
        g,
        s({ text: "TABLE" }, (b) => null),
        ue,
        ce,
        A,
        s({ text: "(" }, (b) => null),
        f,
        ee,
        s({ text: ")" }, (b) => null),
        _,
        u
      ],
      (b) => Object.assign({}, ...b.filter((x) => x !== null))
    )(O);
  }
  function g(O) {
    return t([s({ text: "TEMP" }), s({ text: "TEMPORARY" }), l], (b) => ({
      temporary: b !== null
    }))(O);
  }
  function _(O) {
    return i(e([s({ text: "WITHOUT" }), s({ text: "ROWID" })]), (b) => ({
      rowid: b !== null
    }))(O);
  }
  function f(O) {
    return t([
      e([m, s({ text: "," }), f], (b) => ({
        columns: [b[0]].concat(b[2].columns)
      })),
      e([m], (b) => ({ columns: [b[0]] }))
    ])(O);
  }
  function m(O) {
    return e(
      [e([we], (b) => ({ name: b[0] })), y, w],
      (b) => Object.assign({}, ...b)
    )(O);
  }
  function y(O) {
    return i(
      e(
        [
          n(s({ type: "id" })),
          t([
            e(
              [
                s({ text: "(" }),
                jt,
                s({ text: "," }),
                jt,
                s({ text: ")" })
              ],
              (b) => `(${b[1]}, ${b[3]})`
            ),
            e(
              [s({ text: "(" }), jt, s({ text: ")" })],
              (b) => `(${b[1]})`
            ),
            l
          ])
        ],
        (b) => `${b[0].join(" ")}${b[1] || ""}`
      ),
      (b) => ({ type: b })
    )(O);
  }
  function w(O) {
    return i(n($), (b) => ({
      constraints: Object.assign(
        {
          primary: null,
          notnull: null,
          null: null,
          unique: null,
          check: null,
          default: null,
          collate: null,
          references: null,
          as: null
        },
        ...b || []
      )
    }))(O);
  }
  function $(O) {
    return t([
      E,
      T,
      N,
      I,
      L,
      K,
      H,
      j,
      pe
    ])(O);
  }
  function E(O) {
    return e(
      [
        G,
        s({ text: "PRIMARY" }, (b) => null),
        s({ text: "KEY" }, (b) => null),
        jr,
        X,
        C
      ],
      (b) => ({ primary: Object.assign({}, ...b.filter((x) => x !== null)) })
    )(O);
  }
  function C(O) {
    return i(s({ text: "AUTOINCREMENT" }), (b) => ({
      autoincrement: b !== null
    }))(O);
  }
  function T(O) {
    return e(
      [
        G,
        s({ text: "NOT" }, (b) => null),
        s({ text: "NULL" }, (b) => null),
        X
      ],
      (b) => ({ notnull: Object.assign({}, ...b.filter((x) => x !== null)) })
    )(O);
  }
  function N(O) {
    return e(
      [G, s({ text: "NULL" }, (b) => null), X],
      (b) => ({ null: Object.assign({}, ...b.filter((x) => x !== null)) })
    )(O);
  }
  function I(O) {
    return e(
      [G, s({ text: "UNIQUE" }, (b) => null), X],
      (b) => ({ unique: Object.assign({}, ...b.filter((x) => x !== null)) })
    )(O);
  }
  function L(O) {
    return e(
      [
        G,
        s({ text: "CHECK" }, (b) => null),
        s({ text: "(" }, (b) => null),
        e([Se], (b) => ({ expression: b[0] })),
        s({ text: ")" }, (b) => null)
      ],
      (b) => ({ check: Object.assign({}, ...b.filter((x) => x !== null)) })
    )(O);
  }
  function K(O) {
    return e(
      [
        G,
        s({ text: "DEFAULT" }, (b) => null),
        t([
          e([s({ text: "(" }), Se, s({ text: ")" })], (b) => ({
            value: b[1],
            expression: !0
          })),
          e([Dc], (b) => ({ value: b[0], expression: !1 })),
          e([jt], (b) => ({ value: b[0], expression: !1 }))
        ])
      ],
      (b) => ({ default: Object.assign({}, ...b.filter((x) => x !== null)) })
    )(O);
  }
  function H(O) {
    return e(
      [
        G,
        s({ text: "COLLATE" }, (b) => null),
        s({ type: "id" }, (b) => ({ collation: b.text }))
      ],
      (b) => ({ collate: Object.assign({}, ...b.filter((x) => x !== null)) })
    )(O);
  }
  function j(O) {
    return e(
      [G, e([mt], (b) => b[0].references)],
      (b) => ({
        references: Object.assign({}, ...b.filter((x) => x !== null))
      })
    )(O);
  }
  function pe(O) {
    return e(
      [
        G,
        i(e([s({ text: "GENERATED" }), s({ text: "ALWAYS" })]), (b) => ({
          generated: b !== null
        })),
        s({ text: "AS" }, (b) => null),
        s({ text: "(" }, (b) => null),
        e([Se], (b) => ({ expression: b[0] })),
        s({ text: ")" }, (b) => null),
        t([s({ text: "STORED" }), s({ text: "VIRTUAL" }), l], (b) => ({
          mode: b ? b.toUpperCase() : null
        }))
      ],
      (b) => ({ as: Object.assign({}, ...b.filter((x) => x !== null)) })
    )(O);
  }
  function ee(O) {
    return i(n(e([s({ text: "," }), re], (b) => b[1])), (b) => ({
      constraints: b || []
    }))(O);
  }
  function re(O) {
    return t([
      te,
      W,
      Re,
      kt
    ])(O);
  }
  function te(O) {
    return e(
      [
        G,
        s({ text: "PRIMARY" }, (b) => null),
        s({ text: "KEY" }, (b) => null),
        s({ text: "(" }, (b) => null),
        ne,
        s({ text: ")" }, (b) => null),
        X
      ],
      (b) => Object.assign({ type: "PRIMARY KEY" }, ...b.filter((x) => x !== null))
    )(O);
  }
  function W(O) {
    return e(
      [
        G,
        s({ text: "UNIQUE" }, (b) => null),
        s({ text: "(" }, (b) => null),
        ne,
        s({ text: ")" }, (b) => null),
        X
      ],
      (b) => Object.assign({ type: "UNIQUE" }, ...b.filter((x) => x !== null))
    )(O);
  }
  function X(O) {
    return i(
      e(
        [
          s({ text: "ON" }),
          s({ text: "CONFLICT" }),
          t([
            s({ text: "ROLLBACK" }),
            s({ text: "ABORT" }),
            s({ text: "FAIL" }),
            s({ text: "IGNORE" }),
            s({ text: "REPLACE" })
          ])
        ],
        (b) => b[2]
      ),
      (b) => ({ conflict: b ? b.toUpperCase() : null })
    )(O);
  }
  function Re(O) {
    return e(
      [
        G,
        s({ text: "CHECK" }, (b) => null),
        s({ text: "(" }, (b) => null),
        e([Se], (b) => ({ expression: b[0] })),
        s({ text: ")" }, (b) => null)
      ],
      (b) => Object.assign({ type: "CHECK" }, ...b.filter((x) => x !== null))
    )(O);
  }
  function kt(O) {
    return e(
      [
        G,
        s({ text: "FOREIGN" }, (b) => null),
        s({ text: "KEY" }, (b) => null),
        s({ text: "(" }, (b) => null),
        Je,
        s({ text: ")" }, (b) => null),
        mt
      ],
      (b) => Object.assign({ type: "FOREIGN KEY" }, ...b.filter((x) => x !== null))
    )(O);
  }
  function mt(O) {
    return e(
      [
        s({ text: "REFERENCES" }, (b) => null),
        A,
        Ir,
        i(
          n(t([Pr, gt, Lr])),
          (b) => Object.assign({ delete: null, update: null, match: null }, ...b || [])
        ),
        Br
      ],
      (b) => ({ references: Object.assign({}, ...b.filter((x) => x !== null)) })
    )(O);
  }
  function Ir(O) {
    return i(
      e([s({ text: "(" }), Je, s({ text: ")" })], (b) => b[1]),
      (b) => ({ columns: b ? b.columns : [] })
    )(O);
  }
  function Je(O) {
    return e(
      [
        i(
          n(e([we, s({ text: "," })], (b) => b[0])),
          (b) => b !== null ? b : []
        ),
        we
      ],
      (b) => ({ columns: b[0].concat([b[1]]) })
    )(O);
  }
  function Pr(O) {
    return e([s({ text: "ON" }), s({ text: "DELETE" }), Ms], (b) => ({
      delete: b[2]
    }))(O);
  }
  function gt(O) {
    return e([s({ text: "ON" }), s({ text: "UPDATE" }), Ms], (b) => ({
      update: b[2]
    }))(O);
  }
  function Lr(O) {
    return e(
      [s({ text: "MATCH" }), t([s({ type: "keyword" }), s({ type: "id" })])],
      (b) => ({ match: b[1] })
    )(O);
  }
  function Br(O) {
    return i(
      e([
        i(s({ text: "NOT" })),
        s({ text: "DEFERRABLE" }),
        i(
          e(
            [
              s({ text: "INITIALLY" }),
              t([s({ text: "DEFERRED" }), s({ text: "IMMEDIATE" })])
            ],
            (b) => b[1].toUpperCase()
          )
        )
      ]),
      (b) => ({ deferrable: b ? { not: b[0] !== null, initially: b[2] } : null })
    )(O);
  }
  function G(O) {
    return i(
      e([s({ text: "CONSTRAINT" }), we], (b) => b[1]),
      (b) => ({ name: b })
    )(O);
  }
  function yt(O) {
    return e(
      [
        s({ text: "CREATE" }, (b) => null),
        kr,
        s({ text: "INDEX" }, (b) => null),
        ue,
        ce,
        v,
        s({ text: "ON" }, (b) => null),
        A,
        s({ text: "(" }, (b) => null),
        ne,
        s({ text: ")" }, (b) => null),
        V,
        u
      ],
      (b) => Object.assign({}, ...b.filter((x) => x !== null))
    )(O);
  }
  function kr(O) {
    return i(s({ text: "UNIQUE" }), (b) => ({ unique: b !== null }))(O);
  }
  function ue(O) {
    return i(
      e([s({ text: "IF" }), s({ text: "NOT" }), s({ text: "EXISTS" })]),
      (b) => ({ exists: b !== null })
    )(O);
  }
  function ce(O) {
    return i(
      e([we, s({ text: "." })], (b) => b[0]),
      (b) => ({ schema: b })
    )(O);
  }
  function v(O) {
    return e([we], (b) => ({ index: b[0] }))(O);
  }
  function A(O) {
    return e([we], (b) => ({ table: b[0] }))(O);
  }
  function V(O) {
    return i(
      e([s({ text: "WHERE" }), Se], (b) => b[1]),
      (b) => ({ where: b })
    )(O);
  }
  function ne(O) {
    return t([
      e([Bs, s({ text: "," }), ne], (b) => ({
        columns: [b[0]].concat(b[2].columns)
      })),
      e([ks, s({ text: "," }), ne], (b) => ({
        columns: [b[0]].concat(b[2].columns)
      })),
      a({ do: Bs, next: s({ text: ")" }) }, (b) => ({
        columns: [b]
      })),
      a({ do: ks, next: s({ text: ")" }) }, (b) => ({
        columns: [b]
      }))
    ])(O);
  }
  function Bs(O) {
    return e(
      [
        e([we], (b) => ({ name: b[0], expression: !1 })),
        js,
        jr
      ],
      (b) => Object.assign({}, ...b.filter((x) => x !== null))
    )(O);
  }
  function ks(O) {
    return e(
      [
        e([Qc], (b) => ({ name: b[0], expression: !0 })),
        js,
        jr
      ],
      (b) => Object.assign({}, ...b.filter((x) => x !== null))
    )(O);
  }
  function js(O) {
    return i(
      e([s({ text: "COLLATE" }), s({ type: "id" })], (b) => b[1]),
      (b) => ({ collation: b })
    )(O);
  }
  function jr(O) {
    return t([s({ text: "ASC" }), s({ text: "DESC" }), l], (b) => ({
      order: b ? b.toUpperCase() : null
    }))(O);
  }
  function Qc(O) {
    return n(
      t([
        o({
          do: s({ type: "keyword" }),
          not: t([
            s({ text: "COLLATE" }),
            s({ text: "ASC" }),
            s({ text: "DESC" })
          ])
        }),
        s({ type: "id" }),
        s({ type: "string" }),
        s({ type: "blob" }),
        s({ type: "numeric" }),
        s({ type: "variable" }),
        o({
          do: s({ type: "operator" }),
          not: t([s({ text: "(" }), s({ text: ")" }), s({ text: "," })])
        }),
        e([s({ text: "(" }), i(Se), s({ text: ")" })], (b) => b[1] || [])
      ])
    )(O);
  }
  function Se(O) {
    return n(
      t([
        s({ type: "keyword" }),
        s({ type: "id" }),
        s({ type: "string" }),
        s({ type: "blob" }),
        s({ type: "numeric" }),
        s({ type: "variable" }),
        o({
          do: s({ type: "operator" }),
          not: t([s({ text: "(" }), s({ text: ")" })])
        }),
        e([s({ text: "(" }), i(Se), s({ text: ")" })], (b) => b[1] || [])
      ])
    )(O);
  }
  function we(O) {
    return t(
      [s({ type: "id" }), s({ type: "string" })],
      (b) => /^["`['][^]*["`\]']$/.test(b) ? b.substring(1, b.length - 1) : b
    )(O);
  }
  function Ms(O) {
    return t(
      [
        e([s({ text: "SET" }), s({ text: "NULL" })], (b) => `${b[0]} ${b[1]}`),
        e([s({ text: "SET" }), s({ text: "DEFAULT" })], (b) => `${b[0]} ${b[1]}`),
        s({ text: "CASCADE" }),
        s({ text: "RESTRICT" }),
        e([s({ text: "NO" }), s({ text: "ACTION" })], (b) => `${b[0]} ${b[1]}`)
      ],
      (b) => b.toUpperCase()
    )(O);
  }
  function Dc(O) {
    return t([
      s({ type: "numeric" }),
      s({ type: "string" }),
      s({ type: "id" }),
      s({ type: "blob" }),
      s({ text: "NULL" }),
      s({ text: "TRUE" }),
      s({ text: "FALSE" }),
      s({ text: "CURRENT_TIME" }),
      s({ text: "CURRENT_DATE" }),
      s({ text: "CURRENT_TIMESTAMP" })
    ])(O);
  }
  function jt(O) {
    return e(
      [t([s({ text: "+" }), s({ text: "-" }), l]), s({ type: "numeric" })],
      (b) => `${b[0] || ""}${b[1]}`
    )(O);
  }
  return bn = {
    parseCreateTable: c,
    parseCreateIndex: d
  }, bn;
}
var _n, Oa;
function Xx() {
  if (Oa)
    return _n;
  Oa = 1;
  function r(v, A = (V) => V) {
    return t(v, A);
  }
  function e(v, A = (V) => V) {
    return X(v, A);
  }
  function t(v, A) {
    return `CREATE${n(v)} TABLE${kt(v)} ${mt(
      v,
      A
    )}${Je(v, A)} (${a(
      v,
      A
    )}${w(v, A)})${i(v)}`;
  }
  function n(v, A) {
    return v.temporary ? " TEMP" : "";
  }
  function i(v, A) {
    return v.rowid ? " WITHOUT ROWID" : "";
  }
  function a(v, A) {
    return v.columns.map((V) => o(V, A)).join(", ");
  }
  function o(v, A) {
    return `${ce(v.name, A)}${s(
      v
    )}${l(v.constraints, A)}`;
  }
  function s(v, A) {
    return v.type !== null ? ` ${v.type}` : "";
  }
  function l(v, A) {
    return `${u(v, A)}${c(
      v,
      A
    )}${d(v, A)}${p(
      v,
      A
    )}${g(v, A)}${_(
      v,
      A
    )}${f(v, A)}${m(
      v,
      A
    )}${y(v, A)}`;
  }
  function u(v, A) {
    return v.primary !== null ? ` ${W(v.primary, A)}PRIMARY KEY${yt(
      v.primary
    )}${T(v.primary)}${h(v.primary)}` : "";
  }
  function h(v, A) {
    return v.autoincrement ? " AUTOINCREMENT" : "";
  }
  function c(v, A) {
    return v.notnull !== null ? ` ${W(v.notnull, A)}NOT NULL${T(
      v.notnull
    )}` : "";
  }
  function d(v, A) {
    return v.null !== null ? ` ${W(v.null, A)}NULL${T(v.null)}` : "";
  }
  function p(v, A) {
    return v.unique !== null ? ` ${W(v.unique, A)}UNIQUE${T(
      v.unique
    )}` : "";
  }
  function g(v, A) {
    return v.check !== null ? ` ${W(v.check, A)}CHECK (${ue(
      v.check.expression
    )})` : "";
  }
  function _(v, A) {
    return v.default !== null ? ` ${W(v.default, A)}DEFAULT ${v.default.expression ? `(${ue(v.default.value)})` : v.default.value}` : "";
  }
  function f(v, A) {
    return v.collate !== null ? ` ${W(v.collate, A)}COLLATE ${v.collate.collation}` : "";
  }
  function m(v, A) {
    return v.references !== null ? ` ${W(v.references, A)}${L(
      v.references,
      A
    )}` : "";
  }
  function y(v, A) {
    return v.as !== null ? ` ${W(v.as, A)}${v.as.generated ? "GENERATED ALWAYS " : ""}AS (${ue(v.as.expression)})${v.as.mode !== null ? ` ${v.as.mode}` : ""}` : "";
  }
  function w(v, A) {
    return v.constraints.reduce(
      (V, ne) => `${V}, ${$(ne, A)}`,
      ""
    );
  }
  function $(v, A) {
    switch (v.type) {
      case "PRIMARY KEY":
        return E(v, A);
      case "UNIQUE":
        return C(v, A);
      case "CHECK":
        return N(v, A);
      case "FOREIGN KEY":
        return I(v, A);
    }
  }
  function E(v, A) {
    return `${W(v, A)}PRIMARY KEY (${gt(
      v,
      A
    )})${T(v)}`;
  }
  function C(v, A) {
    return `${W(v, A)}UNIQUE (${gt(
      v,
      A
    )})${T(v)}`;
  }
  function T(v, A) {
    return v.conflict !== null ? ` ON CONFLICT ${v.conflict}` : "";
  }
  function N(v, A) {
    return `${W(v, A)}CHECK (${ue(
      v.expression
    )})`;
  }
  function I(v, A) {
    return `${W(v, A)}FOREIGN KEY (${H(
      v,
      A
    )}) ${L(v.references, A)}`;
  }
  function L(v, A) {
    return `REFERENCES ${Je(v, A)}${K(
      v,
      A
    )}${j(v)}${te(v.deferrable)}`;
  }
  function K(v, A) {
    return v.columns.length > 0 ? ` (${H(v, A)})` : "";
  }
  function H(v, A) {
    return v.columns.map((V) => ce(V, A)).join(", ");
  }
  function j(v, A) {
    return `${pe(v)}${ee(
      v
    )}${re(v)}`;
  }
  function pe(v, A) {
    return v.delete !== null ? ` ON DELETE ${v.delete}` : "";
  }
  function ee(v, A) {
    return v.update !== null ? ` ON UPDATE ${v.update}` : "";
  }
  function re(v, A) {
    return v.match !== null ? ` MATCH ${v.match}` : "";
  }
  function te(v, A) {
    return v !== null ? ` ${v.not ? "NOT " : ""}DEFERRABLE${v.initially !== null ? ` INITIALLY ${v.initially}` : ""}` : "";
  }
  function W(v, A) {
    return v.name !== null ? `CONSTRAINT ${ce(v.name, A)} ` : "";
  }
  function X(v, A) {
    return `CREATE${Re(v)} INDEX${kt(v)} ${mt(
      v,
      A
    )}${Ir(v, A)} on ${Je(v, A)} (${gt(
      v,
      A
    )})${Pr(v)}`;
  }
  function Re(v, A) {
    return v.unique ? " UNIQUE" : "";
  }
  function kt(v, A) {
    return v.exists ? " IF NOT EXISTS" : "";
  }
  function mt(v, A) {
    return v.schema !== null ? `${ce(v.schema, A)}.` : "";
  }
  function Ir(v, A) {
    return ce(v.index, A);
  }
  function Je(v, A) {
    return ce(v.table, A);
  }
  function Pr(v, A) {
    return v.where !== null ? ` where ${ue(v.where)}` : "";
  }
  function gt(v, A) {
    return v.columns.map(
      (V) => V.expression ? Br(V) : Lr(V, A)
    ).join(", ");
  }
  function Lr(v, A) {
    return `${ce(v.name, A)}${G(v)}${yt(
      v
    )}`;
  }
  function Br(v, A) {
    return `${kr(v.name)}${G(v)}${yt(
      v
    )}`;
  }
  function G(v, A) {
    return v.collation !== null ? ` COLLATE ${v.collation}` : "";
  }
  function yt(v, A) {
    return v.order !== null ? ` ${v.order}` : "";
  }
  function kr(v, A) {
    return ue(v);
  }
  function ue(v, A) {
    return v.reduce(
      (V, ne) => Array.isArray(ne) ? `${V}(${ue(ne)})` : V ? `${V} ${ne}` : ne,
      ""
    );
  }
  function ce(v, A) {
    return A(v);
  }
  return _n = {
    compileCreateTable: r,
    compileCreateIndex: e
  }, _n;
}
var wn, Na;
function Zx() {
  if (Na)
    return wn;
  Na = 1;
  function r(t, n) {
    return t.toLowerCase() === n.toLowerCase();
  }
  function e(t, n) {
    return t.some((i) => r(i, n));
  }
  return wn = {
    isEqualId: r,
    includesId: e
  }, wn;
}
var $n, qa;
function eI() {
  if (qa)
    return $n;
  qa = 1;
  const r = oe, { nanonum: e } = Ns, {
    copyData: t,
    dropOriginal: n,
    renameTable: i,
    getTableSql: a,
    isForeignCheckEnabled: o,
    setForeignCheck: s,
    executeForeignCheck: l
  } = Jx(), { parseCreateTable: u, parseCreateIndex: h } = Yx(), {
    compileCreateTable: c,
    compileCreateIndex: d
  } = Xx(), { isEqualId: p, includesId: g } = Zx();
  class _ {
    constructor(m, y, w, $) {
      this.client = m, this.tableCompiler = y, this.pragma = w, this.tableNameRaw = this.tableCompiler.tableNameRaw, this.alteredName = `_knex_temp_alter${e(3)}`, this.connection = $, this.formatter = (E) => this.client.customWrapIdentifier(E, r), this.wrap = (E) => this.client.wrapIdentifierImpl(E);
    }
    tableName() {
      return this.formatter(this.tableNameRaw);
    }
    getTableSql() {
      const m = this.tableName();
      return this.client.transaction(
        async (y) => {
          y.disableProcessing();
          const w = await y.raw(a(m));
          return y.enableProcessing(), {
            createTable: w.filter(($) => $.type === "table")[0].sql,
            createIndices: w.filter(($) => $.type === "index").map(($) => $.sql)
          };
        },
        { connection: this.connection }
      );
    }
    async isForeignCheckEnabled() {
      return (await this.client.raw(o()).connection(this.connection))[0].foreign_keys === 1;
    }
    async setForeignCheck(m) {
      await this.client.raw(s(m)).connection(this.connection);
    }
    renameTable(m) {
      return m.raw(i(this.alteredName, this.tableName()));
    }
    dropOriginal(m) {
      return m.raw(n(this.tableName()));
    }
    copyData(m, y) {
      return m.raw(t(this.tableName(), this.alteredName, y));
    }
    async alterColumn(m) {
      const { createTable: y, createIndices: w } = await this.getTableSql(), $ = u(y);
      $.table = this.alteredName, $.columns = $.columns.map((C) => {
        const T = m.find((N) => p(N.name, C.name));
        return T && (C.type = T.type, C.constraints.default = T.defaultTo !== null ? {
          name: null,
          value: T.defaultTo,
          expression: !1
        } : null, C.constraints.notnull = T.notNull ? { name: null, conflict: null } : null, C.constraints.null = T.notNull ? null : C.constraints.null), C;
      });
      const E = c($, this.wrap);
      return this.generateAlterCommands(E, w);
    }
    async dropColumn(m) {
      const { createTable: y, createIndices: w } = await this.getTableSql(), $ = u(y);
      if ($.table = this.alteredName, $.columns = $.columns.filter(
        (N) => N.expression || !g(m, N.name)
      ), $.columns.length === 0)
        throw new Error("Unable to drop last column from table");
      $.constraints = $.constraints.filter((N) => N.type === "PRIMARY KEY" || N.type === "UNIQUE" ? N.columns.every(
        (I) => I.expression || !g(m, I.name)
      ) : N.type === "FOREIGN KEY" ? N.columns.every(
        (I) => !g(m, I)
      ) && (N.references.table !== $.table || N.references.columns.every(
        (I) => !g(m, I)
      )) : !0);
      const E = $.columns.map((N) => N.name), C = c($, this.wrap), T = [];
      for (const N of w) {
        const I = h(N);
        I.columns = I.columns.filter(
          (L) => L.expression || !g(m, L.name)
        ), I.columns.length > 0 && T.push(d(I, this.wrap));
      }
      return this.alter(C, T, E);
    }
    async dropForeign(m, y) {
      const { createTable: w, createIndices: $ } = await this.getTableSql(), E = u(w);
      E.table = this.alteredName, y || (E.columns = E.columns.map((T) => ({
        ...T,
        references: g(m, T.name) ? null : T.references
      }))), E.constraints = E.constraints.filter((T) => T.type === "FOREIGN KEY" ? y ? !T.name || !p(T.name, y) : T.columns.every(
        (N) => !g(m, N)
      ) : !0);
      const C = c(E, this.wrap);
      return this.alter(C, $);
    }
    async dropPrimary(m) {
      const { createTable: y, createIndices: w } = await this.getTableSql(), $ = u(y);
      $.table = this.alteredName, $.columns = $.columns.map((C) => ({
        ...C,
        primary: null
      })), $.constraints = $.constraints.filter((C) => C.type === "PRIMARY KEY" ? m ? !C.name || !p(C.name, m) : !1 : !0);
      const E = c($, this.wrap);
      return this.alter(E, w);
    }
    async primary(m, y) {
      const { createTable: w, createIndices: $ } = await this.getTableSql(), E = u(w);
      E.table = this.alteredName, E.columns = E.columns.map((T) => ({
        ...T,
        primary: null
      })), E.constraints = E.constraints.filter(
        (T) => T.type !== "PRIMARY KEY"
      ), E.constraints.push({
        type: "PRIMARY KEY",
        name: y || null,
        columns: m.map((T) => ({
          name: T,
          expression: !1,
          collation: null,
          order: null
        })),
        conflict: null
      });
      const C = c(E, this.wrap);
      return this.alter(C, $);
    }
    async foreign(m) {
      const { createTable: y, createIndices: w } = await this.getTableSql(), $ = u(y);
      $.table = this.alteredName, $.constraints.push({
        type: "FOREIGN KEY",
        name: m.keyName || null,
        columns: m.column,
        references: {
          table: m.inTable,
          columns: m.references,
          delete: m.onDelete || null,
          update: m.onUpdate || null,
          match: null,
          deferrable: null
        }
      });
      const E = c($, this.wrap);
      return this.generateAlterCommands(E, w);
    }
    async setNullable(m, y) {
      const { createTable: w, createIndices: $ } = await this.getTableSql(), E = u(w);
      E.table = this.alteredName;
      const C = E.columns.find(
        (N) => p(m, N.name)
      );
      if (!C)
        throw new Error(
          `.setNullable: Column ${m} does not exist in table ${this.tableName()}.`
        );
      C.constraints.notnull = y ? null : { name: null, conflict: null }, C.constraints.null = y ? C.constraints.null : null;
      const T = c(E, this.wrap);
      return this.generateAlterCommands(T, $);
    }
    async alter(m, y, w) {
      const $ = await this.isForeignCheckEnabled();
      $ && await this.setForeignCheck(!1);
      try {
        await this.client.transaction(
          async (E) => {
            await E.raw(m), await this.copyData(E, w), await this.dropOriginal(E), await this.renameTable(E);
            for (const C of y)
              await E.raw(C);
            if ($ && (await E.raw(l())).length > 0)
              throw new Error("FOREIGN KEY constraint failed");
          },
          { connection: this.connection }
        );
      } finally {
        $ && await this.setForeignCheck(!0);
      }
    }
    async generateAlterCommands(m, y, w) {
      const $ = [], E = [], C = [];
      let T = null;
      $.push(m), $.push(t(this.tableName(), this.alteredName, w)), $.push(n(this.tableName())), $.push(i(this.alteredName, this.tableName()));
      for (const I of y)
        $.push(I);
      return await this.isForeignCheckEnabled() && (E.push(s(!1)), C.push(s(!0)), T = l()), { pre: E, sql: $, check: T, post: C };
    }
  }
  return $n = _, $n;
}
var Cn, Ra;
function tI() {
  if (Ra)
    return Cn;
  Ra = 1;
  const r = Ne;
  return Cn = class extends r {
    withMaterialized(t, n, i) {
      return this._validateWithArgs(
        t,
        n,
        i,
        "with"
      ), this.withWrapped(
        t,
        n,
        i,
        !0
      );
    }
    withNotMaterialized(t, n, i) {
      return this._validateWithArgs(
        t,
        n,
        i,
        "with"
      ), this.withWrapped(
        t,
        n,
        i,
        !1
      );
    }
  }, Cn;
}
var vn, Sa;
function Ic() {
  if (Sa)
    return vn;
  Sa = 1;
  const r = Tu, e = He, { promisify: t } = P, n = ze, i = ht, a = Mx(), o = Qx(), s = Ux(), l = Hx(), u = Wx(), h = zx(), c = eI(), d = Rr, p = tI();
  class g extends n {
    constructor(f) {
      super(f), f.connection && f.connection.filename === void 0 && this.logger.warn(
        "Could not find `connection.filename` in config. Please specify the database path and name to avoid errors. (see docs https://knexjs.org/guide/#configuration-options)"
      ), f.useNullAsDefault === void 0 && this.logger.warn(
        "sqlite does not support inserting default values. Set the `useNullAsDefault` flag to hide this warning. (see docs https://knexjs.org/guide/query-builder.html#insert)."
      );
    }
    _driver() {
      return P;
    }
    schemaCompiler() {
      return new s(this, ...arguments);
    }
    transaction() {
      return new a(this, ...arguments);
    }
    queryCompiler(f, m) {
      return new o(this, f, m);
    }
    queryBuilder() {
      return new p(this);
    }
    viewCompiler(f, m) {
      return new h(this, f, m);
    }
    columnCompiler() {
      return new l(this, ...arguments);
    }
    tableCompiler() {
      return new u(this, ...arguments);
    }
    ddl(f, m, y) {
      return new c(this, f, m, y);
    }
    wrapIdentifierImpl(f) {
      return f !== "*" ? `\`${f.replace(/`/g, "``")}\`` : "*";
    }
    // Get a raw connection from the database, returning a promise with the connection object.
    acquireRawConnection() {
      return new Promise((f, m) => {
        let y = this.driver.OPEN_READWRITE | this.driver.OPEN_CREATE;
        if (this.connectionSettings.flags) {
          if (!Array.isArray(this.connectionSettings.flags))
            throw new Error("flags must be an array of strings");
          this.connectionSettings.flags.forEach(($) => {
            if (!$.startsWith("OPEN_") || !this.driver[$])
              throw new Error(`flag ${$} not supported by node-sqlite3`);
            y = y | this.driver[$];
          });
        }
        const w = new this.driver.Database(
          this.connectionSettings.filename,
          y,
          ($) => {
            if ($)
              return m($);
            f(w);
          }
        );
      });
    }
    // Used to explicitly close a connection, called internally by the pool when
    // a connection times out or the pool is shutdown.
    async destroyRawConnection(f) {
      return t((y) => f.close(y))();
    }
    // Runs the query on the specified connection, providing the bindings and any
    // other necessary prep work.
    _query(f, m) {
      if (!m.sql)
        throw new Error("The query is empty");
      const { method: y } = m;
      let w;
      switch (y) {
        case "insert":
        case "update":
          w = m.returning ? "all" : "run";
          break;
        case "counter":
        case "del":
          w = "run";
          break;
        default:
          w = "all";
      }
      return new Promise(function($, E) {
        if (!f || !f[w])
          return E(
            new Error(`Error calling ${w} on connection.`)
          );
        f[w](m.sql, m.bindings, function(C, T) {
          return C ? E(C) : (m.response = T, m.context = this, $(m));
        });
      });
    }
    _stream(f, m, y) {
      if (!m.sql)
        throw new Error("The query is empty");
      const w = this;
      return new Promise(function($, E) {
        return y.on("error", E), y.on("end", $), w._query(f, m).then((C) => C.response).then((C) => C.forEach((T) => y.write(T))).catch(function(C) {
          y.emit("error", C);
        }).then(function() {
          y.end();
        });
      });
    }
    // Ensures the response is returned in the same format as other clients.
    processResponse(f, m) {
      const y = f.context, { response: w, returning: $ } = f;
      if (f.output)
        return f.output.call(m, w);
      switch (f.method) {
        case "select":
          return w;
        case "first":
          return w[0];
        case "pluck":
          return e(w, f.pluck);
        case "insert":
          return $ && w ? w : [y.lastID];
        case "update":
          return $ && w ? w : y.changes;
        case "del":
        case "counter":
          return y.changes;
        default:
          return w;
      }
    }
    poolDefaults() {
      return r({ min: 1, max: 1 }, super.poolDefaults());
    }
    formatter(f) {
      return new d(this, f);
    }
    values(f, m, y) {
      return Array.isArray(f) ? Array.isArray(f[0]) ? `( values ${f.map(
        (w) => `(${this.parameterize(w, void 0, m, y)})`
      ).join(", ")})` : `(${this.parameterize(f, void 0, m, y)})` : f instanceof i ? `(${this.parameter(f, m, y)})` : this.parameter(f, m, y);
    }
  }
  return Object.assign(g.prototype, {
    dialect: "sqlite3",
    driverName: "sqlite3"
  }), vn = g, vn;
}
var En, xa;
function rI() {
  if (xa)
    return En;
  xa = 1;
  const r = Ic();
  class e extends r {
    _driver() {
      return P;
    }
    // Get a raw connection from the database, returning a promise with the connection object.
    async acquireRawConnection() {
      return new this.driver(this.connectionSettings.filename);
    }
    // Used to explicitly close a connection, called internally by the pool when
    // a connection times out or the pool is shutdown.
    async destroyRawConnection(n) {
      return n.close();
    }
    // Runs the query on the specified connection, providing the bindings and any
    // other necessary prep work.
    async _query(n, i) {
      if (!i.sql)
        throw new Error("The query is empty");
      if (!n)
        throw new Error("No connection provided");
      const a = n.prepare(i.sql), o = this._formatBindings(i.bindings);
      if (a.reader) {
        const l = await a.all(o);
        return i.response = l, i;
      }
      const s = await a.run(o);
      return i.response = s, i.context = {
        lastID: s.lastInsertRowid,
        changes: s.changes
      }, i;
    }
    _formatBindings(n) {
      return n ? n.map((i) => i instanceof Date ? i.valueOf() : typeof i == "boolean" ? Number(i) : i) : [];
    }
  }
  return Object.assign(e.prototype, {
    // The "dialect", for reference .
    driverName: "better-sqlite3"
  }), En = e, En;
}
var Tn, Ia;
function Pc() {
  if (Ia)
    return Tn;
  Ia = 1;
  const r = Oe;
  class e extends r {
    begin(n) {
      return this.isolationLevel ? this.query(n, `BEGIN ISOLATION LEVEL ${this.isolationLevel};`) : this.query(n, "BEGIN;");
    }
  }
  return Tn = e, Tn;
}
var An, Pa;
function Ss() {
  if (Pa)
    return An;
  Pa = 1;
  const r = oe, e = It, t = Ve, {
    wrapString: n,
    columnize: i,
    operator: a,
    wrap: o
  } = J;
  class s extends t {
    constructor(u, h, c) {
      super(u, h, c), this._defaultInsertValue = "default";
    }
    // Compiles a truncate query.
    truncate() {
      return `truncate ${this.tableName} restart identity`;
    }
    // is used if the an array with multiple empty values supplied
    // Compiles an `insert` query, allowing for multiple
    // inserts using a single query statement.
    insert() {
      let u = super.insert();
      if (u === "")
        return u;
      const { returning: h, onConflict: c, ignore: d, merge: p, insert: g } = this.single;
      if (c && d && (u += this._ignore(c)), c && p) {
        u += this._merge(p.updates, c, g);
        const _ = this.where();
        _ && (u += ` ${_}`);
      }
      return h && (u += this._returning(h)), {
        sql: u,
        returning: h
      };
    }
    // Compiles an `update` query, allowing for a return value.
    update() {
      const u = this.with(), h = this._prepUpdate(this.single.update), c = this.where(), { returning: d } = this.single;
      return {
        sql: u + `update ${this.single.only ? "only " : ""}${this.tableName} set ${h.join(", ")}` + (c ? ` ${c}` : "") + this._returning(d),
        returning: d
      };
    }
    using() {
      const u = this.single.using;
      if (!u)
        return;
      let h = "using ";
      return Array.isArray(u) ? h += u.map((c) => this.formatter.wrap(c)).join(",") : h += this.formatter.wrap(u), h;
    }
    // Compiles an `delete` query, allowing for a return value.
    del() {
      const { tableName: u } = this, h = this.with();
      let c = this.where() || "", d = this.using() || "";
      const p = this.grouped.join, g = [];
      if (Array.isArray(p)) {
        for (const m of p) {
          g.push(
            o(
              this._joinTable(m),
              void 0,
              this.builder,
              this.client,
              this.bindingsHolder
            )
          );
          const y = [];
          for (const w of m.clauses)
            y.push(
              this.whereBasic({
                column: w.column,
                operator: "=",
                value: w.value,
                asColumn: !0
              })
            );
          y.length > 0 && (c += (c ? " and " : "where ") + y.join(" and "));
        }
        g.length > 0 && (d += (d ? "," : "using ") + g.join(","));
      }
      const _ = h + `delete from ${this.single.only ? "only " : ""}${u}` + (d ? ` ${d}` : "") + (c ? ` ${c}` : ""), { returning: f } = this.single;
      return {
        sql: _ + this._returning(f),
        returning: f
      };
    }
    aggregate(u) {
      return this._aggregate(u, { distinctParentheses: !0 });
    }
    _returning(u) {
      return u ? ` returning ${this.formatter.columnize(u)}` : "";
    }
    _ignore(u) {
      return u === !0 ? " on conflict do nothing" : ` on conflict ${this._onConflictClause(u)} do nothing`;
    }
    _merge(u, h, c) {
      let d = ` on conflict ${this._onConflictClause(h)} do update set `;
      if (u && Array.isArray(u))
        return d += u.map(
          (p) => n(
            p.split(".").pop(),
            this.formatter.builder,
            this.client,
            this.formatter
          )
        ).map((p) => `${p} = excluded.${p}`).join(", "), d;
      if (u && typeof u == "object") {
        const p = this._prepUpdate(u);
        return typeof p == "string" ? d += p : d += p.join(","), d;
      } else {
        const p = this._prepInsert(c);
        if (typeof p == "string")
          throw new Error(
            "If using merge with a raw insert query, then updates must be provided"
          );
        return d += p.columns.map(
          (g) => n(g.split(".").pop(), this.builder, this.client)
        ).map((g) => `${g} = excluded.${g}`).join(", "), d;
      }
    }
    // Join array of table names and apply default schema.
    _tableNames(u) {
      const h = this.single.schema, c = [];
      for (let d = 0; d < u.length; d++) {
        let p = u[d];
        p && (h && (p = `${h}.${p}`), c.push(this.formatter.wrap(p)));
      }
      return c.join(", ");
    }
    _lockingClause(u) {
      const h = this.single.lockTables || [];
      return u + (h.length ? " of " + this._tableNames(h) : "");
    }
    _groupOrder(u, h) {
      return super._groupOrderNulls(u, h);
    }
    forUpdate() {
      return this._lockingClause("for update");
    }
    forShare() {
      return this._lockingClause("for share");
    }
    forNoKeyUpdate() {
      return this._lockingClause("for no key update");
    }
    forKeyShare() {
      return this._lockingClause("for key share");
    }
    skipLocked() {
      return "skip locked";
    }
    noWait() {
      return "nowait";
    }
    // Compiles a columnInfo query
    columnInfo() {
      const u = this.single.columnInfo;
      let h = this.single.schema;
      const c = this.client.customWrapIdentifier(this.single.table, r);
      h && (h = this.client.customWrapIdentifier(h, r));
      const d = "select * from information_schema.columns where table_name = ? and table_catalog = current_database()", p = [c];
      return this._buildColumnInfoQuery(h, d, p, u);
    }
    _buildColumnInfoQuery(u, h, c, d) {
      return u ? (h += " and table_schema = ?", c.push(u)) : h += " and table_schema = current_schema()", {
        sql: h,
        bindings: c,
        output(p) {
          const g = e(
            p.rows,
            function(_, f) {
              return _[f.column_name] = {
                type: f.data_type,
                maxLength: f.character_maximum_length,
                nullable: f.is_nullable === "YES",
                defaultValue: f.column_default
              }, _;
            },
            {}
          );
          return d && g[d] || g;
        }
      };
    }
    distinctOn(u) {
      return "distinct on (" + this.formatter.columnize(u) + ") ";
    }
    // Json functions
    jsonExtract(u) {
      return this._jsonExtract("jsonb_path_query", u);
    }
    jsonSet(u) {
      return this._jsonSet(
        "jsonb_set",
        Object.assign({}, u, {
          path: this.client.toPathForJson(u.path)
        })
      );
    }
    jsonInsert(u) {
      return this._jsonSet(
        "jsonb_insert",
        Object.assign({}, u, {
          path: this.client.toPathForJson(u.path)
        })
      );
    }
    jsonRemove(u) {
      const h = `${i(
        u.column,
        this.builder,
        this.client,
        this.bindingsHolder
      )} #- ${this.client.parameter(
        this.client.toPathForJson(u.path),
        this.builder,
        this.bindingsHolder
      )}`;
      return u.alias ? this.client.alias(h, this.formatter.wrap(u.alias)) : h;
    }
    whereJsonPath(u) {
      let h = "";
      return !isNaN(u.value) && parseInt(u.value) ? h = "::int" : !isNaN(u.value) && parseFloat(u.value) ? h = "::float" : h = " #>> '{}'", `jsonb_path_query_first(${this._columnClause(
        u
      )}, ${this.client.parameter(
        u.jsonPath,
        this.builder,
        this.bindingsHolder
      )})${h} ${a(
        u.operator,
        this.builder,
        this.client,
        this.bindingsHolder
      )} ${this._jsonValueClause(u)}`;
    }
    whereJsonSupersetOf(u) {
      return this._not(
        u,
        `${o(
          u.column,
          void 0,
          this.builder,
          this.client,
          this.bindingsHolder
        )} @> ${this._jsonValueClause(u)}`
      );
    }
    whereJsonSubsetOf(u) {
      return this._not(
        u,
        `${i(
          u.column,
          this.builder,
          this.client,
          this.bindingsHolder
        )} <@ ${this._jsonValueClause(u)}`
      );
    }
    onJsonPathEquals(u) {
      return this._onJsonPathEquals("jsonb_path_query_first", u);
    }
  }
  return An = s, An;
}
var On, La;
function nI() {
  if (La)
    return On;
  La = 1;
  const r = Ne;
  return On = class extends r {
    using(t) {
      return this._single.using = t, this;
    }
    withMaterialized(t, n, i) {
      return this._validateWithArgs(
        t,
        n,
        i,
        "with"
      ), this.withWrapped(
        t,
        n,
        i,
        !0
      );
    }
    withNotMaterialized(t, n, i) {
      return this._validateWithArgs(
        t,
        n,
        i,
        "with"
      ), this.withWrapped(
        t,
        n,
        i,
        !1
      );
    }
  }, On;
}
var Nn, Ba;
function xs() {
  if (Ba)
    return Nn;
  Ba = 1;
  const r = We, { isObject: e } = Q, { toNumber: t } = z, n = new RegExp("(?<!')'(?!')", "g");
  class i extends r {
    constructor(s, l, u) {
      super(s, l, u), this.modifiers = ["nullable", "defaultTo", "comment"], this._addCheckModifiers();
    }
    // Types
    // ------
    bit(s) {
      return s.length !== !1 ? `bit(${s.length})` : "bit";
    }
    // Create the column definition for an enum type.
    // Using method "2" here: http://stackoverflow.com/a/10984951/525714
    enu(s, l) {
      l = l || {};
      const u = l.useNative && l.existingType ? void 0 : s.join("', '");
      if (l.useNative) {
        let h = "";
        const c = l.schemaName || this.tableCompiler.schemaNameRaw;
        return c && (h += `"${c}".`), h += `"${l.enumName}"`, l.existingType || this.tableCompiler.unshiftQuery(
          `create type ${h} as enum ('${u}')`
        ), h;
      }
      return `text check (${this.formatter.wrap(this.args[0])} in ('${u}'))`;
    }
    decimal(s, l) {
      return s === null ? "decimal" : `decimal(${t(s, 8)}, ${t(l, 2)})`;
    }
    json(s) {
      return s && this.client.logger.deprecate("json(true)", "jsonb()"), a(this.client, s);
    }
    jsonb() {
      return a(this.client, !0);
    }
    checkRegex(s, l) {
      return this._check(
        `${this.formatter.wrap(
          this.getColumnName()
        )} ~ ${this.client._escapeBinding(s)}`,
        l
      );
    }
    datetime(s = !1, l) {
      let u;
      return e(s) ? { useTz: u, precision: l } = s : u = !s, u = typeof u == "boolean" ? u : !0, l = l != null ? "(" + l + ")" : "", `${u ? "timestamptz" : "timestamp"}${l}`;
    }
    timestamp(s = !1, l) {
      return this.datetime(s, l);
    }
    // Modifiers:
    // ------
    comment(s) {
      const l = this.args[0] || this.defaults("columnName"), u = s ? `'${s.replace(n, "''")}'` : "NULL";
      this.pushAdditional(function() {
        this.pushQuery(
          `comment on column ${this.tableCompiler.tableName()}.` + this.formatter.wrap(l) + ` is ${u}`
        );
      }, s);
    }
    increments(s = { primaryKey: !0 }) {
      return "serial" + (this.tableCompiler._canBeAddPrimaryKey(s) ? " primary key" : "");
    }
    bigincrements(s = { primaryKey: !0 }) {
      return "bigserial" + (this.tableCompiler._canBeAddPrimaryKey(s) ? " primary key" : "");
    }
    uuid(s = { primaryKey: !1 }) {
      return "uuid" + (this.tableCompiler._canBeAddPrimaryKey(s) ? " primary key" : "");
    }
  }
  i.prototype.bigint = "bigint", i.prototype.binary = "bytea", i.prototype.bool = "boolean", i.prototype.double = "double precision", i.prototype.floating = "real", i.prototype.smallint = "smallint", i.prototype.tinyint = "smallint";
  function a(o, s) {
    return !o.version || o.config.client === "cockroachdb" || o.config.jsonbSupport === !0 || parseFloat(o.version) >= 9.2 ? s ? "jsonb" : "json" : "text";
  }
  return Nn = i, Nn;
}
var qn, ka;
function Is() {
  if (ka)
    return qn;
  ka = 1;
  const r = Cr, e = ft, { isObject: t, isString: n } = Q;
  class i extends e {
    constructor(o, s) {
      super(o, s);
    }
    // Compile a rename column command.
    renameColumn(o, s) {
      return this.pushQuery({
        sql: `alter table ${this.tableName()} rename ${this.formatter.wrap(
          o
        )} to ${this.formatter.wrap(s)}`
      });
    }
    _setNullableState(o, s) {
      const l = s ? "drop not null" : "set not null", u = `alter table ${this.tableName()} alter column ${this.formatter.wrap(
        o
      )} ${l}`;
      return this.pushQuery({
        sql: u
      });
    }
    compileAdd(o) {
      const s = this.formatter.wrap(o), l = this.prefixArray("add column", this.getColumns(o));
      return this.pushQuery({
        sql: `alter table ${s} ${l.join(", ")}`
      });
    }
    // Adds the "create" query to the query sequence.
    createQuery(o, s, l) {
      const u = s ? "create table if not exists " : "create table ", h = ` (${o.sql.join(", ")}${this.primaryKeys() || ""}${this._addChecks()})`;
      let c = u + this.tableName() + (l && this.tableNameLike() ? " (like " + this.tableNameLike() + " including all" + (o.sql.length ? ", " + o.sql.join(", ") : "") + ")" : h);
      this.single.inherits && (c += ` inherits (${this.formatter.wrap(this.single.inherits)})`), this.pushQuery({
        sql: c,
        bindings: o.bindings
      }), r(this.single, "comment") && this.comment(this.single.comment);
    }
    primaryKeys() {
      const o = (this.grouped.alterTable || []).filter(
        (s) => s.method === "primary"
      );
      if (o.length > 0 && o[0].args.length > 0) {
        const s = o[0].args[0];
        let l = o[0].args[1] || "", u;
        return t(l) && ({ constraintName: l, deferrable: u } = l), u = u ? ` deferrable initially ${u}` : "", l = l ? this.formatter.wrap(l) : this.formatter.wrap(`${this.tableNameRaw}_pkey`), `, constraint ${l} primary key (${this.formatter.columnize(
          s
        )})${u}`;
      }
    }
    addColumns(o, s, l) {
      if (s === this.alterColumnsPrefix)
        for (const u of l)
          this._addColumn(u);
      else
        super.addColumns(o, s);
    }
    _addColumn(o) {
      const s = this.tableName(), l = o.getColumnType(), u = this.client.wrapIdentifier(
        o.getColumnName(),
        o.columnBuilder.queryContext()
      ), h = o.type === "enu";
      this.pushQuery({
        sql: `alter table ${s} alter column ${u} drop default`,
        bindings: []
      });
      const c = o.columnBuilder.alterNullable;
      c && this.pushQuery({
        sql: `alter table ${s} alter column ${u} drop not null`,
        bindings: []
      }), o.columnBuilder.alterType && this.pushQuery({
        sql: `alter table ${s} alter column ${u} type ${l} using (${u}${h ? "::text::" : "::"}${l})`,
        bindings: []
      });
      const p = o.modified.defaultTo;
      if (p) {
        const g = o.defaultTo.apply(o, p);
        this.pushQuery({
          sql: `alter table ${s} alter column ${u} set ${g}`,
          bindings: []
        });
      }
      if (c) {
        const g = o.modified.nullable;
        g && g[0] === !1 && this.pushQuery({
          sql: `alter table ${s} alter column ${u} set not null`,
          bindings: []
        });
      }
    }
    // Compiles the comment on the table.
    comment(o) {
      this.pushQuery(
        `comment on table ${this.tableName()} is '${this.single.comment}'`
      );
    }
    // Indexes:
    // -------
    primary(o, s) {
      let l;
      t(s) && ({ constraintName: s, deferrable: l } = s), l = l ? ` deferrable initially ${l}` : "", s = s ? this.formatter.wrap(s) : this.formatter.wrap(`${this.tableNameRaw}_pkey`), this.method !== "create" && this.method !== "createIfNot" && this.pushQuery(
        `alter table ${this.tableName()} add constraint ${s} primary key (${this.formatter.columnize(
          o
        )})${l}`
      );
    }
    unique(o, s) {
      let l, u = !0, h;
      if (t(s) && ({ indexName: s, deferrable: l, useConstraint: u, predicate: h } = s, u === void 0 && (u = !!l || !h)), !u && l && l !== "not deferrable")
        throw new Error("postgres cannot create deferrable index");
      if (u && h)
        throw new Error("postgres cannot create constraint with predicate");
      if (l = l ? ` deferrable initially ${l}` : "", s = s ? this.formatter.wrap(s) : this._indexCommand("unique", this.tableNameRaw, o), u)
        this.pushQuery(
          `alter table ${this.tableName()} add constraint ${s} unique (` + this.formatter.columnize(o) + ")" + l
        );
      else {
        const c = h ? " " + this.client.queryCompiler(h).where() : "";
        this.pushQuery(
          `create unique index ${s} on ${this.tableName()} (${this.formatter.columnize(
            o
          )})${c}`
        );
      }
    }
    index(o, s, l) {
      s = s ? this.formatter.wrap(s) : this._indexCommand("index", this.tableNameRaw, o);
      let u, h;
      n(l) ? h = l : t(l) && ({ indexType: h, predicate: u } = l);
      const c = u ? " " + this.client.queryCompiler(u).where() : "";
      this.pushQuery(
        `create index ${s} on ${this.tableName()}${h && ` using ${h}` || ""} (` + this.formatter.columnize(o) + `)${c}`
      );
    }
    dropPrimary(o) {
      o = o ? this.formatter.wrap(o) : this.formatter.wrap(this.tableNameRaw + "_pkey"), this.pushQuery(
        `alter table ${this.tableName()} drop constraint ${o}`
      );
    }
    dropIndex(o, s) {
      s = s ? this.formatter.wrap(s) : this._indexCommand("index", this.tableNameRaw, o), s = this.schemaNameRaw ? `${this.formatter.wrap(this.schemaNameRaw)}.${s}` : s, this.pushQuery(`drop index ${s}`);
    }
    dropUnique(o, s) {
      s = s ? this.formatter.wrap(s) : this._indexCommand("unique", this.tableNameRaw, o), this.pushQuery(
        `alter table ${this.tableName()} drop constraint ${s}`
      );
    }
    dropForeign(o, s) {
      s = s ? this.formatter.wrap(s) : this._indexCommand("foreign", this.tableNameRaw, o), this.pushQuery(
        `alter table ${this.tableName()} drop constraint ${s}`
      );
    }
  }
  return qn = i, qn;
}
var Rn, ja;
function Ps() {
  if (ja)
    return Rn;
  ja = 1;
  const r = pt;
  class e extends r {
    constructor(n, i) {
      super(n, i);
    }
    renameColumn(n, i) {
      return this.pushQuery({
        sql: `alter view ${this.viewName()} rename ${this.formatter.wrap(
          n
        )} to ${this.formatter.wrap(i)}`
      });
    }
    defaultTo(n, i) {
      return this.pushQuery({
        sql: `alter view ${this.viewName()} alter ${this.formatter.wrap(
          n
        )} set default ${i}`
      });
    }
    createOrReplace() {
      this.createQuery(this.columns, this.selectQuery, !1, !0);
    }
    createMaterializedView() {
      this.createQuery(this.columns, this.selectQuery, !0);
    }
  }
  return Rn = e, Rn;
}
var Sn, Ma;
function iI() {
  if (Ma)
    return Sn;
  Ma = 1;
  const r = Bt;
  class e extends r {
    constructor() {
      super(...arguments);
    }
    checkOption() {
      this._single.checkOption = "default_option";
    }
    localCheckOption() {
      this._single.checkOption = "local";
    }
    cascadedCheckOption() {
      this._single.checkOption = "cascaded";
    }
  }
  return Sn = e, Sn;
}
var xn, Qa;
function Lc() {
  if (Qa)
    return xn;
  Qa = 1;
  const r = dt;
  class e extends r {
    constructor(n, i) {
      super(n, i);
    }
    // Check whether the current table
    hasTable(n) {
      let i = "select * from information_schema.tables where table_name = ?";
      const a = [n];
      this.schema ? (i += " and table_schema = ?", a.push(this.schema)) : i += " and table_schema = current_schema()", this.pushQuery({
        sql: i,
        bindings: a,
        output(o) {
          return o.rows.length > 0;
        }
      });
    }
    // Compile the query to determine if a column exists in a table.
    hasColumn(n, i) {
      let a = "select * from information_schema.columns where table_name = ? and column_name = ?";
      const o = [n, i];
      this.schema ? (a += " and table_schema = ?", o.push(this.schema)) : a += " and table_schema = current_schema()", this.pushQuery({
        sql: a,
        bindings: o,
        output(s) {
          return s.rows.length > 0;
        }
      });
    }
    qualifiedTableName(n) {
      const i = this.schema ? `${this.schema}.${n}` : n;
      return this.formatter.wrap(i);
    }
    // Compile a rename table command.
    renameTable(n, i) {
      this.pushQuery(
        `alter table ${this.qualifiedTableName(
          n
        )} rename to ${this.formatter.wrap(i)}`
      );
    }
    createSchema(n) {
      this.pushQuery(`create schema ${this.formatter.wrap(n)}`);
    }
    createSchemaIfNotExists(n) {
      this.pushQuery(
        `create schema if not exists ${this.formatter.wrap(n)}`
      );
    }
    dropSchema(n, i = !1) {
      this.pushQuery(
        `drop schema ${this.formatter.wrap(n)}${i ? " cascade" : ""}`
      );
    }
    dropSchemaIfExists(n, i = !1) {
      this.pushQuery(
        `drop schema if exists ${this.formatter.wrap(n)}${i ? " cascade" : ""}`
      );
    }
    dropExtension(n) {
      this.pushQuery(`drop extension ${this.formatter.wrap(n)}`);
    }
    dropExtensionIfExists(n) {
      this.pushQuery(
        `drop extension if exists ${this.formatter.wrap(n)}`
      );
    }
    createExtension(n) {
      this.pushQuery(`create extension ${this.formatter.wrap(n)}`);
    }
    createExtensionIfNotExists(n) {
      this.pushQuery(
        `create extension if not exists ${this.formatter.wrap(n)}`
      );
    }
    renameView(n, i) {
      this.pushQuery(
        this.alterViewPrefix + `${this.formatter.wrap(n)} rename to ${this.formatter.wrap(i)}`
      );
    }
    refreshMaterializedView(n, i = !1) {
      this.pushQuery({
        sql: `refresh materialized view${i ? " concurrently" : ""} ${this.formatter.wrap(n)}`
      });
    }
    dropMaterializedView(n) {
      this._dropView(n, !1, !0);
    }
    dropMaterializedViewIfExists(n) {
      this._dropView(n, !0, !0);
    }
  }
  return xn = e, xn;
}
var In, Da;
function xr() {
  if (Da)
    return In;
  Da = 1;
  const r = Ar, e = He, { promisify: t } = P, n = ze, i = Pc(), a = Ss(), o = nI(), s = xs(), l = Is(), u = Ps(), h = iI(), c = Lc(), { makeEscape: d } = os, { isString: p } = Q;
  class g extends n {
    constructor(m) {
      super(m), m.returning && (this.defaultReturning = m.returning), m.searchPath && (this.searchPath = m.searchPath);
    }
    transaction() {
      return new i(this, ...arguments);
    }
    queryBuilder() {
      return new o(this);
    }
    queryCompiler(m, y) {
      return new a(this, m, y);
    }
    columnCompiler() {
      return new s(this, ...arguments);
    }
    schemaCompiler() {
      return new c(this, ...arguments);
    }
    tableCompiler() {
      return new l(this, ...arguments);
    }
    viewCompiler() {
      return new u(this, ...arguments);
    }
    viewBuilder() {
      return new h(this, ...arguments);
    }
    _driver() {
      return P;
    }
    wrapIdentifierImpl(m) {
      if (m === "*")
        return m;
      let y = "";
      const w = m.match(/(.*?)(\[[0-9]+\])/);
      return w && (m = w[1], y = w[2]), `"${m.replace(/"/g, '""')}"${y}`;
    }
    _acquireOnlyConnection() {
      const m = new this.driver.Client(this.connectionSettings);
      return m.connect().then(() => m);
    }
    // Get a raw connection, called by the `pool` whenever a new
    // connection needs to be added to the pool.
    acquireRawConnection() {
      const m = this;
      return this._acquireOnlyConnection().then(function(y) {
        return y.on("error", (w) => {
          y.__knex__disposed = w;
        }), y.on("end", (w) => {
          y.__knex__disposed = w || "Connection ended unexpectedly";
        }), m.version ? y : m.checkVersion(y).then(function(w) {
          return m.version = w, y;
        });
      }).then(async function(w) {
        return await m.setSchemaSearchPath(w), w;
      });
    }
    // Used to explicitly close a connection, called internally by the pool
    // when a connection times out or the pool is shutdown.
    async destroyRawConnection(m) {
      return t((w) => m.end(w))();
    }
    // In PostgreSQL, we need to do a version check to do some feature
    // checking on the database.
    checkVersion(m) {
      return new Promise((y, w) => {
        m.query("select version();", ($, E) => {
          if ($)
            return w($);
          y(this._parseVersion(E.rows[0].version));
        });
      });
    }
    _parseVersion(m) {
      return /^PostgreSQL (.*?)( |$)/.exec(m)[1];
    }
    // Position the bindings for the query. The escape sequence for question mark
    // is \? (e.g. knex.raw("\\?") since javascript requires '\' to be escaped too...)
    positionBindings(m) {
      let y = 0;
      return m.replace(/(\\*)(\?)/g, function(w, $) {
        return $.length % 2 ? "?" : (y++, `$${y}`);
      });
    }
    setSchemaSearchPath(m, y) {
      let w = y || this.searchPath;
      if (!w)
        return Promise.resolve(!0);
      if (!Array.isArray(w) && !p(w))
        throw new TypeError(
          `knex: Expected searchPath to be Array/String, got: ${typeof w}`
        );
      if (p(w)) {
        if (w.includes(",")) {
          const E = `[${w.split(",").map((C) => `'${C}'`).join(", ")}]`;
          this.logger.warn(
            `Detected comma in searchPath "${w}".If you are trying to specify multiple schemas, use Array syntax: ${E}`
          );
        }
        w = [w];
      }
      return w = w.map(($) => `"${$}"`).join(","), new Promise(function($, E) {
        m.query(`set search_path to ${w}`, function(C) {
          if (C)
            return E(C);
          $(!0);
        });
      });
    }
    _stream(m, y, w, $) {
      if (!y.sql)
        throw new Error("The query is empty");
      const E = process.browser ? void 0 : P, C = y.sql;
      return new Promise(function(T, N) {
        const I = m.query(
          new E(C, y.bindings, $)
        );
        I.on("error", function(L) {
          N(L), w.emit("error", L);
        }), w.on("end", T), I.pipe(w);
      });
    }
    // Runs the query on the specified connection, providing the bindings
    // and any other necessary prep work.
    _query(m, y) {
      if (!y.sql)
        throw new Error("The query is empty");
      let w = {
        text: y.sql,
        values: y.bindings || []
      };
      return y.options && (w = r(w, y.options)), new Promise(function($, E) {
        m.query(w, function(C, T) {
          if (C)
            return E(C);
          y.response = T, $(y);
        });
      });
    }
    // Ensures the response is returned in the same format as other clients.
    processResponse(m, y) {
      const w = m.response;
      if (m.output)
        return m.output.call(y, w);
      if (m.method === "raw")
        return w;
      const { returning: $ } = m;
      if (w.command === "SELECT")
        return m.method === "first" ? w.rows[0] : m.method === "pluck" ? e(w.rows, m.pluck) : w.rows;
      if ($) {
        const E = [];
        for (let C = 0, T = w.rows.length; C < T; C++) {
          const N = w.rows[C];
          E[C] = N;
        }
        return E;
      }
      return w.command === "UPDATE" || w.command === "DELETE" ? w.rowCount : w;
    }
    async cancelQuery(m) {
      const y = await this.acquireRawConnection();
      try {
        return await this._wrappedCancelQueryCall(y, m);
      } finally {
        await this.destroyRawConnection(y).catch((w) => {
          this.logger.warn(`Connection Error: ${w}`);
        });
      }
    }
    _wrappedCancelQueryCall(m, y) {
      return this._query(m, {
        sql: "SELECT pg_cancel_backend($1);",
        bindings: [y.processID],
        options: {}
      });
    }
    toPathForJson(m) {
      const y = /^{.*}$/;
      return m.match(y) ? m : "{" + m.replace(/^(\$\.)/, "").replace(".", ",").replace(/\[([0-9]+)]/, ",$1") + // transform [number] to ,number
      "}";
    }
  }
  Object.assign(g.prototype, {
    dialect: "postgresql",
    driverName: "pg",
    canCancelQuery: !0,
    _escapeBinding: d({
      escapeArray(f, m) {
        return m(_(f, m));
      },
      escapeString(f) {
        let m = !1, y = "'";
        for (let w = 0; w < f.length; w++) {
          const $ = f[w];
          $ === "'" ? y += $ + $ : $ === "\\" ? (y += $ + $, m = !0) : y += $;
        }
        return y += "'", m === !0 && (y = "E" + y), y;
      },
      escapeObject(f, m, y, w = []) {
        if (f && typeof f.toPostgres == "function") {
          if (w = w || [], w.indexOf(f) !== -1)
            throw new Error(
              `circular reference detected while preparing "${f}" for query`
            );
          return w.push(f), m(f.toPostgres(m), w);
        }
        return JSON.stringify(f);
      }
    })
  });
  function _(f, m) {
    let y = "{";
    for (let w = 0; w < f.length; w++) {
      w > 0 && (y += ",");
      const $ = f[w];
      $ === null || typeof $ > "u" ? y += "NULL" : Array.isArray($) ? y += _($, m) : typeof $ == "number" ? y += $ : y += JSON.stringify(typeof $ == "string" ? $ : m($));
    }
    return y + "}";
  }
  return In = g, In;
}
var Pn, Fa;
function sI() {
  if (Fa)
    return Pn;
  Fa = 1;
  const r = Ss(), {
    columnize: e,
    wrap: t,
    operator: n
  } = J;
  class i extends r {
    truncate() {
      return `truncate ${this.tableName}`;
    }
    upsert() {
      let o = this._upsert();
      if (o === "")
        return o;
      const { returning: s } = this.single;
      return s && (o += this._returning(s)), {
        sql: o,
        returning: s
      };
    }
    _upsert() {
      const o = this.single.upsert || [], s = this.with() + `upsert into ${this.tableName} `, l = this._insertBody(o);
      return l === "" ? "" : s + l;
    }
    _groupOrder(o, s) {
      return this._basicGroupOrder(o, s);
    }
    whereJsonPath(o) {
      let s = "";
      return !isNaN(o.value) && parseInt(o.value) ? s = "::int" : !isNaN(o.value) && parseFloat(o.value) ? s = "::float" : s = " #>> '{}'", `json_extract_path(${this._columnClause(
        o
      )}, ${this.client.toArrayPathFromJsonPath(
        o.jsonPath,
        this.builder,
        this.bindingsHolder
      )})${s} ${n(
        o.operator,
        this.builder,
        this.client,
        this.bindingsHolder
      )} ${this._jsonValueClause(o)}`;
    }
    // Json common functions
    _jsonExtract(o, s) {
      let l;
      return Array.isArray(s.column) ? l = s.column : l = [s], l.map((u) => {
        const h = `json_extract_path(${e(
          u.column || u[0],
          this.builder,
          this.client,
          this.bindingsHolder
        )}, ${this.client.toArrayPathFromJsonPath(
          u.path || u[1],
          this.builder,
          this.bindingsHolder
        )})`, c = u.alias || u[2];
        return c ? this.client.alias(h, this.formatter.wrap(c)) : h;
      }).join(", ");
    }
    _onJsonPathEquals(o, s) {
      return "json_extract_path(" + t(
        s.columnFirst,
        void 0,
        this.builder,
        this.client,
        this.bindingsHolder
      ) + ", " + this.client.toArrayPathFromJsonPath(
        s.jsonPathFirst,
        this.builder,
        this.bindingsHolder
      ) + ") = json_extract_path(" + t(
        s.columnSecond,
        void 0,
        this.builder,
        this.client,
        this.bindingsHolder
      ) + ", " + this.client.toArrayPathFromJsonPath(
        s.jsonPathSecond,
        this.builder,
        this.bindingsHolder
      ) + ")";
    }
  }
  return Pn = i, Pn;
}
var Ln, Ua;
function oI() {
  if (Ua)
    return Ln;
  Ua = 1;
  const r = xs();
  class e extends r {
    uuid(n = { primaryKey: !1 }) {
      return "uuid" + (this.tableCompiler._canBeAddPrimaryKey(n) ? " primary key default gen_random_uuid()" : "");
    }
  }
  return Ln = e, Ln;
}
var Bn, Ha;
function aI() {
  if (Ha)
    return Bn;
  Ha = 1;
  const r = Is();
  class e extends r {
    constructor(n, i) {
      super(n, i);
    }
    addColumns(n, i, a) {
      if (i === this.alterColumnsPrefix)
        for (const o of a)
          this.client.logger.warn(
            "Experimental alter column in use, see issue: https://github.com/cockroachdb/cockroach/issues/49329"
          ), this.pushQuery({
            sql: "SET enable_experimental_alter_column_type_general = true",
            bindings: []
          }), super._addColumn(o);
      else
        super.addColumns(n, i);
    }
    dropUnique(n, i) {
      i = i ? this.formatter.wrap(i) : this._indexCommand("unique", this.tableNameRaw, n), this.pushQuery(`drop index ${this.tableName()}@${i} cascade `);
    }
  }
  return Bn = e, Bn;
}
var kn, Va;
function lI() {
  if (Va)
    return kn;
  Va = 1;
  const r = Ps();
  class e extends r {
    renameColumn(n, i) {
      throw new Error("rename column of views is not supported by this dialect.");
    }
    defaultTo(n, i) {
      throw new Error(
        "change default values of views is not supported by this dialect."
      );
    }
  }
  return kn = e, kn;
}
var jn, Wa;
function uI() {
  if (Wa)
    return jn;
  Wa = 1;
  const r = Ne, e = le;
  return jn = class extends r {
    upsert(n, i, a) {
      return this._method = "upsert", e(i) || this.returning(i, a), this._single.upsert = n, this;
    }
  }, jn;
}
var Mn, za;
function cI() {
  if (za)
    return Mn;
  za = 1;
  const r = xr(), e = Pc(), t = sI(), n = oI(), i = aI(), a = lI(), o = uI();
  class s extends r {
    transaction() {
      return new e(this, ...arguments);
    }
    queryCompiler(u, h) {
      return new t(this, u, h);
    }
    columnCompiler() {
      return new n(this, ...arguments);
    }
    tableCompiler() {
      return new i(this, ...arguments);
    }
    viewCompiler() {
      return new a(this, ...arguments);
    }
    queryBuilder() {
      return new o(this);
    }
    _parseVersion(u) {
      return u.split(" ")[2];
    }
    async cancelQuery(u) {
      try {
        return await this._wrappedCancelQueryCall(null, u);
      } catch (h) {
        throw this.logger.warn(`Connection Error: ${h}`), h;
      }
    }
    _wrappedCancelQueryCall(u, h) {
      if (!(h.activeQuery.processID === 0 && h.activeQuery.secretKey === 0))
        return h.cancel(
          h,
          h.activeQuery
        );
    }
    toArrayPathFromJsonPath(u, h, c) {
      return u.replace(/^(\$\.)/, "").replace(/\[([0-9]+)]/, ".$1").split(".").map(
        (function(d) {
          return this.parameter(d, h, c);
        }).bind(this)
      ).join(", ");
    }
  }
  return Object.assign(s.prototype, {
    // The "dialect", for reference elsewhere.
    driverName: "cockroachdb"
  }), Mn = s, Mn;
}
var Qn, Ja;
function hI() {
  if (Ja)
    return Qn;
  Ja = 1;
  function r(e) {
    return e == null;
  }
  return Qn = r, Qn;
}
var Dn, Ka;
function dI() {
  if (Ka)
    return Dn;
  Ka = 1;
  const r = Rr;
  class e extends r {
    // Accepts a string or array of columns to wrap as appropriate.
    columnizeWithPrefix(n, i) {
      const a = typeof i == "string" ? [i] : i;
      let o = "", s = -1;
      for (; ++s < a.length; )
        s > 0 && (o += ", "), o += n + this.wrap(a[s]);
      return o;
    }
    /**
     * Returns its argument with single quotes escaped, so it can be included into a single-quoted string.
     *
     * For example, it converts "has'quote" to "has''quote".
     *
     * This assumes QUOTED_IDENTIFIER ON so it is only ' that need escaping,
     * never ", because " cannot be used to quote a string when that's on;
     * otherwise we'd need to be aware of whether the string is quoted with " or '.
     *
     * This assumption is consistent with the SQL Knex generates.
     * @param {string} string
     * @returns {string}
     */
    escapingStringDelimiters(n) {
      return (n || "").replace(/'/g, "''");
    }
  }
  return Dn = e, Dn;
}
var Fn, Ga;
function fI() {
  if (Ga)
    return Fn;
  Ga = 1;
  const r = Oe, e = ae("knex:tx");
  class t extends r {
    begin(s) {
      return e("transaction::begin id=%s", this.txid), new Promise((l, u) => {
        s.beginTransaction(
          (h) => {
            if (h)
              return e(
                "transaction::begin error id=%s message=%s",
                this.txid,
                h.message
              ), u(h);
            l();
          },
          this.outerTx ? this.txid : void 0,
          n(this.isolationLevel)
        );
      }).then(this._resolver, this._rejecter);
    }
    savepoint(s) {
      return e("transaction::savepoint id=%s", this.txid), new Promise((l, u) => {
        s.saveTransaction(
          (h) => {
            if (h)
              return e(
                "transaction::savepoint id=%s message=%s",
                this.txid,
                h.message
              ), u(h);
            this.trxClient.emit("query", {
              __knexUid: this.trxClient.__knexUid,
              __knexTxId: this.trxClient.__knexTxId,
              autogenerated: !0,
              sql: this.outerTx ? `SAVE TRANSACTION [${this.txid}]` : "SAVE TRANSACTION"
            }), l();
          },
          this.outerTx ? this.txid : void 0
        );
      });
    }
    commit(s, l) {
      return e("transaction::commit id=%s", this.txid), new Promise((u, h) => {
        s.commitTransaction(
          (c) => {
            if (c)
              return e(
                "transaction::commit error id=%s message=%s",
                this.txid,
                c.message
              ), h(c);
            this._completed = !0, u(l);
          },
          this.outerTx ? this.txid : void 0
        );
      }).then(() => this._resolver(l), this._rejecter);
    }
    release(s, l) {
      return this._resolver(l);
    }
    rollback(s, l) {
      return this._completed = !0, e("transaction::rollback id=%s", this.txid), new Promise((u, h) => {
        if (!s.inTransaction)
          return h(
            l || new Error("Transaction rejected with non-error: undefined")
          );
        if (s.state.name !== "LoggedIn")
          return h(
            new Error(
              "Can't rollback transaction. There is a request in progress"
            )
          );
        s.rollbackTransaction(
          (c) => {
            c && e(
              "transaction::rollback error id=%s message=%s",
              this.txid,
              c.message
            ), h(
              c || l || new Error("Transaction rejected with non-error: undefined")
            );
          },
          this.outerTx ? this.txid : void 0
        );
      }).catch((u) => {
        if (!l && this.doNotRejectOnRollback) {
          this._resolver();
          return;
        }
        if (l)
          try {
            u.originalError = l;
          } catch {
          }
        this._rejecter(u);
      });
    }
    rollbackTo(s, l) {
      return this.rollback(s, l).then(
        () => void this.trxClient.emit("query", {
          __knexUid: this.trxClient.__knexUid,
          __knexTxId: this.trxClient.__knexTxId,
          autogenerated: !0,
          sql: "ROLLBACK TRANSACTION"
        })
      );
    }
  }
  Fn = t;
  function n(o) {
    if (!o)
      return;
    o = o.toUpperCase().replace(" ", "_");
    const s = i[o];
    if (!s)
      throw new Error(
        `Unknown Isolation level, was expecting one of: ${JSON.stringify(
          a
        )}`
      );
    return s;
  }
  const i = {
    READ_UNCOMMITTED: 1,
    READ_COMMITTED: 2,
    REPEATABLE_READ: 3,
    SERIALIZABLE: 4,
    SNAPSHOT: 5
  }, a = Object.keys(i).map(
    (o) => o.toLowerCase().replace("_", " ")
  );
  return Fn;
}
var Un, Ya;
function pI() {
  if (Ya)
    return Un;
  Ya = 1;
  const r = Ve, e = qs, t = oe, n = le, i = ht, {
    columnize: a
  } = J, o = [
    "columns",
    "join",
    "lock",
    "where",
    "union",
    "group",
    "having",
    "order",
    "limit",
    "offset"
  ];
  class s extends r {
    constructor(u, h, c) {
      super(u, h, c);
      const { onConflict: d } = this.single;
      if (d)
        throw new Error(".onConflict() is not supported for mssql.");
      this._emptyInsertValue = "default values";
    }
    with() {
      const u = [];
      if (this.grouped.with)
        for (const c of this.grouped.with)
          c.recursive && (u.push(c), c.recursive = !1);
      const h = super.with();
      for (const c of u)
        c.recursive = !0;
      return h;
    }
    select() {
      const u = this.with(), h = o.map((c) => this[c](this));
      return u + e(h).join(" ");
    }
    //#region Insert
    // Compiles an "insert" query, allowing for multiple
    // inserts using a single query statement.
    insert() {
      return this.single.options && this.single.options.includeTriggerModifications ? this.insertWithTriggers() : this.standardInsert();
    }
    insertWithTriggers() {
      const u = this.single.insert || [], { returning: h } = this.single;
      let c = this.with() + `${this._buildTempTable(h)}insert into ${this.tableName} `;
      const d = h ? this._returning("insert", h, !0) + " " : "";
      if (Array.isArray(u)) {
        if (u.length === 0)
          return "";
      } else if (typeof u == "object" && n(u))
        return {
          sql: c + d + this._emptyInsertValue + this._buildReturningSelect(h),
          returning: h
        };
      return c += this._buildInsertData(u, d), h && (c += this._buildReturningSelect(h)), {
        sql: c,
        returning: h
      };
    }
    _buildInsertData(u, h) {
      let c = "";
      const d = this._prepInsert(u);
      if (typeof d == "string")
        c += d;
      else if (d.columns.length)
        c += `(${this.formatter.columnize(d.columns)}`, c += `) ${h}values (` + this._buildInsertValues(d) + ")";
      else if (u.length === 1 && u[0])
        c += h + this._emptyInsertValue;
      else
        return "";
      return c;
    }
    standardInsert() {
      const u = this.single.insert || [];
      let h = this.with() + `insert into ${this.tableName} `;
      const { returning: c } = this.single, d = c ? this._returning("insert", c) + " " : "";
      if (Array.isArray(u)) {
        if (u.length === 0)
          return "";
      } else if (typeof u == "object" && n(u))
        return {
          sql: h + d + this._emptyInsertValue,
          returning: c
        };
      return h += this._buildInsertData(u, d), {
        sql: h,
        returning: c
      };
    }
    //#endregion
    //#region Update
    // Compiles an `update` query, allowing for a return value.
    update() {
      return this.single.options && this.single.options.includeTriggerModifications ? this.updateWithTriggers() : this.standardUpdate();
    }
    updateWithTriggers() {
      const u = this.top(), h = this.with(), c = this._prepUpdate(this.single.update), d = this.join(), p = this.where(), g = this.order(), { returning: _ } = this.single, f = this._buildTempTable(_);
      return {
        sql: h + f + `update ${u ? u + " " : ""}${this.tableName} set ` + c.join(", ") + (_ ? ` ${this._returning("update", _, !0)}` : "") + (d ? ` from ${this.tableName} ${d}` : "") + (p ? ` ${p}` : "") + (g ? ` ${g}` : "") + (_ ? this._buildReturningSelect(_) : this._returning("rowcount", "@@rowcount")),
        returning: _ || "@@rowcount"
      };
    }
    _formatGroupsItemValue(u, h) {
      const c = super._formatGroupsItemValue(u);
      if (h && !(u instanceof i)) {
        const d = `IIF(${c} is null,`;
        if (h === "first")
          return `${d}0,1)`;
        if (h === "last")
          return `${d}1,0)`;
      }
      return c;
    }
    standardUpdate() {
      const u = this.top(), h = this.with(), c = this._prepUpdate(this.single.update), d = this.join(), p = this.where(), g = this.order(), { returning: _ } = this.single;
      return {
        sql: h + `update ${u ? u + " " : ""}${this.tableName} set ` + c.join(", ") + (_ ? ` ${this._returning("update", _)}` : "") + (d ? ` from ${this.tableName} ${d}` : "") + (p ? ` ${p}` : "") + (g ? ` ${g}` : "") + (_ ? "" : this._returning("rowcount", "@@rowcount")),
        returning: _ || "@@rowcount"
      };
    }
    //#endregion
    //#region Delete
    // Compiles a `delete` query.
    del() {
      return this.single.options && this.single.options.includeTriggerModifications ? this.deleteWithTriggers() : this.standardDelete();
    }
    deleteWithTriggers() {
      const u = this.with(), { tableName: h } = this, c = this.where(), d = this.join(), { returning: p } = this.single, g = p ? ` ${this._returning("del", p, !0)}` : "", _ = d ? `${h}${g} ` : "";
      return {
        sql: u + `${this._buildTempTable(
          p
        )}delete ${_}from ${h}` + (d ? "" : g) + (d ? ` ${d}` : "") + (c ? ` ${c}` : "") + (p ? this._buildReturningSelect(p) : this._returning("rowcount", "@@rowcount")),
        returning: p || "@@rowcount"
      };
    }
    standardDelete() {
      const u = this.with(), { tableName: h } = this, c = this.where(), d = this.join(), { returning: p } = this.single, g = p ? ` ${this._returning("del", p)}` : "", _ = d ? `${h}${g} ` : "";
      return {
        sql: u + `delete ${_}from ${h}` + (d ? "" : g) + (d ? ` ${d}` : "") + (c ? ` ${c}` : "") + (p ? "" : this._returning("rowcount", "@@rowcount")),
        returning: p || "@@rowcount"
      };
    }
    //#endregion
    // Compiles the columns in the query, specifying if an item was distinct.
    columns() {
      let u = "";
      if (this.onlyUnions())
        return "";
      const h = this.top(), c = this._hintComments(), d = this.grouped.columns || [];
      let p = -1, g = [];
      if (d)
        for (; ++p < d.length; ) {
          const f = d[p];
          if (f.distinct && (u = "distinct "), f.distinctOn) {
            u = this.distinctOn(f.value);
            continue;
          }
          f.type === "aggregate" ? g.push(...this.aggregate(f)) : f.type === "aggregateRaw" ? g.push(this.aggregateRaw(f)) : f.type === "analytic" ? g.push(this.analytic(f)) : f.type === "json" ? g.push(this.json(f)) : f.value && f.value.length > 0 && g.push(this.formatter.columnize(f.value));
        }
      return g.length === 0 && (g = ["*"]), `${this.onlyJson() ? "" : "select "}${c}${u}` + (h ? h + " " : "") + g.join(", ") + (this.tableName ? ` from ${this.tableName}` : "");
    }
    _returning(u, h, c) {
      switch (u) {
        case "update":
        case "insert":
          return h ? `output ${this.formatter.columnizeWithPrefix("inserted.", h)}${c ? " into #out" : ""}` : "";
        case "del":
          return h ? `output ${this.formatter.columnizeWithPrefix("deleted.", h)}${c ? " into #out" : ""}` : "";
        case "rowcount":
          return h ? ";select @@rowcount" : "";
      }
    }
    _buildTempTable(u) {
      if (u && u.length > 0) {
        let h = "";
        Array.isArray(u) ? h = u.map((d) => `[t].${this.formatter.columnize(d)}`).join(",") : h = `[t].${this.formatter.columnize(u)}`;
        let c = `select top(0) ${h} into #out `;
        return c += `from ${this.tableName} as t `, c += `left join ${this.tableName} on 0=1;`, c;
      }
      return "";
    }
    _buildReturningSelect(u) {
      if (u && u.length > 0) {
        let h = "";
        Array.isArray(u) ? h = u.map((d) => `${this.formatter.columnize(d)}`).join(",") : h = this.formatter.columnize(u);
        let c = `; select ${h} from #out; `;
        return c += "drop table #out;", c;
      }
      return "";
    }
    // Compiles a `truncate` query.
    truncate() {
      return `truncate table ${this.tableName}`;
    }
    forUpdate() {
      return "with (UPDLOCK)";
    }
    forShare() {
      return "with (HOLDLOCK)";
    }
    // Compiles a `columnInfo` query.
    columnInfo() {
      const u = this.single.columnInfo;
      let h = this.single.schema;
      const c = this.client.customWrapIdentifier(this.single.table, t);
      h && (h = this.client.customWrapIdentifier(h, t));
      let d = "select [COLUMN_NAME], [COLUMN_DEFAULT], [DATA_TYPE], [CHARACTER_MAXIMUM_LENGTH], [IS_NULLABLE] from INFORMATION_SCHEMA.COLUMNS where table_name = ? and table_catalog = ?";
      const p = [c, this.client.database()];
      return h ? (d += " and table_schema = ?", p.push(h)) : d += " and table_schema = 'dbo'", {
        sql: d,
        bindings: p,
        output(g) {
          const _ = g.reduce((f, m) => (f[m[0].value] = {
            defaultValue: m[1].value,
            type: m[2].value,
            maxLength: m[3].value,
            nullable: m[4].value === "YES"
          }, f), {});
          return u && _[u] || _;
        }
      };
    }
    top() {
      const u = !this.single.limit && this.single.limit !== 0, h = !this.single.offset;
      return u || !h ? "" : `top (${this._getValueOrParameterFromAttribute("limit")})`;
    }
    limit() {
      return "";
    }
    offset() {
      const u = !this.single.limit && this.single.limit !== 0, h = !this.single.offset;
      if (h)
        return "";
      let c = `offset ${h ? "0" : this._getValueOrParameterFromAttribute("offset")} rows`;
      return u || (c += ` fetch next ${this._getValueOrParameterFromAttribute(
        "limit"
      )} rows only`), c;
    }
    whereLike(u) {
      return `${this._columnClause(
        u
      )} collate SQL_Latin1_General_CP1_CS_AS ${this._not(
        u,
        "like "
      )}${this._valueClause(u)}`;
    }
    whereILike(u) {
      return `${this._columnClause(
        u
      )} collate SQL_Latin1_General_CP1_CI_AS ${this._not(
        u,
        "like "
      )}${this._valueClause(u)}`;
    }
    jsonExtract(u) {
      return this._jsonExtract(
        u.singleValue ? "JSON_VALUE" : "JSON_QUERY",
        u
      );
    }
    jsonSet(u) {
      return this._jsonSet("JSON_MODIFY", u);
    }
    jsonInsert(u) {
      return this._jsonSet("JSON_MODIFY", u);
    }
    jsonRemove(u) {
      const h = `JSON_MODIFY(${a(
        u.column,
        this.builder,
        this.client,
        this.bindingsHolder
      )},${this.client.parameter(
        u.path,
        this.builder,
        this.bindingsHolder
      )}, NULL)`;
      return u.alias ? this.client.alias(h, this.formatter.wrap(u.alias)) : h;
    }
    whereJsonPath(u) {
      return this._whereJsonPath("JSON_VALUE", u);
    }
    whereJsonSupersetOf(u) {
      throw new Error(
        "Json superset where clause not actually supported by MSSQL"
      );
    }
    whereJsonSubsetOf(u) {
      throw new Error("Json subset where clause not actually supported by MSSQL");
    }
    _getExtracts(u, h) {
      const c = a(
        u.column,
        this.builder,
        this.client,
        this.bindingsHolder
      );
      return (Array.isArray(u.values) ? u.values : [u.values]).map(function(d) {
        return "JSON_VALUE(" + c + "," + this.client.parameter(d, this.builder, this.bindingsHolder) + ")";
      }, this).join(h);
    }
    onJsonPathEquals(u) {
      return this._onJsonPathEquals("JSON_VALUE", u);
    }
  }
  return Un = s, Un;
}
var Hn, Xa;
function mI() {
  if (Xa)
    return Hn;
  Xa = 1;
  const r = dt;
  class e extends r {
    constructor(i, a) {
      super(i, a);
    }
    dropTableIfExists(i) {
      const a = this.formatter.wrap(t(this.schema, i));
      this.pushQuery(
        `if object_id('${a}', 'U') is not null DROP TABLE ${a}`
      );
    }
    dropViewIfExists(i) {
      const a = this.formatter.wrap(t(this.schema, i));
      this.pushQuery(
        `if object_id('${a}', 'V') is not null DROP VIEW ${a}`
      );
    }
    // Rename a table on the schema.
    renameTable(i, a) {
      this.pushQuery(
        `exec sp_rename ${this.client.parameter(
          t(this.schema, i),
          this.builder,
          this.bindingsHolder
        )}, ${this.client.parameter(a, this.builder, this.bindingsHolder)}`
      );
    }
    renameView(i, a) {
      this.pushQuery(
        `exec sp_rename ${this.client.parameter(
          t(this.schema, i),
          this.builder,
          this.bindingsHolder
        )}, ${this.client.parameter(a, this.builder, this.bindingsHolder)}`
      );
    }
    // Check whether a table exists on the query.
    hasTable(i) {
      const a = this.client.parameter(
        t(this.schema, i),
        this.builder,
        this.bindingsHolder
      ), o = [i];
      let s = `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = ${a}`;
      this.schema && (s += " AND TABLE_SCHEMA = ?", o.push(this.schema)), this.pushQuery({ sql: s, bindings: o, output: (l) => l.length > 0 });
    }
    // Check whether a column exists on the schema.
    hasColumn(i, a) {
      const o = this.client.parameter(
        a,
        this.builder,
        this.bindingsHolder
      ), s = this.client.parameter(
        this.formatter.wrap(t(this.schema, i)),
        this.builder,
        this.bindingsHolder
      ), l = `select object_id from sys.columns where name = ${o} and object_id = object_id(${s})`;
      this.pushQuery({ sql: l, output: (u) => u.length > 0 });
    }
  }
  e.prototype.dropTablePrefix = "DROP TABLE ";
  function t(n, i) {
    return n ? `${n}.${i}` : i;
  }
  return Hn = e, Hn;
}
var Vn, Za;
function gI() {
  if (Za)
    return Vn;
  Za = 1;
  const r = ft, e = z, { isObject: t } = Q;
  class n extends r {
    constructor(a, o) {
      super(a, o);
    }
    createQuery(a, o, s) {
      let l = o ? `if object_id('${this.tableName()}', 'U') is null ` : "";
      s ? l += `SELECT * INTO ${this.tableName()} FROM ${this.tableNameLike()} WHERE 0=1` : l += "CREATE TABLE " + this.tableName() + (this._formatting ? ` (
    ` : " (") + a.sql.join(this._formatting ? `,
    ` : ", ") + this._addChecks() + ")", this.pushQuery(l), this.single.comment && this.comment(this.single.comment), s && this.addColumns(a, this.addColumnsPrefix);
    }
    comment(a) {
      if (!a)
        return;
      a.length > 7500 / 2 && this.client.logger.warn(
        "Your comment might be longer than the max comment length for MSSQL of 7,500 bytes."
      );
      const o = this.formatter.escapingStringDelimiters(a), s = this.formatter.escapingStringDelimiters(
        this.schemaNameRaw || "dbo"
      ), l = this.formatter.escapingStringDelimiters(
        this.tableNameRaw
      ), u = `N'MS_Description', N'${o}', N'Schema', N'${s}', N'Table', N'${l}'`, h = `EXISTS(SELECT * FROM sys.fn_listextendedproperty(N'MS_Description', N'Schema', N'${s}', N'Table', N'${l}', NULL, NULL))`;
      this.pushQuery(
        `IF ${h}
  EXEC sys.sp_updateextendedproperty ${u}
ELSE
  EXEC sys.sp_addextendedproperty ${u}`
      );
    }
    // Compiles column add.  Multiple columns need only one ADD clause (not one ADD per column) so core addColumns doesn't work.  #1348
    addColumns(a, o) {
      o = o || this.addColumnsPrefix, a.sql.length > 0 && this.pushQuery({
        sql: (this.lowerCase ? "alter table " : "ALTER TABLE ") + this.tableName() + " " + o + a.sql.join(", "),
        bindings: a.bindings
      });
    }
    alterColumns(a, o) {
      for (let s = 0, l = o.length; s < l; s++) {
        const u = o[s];
        if (u.modified.defaultTo) {
          const c = `
              DECLARE @constraint varchar(100) = (SELECT default_constraints.name
                                                  FROM sys.all_columns
                                                  INNER JOIN sys.tables
                                                    ON all_columns.object_id = tables.object_id
                                                  INNER JOIN sys.schemas
                                                    ON tables.schema_id = schemas.schema_id
                                                  INNER JOIN sys.default_constraints
                                                    ON all_columns.default_object_id = default_constraints.object_id
                                                  WHERE schemas.name = '${this.schemaNameRaw || "dbo"}'
                                                  AND tables.name = '${this.tableNameRaw}'
                                                  AND all_columns.name = '${u.getColumnName()}')

              IF @constraint IS NOT NULL EXEC('ALTER TABLE ${this.tableNameRaw} DROP CONSTRAINT ' + @constraint)`;
          this.pushQuery(c);
        }
      }
      a.sql.forEach((s) => {
        this.pushQuery({
          sql: (this.lowerCase ? "alter table " : "ALTER TABLE ") + this.tableName() + " " + (this.lowerCase ? this.alterColumnPrefix.toLowerCase() : this.alterColumnPrefix) + s,
          bindings: a.bindings
        });
      });
    }
    // Compiles column drop.  Multiple columns need only one DROP clause (not one DROP per column) so core dropColumn doesn't work.  #1348
    dropColumn() {
      const a = this, o = e.normalizeArr.apply(null, arguments), l = (Array.isArray(o) ? o : [o]).map((h) => a.formatter.wrap(h)), u = this.schemaNameRaw || "dbo";
      for (const h of o) {
        const c = `
              DECLARE @constraint varchar(100) = (SELECT default_constraints.name
                                                  FROM sys.all_columns
                                                  INNER JOIN sys.tables
                                                    ON all_columns.object_id = tables.object_id
                                                  INNER JOIN sys.schemas
                                                    ON tables.schema_id = schemas.schema_id
                                                  INNER JOIN sys.default_constraints
                                                    ON all_columns.default_object_id = default_constraints.object_id
                                                  WHERE schemas.name = '${u}'
                                                  AND tables.name = '${this.tableNameRaw}'
                                                  AND all_columns.name = '${h}')

              IF @constraint IS NOT NULL EXEC('ALTER TABLE ${this.tableNameRaw} DROP CONSTRAINT ' + @constraint)`;
        this.pushQuery(c);
      }
      this.pushQuery(
        (this.lowerCase ? "alter table " : "ALTER TABLE ") + this.tableName() + " " + this.dropColumnPrefix + l.join(", ")
      );
    }
    changeType() {
    }
    // Renames a column on the table.
    renameColumn(a, o) {
      this.pushQuery(
        `exec sp_rename ${this.client.parameter(
          this.tableName() + "." + a,
          this.tableBuilder,
          this.bindingsHolder
        )}, ${this.client.parameter(
          o,
          this.tableBuilder,
          this.bindingsHolder
        )}, 'COLUMN'`
      );
    }
    dropFKRefs(a, o) {
      const s = this.client.formatter(this.tableBuilder);
      return Promise.all(
        o.map(function(l) {
          const u = s.wrap(l.CONSTRAINT_NAME), h = s.wrap(l.TABLE_NAME);
          return a.query({
            sql: `ALTER TABLE ${h} DROP CONSTRAINT ${u}`
          });
        })
      );
    }
    createFKRefs(a, o) {
      const s = this.client.formatter(this.tableBuilder);
      return Promise.all(
        o.map(function(l) {
          const u = s.wrap(l.TABLE_NAME), h = s.wrap(l.CONSTRAINT_NAME), c = s.columnize(l.COLUMN_NAME), d = s.columnize(l.REFERENCED_COLUMN_NAME), p = s.wrap(l.REFERENCED_TABLE_NAME), g = ` ON UPDATE ${l.UPDATE_RULE}`, _ = ` ON DELETE ${l.DELETE_RULE}`;
          return a.query({
            sql: `ALTER TABLE ${u} ADD CONSTRAINT ${h} FOREIGN KEY (` + c + ") REFERENCES " + p + " (" + d + ")" + g + _
          });
        })
      );
    }
    index(a, o, s) {
      o = o ? this.formatter.wrap(o) : this._indexCommand("index", this.tableNameRaw, a);
      let l;
      t(s) && ({ predicate: l } = s);
      const u = l ? " " + this.client.queryCompiler(l).where() : "";
      this.pushQuery(
        `CREATE INDEX ${o} ON ${this.tableName()} (${this.formatter.columnize(
          a
        )})${u}`
      );
    }
    /**
     * Create a primary key.
     *
     * @param {undefined | string | string[]} columns
     * @param {string | {constraintName: string, deferrable?: 'not deferrable'|'deferred'|'immediate' }} constraintName
     */
    primary(a, o) {
      let s;
      t(o) && ({ constraintName: o, deferrable: s } = o), s && s !== "not deferrable" && this.client.logger.warn(
        `mssql: primary key constraint [${o}] will not be deferrable ${s} because mssql does not support deferred constraints.`
      ), o = o ? this.formatter.wrap(o) : this.formatter.wrap(`${this.tableNameRaw}_pkey`), this.forCreate ? this.pushQuery(
        `CONSTRAINT ${o} PRIMARY KEY (${this.formatter.columnize(
          a
        )})`
      ) : this.pushQuery(
        `ALTER TABLE ${this.tableName()} ADD CONSTRAINT ${o} PRIMARY KEY (${this.formatter.columnize(
          a
        )})`
      );
    }
    /**
     * Create a unique index.
     *
     * @param {string | string[]} columns
     * @param {string | {indexName: undefined | string, deferrable?: 'not deferrable'|'deferred'|'immediate', useConstraint?: true|false, predicate?: QueryBuilder }} indexName
     */
    unique(a, o) {
      let s, l = !1, u;
      if (t(o) && ({ indexName: o, deferrable: s, useConstraint: l, predicate: u } = o), s && s !== "not deferrable" && this.client.logger.warn(
        `mssql: unique index [${o}] will not be deferrable ${s} because mssql does not support deferred constraints.`
      ), l && u)
        throw new Error("mssql cannot create constraint with predicate");
      if (o = o ? this.formatter.wrap(o) : this._indexCommand("unique", this.tableNameRaw, a), Array.isArray(a) || (a = [a]), l)
        this.pushQuery(
          `ALTER TABLE ${this.tableName()} ADD CONSTRAINT ${o} UNIQUE (${this.formatter.columnize(
            a
          )})`
        );
      else {
        const h = u ? " " + this.client.queryCompiler(u).where() : " WHERE " + a.map((c) => this.formatter.columnize(c) + " IS NOT NULL").join(" AND ");
        this.pushQuery(
          `CREATE UNIQUE INDEX ${o} ON ${this.tableName()} (${this.formatter.columnize(
            a
          )})${h}`
        );
      }
    }
    // Compile a drop index command.
    dropIndex(a, o) {
      o = o ? this.formatter.wrap(o) : this._indexCommand("index", this.tableNameRaw, a), this.pushQuery(`DROP INDEX ${o} ON ${this.tableName()}`);
    }
    // Compile a drop foreign key command.
    dropForeign(a, o) {
      o = o ? this.formatter.wrap(o) : this._indexCommand("foreign", this.tableNameRaw, a), this.pushQuery(
        `ALTER TABLE ${this.tableName()} DROP CONSTRAINT ${o}`
      );
    }
    // Compile a drop primary key command.
    dropPrimary(a) {
      a = a ? this.formatter.wrap(a) : this.formatter.wrap(`${this.tableNameRaw}_pkey`), this.pushQuery(
        `ALTER TABLE ${this.tableName()} DROP CONSTRAINT ${a}`
      );
    }
    // Compile a drop unique key command.
    dropUnique(a, o) {
      o = o ? this.formatter.wrap(o) : this._indexCommand("unique", this.tableNameRaw, a), this.pushQuery(`DROP INDEX ${o} ON ${this.tableName()}`);
    }
  }
  return n.prototype.createAlterTableMethods = ["foreign", "primary"], n.prototype.lowerCase = !1, n.prototype.addColumnsPrefix = "ADD ", n.prototype.dropColumnPrefix = "DROP COLUMN ", n.prototype.alterColumnPrefix = "ALTER COLUMN ", Vn = n, Vn;
}
var Wn, el;
function yI() {
  if (el)
    return Wn;
  el = 1;
  const r = pt, {
    columnize: e
  } = J;
  class t extends r {
    constructor(i, a) {
      super(i, a);
    }
    createQuery(i, a, o, s) {
      let u = "CREATE " + (s ? "OR ALTER " : "") + "VIEW " + this.viewName();
      const h = i ? " (" + e(
        i,
        this.viewBuilder,
        this.client,
        this.bindingsHolder
      ) + ")" : "";
      u += h, u += " AS ", u += a.toString(), this.pushQuery({
        sql: u
      });
    }
    renameColumn(i, a) {
      this.pushQuery(
        `exec sp_rename ${this.client.parameter(
          this.viewName() + "." + i,
          this.viewBuilder,
          this.bindingsHolder
        )}, ${this.client.parameter(
          a,
          this.viewBuilder,
          this.bindingsHolder
        )}, 'COLUMN'`
      );
    }
    createOrReplace() {
      this.createQuery(this.columns, this.selectQuery, !1, !0);
    }
  }
  return Wn = t, Wn;
}
var zn, tl;
function bI() {
  if (tl)
    return zn;
  tl = 1;
  const r = We, { toNumber: e } = z, { formatDefault: t } = Ue, { operator: n } = J;
  class i extends r {
    constructor(o, s, l) {
      super(o, s, l), this.modifiers = ["nullable", "defaultTo", "first", "after", "comment"], this._addCheckModifiers();
    }
    // Types
    // ------
    double(o, s) {
      return "float";
    }
    floating(o, s) {
      return "float";
    }
    integer() {
      return "int";
    }
    tinyint() {
      return "tinyint";
    }
    varchar(o) {
      return `nvarchar(${e(o, 255)})`;
    }
    timestamp({ useTz: o = !1 } = {}) {
      return o ? "datetimeoffset" : "datetime2";
    }
    bit(o) {
      return o > 1 && this.client.logger.warn("Bit field is exactly 1 bit length for MSSQL"), "bit";
    }
    binary(o) {
      return o ? `varbinary(${e(o)})` : "varbinary(max)";
    }
    // Modifiers
    // ------
    first() {
      return this.client.logger.warn("Column first modifier not available for MSSQL"), "";
    }
    after(o) {
      return this.client.logger.warn("Column after modifier not available for MSSQL"), "";
    }
    defaultTo(o, { constraintName: s } = {}) {
      const l = t(o, this.type, this.client);
      return s = typeof s < "u" ? s : `${this.tableCompiler.tableNameRaw}_${this.getColumnName()}_default`.toLowerCase(), this.columnBuilder._method === "alter" ? (this.pushAdditional(function() {
        this.pushQuery(
          `ALTER TABLE ${this.tableCompiler.tableName()} ADD CONSTRAINT ${this.formatter.wrap(
            s
          )} DEFAULT ${l} FOR ${this.formatter.wrap(
            this.getColumnName()
          )}`
        );
      }), "") : s ? `CONSTRAINT ${this.formatter.wrap(
        s
      )} DEFAULT ${l}` : `DEFAULT ${l}`;
    }
    comment(o) {
      if (!o)
        return;
      o && o.length > 7500 / 2 && this.client.logger.warn(
        "Your comment might be longer than the max comment length for MSSQL of 7,500 bytes."
      );
      const s = this.formatter.escapingStringDelimiters(o), l = this.tableCompiler.schemaNameRaw || "dbo", u = this.formatter.escapingStringDelimiters(
        this.tableCompiler.tableNameRaw
      ), h = this.formatter.escapingStringDelimiters(
        this.args[0] || this.defaults("columnName")
      ), c = `N'MS_Description', N'${s}', N'Schema', N'${l}', N'Table', N'${u}', N'Column', N'${h}'`;
      return this.pushAdditional(function() {
        const d = `EXISTS(SELECT * FROM sys.fn_listextendedproperty(N'MS_Description', N'Schema', N'${l}', N'Table', N'${u}', N'Column', N'${h}'))`;
        this.pushQuery(
          `IF ${d}
  EXEC sys.sp_updateextendedproperty ${c}
ELSE
  EXEC sys.sp_addextendedproperty ${c}`
        );
      }), "";
    }
    checkLength(o, s, l) {
      return this._check(
        `LEN(${this.formatter.wrap(this.getColumnName())}) ${n(
          o,
          this.columnBuilder,
          this.bindingsHolder
        )} ${e(s)}`,
        l
      );
    }
    checkRegex(o, s) {
      return this._check(
        `${this.formatter.wrap(
          this.getColumnName()
        )} LIKE ${this.client._escapeBinding("%" + o + "%")}`,
        s
      );
    }
    increments(o = { primaryKey: !0 }) {
      return "int identity(1,1) not null" + (this.tableCompiler._canBeAddPrimaryKey(o) ? " primary key" : "");
    }
    bigincrements(o = { primaryKey: !0 }) {
      return "bigint identity(1,1) not null" + (this.tableCompiler._canBeAddPrimaryKey(o) ? " primary key" : "");
    }
  }
  return i.prototype.bigint = "bigint", i.prototype.mediumint = "int", i.prototype.smallint = "smallint", i.prototype.text = "nvarchar(max)", i.prototype.mediumtext = "nvarchar(max)", i.prototype.longtext = "nvarchar(max)", i.prototype.json = i.prototype.jsonb = "nvarchar(max)", i.prototype.enu = "nvarchar(100)", i.prototype.uuid = ({ useBinaryUuid: a = !1 } = {}) => a ? "binary(16)" : "uniqueidentifier", i.prototype.datetime = "datetime2", i.prototype.bool = "bit", zn = i, zn;
}
var Jn, rl;
function _I() {
  if (rl)
    return Jn;
  rl = 1;
  const r = He, e = hI(), t = ze, n = dI(), i = fI(), a = pI(), o = mI(), s = gI(), l = yI(), u = bI(), h = Ne, c = ae("knex:mssql"), d = { MIN: -2147483648, MAX: 2147483647 }, p = { MIN: -9007199254740991, MAX: 9007199254740991 };
  class g extends t {
    constructor(f = {}) {
      super(f);
    }
    /**
     * @param {import('knex').Config} options
     */
    _generateConnection() {
      const f = this.connectionSettings;
      f.options = f.options || {};
      const m = {
        authentication: {
          type: f.type || "default",
          options: {
            userName: f.userName || f.user,
            password: f.password,
            domain: f.domain,
            token: f.token,
            clientId: f.clientId,
            clientSecret: f.clientSecret,
            tenantId: f.tenantId,
            msiEndpoint: f.msiEndpoint
          }
        },
        server: f.server || f.host,
        options: {
          database: f.database,
          encrypt: f.encrypt || !1,
          port: f.port || 1433,
          connectTimeout: f.connectionTimeout || f.timeout || 15e3,
          requestTimeout: e(f.requestTimeout) ? 15e3 : f.requestTimeout,
          rowCollectionOnDone: !1,
          rowCollectionOnRequestCompletion: !1,
          useColumnNames: !1,
          tdsVersion: f.options.tdsVersion || "7_4",
          appName: f.options.appName || "knex",
          trustServerCertificate: !1,
          ...f.options
        }
      };
      return m.options.instanceName && delete m.options.port, isNaN(m.options.requestTimeout) && (m.options.requestTimeout = 15e3), m.options.requestTimeout === 1 / 0 && (m.options.requestTimeout = 0), m.options.requestTimeout < 0 && (m.options.requestTimeout = 0), f.debug && (m.options.debug = {
        packet: !0,
        token: !0,
        data: !0,
        payload: !0
      }), m;
    }
    _driver() {
      return P;
    }
    formatter() {
      return new n(this, ...arguments);
    }
    transaction() {
      return new i(this, ...arguments);
    }
    queryCompiler() {
      return new a(this, ...arguments);
    }
    schemaCompiler() {
      return new o(this, ...arguments);
    }
    tableCompiler() {
      return new s(this, ...arguments);
    }
    viewCompiler() {
      return new l(this, ...arguments);
    }
    queryBuilder() {
      return new h(this);
    }
    columnCompiler() {
      return new u(this, ...arguments);
    }
    wrapIdentifierImpl(f) {
      return f === "*" ? "*" : `[${f.replace(/[[\]]+/g, "")}]`;
    }
    // Get a raw connection, called by the `pool` whenever a new
    // connection needs to be added to the pool.
    acquireRawConnection() {
      return new Promise((f, m) => {
        c("connection::connection new connection requested");
        const y = this._driver(), w = Object.assign({}, this._generateConnection()), $ = new y.Connection(w);
        $.connect((E) => E ? (c("connection::connect error: %s", E.message), m(E)) : (c("connection::connect connected to server"), $.connected = !0, $.on("error", (C) => {
          c("connection::error message=%s", C.message), $.__knex__disposed = C, $.connected = !1;
        }), $.once("end", () => {
          $.connected = !1, $.__knex__disposed = "Connection to server was terminated.", c("connection::end connection ended.");
        }), f($)));
      });
    }
    validateConnection(f) {
      return f && f.connected;
    }
    // Used to explicitly close a connection, called internally by the pool
    // when a connection times out or the pool is shutdown.
    destroyRawConnection(f) {
      return c("connection::destroy"), new Promise((m) => {
        f.once("end", () => {
          m();
        }), f.close();
      });
    }
    // Position the bindings for the query.
    positionBindings(f) {
      let m = -1;
      return f.replace(/\\?\?/g, (y) => y === "\\?" ? "?" : (m += 1, `@p${m}`));
    }
    _chomp(f) {
      if (f.state.name === "LoggedIn") {
        const m = this.requestQueue.pop();
        m && (c(
          "connection::query executing query, %d more in queue",
          this.requestQueue.length
        ), f.execSql(m));
      }
    }
    _enqueueRequest(f, m) {
      this.requestQueue.push(f), this._chomp(m);
    }
    _makeRequest(f, m) {
      const y = this._driver(), w = typeof f == "string" ? f : f.sql;
      let $ = 0;
      if (!w)
        throw new Error("The query is empty");
      c("request::request sql=%s", w);
      const E = new y.Request(w, (C, T) => {
        if (C)
          return c("request::error message=%s", C.message), m(C);
        $ = T, c("request::callback rowCount=%d", $);
      });
      return E.on("prepared", () => {
        c("request %s::request prepared", this.id);
      }), E.on("done", (C, T) => {
        c("request::done rowCount=%d more=%s", C, T);
      }), E.on("doneProc", (C, T) => {
        c(
          "request::doneProc id=%s rowCount=%d more=%s",
          E.id,
          C,
          T
        );
      }), E.on("doneInProc", (C, T) => {
        c(
          "request::doneInProc id=%s rowCount=%d more=%s",
          E.id,
          C,
          T
        );
      }), E.once("requestCompleted", () => (c("request::completed id=%s", E.id), m(null, $))), E.on("error", (C) => (c("request::error id=%s message=%s", E.id, C.message), m(C))), E;
    }
    // Grab a connection, run the query via the MSSQL streaming interface,
    // and pass that through to the stream we've sent back to the client.
    _stream(f, m, y) {
      return new Promise((w, $) => {
        const E = this._makeRequest(m, (C) => {
          if (C)
            return y.emit("error", C), $(C);
          w();
        });
        E.on("row", (C) => {
          y.write(
            C.reduce(
              (T, N) => ({
                ...T,
                [N.metadata.colName]: N.value
              }),
              {}
            )
          );
        }), E.on("error", (C) => {
          y.emit("error", C), $(C);
        }), E.once("requestCompleted", () => {
          y.end(), w();
        }), this._assignBindings(E, m.bindings), this._enqueueRequest(E, f);
      });
    }
    _assignBindings(f, m) {
      if (Array.isArray(m))
        for (let y = 0; y < m.length; y++) {
          const w = m[y];
          this._setReqInput(f, y, w);
        }
    }
    _scaleForBinding(f) {
      if (f % 1 === 0)
        throw new Error(`The binding value ${f} must be a decimal number.`);
      return { scale: 10 };
    }
    _typeForBinding(f) {
      const m = this._driver();
      if (this.connectionSettings.options && this.connectionSettings.options.mapBinding) {
        const y = this.connectionSettings.options.mapBinding(f);
        if (y)
          return [y.value, y.type];
      }
      switch (typeof f) {
        case "string":
          return [f, m.TYPES.NVarChar];
        case "boolean":
          return [f, m.TYPES.Bit];
        case "number": {
          if (f % 1 !== 0)
            return [f, m.TYPES.Float];
          if (f < d.MIN || f > d.MAX) {
            if (f < p.MIN || f > p.MAX)
              throw new Error(
                `Bigint must be safe integer or must be passed as string, saw ${f}`
              );
            return [f, m.TYPES.BigInt];
          }
          return [f, m.TYPES.Int];
        }
        default:
          return f instanceof Date ? [f, m.TYPES.DateTime] : f instanceof Buffer ? [f, m.TYPES.VarBinary] : [f, m.TYPES.NVarChar];
      }
    }
    // Runs the query on the specified connection, providing the bindings
    // and any other necessary prep work.
    _query(f, m) {
      return new Promise((y, w) => {
        const $ = [], E = this._makeRequest(m, (C, T) => {
          if (C)
            return w(C);
          m.response = $, process.nextTick(() => this._chomp(f)), y(m);
        });
        E.on("row", (C) => {
          c("request::row"), $.push(C);
        }), this._assignBindings(E, m.bindings), this._enqueueRequest(E, f);
      });
    }
    // sets a request input parameter. Detects bigints and decimals and sets type appropriately.
    _setReqInput(f, m, y) {
      const [w, $] = this._typeForBinding(y), E = "p".concat(m);
      let C;
      typeof w == "number" && w % 1 !== 0 && (C = this._scaleForBinding(w)), c(
        "request::binding pos=%d type=%s value=%s",
        m,
        $.name,
        w
      ), Buffer.isBuffer(w) && (C = {
        length: "max"
      }), f.addParameter(E, $, w, C);
    }
    // Process the response as returned from the query.
    processResponse(f, m) {
      if (f == null)
        return;
      let { response: y } = f;
      const { method: w } = f;
      if (f.output || (y = y.map(
        ($) => $.reduce((E, C) => {
          const T = C.metadata.colName;
          return E[T] ? (Array.isArray(E[T]) || (E[T] = [E[T]]), E[T].push(C.value)) : E[T] = C.value, E;
        }, {})
      ), f.output))
        return f.output.call(m, y);
      switch (w) {
        case "select":
          return y;
        case "first":
          return y[0];
        case "pluck":
          return r(y, f.pluck);
        case "insert":
        case "del":
        case "update":
        case "counter":
          return f.returning && f.returning === "@@rowcount" ? y[0][""] : y;
        default:
          return y;
      }
    }
  }
  return Object.assign(g.prototype, {
    requestQueue: [],
    dialect: "mssql",
    driverName: "mssql"
  }), Jn = g, Jn;
}
var Kn, nl;
function wI() {
  if (nl)
    return Kn;
  nl = 1;
  var r = "Expected a function";
  function e(t, n, i) {
    if (typeof t != "function")
      throw new TypeError(r);
    return setTimeout(function() {
      t.apply(void 0, i);
    }, n);
  }
  return Kn = e, Kn;
}
var Gn, il;
function $I() {
  if (il)
    return Gn;
  il = 1;
  var r = wI(), e = bs, t = e(function(n, i) {
    return r(n, 1, i);
  });
  return Gn = t, Gn;
}
var Yn, sl;
function CI() {
  if (sl)
    return Yn;
  sl = 1;
  const r = Oe, t = ae("knex:tx");
  class n extends r {
    query(a, o, s, l) {
      const u = this, h = this.trxClient.query(a, o).catch((c) => {
        if (c.errno === 1305) {
          this.trxClient.logger.warn(
            "Transaction was implicitly committed, do not mix transactions and DDL with MySQL (#805)"
          );
          return;
        }
        s = 2, l = c, u._completed = !0, t("%s error running transaction query", u.txid);
      }).then(function(c) {
        if (s === 1 && u._resolver(l), s === 2) {
          if (l === void 0) {
            if (u.doNotRejectOnRollback && /^ROLLBACK\b/i.test(o)) {
              u._resolver();
              return;
            }
            l = new Error(`Transaction rejected with non-error: ${l}`);
          }
          u._rejecter(l);
        }
        return c;
      });
      return (s === 1 || s === 2) && (u._completed = !0), h;
    }
  }
  return Yn = n, Yn;
}
var Xn, ol;
function vI() {
  if (ol)
    return Xn;
  ol = 1;
  const r = P, e = oe, t = Ae, n = le, i = Ve, { wrapAsIdentifier: a } = Ue, {
    columnize: o,
    wrap: s
  } = J, l = (h) => t(h) || Array.isArray(h);
  class u extends i {
    constructor(c, d, p) {
      super(c, d, p);
      const { returning: g } = this.single;
      g && this.client.logger.warn(
        ".returning() is not supported by mysql and will not have any effect."
      ), this._emptyInsertValue = "() values ()";
    }
    // Compiles an `insert` query, allowing for multiple
    // inserts using a single query statement.
    insert() {
      let c = super.insert();
      if (c === "")
        return c;
      const { ignore: d, merge: p, insert: g } = this.single;
      if (d && (c = c.replace("insert into", "insert ignore into")), p && (c += this._merge(p.updates, g), this.where()))
        throw new Error(
          ".onConflict().merge().where() is not supported for mysql"
        );
      return c;
    }
    // Compiles merge for onConflict, allowing for different merge strategies
    _merge(c, d) {
      const p = " on duplicate key update ";
      if (c && Array.isArray(c))
        return p + c.map(
          (g) => a(g, this.formatter.builder, this.client)
        ).map((g) => `${g} = values(${g})`).join(", ");
      if (c && typeof c == "object") {
        const g = this._prepUpdate(c);
        return p + g.join(",");
      } else {
        const g = this._prepInsert(d);
        if (typeof g == "string")
          throw new Error(
            "If using merge with a raw insert query, then updates must be provided"
          );
        return p + g.columns.map((_) => a(_, this.builder, this.client)).map((_) => `${_} = values(${_})`).join(", ");
      }
    }
    // Update method, including joins, wheres, order & limits.
    update() {
      const c = this.with(), d = this.join(), p = this._prepUpdate(this.single.update), g = this.where(), _ = this.order(), f = this.limit();
      return c + `update ${this.tableName}` + (d ? ` ${d}` : "") + " set " + p.join(", ") + (g ? ` ${g}` : "") + (_ ? ` ${_}` : "") + (f ? ` ${f}` : "");
    }
    forUpdate() {
      return "for update";
    }
    forShare() {
      return "lock in share mode";
    }
    // Only supported on MySQL 8.0+
    skipLocked() {
      return "skip locked";
    }
    // Supported on MySQL 8.0+ and MariaDB 10.3.0+
    noWait() {
      return "nowait";
    }
    // Compiles a `columnInfo` query.
    columnInfo() {
      const c = this.single.columnInfo;
      return {
        sql: "select * from information_schema.columns where table_name = ? and table_schema = ?",
        bindings: [this.client.customWrapIdentifier(this.single.table, e), this.client.database()],
        output(p) {
          const g = p.reduce(function(_, f) {
            return _[f.COLUMN_NAME] = {
              defaultValue: f.COLUMN_DEFAULT === "NULL" ? null : f.COLUMN_DEFAULT,
              type: f.DATA_TYPE,
              maxLength: f.CHARACTER_MAXIMUM_LENGTH,
              nullable: f.IS_NULLABLE === "YES"
            }, _;
          }, {});
          return c && g[c] || g;
        }
      };
    }
    limit() {
      const c = !this.single.limit && this.single.limit !== 0;
      return c && !this.single.offset ? "" : `limit ${this.single.offset && c ? "18446744073709551615" : this._getValueOrParameterFromAttribute("limit")}`;
    }
    whereBasic(c) {
      return r(
        !l(c.value),
        "The values in where clause must not be object or array."
      ), super.whereBasic(c);
    }
    whereRaw(c) {
      return r(
        n(c.value.bindings) || !Object.values(c.value.bindings).some(l),
        "The values in where clause must not be object or array."
      ), super.whereRaw(c);
    }
    whereLike(c) {
      return `${this._columnClause(c)} ${this._not(
        c,
        "like "
      )}${this._valueClause(c)} COLLATE utf8_bin`;
    }
    whereILike(c) {
      return `${this._columnClause(c)} ${this._not(
        c,
        "like "
      )}${this._valueClause(c)}`;
    }
    // Json functions
    jsonExtract(c) {
      return this._jsonExtract(["json_extract", "json_unquote"], c);
    }
    jsonSet(c) {
      return this._jsonSet("json_set", c);
    }
    jsonInsert(c) {
      return this._jsonSet("json_insert", c);
    }
    jsonRemove(c) {
      const d = `json_remove(${o(
        c.column,
        this.builder,
        this.client,
        this.bindingsHolder
      )},${this.client.parameter(
        c.path,
        this.builder,
        this.bindingsHolder
      )})`;
      return c.alias ? this.client.alias(d, this.formatter.wrap(c.alias)) : d;
    }
    whereJsonObject(c) {
      return this._not(
        c,
        `json_contains(${this._columnClause(c)}, ${this._jsonValueClause(
          c
        )})`
      );
    }
    whereJsonPath(c) {
      return this._whereJsonPath("json_extract", c);
    }
    whereJsonSupersetOf(c) {
      return this._not(
        c,
        `json_contains(${s(
          c.column,
          void 0,
          this.builder,
          this.client,
          this.bindingsHolder
        )},${this._jsonValueClause(c)})`
      );
    }
    whereJsonSubsetOf(c) {
      return this._not(
        c,
        `json_contains(${this._jsonValueClause(c)},${s(
          c.column,
          void 0,
          this.builder,
          this.client,
          this.bindingsHolder
        )})`
      );
    }
    onJsonPathEquals(c) {
      return this._onJsonPathEquals("json_extract", c);
    }
  }
  return Xn = u, Xn;
}
var Zn, al;
function EI() {
  if (al)
    return Zn;
  al = 1;
  const r = dt;
  class e extends r {
    constructor(n, i) {
      super(n, i);
    }
    // Rename a table on the schema.
    renameTable(n, i) {
      this.pushQuery(
        `rename table ${this.formatter.wrap(n)} to ${this.formatter.wrap(
          i
        )}`
      );
    }
    renameView(n, i) {
      this.renameTable(n, i);
    }
    // Check whether a table exists on the query.
    hasTable(n) {
      let i = "select * from information_schema.tables where table_name = ?";
      const a = [n];
      this.schema ? (i += " and table_schema = ?", a.push(this.schema)) : i += " and table_schema = database()", this.pushQuery({
        sql: i,
        bindings: a,
        output: function(s) {
          return s.length > 0;
        }
      });
    }
    // Check whether a column exists on the schema.
    hasColumn(n, i) {
      this.pushQuery({
        sql: `show columns from ${this.formatter.wrap(n)}`,
        output(a) {
          return a.some((o) => this.client.wrapIdentifier(o.Field.toLowerCase()) === this.client.wrapIdentifier(i.toLowerCase()));
        }
      });
    }
  }
  return Zn = e, Zn;
}
var ei, ll;
function TI() {
  if (ll)
    return ei;
  ll = 1;
  const r = ft, { isObject: e, isString: t } = Q;
  class n extends r {
    constructor(a, o) {
      super(a, o);
    }
    createQuery(a, o, s) {
      const l = o ? "create table if not exists " : "create table ", { client: u } = this;
      let h = {}, c = " (" + a.sql.join(", ");
      c += this.primaryKeys() || "", c += this._addChecks(), c += ")";
      let d = l + this.tableName() + (s && this.tableNameLike() ? " like " + this.tableNameLike() : c);
      u.connectionSettings && (h = u.connectionSettings);
      const p = this.single.charset || h.charset || "", g = this.single.collate || h.collate || "", _ = this.single.engine || "";
      if (p && !s && (d += ` default character set ${p}`), g && (d += ` collate ${g}`), _ && (d += ` engine = ${_}`), this.single.comment) {
        const f = this.single.comment || "", m = 1024;
        f.length > m && this.client.logger.warn(
          `The max length for a table comment is ${m} characters`
        ), d += ` comment = '${f}'`;
      }
      this.pushQuery(d), s && this.addColumns(a, this.addColumnsPrefix);
    }
    // Compiles the comment on the table.
    comment(a) {
      this.pushQuery(`alter table ${this.tableName()} comment = '${a}'`);
    }
    changeType() {
    }
    // Renames a column on the table.
    renameColumn(a, o) {
      const s = this, l = this.tableName(), u = this.formatter.wrap(a) + " " + this.formatter.wrap(o);
      this.pushQuery({
        sql: `show full fields from ${l} where field = ` + this.client.parameter(a, this.tableBuilder, this.bindingsHolder),
        output(h) {
          const c = h[0], d = this;
          return s.getFKRefs(d).then(
            ([p]) => new Promise((g, _) => {
              try {
                p.length || g(), g(s.dropFKRefs(d, p));
              } catch (f) {
                _(f);
              }
            }).then(function() {
              let g = `alter table ${l} change ${u} ${c.Type}`;
              return String(c.Null).toUpperCase() !== "YES" ? g += " NOT NULL" : g += " NULL", c.Default !== void 0 && c.Default !== null && (g += ` DEFAULT '${c.Default}'`), c.Collation !== void 0 && c.Collation !== null && (g += ` COLLATE '${c.Collation}'`), c.Extra == "auto_increment" && (g += " AUTO_INCREMENT"), d.query({
                sql: g
              });
            }).then(function() {
              if (p.length)
                return s.createFKRefs(
                  d,
                  p.map(function(g) {
                    return g.REFERENCED_COLUMN_NAME === a && (g.REFERENCED_COLUMN_NAME = o), g.COLUMN_NAME === a && (g.COLUMN_NAME = o), g;
                  })
                );
            })
          );
        }
      });
    }
    primaryKeys() {
      const a = (this.grouped.alterTable || []).filter(
        (o) => o.method === "primary"
      );
      if (a.length > 0 && a[0].args.length > 0) {
        const o = a[0].args[0];
        let s = a[0].args[1] || "";
        if (s && (s = " constraint " + this.formatter.wrap(s)), this.grouped.columns) {
          const l = this._getIncrementsColumnNames();
          l.length && l.forEach((u) => {
            o.includes(u) || o.unshift(u);
          });
        }
        return `,${s} primary key (${this.formatter.columnize(
          o
        )})`;
      }
    }
    getFKRefs(a) {
      const o = {
        bindings: []
      }, s = "SELECT KCU.CONSTRAINT_NAME, KCU.TABLE_NAME, KCU.COLUMN_NAME,        KCU.REFERENCED_TABLE_NAME, KCU.REFERENCED_COLUMN_NAME,        RC.UPDATE_RULE, RC.DELETE_RULE FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE AS KCU JOIN INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS AS RC        USING(CONSTRAINT_NAME)WHERE KCU.REFERENCED_TABLE_NAME = " + this.client.parameter(
        this.tableNameRaw,
        this.tableBuilder,
        o
      ) + "   AND KCU.CONSTRAINT_SCHEMA = " + this.client.parameter(
        this.client.database(),
        this.tableBuilder,
        o
      ) + "   AND RC.CONSTRAINT_SCHEMA = " + this.client.parameter(
        this.client.database(),
        this.tableBuilder,
        o
      );
      return a.query({
        sql: s,
        bindings: o.bindings
      });
    }
    dropFKRefs(a, o) {
      const s = this.client.formatter(this.tableBuilder);
      return Promise.all(
        o.map(function(l) {
          const u = s.wrap(l.CONSTRAINT_NAME), h = s.wrap(l.TABLE_NAME);
          return a.query({
            sql: `alter table ${h} drop foreign key ${u}`
          });
        })
      );
    }
    createFKRefs(a, o) {
      const s = this.client.formatter(this.tableBuilder);
      return Promise.all(
        o.map(function(l) {
          const u = s.wrap(l.TABLE_NAME), h = s.wrap(l.CONSTRAINT_NAME), c = s.columnize(l.COLUMN_NAME), d = s.columnize(l.REFERENCED_COLUMN_NAME), p = s.wrap(l.REFERENCED_TABLE_NAME), g = ` ON UPDATE ${l.UPDATE_RULE}`, _ = ` ON DELETE ${l.DELETE_RULE}`;
          return a.query({
            sql: `alter table ${u} add constraint ${h} foreign key (` + c + ") references " + p + " (" + d + ")" + g + _
          });
        })
      );
    }
    index(a, o, s) {
      let l, u;
      t(s) ? u = s : e(s) && ({ indexType: u, storageEngineIndexType: l } = s), o = o ? this.formatter.wrap(o) : this._indexCommand("index", this.tableNameRaw, a), l = l ? ` using ${l}` : "", this.pushQuery(
        `alter table ${this.tableName()} add${u ? ` ${u}` : ""} index ${o}(${this.formatter.columnize(
          a
        )})${l}`
      );
    }
    primary(a, o) {
      let s;
      e(o) && ({ constraintName: o, deferrable: s } = o), s && s !== "not deferrable" && this.client.logger.warn(
        `mysql: primary key constraint \`${o}\` will not be deferrable ${s} because mysql does not support deferred constraints.`
      ), o = o ? this.formatter.wrap(o) : this.formatter.wrap(`${this.tableNameRaw}_pkey`);
      const l = a;
      let u = [];
      this.grouped.columns && (u = this._getIncrementsColumnNames(), u && u.forEach((h) => {
        l.includes(h) || l.unshift(h);
      })), this.method !== "create" && this.method !== "createIfNot" && this.pushQuery(
        `alter table ${this.tableName()} add primary key ${o}(${this.formatter.columnize(
          l
        )})`
      ), u.length && this.pushQuery(
        `alter table ${this.tableName()} modify column ${this.formatter.columnize(
          u
        )} int unsigned not null auto_increment`
      );
    }
    unique(a, o) {
      let s, l;
      e(o) && ({ indexName: o, deferrable: l, storageEngineIndexType: s } = o), l && l !== "not deferrable" && this.client.logger.warn(
        `mysql: unique index \`${o}\` will not be deferrable ${l} because mysql does not support deferred constraints.`
      ), o = o ? this.formatter.wrap(o) : this._indexCommand("unique", this.tableNameRaw, a), s = s ? ` using ${s}` : "", this.pushQuery(
        `alter table ${this.tableName()} add unique ${o}(${this.formatter.columnize(
          a
        )})${s}`
      );
    }
    // Compile a drop index command.
    dropIndex(a, o) {
      o = o ? this.formatter.wrap(o) : this._indexCommand("index", this.tableNameRaw, a), this.pushQuery(`alter table ${this.tableName()} drop index ${o}`);
    }
    // Compile a drop foreign key command.
    dropForeign(a, o) {
      o = o ? this.formatter.wrap(o) : this._indexCommand("foreign", this.tableNameRaw, a), this.pushQuery(
        `alter table ${this.tableName()} drop foreign key ${o}`
      );
    }
    // Compile a drop primary key command.
    dropPrimary() {
      this.pushQuery(`alter table ${this.tableName()} drop primary key`);
    }
    // Compile a drop unique key command.
    dropUnique(a, o) {
      o = o ? this.formatter.wrap(o) : this._indexCommand("unique", this.tableNameRaw, a), this.pushQuery(`alter table ${this.tableName()} drop index ${o}`);
    }
  }
  return n.prototype.addColumnsPrefix = "add ", n.prototype.alterColumnsPrefix = "modify ", n.prototype.dropColumnPrefix = "drop ", ei = n, ei;
}
var ti, ul;
function AI() {
  if (ul)
    return ti;
  ul = 1;
  const r = We, { isObject: e } = Q, { toNumber: t } = z, n = new RegExp("(?<!\\\\)'", "g");
  class i extends r {
    constructor(o, s, l) {
      super(o, s, l), this.modifiers = [
        "unsigned",
        "nullable",
        "defaultTo",
        "comment",
        "collate",
        "first",
        "after"
      ], this._addCheckModifiers();
    }
    // Types
    // ------
    double(o, s) {
      return o ? `double(${t(o, 8)}, ${t(s, 2)})` : "double";
    }
    integer(o) {
      return o = o ? `(${t(o, 11)})` : "", `int${o}`;
    }
    tinyint(o) {
      return o = o ? `(${t(o, 1)})` : "", `tinyint${o}`;
    }
    text(o) {
      switch (o) {
        case "medium":
        case "mediumtext":
          return "mediumtext";
        case "long":
        case "longtext":
          return "longtext";
        default:
          return "text";
      }
    }
    mediumtext() {
      return this.text("medium");
    }
    longtext() {
      return this.text("long");
    }
    enu(o) {
      return `enum('${o.join("', '")}')`;
    }
    datetime(o) {
      return e(o) && ({ precision: o } = o), typeof o == "number" ? `datetime(${o})` : "datetime";
    }
    timestamp(o) {
      return e(o) && ({ precision: o } = o), typeof o == "number" ? `timestamp(${o})` : "timestamp";
    }
    time(o) {
      return e(o) && ({ precision: o } = o), typeof o == "number" ? `time(${o})` : "time";
    }
    bit(o) {
      return o ? `bit(${t(o)})` : "bit";
    }
    binary(o) {
      return o ? `varbinary(${t(o)})` : "blob";
    }
    json() {
      return "json";
    }
    jsonb() {
      return "json";
    }
    // Modifiers
    // ------
    defaultTo(o) {
      if (o == null)
        return;
      if ((this.type === "json" || this.type === "jsonb") && e(o))
        return `default ('${JSON.stringify(o)}')`;
      const s = super.defaultTo.apply(this, arguments);
      return this.type !== "blob" && this.type.indexOf("text") === -1 ? s : "";
    }
    unsigned() {
      return "unsigned";
    }
    comment(o) {
      return o && o.length > 255 && this.client.logger.warn(
        "Your comment is longer than the max comment length for MySQL"
      ), o && `comment '${o.replace(n, "\\'")}'`;
    }
    first() {
      return "first";
    }
    after(o) {
      return `after ${this.formatter.wrap(o)}`;
    }
    collate(o) {
      return o && `collate '${o}'`;
    }
    checkRegex(o, s) {
      return this._check(
        `${this.formatter.wrap(
          this.getColumnName()
        )} REGEXP ${this.client._escapeBinding(o)}`,
        s
      );
    }
    increments(o = { primaryKey: !0 }) {
      return "int unsigned not null" + // In MySQL autoincrement are always a primary key. If you already have a primary key, we
      // initialize this column as classic int column then modify it later in table compiler
      (this.tableCompiler._canBeAddPrimaryKey(o) ? " auto_increment primary key" : "");
    }
    bigincrements(o = { primaryKey: !0 }) {
      return "bigint unsigned not null" + // In MySQL autoincrement are always a primary key. If you already have a primary key, we
      // initialize this column as classic int column then modify it later in table compiler
      (this.tableCompiler._canBeAddPrimaryKey(o) ? " auto_increment primary key" : "");
    }
  }
  return i.prototype.bigint = "bigint", i.prototype.mediumint = "mediumint", i.prototype.smallint = "smallint", ti = i, ti;
}
var ri, cl;
function OI() {
  if (cl)
    return ri;
  cl = 1;
  const r = pt;
  class e extends r {
    constructor(n, i) {
      super(n, i);
    }
    createOrReplace() {
      this.createQuery(this.columns, this.selectQuery, !1, !0);
    }
  }
  return ri = e, ri;
}
var ni, hl;
function NI() {
  if (hl)
    return ni;
  hl = 1;
  const r = Bt;
  class e extends r {
    constructor() {
      super(...arguments);
    }
    checkOption() {
      this._single.checkOption = "default_option";
    }
    localCheckOption() {
      this._single.checkOption = "local";
    }
    cascadedCheckOption() {
      this._single.checkOption = "cascaded";
    }
  }
  return ni = e, ni;
}
var ii, dl;
function Bc() {
  if (dl)
    return ii;
  dl = 1;
  const r = $I(), e = He, { promisify: t } = P, n = ze, i = CI(), a = vI(), o = EI(), s = TI(), l = AI(), { makeEscape: u } = os, h = OI(), c = NI();
  class d extends n {
    _driver() {
      return P;
    }
    queryCompiler(g, _) {
      return new a(this, g, _);
    }
    schemaCompiler() {
      return new o(this, ...arguments);
    }
    tableCompiler() {
      return new s(this, ...arguments);
    }
    viewCompiler() {
      return new h(this, ...arguments);
    }
    viewBuilder() {
      return new c(this, ...arguments);
    }
    columnCompiler() {
      return new l(this, ...arguments);
    }
    transaction() {
      return new i(this, ...arguments);
    }
    wrapIdentifierImpl(g) {
      return g !== "*" ? `\`${g.replace(/`/g, "``")}\`` : "*";
    }
    // Get a raw connection, called by the `pool` whenever a new
    // connection needs to be added to the pool.
    acquireRawConnection() {
      return new Promise((g, _) => {
        const f = this.driver.createConnection(this.connectionSettings);
        f.on("error", (m) => {
          f.__knex__disposed = m;
        }), f.connect((m) => {
          if (m)
            return f.removeAllListeners(), _(m);
          g(f);
        });
      });
    }
    // Used to explicitly close a connection, called internally by the pool
    // when a connection times out or the pool is shutdown.
    async destroyRawConnection(g) {
      try {
        return await t((f) => g.end(f))();
      } catch (_) {
        g.__knex__disposed = _;
      } finally {
        r(() => g.removeAllListeners());
      }
    }
    validateConnection(g) {
      return g.state === "connected" || g.state === "authenticated";
    }
    // Grab a connection, run the query via the MySQL streaming interface,
    // and pass that through to the stream we've sent back to the client.
    _stream(g, _, f, m) {
      if (!_.sql)
        throw new Error("The query is empty");
      m = m || {};
      const y = Object.assign({ sql: _.sql }, _.options);
      return new Promise((w, $) => {
        f.on("error", $), f.on("end", w);
        const E = g.query(y, _.bindings).stream(m);
        E.on("error", (C) => {
          $(C), f.emit("error", C);
        }), E.pipe(f);
      });
    }
    // Runs the query on the specified connection, providing the bindings
    // and any other necessary prep work.
    _query(g, _) {
      if ((!_ || typeof _ == "string") && (_ = { sql: _ }), !_.sql)
        throw new Error("The query is empty");
      return new Promise(function(f, m) {
        if (!_.sql) {
          f();
          return;
        }
        const y = Object.assign({ sql: _.sql }, _.options);
        g.query(
          y,
          _.bindings,
          function(w, $, E) {
            if (w)
              return m(w);
            _.response = [$, E], f(_);
          }
        );
      });
    }
    // Process the response as returned from the query.
    processResponse(g, _) {
      if (g == null)
        return;
      const { response: f } = g, { method: m } = g, y = f[0], w = f[1];
      if (g.output)
        return g.output.call(_, y, w);
      switch (m) {
        case "select":
          return y;
        case "first":
          return y[0];
        case "pluck":
          return e(y, g.pluck);
        case "insert":
          return [y.insertId];
        case "del":
        case "update":
        case "counter":
          return y.affectedRows;
        default:
          return f;
      }
    }
    async cancelQuery(g) {
      const _ = await this.acquireRawConnection();
      try {
        return await this._wrappedCancelQueryCall(_, g);
      } finally {
        await this.destroyRawConnection(_), _.__knex__disposed && this.logger.warn(`Connection Error: ${_.__knex__disposed}`);
      }
    }
    _wrappedCancelQueryCall(g, _) {
      return this._query(g, {
        sql: "KILL QUERY ?",
        bindings: [_.threadId],
        options: {}
      });
    }
  }
  return Object.assign(d.prototype, {
    dialect: "mysql",
    driverName: "mysql",
    _escapeBinding: u(),
    canCancelQuery: !0
  }), ii = d, ii;
}
var si, fl;
function qI() {
  if (fl)
    return si;
  fl = 1;
  const r = Oe, e = ae("knex:tx");
  class t extends r {
    query(i, a, o, s) {
      const l = this, u = this.trxClient.query(i, a).catch((h) => {
        if (h.code === "ER_SP_DOES_NOT_EXIST") {
          this.trxClient.logger.warn(
            "Transaction was implicitly committed, do not mix transactions and DDL with MySQL (#805)"
          );
          return;
        }
        o = 2, s = h, l._completed = !0, e("%s error running transaction query", l.txid);
      }).then(function(h) {
        if (o === 1 && l._resolver(s), o === 2) {
          if (s === void 0) {
            if (l.doNotRejectOnRollback && /^ROLLBACK\b/i.test(a)) {
              l._resolver();
              return;
            }
            s = new Error(`Transaction rejected with non-error: ${s}`);
          }
          return l._rejecter(s), h;
        }
      });
      return (o === 1 || o === 2) && (l._completed = !0), u;
    }
  }
  return si = t, si;
}
var oi, pl;
function RI() {
  if (pl)
    return oi;
  pl = 1;
  const r = Bc(), e = qI();
  class t extends r {
    transaction() {
      return new e(this, ...arguments);
    }
    _driver() {
      return P;
    }
    validateConnection(i) {
      return i && !i._fatalError && !i._protocolError && !i._closing && !i.stream.destroyed;
    }
  }
  return Object.assign(t.prototype, {
    // The "dialect", for reference elsewhere.
    driverName: "mysql2"
  }), oi = t, oi;
}
var ai, ml;
function Le() {
  if (ml)
    return ai;
  ml = 1;
  function r(i, a, o, s) {
    const l = P, u = 30;
    Array.isArray(s) || (s = s ? [s] : []);
    const h = o.replace(/\.|-/g, "_"), c = s.join("_");
    let d = `${h}_${c.length ? c + "_" : ""}${a}`.toLowerCase();
    return d.length > u && (i.warn(
      `Automatically generated name "${d}" exceeds ${u} character limit for Oracle. Using base64 encoded sha1 of that name instead.`
    ), d = l.createHash("sha1").update(d).digest("base64").replace("=", "")), d;
  }
  function e(i, a) {
    return `begin execute immediate '${i.replace(/'/g, "''")}'; exception when others then if sqlcode != ${a} then raise; end if; end;`;
  }
  function t(i) {
    this.columnName = i;
  }
  t.prototype.toString = function() {
    return `[object ReturningHelper:${this.columnName}]`;
  };
  function n(i) {
    return [
      "DPI-1010",
      // not connected
      "DPI-1080",
      // connection was closed by ORA-%d
      "ORA-03114",
      // not connected to ORACLE
      "ORA-03113",
      // end-of-file on communication channel
      "ORA-03135",
      // connection lost contact
      "ORA-12514",
      // listener does not currently know of service requested in connect descriptor
      "ORA-00022",
      // invalid session ID; access denied
      "ORA-00028",
      // your session has been killed
      "ORA-00031",
      // your session has been marked for kill
      "ORA-00045",
      // your session has been terminated with no replay
      "ORA-00378",
      // buffer pools cannot be created as specified
      "ORA-00602",
      // internal programming exception
      "ORA-00603",
      // ORACLE server session terminated by fatal error
      "ORA-00609",
      // could not attach to incoming connection
      "ORA-01012",
      // not logged on
      "ORA-01041",
      // internal error. hostdef extension doesn't exist
      "ORA-01043",
      // user side memory corruption
      "ORA-01089",
      // immediate shutdown or close in progress
      "ORA-01092",
      // ORACLE instance terminated. Disconnection forced
      "ORA-02396",
      // exceeded maximum idle time, please connect again
      "ORA-03122",
      // attempt to close ORACLE-side window on user side
      "ORA-12153",
      // TNS'not connected
      "ORA-12537",
      // TNS'connection closed
      "ORA-12547",
      // TNS'lost contact
      "ORA-12570",
      // TNS'packet reader failure
      "ORA-12583",
      // TNS'no reader
      "ORA-27146",
      // post/wait initialization failed
      "ORA-28511",
      // lost RPC connection
      "ORA-56600",
      // an illegal OCI function call was issued
      "NJS-024",
      "NJS-003"
    ].some(function(a) {
      return i.message.indexOf(a) === 0;
    });
  }
  return ai = {
    generateCombinedName: r,
    isConnectionError: n,
    wrapSqlWithCatch: e,
    ReturningHelper: t
  }, ai;
}
var li, gl;
function Ls() {
  if (gl)
    return li;
  gl = 1;
  const r = Le();
  return li = {
    renameColumnTrigger: function(t, n, i, a) {
      const o = r.generateCombinedName(
        t,
        "autoinc_trg",
        n
      ), s = r.generateCombinedName(t, "seq", n);
      return `DECLARE PK_NAME VARCHAR(200); IS_AUTOINC NUMBER := 0; BEGIN  EXECUTE IMMEDIATE ('ALTER TABLE "${n}" RENAME COLUMN "${i}" TO "${a}"');  SELECT COUNT(*) INTO IS_AUTOINC from "USER_TRIGGERS" where trigger_name = '${o}';  IF (IS_AUTOINC > 0) THEN    SELECT cols.column_name INTO PK_NAME    FROM all_constraints cons, all_cons_columns cols    WHERE cons.constraint_type = 'P'    AND cons.constraint_name = cols.constraint_name    AND cons.owner = cols.owner    AND cols.table_name = '${n}';    IF ('${a}' = PK_NAME) THEN      EXECUTE IMMEDIATE ('DROP TRIGGER "${o}"');      EXECUTE IMMEDIATE ('create or replace trigger "${o}"      BEFORE INSERT on "${n}" for each row        declare        checking number := 1;        begin          if (:new."${a}" is null) then            while checking >= 1 loop              select "${s}".nextval into :new."${a}" from dual;              select count("${a}") into checking from "${n}"              where "${a}" = :new."${a}";            end loop;          end if;        end;');    end if;  end if;END;`;
    },
    createAutoIncrementTrigger: function(t, n, i) {
      const a = `"${n}"`, o = n, s = i ? `"${i}".` : "", l = i ? `'${i}'` : "cols.owner", u = r.generateCombinedName(
        t,
        "autoinc_trg",
        n
      ), c = `"${r.generateCombinedName(
        t,
        "seq",
        n
      )}"`;
      return `DECLARE PK_NAME VARCHAR(200); BEGIN  EXECUTE IMMEDIATE ('CREATE SEQUENCE ${s}${c}');  SELECT cols.column_name INTO PK_NAME  FROM all_constraints cons, all_cons_columns cols  WHERE cons.constraint_type = 'P'  AND cons.constraint_name = cols.constraint_name  AND cons.owner = ${l}  AND cols.table_name = '${o}';  execute immediate ('create or replace trigger ${s}"${u}"  BEFORE INSERT on ${s}${a}  for each row  declare  checking number := 1;  begin    if (:new."' || PK_NAME || '" is null) then      while checking >= 1 loop        select ${s}${c}.nextval into :new."' || PK_NAME || '" from dual;        select count("' || PK_NAME || '") into checking from ${s}${a}        where "' || PK_NAME || '" = :new."' || PK_NAME || '";      end loop;    end if;  end;'); END;`;
    },
    renameTableAndAutoIncrementTrigger: function(t, n, i) {
      const a = r.generateCombinedName(
        t,
        "autoinc_trg",
        n
      ), o = r.generateCombinedName(t, "seq", n), s = r.generateCombinedName(t, "autoinc_trg", i), l = r.generateCombinedName(t, "seq", i);
      return `DECLARE PK_NAME VARCHAR(200); IS_AUTOINC NUMBER := 0; BEGIN  EXECUTE IMMEDIATE ('RENAME "${n}" TO "${i}"');  SELECT COUNT(*) INTO IS_AUTOINC from "USER_TRIGGERS" where trigger_name = '${a}';  IF (IS_AUTOINC > 0) THEN    EXECUTE IMMEDIATE ('DROP TRIGGER "${a}"');    EXECUTE IMMEDIATE ('RENAME "${o}" TO "${l}"');    SELECT cols.column_name INTO PK_NAME    FROM all_constraints cons, all_cons_columns cols    WHERE cons.constraint_type = 'P'    AND cons.constraint_name = cols.constraint_name    AND cons.owner = cols.owner    AND cols.table_name = '${i}';    EXECUTE IMMEDIATE ('create or replace trigger "${s}"    BEFORE INSERT on "${i}" for each row      declare      checking number := 1;      begin        if (:new."' || PK_NAME || '" is null) then          while checking >= 1 loop            select "${l}".nextval into :new."' || PK_NAME || '" from dual;            select count("' || PK_NAME || '") into checking from "${i}"            where "' || PK_NAME || '" = :new."' || PK_NAME || '";          end loop;        end if;      end;');  end if;END;`;
    }
  }, li;
}
var ui, yl;
function SI() {
  if (yl)
    return ui;
  yl = 1;
  const r = dt, e = Le(), t = Ls();
  class n extends r {
    constructor() {
      super(...arguments);
    }
    // Rename a table on the schema.
    renameTable(a, o) {
      const s = t.renameTableAndAutoIncrementTrigger(
        this.client.logger,
        a,
        o
      );
      this.pushQuery(s);
    }
    // Check whether a table exists on the query.
    hasTable(a) {
      this.pushQuery({
        sql: "select TABLE_NAME from USER_TABLES where TABLE_NAME = " + this.client.parameter(a, this.builder, this.bindingsHolder),
        output(o) {
          return o.length > 0;
        }
      });
    }
    // Check whether a column exists on the schema.
    hasColumn(a, o) {
      const s = `select COLUMN_NAME from ALL_TAB_COLUMNS where TABLE_NAME = ${this.client.parameter(
        a,
        this.builder,
        this.bindingsHolder
      )} and COLUMN_NAME = ${this.client.parameter(
        o,
        this.builder,
        this.bindingsHolder
      )}`;
      this.pushQuery({ sql: s, output: (l) => l.length > 0 });
    }
    dropSequenceIfExists(a) {
      const o = this.schema ? `"${this.schema}".` : "";
      this.pushQuery(
        e.wrapSqlWithCatch(
          `drop sequence ${o}${this.formatter.wrap(a)}`,
          -2289
        )
      );
    }
    _dropRelatedSequenceIfExists(a) {
      const o = e.generateCombinedName(
        this.client.logger,
        "seq",
        a
      );
      this.dropSequenceIfExists(o);
    }
    dropTable(a) {
      const o = this.schema ? `"${this.schema}".` : "";
      this.pushQuery(`drop table ${o}${this.formatter.wrap(a)}`), this._dropRelatedSequenceIfExists(a);
    }
    dropTableIfExists(a) {
      this.dropObject(a, "table");
    }
    dropViewIfExists(a) {
      this.dropObject(a, "view");
    }
    dropObject(a, o) {
      const s = this.schema ? `"${this.schema}".` : "";
      let l = -942;
      o === "materialized view" && (l = -12003), this.pushQuery(
        e.wrapSqlWithCatch(
          `drop ${o} ${s}${this.formatter.wrap(a)}`,
          l
        )
      ), this._dropRelatedSequenceIfExists(a);
    }
    refreshMaterializedView(a) {
      return this.pushQuery({
        sql: `BEGIN DBMS_MVIEW.REFRESH('${this.schemaNameRaw ? this.schemaNameRaw + "." : ""}${a}'); END;`
      });
    }
    dropMaterializedView(a) {
      this._dropView(a, !1, !0);
    }
    dropMaterializedViewIfExists(a) {
      this.dropObject(a, "materialized view");
    }
  }
  return ui = n, ui;
}
var ci, bl;
function xI() {
  if (bl)
    return ci;
  bl = 1;
  const r = qr, e = xt;
  class t extends r {
    constructor() {
      super(...arguments);
    }
    // checkIn added to the builder to allow the column compiler to change the
    // order via the modifiers ("check" must be after "default")
    checkIn() {
      return this._modifiers.checkIn = e(arguments), this;
    }
  }
  return ci = t, ci;
}
var hi, _l;
function II() {
  if (_l)
    return hi;
  _l = 1;
  var r = Ec;
  function e(t, n) {
    var i = t == null ? 0 : t.length;
    return !!i && r(t, n, 0) > -1;
  }
  return hi = e, hi;
}
var di, wl;
function PI() {
  if (wl)
    return di;
  wl = 1;
  function r(e, t, n) {
    for (var i = -1, a = e == null ? 0 : e.length; ++i < a; )
      if (n(t, e[i]))
        return !0;
    return !1;
  }
  return di = r, di;
}
var fi, $l;
function LI() {
  if ($l)
    return fi;
  $l = 1;
  function r() {
  }
  return fi = r, fi;
}
var pi, Cl;
function BI() {
  if (Cl)
    return pi;
  Cl = 1;
  var r = fu, e = LI(), t = yr, n = 1 / 0, i = r && 1 / t(new r([, -0]))[1] == n ? function(a) {
    return new r(a);
  } : e;
  return pi = i, pi;
}
var mi, vl;
function kI() {
  if (vl)
    return mi;
  vl = 1;
  var r = Yu(), e = II(), t = PI(), n = Zu(), i = BI(), a = yr, o = 200;
  function s(l, u, h) {
    var c = -1, d = e, p = l.length, g = !0, _ = [], f = _;
    if (h)
      g = !1, d = t;
    else if (p >= o) {
      var m = u ? null : i(l);
      if (m)
        return a(m);
      g = !1, d = n, f = new r();
    } else
      f = u ? [] : _;
    e:
      for (; ++c < p; ) {
        var y = l[c], w = u ? u(y) : y;
        if (y = h || y !== 0 ? y : 0, g && w === w) {
          for (var $ = f.length; $--; )
            if (f[$] === w)
              continue e;
          u && f.push(w), _.push(y);
        } else
          d(f, w, h) || (f !== _ && f.push(w), _.push(y));
      }
    return _;
  }
  return mi = s, mi;
}
var gi, El;
function jI() {
  if (El)
    return gi;
  El = 1;
  var r = kI();
  function e(t) {
    return t && t.length ? r(t) : [];
  }
  return gi = e, gi;
}
var yi, Tl;
function MI() {
  if (Tl)
    return yi;
  Tl = 1;
  const r = Ls();
  function e(t) {
    t.pushAdditional(function() {
      const n = this.tableCompiler.tableNameRaw, i = this.tableCompiler.schemaNameRaw, a = r.createAutoIncrementTrigger(
        this.client.logger,
        n,
        i
      );
      this.pushQuery(a);
    });
  }
  return yi = {
    createAutoIncrementTriggerAndSequence: e
  }, yi;
}
var bi, Al;
function kc() {
  if (Al)
    return bi;
  Al = 1;
  const r = jI(), e = ht, t = We, {
    createAutoIncrementTriggerAndSequence: n
  } = MI(), { toNumber: i } = z;
  class a extends t {
    constructor() {
      super(...arguments), this.modifiers = ["defaultTo", "checkIn", "nullable", "comment"];
    }
    increments(s = { primaryKey: !0 }) {
      return n(this), "integer not null" + (this.tableCompiler._canBeAddPrimaryKey(s) ? " primary key" : "");
    }
    bigincrements(s = { primaryKey: !0 }) {
      return n(this), "number(20, 0) not null" + (this.tableCompiler._canBeAddPrimaryKey(s) ? " primary key" : "");
    }
    floating(s) {
      const l = i(s, 0);
      return `float${l ? `(${l})` : ""}`;
    }
    double(s, l) {
      return `number(${i(s, 8)}, ${i(l, 2)})`;
    }
    decimal(s, l) {
      return s === null ? "decimal" : `decimal(${i(s, 8)}, ${i(l, 2)})`;
    }
    integer(s) {
      return s ? `number(${i(s, 11)})` : "integer";
    }
    enu(s) {
      s = r(s);
      const l = (s || []).reduce(
        (u, h) => Math.max(u, String(h).length),
        1
      );
      return this.columnBuilder._modifiers.checkIn = [s], `varchar2(${l})`;
    }
    datetime(s) {
      return s ? "timestamp" : "timestamp with time zone";
    }
    timestamp(s) {
      return s ? "timestamp" : "timestamp with time zone";
    }
    bool() {
      return this.columnBuilder._modifiers.checkIn = [[0, 1]], "number(1, 0)";
    }
    varchar(s) {
      return `varchar2(${i(s, 255)})`;
    }
    // Modifiers
    // ------
    comment(s) {
      const l = this.args[0] || this.defaults("columnName");
      this.pushAdditional(function() {
        this.pushQuery(
          `comment on column ${this.tableCompiler.tableName()}.` + this.formatter.wrap(l) + " is '" + (s || "") + "'"
        );
      }, s);
    }
    checkIn(s) {
      return s === void 0 ? "" : (s instanceof e ? s = s.toQuery() : Array.isArray(s) ? s = s.map((l) => `'${l}'`).join(", ") : s = `'${s}'`, `check (${this.formatter.wrap(this.args[0])} in (${s}))`);
    }
  }
  return a.prototype.tinyint = "smallint", a.prototype.smallint = "smallint", a.prototype.mediumint = "integer", a.prototype.biginteger = "number(20, 0)", a.prototype.text = "clob", a.prototype.time = "timestamp with time zone", a.prototype.bit = "clob", a.prototype.json = "clob", bi = a, bi;
}
var _i, Ol;
function jc() {
  if (Ol)
    return _i;
  Ol = 1;
  const r = Le(), e = ft, t = z, n = Ls(), { isObject: i } = Q;
  class a extends e {
    constructor() {
      super(...arguments);
    }
    addColumns(s, l) {
      if (s.sql.length > 0) {
        l = l || this.addColumnsPrefix;
        const u = s.sql;
        let c = `${this.lowerCase ? "alter table " : "ALTER TABLE "}${this.tableName()} ${l}`;
        s.sql.length > 1 ? c += `(${u.join(", ")})` : c += u.join(", "), this.pushQuery({
          sql: c,
          bindings: s.bindings
        });
      }
    }
    // Compile a rename column command.
    renameColumn(s, l) {
      const u = this.tableName().slice(1, -1);
      return this.pushQuery(
        n.renameColumnTrigger(this.client.logger, u, s, l)
      );
    }
    compileAdd(s) {
      const l = this.formatter.wrap(s), u = this.prefixArray("add column", this.getColumns(s));
      return this.pushQuery({
        sql: `alter table ${l} ${u.join(", ")}`
      });
    }
    // Adds the "create" query to the query sequence.
    createQuery(s, l, u) {
      const h = u && this.tableNameLike() ? " as (select * from " + this.tableNameLike() + " where 0=1)" : " (" + s.sql.join(", ") + this._addChecks() + ")", c = `create table ${this.tableName()}${h}`;
      this.pushQuery({
        // catch "name is already used by an existing object" for workaround for "if not exists"
        sql: l ? r.wrapSqlWithCatch(c, -955) : c,
        bindings: s.bindings
      }), this.single.comment && this.comment(this.single.comment), u && this.addColumns(s, this.addColumnsPrefix);
    }
    // Compiles the comment on the table.
    comment(s) {
      this.pushQuery(`comment on table ${this.tableName()} is '${s}'`);
    }
    dropColumn() {
      const s = t.normalizeArr.apply(null, arguments);
      this.pushQuery(
        `alter table ${this.tableName()} drop (${this.formatter.columnize(
          s
        )})`
      );
    }
    _indexCommand(s, l, u) {
      return this.formatter.wrap(
        r.generateCombinedName(this.client.logger, s, l, u)
      );
    }
    primary(s, l) {
      let u;
      i(l) && ({ constraintName: l, deferrable: u } = l), u = u ? ` deferrable initially ${u}` : "", l = l ? this.formatter.wrap(l) : this.formatter.wrap(`${this.tableNameRaw}_pkey`);
      const h = s;
      let c = [];
      this.grouped.columns && (c = this._getIncrementsColumnNames(), c && c.forEach((d) => {
        h.includes(d) || h.unshift(d);
      })), this.pushQuery(
        `alter table ${this.tableName()} add constraint ${l} primary key (${this.formatter.columnize(
          h
        )})${u}`
      );
    }
    dropPrimary(s) {
      s = s ? this.formatter.wrap(s) : this.formatter.wrap(this.tableNameRaw + "_pkey"), this.pushQuery(
        `alter table ${this.tableName()} drop constraint ${s}`
      );
    }
    index(s, l) {
      l = l ? this.formatter.wrap(l) : this._indexCommand("index", this.tableNameRaw, s), this.pushQuery(
        `create index ${l} on ${this.tableName()} (` + this.formatter.columnize(s) + ")"
      );
    }
    dropIndex(s, l) {
      l = l ? this.formatter.wrap(l) : this._indexCommand("index", this.tableNameRaw, s), this.pushQuery(`drop index ${l}`);
    }
    unique(s, l) {
      let u;
      i(l) && ({ indexName: l, deferrable: u } = l), u = u ? ` deferrable initially ${u}` : "", l = l ? this.formatter.wrap(l) : this._indexCommand("unique", this.tableNameRaw, s), this.pushQuery(
        `alter table ${this.tableName()} add constraint ${l} unique (` + this.formatter.columnize(s) + ")" + u
      );
    }
    dropUnique(s, l) {
      l = l ? this.formatter.wrap(l) : this._indexCommand("unique", this.tableNameRaw, s), this.pushQuery(
        `alter table ${this.tableName()} drop constraint ${l}`
      );
    }
    dropForeign(s, l) {
      l = l ? this.formatter.wrap(l) : this._indexCommand("foreign", this.tableNameRaw, s), this.pushQuery(
        `alter table ${this.tableName()} drop constraint ${l}`
      );
    }
  }
  return a.prototype.addColumnsPrefix = "add ", a.prototype.alterColumnsPrefix = "modify ", _i = a, _i;
}
var wi, Nl;
function Mc() {
  if (Nl)
    return wi;
  Nl = 1;
  const { ReturningHelper: r } = Le(), { isConnectionError: e } = Le(), t = ze, n = SI(), i = xI(), a = kc(), o = jc();
  class s extends t {
    schemaCompiler() {
      return new n(this, ...arguments);
    }
    columnBuilder() {
      return new i(this, ...arguments);
    }
    columnCompiler() {
      return new a(this, ...arguments);
    }
    tableCompiler() {
      return new o(this, ...arguments);
    }
    // Return the database for the Oracle client.
    database() {
      return this.connectionSettings.database;
    }
    // Position the bindings for the query.
    positionBindings(u) {
      let h = 0;
      return u.replace(/\?/g, function() {
        return h += 1, `:${h}`;
      });
    }
    _stream(u, h, c, d) {
      if (!h.sql)
        throw new Error("The query is empty");
      return new Promise(function(p, g) {
        c.on("error", (f) => {
          e(f) && (u.__knex__disposed = f), g(f);
        }), c.on("end", p);
        const _ = u.queryStream(
          h.sql,
          h.bindings,
          d
        );
        _.pipe(c), _.on("error", function(f) {
          g(f), c.emit("error", f);
        });
      });
    }
    // Formatter part
    alias(u, h) {
      return u + " " + h;
    }
    parameter(u, h, c) {
      return u instanceof r && this.driver ? u = new this.driver.OutParam(this.driver.OCCISTRING) : typeof u == "boolean" && (u = u ? 1 : 0), super.parameter(u, h, c);
    }
  }
  return Object.assign(s.prototype, {
    dialect: "oracle",
    driverName: "oracle"
  }), wi = s, wi;
}
var $i, ql;
function QI() {
  if (ql)
    return $i;
  ql = 1;
  const r = qs, e = oe, t = le, n = Ae, i = It, a = Ve, { ReturningHelper: o } = Le(), { isString: s } = Q, l = [
    "columns",
    "join",
    "where",
    "union",
    "group",
    "having",
    "order",
    "lock"
  ];
  class u extends a {
    constructor(c, d, p) {
      super(c, d, p);
      const { onConflict: g } = this.single;
      if (g)
        throw new Error(".onConflict() is not supported for oracledb.");
      this.first = this.select;
    }
    // Compiles an "insert" query, allowing for multiple
    // inserts using a single query statement.
    insert() {
      let c = this.single.insert || [], { returning: d } = this.single;
      if (!Array.isArray(c) && n(this.single.insert) && (c = [this.single.insert]), d && !Array.isArray(d) && (d = [d]), Array.isArray(c) && c.length === 1 && t(c[0]))
        return this._addReturningToSqlAndConvert(
          `insert into ${this.tableName} (${this.formatter.wrap(
            this.single.returning
          )}) values (default)`,
          d,
          this.tableName
        );
      if (t(this.single.insert) && typeof this.single.insert != "function")
        return "";
      const p = this._prepInsert(c), g = {};
      if (s(p))
        return this._addReturningToSqlAndConvert(
          `insert into ${this.tableName} ${p}`,
          d
        );
      if (p.values.length === 1)
        return this._addReturningToSqlAndConvert(
          `insert into ${this.tableName} (${this.formatter.columnize(
            p.columns
          )}) values (${this.client.parameterize(
            p.values[0],
            void 0,
            this.builder,
            this.bindingsHolder
          )})`,
          d,
          this.tableName
        );
      const _ = p.columns.length === 0;
      return g.sql = "begin " + p.values.map((f) => {
        let m;
        const y = _ ? "" : this.client.parameterize(
          f,
          this.client.valueForUndefined,
          this.builder,
          this.bindingsHolder
        ), w = Array.isArray(d) ? d : [d];
        let $ = `insert into ${this.tableName} `;
        d && (m = new o(w.join(":")), g.outParams = (g.outParams || []).concat(m)), _ ? $ += `(${this.formatter.wrap(
          this.single.returning
        )}) values (default)` : $ += `(${this.formatter.columnize(
          p.columns
        )}) values (${y})`, $ += d ? ` returning ROWID into ${this.client.parameter(
          m,
          this.builder,
          this.bindingsHolder
        )}` : "", $ = this.formatter.client.positionBindings($);
        const E = y.replace("DEFAULT, ", "").replace(", DEFAULT", "");
        return `execute immediate '${$.replace(/'/g, "''")}` + (E || d ? "' using " : "") + E + (E && d ? ", " : "") + (d ? "out ?" : "") + ";";
      }).join(" ") + "end;", d && (g.returning = d, g.returningSql = `select ${this.formatter.columnize(d)} from ` + this.tableName + " where ROWID in (" + g.outParams.map((f, m) => `:${m + 1}`).join(", ") + ") order by case ROWID " + g.outParams.map((f, m) => `when CHARTOROWID(:${m + 1}) then ${m}`).join(" ") + " end"), g;
    }
    // Update method, including joins, wheres, order & limits.
    update() {
      const c = this._prepUpdate(this.single.update), d = this.where();
      let { returning: p } = this.single;
      const g = `update ${this.tableName} set ` + c.join(", ") + (d ? ` ${d}` : "");
      return p ? (Array.isArray(p) || (p = [p]), this._addReturningToSqlAndConvert(g, p, this.tableName)) : g;
    }
    // Compiles a `truncate` query.
    truncate() {
      return `truncate table ${this.tableName}`;
    }
    forUpdate() {
      return "for update";
    }
    forShare() {
      return this.client.logger.warn(
        "lock for share is not supported by oracle dialect"
      ), "";
    }
    // Compiles a `columnInfo` query.
    columnInfo() {
      const c = this.single.columnInfo;
      return {
        sql: `select * from xmltable( '/ROWSET/ROW'
      passing dbms_xmlgen.getXMLType('
      select char_col_decl_length, column_name, data_type, data_default, nullable
      from all_tab_columns where table_name = ''${this.client.customWrapIdentifier(this.single.table, e)}'' ')
      columns
      CHAR_COL_DECL_LENGTH number, COLUMN_NAME varchar2(200), DATA_TYPE varchar2(106),
      DATA_DEFAULT clob, NULLABLE varchar2(1))`,
        output(g) {
          const _ = i(
            g,
            function(f, m) {
              return f[m.COLUMN_NAME] = {
                type: m.DATA_TYPE,
                defaultValue: m.DATA_DEFAULT,
                maxLength: m.CHAR_COL_DECL_LENGTH,
                nullable: m.NULLABLE === "Y"
              }, f;
            },
            {}
          );
          return c && _[c] || _;
        }
      };
    }
    select() {
      let c = this.with();
      const d = l.map((p) => this[p]());
      return c += r(d).join(" "), this._surroundQueryWithLimitAndOffset(c);
    }
    aggregate(c) {
      return this._aggregate(c, { aliasSeparator: " " });
    }
    // for single commands only
    _addReturningToSqlAndConvert(c, d, p) {
      const g = {
        sql: c
      };
      if (!d)
        return g;
      const _ = Array.isArray(d) ? d : [d], f = new o(_.join(":"));
      return g.sql = c + " returning ROWID into " + this.client.parameter(f, this.builder, this.bindingsHolder), g.returningSql = `select ${this.formatter.columnize(
        d
      )} from ${p} where ROWID = :1`, g.outParams = [f], g.returning = d, g;
    }
    _surroundQueryWithLimitAndOffset(c) {
      let { limit: d } = this.single;
      const { offset: p } = this.single, g = d || d === 0 || d === "0";
      if (d = +d, !g && !p)
        return c;
      if (c = c || "", g && !p)
        return `select * from (${c}) where rownum <= ${this._getValueOrParameterFromAttribute(
          "limit",
          d
        )}`;
      const _ = +p + (g ? d : 1e13);
      return "select * from (select row_.*, ROWNUM rownum_ from (" + c + ") row_ where rownum <= " + (this.single.skipBinding.offset ? _ : this.client.parameter(_, this.builder, this.bindingsHolder)) + ") where rownum_ > " + this._getValueOrParameterFromAttribute("offset", p);
    }
  }
  return $i = u, $i;
}
var Ci, Rl;
function Xi() {
  if (Rl)
    return Ci;
  Rl = 1;
  const r = Le(), { promisify: e } = P, t = P;
  function n(s, l) {
    this.columnName = s, this.value = l, this.returning = !1;
  }
  n.prototype.toString = function() {
    return "[object BlobHelper:" + this.columnName + "]";
  };
  function i(s, l) {
    return new Promise((u, h) => {
      let c = l === "string" ? "" : Buffer.alloc(0);
      s.on("error", function(d) {
        h(d);
      }), s.on("data", function(d) {
        l === "string" ? c += d : c = Buffer.concat([c, d]);
      }), s.on("end", function() {
        u(c);
      });
    });
  }
  const a = function(s) {
    const l = P;
    let u;
    if (s.type)
      s.type === l.BLOB ? u = "buffer" : s.type === l.CLOB && (u = "string");
    else if (s.iLob)
      s.iLob.type === l.CLOB ? u = "string" : s.iLob.type === l.BLOB && (u = "buffer");
    else
      throw new Error("Unrecognized oracledb lob stream type");
    return u === "string" && s.setEncoding("utf-8"), i(s, u);
  };
  function o(s, l) {
    if (s.executeAsync)
      return;
    s.commitAsync = function() {
      return new Promise((h, c) => {
        this.commit(function(d) {
          if (d)
            return c(d);
          h();
        });
      });
    }, s.rollbackAsync = function() {
      return new Promise((h, c) => {
        this.rollback(function(d) {
          if (d)
            return c(d);
          h();
        });
      });
    };
    const u = e(function(h, c, d, p) {
      if (d = d || {}, d.outFormat = l.driver.OUT_FORMAT_OBJECT || l.driver.OBJECT, !d.outFormat)
        throw new Error("not found oracledb.outFormat constants");
      d.resultSet ? s.execute(
        h,
        c || [],
        d,
        function(g, _) {
          if (g)
            return r.isConnectionError(g) && (s.close().catch(function(w) {
            }), s.__knex__disposed = g), p(g);
          const f = { rows: [], resultSet: _.resultSet }, m = 100, y = function(w, $, E) {
            $.getRows(E, function(C, T) {
              if (C)
                r.isConnectionError(C) && (w.close().catch(function(N) {
                }), w.__knex__disposed = C), $.close(function() {
                  return p(C);
                });
              else {
                if (T.length === 0)
                  return p(null, f);
                if (T.length > 0)
                  if (T.length === E)
                    f.rows = f.rows.concat(T), y(w, $, E);
                  else
                    return f.rows = f.rows.concat(T), p(null, f);
              }
            });
          };
          y(s, _.resultSet, m);
        }
      ) : s.execute(
        h,
        c || [],
        d,
        function(g, _) {
          return g ? (r.isConnectionError(g) && (s.close().catch(function(f) {
          }), s.__knex__disposed = g), p(g)) : p(null, _);
        }
      );
    });
    s.executeAsync = function(h, c, d) {
      return u(h, c, d).then(async (p) => {
        const g = () => p.resultSet ? e(p.resultSet.close).call(p.resultSet) : Promise.resolve(), _ = [];
        if (p.rows && Array.isArray(p.rows))
          for (let f = 0; f < p.rows.length; f++) {
            const m = p.rows[f];
            for (const y in m)
              m[y] instanceof t.Readable && _.push({ index: f, key: y, stream: m[y] });
          }
        try {
          for (const f of _)
            p.rows[f.index][f.key] = await a(f.stream);
        } catch (f) {
          throw await g().catch(() => {
          }), f;
        }
        return await g(), p;
      });
    };
  }
  return r.BlobHelper = n, r.monkeyPatchConnection = o, Ci = r, Ci;
}
var vi, Sl;
function DI() {
  if (Sl)
    return vi;
  Sl = 1;
  const r = ws, e = Rt, t = le, n = Ae, i = QI(), a = Xi().ReturningHelper, o = Xi().BlobHelper, { isString: s } = Q, {
    columnize: l
  } = J;
  class u extends i {
    // Compiles an "insert" query, allowing for multiple
    // inserts using a single query statement.
    insert() {
      const c = this, d = this._prepOutbindings(
        this.single.insert,
        this.single.returning
      ), p = d.outBinding, g = d.returning, _ = d.values;
      if (Array.isArray(_) && _.length === 1 && t(_[0])) {
        const w = this.single.returning ? " (" + this.formatter.wrap(this.single.returning) + ")" : "";
        return this._addReturningToSqlAndConvert(
          "insert into " + this.tableName + w + " values (default)",
          p[0],
          this.tableName,
          g
        );
      }
      if (t(this.single.insert) && typeof this.single.insert != "function")
        return "";
      const f = this._prepInsert(_), m = {};
      if (s(f))
        return this._addReturningToSqlAndConvert(
          "insert into " + this.tableName + " " + f,
          p[0],
          this.tableName,
          g
        );
      if (f.values.length === 1)
        return this._addReturningToSqlAndConvert(
          "insert into " + this.tableName + " (" + this.formatter.columnize(f.columns) + ") values (" + this.client.parameterize(
            f.values[0],
            void 0,
            this.builder,
            this.bindingsHolder
          ) + ")",
          p[0],
          this.tableName,
          g
        );
      const y = f.columns.length === 0;
      return m.returning = g, m.sql = "begin " + f.values.map(function(w, $) {
        const E = y ? "" : c.client.parameterize(
          w,
          c.client.valueForUndefined,
          c.builder,
          c.bindingsHolder
        );
        let C = "insert into " + c.tableName;
        y ? C += " (" + c.formatter.wrap(c.single.returning) + ") values (default)" : C += " (" + c.formatter.columnize(f.columns) + ") values (" + E + ")";
        let T = "", N = "", I = "", L = "";
        e(w, function(H) {
          H instanceof o || (I += " ?,");
        }), I = I.slice(0, -1), p[$].forEach(function(H) {
          const j = H.columnName || H;
          if (T += c.formatter.wrap(j) + ",", N += " ?,", L += " out ?,", H instanceof o)
            return c.formatter.bindings.push(H);
          c.formatter.bindings.push(new a(j));
        }), T = T.slice(0, -1), N = N.slice(0, -1), L = L.slice(0, -1), T && N && (C += " returning " + T + " into" + N), C = c.formatter.client.positionBindings(C);
        const K = E.replace(/DEFAULT, /g, "").replace(/, DEFAULT/g, "").replace("EMPTY_BLOB(), ", "").replace(", EMPTY_BLOB()", "");
        return "execute immediate '" + C.replace(/'/g, "''") + (K || w ? "' using " : "") + K + (K && L ? "," : "") + L + ";";
      }).join(" ") + "end;", m.outBinding = p, g[0] === "*" && (m.returningSql = function() {
        return "select * from " + c.tableName + " where ROWID in (" + this.outBinding.map(function(w, $) {
          return ":" + ($ + 1);
        }).join(", ") + ") order by case ROWID " + this.outBinding.map(function(w, $) {
          return "when CHARTOROWID(:" + ($ + 1) + ") then " + $;
        }).join(" ") + " end";
      }), m;
    }
    with() {
      const c = [];
      if (this.grouped.with)
        for (const p of this.grouped.with)
          p.recursive && (c.push(p), p.recursive = !1);
      const d = super.with();
      for (const p of c)
        p.recursive = !0;
      return d;
    }
    _addReturningToSqlAndConvert(c, d, p, g) {
      const _ = this, f = {
        sql: c
      };
      if (!d)
        return f;
      const m = Array.isArray(d) ? d : [d];
      let y = "", w = "";
      return m.forEach(function($) {
        const E = $.columnName || $;
        if (y += _.formatter.wrap(E) + ",", w += "?,", $ instanceof o)
          return _.formatter.bindings.push($);
        _.formatter.bindings.push(new a(E));
      }), f.sql = c, y = y.slice(0, -1), w = w.slice(0, -1), y && w && (f.sql += " returning " + y + " into " + w), f.outBinding = [d], g[0] === "*" && (f.returningSql = function() {
        return "select * from " + _.tableName + " where ROWID = :1";
      }), f.returning = g, f;
    }
    _prepOutbindings(c, d) {
      const p = {};
      let g = c || [], _ = d || [];
      !Array.isArray(g) && n(c) && (g = [g]), _ && !Array.isArray(_) && (_ = [_]);
      const f = [];
      return e(g, function(m, y) {
        _[0] === "*" ? f[y] = ["ROWID"] : f[y] = r(_), e(m, function(w, $) {
          if (w instanceof Buffer) {
            m[$] = new o($, w);
            const E = f[y].indexOf($);
            E >= 0 && (f[y].splice(E, 1), m[$].returning = !0), f[y].push(m[$]);
          }
          w === void 0 && delete g[y][$];
        });
      }), p.returning = _, p.outBinding = f, p.values = g, p;
    }
    _groupOrder(c, d) {
      return super._groupOrderNulls(c, d);
    }
    update() {
      const c = this, d = {}, p = this._prepOutbindings(
        this.single.update || this.single.counter,
        this.single.returning
      ), g = p.outBinding, _ = p.returning, f = this._prepUpdate(this.single.update), m = this.where();
      let y = "", w = "";
      return t(f) && typeof this.single.update != "function" ? "" : (g.forEach(function($) {
        $.forEach(function(E) {
          const C = E.columnName || E;
          if (y += c.formatter.wrap(C) + ",", w += " ?,", E instanceof o)
            return c.formatter.bindings.push(E);
          c.formatter.bindings.push(new a(C));
        });
      }), y = y.slice(0, -1), w = w.slice(0, -1), d.outBinding = g, d.returning = _, d.sql = "update " + this.tableName + " set " + f.join(", ") + (m ? " " + m : ""), g.length && !t(g[0]) && (d.sql += " returning " + y + " into" + w), _[0] === "*" && (d.returningSql = function() {
        let $ = "select * from " + c.tableName;
        const E = this.rowsAffected.length || this.rowsAffected;
        let C = " where ROWID in (", T = ") order by case ROWID ";
        for (let N = 0; N < E; N++)
          this.returning[0] === "*" && (C += ":" + (N + 1) + ", ", T += "when CHARTOROWID(:" + (N + 1) + ") then " + N + " ");
        return this.returning[0] === "*" && (this.returning = this.returning.slice(0, -1), C = C.slice(0, -2), T = T.slice(0, -1)), $ += C + T + " end";
      }), d);
    }
    _jsonPathWrap(c) {
      return `'${c.path || c[1]}'`;
    }
    // Json functions
    jsonExtract(c) {
      return this._jsonExtract(
        c.singleValue ? "json_value" : "json_query",
        c
      );
    }
    jsonSet(c) {
      return `json_transform(${l(
        c.column,
        this.builder,
        this.client,
        this.bindingsHolder
      )}, set ${this.client.parameter(
        c.path,
        this.builder,
        this.bindingsHolder
      )} = ${this.client.parameter(
        c.value,
        this.builder,
        this.bindingsHolder
      )})`;
    }
    jsonInsert(c) {
      return `json_transform(${l(
        c.column,
        this.builder,
        this.client,
        this.bindingsHolder
      )}, insert ${this.client.parameter(
        c.path,
        this.builder,
        this.bindingsHolder
      )} = ${this.client.parameter(
        c.value,
        this.builder,
        this.bindingsHolder
      )})`;
    }
    jsonRemove(c) {
      const d = `json_transform(${l(
        c.column,
        this.builder,
        this.client,
        this.bindingsHolder
      )}, remove ${this.client.parameter(
        c.path,
        this.builder,
        this.bindingsHolder
      )})`;
      return c.alias ? this.client.alias(d, this.formatter.wrap(c.alias)) : d;
    }
    whereJsonPath(c) {
      return this._whereJsonPath("json_value", c);
    }
    whereJsonSupersetOf(c) {
      throw new Error(
        "Json superset where clause not actually supported by Oracle"
      );
    }
    whereJsonSubsetOf(c) {
      throw new Error(
        "Json subset where clause not actually supported by Oracle"
      );
    }
    onJsonPathEquals(c) {
      return this._onJsonPathEquals("json_value", c);
    }
  }
  return vi = u, vi;
}
var Ei, xl;
function FI() {
  if (xl)
    return Ei;
  xl = 1;
  const r = jc();
  class e extends r {
    constructor(n, i) {
      super(n, i);
    }
    _setNullableState(n, i) {
      const a = i ? "NULL" : "NOT NULL", o = `alter table ${this.tableName()} modify (${this.formatter.wrap(
        n
      )} ${a})`;
      return this.pushQuery({
        sql: o
      });
    }
  }
  return Ei = e, Ei;
}
var Ti, Il;
function UI() {
  if (Il)
    return Ti;
  Il = 1;
  const r = kc(), { isObject: e } = Q;
  class t extends r {
    constructor() {
      super(...arguments), this.modifiers = ["defaultTo", "nullable", "comment"], this._addCheckModifiers();
    }
    datetime(i) {
      let a;
      return e(i) ? { useTz: a } = i : a = !i, a ? "timestamp with local time zone" : "timestamp";
    }
    timestamp(i) {
      let a;
      return e(i) ? { useTz: a } = i : a = !i, a ? "timestamp with local time zone" : "timestamp";
    }
    checkRegex(i, a) {
      return this._check(
        `REGEXP_LIKE(${this.formatter.wrap(
          this.getColumnName()
        )},${this.client._escapeBinding(i)})`,
        a
      );
    }
    json() {
      return `varchar2(4000) check (${this.formatter.columnize(
        this.getColumnName()
      )} is json)`;
    }
    jsonb() {
      return this.json();
    }
  }
  return t.prototype.time = "timestamp with local time zone", t.prototype.uuid = ({ useBinaryUuid: n = !1 } = {}) => n ? "raw(16)" : "char(36)", Ti = t, Ti;
}
var Ai, Pl;
function HI() {
  if (Pl)
    return Ai;
  Pl = 1;
  const r = pt;
  class e extends r {
    constructor(n, i) {
      super(n, i);
    }
    createOrReplace() {
      this.createQuery(this.columns, this.selectQuery, !1, !0);
    }
    createMaterializedView() {
      this.createQuery(this.columns, this.selectQuery, !0);
    }
  }
  return Ai = e, Ai;
}
var Oi, Ll;
function VI() {
  if (Ll)
    return Oi;
  Ll = 1;
  const r = Bt;
  class e extends r {
    constructor() {
      super(...arguments);
    }
    checkOption() {
      this._single.checkOption = "default_option";
    }
  }
  return Oi = e, Oi;
}
var Ni, Bl;
function WI() {
  if (Bl)
    return Ni;
  Bl = 1;
  const r = Oe, { timeout: e, KnexTimeoutError: t } = Te, n = ae("knex:tx");
  return Ni = class extends r {
    // disable autocommit to allow correct behavior (default is true)
    begin(a) {
      return this.isolationLevel && this.client.logger.warn(
        "Transaction isolation is not currently supported for Oracle"
      ), Promise.resolve();
    }
    async commit(a, o) {
      this._completed = !0;
      try {
        await a.commitAsync(), this._resolver(o);
      } catch (s) {
        this._rejecter(s);
      }
    }
    release(a, o) {
      return this._resolver(o);
    }
    rollback(a, o) {
      return this._completed = !0, n("%s: rolling back", this.txid), e(a.rollbackAsync(), 5e3).catch((s) => {
        if (!(s instanceof t))
          return Promise.reject(s);
        this._rejecter(s);
      }).then(() => {
        if (o === void 0) {
          if (this.doNotRejectOnRollback) {
            this._resolver();
            return;
          }
          o = new Error(`Transaction rejected with non-error: ${o}`);
        }
        this._rejecter(o);
      });
    }
    savepoint(a) {
      return this.query(a, `SAVEPOINT ${this.txid}`);
    }
    async acquireConnection(a, o) {
      const s = a && a.connection, l = s || await this.client.acquireConnection();
      try {
        return l.__knexTxId = this.txid, l.isTransaction = !0, await o(l);
      } finally {
        n("%s: releasing connection", this.txid), l.isTransaction = !1;
        try {
          await l.commitAsync();
        } catch (u) {
          this._rejecter(u);
        } finally {
          s ? n("%s: not releasing external connection", this.txid) : await this.client.releaseConnection(l);
        }
      }
    }
  }, Ni;
}
var qi, kl;
function zI() {
  if (kl)
    return qi;
  kl = 1;
  const r = Rt, e = Qu, t = le, n = He, i = Rr, a = DI(), o = FI(), s = UI(), {
    BlobHelper: l,
    ReturningHelper: u,
    monkeyPatchConnection: h
  } = Xi(), c = HI(), d = VI(), p = WI(), g = Mc(), { isString: _ } = Q, { outputQuery: f, unwrapRaw: m } = J, { compileCallback: y } = Ue;
  class w extends g {
    constructor(C) {
      super(C), this.driver && (process.env.UV_THREADPOOL_SIZE = process.env.UV_THREADPOOL_SIZE || 1, process.env.UV_THREADPOOL_SIZE = parseInt(process.env.UV_THREADPOOL_SIZE) + this.driver.poolMax);
    }
    _driver() {
      const C = this, T = P;
      return C.fetchAsString = [], this.config.fetchAsString && Array.isArray(this.config.fetchAsString) && this.config.fetchAsString.forEach(function(N) {
        _(N) && (N = N.toUpperCase(), T[N] && (N !== "NUMBER" && N !== "DATE" && N !== "CLOB" && N !== "BUFFER" && this.logger.warn(
          'Only "date", "number", "clob" and "buffer" are supported for fetchAsString'
        ), C.fetchAsString.push(T[N])));
      }), T;
    }
    queryCompiler(C, T) {
      return new a(this, C, T);
    }
    tableCompiler() {
      return new o(this, ...arguments);
    }
    columnCompiler() {
      return new s(this, ...arguments);
    }
    viewBuilder() {
      return new d(this, ...arguments);
    }
    viewCompiler() {
      return new c(this, ...arguments);
    }
    formatter(C) {
      return new i(this, C);
    }
    transaction() {
      return new p(this, ...arguments);
    }
    prepBindings(C) {
      return n(C, (T) => T instanceof l && this.driver ? { type: this.driver.BLOB, dir: this.driver.BIND_OUT } : T instanceof u && this.driver ? { type: this.driver.STRING, dir: this.driver.BIND_OUT } : typeof T == "boolean" ? T ? 1 : 0 : T);
    }
    // Checks whether a value is a function... if it is, we compile it
    // otherwise we check whether it's a raw
    parameter(C, T, N) {
      return typeof C == "function" ? f(
        y(C, void 0, this, N),
        !0,
        T,
        this
      ) : C instanceof l ? (N.bindings.push(C.value), "?") : m(C, !0, T, this, N) || "?";
    }
    // Get a raw connection, called by the `pool` whenever a new
    // connection needs to be added to the pool.
    acquireRawConnection() {
      const C = this;
      return new Promise(function(N, I) {
        const L = C.connectionSettings.externalAuth ? { externalAuth: C.connectionSettings.externalAuth } : {
          user: C.connectionSettings.user,
          password: C.connectionSettings.password
        };
        L.connectString = $(
          C.connectionSettings
        ), C.connectionSettings.prefetchRowCount && (L.prefetchRows = C.connectionSettings.prefetchRowCount), C.connectionSettings.stmtCacheSize !== void 0 && (L.stmtCacheSize = C.connectionSettings.stmtCacheSize), C.driver.fetchAsString = C.fetchAsString, C.driver.getConnection(L, function(K, H) {
          if (K)
            return I(K);
          h(H, C), N(H);
        });
      });
    }
    // Used to explicitly close a connection, called internally by the pool
    // when a connection times out or the pool is shutdown.
    destroyRawConnection(C) {
      return C.release();
    }
    // Runs the query on the specified connection, providing the bindings
    // and any other necessary prep work.
    _query(C, T) {
      if (!T.sql)
        throw new Error("The query is empty");
      const N = { autoCommit: !1 };
      return T.method === "select" && (N.resultSet = !0), C.executeAsync(T.sql, T.bindings, N).then(async function(I) {
        let L = e(I.outBinds);
        if (T.response = I.rows || [], T.rowsAffected = I.rows ? I.rows.rowsAffected : I.rowsAffected, T.method === "raw" && L.length > 0)
          return {
            response: L
          };
        if (T.method === "update") {
          const j = T.rowsAffected.length || T.rowsAffected, pe = [], ee = [], re = (te) => function(W, X) {
            const Re = X * j;
            ee.push(L[te + Re]);
          };
          for (let te = 0; te < j; te++)
            pe.push(T.outBinding[0]), r(T.outBinding[0], re(te));
          L = ee, T.outBinding = pe;
        }
        if (!T.returning && L.length === 0)
          return C.isTransaction || await C.commitAsync(), T;
        const K = [];
        let H = 0;
        for (let j = 0; j < T.outBinding.length; j++) {
          const pe = T.outBinding[j];
          H = H + (T.outBinding[j - 1] ? T.outBinding[j - 1].length : 0);
          for (let ee = 0; ee < pe.length; ee++) {
            const re = pe[ee];
            await new Promise(function(te, W) {
              if (re instanceof l) {
                const X = L[ee + H];
                re.returning && (T.response[j] = T.response[j] || {}, T.response[j][re.columnName] = re.value), X.on("error", function(Re) {
                  W(Re);
                }), X.on("finish", function() {
                  te();
                }), X.write(re.value), X.end();
              } else
                T.outBinding[j][ee] === "ROWID" ? (K.push(L[ee + H]), te()) : (T.response[j] = T.response[j] || {}, T.response[j][re] = L[ee + H], te());
            });
          }
        }
        if (C.isTransaction)
          return T;
        if (await C.commitAsync(), T.returningSql) {
          const j = await C.executeAsync(
            T.returningSql(),
            K,
            { resultSet: !0 }
          );
          T.response = j.rows;
        }
        return T;
      });
    }
    // Process the response as returned from the query.
    processResponse(C, T) {
      const { response: N } = C;
      if (C.output)
        return C.output.call(T, N);
      switch (C.method) {
        case "select":
          return N;
        case "first":
          return N[0];
        case "pluck":
          return n(N, C.pluck);
        case "insert":
        case "del":
        case "update":
        case "counter":
          return C.returning && !t(C.returning) ? N : C.rowsAffected !== void 0 ? C.rowsAffected : 1;
        default:
          return N;
      }
    }
    processPassedConnection(C) {
      h(C, this);
    }
  }
  w.prototype.driverName = "oracledb";
  function $(E) {
    return E.connectString ? E.connectString : E.port ? E.host + ":" + E.port + "/" + E.database : E.host + "/" + E.database;
  }
  return qi = w, qi;
}
var Ri, jl;
function JI() {
  if (jl)
    return Ri;
  jl = 1;
  const r = xr();
  class e extends r {
    constructor(...n) {
      super(...n), this.driverName = "pgnative", this.canCancelQuery = !0;
    }
    _driver() {
      return P.native;
    }
    _stream(n, i, a, o) {
      if (!i.sql)
        throw new Error("The query is empty");
      const s = this;
      return new Promise((l, u) => (a.on("error", u), a.on("end", l), s._query(n, i).then((h) => h.response).then(({ rows: h }) => h.forEach((c) => a.write(c))).catch(function(h) {
        a.emit("error", h);
      }).then(function() {
        a.end();
      })));
    }
    async cancelQuery(n) {
      try {
        return await this._wrappedCancelQueryCall(null, n);
      } catch (i) {
        throw this.logger.warn(`Connection Error: ${i}`), i;
      }
    }
    _wrappedCancelQueryCall(n, i) {
      return new Promise(function(a, o) {
        i.native.cancel(function(s) {
          if (s) {
            o(s);
            return;
          }
          a(!0);
        });
      });
    }
  }
  return Ri = e, Ri;
}
var Si, Ml;
function KI() {
  if (Ml)
    return Si;
  Ml = 1;
  const r = Oe;
  return Si = class extends r {
    begin(t) {
      return this.isolationLevel ? this.query(t, `BEGIN ISOLATION LEVEL ${this.isolationLevel};`) : this.query(t, "BEGIN;");
    }
    savepoint(t) {
      return this.trxClient.logger("Redshift does not support savepoints."), Promise.resolve();
    }
    release(t, n) {
      return this.trxClient.logger("Redshift does not support savepoints."), Promise.resolve();
    }
    rollbackTo(t, n) {
      return this.trxClient.logger("Redshift does not support savepoints."), Promise.resolve();
    }
  }, Si;
}
var xi, Ql;
function GI() {
  if (Ql)
    return xi;
  Ql = 1;
  const r = Ve, e = Ss(), t = oe, {
    columnize: n
  } = J;
  class i extends e {
    truncate() {
      return `truncate ${this.tableName.toLowerCase()}`;
    }
    // Compiles an `insert` query, allowing for multiple
    // inserts using a single query statement.
    insert() {
      const o = r.prototype.insert.apply(this, arguments);
      return o === "" ? o : (this._slightReturn(), {
        sql: o
      });
    }
    // Compiles an `update` query, warning on unsupported returning
    update() {
      const o = r.prototype.update.apply(this, arguments);
      return this._slightReturn(), {
        sql: o
      };
    }
    // Compiles an `delete` query, warning on unsupported returning
    del() {
      const o = r.prototype.del.apply(this, arguments);
      return this._slightReturn(), {
        sql: o
      };
    }
    // simple: if trying to return, warn
    _slightReturn() {
      this.single.isReturning && this.client.logger.warn(
        "insert/update/delete returning is not supported by redshift dialect"
      );
    }
    forUpdate() {
      return this.client.logger.warn("table lock is not supported by redshift dialect"), "";
    }
    forShare() {
      return this.client.logger.warn(
        "lock for share is not supported by redshift dialect"
      ), "";
    }
    forNoKeyUpdate() {
      return this.client.logger.warn("table lock is not supported by redshift dialect"), "";
    }
    forKeyShare() {
      return this.client.logger.warn(
        "lock for share is not supported by redshift dialect"
      ), "";
    }
    // Compiles a columnInfo query
    columnInfo() {
      const o = this.single.columnInfo;
      let s = this.single.schema;
      const l = this.client.customWrapIdentifier(this.single.table, t);
      s && (s = this.client.customWrapIdentifier(s, t));
      const u = "select * from information_schema.columns where table_name = ? and table_catalog = ?", h = [
        l.toLowerCase(),
        this.client.database().toLowerCase()
      ];
      return this._buildColumnInfoQuery(s, u, h, o);
    }
    jsonExtract(o) {
      let s;
      return Array.isArray(o.column) ? s = o.column : s = [o], s.map((l) => {
        const u = `json_extract_path_text(${n(
          l.column || l[0],
          this.builder,
          this.client,
          this.bindingsHolder
        )}, ${this.client.toPathForJson(
          o.path || l[1],
          this.builder,
          this.bindingsHolder
        )})`, h = l.alias || l[2];
        return h ? this.client.alias(u, this.formatter.wrap(h)) : u;
      }).join(", ");
    }
    jsonSet(o) {
      throw new Error("Json set is not supported by Redshift");
    }
    jsonInsert(o) {
      throw new Error("Json insert is not supported by Redshift");
    }
    jsonRemove(o) {
      throw new Error("Json remove is not supported by Redshift");
    }
    whereJsonPath(o) {
      return this._whereJsonPath(
        "json_extract_path_text",
        Object.assign({}, o, {
          path: this.client.toPathForJson(o.path)
        })
      );
    }
    whereJsonSupersetOf(o) {
      throw new Error("Json superset is not supported by Redshift");
    }
    whereJsonSubsetOf(o) {
      throw new Error("Json subset is not supported by Redshift");
    }
    onJsonPathEquals(o) {
      return this._onJsonPathEquals("json_extract_path_text", o);
    }
  }
  return xi = i, xi;
}
var Ii, Dl;
function YI() {
  if (Dl)
    return Ii;
  Dl = 1;
  const r = qr;
  class e extends r {
    constructor() {
      super(...arguments);
    }
    // primary needs to set not null on non-preexisting columns, or fail
    primary() {
      return this.notNullable(), super.primary(...arguments);
    }
    index() {
      return this.client.logger.warn(
        "Redshift does not support the creation of indexes."
      ), this;
    }
  }
  return Ii = e, Ii;
}
var Pi, Fl;
function XI() {
  if (Fl)
    return Pi;
  Fl = 1;
  const r = xs(), e = We;
  class t extends r {
    constructor() {
      super(...arguments);
    }
    // Types:
    // ------
    bit(i) {
      return i.length !== !1 ? `char(${i.length})` : "char(1)";
    }
    datetime(i) {
      return i ? "timestamp" : "timestamptz";
    }
    timestamp(i) {
      return i ? "timestamp" : "timestamptz";
    }
    // Modifiers:
    // ------
    comment(i) {
      this.pushAdditional(function() {
        this.pushQuery(
          `comment on column ${this.tableCompiler.tableName()}.` + this.formatter.wrap(this.args[0]) + " is " + (i ? `'${i}'` : "NULL")
        );
      }, i);
    }
  }
  return t.prototype.increments = ({ primaryKey: n = !0 } = {}) => "integer identity(1,1)" + (n ? " primary key" : "") + " not null", t.prototype.bigincrements = ({
    primaryKey: n = !0
  } = {}) => "bigint identity(1,1)" + (n ? " primary key" : "") + " not null", t.prototype.binary = "varchar(max)", t.prototype.blob = "varchar(max)", t.prototype.enu = "varchar(255)", t.prototype.enum = "varchar(255)", t.prototype.json = "varchar(max)", t.prototype.jsonb = "varchar(max)", t.prototype.longblob = "varchar(max)", t.prototype.mediumblob = "varchar(16777218)", t.prototype.set = "text", t.prototype.text = "varchar(max)", t.prototype.tinyblob = "varchar(256)", t.prototype.uuid = e.prototype.uuid, t.prototype.varbinary = "varchar(max)", t.prototype.bigint = "bigint", t.prototype.bool = "boolean", t.prototype.double = "double precision", t.prototype.floating = "real", t.prototype.smallint = "smallint", t.prototype.tinyint = "smallint", Pi = t, Pi;
}
var Li, Ul;
function ZI() {
  if (Ul)
    return Li;
  Ul = 1;
  const r = Cr, e = Is();
  class t extends e {
    constructor() {
      super(...arguments);
    }
    index(i, a, o) {
      this.client.logger.warn(
        "Redshift does not support the creation of indexes."
      );
    }
    dropIndex(i, a) {
      this.client.logger.warn(
        "Redshift does not support the deletion of indexes."
      );
    }
    // TODO: have to disable setting not null on columns that already exist...
    // Adds the "create" query to the query sequence.
    createQuery(i, a, o) {
      const s = a ? "create table if not exists " : "create table ", l = " (" + i.sql.join(", ") + this._addChecks() + ")";
      let u = s + this.tableName() + (o && this.tableNameLike() ? " (like " + this.tableNameLike() + ")" : l);
      this.single.inherits && (u += ` like (${this.formatter.wrap(this.single.inherits)})`), this.pushQuery({
        sql: u,
        bindings: i.bindings
      }), r(this.single, "comment") && this.comment(this.single.comment), o && this.addColumns(i, this.addColumnsPrefix);
    }
    primary(i, a) {
      const o = this;
      a = a ? o.formatter.wrap(a) : o.formatter.wrap(`${this.tableNameRaw}_pkey`), i.constructor !== Array && (i = [i]);
      const s = o.grouped.columns;
      if (s)
        for (let l = 0; l < i.length; l++) {
          let u = s.find(
            (c) => c.grouping === "columns" && c.builder && c.builder._method === "add" && c.builder._args && c.builder._args.indexOf(i[l]) > -1
          );
          if (u && (u = u.builder), !(u && u._modifiers && u._modifiers.nullable && u._modifiers.nullable[0] === !1))
            return u ? this.client.logger.warn(
              "Redshift does not allow primary keys to contain nullable columns."
            ) : this.client.logger.warn(
              "Redshift does not allow primary keys to contain nonexistent columns."
            );
        }
      return o.pushQuery(
        `alter table ${o.tableName()} add constraint ${a} primary key (${o.formatter.columnize(
          i
        )})`
      );
    }
    // Compiles column add. Redshift can only add one column per ALTER TABLE, so core addColumns doesn't work.  #2545
    addColumns(i, a, o) {
      if (a === this.alterColumnsPrefix)
        super.addColumns(i, a, o);
      else {
        a = a || this.addColumnsPrefix, o = o || this.getColumns();
        for (const s of o) {
          const l = this.tableName(), u = s.compileColumn();
          this.pushQuery({
            sql: `alter table ${l} ${a}${u}`,
            bindings: []
          });
        }
      }
    }
  }
  return Li = t, Li;
}
var Bi, Hl;
function e0() {
  if (Hl)
    return Bi;
  Hl = 1;
  const r = Lc();
  class e extends r {
    constructor() {
      super(...arguments);
    }
  }
  return Bi = e, Bi;
}
var ki, Vl;
function t0() {
  if (Vl)
    return ki;
  Vl = 1;
  const r = Ps();
  class e extends r {
    constructor(n, i) {
      super(n, i);
    }
  }
  return ki = e, ki;
}
var ji, Wl;
function r0() {
  if (Wl)
    return ji;
  Wl = 1;
  const r = xr(), e = He, t = KI(), n = GI(), i = YI(), a = XI(), o = ZI(), s = e0(), l = t0();
  class u extends r {
    transaction() {
      return new t(this, ...arguments);
    }
    queryCompiler(c, d) {
      return new n(this, c, d);
    }
    columnBuilder() {
      return new i(this, ...arguments);
    }
    columnCompiler() {
      return new a(this, ...arguments);
    }
    tableCompiler() {
      return new o(this, ...arguments);
    }
    schemaCompiler() {
      return new s(this, ...arguments);
    }
    viewCompiler() {
      return new l(this, ...arguments);
    }
    _driver() {
      return P;
    }
    // Ensures the response is returned in the same format as other clients.
    processResponse(c, d) {
      const p = c.response;
      return c.output ? c.output.call(d, p) : c.method === "raw" ? p : p.command === "SELECT" ? c.method === "first" ? p.rows[0] : c.method === "pluck" ? e(p.rows, c.pluck) : p.rows : p.command === "INSERT" || p.command === "UPDATE" || p.command === "DELETE" ? p.rowCount : p;
    }
    toPathForJson(c, d, p) {
      return c.replace(/^(\$\.)/, "").split(".").map(
        (function(g) {
          return this.parameter(g, d, p);
        }).bind(this)
      ).join(", ");
    }
  }
  return Object.assign(u.prototype, {
    dialect: "redshift",
    driverName: "pg-redshift"
  }), ji = u, ji;
}
Object.defineProperty(Sr, "__esModule", { value: !0 });
Sr.getDialectByNameOrAlias = void 0;
const { resolveClientNameWithAliases: n0 } = z, i0 = Object.freeze({
  "better-sqlite3": () => rI(),
  cockroachdb: () => cI(),
  mssql: () => _I(),
  mysql: () => Bc(),
  mysql2: () => RI(),
  oracle: () => Mc(),
  oracledb: () => zI(),
  pgnative: () => JI(),
  postgres: () => xr(),
  redshift: () => r0(),
  sqlite3: () => Ic()
});
function s0(r) {
  const e = n0(r), t = i0[e];
  if (!t)
    throw new Error(`Invalid clientName given: ${r}`);
  return t();
}
Sr.getDialectByNameOrAlias = s0;
const o0 = ze, { SUPPORTED_CLIENTS: a0 } = Es, zl = kx, { getDialectByNameOrAlias: l0 } = Sr;
function u0(r) {
  let e, t;
  const n = typeof r == "string" ? Object.assign(zl(r), arguments[2]) : r;
  if (arguments.length === 0 || !n.client && !n.dialect)
    e = o0;
  else if (typeof n.client == "function")
    e = n.client;
  else {
    const i = n.client || n.dialect;
    if (!a0.includes(i))
      throw new Error(
        `knex: Unknown configuration option 'client' value ${i}. Note that it is case-sensitive, check documentation for supported values.`
      );
    e = l0(i);
  }
  return typeof n.connection == "string" ? t = Object.assign({}, n, {
    connection: zl(n.connection).connection
  }) : t = Object.assign({}, n), {
    resolvedConfig: t,
    Dialect: e
  };
}
var c0 = {
  resolveConfig: u0
};
const h0 = ze, d0 = Ne, f0 = Su, p0 = Hu, { KnexTimeoutError: m0 } = Te, { resolveConfig: g0 } = c0, y0 = $c, b0 = Bt, _0 = qr, w0 = vc;
function qe(r) {
  const { resolvedConfig: e, Dialect: t } = g0(...arguments), n = p0(new t(e));
  return e.userParams && (n.userParams = e.userParams), n;
}
qe.Client = h0;
qe.KnexTimeoutError = m0;
qe.QueryBuilder = {
  extend: function(r, e) {
    d0.extend(r, e), f0.push(r);
  }
};
qe.SchemaBuilder = {
  extend: function(r, e) {
    y0.extend(r, e);
  }
};
qe.ViewBuilder = {
  extend: function(r, e) {
    b0.extend(r, e);
  }
};
qe.ColumnBuilder = {
  extend: function(r, e) {
    _0.extend(r, e);
  }
};
qe.TableBuilder = {
  extend: function(r, e) {
    w0.extend(r, e);
  }
};
var $0 = qe;
const C0 = $0;
var v0 = C0;
const Ot = v0;
Ot.knex = Ot;
Ot.default = Ot;
var E0 = Ot;
class Y0 extends E0.knex.Client {
  constructor(e = {}) {
    super(e), this.driverName = "odbc", this.driverName && e.connection && (this.initializeDriver(), (!e.pool || e.pool && e.pool.max !== 0) && this.initializePool(e));
  }
  _driver() {
    return require("odbc");
  }
  wrapIdentifierImpl(e) {
    return e;
  }
  printDebug(e) {
    (void 0).DEBUG;
  }
  // Get a raw connection, called by the pool manager whenever a new
  // connection needs to be added to the pool.
  async acquireRawConnection() {
    this.printDebug("acquiring raw connection");
    const e = this.config.connection;
    return await this.driver.connect(
      this._getConnectionString(e)
    );
  }
  // Used to explicitly close a connection, called internally by the pool manager
  // when a connection times out or the pool is shutdown.
  async destroyRawConnection(e) {
    return await e.close();
  }
  _getConnectionString(e = {}) {
    const t = e.connectionStringParams || {}, n = Object.keys(
      t
    ).reduce((i, a) => {
      const o = t[a];
      return `${i}${a}=${o};`;
    }, "");
    return `${`DRIVER=${e.driver};SYSTEM=${e.host};HOSTNAME=${e.host};PORT=${e.port};DATABASE=${e.database};UID=${e.user};PWD=${e.password};`}${n}`;
  }
  // Runs the query on the specified connection, providing the bindings
  // and any other necessary prep work.
  async _query(e, t) {
    (!t || typeof t == "string") && (t = { sql: t });
    const n = (t.method !== "raw" ? t.method : t.sql.split(" ")[0]).toLowerCase();
    if (t.sqlMethod = n, n === "select" || n === "first" || n === "pluck") {
      const a = await e.query(t.sql, t.bindings);
      return a && (t.response = { rows: a, rowCount: a.length }), t;
    }
    const i = await e.createStatement();
    return await i.prepare(t.sql), await i.bind(t.bindings), t.response = await i.execute(), t;
  }
  processResponse(e, t) {
    if (e === null)
      return null;
    const n = e.response, i = e.sqlMethod, { rows: a } = n;
    if (e.output)
      return e.output.call(t, n);
    switch (i) {
      case "select":
      case "pluck":
      case "first":
        return i === "pluck" ? a.map(e.pluck) : i === "first" ? a[0] : a;
      case "insert":
      case "del":
      case "delete":
      case "update":
      case "counter":
        return n.rowCount;
      default:
        return n;
    }
  }
}
export {
  Y0 as default
};
//# sourceMappingURL=index.es.js.map
