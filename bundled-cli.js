#!/usr/bin/env node
"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) =>
  function __require() {
    return (
      mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod),
      mod.exports
    );
  };

// node_modules/.pnpm/sisteransi@1.0.5/node_modules/sisteransi/src/index.js
var require_src = __commonJS({
  "node_modules/.pnpm/sisteransi@1.0.5/node_modules/sisteransi/src/index.js"(
    exports2,
    module2,
  ) {
    "use strict";
    var ESC = "\x1B";
    var CSI = `${ESC}[`;
    var beep = "\x07";
    var cursor = {
      to(x, y) {
        if (!y) return `${CSI}${x + 1}G`;
        return `${CSI}${y + 1};${x + 1}H`;
      },
      move(x, y) {
        let ret = "";
        if (x < 0) ret += `${CSI}${-x}D`;
        else if (x > 0) ret += `${CSI}${x}C`;
        if (y < 0) ret += `${CSI}${-y}A`;
        else if (y > 0) ret += `${CSI}${y}B`;
        return ret;
      },
      up: (count = 1) => `${CSI}${count}A`,
      down: (count = 1) => `${CSI}${count}B`,
      forward: (count = 1) => `${CSI}${count}C`,
      backward: (count = 1) => `${CSI}${count}D`,
      nextLine: (count = 1) => `${CSI}E`.repeat(count),
      prevLine: (count = 1) => `${CSI}F`.repeat(count),
      left: `${CSI}G`,
      hide: `${CSI}?25l`,
      show: `${CSI}?25h`,
      save: `${ESC}7`,
      restore: `${ESC}8`,
    };
    var scroll = {
      up: (count = 1) => `${CSI}S`.repeat(count),
      down: (count = 1) => `${CSI}T`.repeat(count),
    };
    var erase = {
      screen: `${CSI}2J`,
      up: (count = 1) => `${CSI}1J`.repeat(count),
      down: (count = 1) => `${CSI}J`.repeat(count),
      line: `${CSI}2K`,
      lineEnd: `${CSI}K`,
      lineStart: `${CSI}1K`,
      lines(count) {
        let clear = "";
        for (let i = 0; i < count; i++)
          clear += this.line + (i < count - 1 ? cursor.up() : "");
        if (count) clear += cursor.left;
        return clear;
      },
    };
    module2.exports = { cursor, scroll, erase, beep };
  },
});

// node_modules/.pnpm/picocolors@1.1.1/node_modules/picocolors/picocolors.js
var require_picocolors = __commonJS({
  "node_modules/.pnpm/picocolors@1.1.1/node_modules/picocolors/picocolors.js"(
    exports2,
    module2,
  ) {
    var p = process || {};
    var argv = p.argv || [];
    var env = p.env || {};
    var isColorSupported =
      !(!!env.NO_COLOR || argv.includes("--no-color")) &&
      (!!env.FORCE_COLOR ||
        argv.includes("--color") ||
        p.platform === "win32" ||
        ((p.stdout || {}).isTTY && env.TERM !== "dumb") ||
        !!env.CI);
    var formatter =
      (open, close, replace = open) =>
      (input) => {
        let string = "" + input,
          index = string.indexOf(close, open.length);
        return ~index
          ? open + replaceClose(string, close, replace, index) + close
          : open + string + close;
      };
    var replaceClose = (string, close, replace, index) => {
      let result = "",
        cursor = 0;
      do {
        result += string.substring(cursor, index) + replace;
        cursor = index + close.length;
        index = string.indexOf(close, cursor);
      } while (~index);
      return result + string.substring(cursor);
    };
    var createColors = (enabled = isColorSupported) => {
      let f = enabled ? formatter : () => String;
      return {
        isColorSupported: enabled,
        reset: f("\x1B[0m", "\x1B[0m"),
        bold: f("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m"),
        dim: f("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"),
        italic: f("\x1B[3m", "\x1B[23m"),
        underline: f("\x1B[4m", "\x1B[24m"),
        inverse: f("\x1B[7m", "\x1B[27m"),
        hidden: f("\x1B[8m", "\x1B[28m"),
        strikethrough: f("\x1B[9m", "\x1B[29m"),
        black: f("\x1B[30m", "\x1B[39m"),
        red: f("\x1B[31m", "\x1B[39m"),
        green: f("\x1B[32m", "\x1B[39m"),
        yellow: f("\x1B[33m", "\x1B[39m"),
        blue: f("\x1B[34m", "\x1B[39m"),
        magenta: f("\x1B[35m", "\x1B[39m"),
        cyan: f("\x1B[36m", "\x1B[39m"),
        white: f("\x1B[37m", "\x1B[39m"),
        gray: f("\x1B[90m", "\x1B[39m"),
        bgBlack: f("\x1B[40m", "\x1B[49m"),
        bgRed: f("\x1B[41m", "\x1B[49m"),
        bgGreen: f("\x1B[42m", "\x1B[49m"),
        bgYellow: f("\x1B[43m", "\x1B[49m"),
        bgBlue: f("\x1B[44m", "\x1B[49m"),
        bgMagenta: f("\x1B[45m", "\x1B[49m"),
        bgCyan: f("\x1B[46m", "\x1B[49m"),
        bgWhite: f("\x1B[47m", "\x1B[49m"),
        blackBright: f("\x1B[90m", "\x1B[39m"),
        redBright: f("\x1B[91m", "\x1B[39m"),
        greenBright: f("\x1B[92m", "\x1B[39m"),
        yellowBright: f("\x1B[93m", "\x1B[39m"),
        blueBright: f("\x1B[94m", "\x1B[39m"),
        magentaBright: f("\x1B[95m", "\x1B[39m"),
        cyanBright: f("\x1B[96m", "\x1B[39m"),
        whiteBright: f("\x1B[97m", "\x1B[39m"),
        bgBlackBright: f("\x1B[100m", "\x1B[49m"),
        bgRedBright: f("\x1B[101m", "\x1B[49m"),
        bgGreenBright: f("\x1B[102m", "\x1B[49m"),
        bgYellowBright: f("\x1B[103m", "\x1B[49m"),
        bgBlueBright: f("\x1B[104m", "\x1B[49m"),
        bgMagentaBright: f("\x1B[105m", "\x1B[49m"),
        bgCyanBright: f("\x1B[106m", "\x1B[49m"),
        bgWhiteBright: f("\x1B[107m", "\x1B[49m"),
      };
    };
    module2.exports = createColors();
    module2.exports.createColors = createColors;
  },
});

// node_modules/.pnpm/@clack+core@0.4.2/node_modules/@clack/core/dist/index.cjs
var require_dist = __commonJS({
  "node_modules/.pnpm/@clack+core@0.4.2/node_modules/@clack/core/dist/index.cjs"(
    exports2,
  ) {
    "use strict";
    var sisteransi = require_src();
    var node_process = require("node:process");
    var s$2 = require("node:readline");
    var node_stream = require("node:stream");
    var i$1 = require_picocolors();
    function _interopDefaultCompat(C) {
      return C && typeof C == "object" && "default" in C ? C.default : C;
    }
    function _interopNamespaceCompat(C) {
      if (C && typeof C == "object" && "default" in C) return C;
      const t = /* @__PURE__ */ Object.create(null);
      if (C) for (const F in C) t[F] = C[F];
      return (t.default = C), t;
    }
    var s__namespace = _interopNamespaceCompat(s$2);
    var s__default = _interopDefaultCompat(s$2);
    var i__default = _interopDefaultCompat(i$1);
    function ansiRegex({ onlyFirst: C = false } = {}) {
      const F = [
        "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?(?:\\u0007|\\u001B\\u005C|\\u009C))",
        "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))",
      ].join("|");
      return new RegExp(F, C ? void 0 : "g");
    }
    var regex = ansiRegex();
    function stripAnsi(C) {
      if (typeof C != "string")
        throw new TypeError(`Expected a \`string\`, got \`${typeof C}\``);
      return C.replace(regex, "");
    }
    function getDefaultExportFromCjs(C) {
      return C && C.__esModule && Object.prototype.hasOwnProperty.call(C, "default")
        ? C.default
        : C;
    }
    var eastasianwidth = { exports: {} };
    (function (C) {
      var t = {};
      (C.exports = t),
        (t.eastAsianWidth = function (E) {
          var B = E.charCodeAt(0),
            A = E.length == 2 ? E.charCodeAt(1) : 0,
            D = B;
          return (
            55296 <= B &&
              B <= 56319 &&
              56320 <= A &&
              A <= 57343 &&
              ((B &= 1023), (A &= 1023), (D = (B << 10) | A), (D += 65536)),
            D == 12288 || (65281 <= D && D <= 65376) || (65504 <= D && D <= 65510)
              ? "F"
              : D == 8361 ||
                  (65377 <= D && D <= 65470) ||
                  (65474 <= D && D <= 65479) ||
                  (65482 <= D && D <= 65487) ||
                  (65490 <= D && D <= 65495) ||
                  (65498 <= D && D <= 65500) ||
                  (65512 <= D && D <= 65518)
                ? "H"
                : (4352 <= D && D <= 4447) ||
                    (4515 <= D && D <= 4519) ||
                    (4602 <= D && D <= 4607) ||
                    (9001 <= D && D <= 9002) ||
                    (11904 <= D && D <= 11929) ||
                    (11931 <= D && D <= 12019) ||
                    (12032 <= D && D <= 12245) ||
                    (12272 <= D && D <= 12283) ||
                    (12289 <= D && D <= 12350) ||
                    (12353 <= D && D <= 12438) ||
                    (12441 <= D && D <= 12543) ||
                    (12549 <= D && D <= 12589) ||
                    (12593 <= D && D <= 12686) ||
                    (12688 <= D && D <= 12730) ||
                    (12736 <= D && D <= 12771) ||
                    (12784 <= D && D <= 12830) ||
                    (12832 <= D && D <= 12871) ||
                    (12880 <= D && D <= 13054) ||
                    (13056 <= D && D <= 19903) ||
                    (19968 <= D && D <= 42124) ||
                    (42128 <= D && D <= 42182) ||
                    (43360 <= D && D <= 43388) ||
                    (44032 <= D && D <= 55203) ||
                    (55216 <= D && D <= 55238) ||
                    (55243 <= D && D <= 55291) ||
                    (63744 <= D && D <= 64255) ||
                    (65040 <= D && D <= 65049) ||
                    (65072 <= D && D <= 65106) ||
                    (65108 <= D && D <= 65126) ||
                    (65128 <= D && D <= 65131) ||
                    (110592 <= D && D <= 110593) ||
                    (127488 <= D && D <= 127490) ||
                    (127504 <= D && D <= 127546) ||
                    (127552 <= D && D <= 127560) ||
                    (127568 <= D && D <= 127569) ||
                    (131072 <= D && D <= 194367) ||
                    (177984 <= D && D <= 196605) ||
                    (196608 <= D && D <= 262141)
                  ? "W"
                  : (32 <= D && D <= 126) ||
                      (162 <= D && D <= 163) ||
                      (165 <= D && D <= 166) ||
                      D == 172 ||
                      D == 175 ||
                      (10214 <= D && D <= 10221) ||
                      (10629 <= D && D <= 10630)
                    ? "Na"
                    : D == 161 ||
                        D == 164 ||
                        (167 <= D && D <= 168) ||
                        D == 170 ||
                        (173 <= D && D <= 174) ||
                        (176 <= D && D <= 180) ||
                        (182 <= D && D <= 186) ||
                        (188 <= D && D <= 191) ||
                        D == 198 ||
                        D == 208 ||
                        (215 <= D && D <= 216) ||
                        (222 <= D && D <= 225) ||
                        D == 230 ||
                        (232 <= D && D <= 234) ||
                        (236 <= D && D <= 237) ||
                        D == 240 ||
                        (242 <= D && D <= 243) ||
                        (247 <= D && D <= 250) ||
                        D == 252 ||
                        D == 254 ||
                        D == 257 ||
                        D == 273 ||
                        D == 275 ||
                        D == 283 ||
                        (294 <= D && D <= 295) ||
                        D == 299 ||
                        (305 <= D && D <= 307) ||
                        D == 312 ||
                        (319 <= D && D <= 322) ||
                        D == 324 ||
                        (328 <= D && D <= 331) ||
                        D == 333 ||
                        (338 <= D && D <= 339) ||
                        (358 <= D && D <= 359) ||
                        D == 363 ||
                        D == 462 ||
                        D == 464 ||
                        D == 466 ||
                        D == 468 ||
                        D == 470 ||
                        D == 472 ||
                        D == 474 ||
                        D == 476 ||
                        D == 593 ||
                        D == 609 ||
                        D == 708 ||
                        D == 711 ||
                        (713 <= D && D <= 715) ||
                        D == 717 ||
                        D == 720 ||
                        (728 <= D && D <= 731) ||
                        D == 733 ||
                        D == 735 ||
                        (768 <= D && D <= 879) ||
                        (913 <= D && D <= 929) ||
                        (931 <= D && D <= 937) ||
                        (945 <= D && D <= 961) ||
                        (963 <= D && D <= 969) ||
                        D == 1025 ||
                        (1040 <= D && D <= 1103) ||
                        D == 1105 ||
                        D == 8208 ||
                        (8211 <= D && D <= 8214) ||
                        (8216 <= D && D <= 8217) ||
                        (8220 <= D && D <= 8221) ||
                        (8224 <= D && D <= 8226) ||
                        (8228 <= D && D <= 8231) ||
                        D == 8240 ||
                        (8242 <= D && D <= 8243) ||
                        D == 8245 ||
                        D == 8251 ||
                        D == 8254 ||
                        D == 8308 ||
                        D == 8319 ||
                        (8321 <= D && D <= 8324) ||
                        D == 8364 ||
                        D == 8451 ||
                        D == 8453 ||
                        D == 8457 ||
                        D == 8467 ||
                        D == 8470 ||
                        (8481 <= D && D <= 8482) ||
                        D == 8486 ||
                        D == 8491 ||
                        (8531 <= D && D <= 8532) ||
                        (8539 <= D && D <= 8542) ||
                        (8544 <= D && D <= 8555) ||
                        (8560 <= D && D <= 8569) ||
                        D == 8585 ||
                        (8592 <= D && D <= 8601) ||
                        (8632 <= D && D <= 8633) ||
                        D == 8658 ||
                        D == 8660 ||
                        D == 8679 ||
                        D == 8704 ||
                        (8706 <= D && D <= 8707) ||
                        (8711 <= D && D <= 8712) ||
                        D == 8715 ||
                        D == 8719 ||
                        D == 8721 ||
                        D == 8725 ||
                        D == 8730 ||
                        (8733 <= D && D <= 8736) ||
                        D == 8739 ||
                        D == 8741 ||
                        (8743 <= D && D <= 8748) ||
                        D == 8750 ||
                        (8756 <= D && D <= 8759) ||
                        (8764 <= D && D <= 8765) ||
                        D == 8776 ||
                        D == 8780 ||
                        D == 8786 ||
                        (8800 <= D && D <= 8801) ||
                        (8804 <= D && D <= 8807) ||
                        (8810 <= D && D <= 8811) ||
                        (8814 <= D && D <= 8815) ||
                        (8834 <= D && D <= 8835) ||
                        (8838 <= D && D <= 8839) ||
                        D == 8853 ||
                        D == 8857 ||
                        D == 8869 ||
                        D == 8895 ||
                        D == 8978 ||
                        (9312 <= D && D <= 9449) ||
                        (9451 <= D && D <= 9547) ||
                        (9552 <= D && D <= 9587) ||
                        (9600 <= D && D <= 9615) ||
                        (9618 <= D && D <= 9621) ||
                        (9632 <= D && D <= 9633) ||
                        (9635 <= D && D <= 9641) ||
                        (9650 <= D && D <= 9651) ||
                        (9654 <= D && D <= 9655) ||
                        (9660 <= D && D <= 9661) ||
                        (9664 <= D && D <= 9665) ||
                        (9670 <= D && D <= 9672) ||
                        D == 9675 ||
                        (9678 <= D && D <= 9681) ||
                        (9698 <= D && D <= 9701) ||
                        D == 9711 ||
                        (9733 <= D && D <= 9734) ||
                        D == 9737 ||
                        (9742 <= D && D <= 9743) ||
                        (9748 <= D && D <= 9749) ||
                        D == 9756 ||
                        D == 9758 ||
                        D == 9792 ||
                        D == 9794 ||
                        (9824 <= D && D <= 9825) ||
                        (9827 <= D && D <= 9829) ||
                        (9831 <= D && D <= 9834) ||
                        (9836 <= D && D <= 9837) ||
                        D == 9839 ||
                        (9886 <= D && D <= 9887) ||
                        (9918 <= D && D <= 9919) ||
                        (9924 <= D && D <= 9933) ||
                        (9935 <= D && D <= 9953) ||
                        D == 9955 ||
                        (9960 <= D && D <= 9983) ||
                        D == 10045 ||
                        D == 10071 ||
                        (10102 <= D && D <= 10111) ||
                        (11093 <= D && D <= 11097) ||
                        (12872 <= D && D <= 12879) ||
                        (57344 <= D && D <= 63743) ||
                        (65024 <= D && D <= 65039) ||
                        D == 65533 ||
                        (127232 <= D && D <= 127242) ||
                        (127248 <= D && D <= 127277) ||
                        (127280 <= D && D <= 127337) ||
                        (127344 <= D && D <= 127386) ||
                        (917760 <= D && D <= 917999) ||
                        (983040 <= D && D <= 1048573) ||
                        (1048576 <= D && D <= 1114109)
                      ? "A"
                      : "N"
          );
        }),
        (t.characterLength = function (E) {
          var B = this.eastAsianWidth(E);
          return B == "F" || B == "W" || B == "A" ? 2 : 1;
        });
      function F(E) {
        return E.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || [];
      }
      (t.length = function (E) {
        for (var B = F(E), A = 0, D = 0; D < B.length; D++)
          A = A + this.characterLength(B[D]);
        return A;
      }),
        (t.slice = function (E, B, A) {
          (textLen = t.length(E)),
            (B = B || 0),
            (A = A || 1),
            B < 0 && (B = textLen + B),
            A < 0 && (A = textLen + A);
          for (var D = "", f = 0, y = F(E), d = 0; d < y.length; d++) {
            var _ = y[d],
              w = t.length(_);
            if (f >= B - (w == 2 ? 1 : 0))
              if (f + w <= A) D += _;
              else break;
            f += w;
          }
          return D;
        });
    })(eastasianwidth);
    var eastasianwidthExports = eastasianwidth.exports;
    var eastAsianWidth = getDefaultExportFromCjs(eastasianwidthExports);
    var emojiRegex = function () {
      return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|(?:\uD83E\uDDD1\uD83C\uDFFF\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFC-\uDFFF])|\uD83D\uDC68(?:\uD83C\uDFFB(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|[\u2695\u2696\u2708]\uFE0F|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))?|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])\uFE0F|\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC)?|(?:\uD83D\uDC69(?:\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC69(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83E\uDDD1(?:\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDE36\u200D\uD83C\uDF2B|\uD83C\uDFF3\uFE0F\u200D\u26A7|\uD83D\uDC3B\u200D\u2744|(?:(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\uD83C\uDFF4\u200D\u2620|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])\u200D[\u2640\u2642]|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u3030\u303D\u3297\u3299]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]|\uD83D[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])\uFE0F|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDE35\u200D\uD83D\uDCAB|\uD83D\uDE2E\u200D\uD83D\uDCA8|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83E\uDDD1(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83D\uDC69(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC08\u200D\u2B1B|\u2764\uFE0F\u200D(?:\uD83D\uDD25|\uD83E\uDE79)|\uD83D\uDC41\uFE0F|\uD83C\uDFF3\uFE0F|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|[#\*0-9]\uFE0F\u20E3|\u2764\uFE0F|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF4|(?:[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270C\u270D]|\uD83D[\uDD74\uDD90])(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC08\uDC15\uDC3B\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE2E\uDE35\uDE36\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5]|\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD]|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF]|[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0D\uDD0E\uDD10-\uDD17\uDD1D\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78\uDD7A-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCB\uDDD0\uDDE0-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6]|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDD77\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
    };
    var emojiRegex$1 = getDefaultExportFromCjs(emojiRegex);
    function stringWidth(C, t = {}) {
      if (
        typeof C != "string" ||
        C.length === 0 ||
        ((t = { ambiguousIsNarrow: true, ...t }), (C = stripAnsi(C)), C.length === 0)
      )
        return 0;
      C = C.replace(emojiRegex$1(), "  ");
      const F = t.ambiguousIsNarrow ? 1 : 2;
      let E = 0;
      for (const B of C) {
        const A = B.codePointAt(0);
        if (A <= 31 || (A >= 127 && A <= 159) || (A >= 768 && A <= 879)) continue;
        switch (eastAsianWidth.eastAsianWidth(B)) {
          case "F":
          case "W":
            E += 2;
            break;
          case "A":
            E += F;
            break;
          default:
            E += 1;
        }
      }
      return E;
    }
    var ANSI_BACKGROUND_OFFSET = 10;
    var wrapAnsi16 =
      (C = 0) =>
      (t) =>
        `\x1B[${t + C}m`;
    var wrapAnsi256 =
      (C = 0) =>
      (t) =>
        `\x1B[${38 + C};5;${t}m`;
    var wrapAnsi16m =
      (C = 0) =>
      (t, F, E) =>
        `\x1B[${38 + C};2;${t};${F};${E}m`;
    var styles = {
      modifier: {
        reset: [0, 0],
        bold: [1, 22],
        dim: [2, 22],
        italic: [3, 23],
        underline: [4, 24],
        overline: [53, 55],
        inverse: [7, 27],
        hidden: [8, 28],
        strikethrough: [9, 29],
      },
      color: {
        black: [30, 39],
        red: [31, 39],
        green: [32, 39],
        yellow: [33, 39],
        blue: [34, 39],
        magenta: [35, 39],
        cyan: [36, 39],
        white: [37, 39],
        blackBright: [90, 39],
        gray: [90, 39],
        grey: [90, 39],
        redBright: [91, 39],
        greenBright: [92, 39],
        yellowBright: [93, 39],
        blueBright: [94, 39],
        magentaBright: [95, 39],
        cyanBright: [96, 39],
        whiteBright: [97, 39],
      },
      bgColor: {
        bgBlack: [40, 49],
        bgRed: [41, 49],
        bgGreen: [42, 49],
        bgYellow: [43, 49],
        bgBlue: [44, 49],
        bgMagenta: [45, 49],
        bgCyan: [46, 49],
        bgWhite: [47, 49],
        bgBlackBright: [100, 49],
        bgGray: [100, 49],
        bgGrey: [100, 49],
        bgRedBright: [101, 49],
        bgGreenBright: [102, 49],
        bgYellowBright: [103, 49],
        bgBlueBright: [104, 49],
        bgMagentaBright: [105, 49],
        bgCyanBright: [106, 49],
        bgWhiteBright: [107, 49],
      },
    };
    Object.keys(styles.modifier);
    var foregroundColorNames = Object.keys(styles.color);
    var backgroundColorNames = Object.keys(styles.bgColor);
    [...foregroundColorNames, ...backgroundColorNames];
    function assembleStyles() {
      const C = /* @__PURE__ */ new Map();
      for (const [t, F] of Object.entries(styles)) {
        for (const [E, B] of Object.entries(F))
          (styles[E] = { open: `\x1B[${B[0]}m`, close: `\x1B[${B[1]}m` }),
            (F[E] = styles[E]),
            C.set(B[0], B[1]);
        Object.defineProperty(styles, t, { value: F, enumerable: false });
      }
      return (
        Object.defineProperty(styles, "codes", { value: C, enumerable: false }),
        (styles.color.close = "\x1B[39m"),
        (styles.bgColor.close = "\x1B[49m"),
        (styles.color.ansi = wrapAnsi16()),
        (styles.color.ansi256 = wrapAnsi256()),
        (styles.color.ansi16m = wrapAnsi16m()),
        (styles.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET)),
        (styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET)),
        (styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET)),
        Object.defineProperties(styles, {
          rgbToAnsi256: {
            value: (t, F, E) =>
              t === F && F === E
                ? t < 8
                  ? 16
                  : t > 248
                    ? 231
                    : Math.round(((t - 8) / 247) * 24) + 232
                : 16 +
                  36 * Math.round((t / 255) * 5) +
                  6 * Math.round((F / 255) * 5) +
                  Math.round((E / 255) * 5),
            enumerable: false,
          },
          hexToRgb: {
            value: (t) => {
              const F = /[a-f\d]{6}|[a-f\d]{3}/i.exec(t.toString(16));
              if (!F) return [0, 0, 0];
              let [E] = F;
              E.length === 3 && (E = [...E].map((A) => A + A).join(""));
              const B = Number.parseInt(E, 16);
              return [(B >> 16) & 255, (B >> 8) & 255, B & 255];
            },
            enumerable: false,
          },
          hexToAnsi256: {
            value: (t) => styles.rgbToAnsi256(...styles.hexToRgb(t)),
            enumerable: false,
          },
          ansi256ToAnsi: {
            value: (t) => {
              if (t < 8) return 30 + t;
              if (t < 16) return 90 + (t - 8);
              let F, E, B;
              if (t >= 232) (F = ((t - 232) * 10 + 8) / 255), (E = F), (B = F);
              else {
                t -= 16;
                const f = t % 36;
                (F = Math.floor(t / 36) / 5),
                  (E = Math.floor(f / 6) / 5),
                  (B = (f % 6) / 5);
              }
              const A = Math.max(F, E, B) * 2;
              if (A === 0) return 30;
              let D = 30 + ((Math.round(B) << 2) | (Math.round(E) << 1) | Math.round(F));
              return A === 2 && (D += 60), D;
            },
            enumerable: false,
          },
          rgbToAnsi: {
            value: (t, F, E) => styles.ansi256ToAnsi(styles.rgbToAnsi256(t, F, E)),
            enumerable: false,
          },
          hexToAnsi: {
            value: (t) => styles.ansi256ToAnsi(styles.hexToAnsi256(t)),
            enumerable: false,
          },
        }),
        styles
      );
    }
    var ansiStyles = assembleStyles();
    var ESCAPES = /* @__PURE__ */ new Set(["\x1B", "\x9B"]);
    var END_CODE = 39;
    var ANSI_ESCAPE_BELL = "\x07";
    var ANSI_CSI = "[";
    var ANSI_OSC = "]";
    var ANSI_SGR_TERMINATOR = "m";
    var ANSI_ESCAPE_LINK = `${ANSI_OSC}8;;`;
    var wrapAnsiCode = (C) =>
      `${ESCAPES.values().next().value}${ANSI_CSI}${C}${ANSI_SGR_TERMINATOR}`;
    var wrapAnsiHyperlink = (C) =>
      `${ESCAPES.values().next().value}${ANSI_ESCAPE_LINK}${C}${ANSI_ESCAPE_BELL}`;
    var wordLengths = (C) => C.split(" ").map((t) => stringWidth(t));
    var wrapWord = (C, t, F) => {
      const E = [...t];
      let B = false,
        A = false,
        D = stringWidth(stripAnsi(C[C.length - 1]));
      for (const [f, y] of E.entries()) {
        const d = stringWidth(y);
        if (
          (D + d <= F ? (C[C.length - 1] += y) : (C.push(y), (D = 0)),
          ESCAPES.has(y) &&
            ((B = true),
            (A = E.slice(f + 1)
              .join("")
              .startsWith(ANSI_ESCAPE_LINK))),
          B)
        ) {
          A
            ? y === ANSI_ESCAPE_BELL && ((B = false), (A = false))
            : y === ANSI_SGR_TERMINATOR && (B = false);
          continue;
        }
        (D += d), D === F && f < E.length - 1 && (C.push(""), (D = 0));
      }
      !D && C[C.length - 1].length > 0 && C.length > 1 && (C[C.length - 2] += C.pop());
    };
    var stringVisibleTrimSpacesRight = (C) => {
      const t = C.split(" ");
      let F = t.length;
      for (; F > 0 && !(stringWidth(t[F - 1]) > 0); ) F--;
      return F === t.length ? C : t.slice(0, F).join(" ") + t.slice(F).join("");
    };
    var exec = (C, t, F = {}) => {
      if (F.trim !== false && C.trim() === "") return "";
      let E = "",
        B,
        A;
      const D = wordLengths(C);
      let f = [""];
      for (const [d, _] of C.split(" ").entries()) {
        F.trim !== false && (f[f.length - 1] = f[f.length - 1].trimStart());
        let w = stringWidth(f[f.length - 1]);
        if (
          (d !== 0 &&
            (w >= t &&
              (F.wordWrap === false || F.trim === false) &&
              (f.push(""), (w = 0)),
            (w > 0 || F.trim === false) && ((f[f.length - 1] += " "), w++)),
          F.hard && D[d] > t)
        ) {
          const S = t - w,
            $ = 1 + Math.floor((D[d] - S - 1) / t);
          Math.floor((D[d] - 1) / t) < $ && f.push(""), wrapWord(f, _, t);
          continue;
        }
        if (w + D[d] > t && w > 0 && D[d] > 0) {
          if (F.wordWrap === false && w < t) {
            wrapWord(f, _, t);
            continue;
          }
          f.push("");
        }
        if (w + D[d] > t && F.wordWrap === false) {
          wrapWord(f, _, t);
          continue;
        }
        f[f.length - 1] += _;
      }
      F.trim !== false && (f = f.map((d) => stringVisibleTrimSpacesRight(d)));
      const y = [
        ...f.join(`
`),
      ];
      for (const [d, _] of y.entries()) {
        if (((E += _), ESCAPES.has(_))) {
          const { groups: S } = new RegExp(
            `(?:\\${ANSI_CSI}(?<code>\\d+)m|\\${ANSI_ESCAPE_LINK}(?<uri>.*)${ANSI_ESCAPE_BELL})`,
          ).exec(y.slice(d).join("")) || { groups: {} };
          if (S.code !== void 0) {
            const $ = Number.parseFloat(S.code);
            B = $ === END_CODE ? void 0 : $;
          } else S.uri !== void 0 && (A = S.uri.length === 0 ? void 0 : S.uri);
        }
        const w = ansiStyles.codes.get(Number(B));
        y[d + 1] ===
        `
`
          ? (A && (E += wrapAnsiHyperlink("")), B && w && (E += wrapAnsiCode(w)))
          : _ ===
              `
` && (B && w && (E += wrapAnsiCode(B)), A && (E += wrapAnsiHyperlink(A)));
      }
      return E;
    };
    function wrapAnsi(C, t, F) {
      return String(C)
        .normalize()
        .replace(
          /\r\n/g,
          `
`,
        )
        .split(
          `
`,
        )
        .map((E) => exec(E, t, F)).join(`
`);
    }
    var a$1 = ["up", "down", "left", "right", "space", "enter", "cancel"];
    var settings = {
      actions: new Set(a$1),
      aliases: /* @__PURE__ */ new Map([
        ["k", "up"],
        ["j", "down"],
        ["h", "left"],
        ["l", "right"],
        ["", "cancel"],
        ["escape", "cancel"],
      ]),
    };
    function updateSettings(C) {
      for (const t in C) {
        const F = t;
        if (!Object.hasOwn(C, F)) continue;
        const E = C[F];
        switch (F) {
          case "aliases": {
            for (const B in E)
              Object.hasOwn(E, B) &&
                (settings.aliases.has(B) || settings.aliases.set(B, E[B]));
            break;
          }
        }
      }
    }
    function isActionKey(C, t) {
      if (typeof C == "string") return settings.aliases.get(C) === t;
      for (const F of C) if (F !== void 0 && isActionKey(F, t)) return true;
      return false;
    }
    function diffLines(C, t) {
      if (C === t) return;
      const F = C.split(`
`),
        E = t.split(`
`),
        B = [];
      for (let A = 0; A < Math.max(F.length, E.length); A++) F[A] !== E[A] && B.push(A);
      return B;
    }
    var x = globalThis.process.platform.startsWith("win");
    var CANCEL_SYMBOL = Symbol("clack:cancel");
    function isCancel2(C) {
      return C === CANCEL_SYMBOL;
    }
    function setRawMode(C, t) {
      const F = C;
      F.isTTY && F.setRawMode(t);
    }
    function block({
      input: C = node_process.stdin,
      output: t = node_process.stdout,
      overwrite: F = true,
      hideCursor: E = true,
    } = {}) {
      const B = s__namespace.createInterface({
        input: C,
        output: t,
        prompt: "",
        tabSize: 1,
      });
      s__namespace.emitKeypressEvents(C, B), C.isTTY && C.setRawMode(true);
      const A = (D, { name: f, sequence: y }) => {
        const d = String(D);
        if (isActionKey([d, f, y], "cancel")) {
          E && t.write(sisteransi.cursor.show), process.exit(0);
          return;
        }
        if (!F) return;
        const _ = f === "return" ? 0 : -1,
          w = f === "return" ? -1 : 0;
        s__namespace.moveCursor(t, _, w, () => {
          s__namespace.clearLine(t, 1, () => {
            C.once("keypress", A);
          });
        });
      };
      return (
        E && t.write(sisteransi.cursor.hide),
        C.once("keypress", A),
        () => {
          C.off("keypress", A),
            E && t.write(sisteransi.cursor.show),
            C.isTTY && !x && C.setRawMode(false),
            (B.terminal = false),
            B.close();
        }
      );
    }
    var b = Object.defineProperty;
    var v$1 = (C, t, F) =>
      t in C
        ? b(C, t, { enumerable: true, configurable: true, writable: true, value: F })
        : (C[t] = F);
    var s$1 = (C, t, F) => (v$1(C, typeof t != "symbol" ? t + "" : t, F), F);
    var k = class {
      constructor(t, F = true) {
        s$1(this, "input"),
          s$1(this, "output"),
          s$1(this, "_abortSignal"),
          s$1(this, "rl"),
          s$1(this, "opts"),
          s$1(this, "_render"),
          s$1(this, "_track", false),
          s$1(this, "_prevFrame", ""),
          s$1(this, "_subscribers", /* @__PURE__ */ new Map()),
          s$1(this, "_cursor", 0),
          s$1(this, "state", "initial"),
          s$1(this, "error", ""),
          s$1(this, "value");
        const {
          input: E = node_process.stdin,
          output: B = node_process.stdout,
          render: A,
          signal: D,
          ...f
        } = t;
        (this.opts = f),
          (this.onKeypress = this.onKeypress.bind(this)),
          (this.close = this.close.bind(this)),
          (this.render = this.render.bind(this)),
          (this._render = A.bind(this)),
          (this._track = F),
          (this._abortSignal = D),
          (this.input = E),
          (this.output = B);
      }
      unsubscribe() {
        this._subscribers.clear();
      }
      setSubscriber(t, F) {
        const E = this._subscribers.get(t) ?? [];
        E.push(F), this._subscribers.set(t, E);
      }
      on(t, F) {
        this.setSubscriber(t, { cb: F });
      }
      once(t, F) {
        this.setSubscriber(t, { cb: F, once: true });
      }
      emit(t, ...F) {
        const E = this._subscribers.get(t) ?? [],
          B = [];
        for (const A of E) A.cb(...F), A.once && B.push(() => E.splice(E.indexOf(A), 1));
        for (const A of B) A();
      }
      prompt() {
        return new Promise((t, F) => {
          if (this._abortSignal) {
            if (this._abortSignal.aborted)
              return (this.state = "cancel"), this.close(), t(CANCEL_SYMBOL);
            this._abortSignal.addEventListener(
              "abort",
              () => {
                (this.state = "cancel"), this.close();
              },
              { once: true },
            );
          }
          const E = new node_stream.Writable();
          (E._write = (B, A, D) => {
            this._track &&
              ((this.value = this.rl?.line.replace(/\t/g, "")),
              (this._cursor = this.rl?.cursor ?? 0),
              this.emit("value", this.value)),
              D();
          }),
            this.input.pipe(E),
            (this.rl = s__default.createInterface({
              input: this.input,
              output: E,
              tabSize: 2,
              prompt: "",
              escapeCodeTimeout: 50,
              terminal: true,
            })),
            s__default.emitKeypressEvents(this.input, this.rl),
            this.rl.prompt(),
            this.opts.initialValue !== void 0 &&
              this._track &&
              this.rl.write(this.opts.initialValue),
            this.input.on("keypress", this.onKeypress),
            setRawMode(this.input, true),
            this.output.on("resize", this.render),
            this.render(),
            this.once("submit", () => {
              this.output.write(sisteransi.cursor.show),
                this.output.off("resize", this.render),
                setRawMode(this.input, false),
                t(this.value);
            }),
            this.once("cancel", () => {
              this.output.write(sisteransi.cursor.show),
                this.output.off("resize", this.render),
                setRawMode(this.input, false),
                t(CANCEL_SYMBOL);
            });
        });
      }
      onKeypress(t, F) {
        if (
          (this.state === "error" && (this.state = "active"),
          F?.name &&
            (!this._track &&
              settings.aliases.has(F.name) &&
              this.emit("cursor", settings.aliases.get(F.name)),
            settings.actions.has(F.name) && this.emit("cursor", F.name)),
          t &&
            (t.toLowerCase() === "y" || t.toLowerCase() === "n") &&
            this.emit("confirm", t.toLowerCase() === "y"),
          t === "	" &&
            this.opts.placeholder &&
            (this.value ||
              (this.rl?.write(this.opts.placeholder),
              this.emit("value", this.opts.placeholder))),
          t && this.emit("key", t.toLowerCase()),
          F?.name === "return")
        ) {
          if (
            (!this.value &&
              this.opts.placeholder &&
              (this.rl?.write(this.opts.placeholder),
              this.emit("value", this.opts.placeholder)),
            this.opts.validate)
          ) {
            const E = this.opts.validate(this.value);
            E &&
              ((this.error = E instanceof Error ? E.message : E),
              (this.state = "error"),
              this.rl?.write(this.value));
          }
          this.state !== "error" && (this.state = "submit");
        }
        isActionKey([t, F?.name, F?.sequence], "cancel") && (this.state = "cancel"),
          (this.state === "submit" || this.state === "cancel") && this.emit("finalize"),
          this.render(),
          (this.state === "submit" || this.state === "cancel") && this.close();
      }
      close() {
        this.input.unpipe(),
          this.input.removeListener("keypress", this.onKeypress),
          this.output.write(`
`),
          setRawMode(this.input, false),
          this.rl?.close(),
          (this.rl = void 0),
          this.emit(`${this.state}`, this.value),
          this.unsubscribe();
      }
      restoreCursor() {
        const t =
          wrapAnsi(this._prevFrame, process.stdout.columns, { hard: true }).split(`
`).length - 1;
        this.output.write(sisteransi.cursor.move(-999, t * -1));
      }
      render() {
        const t = wrapAnsi(this._render(this) ?? "", process.stdout.columns, {
          hard: true,
        });
        if (t !== this._prevFrame) {
          if (this.state === "initial") this.output.write(sisteransi.cursor.hide);
          else {
            const F = diffLines(this._prevFrame, t);
            if ((this.restoreCursor(), F && F?.length === 1)) {
              const E = F[0];
              this.output.write(sisteransi.cursor.move(0, E)),
                this.output.write(sisteransi.erase.lines(1));
              const B = t.split(`
`);
              this.output.write(B[E]),
                (this._prevFrame = t),
                this.output.write(sisteransi.cursor.move(0, B.length - E - 1));
              return;
            }
            if (F && F?.length > 1) {
              const E = F[0];
              this.output.write(sisteransi.cursor.move(0, E)),
                this.output.write(sisteransi.erase.down());
              const B = t
                .split(
                  `
`,
                )
                .slice(E);
              this.output.write(
                B.join(`
`),
              ),
                (this._prevFrame = t);
              return;
            }
            this.output.write(sisteransi.erase.down());
          }
          this.output.write(t),
            this.state === "initial" && (this.state = "active"),
            (this._prevFrame = t);
        }
      }
    };
    var s = class extends k {
      get cursor() {
        return this.value ? 0 : 1;
      }
      get _value() {
        return this.cursor === 0;
      }
      constructor(t) {
        super(t, false),
          (this.value = !!t.initialValue),
          this.on("value", () => {
            this.value = this._value;
          }),
          this.on("confirm", (F) => {
            this.output.write(sisteransi.cursor.move(0, -1)),
              (this.value = F),
              (this.state = "submit"),
              this.close();
          }),
          this.on("cursor", () => {
            this.value = !this.value;
          });
      }
    };
    var v = Object.defineProperty;
    var g = (C, t, F) =>
      t in C
        ? v(C, t, { enumerable: true, configurable: true, writable: true, value: F })
        : (C[t] = F);
    var n$2 = (C, t, F) => (g(C, typeof t != "symbol" ? t + "" : t, F), F);
    var c$1 = (C, t, F) => {
      if (!t.has(C)) throw TypeError("Cannot " + F);
    };
    var l$2 = (C, t, F) => (
      c$1(C, t, "read from private field"), F ? F.call(C) : t.get(C)
    );
    var h = (C, t, F) => {
      if (t.has(C)) throw TypeError("Cannot add the same private member more than once");
      t instanceof WeakSet ? t.add(C) : t.set(C, F);
    };
    var p$1 = (C, t, F, E) => (
      c$1(C, t, "write to private field"), E ? E.call(C, F) : t.set(C, F), F
    );
    var u$3;
    var m$1 = class extends k {
      constructor(t) {
        super(t, false),
          n$2(this, "options"),
          n$2(this, "cursor", 0),
          h(this, u$3, void 0);
        const { options: F } = t;
        p$1(this, u$3, t.selectableGroups !== false),
          (this.options = Object.entries(F).flatMap(([E, B]) => [
            { value: E, group: true, label: E },
            ...B.map((A) => ({ ...A, group: E })),
          ])),
          (this.value = [...(t.initialValues ?? [])]),
          (this.cursor = Math.max(
            this.options.findIndex(({ value: E }) => E === t.cursorAt),
            l$2(this, u$3) ? 0 : 1,
          )),
          this.on("cursor", (E) => {
            switch (E) {
              case "left":
              case "up": {
                this.cursor =
                  this.cursor === 0 ? this.options.length - 1 : this.cursor - 1;
                const B = this.options[this.cursor]?.group === true;
                !l$2(this, u$3) &&
                  B &&
                  (this.cursor =
                    this.cursor === 0 ? this.options.length - 1 : this.cursor - 1);
                break;
              }
              case "down":
              case "right": {
                this.cursor =
                  this.cursor === this.options.length - 1 ? 0 : this.cursor + 1;
                const B = this.options[this.cursor]?.group === true;
                !l$2(this, u$3) &&
                  B &&
                  (this.cursor =
                    this.cursor === this.options.length - 1 ? 0 : this.cursor + 1);
                break;
              }
              case "space":
                this.toggleValue();
                break;
            }
          });
      }
      getGroupItems(t) {
        return this.options.filter((F) => F.group === t);
      }
      isGroupSelected(t) {
        return this.getGroupItems(t).every((F) => this.value.includes(F.value));
      }
      toggleValue() {
        const t = this.options[this.cursor];
        if (t.group === true) {
          const F = t.value,
            E = this.getGroupItems(F);
          this.isGroupSelected(F)
            ? (this.value = this.value.filter(
                (B) => E.findIndex((A) => A.value === B) === -1,
              ))
            : (this.value = [...this.value, ...E.map((B) => B.value)]),
            (this.value = Array.from(new Set(this.value)));
        } else {
          const F = this.value.includes(t.value);
          this.value = F
            ? this.value.filter((E) => E !== t.value)
            : [...this.value, t.value];
        }
      }
    };
    u$3 = /* @__PURE__ */ new WeakMap();
    var o$2 = Object.defineProperty;
    var a = (C, t, F) =>
      t in C
        ? o$2(C, t, { enumerable: true, configurable: true, writable: true, value: F })
        : (C[t] = F);
    var l$1 = (C, t, F) => (a(C, typeof t != "symbol" ? t + "" : t, F), F);
    var u$2 = class extends k {
      constructor(t) {
        super(t, false),
          l$1(this, "options"),
          l$1(this, "cursor", 0),
          (this.options = t.options),
          (this.value = [...(t.initialValues ?? [])]),
          (this.cursor = Math.max(
            this.options.findIndex(({ value: F }) => F === t.cursorAt),
            0,
          )),
          this.on("key", (F) => {
            F === "a" && this.toggleAll();
          }),
          this.on("cursor", (F) => {
            switch (F) {
              case "left":
              case "up":
                this.cursor =
                  this.cursor === 0 ? this.options.length - 1 : this.cursor - 1;
                break;
              case "down":
              case "right":
                this.cursor =
                  this.cursor === this.options.length - 1 ? 0 : this.cursor + 1;
                break;
              case "space":
                this.toggleValue();
                break;
            }
          });
      }
      get _value() {
        return this.options[this.cursor].value;
      }
      toggleAll() {
        const t = this.value.length === this.options.length;
        this.value = t ? [] : this.options.map((F) => F.value);
      }
      toggleValue() {
        const t = this.value.includes(this._value);
        this.value = t
          ? this.value.filter((F) => F !== this._value)
          : [...this.value, this._value];
      }
    };
    var u$1 = Object.defineProperty;
    var n$1 = (C, t, F) =>
      t in C
        ? u$1(C, t, { enumerable: true, configurable: true, writable: true, value: F })
        : (C[t] = F);
    var e = (C, t, F) => (n$1(C, typeof t != "symbol" ? t + "" : t, F), F);
    var m = class extends k {
      constructor({ mask: t, ...F }) {
        super(F),
          e(this, "valueWithCursor", ""),
          e(this, "_mask", "\u2022"),
          (this._mask = t ?? "\u2022"),
          this.on("finalize", () => {
            this.valueWithCursor = this.masked;
          }),
          this.on("value", () => {
            if (this.cursor >= this.value.length)
              this.valueWithCursor = `${this.masked}${i__default.inverse(i__default.hidden("_"))}`;
            else {
              const E = this.masked.slice(0, this.cursor),
                B = this.masked.slice(this.cursor);
              this.valueWithCursor = `${E}${i__default.inverse(B[0])}${B.slice(1)}`;
            }
          });
      }
      get cursor() {
        return this._cursor;
      }
      get masked() {
        return this.value.replaceAll(/./g, this._mask);
      }
    };
    var o$1 = Object.defineProperty;
    var n = (C, t, F) =>
      t in C
        ? o$1(C, t, { enumerable: true, configurable: true, writable: true, value: F })
        : (C[t] = F);
    var r = (C, t, F) => (n(C, typeof t != "symbol" ? t + "" : t, F), F);
    var u = class extends k {
      constructor(t) {
        super(t, false),
          r(this, "options"),
          r(this, "cursor", 0),
          (this.options = t.options),
          (this.cursor = this.options.findIndex(({ value: F }) => F === t.initialValue)),
          this.cursor === -1 && (this.cursor = 0),
          this.changeValue(),
          this.on("cursor", (F) => {
            switch (F) {
              case "left":
              case "up":
                this.cursor =
                  this.cursor === 0 ? this.options.length - 1 : this.cursor - 1;
                break;
              case "down":
              case "right":
                this.cursor =
                  this.cursor === this.options.length - 1 ? 0 : this.cursor + 1;
                break;
            }
            this.changeValue();
          });
      }
      get _value() {
        return this.options[this.cursor];
      }
      changeValue() {
        this.value = this._value.value;
      }
    };
    var p = Object.defineProperty;
    var l = (C, t, F) =>
      t in C
        ? p(C, t, { enumerable: true, configurable: true, writable: true, value: F })
        : (C[t] = F);
    var i = (C, t, F) => (l(C, typeof t != "symbol" ? t + "" : t, F), F);
    var c = class extends k {
      constructor(t) {
        super(t, false),
          i(this, "options"),
          i(this, "cursor", 0),
          (this.options = t.options);
        const F = this.options.map(({ value: [E] }) => E?.toLowerCase());
        (this.cursor = Math.max(F.indexOf(t.initialValue), 0)),
          this.on("key", (E) => {
            if (!F.includes(E)) return;
            const B = this.options.find(({ value: [A] }) => A?.toLowerCase() === E);
            B && ((this.value = B.value), (this.state = "submit"), this.emit("submit"));
          });
      }
    };
    var o = class extends k {
      get valueWithCursor() {
        if (this.state === "submit") return this.value;
        if (this.cursor >= this.value.length) return `${this.value}\u2588`;
        const t = this.value.slice(0, this.cursor),
          [F, ...E] = this.value.slice(this.cursor);
        return `${t}${i__default.inverse(F)}${E.join("")}`;
      }
      get cursor() {
        return this._cursor;
      }
      constructor(t) {
        super(t),
          this.on("finalize", () => {
            this.value || (this.value = t.defaultValue);
          });
      }
    };
    (exports2.ConfirmPrompt = s),
      (exports2.GroupMultiSelectPrompt = m$1),
      (exports2.MultiSelectPrompt = u$2),
      (exports2.PasswordPrompt = m),
      (exports2.Prompt = k),
      (exports2.SelectKeyPrompt = c),
      (exports2.SelectPrompt = u),
      (exports2.TextPrompt = o),
      (exports2.block = block),
      (exports2.isCancel = isCancel2),
      (exports2.updateSettings = updateSettings);
  },
});

// node_modules/.pnpm/@clack+prompts@0.10.1/node_modules/@clack/prompts/dist/index.cjs
var require_dist2 = __commonJS({
  "node_modules/.pnpm/@clack+prompts@0.10.1/node_modules/@clack/prompts/dist/index.cjs"(
    exports2,
  ) {
    "use strict";
    var node_util = require("node:util");
    var core = require_dist();
    var process$1 = require("node:process");
    var e = require_picocolors();
    var sisteransi = require_src();
    function _interopDefaultCompat(t) {
      return t && typeof t == "object" && "default" in t ? t.default : t;
    }
    var process__default = _interopDefaultCompat(process$1);
    var e__default = _interopDefaultCompat(e);
    function isUnicodeSupported() {
      return process__default.platform !== "win32"
        ? process__default.env.TERM !== "linux"
        : !!process__default.env.CI ||
            !!process__default.env.WT_SESSION ||
            !!process__default.env.TERMINUS_SUBLIME ||
            process__default.env.ConEmuTask === "{cmd::Cmder}" ||
            process__default.env.TERM_PROGRAM === "Terminus-Sublime" ||
            process__default.env.TERM_PROGRAM === "vscode" ||
            process__default.env.TERM === "xterm-256color" ||
            process__default.env.TERM === "alacritty" ||
            process__default.env.TERMINAL_EMULATOR === "JetBrains-JediTerm";
    }
    var P = isUnicodeSupported();
    var u = (t, o) => (P ? t : o);
    var ie = u("\u25C6", "*");
    var G = u("\u25A0", "x");
    var L = u("\u25B2", "x");
    var S = u("\u25C7", "o");
    var ae = u("\u250C", "T");
    var a = u("\u2502", "|");
    var g = u("\u2514", "\u2014");
    var _ = u("\u25CF", ">");
    var A = u("\u25CB", " ");
    var C = u("\u25FB", "[\u2022]");
    var V = u("\u25FC", "[+]");
    var N = u("\u25FB", "[ ]");
    var oe = u("\u25AA", "\u2022");
    var j = u("\u2500", "-");
    var le = u("\u256E", "+");
    var ce = u("\u251C", "+");
    var ue = u("\u256F", "+");
    var B = u("\u25CF", "\u2022");
    var W = u("\u25C6", "*");
    var H = u("\u25B2", "!");
    var q = u("\u25A0", "x");
    var b = (t) => {
      switch (t) {
        case "initial":
        case "active":
          return e__default.cyan(ie);
        case "cancel":
          return e__default.red(G);
        case "error":
          return e__default.yellow(L);
        case "submit":
          return e__default.green(S);
      }
    };
    var E = (t) => {
      const { cursor: o, options: s, style: i } = t,
        r = t.maxItems ?? Number.POSITIVE_INFINITY,
        c = Math.max(process.stdout.rows - 4, 0),
        n = Math.min(c, Math.max(r, 5));
      let l = 0;
      o >= l + n - 3
        ? (l = Math.max(Math.min(o - n + 3, s.length - n), 0))
        : o < l + 2 && (l = Math.max(o - 2, 0));
      const $ = n < s.length && l > 0,
        h = n < s.length && l + n < s.length;
      return s.slice(l, l + n).map((m, y, w) => {
        const x = y === 0 && $,
          M = y === w.length - 1 && h;
        return x || M ? e__default.dim("...") : i(m, y + l === o);
      });
    };
    var text = (t) =>
      new core.TextPrompt({
        validate: t.validate,
        placeholder: t.placeholder,
        defaultValue: t.defaultValue,
        initialValue: t.initialValue,
        render() {
          const o = `${e__default.gray(a)}
${b(this.state)}  ${t.message}
`,
            s = t.placeholder
              ? e__default.inverse(t.placeholder[0]) +
                e__default.dim(t.placeholder.slice(1))
              : e__default.inverse(e__default.hidden("_")),
            i = this.value ? this.valueWithCursor : s;
          switch (this.state) {
            case "error":
              return `${o.trim()}
${e__default.yellow(a)}  ${i}
${e__default.yellow(g)}  ${e__default.yellow(this.error)}
`;
            case "submit":
              return `${o}${e__default.gray(a)}  ${e__default.dim(this.value || t.placeholder)}`;
            case "cancel":
              return `${o}${e__default.gray(a)}  ${e__default.strikethrough(e__default.dim(this.value ?? ""))}${
                this.value?.trim()
                  ? `
${e__default.gray(a)}`
                  : ""
              }`;
            default:
              return `${o}${e__default.cyan(a)}  ${i}
${e__default.cyan(g)}
`;
          }
        },
      }).prompt();
    var password = (t) =>
      new core.PasswordPrompt({
        validate: t.validate,
        mask: t.mask ?? oe,
        render() {
          const o = `${e__default.gray(a)}
${b(this.state)}  ${t.message}
`,
            s = this.valueWithCursor,
            i = this.masked;
          switch (this.state) {
            case "error":
              return `${o.trim()}
${e__default.yellow(a)}  ${i}
${e__default.yellow(g)}  ${e__default.yellow(this.error)}
`;
            case "submit":
              return `${o}${e__default.gray(a)}  ${e__default.dim(i)}`;
            case "cancel":
              return `${o}${e__default.gray(a)}  ${e__default.strikethrough(e__default.dim(i ?? ""))}${
                i
                  ? `
${e__default.gray(a)}`
                  : ""
              }`;
            default:
              return `${o}${e__default.cyan(a)}  ${s}
${e__default.cyan(g)}
`;
          }
        },
      }).prompt();
    var confirm = (t) => {
      const o = t.active ?? "Yes",
        s = t.inactive ?? "No";
      return new core.ConfirmPrompt({
        active: o,
        inactive: s,
        initialValue: t.initialValue ?? true,
        render() {
          const i = `${e__default.gray(a)}
${b(this.state)}  ${t.message}
`,
            r = this.value ? o : s;
          switch (this.state) {
            case "submit":
              return `${i}${e__default.gray(a)}  ${e__default.dim(r)}`;
            case "cancel":
              return `${i}${e__default.gray(a)}  ${e__default.strikethrough(e__default.dim(r))}
${e__default.gray(a)}`;
            default:
              return `${i}${e__default.cyan(a)}  ${this.value ? `${e__default.green(_)} ${o}` : `${e__default.dim(A)} ${e__default.dim(o)}`} ${e__default.dim("/")} ${this.value ? `${e__default.dim(A)} ${e__default.dim(s)}` : `${e__default.green(_)} ${s}`}
${e__default.cyan(g)}
`;
          }
        },
      }).prompt();
    };
    var select2 = (t) => {
      const o = (s, i) => {
        const r = s.label ?? String(s.value);
        switch (i) {
          case "selected":
            return `${e__default.dim(r)}`;
          case "active":
            return `${e__default.green(_)} ${r} ${s.hint ? e__default.dim(`(${s.hint})`) : ""}`;
          case "cancelled":
            return `${e__default.strikethrough(e__default.dim(r))}`;
          default:
            return `${e__default.dim(A)} ${e__default.dim(r)}`;
        }
      };
      return new core.SelectPrompt({
        options: t.options,
        initialValue: t.initialValue,
        render() {
          const s = `${e__default.gray(a)}
${b(this.state)}  ${t.message}
`;
          switch (this.state) {
            case "submit":
              return `${s}${e__default.gray(a)}  ${o(this.options[this.cursor], "selected")}`;
            case "cancel":
              return `${s}${e__default.gray(a)}  ${o(this.options[this.cursor], "cancelled")}
${e__default.gray(a)}`;
            default:
              return `${s}${e__default.cyan(a)}  ${E({
                cursor: this.cursor,
                options: this.options,
                maxItems: t.maxItems,
                style: (i, r) => o(i, r ? "active" : "inactive"),
              }).join(`
${e__default.cyan(a)}  `)}
${e__default.cyan(g)}
`;
          }
        },
      }).prompt();
    };
    var selectKey = (t) => {
      const o = (s, i = "inactive") => {
        const r = s.label ?? String(s.value);
        return i === "selected"
          ? `${e__default.dim(r)}`
          : i === "cancelled"
            ? `${e__default.strikethrough(e__default.dim(r))}`
            : i === "active"
              ? `${e__default.bgCyan(e__default.gray(` ${s.value} `))} ${r} ${s.hint ? e__default.dim(`(${s.hint})`) : ""}`
              : `${e__default.gray(e__default.bgWhite(e__default.inverse(` ${s.value} `)))} ${r} ${s.hint ? e__default.dim(`(${s.hint})`) : ""}`;
      };
      return new core.SelectKeyPrompt({
        options: t.options,
        initialValue: t.initialValue,
        render() {
          const s = `${e__default.gray(a)}
${b(this.state)}  ${t.message}
`;
          switch (this.state) {
            case "submit":
              return `${s}${e__default.gray(a)}  ${o(this.options.find((i) => i.value === this.value) ?? t.options[0], "selected")}`;
            case "cancel":
              return `${s}${e__default.gray(a)}  ${o(this.options[0], "cancelled")}
${e__default.gray(a)}`;
            default:
              return `${s}${e__default.cyan(a)}  ${this.options.map((i, r) =>
                o(i, r === this.cursor ? "active" : "inactive"),
              ).join(`
${e__default.cyan(a)}  `)}
${e__default.cyan(g)}
`;
          }
        },
      }).prompt();
    };
    var multiselect = (t) => {
      const o = (s, i) => {
        const r = s.label ?? String(s.value);
        return i === "active"
          ? `${e__default.cyan(C)} ${r} ${s.hint ? e__default.dim(`(${s.hint})`) : ""}`
          : i === "selected"
            ? `${e__default.green(V)} ${e__default.dim(r)} ${s.hint ? e__default.dim(`(${s.hint})`) : ""}`
            : i === "cancelled"
              ? `${e__default.strikethrough(e__default.dim(r))}`
              : i === "active-selected"
                ? `${e__default.green(V)} ${r} ${s.hint ? e__default.dim(`(${s.hint})`) : ""}`
                : i === "submitted"
                  ? `${e__default.dim(r)}`
                  : `${e__default.dim(N)} ${e__default.dim(r)}`;
      };
      return new core.MultiSelectPrompt({
        options: t.options,
        initialValues: t.initialValues,
        required: t.required ?? true,
        cursorAt: t.cursorAt,
        validate(s) {
          if (this.required && s.length === 0)
            return `Please select at least one option.
${e__default.reset(e__default.dim(`Press ${e__default.gray(e__default.bgWhite(e__default.inverse(" space ")))} to select, ${e__default.gray(e__default.bgWhite(e__default.inverse(" enter ")))} to submit`))}`;
        },
        render() {
          const s = `${e__default.gray(a)}
${b(this.state)}  ${t.message}
`,
            i = (r, c) => {
              const n = this.value.includes(r.value);
              return c && n
                ? o(r, "active-selected")
                : n
                  ? o(r, "selected")
                  : o(r, c ? "active" : "inactive");
            };
          switch (this.state) {
            case "submit":
              return `${s}${e__default.gray(a)}  ${
                this.options
                  .filter(({ value: r }) => this.value.includes(r))
                  .map((r) => o(r, "submitted"))
                  .join(e__default.dim(", ")) || e__default.dim("none")
              }`;
            case "cancel": {
              const r = this.options
                .filter(({ value: c }) => this.value.includes(c))
                .map((c) => o(c, "cancelled"))
                .join(e__default.dim(", "));
              return `${s}${e__default.gray(a)}  ${
                r.trim()
                  ? `${r}
${e__default.gray(a)}`
                  : ""
              }`;
            }
            case "error": {
              const r = this.error
                .split(
                  `
`,
                )
                .map((c, n) =>
                  n === 0
                    ? `${e__default.yellow(g)}  ${e__default.yellow(c)}`
                    : `   ${c}`,
                ).join(`
`);
              return `${s + e__default.yellow(a)}  ${E({
                options: this.options,
                cursor: this.cursor,
                maxItems: t.maxItems,
                style: i,
              }).join(`
${e__default.yellow(a)}  `)}
${r}
`;
            }
            default:
              return `${s}${e__default.cyan(a)}  ${E({
                options: this.options,
                cursor: this.cursor,
                maxItems: t.maxItems,
                style: i,
              }).join(`
${e__default.cyan(a)}  `)}
${e__default.cyan(g)}
`;
          }
        },
      }).prompt();
    };
    var groupMultiselect = (t) => {
      const { selectableGroups: o = true } = t,
        s = (i, r, c = []) => {
          const n = i.label ?? String(i.value),
            l = typeof i.group == "string",
            $ = l && (c[c.indexOf(i) + 1] ?? { group: true }),
            h = l && $.group === true,
            m = l ? (o ? `${h ? g : a} ` : "  ") : "";
          if (r === "active")
            return `${e__default.dim(m)}${e__default.cyan(C)} ${n} ${i.hint ? e__default.dim(`(${i.hint})`) : ""}`;
          if (r === "group-active")
            return `${m}${e__default.cyan(C)} ${e__default.dim(n)}`;
          if (r === "group-active-selected")
            return `${m}${e__default.green(V)} ${e__default.dim(n)}`;
          if (r === "selected") {
            const w = l || o ? e__default.green(V) : "";
            return `${e__default.dim(m)}${w} ${e__default.dim(n)} ${i.hint ? e__default.dim(`(${i.hint})`) : ""}`;
          }
          if (r === "cancelled") return `${e__default.strikethrough(e__default.dim(n))}`;
          if (r === "active-selected")
            return `${e__default.dim(m)}${e__default.green(V)} ${n} ${i.hint ? e__default.dim(`(${i.hint})`) : ""}`;
          if (r === "submitted") return `${e__default.dim(n)}`;
          const y = l || o ? e__default.dim(N) : "";
          return `${e__default.dim(m)}${y} ${e__default.dim(n)}`;
        };
      return new core.GroupMultiSelectPrompt({
        options: t.options,
        initialValues: t.initialValues,
        required: t.required ?? true,
        cursorAt: t.cursorAt,
        selectableGroups: o,
        validate(i) {
          if (this.required && i.length === 0)
            return `Please select at least one option.
${e__default.reset(e__default.dim(`Press ${e__default.gray(e__default.bgWhite(e__default.inverse(" space ")))} to select, ${e__default.gray(e__default.bgWhite(e__default.inverse(" enter ")))} to submit`))}`;
        },
        render() {
          const i = `${e__default.gray(a)}
${b(this.state)}  ${t.message}
`;
          switch (this.state) {
            case "submit":
              return `${i}${e__default.gray(a)}  ${this.options
                .filter(({ value: r }) => this.value.includes(r))
                .map((r) => s(r, "submitted"))
                .join(e__default.dim(", "))}`;
            case "cancel": {
              const r = this.options
                .filter(({ value: c }) => this.value.includes(c))
                .map((c) => s(c, "cancelled"))
                .join(e__default.dim(", "));
              return `${i}${e__default.gray(a)}  ${
                r.trim()
                  ? `${r}
${e__default.gray(a)}`
                  : ""
              }`;
            }
            case "error": {
              const r = this.error
                .split(
                  `
`,
                )
                .map((c, n) =>
                  n === 0
                    ? `${e__default.yellow(g)}  ${e__default.yellow(c)}`
                    : `   ${c}`,
                ).join(`
`);
              return `${i}${e__default.yellow(a)}  ${this.options.map((c, n, l) => {
                const $ =
                    this.value.includes(c.value) ||
                    (c.group === true && this.isGroupSelected(`${c.value}`)),
                  h = n === this.cursor;
                return !h &&
                  typeof c.group == "string" &&
                  this.options[this.cursor].value === c.group
                  ? s(c, $ ? "group-active-selected" : "group-active", l)
                  : h && $
                    ? s(c, "active-selected", l)
                    : $
                      ? s(c, "selected", l)
                      : s(c, h ? "active" : "inactive", l);
              }).join(`
${e__default.yellow(a)}  `)}
${r}
`;
            }
            default:
              return `${i}${e__default.cyan(a)}  ${this.options.map((r, c, n) => {
                const l =
                    this.value.includes(r.value) ||
                    (r.group === true && this.isGroupSelected(`${r.value}`)),
                  $ = c === this.cursor;
                return !$ &&
                  typeof r.group == "string" &&
                  this.options[this.cursor].value === r.group
                  ? s(r, l ? "group-active-selected" : "group-active", n)
                  : $ && l
                    ? s(r, "active-selected", n)
                    : l
                      ? s(r, "selected", n)
                      : s(r, $ ? "active" : "inactive", n);
              }).join(`
${e__default.cyan(a)}  `)}
${e__default.cyan(g)}
`;
          }
        },
      }).prompt();
    };
    var note2 = (t = "", o = "") => {
      const s = `
${t}
`.split(`
`),
        i = node_util.stripVTControlCharacters(o).length,
        r =
          Math.max(
            s.reduce((n, l) => {
              const $ = node_util.stripVTControlCharacters(l);
              return $.length > n ? $.length : n;
            }, 0),
            i,
          ) + 2,
        c = s.map(
          (n) =>
            `${e__default.gray(a)}  ${e__default.dim(n)}${" ".repeat(r - node_util.stripVTControlCharacters(n).length)}${e__default.gray(a)}`,
        ).join(`
`);
      process.stdout.write(`${e__default.gray(a)}
${e__default.green(S)}  ${e__default.reset(o)} ${e__default.gray(j.repeat(Math.max(r - i - 1, 1)) + le)}
${c}
${e__default.gray(ce + j.repeat(r + 2) + ue)}
`);
    };
    var cancel = (t = "") => {
      process.stdout.write(`${e__default.gray(g)}  ${e__default.red(t)}

`);
    };
    var intro2 = (t = "") => {
      process.stdout.write(`${e__default.gray(ae)}  ${t}
`);
    };
    var outro2 = (t = "") => {
      process.stdout.write(`${e__default.gray(a)}
${e__default.gray(g)}  ${t}

`);
    };
    var log = {
      message: (t = "", { symbol: o = e__default.gray(a) } = {}) => {
        const s = [`${e__default.gray(a)}`];
        if (t) {
          const [i, ...r] = t.split(`
`);
          s.push(`${o}  ${i}`, ...r.map((c) => `${e__default.gray(a)}  ${c}`));
        }
        process.stdout.write(`${s.join(`
`)}
`);
      },
      info: (t) => {
        log.message(t, { symbol: e__default.blue(B) });
      },
      success: (t) => {
        log.message(t, { symbol: e__default.green(W) });
      },
      step: (t) => {
        log.message(t, { symbol: e__default.green(S) });
      },
      warn: (t) => {
        log.message(t, { symbol: e__default.yellow(H) });
      },
      warning: (t) => {
        log.warn(t);
      },
      error: (t) => {
        log.message(t, { symbol: e__default.red(q) });
      },
    };
    var D = `${e__default.gray(a)}  `;
    var stream = {
      message: async (t, { symbol: o = e__default.gray(a) } = {}) => {
        process.stdout.write(`${e__default.gray(a)}
${o}  `);
        let s = 3;
        for await (let i of t) {
          (i = i.replace(
            /\n/g,
            `
${D}`,
          )),
            i.includes(`
`) &&
              (s =
                3 +
                node_util.stripVTControlCharacters(
                  i.slice(
                    i.lastIndexOf(`
`),
                  ),
                ).length);
          const r = node_util.stripVTControlCharacters(i).length;
          s + r < process.stdout.columns
            ? ((s += r), process.stdout.write(i))
            : (process.stdout.write(`
${D}${i.trimStart()}`),
              (s = 3 + node_util.stripVTControlCharacters(i.trimStart()).length));
        }
        process.stdout.write(`
`);
      },
      info: (t) => stream.message(t, { symbol: e__default.blue(B) }),
      success: (t) => stream.message(t, { symbol: e__default.green(W) }),
      step: (t) => stream.message(t, { symbol: e__default.green(S) }),
      warn: (t) => stream.message(t, { symbol: e__default.yellow(H) }),
      warning: (t) => stream.warn(t),
      error: (t) => stream.message(t, { symbol: e__default.red(q) }),
    };
    var spinner2 = ({ indicator: t = "dots" } = {}) => {
      const o = P ? ["\u25D2", "\u25D0", "\u25D3", "\u25D1"] : ["\u2022", "o", "O", "0"],
        s = P ? 80 : 120,
        i = process.env.CI === "true";
      let r,
        c,
        n = false,
        l = "",
        $,
        h = performance.now();
      const m = (p) => {
          const d = p > 1 ? "Something went wrong" : "Canceled";
          n && R(d, p);
        },
        y = () => m(2),
        w = () => m(1),
        x = () => {
          process.on("uncaughtExceptionMonitor", y),
            process.on("unhandledRejection", y),
            process.on("SIGINT", w),
            process.on("SIGTERM", w),
            process.on("exit", m);
        },
        M = () => {
          process.removeListener("uncaughtExceptionMonitor", y),
            process.removeListener("unhandledRejection", y),
            process.removeListener("SIGINT", w),
            process.removeListener("SIGTERM", w),
            process.removeListener("exit", m);
        },
        T = () => {
          if ($ === void 0) return;
          i &&
            process.stdout.write(`
`);
          const p = $.split(`
`);
          process.stdout.write(sisteransi.cursor.move(-999, p.length - 1)),
            process.stdout.write(sisteransi.erase.down(p.length));
        },
        I = (p) => p.replace(/\.+$/, ""),
        k = (p) => {
          const d = (performance.now() - p) / 1e3,
            v = Math.floor(d / 60),
            f = Math.floor(d % 60);
          return v > 0 ? `[${v}m ${f}s]` : `[${f}s]`;
        },
        O = (p = "") => {
          (n = true),
            (r = core.block()),
            (l = I(p)),
            (h = performance.now()),
            process.stdout.write(`${e__default.gray(a)}
`);
          let d = 0,
            v = 0;
          x(),
            (c = setInterval(() => {
              if (i && l === $) return;
              T(), ($ = l);
              const f = e__default.magenta(o[d]);
              if (i) process.stdout.write(`${f}  ${l}...`);
              else if (t === "timer") process.stdout.write(`${f}  ${l} ${k(h)}`);
              else {
                const F = ".".repeat(Math.floor(v)).slice(0, 3);
                process.stdout.write(`${f}  ${l}${F}`);
              }
              (d = d + 1 < o.length ? d + 1 : 0), (v = v < o.length ? v + 0.125 : 0);
            }, s));
        },
        R = (p = "", d = 0) => {
          (n = false), clearInterval(c), T();
          const v =
            d === 0
              ? e__default.green(S)
              : d === 1
                ? e__default.red(G)
                : e__default.red(L);
          (l = I(p ?? l)),
            t === "timer"
              ? process.stdout.write(`${v}  ${l} ${k(h)}
`)
              : process.stdout.write(`${v}  ${l}
`),
            M(),
            r();
        };
      return {
        start: O,
        stop: R,
        message: (p = "") => {
          l = I(p ?? l);
        },
      };
    };
    var group = async (t, o) => {
      const s = {},
        i = Object.keys(t);
      for (const r of i) {
        const c = t[r],
          n = await c({ results: s })?.catch((l) => {
            throw l;
          });
        if (typeof o?.onCancel == "function" && core.isCancel(n)) {
          (s[r] = "canceled"), o.onCancel({ results: s });
          continue;
        }
        s[r] = n;
      }
      return s;
    };
    var tasks = async (t) => {
      for (const o of t) {
        if (o.enabled === false) continue;
        const s = spinner2();
        s.start(o.title);
        const i = await o.task(s.message);
        s.stop(i || o.title);
      }
    };
    (exports2.isCancel = core.isCancel),
      (exports2.updateSettings = core.updateSettings),
      (exports2.cancel = cancel),
      (exports2.confirm = confirm),
      (exports2.group = group),
      (exports2.groupMultiselect = groupMultiselect),
      (exports2.intro = intro2),
      (exports2.log = log),
      (exports2.multiselect = multiselect),
      (exports2.note = note2),
      (exports2.outro = outro2),
      (exports2.password = password),
      (exports2.select = select2),
      (exports2.selectKey = selectKey),
      (exports2.spinner = spinner2),
      (exports2.stream = stream),
      (exports2.tasks = tasks),
      (exports2.text = text);
  },
});

// node_modules/.pnpm/delayed-stream@1.0.0/node_modules/delayed-stream/lib/delayed_stream.js
var require_delayed_stream = __commonJS({
  "node_modules/.pnpm/delayed-stream@1.0.0/node_modules/delayed-stream/lib/delayed_stream.js"(
    exports2,
    module2,
  ) {
    var Stream = require("stream").Stream;
    var util = require("util");
    module2.exports = DelayedStream;
    function DelayedStream() {
      this.source = null;
      this.dataSize = 0;
      this.maxDataSize = 1024 * 1024;
      this.pauseStream = true;
      this._maxDataSizeExceeded = false;
      this._released = false;
      this._bufferedEvents = [];
    }
    util.inherits(DelayedStream, Stream);
    DelayedStream.create = function (source, options) {
      var delayedStream = new this();
      options = options || {};
      for (var option in options) {
        delayedStream[option] = options[option];
      }
      delayedStream.source = source;
      var realEmit = source.emit;
      source.emit = function () {
        delayedStream._handleEmit(arguments);
        return realEmit.apply(source, arguments);
      };
      source.on("error", function () {});
      if (delayedStream.pauseStream) {
        source.pause();
      }
      return delayedStream;
    };
    Object.defineProperty(DelayedStream.prototype, "readable", {
      configurable: true,
      enumerable: true,
      get: function () {
        return this.source.readable;
      },
    });
    DelayedStream.prototype.setEncoding = function () {
      return this.source.setEncoding.apply(this.source, arguments);
    };
    DelayedStream.prototype.resume = function () {
      if (!this._released) {
        this.release();
      }
      this.source.resume();
    };
    DelayedStream.prototype.pause = function () {
      this.source.pause();
    };
    DelayedStream.prototype.release = function () {
      this._released = true;
      this._bufferedEvents.forEach(
        function (args2) {
          this.emit.apply(this, args2);
        }.bind(this),
      );
      this._bufferedEvents = [];
    };
    DelayedStream.prototype.pipe = function () {
      var r = Stream.prototype.pipe.apply(this, arguments);
      this.resume();
      return r;
    };
    DelayedStream.prototype._handleEmit = function (args2) {
      if (this._released) {
        this.emit.apply(this, args2);
        return;
      }
      if (args2[0] === "data") {
        this.dataSize += args2[1].length;
        this._checkIfMaxDataSizeExceeded();
      }
      this._bufferedEvents.push(args2);
    };
    DelayedStream.prototype._checkIfMaxDataSizeExceeded = function () {
      if (this._maxDataSizeExceeded) {
        return;
      }
      if (this.dataSize <= this.maxDataSize) {
        return;
      }
      this._maxDataSizeExceeded = true;
      var message =
        "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
      this.emit("error", new Error(message));
    };
  },
});

// node_modules/.pnpm/combined-stream@1.0.8/node_modules/combined-stream/lib/combined_stream.js
var require_combined_stream = __commonJS({
  "node_modules/.pnpm/combined-stream@1.0.8/node_modules/combined-stream/lib/combined_stream.js"(
    exports2,
    module2,
  ) {
    var util = require("util");
    var Stream = require("stream").Stream;
    var DelayedStream = require_delayed_stream();
    module2.exports = CombinedStream;
    function CombinedStream() {
      this.writable = false;
      this.readable = true;
      this.dataSize = 0;
      this.maxDataSize = 2 * 1024 * 1024;
      this.pauseStreams = true;
      this._released = false;
      this._streams = [];
      this._currentStream = null;
      this._insideLoop = false;
      this._pendingNext = false;
    }
    util.inherits(CombinedStream, Stream);
    CombinedStream.create = function (options) {
      var combinedStream = new this();
      options = options || {};
      for (var option in options) {
        combinedStream[option] = options[option];
      }
      return combinedStream;
    };
    CombinedStream.isStreamLike = function (stream) {
      return (
        typeof stream !== "function" &&
        typeof stream !== "string" &&
        typeof stream !== "boolean" &&
        typeof stream !== "number" &&
        !Buffer.isBuffer(stream)
      );
    };
    CombinedStream.prototype.append = function (stream) {
      var isStreamLike = CombinedStream.isStreamLike(stream);
      if (isStreamLike) {
        if (!(stream instanceof DelayedStream)) {
          var newStream = DelayedStream.create(stream, {
            maxDataSize: Infinity,
            pauseStream: this.pauseStreams,
          });
          stream.on("data", this._checkDataSize.bind(this));
          stream = newStream;
        }
        this._handleErrors(stream);
        if (this.pauseStreams) {
          stream.pause();
        }
      }
      this._streams.push(stream);
      return this;
    };
    CombinedStream.prototype.pipe = function (dest, options) {
      Stream.prototype.pipe.call(this, dest, options);
      this.resume();
      return dest;
    };
    CombinedStream.prototype._getNext = function () {
      this._currentStream = null;
      if (this._insideLoop) {
        this._pendingNext = true;
        return;
      }
      this._insideLoop = true;
      try {
        do {
          this._pendingNext = false;
          this._realGetNext();
        } while (this._pendingNext);
      } finally {
        this._insideLoop = false;
      }
    };
    CombinedStream.prototype._realGetNext = function () {
      var stream = this._streams.shift();
      if (typeof stream == "undefined") {
        this.end();
        return;
      }
      if (typeof stream !== "function") {
        this._pipeNext(stream);
        return;
      }
      var getStream = stream;
      getStream(
        function (stream2) {
          var isStreamLike = CombinedStream.isStreamLike(stream2);
          if (isStreamLike) {
            stream2.on("data", this._checkDataSize.bind(this));
            this._handleErrors(stream2);
          }
          this._pipeNext(stream2);
        }.bind(this),
      );
    };
    CombinedStream.prototype._pipeNext = function (stream) {
      this._currentStream = stream;
      var isStreamLike = CombinedStream.isStreamLike(stream);
      if (isStreamLike) {
        stream.on("end", this._getNext.bind(this));
        stream.pipe(this, { end: false });
        return;
      }
      var value = stream;
      this.write(value);
      this._getNext();
    };
    CombinedStream.prototype._handleErrors = function (stream) {
      var self = this;
      stream.on("error", function (err) {
        self._emitError(err);
      });
    };
    CombinedStream.prototype.write = function (data) {
      this.emit("data", data);
    };
    CombinedStream.prototype.pause = function () {
      if (!this.pauseStreams) {
        return;
      }
      if (
        this.pauseStreams &&
        this._currentStream &&
        typeof this._currentStream.pause == "function"
      )
        this._currentStream.pause();
      this.emit("pause");
    };
    CombinedStream.prototype.resume = function () {
      if (!this._released) {
        this._released = true;
        this.writable = true;
        this._getNext();
      }
      if (
        this.pauseStreams &&
        this._currentStream &&
        typeof this._currentStream.resume == "function"
      )
        this._currentStream.resume();
      this.emit("resume");
    };
    CombinedStream.prototype.end = function () {
      this._reset();
      this.emit("end");
    };
    CombinedStream.prototype.destroy = function () {
      this._reset();
      this.emit("close");
    };
    CombinedStream.prototype._reset = function () {
      this.writable = false;
      this._streams = [];
      this._currentStream = null;
    };
    CombinedStream.prototype._checkDataSize = function () {
      this._updateDataSize();
      if (this.dataSize <= this.maxDataSize) {
        return;
      }
      var message =
        "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
      this._emitError(new Error(message));
    };
    CombinedStream.prototype._updateDataSize = function () {
      this.dataSize = 0;
      var self = this;
      this._streams.forEach(function (stream) {
        if (!stream.dataSize) {
          return;
        }
        self.dataSize += stream.dataSize;
      });
      if (this._currentStream && this._currentStream.dataSize) {
        this.dataSize += this._currentStream.dataSize;
      }
    };
    CombinedStream.prototype._emitError = function (err) {
      this._reset();
      this.emit("error", err);
    };
  },
});

// node_modules/.pnpm/mime-db@1.52.0/node_modules/mime-db/db.json
var require_db = __commonJS({
  "node_modules/.pnpm/mime-db@1.52.0/node_modules/mime-db/db.json"(exports2, module2) {
    module2.exports = {
      "application/1d-interleaved-parityfec": {
        source: "iana",
      },
      "application/3gpdash-qoe-report+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
      },
      "application/3gpp-ims+xml": {
        source: "iana",
        compressible: true,
      },
      "application/3gpphal+json": {
        source: "iana",
        compressible: true,
      },
      "application/3gpphalforms+json": {
        source: "iana",
        compressible: true,
      },
      "application/a2l": {
        source: "iana",
      },
      "application/ace+cbor": {
        source: "iana",
      },
      "application/activemessage": {
        source: "iana",
      },
      "application/activity+json": {
        source: "iana",
        compressible: true,
      },
      "application/alto-costmap+json": {
        source: "iana",
        compressible: true,
      },
      "application/alto-costmapfilter+json": {
        source: "iana",
        compressible: true,
      },
      "application/alto-directory+json": {
        source: "iana",
        compressible: true,
      },
      "application/alto-endpointcost+json": {
        source: "iana",
        compressible: true,
      },
      "application/alto-endpointcostparams+json": {
        source: "iana",
        compressible: true,
      },
      "application/alto-endpointprop+json": {
        source: "iana",
        compressible: true,
      },
      "application/alto-endpointpropparams+json": {
        source: "iana",
        compressible: true,
      },
      "application/alto-error+json": {
        source: "iana",
        compressible: true,
      },
      "application/alto-networkmap+json": {
        source: "iana",
        compressible: true,
      },
      "application/alto-networkmapfilter+json": {
        source: "iana",
        compressible: true,
      },
      "application/alto-updatestreamcontrol+json": {
        source: "iana",
        compressible: true,
      },
      "application/alto-updatestreamparams+json": {
        source: "iana",
        compressible: true,
      },
      "application/aml": {
        source: "iana",
      },
      "application/andrew-inset": {
        source: "iana",
        extensions: ["ez"],
      },
      "application/applefile": {
        source: "iana",
      },
      "application/applixware": {
        source: "apache",
        extensions: ["aw"],
      },
      "application/at+jwt": {
        source: "iana",
      },
      "application/atf": {
        source: "iana",
      },
      "application/atfx": {
        source: "iana",
      },
      "application/atom+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atom"],
      },
      "application/atomcat+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomcat"],
      },
      "application/atomdeleted+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomdeleted"],
      },
      "application/atomicmail": {
        source: "iana",
      },
      "application/atomsvc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomsvc"],
      },
      "application/atsc-dwd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dwd"],
      },
      "application/atsc-dynamic-event-message": {
        source: "iana",
      },
      "application/atsc-held+xml": {
        source: "iana",
        compressible: true,
        extensions: ["held"],
      },
      "application/atsc-rdt+json": {
        source: "iana",
        compressible: true,
      },
      "application/atsc-rsat+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rsat"],
      },
      "application/atxml": {
        source: "iana",
      },
      "application/auth-policy+xml": {
        source: "iana",
        compressible: true,
      },
      "application/bacnet-xdd+zip": {
        source: "iana",
        compressible: false,
      },
      "application/batch-smtp": {
        source: "iana",
      },
      "application/bdoc": {
        compressible: false,
        extensions: ["bdoc"],
      },
      "application/beep+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
      },
      "application/calendar+json": {
        source: "iana",
        compressible: true,
      },
      "application/calendar+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xcs"],
      },
      "application/call-completion": {
        source: "iana",
      },
      "application/cals-1840": {
        source: "iana",
      },
      "application/captive+json": {
        source: "iana",
        compressible: true,
      },
      "application/cbor": {
        source: "iana",
      },
      "application/cbor-seq": {
        source: "iana",
      },
      "application/cccex": {
        source: "iana",
      },
      "application/ccmp+xml": {
        source: "iana",
        compressible: true,
      },
      "application/ccxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ccxml"],
      },
      "application/cdfx+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cdfx"],
      },
      "application/cdmi-capability": {
        source: "iana",
        extensions: ["cdmia"],
      },
      "application/cdmi-container": {
        source: "iana",
        extensions: ["cdmic"],
      },
      "application/cdmi-domain": {
        source: "iana",
        extensions: ["cdmid"],
      },
      "application/cdmi-object": {
        source: "iana",
        extensions: ["cdmio"],
      },
      "application/cdmi-queue": {
        source: "iana",
        extensions: ["cdmiq"],
      },
      "application/cdni": {
        source: "iana",
      },
      "application/cea": {
        source: "iana",
      },
      "application/cea-2018+xml": {
        source: "iana",
        compressible: true,
      },
      "application/cellml+xml": {
        source: "iana",
        compressible: true,
      },
      "application/cfw": {
        source: "iana",
      },
      "application/city+json": {
        source: "iana",
        compressible: true,
      },
      "application/clr": {
        source: "iana",
      },
      "application/clue+xml": {
        source: "iana",
        compressible: true,
      },
      "application/clue_info+xml": {
        source: "iana",
        compressible: true,
      },
      "application/cms": {
        source: "iana",
      },
      "application/cnrp+xml": {
        source: "iana",
        compressible: true,
      },
      "application/coap-group+json": {
        source: "iana",
        compressible: true,
      },
      "application/coap-payload": {
        source: "iana",
      },
      "application/commonground": {
        source: "iana",
      },
      "application/conference-info+xml": {
        source: "iana",
        compressible: true,
      },
      "application/cose": {
        source: "iana",
      },
      "application/cose-key": {
        source: "iana",
      },
      "application/cose-key-set": {
        source: "iana",
      },
      "application/cpl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cpl"],
      },
      "application/csrattrs": {
        source: "iana",
      },
      "application/csta+xml": {
        source: "iana",
        compressible: true,
      },
      "application/cstadata+xml": {
        source: "iana",
        compressible: true,
      },
      "application/csvm+json": {
        source: "iana",
        compressible: true,
      },
      "application/cu-seeme": {
        source: "apache",
        extensions: ["cu"],
      },
      "application/cwt": {
        source: "iana",
      },
      "application/cybercash": {
        source: "iana",
      },
      "application/dart": {
        compressible: true,
      },
      "application/dash+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpd"],
      },
      "application/dash-patch+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpp"],
      },
      "application/dashdelta": {
        source: "iana",
      },
      "application/davmount+xml": {
        source: "iana",
        compressible: true,
        extensions: ["davmount"],
      },
      "application/dca-rft": {
        source: "iana",
      },
      "application/dcd": {
        source: "iana",
      },
      "application/dec-dx": {
        source: "iana",
      },
      "application/dialog-info+xml": {
        source: "iana",
        compressible: true,
      },
      "application/dicom": {
        source: "iana",
      },
      "application/dicom+json": {
        source: "iana",
        compressible: true,
      },
      "application/dicom+xml": {
        source: "iana",
        compressible: true,
      },
      "application/dii": {
        source: "iana",
      },
      "application/dit": {
        source: "iana",
      },
      "application/dns": {
        source: "iana",
      },
      "application/dns+json": {
        source: "iana",
        compressible: true,
      },
      "application/dns-message": {
        source: "iana",
      },
      "application/docbook+xml": {
        source: "apache",
        compressible: true,
        extensions: ["dbk"],
      },
      "application/dots+cbor": {
        source: "iana",
      },
      "application/dskpp+xml": {
        source: "iana",
        compressible: true,
      },
      "application/dssc+der": {
        source: "iana",
        extensions: ["dssc"],
      },
      "application/dssc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdssc"],
      },
      "application/dvcs": {
        source: "iana",
      },
      "application/ecmascript": {
        source: "iana",
        compressible: true,
        extensions: ["es", "ecma"],
      },
      "application/edi-consent": {
        source: "iana",
      },
      "application/edi-x12": {
        source: "iana",
        compressible: false,
      },
      "application/edifact": {
        source: "iana",
        compressible: false,
      },
      "application/efi": {
        source: "iana",
      },
      "application/elm+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
      },
      "application/elm+xml": {
        source: "iana",
        compressible: true,
      },
      "application/emergencycalldata.cap+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
      },
      "application/emergencycalldata.comment+xml": {
        source: "iana",
        compressible: true,
      },
      "application/emergencycalldata.control+xml": {
        source: "iana",
        compressible: true,
      },
      "application/emergencycalldata.deviceinfo+xml": {
        source: "iana",
        compressible: true,
      },
      "application/emergencycalldata.ecall.msd": {
        source: "iana",
      },
      "application/emergencycalldata.providerinfo+xml": {
        source: "iana",
        compressible: true,
      },
      "application/emergencycalldata.serviceinfo+xml": {
        source: "iana",
        compressible: true,
      },
      "application/emergencycalldata.subscriberinfo+xml": {
        source: "iana",
        compressible: true,
      },
      "application/emergencycalldata.veds+xml": {
        source: "iana",
        compressible: true,
      },
      "application/emma+xml": {
        source: "iana",
        compressible: true,
        extensions: ["emma"],
      },
      "application/emotionml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["emotionml"],
      },
      "application/encaprtp": {
        source: "iana",
      },
      "application/epp+xml": {
        source: "iana",
        compressible: true,
      },
      "application/epub+zip": {
        source: "iana",
        compressible: false,
        extensions: ["epub"],
      },
      "application/eshop": {
        source: "iana",
      },
      "application/exi": {
        source: "iana",
        extensions: ["exi"],
      },
      "application/expect-ct-report+json": {
        source: "iana",
        compressible: true,
      },
      "application/express": {
        source: "iana",
        extensions: ["exp"],
      },
      "application/fastinfoset": {
        source: "iana",
      },
      "application/fastsoap": {
        source: "iana",
      },
      "application/fdt+xml": {
        source: "iana",
        compressible: true,
        extensions: ["fdt"],
      },
      "application/fhir+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
      },
      "application/fhir+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
      },
      "application/fido.trusted-apps+json": {
        compressible: true,
      },
      "application/fits": {
        source: "iana",
      },
      "application/flexfec": {
        source: "iana",
      },
      "application/font-sfnt": {
        source: "iana",
      },
      "application/font-tdpfr": {
        source: "iana",
        extensions: ["pfr"],
      },
      "application/font-woff": {
        source: "iana",
        compressible: false,
      },
      "application/framework-attributes+xml": {
        source: "iana",
        compressible: true,
      },
      "application/geo+json": {
        source: "iana",
        compressible: true,
        extensions: ["geojson"],
      },
      "application/geo+json-seq": {
        source: "iana",
      },
      "application/geopackage+sqlite3": {
        source: "iana",
      },
      "application/geoxacml+xml": {
        source: "iana",
        compressible: true,
      },
      "application/gltf-buffer": {
        source: "iana",
      },
      "application/gml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["gml"],
      },
      "application/gpx+xml": {
        source: "apache",
        compressible: true,
        extensions: ["gpx"],
      },
      "application/gxf": {
        source: "apache",
        extensions: ["gxf"],
      },
      "application/gzip": {
        source: "iana",
        compressible: false,
        extensions: ["gz"],
      },
      "application/h224": {
        source: "iana",
      },
      "application/held+xml": {
        source: "iana",
        compressible: true,
      },
      "application/hjson": {
        extensions: ["hjson"],
      },
      "application/http": {
        source: "iana",
      },
      "application/hyperstudio": {
        source: "iana",
        extensions: ["stk"],
      },
      "application/ibe-key-request+xml": {
        source: "iana",
        compressible: true,
      },
      "application/ibe-pkg-reply+xml": {
        source: "iana",
        compressible: true,
      },
      "application/ibe-pp-data": {
        source: "iana",
      },
      "application/iges": {
        source: "iana",
      },
      "application/im-iscomposing+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
      },
      "application/index": {
        source: "iana",
      },
      "application/index.cmd": {
        source: "iana",
      },
      "application/index.obj": {
        source: "iana",
      },
      "application/index.response": {
        source: "iana",
      },
      "application/index.vnd": {
        source: "iana",
      },
      "application/inkml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ink", "inkml"],
      },
      "application/iotp": {
        source: "iana",
      },
      "application/ipfix": {
        source: "iana",
        extensions: ["ipfix"],
      },
      "application/ipp": {
        source: "iana",
      },
      "application/isup": {
        source: "iana",
      },
      "application/its+xml": {
        source: "iana",
        compressible: true,
        extensions: ["its"],
      },
      "application/java-archive": {
        source: "apache",
        compressible: false,
        extensions: ["jar", "war", "ear"],
      },
      "application/java-serialized-object": {
        source: "apache",
        compressible: false,
        extensions: ["ser"],
      },
      "application/java-vm": {
        source: "apache",
        compressible: false,
        extensions: ["class"],
      },
      "application/javascript": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["js", "mjs"],
      },
      "application/jf2feed+json": {
        source: "iana",
        compressible: true,
      },
      "application/jose": {
        source: "iana",
      },
      "application/jose+json": {
        source: "iana",
        compressible: true,
      },
      "application/jrd+json": {
        source: "iana",
        compressible: true,
      },
      "application/jscalendar+json": {
        source: "iana",
        compressible: true,
      },
      "application/json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["json", "map"],
      },
      "application/json-patch+json": {
        source: "iana",
        compressible: true,
      },
      "application/json-seq": {
        source: "iana",
      },
      "application/json5": {
        extensions: ["json5"],
      },
      "application/jsonml+json": {
        source: "apache",
        compressible: true,
        extensions: ["jsonml"],
      },
      "application/jwk+json": {
        source: "iana",
        compressible: true,
      },
      "application/jwk-set+json": {
        source: "iana",
        compressible: true,
      },
      "application/jwt": {
        source: "iana",
      },
      "application/kpml-request+xml": {
        source: "iana",
        compressible: true,
      },
      "application/kpml-response+xml": {
        source: "iana",
        compressible: true,
      },
      "application/ld+json": {
        source: "iana",
        compressible: true,
        extensions: ["jsonld"],
      },
      "application/lgr+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lgr"],
      },
      "application/link-format": {
        source: "iana",
      },
      "application/load-control+xml": {
        source: "iana",
        compressible: true,
      },
      "application/lost+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lostxml"],
      },
      "application/lostsync+xml": {
        source: "iana",
        compressible: true,
      },
      "application/lpf+zip": {
        source: "iana",
        compressible: false,
      },
      "application/lxf": {
        source: "iana",
      },
      "application/mac-binhex40": {
        source: "iana",
        extensions: ["hqx"],
      },
      "application/mac-compactpro": {
        source: "apache",
        extensions: ["cpt"],
      },
      "application/macwriteii": {
        source: "iana",
      },
      "application/mads+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mads"],
      },
      "application/manifest+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["webmanifest"],
      },
      "application/marc": {
        source: "iana",
        extensions: ["mrc"],
      },
      "application/marcxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mrcx"],
      },
      "application/mathematica": {
        source: "iana",
        extensions: ["ma", "nb", "mb"],
      },
      "application/mathml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mathml"],
      },
      "application/mathml-content+xml": {
        source: "iana",
        compressible: true,
      },
      "application/mathml-presentation+xml": {
        source: "iana",
        compressible: true,
      },
      "application/mbms-associated-procedure-description+xml": {
        source: "iana",
        compressible: true,
      },
      "application/mbms-deregister+xml": {
        source: "iana",
        compressible: true,
      },
      "application/mbms-envelope+xml": {
        source: "iana",
        compressible: true,
      },
      "application/mbms-msk+xml": {
        source: "iana",
        compressible: true,
      },
      "application/mbms-msk-response+xml": {
        source: "iana",
        compressible: true,
      },
      "application/mbms-protection-description+xml": {
        source: "iana",
        compressible: true,
      },
      "application/mbms-reception-report+xml": {
        source: "iana",
        compressible: true,
      },
      "application/mbms-register+xml": {
        source: "iana",
        compressible: true,
      },
      "application/mbms-register-response+xml": {
        source: "iana",
        compressible: true,
      },
      "application/mbms-schedule+xml": {
        source: "iana",
        compressible: true,
      },
      "application/mbms-user-service-description+xml": {
        source: "iana",
        compressible: true,
      },
      "application/mbox": {
        source: "iana",
        extensions: ["mbox"],
      },
      "application/media-policy-dataset+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpf"],
      },
      "application/media_control+xml": {
        source: "iana",
        compressible: true,
      },
      "application/mediaservercontrol+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mscml"],
      },
      "application/merge-patch+json": {
        source: "iana",
        compressible: true,
      },
      "application/metalink+xml": {
        source: "apache",
        compressible: true,
        extensions: ["metalink"],
      },
      "application/metalink4+xml": {
        source: "iana",
        compressible: true,
        extensions: ["meta4"],
      },
      "application/mets+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mets"],
      },
      "application/mf4": {
        source: "iana",
      },
      "application/mikey": {
        source: "iana",
      },
      "application/mipc": {
        source: "iana",
      },
      "application/missing-blocks+cbor-seq": {
        source: "iana",
      },
      "application/mmt-aei+xml": {
        source: "iana",
        compressible: true,
        extensions: ["maei"],
      },
      "application/mmt-usd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["musd"],
      },
      "application/mods+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mods"],
      },
      "application/moss-keys": {
        source: "iana",
      },
      "application/moss-signature": {
        source: "iana",
      },
      "application/mosskey-data": {
        source: "iana",
      },
      "application/mosskey-request": {
        source: "iana",
      },
      "application/mp21": {
        source: "iana",
        extensions: ["m21", "mp21"],
      },
      "application/mp4": {
        source: "iana",
        extensions: ["mp4s", "m4p"],
      },
      "application/mpeg4-generic": {
        source: "iana",
      },
      "application/mpeg4-iod": {
        source: "iana",
      },
      "application/mpeg4-iod-xmt": {
        source: "iana",
      },
      "application/mrb-consumer+xml": {
        source: "iana",
        compressible: true,
      },
      "application/mrb-publish+xml": {
        source: "iana",
        compressible: true,
      },
      "application/msc-ivr+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
      },
      "application/msc-mixer+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
      },
      "application/msword": {
        source: "iana",
        compressible: false,
        extensions: ["doc", "dot"],
      },
      "application/mud+json": {
        source: "iana",
        compressible: true,
      },
      "application/multipart-core": {
        source: "iana",
      },
      "application/mxf": {
        source: "iana",
        extensions: ["mxf"],
      },
      "application/n-quads": {
        source: "iana",
        extensions: ["nq"],
      },
      "application/n-triples": {
        source: "iana",
        extensions: ["nt"],
      },
      "application/nasdata": {
        source: "iana",
      },
      "application/news-checkgroups": {
        source: "iana",
        charset: "US-ASCII",
      },
      "application/news-groupinfo": {
        source: "iana",
        charset: "US-ASCII",
      },
      "application/news-transmission": {
        source: "iana",
      },
      "application/nlsml+xml": {
        source: "iana",
        compressible: true,
      },
      "application/node": {
        source: "iana",
        extensions: ["cjs"],
      },
      "application/nss": {
        source: "iana",
      },
      "application/oauth-authz-req+jwt": {
        source: "iana",
      },
      "application/oblivious-dns-message": {
        source: "iana",
      },
      "application/ocsp-request": {
        source: "iana",
      },
      "application/ocsp-response": {
        source: "iana",
      },
      "application/octet-stream": {
        source: "iana",
        compressible: false,
        extensions: [
          "bin",
          "dms",
          "lrf",
          "mar",
          "so",
          "dist",
          "distz",
          "pkg",
          "bpk",
          "dump",
          "elc",
          "deploy",
          "exe",
          "dll",
          "deb",
          "dmg",
          "iso",
          "img",
          "msi",
          "msp",
          "msm",
          "buffer",
        ],
      },
      "application/oda": {
        source: "iana",
        extensions: ["oda"],
      },
      "application/odm+xml": {
        source: "iana",
        compressible: true,
      },
      "application/odx": {
        source: "iana",
      },
      "application/oebps-package+xml": {
        source: "iana",
        compressible: true,
        extensions: ["opf"],
      },
      "application/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["ogx"],
      },
      "application/omdoc+xml": {
        source: "apache",
        compressible: true,
        extensions: ["omdoc"],
      },
      "application/onenote": {
        source: "apache",
        extensions: ["onetoc", "onetoc2", "onetmp", "onepkg"],
      },
      "application/opc-nodeset+xml": {
        source: "iana",
        compressible: true,
      },
      "application/oscore": {
        source: "iana",
      },
      "application/oxps": {
        source: "iana",
        extensions: ["oxps"],
      },
      "application/p21": {
        source: "iana",
      },
      "application/p21+zip": {
        source: "iana",
        compressible: false,
      },
      "application/p2p-overlay+xml": {
        source: "iana",
        compressible: true,
        extensions: ["relo"],
      },
      "application/parityfec": {
        source: "iana",
      },
      "application/passport": {
        source: "iana",
      },
      "application/patch-ops-error+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xer"],
      },
      "application/pdf": {
        source: "iana",
        compressible: false,
        extensions: ["pdf"],
      },
      "application/pdx": {
        source: "iana",
      },
      "application/pem-certificate-chain": {
        source: "iana",
      },
      "application/pgp-encrypted": {
        source: "iana",
        compressible: false,
        extensions: ["pgp"],
      },
      "application/pgp-keys": {
        source: "iana",
        extensions: ["asc"],
      },
      "application/pgp-signature": {
        source: "iana",
        extensions: ["asc", "sig"],
      },
      "application/pics-rules": {
        source: "apache",
        extensions: ["prf"],
      },
      "application/pidf+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
      },
      "application/pidf-diff+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
      },
      "application/pkcs10": {
        source: "iana",
        extensions: ["p10"],
      },
      "application/pkcs12": {
        source: "iana",
      },
      "application/pkcs7-mime": {
        source: "iana",
        extensions: ["p7m", "p7c"],
      },
      "application/pkcs7-signature": {
        source: "iana",
        extensions: ["p7s"],
      },
      "application/pkcs8": {
        source: "iana",
        extensions: ["p8"],
      },
      "application/pkcs8-encrypted": {
        source: "iana",
      },
      "application/pkix-attr-cert": {
        source: "iana",
        extensions: ["ac"],
      },
      "application/pkix-cert": {
        source: "iana",
        extensions: ["cer"],
      },
      "application/pkix-crl": {
        source: "iana",
        extensions: ["crl"],
      },
      "application/pkix-pkipath": {
        source: "iana",
        extensions: ["pkipath"],
      },
      "application/pkixcmp": {
        source: "iana",
        extensions: ["pki"],
      },
      "application/pls+xml": {
        source: "iana",
        compressible: true,
        extensions: ["pls"],
      },
      "application/poc-settings+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
      },
      "application/postscript": {
        source: "iana",
        compressible: true,
        extensions: ["ai", "eps", "ps"],
      },
      "application/ppsp-tracker+json": {
        source: "iana",
        compressible: true,
      },
      "application/problem+json": {
        source: "iana",
        compressible: true,
      },
      "application/problem+xml": {
        source: "iana",
        compressible: true,
      },
      "application/provenance+xml": {
        source: "iana",
        compressible: true,
        extensions: ["provx"],
      },
      "application/prs.alvestrand.titrax-sheet": {
        source: "iana",
      },
      "application/prs.cww": {
        source: "iana",
        extensions: ["cww"],
      },
      "application/prs.cyn": {
        source: "iana",
        charset: "7-BIT",
      },
      "application/prs.hpub+zip": {
        source: "iana",
        compressible: false,
      },
      "application/prs.nprend": {
        source: "iana",
      },
      "application/prs.plucker": {
        source: "iana",
      },
      "application/prs.rdf-xml-crypt": {
        source: "iana",
      },
      "application/prs.xsf+xml": {
        source: "iana",
        compressible: true,
      },
      "application/pskc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["pskcxml"],
      },
      "application/pvd+json": {
        source: "iana",
        compressible: true,
      },
      "application/qsig": {
        source: "iana",
      },
      "application/raml+yaml": {
        compressible: true,
        extensions: ["raml"],
      },
      "application/raptorfec": {
        source: "iana",
      },
      "application/rdap+json": {
        source: "iana",
        compressible: true,
      },
      "application/rdf+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rdf", "owl"],
      },
      "application/reginfo+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rif"],
      },
      "application/relax-ng-compact-syntax": {
        source: "iana",
        extensions: ["rnc"],
      },
      "application/remote-printing": {
        source: "iana",
      },
      "application/reputon+json": {
        source: "iana",
        compressible: true,
      },
      "application/resource-lists+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rl"],
      },
      "application/resource-lists-diff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rld"],
      },
      "application/rfc+xml": {
        source: "iana",
        compressible: true,
      },
      "application/riscos": {
        source: "iana",
      },
      "application/rlmi+xml": {
        source: "iana",
        compressible: true,
      },
      "application/rls-services+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rs"],
      },
      "application/route-apd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rapd"],
      },
      "application/route-s-tsid+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sls"],
      },
      "application/route-usd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rusd"],
      },
      "application/rpki-ghostbusters": {
        source: "iana",
        extensions: ["gbr"],
      },
      "application/rpki-manifest": {
        source: "iana",
        extensions: ["mft"],
      },
      "application/rpki-publication": {
        source: "iana",
      },
      "application/rpki-roa": {
        source: "iana",
        extensions: ["roa"],
      },
      "application/rpki-updown": {
        source: "iana",
      },
      "application/rsd+xml": {
        source: "apache",
        compressible: true,
        extensions: ["rsd"],
      },
      "application/rss+xml": {
        source: "apache",
        compressible: true,
        extensions: ["rss"],
      },
      "application/rtf": {
        source: "iana",
        compressible: true,
        extensions: ["rtf"],
      },
      "application/rtploopback": {
        source: "iana",
      },
      "application/rtx": {
        source: "iana",
      },
      "application/samlassertion+xml": {
        source: "iana",
        compressible: true,
      },
      "application/samlmetadata+xml": {
        source: "iana",
        compressible: true,
      },
      "application/sarif+json": {
        source: "iana",
        compressible: true,
      },
      "application/sarif-external-properties+json": {
        source: "iana",
        compressible: true,
      },
      "application/sbe": {
        source: "iana",
      },
      "application/sbml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sbml"],
      },
      "application/scaip+xml": {
        source: "iana",
        compressible: true,
      },
      "application/scim+json": {
        source: "iana",
        compressible: true,
      },
      "application/scvp-cv-request": {
        source: "iana",
        extensions: ["scq"],
      },
      "application/scvp-cv-response": {
        source: "iana",
        extensions: ["scs"],
      },
      "application/scvp-vp-request": {
        source: "iana",
        extensions: ["spq"],
      },
      "application/scvp-vp-response": {
        source: "iana",
        extensions: ["spp"],
      },
      "application/sdp": {
        source: "iana",
        extensions: ["sdp"],
      },
      "application/secevent+jwt": {
        source: "iana",
      },
      "application/senml+cbor": {
        source: "iana",
      },
      "application/senml+json": {
        source: "iana",
        compressible: true,
      },
      "application/senml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["senmlx"],
      },
      "application/senml-etch+cbor": {
        source: "iana",
      },
      "application/senml-etch+json": {
        source: "iana",
        compressible: true,
      },
      "application/senml-exi": {
        source: "iana",
      },
      "application/sensml+cbor": {
        source: "iana",
      },
      "application/sensml+json": {
        source: "iana",
        compressible: true,
      },
      "application/sensml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sensmlx"],
      },
      "application/sensml-exi": {
        source: "iana",
      },
      "application/sep+xml": {
        source: "iana",
        compressible: true,
      },
      "application/sep-exi": {
        source: "iana",
      },
      "application/session-info": {
        source: "iana",
      },
      "application/set-payment": {
        source: "iana",
      },
      "application/set-payment-initiation": {
        source: "iana",
        extensions: ["setpay"],
      },
      "application/set-registration": {
        source: "iana",
      },
      "application/set-registration-initiation": {
        source: "iana",
        extensions: ["setreg"],
      },
      "application/sgml": {
        source: "iana",
      },
      "application/sgml-open-catalog": {
        source: "iana",
      },
      "application/shf+xml": {
        source: "iana",
        compressible: true,
        extensions: ["shf"],
      },
      "application/sieve": {
        source: "iana",
        extensions: ["siv", "sieve"],
      },
      "application/simple-filter+xml": {
        source: "iana",
        compressible: true,
      },
      "application/simple-message-summary": {
        source: "iana",
      },
      "application/simplesymbolcontainer": {
        source: "iana",
      },
      "application/sipc": {
        source: "iana",
      },
      "application/slate": {
        source: "iana",
      },
      "application/smil": {
        source: "iana",
      },
      "application/smil+xml": {
        source: "iana",
        compressible: true,
        extensions: ["smi", "smil"],
      },
      "application/smpte336m": {
        source: "iana",
      },
      "application/soap+fastinfoset": {
        source: "iana",
      },
      "application/soap+xml": {
        source: "iana",
        compressible: true,
      },
      "application/sparql-query": {
        source: "iana",
        extensions: ["rq"],
      },
      "application/sparql-results+xml": {
        source: "iana",
        compressible: true,
        extensions: ["srx"],
      },
      "application/spdx+json": {
        source: "iana",
        compressible: true,
      },
      "application/spirits-event+xml": {
        source: "iana",
        compressible: true,
      },
      "application/sql": {
        source: "iana",
      },
      "application/srgs": {
        source: "iana",
        extensions: ["gram"],
      },
      "application/srgs+xml": {
        source: "iana",
        compressible: true,
        extensions: ["grxml"],
      },
      "application/sru+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sru"],
      },
      "application/ssdl+xml": {
        source: "apache",
        compressible: true,
        extensions: ["ssdl"],
      },
      "application/ssml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ssml"],
      },
      "application/stix+json": {
        source: "iana",
        compressible: true,
      },
      "application/swid+xml": {
        source: "iana",
        compressible: true,
        extensions: ["swidtag"],
      },
      "application/tamp-apex-update": {
        source: "iana",
      },
      "application/tamp-apex-update-confirm": {
        source: "iana",
      },
      "application/tamp-community-update": {
        source: "iana",
      },
      "application/tamp-community-update-confirm": {
        source: "iana",
      },
      "application/tamp-error": {
        source: "iana",
      },
      "application/tamp-sequence-adjust": {
        source: "iana",
      },
      "application/tamp-sequence-adjust-confirm": {
        source: "iana",
      },
      "application/tamp-status-query": {
        source: "iana",
      },
      "application/tamp-status-response": {
        source: "iana",
      },
      "application/tamp-update": {
        source: "iana",
      },
      "application/tamp-update-confirm": {
        source: "iana",
      },
      "application/tar": {
        compressible: true,
      },
      "application/taxii+json": {
        source: "iana",
        compressible: true,
      },
      "application/td+json": {
        source: "iana",
        compressible: true,
      },
      "application/tei+xml": {
        source: "iana",
        compressible: true,
        extensions: ["tei", "teicorpus"],
      },
      "application/tetra_isi": {
        source: "iana",
      },
      "application/thraud+xml": {
        source: "iana",
        compressible: true,
        extensions: ["tfi"],
      },
      "application/timestamp-query": {
        source: "iana",
      },
      "application/timestamp-reply": {
        source: "iana",
      },
      "application/timestamped-data": {
        source: "iana",
        extensions: ["tsd"],
      },
      "application/tlsrpt+gzip": {
        source: "iana",
      },
      "application/tlsrpt+json": {
        source: "iana",
        compressible: true,
      },
      "application/tnauthlist": {
        source: "iana",
      },
      "application/token-introspection+jwt": {
        source: "iana",
      },
      "application/toml": {
        compressible: true,
        extensions: ["toml"],
      },
      "application/trickle-ice-sdpfrag": {
        source: "iana",
      },
      "application/trig": {
        source: "iana",
        extensions: ["trig"],
      },
      "application/ttml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ttml"],
      },
      "application/tve-trigger": {
        source: "iana",
      },
      "application/tzif": {
        source: "iana",
      },
      "application/tzif-leap": {
        source: "iana",
      },
      "application/ubjson": {
        compressible: false,
        extensions: ["ubj"],
      },
      "application/ulpfec": {
        source: "iana",
      },
      "application/urc-grpsheet+xml": {
        source: "iana",
        compressible: true,
      },
      "application/urc-ressheet+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rsheet"],
      },
      "application/urc-targetdesc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["td"],
      },
      "application/urc-uisocketdesc+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vcard+json": {
        source: "iana",
        compressible: true,
      },
      "application/vcard+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vemmi": {
        source: "iana",
      },
      "application/vividence.scriptfile": {
        source: "apache",
      },
      "application/vnd.1000minds.decision-model+xml": {
        source: "iana",
        compressible: true,
        extensions: ["1km"],
      },
      "application/vnd.3gpp-prose+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.3gpp-prose-pc3ch+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.3gpp-v2x-local-service-information": {
        source: "iana",
      },
      "application/vnd.3gpp.5gnas": {
        source: "iana",
      },
      "application/vnd.3gpp.access-transfer-events+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.3gpp.bsf+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.3gpp.gmop+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.3gpp.gtpc": {
        source: "iana",
      },
      "application/vnd.3gpp.interworking-data": {
        source: "iana",
      },
      "application/vnd.3gpp.lpp": {
        source: "iana",
      },
      "application/vnd.3gpp.mc-signalling-ear": {
        source: "iana",
      },
      "application/vnd.3gpp.mcdata-affiliation-command+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.3gpp.mcdata-info+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.3gpp.mcdata-payload": {
        source: "iana",
      },
      "application/vnd.3gpp.mcdata-service-config+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.3gpp.mcdata-signalling": {
        source: "iana",
      },
      "application/vnd.3gpp.mcdata-ue-config+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.3gpp.mcdata-user-profile+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.3gpp.mcptt-affiliation-command+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.3gpp.mcptt-floor-request+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.3gpp.mcptt-info+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.3gpp.mcptt-location-info+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.3gpp.mcptt-service-config+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.3gpp.mcptt-signed+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.3gpp.mcptt-ue-config+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.3gpp.mcptt-ue-init-config+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.3gpp.mcptt-user-profile+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.3gpp.mcvideo-affiliation-command+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.3gpp.mcvideo-affiliation-info+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.3gpp.mcvideo-info+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.3gpp.mcvideo-location-info+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.3gpp.mcvideo-service-config+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.3gpp.mcvideo-transmission-request+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.3gpp.mcvideo-ue-config+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.3gpp.mcvideo-user-profile+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.3gpp.mid-call+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.3gpp.ngap": {
        source: "iana",
      },
      "application/vnd.3gpp.pfcp": {
        source: "iana",
      },
      "application/vnd.3gpp.pic-bw-large": {
        source: "iana",
        extensions: ["plb"],
      },
      "application/vnd.3gpp.pic-bw-small": {
        source: "iana",
        extensions: ["psb"],
      },
      "application/vnd.3gpp.pic-bw-var": {
        source: "iana",
        extensions: ["pvb"],
      },
      "application/vnd.3gpp.s1ap": {
        source: "iana",
      },
      "application/vnd.3gpp.sms": {
        source: "iana",
      },
      "application/vnd.3gpp.sms+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.3gpp.srvcc-ext+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.3gpp.srvcc-info+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.3gpp.state-and-event-info+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.3gpp.ussd+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.3gpp2.bcmcsinfo+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.3gpp2.sms": {
        source: "iana",
      },
      "application/vnd.3gpp2.tcap": {
        source: "iana",
        extensions: ["tcap"],
      },
      "application/vnd.3lightssoftware.imagescal": {
        source: "iana",
      },
      "application/vnd.3m.post-it-notes": {
        source: "iana",
        extensions: ["pwn"],
      },
      "application/vnd.accpac.simply.aso": {
        source: "iana",
        extensions: ["aso"],
      },
      "application/vnd.accpac.simply.imp": {
        source: "iana",
        extensions: ["imp"],
      },
      "application/vnd.acucobol": {
        source: "iana",
        extensions: ["acu"],
      },
      "application/vnd.acucorp": {
        source: "iana",
        extensions: ["atc", "acutc"],
      },
      "application/vnd.adobe.air-application-installer-package+zip": {
        source: "apache",
        compressible: false,
        extensions: ["air"],
      },
      "application/vnd.adobe.flash.movie": {
        source: "iana",
      },
      "application/vnd.adobe.formscentral.fcdt": {
        source: "iana",
        extensions: ["fcdt"],
      },
      "application/vnd.adobe.fxp": {
        source: "iana",
        extensions: ["fxp", "fxpl"],
      },
      "application/vnd.adobe.partial-upload": {
        source: "iana",
      },
      "application/vnd.adobe.xdp+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdp"],
      },
      "application/vnd.adobe.xfdf": {
        source: "iana",
        extensions: ["xfdf"],
      },
      "application/vnd.aether.imp": {
        source: "iana",
      },
      "application/vnd.afpc.afplinedata": {
        source: "iana",
      },
      "application/vnd.afpc.afplinedata-pagedef": {
        source: "iana",
      },
      "application/vnd.afpc.cmoca-cmresource": {
        source: "iana",
      },
      "application/vnd.afpc.foca-charset": {
        source: "iana",
      },
      "application/vnd.afpc.foca-codedfont": {
        source: "iana",
      },
      "application/vnd.afpc.foca-codepage": {
        source: "iana",
      },
      "application/vnd.afpc.modca": {
        source: "iana",
      },
      "application/vnd.afpc.modca-cmtable": {
        source: "iana",
      },
      "application/vnd.afpc.modca-formdef": {
        source: "iana",
      },
      "application/vnd.afpc.modca-mediummap": {
        source: "iana",
      },
      "application/vnd.afpc.modca-objectcontainer": {
        source: "iana",
      },
      "application/vnd.afpc.modca-overlay": {
        source: "iana",
      },
      "application/vnd.afpc.modca-pagesegment": {
        source: "iana",
      },
      "application/vnd.age": {
        source: "iana",
        extensions: ["age"],
      },
      "application/vnd.ah-barcode": {
        source: "iana",
      },
      "application/vnd.ahead.space": {
        source: "iana",
        extensions: ["ahead"],
      },
      "application/vnd.airzip.filesecure.azf": {
        source: "iana",
        extensions: ["azf"],
      },
      "application/vnd.airzip.filesecure.azs": {
        source: "iana",
        extensions: ["azs"],
      },
      "application/vnd.amadeus+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.amazon.ebook": {
        source: "apache",
        extensions: ["azw"],
      },
      "application/vnd.amazon.mobi8-ebook": {
        source: "iana",
      },
      "application/vnd.americandynamics.acc": {
        source: "iana",
        extensions: ["acc"],
      },
      "application/vnd.amiga.ami": {
        source: "iana",
        extensions: ["ami"],
      },
      "application/vnd.amundsen.maze+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.android.ota": {
        source: "iana",
      },
      "application/vnd.android.package-archive": {
        source: "apache",
        compressible: false,
        extensions: ["apk"],
      },
      "application/vnd.anki": {
        source: "iana",
      },
      "application/vnd.anser-web-certificate-issue-initiation": {
        source: "iana",
        extensions: ["cii"],
      },
      "application/vnd.anser-web-funds-transfer-initiation": {
        source: "apache",
        extensions: ["fti"],
      },
      "application/vnd.antix.game-component": {
        source: "iana",
        extensions: ["atx"],
      },
      "application/vnd.apache.arrow.file": {
        source: "iana",
      },
      "application/vnd.apache.arrow.stream": {
        source: "iana",
      },
      "application/vnd.apache.thrift.binary": {
        source: "iana",
      },
      "application/vnd.apache.thrift.compact": {
        source: "iana",
      },
      "application/vnd.apache.thrift.json": {
        source: "iana",
      },
      "application/vnd.api+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.aplextor.warrp+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.apothekende.reservation+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.apple.installer+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpkg"],
      },
      "application/vnd.apple.keynote": {
        source: "iana",
        extensions: ["key"],
      },
      "application/vnd.apple.mpegurl": {
        source: "iana",
        extensions: ["m3u8"],
      },
      "application/vnd.apple.numbers": {
        source: "iana",
        extensions: ["numbers"],
      },
      "application/vnd.apple.pages": {
        source: "iana",
        extensions: ["pages"],
      },
      "application/vnd.apple.pkpass": {
        compressible: false,
        extensions: ["pkpass"],
      },
      "application/vnd.arastra.swi": {
        source: "iana",
      },
      "application/vnd.aristanetworks.swi": {
        source: "iana",
        extensions: ["swi"],
      },
      "application/vnd.artisan+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.artsquare": {
        source: "iana",
      },
      "application/vnd.astraea-software.iota": {
        source: "iana",
        extensions: ["iota"],
      },
      "application/vnd.audiograph": {
        source: "iana",
        extensions: ["aep"],
      },
      "application/vnd.autopackage": {
        source: "iana",
      },
      "application/vnd.avalon+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.avistar+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.balsamiq.bmml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["bmml"],
      },
      "application/vnd.balsamiq.bmpr": {
        source: "iana",
      },
      "application/vnd.banana-accounting": {
        source: "iana",
      },
      "application/vnd.bbf.usp.error": {
        source: "iana",
      },
      "application/vnd.bbf.usp.msg": {
        source: "iana",
      },
      "application/vnd.bbf.usp.msg+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.bekitzur-stech+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.bint.med-content": {
        source: "iana",
      },
      "application/vnd.biopax.rdf+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.blink-idb-value-wrapper": {
        source: "iana",
      },
      "application/vnd.blueice.multipass": {
        source: "iana",
        extensions: ["mpm"],
      },
      "application/vnd.bluetooth.ep.oob": {
        source: "iana",
      },
      "application/vnd.bluetooth.le.oob": {
        source: "iana",
      },
      "application/vnd.bmi": {
        source: "iana",
        extensions: ["bmi"],
      },
      "application/vnd.bpf": {
        source: "iana",
      },
      "application/vnd.bpf3": {
        source: "iana",
      },
      "application/vnd.businessobjects": {
        source: "iana",
        extensions: ["rep"],
      },
      "application/vnd.byu.uapi+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.cab-jscript": {
        source: "iana",
      },
      "application/vnd.canon-cpdl": {
        source: "iana",
      },
      "application/vnd.canon-lips": {
        source: "iana",
      },
      "application/vnd.capasystems-pg+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.cendio.thinlinc.clientconf": {
        source: "iana",
      },
      "application/vnd.century-systems.tcp_stream": {
        source: "iana",
      },
      "application/vnd.chemdraw+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cdxml"],
      },
      "application/vnd.chess-pgn": {
        source: "iana",
      },
      "application/vnd.chipnuts.karaoke-mmd": {
        source: "iana",
        extensions: ["mmd"],
      },
      "application/vnd.ciedi": {
        source: "iana",
      },
      "application/vnd.cinderella": {
        source: "iana",
        extensions: ["cdy"],
      },
      "application/vnd.cirpack.isdn-ext": {
        source: "iana",
      },
      "application/vnd.citationstyles.style+xml": {
        source: "iana",
        compressible: true,
        extensions: ["csl"],
      },
      "application/vnd.claymore": {
        source: "iana",
        extensions: ["cla"],
      },
      "application/vnd.cloanto.rp9": {
        source: "iana",
        extensions: ["rp9"],
      },
      "application/vnd.clonk.c4group": {
        source: "iana",
        extensions: ["c4g", "c4d", "c4f", "c4p", "c4u"],
      },
      "application/vnd.cluetrust.cartomobile-config": {
        source: "iana",
        extensions: ["c11amc"],
      },
      "application/vnd.cluetrust.cartomobile-config-pkg": {
        source: "iana",
        extensions: ["c11amz"],
      },
      "application/vnd.coffeescript": {
        source: "iana",
      },
      "application/vnd.collabio.xodocuments.document": {
        source: "iana",
      },
      "application/vnd.collabio.xodocuments.document-template": {
        source: "iana",
      },
      "application/vnd.collabio.xodocuments.presentation": {
        source: "iana",
      },
      "application/vnd.collabio.xodocuments.presentation-template": {
        source: "iana",
      },
      "application/vnd.collabio.xodocuments.spreadsheet": {
        source: "iana",
      },
      "application/vnd.collabio.xodocuments.spreadsheet-template": {
        source: "iana",
      },
      "application/vnd.collection+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.collection.doc+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.collection.next+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.comicbook+zip": {
        source: "iana",
        compressible: false,
      },
      "application/vnd.comicbook-rar": {
        source: "iana",
      },
      "application/vnd.commerce-battelle": {
        source: "iana",
      },
      "application/vnd.commonspace": {
        source: "iana",
        extensions: ["csp"],
      },
      "application/vnd.contact.cmsg": {
        source: "iana",
        extensions: ["cdbcmsg"],
      },
      "application/vnd.coreos.ignition+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.cosmocaller": {
        source: "iana",
        extensions: ["cmc"],
      },
      "application/vnd.crick.clicker": {
        source: "iana",
        extensions: ["clkx"],
      },
      "application/vnd.crick.clicker.keyboard": {
        source: "iana",
        extensions: ["clkk"],
      },
      "application/vnd.crick.clicker.palette": {
        source: "iana",
        extensions: ["clkp"],
      },
      "application/vnd.crick.clicker.template": {
        source: "iana",
        extensions: ["clkt"],
      },
      "application/vnd.crick.clicker.wordbank": {
        source: "iana",
        extensions: ["clkw"],
      },
      "application/vnd.criticaltools.wbs+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wbs"],
      },
      "application/vnd.cryptii.pipe+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.crypto-shade-file": {
        source: "iana",
      },
      "application/vnd.cryptomator.encrypted": {
        source: "iana",
      },
      "application/vnd.cryptomator.vault": {
        source: "iana",
      },
      "application/vnd.ctc-posml": {
        source: "iana",
        extensions: ["pml"],
      },
      "application/vnd.ctct.ws+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.cups-pdf": {
        source: "iana",
      },
      "application/vnd.cups-postscript": {
        source: "iana",
      },
      "application/vnd.cups-ppd": {
        source: "iana",
        extensions: ["ppd"],
      },
      "application/vnd.cups-raster": {
        source: "iana",
      },
      "application/vnd.cups-raw": {
        source: "iana",
      },
      "application/vnd.curl": {
        source: "iana",
      },
      "application/vnd.curl.car": {
        source: "apache",
        extensions: ["car"],
      },
      "application/vnd.curl.pcurl": {
        source: "apache",
        extensions: ["pcurl"],
      },
      "application/vnd.cyan.dean.root+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.cybank": {
        source: "iana",
      },
      "application/vnd.cyclonedx+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.cyclonedx+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.d2l.coursepackage1p0+zip": {
        source: "iana",
        compressible: false,
      },
      "application/vnd.d3m-dataset": {
        source: "iana",
      },
      "application/vnd.d3m-problem": {
        source: "iana",
      },
      "application/vnd.dart": {
        source: "iana",
        compressible: true,
        extensions: ["dart"],
      },
      "application/vnd.data-vision.rdz": {
        source: "iana",
        extensions: ["rdz"],
      },
      "application/vnd.datapackage+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.dataresource+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.dbf": {
        source: "iana",
        extensions: ["dbf"],
      },
      "application/vnd.debian.binary-package": {
        source: "iana",
      },
      "application/vnd.dece.data": {
        source: "iana",
        extensions: ["uvf", "uvvf", "uvd", "uvvd"],
      },
      "application/vnd.dece.ttml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["uvt", "uvvt"],
      },
      "application/vnd.dece.unspecified": {
        source: "iana",
        extensions: ["uvx", "uvvx"],
      },
      "application/vnd.dece.zip": {
        source: "iana",
        extensions: ["uvz", "uvvz"],
      },
      "application/vnd.denovo.fcselayout-link": {
        source: "iana",
        extensions: ["fe_launch"],
      },
      "application/vnd.desmume.movie": {
        source: "iana",
      },
      "application/vnd.dir-bi.plate-dl-nosuffix": {
        source: "iana",
      },
      "application/vnd.dm.delegation+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.dna": {
        source: "iana",
        extensions: ["dna"],
      },
      "application/vnd.document+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.dolby.mlp": {
        source: "apache",
        extensions: ["mlp"],
      },
      "application/vnd.dolby.mobile.1": {
        source: "iana",
      },
      "application/vnd.dolby.mobile.2": {
        source: "iana",
      },
      "application/vnd.doremir.scorecloud-binary-document": {
        source: "iana",
      },
      "application/vnd.dpgraph": {
        source: "iana",
        extensions: ["dpg"],
      },
      "application/vnd.dreamfactory": {
        source: "iana",
        extensions: ["dfac"],
      },
      "application/vnd.drive+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.ds-keypoint": {
        source: "apache",
        extensions: ["kpxx"],
      },
      "application/vnd.dtg.local": {
        source: "iana",
      },
      "application/vnd.dtg.local.flash": {
        source: "iana",
      },
      "application/vnd.dtg.local.html": {
        source: "iana",
      },
      "application/vnd.dvb.ait": {
        source: "iana",
        extensions: ["ait"],
      },
      "application/vnd.dvb.dvbisl+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.dvb.dvbj": {
        source: "iana",
      },
      "application/vnd.dvb.esgcontainer": {
        source: "iana",
      },
      "application/vnd.dvb.ipdcdftnotifaccess": {
        source: "iana",
      },
      "application/vnd.dvb.ipdcesgaccess": {
        source: "iana",
      },
      "application/vnd.dvb.ipdcesgaccess2": {
        source: "iana",
      },
      "application/vnd.dvb.ipdcesgpdd": {
        source: "iana",
      },
      "application/vnd.dvb.ipdcroaming": {
        source: "iana",
      },
      "application/vnd.dvb.iptv.alfec-base": {
        source: "iana",
      },
      "application/vnd.dvb.iptv.alfec-enhancement": {
        source: "iana",
      },
      "application/vnd.dvb.notif-aggregate-root+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.dvb.notif-container+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.dvb.notif-generic+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.dvb.notif-ia-msglist+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.dvb.notif-ia-registration-request+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.dvb.notif-ia-registration-response+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.dvb.notif-init+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.dvb.pfr": {
        source: "iana",
      },
      "application/vnd.dvb.service": {
        source: "iana",
        extensions: ["svc"],
      },
      "application/vnd.dxr": {
        source: "iana",
      },
      "application/vnd.dynageo": {
        source: "iana",
        extensions: ["geo"],
      },
      "application/vnd.dzr": {
        source: "iana",
      },
      "application/vnd.easykaraoke.cdgdownload": {
        source: "iana",
      },
      "application/vnd.ecdis-update": {
        source: "iana",
      },
      "application/vnd.ecip.rlp": {
        source: "iana",
      },
      "application/vnd.eclipse.ditto+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.ecowin.chart": {
        source: "iana",
        extensions: ["mag"],
      },
      "application/vnd.ecowin.filerequest": {
        source: "iana",
      },
      "application/vnd.ecowin.fileupdate": {
        source: "iana",
      },
      "application/vnd.ecowin.series": {
        source: "iana",
      },
      "application/vnd.ecowin.seriesrequest": {
        source: "iana",
      },
      "application/vnd.ecowin.seriesupdate": {
        source: "iana",
      },
      "application/vnd.efi.img": {
        source: "iana",
      },
      "application/vnd.efi.iso": {
        source: "iana",
      },
      "application/vnd.emclient.accessrequest+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.enliven": {
        source: "iana",
        extensions: ["nml"],
      },
      "application/vnd.enphase.envoy": {
        source: "iana",
      },
      "application/vnd.eprints.data+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.epson.esf": {
        source: "iana",
        extensions: ["esf"],
      },
      "application/vnd.epson.msf": {
        source: "iana",
        extensions: ["msf"],
      },
      "application/vnd.epson.quickanime": {
        source: "iana",
        extensions: ["qam"],
      },
      "application/vnd.epson.salt": {
        source: "iana",
        extensions: ["slt"],
      },
      "application/vnd.epson.ssf": {
        source: "iana",
        extensions: ["ssf"],
      },
      "application/vnd.ericsson.quickcall": {
        source: "iana",
      },
      "application/vnd.espass-espass+zip": {
        source: "iana",
        compressible: false,
      },
      "application/vnd.eszigno3+xml": {
        source: "iana",
        compressible: true,
        extensions: ["es3", "et3"],
      },
      "application/vnd.etsi.aoc+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.etsi.asic-e+zip": {
        source: "iana",
        compressible: false,
      },
      "application/vnd.etsi.asic-s+zip": {
        source: "iana",
        compressible: false,
      },
      "application/vnd.etsi.cug+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.etsi.iptvcommand+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.etsi.iptvdiscovery+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.etsi.iptvprofile+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.etsi.iptvsad-bc+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.etsi.iptvsad-cod+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.etsi.iptvsad-npvr+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.etsi.iptvservice+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.etsi.iptvsync+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.etsi.iptvueprofile+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.etsi.mcid+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.etsi.mheg5": {
        source: "iana",
      },
      "application/vnd.etsi.overload-control-policy-dataset+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.etsi.pstn+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.etsi.sci+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.etsi.simservs+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.etsi.timestamp-token": {
        source: "iana",
      },
      "application/vnd.etsi.tsl+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.etsi.tsl.der": {
        source: "iana",
      },
      "application/vnd.eu.kasparian.car+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.eudora.data": {
        source: "iana",
      },
      "application/vnd.evolv.ecig.profile": {
        source: "iana",
      },
      "application/vnd.evolv.ecig.settings": {
        source: "iana",
      },
      "application/vnd.evolv.ecig.theme": {
        source: "iana",
      },
      "application/vnd.exstream-empower+zip": {
        source: "iana",
        compressible: false,
      },
      "application/vnd.exstream-package": {
        source: "iana",
      },
      "application/vnd.ezpix-album": {
        source: "iana",
        extensions: ["ez2"],
      },
      "application/vnd.ezpix-package": {
        source: "iana",
        extensions: ["ez3"],
      },
      "application/vnd.f-secure.mobile": {
        source: "iana",
      },
      "application/vnd.familysearch.gedcom+zip": {
        source: "iana",
        compressible: false,
      },
      "application/vnd.fastcopy-disk-image": {
        source: "iana",
      },
      "application/vnd.fdf": {
        source: "iana",
        extensions: ["fdf"],
      },
      "application/vnd.fdsn.mseed": {
        source: "iana",
        extensions: ["mseed"],
      },
      "application/vnd.fdsn.seed": {
        source: "iana",
        extensions: ["seed", "dataless"],
      },
      "application/vnd.ffsns": {
        source: "iana",
      },
      "application/vnd.ficlab.flb+zip": {
        source: "iana",
        compressible: false,
      },
      "application/vnd.filmit.zfc": {
        source: "iana",
      },
      "application/vnd.fints": {
        source: "iana",
      },
      "application/vnd.firemonkeys.cloudcell": {
        source: "iana",
      },
      "application/vnd.flographit": {
        source: "iana",
        extensions: ["gph"],
      },
      "application/vnd.fluxtime.clip": {
        source: "iana",
        extensions: ["ftc"],
      },
      "application/vnd.font-fontforge-sfd": {
        source: "iana",
      },
      "application/vnd.framemaker": {
        source: "iana",
        extensions: ["fm", "frame", "maker", "book"],
      },
      "application/vnd.frogans.fnc": {
        source: "iana",
        extensions: ["fnc"],
      },
      "application/vnd.frogans.ltf": {
        source: "iana",
        extensions: ["ltf"],
      },
      "application/vnd.fsc.weblaunch": {
        source: "iana",
        extensions: ["fsc"],
      },
      "application/vnd.fujifilm.fb.docuworks": {
        source: "iana",
      },
      "application/vnd.fujifilm.fb.docuworks.binder": {
        source: "iana",
      },
      "application/vnd.fujifilm.fb.docuworks.container": {
        source: "iana",
      },
      "application/vnd.fujifilm.fb.jfi+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.fujitsu.oasys": {
        source: "iana",
        extensions: ["oas"],
      },
      "application/vnd.fujitsu.oasys2": {
        source: "iana",
        extensions: ["oa2"],
      },
      "application/vnd.fujitsu.oasys3": {
        source: "iana",
        extensions: ["oa3"],
      },
      "application/vnd.fujitsu.oasysgp": {
        source: "iana",
        extensions: ["fg5"],
      },
      "application/vnd.fujitsu.oasysprs": {
        source: "iana",
        extensions: ["bh2"],
      },
      "application/vnd.fujixerox.art-ex": {
        source: "iana",
      },
      "application/vnd.fujixerox.art4": {
        source: "iana",
      },
      "application/vnd.fujixerox.ddd": {
        source: "iana",
        extensions: ["ddd"],
      },
      "application/vnd.fujixerox.docuworks": {
        source: "iana",
        extensions: ["xdw"],
      },
      "application/vnd.fujixerox.docuworks.binder": {
        source: "iana",
        extensions: ["xbd"],
      },
      "application/vnd.fujixerox.docuworks.container": {
        source: "iana",
      },
      "application/vnd.fujixerox.hbpl": {
        source: "iana",
      },
      "application/vnd.fut-misnet": {
        source: "iana",
      },
      "application/vnd.futoin+cbor": {
        source: "iana",
      },
      "application/vnd.futoin+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.fuzzysheet": {
        source: "iana",
        extensions: ["fzs"],
      },
      "application/vnd.genomatix.tuxedo": {
        source: "iana",
        extensions: ["txd"],
      },
      "application/vnd.gentics.grd+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.geo+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.geocube+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.geogebra.file": {
        source: "iana",
        extensions: ["ggb"],
      },
      "application/vnd.geogebra.slides": {
        source: "iana",
      },
      "application/vnd.geogebra.tool": {
        source: "iana",
        extensions: ["ggt"],
      },
      "application/vnd.geometry-explorer": {
        source: "iana",
        extensions: ["gex", "gre"],
      },
      "application/vnd.geonext": {
        source: "iana",
        extensions: ["gxt"],
      },
      "application/vnd.geoplan": {
        source: "iana",
        extensions: ["g2w"],
      },
      "application/vnd.geospace": {
        source: "iana",
        extensions: ["g3w"],
      },
      "application/vnd.gerber": {
        source: "iana",
      },
      "application/vnd.globalplatform.card-content-mgt": {
        source: "iana",
      },
      "application/vnd.globalplatform.card-content-mgt-response": {
        source: "iana",
      },
      "application/vnd.gmx": {
        source: "iana",
        extensions: ["gmx"],
      },
      "application/vnd.google-apps.document": {
        compressible: false,
        extensions: ["gdoc"],
      },
      "application/vnd.google-apps.presentation": {
        compressible: false,
        extensions: ["gslides"],
      },
      "application/vnd.google-apps.spreadsheet": {
        compressible: false,
        extensions: ["gsheet"],
      },
      "application/vnd.google-earth.kml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["kml"],
      },
      "application/vnd.google-earth.kmz": {
        source: "iana",
        compressible: false,
        extensions: ["kmz"],
      },
      "application/vnd.gov.sk.e-form+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.gov.sk.e-form+zip": {
        source: "iana",
        compressible: false,
      },
      "application/vnd.gov.sk.xmldatacontainer+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.grafeq": {
        source: "iana",
        extensions: ["gqf", "gqs"],
      },
      "application/vnd.gridmp": {
        source: "iana",
      },
      "application/vnd.groove-account": {
        source: "iana",
        extensions: ["gac"],
      },
      "application/vnd.groove-help": {
        source: "iana",
        extensions: ["ghf"],
      },
      "application/vnd.groove-identity-message": {
        source: "iana",
        extensions: ["gim"],
      },
      "application/vnd.groove-injector": {
        source: "iana",
        extensions: ["grv"],
      },
      "application/vnd.groove-tool-message": {
        source: "iana",
        extensions: ["gtm"],
      },
      "application/vnd.groove-tool-template": {
        source: "iana",
        extensions: ["tpl"],
      },
      "application/vnd.groove-vcard": {
        source: "iana",
        extensions: ["vcg"],
      },
      "application/vnd.hal+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.hal+xml": {
        source: "iana",
        compressible: true,
        extensions: ["hal"],
      },
      "application/vnd.handheld-entertainment+xml": {
        source: "iana",
        compressible: true,
        extensions: ["zmm"],
      },
      "application/vnd.hbci": {
        source: "iana",
        extensions: ["hbci"],
      },
      "application/vnd.hc+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.hcl-bireports": {
        source: "iana",
      },
      "application/vnd.hdt": {
        source: "iana",
      },
      "application/vnd.heroku+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.hhe.lesson-player": {
        source: "iana",
        extensions: ["les"],
      },
      "application/vnd.hl7cda+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
      },
      "application/vnd.hl7v2+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
      },
      "application/vnd.hp-hpgl": {
        source: "iana",
        extensions: ["hpgl"],
      },
      "application/vnd.hp-hpid": {
        source: "iana",
        extensions: ["hpid"],
      },
      "application/vnd.hp-hps": {
        source: "iana",
        extensions: ["hps"],
      },
      "application/vnd.hp-jlyt": {
        source: "iana",
        extensions: ["jlt"],
      },
      "application/vnd.hp-pcl": {
        source: "iana",
        extensions: ["pcl"],
      },
      "application/vnd.hp-pclxl": {
        source: "iana",
        extensions: ["pclxl"],
      },
      "application/vnd.httphone": {
        source: "iana",
      },
      "application/vnd.hydrostatix.sof-data": {
        source: "iana",
        extensions: ["sfd-hdstx"],
      },
      "application/vnd.hyper+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.hyper-item+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.hyperdrive+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.hzn-3d-crossword": {
        source: "iana",
      },
      "application/vnd.ibm.afplinedata": {
        source: "iana",
      },
      "application/vnd.ibm.electronic-media": {
        source: "iana",
      },
      "application/vnd.ibm.minipay": {
        source: "iana",
        extensions: ["mpy"],
      },
      "application/vnd.ibm.modcap": {
        source: "iana",
        extensions: ["afp", "listafp", "list3820"],
      },
      "application/vnd.ibm.rights-management": {
        source: "iana",
        extensions: ["irm"],
      },
      "application/vnd.ibm.secure-container": {
        source: "iana",
        extensions: ["sc"],
      },
      "application/vnd.iccprofile": {
        source: "iana",
        extensions: ["icc", "icm"],
      },
      "application/vnd.ieee.1905": {
        source: "iana",
      },
      "application/vnd.igloader": {
        source: "iana",
        extensions: ["igl"],
      },
      "application/vnd.imagemeter.folder+zip": {
        source: "iana",
        compressible: false,
      },
      "application/vnd.imagemeter.image+zip": {
        source: "iana",
        compressible: false,
      },
      "application/vnd.immervision-ivp": {
        source: "iana",
        extensions: ["ivp"],
      },
      "application/vnd.immervision-ivu": {
        source: "iana",
        extensions: ["ivu"],
      },
      "application/vnd.ims.imsccv1p1": {
        source: "iana",
      },
      "application/vnd.ims.imsccv1p2": {
        source: "iana",
      },
      "application/vnd.ims.imsccv1p3": {
        source: "iana",
      },
      "application/vnd.ims.lis.v2.result+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.ims.lti.v2.toolconsumerprofile+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.ims.lti.v2.toolproxy+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.ims.lti.v2.toolproxy.id+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.ims.lti.v2.toolsettings+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.ims.lti.v2.toolsettings.simple+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.informedcontrol.rms+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.informix-visionary": {
        source: "iana",
      },
      "application/vnd.infotech.project": {
        source: "iana",
      },
      "application/vnd.infotech.project+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.innopath.wamp.notification": {
        source: "iana",
      },
      "application/vnd.insors.igm": {
        source: "iana",
        extensions: ["igm"],
      },
      "application/vnd.intercon.formnet": {
        source: "iana",
        extensions: ["xpw", "xpx"],
      },
      "application/vnd.intergeo": {
        source: "iana",
        extensions: ["i2g"],
      },
      "application/vnd.intertrust.digibox": {
        source: "iana",
      },
      "application/vnd.intertrust.nncp": {
        source: "iana",
      },
      "application/vnd.intu.qbo": {
        source: "iana",
        extensions: ["qbo"],
      },
      "application/vnd.intu.qfx": {
        source: "iana",
        extensions: ["qfx"],
      },
      "application/vnd.iptc.g2.catalogitem+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.iptc.g2.conceptitem+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.iptc.g2.knowledgeitem+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.iptc.g2.newsitem+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.iptc.g2.newsmessage+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.iptc.g2.packageitem+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.iptc.g2.planningitem+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.ipunplugged.rcprofile": {
        source: "iana",
        extensions: ["rcprofile"],
      },
      "application/vnd.irepository.package+xml": {
        source: "iana",
        compressible: true,
        extensions: ["irp"],
      },
      "application/vnd.is-xpr": {
        source: "iana",
        extensions: ["xpr"],
      },
      "application/vnd.isac.fcs": {
        source: "iana",
        extensions: ["fcs"],
      },
      "application/vnd.iso11783-10+zip": {
        source: "iana",
        compressible: false,
      },
      "application/vnd.jam": {
        source: "iana",
        extensions: ["jam"],
      },
      "application/vnd.japannet-directory-service": {
        source: "iana",
      },
      "application/vnd.japannet-jpnstore-wakeup": {
        source: "iana",
      },
      "application/vnd.japannet-payment-wakeup": {
        source: "iana",
      },
      "application/vnd.japannet-registration": {
        source: "iana",
      },
      "application/vnd.japannet-registration-wakeup": {
        source: "iana",
      },
      "application/vnd.japannet-setstore-wakeup": {
        source: "iana",
      },
      "application/vnd.japannet-verification": {
        source: "iana",
      },
      "application/vnd.japannet-verification-wakeup": {
        source: "iana",
      },
      "application/vnd.jcp.javame.midlet-rms": {
        source: "iana",
        extensions: ["rms"],
      },
      "application/vnd.jisp": {
        source: "iana",
        extensions: ["jisp"],
      },
      "application/vnd.joost.joda-archive": {
        source: "iana",
        extensions: ["joda"],
      },
      "application/vnd.jsk.isdn-ngn": {
        source: "iana",
      },
      "application/vnd.kahootz": {
        source: "iana",
        extensions: ["ktz", "ktr"],
      },
      "application/vnd.kde.karbon": {
        source: "iana",
        extensions: ["karbon"],
      },
      "application/vnd.kde.kchart": {
        source: "iana",
        extensions: ["chrt"],
      },
      "application/vnd.kde.kformula": {
        source: "iana",
        extensions: ["kfo"],
      },
      "application/vnd.kde.kivio": {
        source: "iana",
        extensions: ["flw"],
      },
      "application/vnd.kde.kontour": {
        source: "iana",
        extensions: ["kon"],
      },
      "application/vnd.kde.kpresenter": {
        source: "iana",
        extensions: ["kpr", "kpt"],
      },
      "application/vnd.kde.kspread": {
        source: "iana",
        extensions: ["ksp"],
      },
      "application/vnd.kde.kword": {
        source: "iana",
        extensions: ["kwd", "kwt"],
      },
      "application/vnd.kenameaapp": {
        source: "iana",
        extensions: ["htke"],
      },
      "application/vnd.kidspiration": {
        source: "iana",
        extensions: ["kia"],
      },
      "application/vnd.kinar": {
        source: "iana",
        extensions: ["kne", "knp"],
      },
      "application/vnd.koan": {
        source: "iana",
        extensions: ["skp", "skd", "skt", "skm"],
      },
      "application/vnd.kodak-descriptor": {
        source: "iana",
        extensions: ["sse"],
      },
      "application/vnd.las": {
        source: "iana",
      },
      "application/vnd.las.las+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.las.las+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lasxml"],
      },
      "application/vnd.laszip": {
        source: "iana",
      },
      "application/vnd.leap+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.liberty-request+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.llamagraphics.life-balance.desktop": {
        source: "iana",
        extensions: ["lbd"],
      },
      "application/vnd.llamagraphics.life-balance.exchange+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lbe"],
      },
      "application/vnd.logipipe.circuit+zip": {
        source: "iana",
        compressible: false,
      },
      "application/vnd.loom": {
        source: "iana",
      },
      "application/vnd.lotus-1-2-3": {
        source: "iana",
        extensions: ["123"],
      },
      "application/vnd.lotus-approach": {
        source: "iana",
        extensions: ["apr"],
      },
      "application/vnd.lotus-freelance": {
        source: "iana",
        extensions: ["pre"],
      },
      "application/vnd.lotus-notes": {
        source: "iana",
        extensions: ["nsf"],
      },
      "application/vnd.lotus-organizer": {
        source: "iana",
        extensions: ["org"],
      },
      "application/vnd.lotus-screencam": {
        source: "iana",
        extensions: ["scm"],
      },
      "application/vnd.lotus-wordpro": {
        source: "iana",
        extensions: ["lwp"],
      },
      "application/vnd.macports.portpkg": {
        source: "iana",
        extensions: ["portpkg"],
      },
      "application/vnd.mapbox-vector-tile": {
        source: "iana",
        extensions: ["mvt"],
      },
      "application/vnd.marlin.drm.actiontoken+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.marlin.drm.conftoken+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.marlin.drm.license+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.marlin.drm.mdcf": {
        source: "iana",
      },
      "application/vnd.mason+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.maxar.archive.3tz+zip": {
        source: "iana",
        compressible: false,
      },
      "application/vnd.maxmind.maxmind-db": {
        source: "iana",
      },
      "application/vnd.mcd": {
        source: "iana",
        extensions: ["mcd"],
      },
      "application/vnd.medcalcdata": {
        source: "iana",
        extensions: ["mc1"],
      },
      "application/vnd.mediastation.cdkey": {
        source: "iana",
        extensions: ["cdkey"],
      },
      "application/vnd.meridian-slingshot": {
        source: "iana",
      },
      "application/vnd.mfer": {
        source: "iana",
        extensions: ["mwf"],
      },
      "application/vnd.mfmp": {
        source: "iana",
        extensions: ["mfm"],
      },
      "application/vnd.micro+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.micrografx.flo": {
        source: "iana",
        extensions: ["flo"],
      },
      "application/vnd.micrografx.igx": {
        source: "iana",
        extensions: ["igx"],
      },
      "application/vnd.microsoft.portable-executable": {
        source: "iana",
      },
      "application/vnd.microsoft.windows.thumbnail-cache": {
        source: "iana",
      },
      "application/vnd.miele+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.mif": {
        source: "iana",
        extensions: ["mif"],
      },
      "application/vnd.minisoft-hp3000-save": {
        source: "iana",
      },
      "application/vnd.mitsubishi.misty-guard.trustweb": {
        source: "iana",
      },
      "application/vnd.mobius.daf": {
        source: "iana",
        extensions: ["daf"],
      },
      "application/vnd.mobius.dis": {
        source: "iana",
        extensions: ["dis"],
      },
      "application/vnd.mobius.mbk": {
        source: "iana",
        extensions: ["mbk"],
      },
      "application/vnd.mobius.mqy": {
        source: "iana",
        extensions: ["mqy"],
      },
      "application/vnd.mobius.msl": {
        source: "iana",
        extensions: ["msl"],
      },
      "application/vnd.mobius.plc": {
        source: "iana",
        extensions: ["plc"],
      },
      "application/vnd.mobius.txf": {
        source: "iana",
        extensions: ["txf"],
      },
      "application/vnd.mophun.application": {
        source: "iana",
        extensions: ["mpn"],
      },
      "application/vnd.mophun.certificate": {
        source: "iana",
        extensions: ["mpc"],
      },
      "application/vnd.motorola.flexsuite": {
        source: "iana",
      },
      "application/vnd.motorola.flexsuite.adsi": {
        source: "iana",
      },
      "application/vnd.motorola.flexsuite.fis": {
        source: "iana",
      },
      "application/vnd.motorola.flexsuite.gotap": {
        source: "iana",
      },
      "application/vnd.motorola.flexsuite.kmr": {
        source: "iana",
      },
      "application/vnd.motorola.flexsuite.ttc": {
        source: "iana",
      },
      "application/vnd.motorola.flexsuite.wem": {
        source: "iana",
      },
      "application/vnd.motorola.iprm": {
        source: "iana",
      },
      "application/vnd.mozilla.xul+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xul"],
      },
      "application/vnd.ms-3mfdocument": {
        source: "iana",
      },
      "application/vnd.ms-artgalry": {
        source: "iana",
        extensions: ["cil"],
      },
      "application/vnd.ms-asf": {
        source: "iana",
      },
      "application/vnd.ms-cab-compressed": {
        source: "iana",
        extensions: ["cab"],
      },
      "application/vnd.ms-color.iccprofile": {
        source: "apache",
      },
      "application/vnd.ms-excel": {
        source: "iana",
        compressible: false,
        extensions: ["xls", "xlm", "xla", "xlc", "xlt", "xlw"],
      },
      "application/vnd.ms-excel.addin.macroenabled.12": {
        source: "iana",
        extensions: ["xlam"],
      },
      "application/vnd.ms-excel.sheet.binary.macroenabled.12": {
        source: "iana",
        extensions: ["xlsb"],
      },
      "application/vnd.ms-excel.sheet.macroenabled.12": {
        source: "iana",
        extensions: ["xlsm"],
      },
      "application/vnd.ms-excel.template.macroenabled.12": {
        source: "iana",
        extensions: ["xltm"],
      },
      "application/vnd.ms-fontobject": {
        source: "iana",
        compressible: true,
        extensions: ["eot"],
      },
      "application/vnd.ms-htmlhelp": {
        source: "iana",
        extensions: ["chm"],
      },
      "application/vnd.ms-ims": {
        source: "iana",
        extensions: ["ims"],
      },
      "application/vnd.ms-lrm": {
        source: "iana",
        extensions: ["lrm"],
      },
      "application/vnd.ms-office.activex+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.ms-officetheme": {
        source: "iana",
        extensions: ["thmx"],
      },
      "application/vnd.ms-opentype": {
        source: "apache",
        compressible: true,
      },
      "application/vnd.ms-outlook": {
        compressible: false,
        extensions: ["msg"],
      },
      "application/vnd.ms-package.obfuscated-opentype": {
        source: "apache",
      },
      "application/vnd.ms-pki.seccat": {
        source: "apache",
        extensions: ["cat"],
      },
      "application/vnd.ms-pki.stl": {
        source: "apache",
        extensions: ["stl"],
      },
      "application/vnd.ms-playready.initiator+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.ms-powerpoint": {
        source: "iana",
        compressible: false,
        extensions: ["ppt", "pps", "pot"],
      },
      "application/vnd.ms-powerpoint.addin.macroenabled.12": {
        source: "iana",
        extensions: ["ppam"],
      },
      "application/vnd.ms-powerpoint.presentation.macroenabled.12": {
        source: "iana",
        extensions: ["pptm"],
      },
      "application/vnd.ms-powerpoint.slide.macroenabled.12": {
        source: "iana",
        extensions: ["sldm"],
      },
      "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
        source: "iana",
        extensions: ["ppsm"],
      },
      "application/vnd.ms-powerpoint.template.macroenabled.12": {
        source: "iana",
        extensions: ["potm"],
      },
      "application/vnd.ms-printdevicecapabilities+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.ms-printing.printticket+xml": {
        source: "apache",
        compressible: true,
      },
      "application/vnd.ms-printschematicket+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.ms-project": {
        source: "iana",
        extensions: ["mpp", "mpt"],
      },
      "application/vnd.ms-tnef": {
        source: "iana",
      },
      "application/vnd.ms-windows.devicepairing": {
        source: "iana",
      },
      "application/vnd.ms-windows.nwprinting.oob": {
        source: "iana",
      },
      "application/vnd.ms-windows.printerpairing": {
        source: "iana",
      },
      "application/vnd.ms-windows.wsd.oob": {
        source: "iana",
      },
      "application/vnd.ms-wmdrm.lic-chlg-req": {
        source: "iana",
      },
      "application/vnd.ms-wmdrm.lic-resp": {
        source: "iana",
      },
      "application/vnd.ms-wmdrm.meter-chlg-req": {
        source: "iana",
      },
      "application/vnd.ms-wmdrm.meter-resp": {
        source: "iana",
      },
      "application/vnd.ms-word.document.macroenabled.12": {
        source: "iana",
        extensions: ["docm"],
      },
      "application/vnd.ms-word.template.macroenabled.12": {
        source: "iana",
        extensions: ["dotm"],
      },
      "application/vnd.ms-works": {
        source: "iana",
        extensions: ["wps", "wks", "wcm", "wdb"],
      },
      "application/vnd.ms-wpl": {
        source: "iana",
        extensions: ["wpl"],
      },
      "application/vnd.ms-xpsdocument": {
        source: "iana",
        compressible: false,
        extensions: ["xps"],
      },
      "application/vnd.msa-disk-image": {
        source: "iana",
      },
      "application/vnd.mseq": {
        source: "iana",
        extensions: ["mseq"],
      },
      "application/vnd.msign": {
        source: "iana",
      },
      "application/vnd.multiad.creator": {
        source: "iana",
      },
      "application/vnd.multiad.creator.cif": {
        source: "iana",
      },
      "application/vnd.music-niff": {
        source: "iana",
      },
      "application/vnd.musician": {
        source: "iana",
        extensions: ["mus"],
      },
      "application/vnd.muvee.style": {
        source: "iana",
        extensions: ["msty"],
      },
      "application/vnd.mynfc": {
        source: "iana",
        extensions: ["taglet"],
      },
      "application/vnd.nacamar.ybrid+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.ncd.control": {
        source: "iana",
      },
      "application/vnd.ncd.reference": {
        source: "iana",
      },
      "application/vnd.nearst.inv+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.nebumind.line": {
        source: "iana",
      },
      "application/vnd.nervana": {
        source: "iana",
      },
      "application/vnd.netfpx": {
        source: "iana",
      },
      "application/vnd.neurolanguage.nlu": {
        source: "iana",
        extensions: ["nlu"],
      },
      "application/vnd.nimn": {
        source: "iana",
      },
      "application/vnd.nintendo.nitro.rom": {
        source: "iana",
      },
      "application/vnd.nintendo.snes.rom": {
        source: "iana",
      },
      "application/vnd.nitf": {
        source: "iana",
        extensions: ["ntf", "nitf"],
      },
      "application/vnd.noblenet-directory": {
        source: "iana",
        extensions: ["nnd"],
      },
      "application/vnd.noblenet-sealer": {
        source: "iana",
        extensions: ["nns"],
      },
      "application/vnd.noblenet-web": {
        source: "iana",
        extensions: ["nnw"],
      },
      "application/vnd.nokia.catalogs": {
        source: "iana",
      },
      "application/vnd.nokia.conml+wbxml": {
        source: "iana",
      },
      "application/vnd.nokia.conml+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.nokia.iptv.config+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.nokia.isds-radio-presets": {
        source: "iana",
      },
      "application/vnd.nokia.landmark+wbxml": {
        source: "iana",
      },
      "application/vnd.nokia.landmark+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.nokia.landmarkcollection+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.nokia.n-gage.ac+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ac"],
      },
      "application/vnd.nokia.n-gage.data": {
        source: "iana",
        extensions: ["ngdat"],
      },
      "application/vnd.nokia.n-gage.symbian.install": {
        source: "iana",
        extensions: ["n-gage"],
      },
      "application/vnd.nokia.ncd": {
        source: "iana",
      },
      "application/vnd.nokia.pcd+wbxml": {
        source: "iana",
      },
      "application/vnd.nokia.pcd+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.nokia.radio-preset": {
        source: "iana",
        extensions: ["rpst"],
      },
      "application/vnd.nokia.radio-presets": {
        source: "iana",
        extensions: ["rpss"],
      },
      "application/vnd.novadigm.edm": {
        source: "iana",
        extensions: ["edm"],
      },
      "application/vnd.novadigm.edx": {
        source: "iana",
        extensions: ["edx"],
      },
      "application/vnd.novadigm.ext": {
        source: "iana",
        extensions: ["ext"],
      },
      "application/vnd.ntt-local.content-share": {
        source: "iana",
      },
      "application/vnd.ntt-local.file-transfer": {
        source: "iana",
      },
      "application/vnd.ntt-local.ogw_remote-access": {
        source: "iana",
      },
      "application/vnd.ntt-local.sip-ta_remote": {
        source: "iana",
      },
      "application/vnd.ntt-local.sip-ta_tcp_stream": {
        source: "iana",
      },
      "application/vnd.oasis.opendocument.chart": {
        source: "iana",
        extensions: ["odc"],
      },
      "application/vnd.oasis.opendocument.chart-template": {
        source: "iana",
        extensions: ["otc"],
      },
      "application/vnd.oasis.opendocument.database": {
        source: "iana",
        extensions: ["odb"],
      },
      "application/vnd.oasis.opendocument.formula": {
        source: "iana",
        extensions: ["odf"],
      },
      "application/vnd.oasis.opendocument.formula-template": {
        source: "iana",
        extensions: ["odft"],
      },
      "application/vnd.oasis.opendocument.graphics": {
        source: "iana",
        compressible: false,
        extensions: ["odg"],
      },
      "application/vnd.oasis.opendocument.graphics-template": {
        source: "iana",
        extensions: ["otg"],
      },
      "application/vnd.oasis.opendocument.image": {
        source: "iana",
        extensions: ["odi"],
      },
      "application/vnd.oasis.opendocument.image-template": {
        source: "iana",
        extensions: ["oti"],
      },
      "application/vnd.oasis.opendocument.presentation": {
        source: "iana",
        compressible: false,
        extensions: ["odp"],
      },
      "application/vnd.oasis.opendocument.presentation-template": {
        source: "iana",
        extensions: ["otp"],
      },
      "application/vnd.oasis.opendocument.spreadsheet": {
        source: "iana",
        compressible: false,
        extensions: ["ods"],
      },
      "application/vnd.oasis.opendocument.spreadsheet-template": {
        source: "iana",
        extensions: ["ots"],
      },
      "application/vnd.oasis.opendocument.text": {
        source: "iana",
        compressible: false,
        extensions: ["odt"],
      },
      "application/vnd.oasis.opendocument.text-master": {
        source: "iana",
        extensions: ["odm"],
      },
      "application/vnd.oasis.opendocument.text-template": {
        source: "iana",
        extensions: ["ott"],
      },
      "application/vnd.oasis.opendocument.text-web": {
        source: "iana",
        extensions: ["oth"],
      },
      "application/vnd.obn": {
        source: "iana",
      },
      "application/vnd.ocf+cbor": {
        source: "iana",
      },
      "application/vnd.oci.image.manifest.v1+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.oftn.l10n+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.oipf.contentaccessdownload+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.oipf.contentaccessstreaming+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.oipf.cspg-hexbinary": {
        source: "iana",
      },
      "application/vnd.oipf.dae.svg+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.oipf.dae.xhtml+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.oipf.mippvcontrolmessage+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.oipf.pae.gem": {
        source: "iana",
      },
      "application/vnd.oipf.spdiscovery+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.oipf.spdlist+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.oipf.ueprofile+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.oipf.userprofile+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.olpc-sugar": {
        source: "iana",
        extensions: ["xo"],
      },
      "application/vnd.oma-scws-config": {
        source: "iana",
      },
      "application/vnd.oma-scws-http-request": {
        source: "iana",
      },
      "application/vnd.oma-scws-http-response": {
        source: "iana",
      },
      "application/vnd.oma.bcast.associated-procedure-parameter+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.oma.bcast.drm-trigger+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.oma.bcast.imd+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.oma.bcast.ltkm": {
        source: "iana",
      },
      "application/vnd.oma.bcast.notification+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.oma.bcast.provisioningtrigger": {
        source: "iana",
      },
      "application/vnd.oma.bcast.sgboot": {
        source: "iana",
      },
      "application/vnd.oma.bcast.sgdd+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.oma.bcast.sgdu": {
        source: "iana",
      },
      "application/vnd.oma.bcast.simple-symbol-container": {
        source: "iana",
      },
      "application/vnd.oma.bcast.smartcard-trigger+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.oma.bcast.sprov+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.oma.bcast.stkm": {
        source: "iana",
      },
      "application/vnd.oma.cab-address-book+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.oma.cab-feature-handler+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.oma.cab-pcc+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.oma.cab-subs-invite+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.oma.cab-user-prefs+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.oma.dcd": {
        source: "iana",
      },
      "application/vnd.oma.dcdc": {
        source: "iana",
      },
      "application/vnd.oma.dd2+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dd2"],
      },
      "application/vnd.oma.drm.risd+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.oma.group-usage-list+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.oma.lwm2m+cbor": {
        source: "iana",
      },
      "application/vnd.oma.lwm2m+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.oma.lwm2m+tlv": {
        source: "iana",
      },
      "application/vnd.oma.pal+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.oma.poc.detailed-progress-report+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.oma.poc.final-report+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.oma.poc.groups+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.oma.poc.invocation-descriptor+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.oma.poc.optimized-progress-report+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.oma.push": {
        source: "iana",
      },
      "application/vnd.oma.scidm.messages+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.oma.xcap-directory+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.omads-email+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
      },
      "application/vnd.omads-file+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
      },
      "application/vnd.omads-folder+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
      },
      "application/vnd.omaloc-supl-init": {
        source: "iana",
      },
      "application/vnd.onepager": {
        source: "iana",
      },
      "application/vnd.onepagertamp": {
        source: "iana",
      },
      "application/vnd.onepagertamx": {
        source: "iana",
      },
      "application/vnd.onepagertat": {
        source: "iana",
      },
      "application/vnd.onepagertatp": {
        source: "iana",
      },
      "application/vnd.onepagertatx": {
        source: "iana",
      },
      "application/vnd.openblox.game+xml": {
        source: "iana",
        compressible: true,
        extensions: ["obgx"],
      },
      "application/vnd.openblox.game-binary": {
        source: "iana",
      },
      "application/vnd.openeye.oeb": {
        source: "iana",
      },
      "application/vnd.openofficeorg.extension": {
        source: "apache",
        extensions: ["oxt"],
      },
      "application/vnd.openstreetmap.data+xml": {
        source: "iana",
        compressible: true,
        extensions: ["osm"],
      },
      "application/vnd.opentimestamps.ots": {
        source: "iana",
      },
      "application/vnd.openxmlformats-officedocument.custom-properties+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.drawing+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.extended-properties+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
        source: "iana",
        compressible: false,
        extensions: ["pptx"],
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml":
        {
          source: "iana",
          compressible: true,
        },
      "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slide": {
        source: "iana",
        extensions: ["sldx"],
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
        source: "iana",
        extensions: ["ppsx"],
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml":
        {
          source: "iana",
          compressible: true,
        },
      "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.presentationml.template": {
        source: "iana",
        extensions: ["potx"],
      },
      "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml":
        {
          source: "iana",
          compressible: true,
        },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml":
        {
          source: "iana",
          compressible: true,
        },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
        source: "iana",
        compressible: false,
        extensions: ["xlsx"],
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml":
        {
          source: "iana",
          compressible: true,
        },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
        source: "iana",
        extensions: ["xltx"],
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml":
        {
          source: "iana",
          compressible: true,
        },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.theme+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.themeoverride+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.vmldrawing": {
        source: "iana",
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
        source: "iana",
        compressible: false,
        extensions: ["docx"],
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml":
        {
          source: "iana",
          compressible: true,
        },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml":
        {
          source: "iana",
          compressible: true,
        },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
        source: "iana",
        extensions: ["dotx"],
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml":
        {
          source: "iana",
          compressible: true,
        },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-package.core-properties+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.openxmlformats-package.relationships+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.oracle.resource+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.orange.indata": {
        source: "iana",
      },
      "application/vnd.osa.netdeploy": {
        source: "iana",
      },
      "application/vnd.osgeo.mapguide.package": {
        source: "iana",
        extensions: ["mgp"],
      },
      "application/vnd.osgi.bundle": {
        source: "iana",
      },
      "application/vnd.osgi.dp": {
        source: "iana",
        extensions: ["dp"],
      },
      "application/vnd.osgi.subsystem": {
        source: "iana",
        extensions: ["esa"],
      },
      "application/vnd.otps.ct-kip+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.oxli.countgraph": {
        source: "iana",
      },
      "application/vnd.pagerduty+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.palm": {
        source: "iana",
        extensions: ["pdb", "pqa", "oprc"],
      },
      "application/vnd.panoply": {
        source: "iana",
      },
      "application/vnd.paos.xml": {
        source: "iana",
      },
      "application/vnd.patentdive": {
        source: "iana",
      },
      "application/vnd.patientecommsdoc": {
        source: "iana",
      },
      "application/vnd.pawaafile": {
        source: "iana",
        extensions: ["paw"],
      },
      "application/vnd.pcos": {
        source: "iana",
      },
      "application/vnd.pg.format": {
        source: "iana",
        extensions: ["str"],
      },
      "application/vnd.pg.osasli": {
        source: "iana",
        extensions: ["ei6"],
      },
      "application/vnd.piaccess.application-licence": {
        source: "iana",
      },
      "application/vnd.picsel": {
        source: "iana",
        extensions: ["efif"],
      },
      "application/vnd.pmi.widget": {
        source: "iana",
        extensions: ["wg"],
      },
      "application/vnd.poc.group-advertisement+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.pocketlearn": {
        source: "iana",
        extensions: ["plf"],
      },
      "application/vnd.powerbuilder6": {
        source: "iana",
        extensions: ["pbd"],
      },
      "application/vnd.powerbuilder6-s": {
        source: "iana",
      },
      "application/vnd.powerbuilder7": {
        source: "iana",
      },
      "application/vnd.powerbuilder7-s": {
        source: "iana",
      },
      "application/vnd.powerbuilder75": {
        source: "iana",
      },
      "application/vnd.powerbuilder75-s": {
        source: "iana",
      },
      "application/vnd.preminet": {
        source: "iana",
      },
      "application/vnd.previewsystems.box": {
        source: "iana",
        extensions: ["box"],
      },
      "application/vnd.proteus.magazine": {
        source: "iana",
        extensions: ["mgz"],
      },
      "application/vnd.psfs": {
        source: "iana",
      },
      "application/vnd.publishare-delta-tree": {
        source: "iana",
        extensions: ["qps"],
      },
      "application/vnd.pvi.ptid1": {
        source: "iana",
        extensions: ["ptid"],
      },
      "application/vnd.pwg-multiplexed": {
        source: "iana",
      },
      "application/vnd.pwg-xhtml-print+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.qualcomm.brew-app-res": {
        source: "iana",
      },
      "application/vnd.quarantainenet": {
        source: "iana",
      },
      "application/vnd.quark.quarkxpress": {
        source: "iana",
        extensions: ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"],
      },
      "application/vnd.quobject-quoxdocument": {
        source: "iana",
      },
      "application/vnd.radisys.moml+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.radisys.msml+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.radisys.msml-audit+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.radisys.msml-audit-conf+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.radisys.msml-audit-conn+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.radisys.msml-audit-dialog+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.radisys.msml-audit-stream+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.radisys.msml-conf+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.radisys.msml-dialog+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.radisys.msml-dialog-base+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.radisys.msml-dialog-fax-detect+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.radisys.msml-dialog-group+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.radisys.msml-dialog-speech+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.radisys.msml-dialog-transform+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.rainstor.data": {
        source: "iana",
      },
      "application/vnd.rapid": {
        source: "iana",
      },
      "application/vnd.rar": {
        source: "iana",
        extensions: ["rar"],
      },
      "application/vnd.realvnc.bed": {
        source: "iana",
        extensions: ["bed"],
      },
      "application/vnd.recordare.musicxml": {
        source: "iana",
        extensions: ["mxl"],
      },
      "application/vnd.recordare.musicxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["musicxml"],
      },
      "application/vnd.renlearn.rlprint": {
        source: "iana",
      },
      "application/vnd.resilient.logic": {
        source: "iana",
      },
      "application/vnd.restful+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.rig.cryptonote": {
        source: "iana",
        extensions: ["cryptonote"],
      },
      "application/vnd.rim.cod": {
        source: "apache",
        extensions: ["cod"],
      },
      "application/vnd.rn-realmedia": {
        source: "apache",
        extensions: ["rm"],
      },
      "application/vnd.rn-realmedia-vbr": {
        source: "apache",
        extensions: ["rmvb"],
      },
      "application/vnd.route66.link66+xml": {
        source: "iana",
        compressible: true,
        extensions: ["link66"],
      },
      "application/vnd.rs-274x": {
        source: "iana",
      },
      "application/vnd.ruckus.download": {
        source: "iana",
      },
      "application/vnd.s3sms": {
        source: "iana",
      },
      "application/vnd.sailingtracker.track": {
        source: "iana",
        extensions: ["st"],
      },
      "application/vnd.sar": {
        source: "iana",
      },
      "application/vnd.sbm.cid": {
        source: "iana",
      },
      "application/vnd.sbm.mid2": {
        source: "iana",
      },
      "application/vnd.scribus": {
        source: "iana",
      },
      "application/vnd.sealed.3df": {
        source: "iana",
      },
      "application/vnd.sealed.csf": {
        source: "iana",
      },
      "application/vnd.sealed.doc": {
        source: "iana",
      },
      "application/vnd.sealed.eml": {
        source: "iana",
      },
      "application/vnd.sealed.mht": {
        source: "iana",
      },
      "application/vnd.sealed.net": {
        source: "iana",
      },
      "application/vnd.sealed.ppt": {
        source: "iana",
      },
      "application/vnd.sealed.tiff": {
        source: "iana",
      },
      "application/vnd.sealed.xls": {
        source: "iana",
      },
      "application/vnd.sealedmedia.softseal.html": {
        source: "iana",
      },
      "application/vnd.sealedmedia.softseal.pdf": {
        source: "iana",
      },
      "application/vnd.seemail": {
        source: "iana",
        extensions: ["see"],
      },
      "application/vnd.seis+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.sema": {
        source: "iana",
        extensions: ["sema"],
      },
      "application/vnd.semd": {
        source: "iana",
        extensions: ["semd"],
      },
      "application/vnd.semf": {
        source: "iana",
        extensions: ["semf"],
      },
      "application/vnd.shade-save-file": {
        source: "iana",
      },
      "application/vnd.shana.informed.formdata": {
        source: "iana",
        extensions: ["ifm"],
      },
      "application/vnd.shana.informed.formtemplate": {
        source: "iana",
        extensions: ["itp"],
      },
      "application/vnd.shana.informed.interchange": {
        source: "iana",
        extensions: ["iif"],
      },
      "application/vnd.shana.informed.package": {
        source: "iana",
        extensions: ["ipk"],
      },
      "application/vnd.shootproof+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.shopkick+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.shp": {
        source: "iana",
      },
      "application/vnd.shx": {
        source: "iana",
      },
      "application/vnd.sigrok.session": {
        source: "iana",
      },
      "application/vnd.simtech-mindmapper": {
        source: "iana",
        extensions: ["twd", "twds"],
      },
      "application/vnd.siren+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.smaf": {
        source: "iana",
        extensions: ["mmf"],
      },
      "application/vnd.smart.notebook": {
        source: "iana",
      },
      "application/vnd.smart.teacher": {
        source: "iana",
        extensions: ["teacher"],
      },
      "application/vnd.snesdev-page-table": {
        source: "iana",
      },
      "application/vnd.software602.filler.form+xml": {
        source: "iana",
        compressible: true,
        extensions: ["fo"],
      },
      "application/vnd.software602.filler.form-xml-zip": {
        source: "iana",
      },
      "application/vnd.solent.sdkm+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sdkm", "sdkd"],
      },
      "application/vnd.spotfire.dxp": {
        source: "iana",
        extensions: ["dxp"],
      },
      "application/vnd.spotfire.sfs": {
        source: "iana",
        extensions: ["sfs"],
      },
      "application/vnd.sqlite3": {
        source: "iana",
      },
      "application/vnd.sss-cod": {
        source: "iana",
      },
      "application/vnd.sss-dtf": {
        source: "iana",
      },
      "application/vnd.sss-ntf": {
        source: "iana",
      },
      "application/vnd.stardivision.calc": {
        source: "apache",
        extensions: ["sdc"],
      },
      "application/vnd.stardivision.draw": {
        source: "apache",
        extensions: ["sda"],
      },
      "application/vnd.stardivision.impress": {
        source: "apache",
        extensions: ["sdd"],
      },
      "application/vnd.stardivision.math": {
        source: "apache",
        extensions: ["smf"],
      },
      "application/vnd.stardivision.writer": {
        source: "apache",
        extensions: ["sdw", "vor"],
      },
      "application/vnd.stardivision.writer-global": {
        source: "apache",
        extensions: ["sgl"],
      },
      "application/vnd.stepmania.package": {
        source: "iana",
        extensions: ["smzip"],
      },
      "application/vnd.stepmania.stepchart": {
        source: "iana",
        extensions: ["sm"],
      },
      "application/vnd.street-stream": {
        source: "iana",
      },
      "application/vnd.sun.wadl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wadl"],
      },
      "application/vnd.sun.xml.calc": {
        source: "apache",
        extensions: ["sxc"],
      },
      "application/vnd.sun.xml.calc.template": {
        source: "apache",
        extensions: ["stc"],
      },
      "application/vnd.sun.xml.draw": {
        source: "apache",
        extensions: ["sxd"],
      },
      "application/vnd.sun.xml.draw.template": {
        source: "apache",
        extensions: ["std"],
      },
      "application/vnd.sun.xml.impress": {
        source: "apache",
        extensions: ["sxi"],
      },
      "application/vnd.sun.xml.impress.template": {
        source: "apache",
        extensions: ["sti"],
      },
      "application/vnd.sun.xml.math": {
        source: "apache",
        extensions: ["sxm"],
      },
      "application/vnd.sun.xml.writer": {
        source: "apache",
        extensions: ["sxw"],
      },
      "application/vnd.sun.xml.writer.global": {
        source: "apache",
        extensions: ["sxg"],
      },
      "application/vnd.sun.xml.writer.template": {
        source: "apache",
        extensions: ["stw"],
      },
      "application/vnd.sus-calendar": {
        source: "iana",
        extensions: ["sus", "susp"],
      },
      "application/vnd.svd": {
        source: "iana",
        extensions: ["svd"],
      },
      "application/vnd.swiftview-ics": {
        source: "iana",
      },
      "application/vnd.sycle+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.syft+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.symbian.install": {
        source: "apache",
        extensions: ["sis", "sisx"],
      },
      "application/vnd.syncml+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["xsm"],
      },
      "application/vnd.syncml.dm+wbxml": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["bdm"],
      },
      "application/vnd.syncml.dm+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["xdm"],
      },
      "application/vnd.syncml.dm.notification": {
        source: "iana",
      },
      "application/vnd.syncml.dmddf+wbxml": {
        source: "iana",
      },
      "application/vnd.syncml.dmddf+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["ddf"],
      },
      "application/vnd.syncml.dmtnds+wbxml": {
        source: "iana",
      },
      "application/vnd.syncml.dmtnds+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
      },
      "application/vnd.syncml.ds.notification": {
        source: "iana",
      },
      "application/vnd.tableschema+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.tao.intent-module-archive": {
        source: "iana",
        extensions: ["tao"],
      },
      "application/vnd.tcpdump.pcap": {
        source: "iana",
        extensions: ["pcap", "cap", "dmp"],
      },
      "application/vnd.think-cell.ppttc+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.tmd.mediaflex.api+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.tml": {
        source: "iana",
      },
      "application/vnd.tmobile-livetv": {
        source: "iana",
        extensions: ["tmo"],
      },
      "application/vnd.tri.onesource": {
        source: "iana",
      },
      "application/vnd.trid.tpt": {
        source: "iana",
        extensions: ["tpt"],
      },
      "application/vnd.triscape.mxs": {
        source: "iana",
        extensions: ["mxs"],
      },
      "application/vnd.trueapp": {
        source: "iana",
        extensions: ["tra"],
      },
      "application/vnd.truedoc": {
        source: "iana",
      },
      "application/vnd.ubisoft.webplayer": {
        source: "iana",
      },
      "application/vnd.ufdl": {
        source: "iana",
        extensions: ["ufd", "ufdl"],
      },
      "application/vnd.uiq.theme": {
        source: "iana",
        extensions: ["utz"],
      },
      "application/vnd.umajin": {
        source: "iana",
        extensions: ["umj"],
      },
      "application/vnd.unity": {
        source: "iana",
        extensions: ["unityweb"],
      },
      "application/vnd.uoml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["uoml"],
      },
      "application/vnd.uplanet.alert": {
        source: "iana",
      },
      "application/vnd.uplanet.alert-wbxml": {
        source: "iana",
      },
      "application/vnd.uplanet.bearer-choice": {
        source: "iana",
      },
      "application/vnd.uplanet.bearer-choice-wbxml": {
        source: "iana",
      },
      "application/vnd.uplanet.cacheop": {
        source: "iana",
      },
      "application/vnd.uplanet.cacheop-wbxml": {
        source: "iana",
      },
      "application/vnd.uplanet.channel": {
        source: "iana",
      },
      "application/vnd.uplanet.channel-wbxml": {
        source: "iana",
      },
      "application/vnd.uplanet.list": {
        source: "iana",
      },
      "application/vnd.uplanet.list-wbxml": {
        source: "iana",
      },
      "application/vnd.uplanet.listcmd": {
        source: "iana",
      },
      "application/vnd.uplanet.listcmd-wbxml": {
        source: "iana",
      },
      "application/vnd.uplanet.signal": {
        source: "iana",
      },
      "application/vnd.uri-map": {
        source: "iana",
      },
      "application/vnd.valve.source.material": {
        source: "iana",
      },
      "application/vnd.vcx": {
        source: "iana",
        extensions: ["vcx"],
      },
      "application/vnd.vd-study": {
        source: "iana",
      },
      "application/vnd.vectorworks": {
        source: "iana",
      },
      "application/vnd.vel+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.verimatrix.vcas": {
        source: "iana",
      },
      "application/vnd.veritone.aion+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.veryant.thin": {
        source: "iana",
      },
      "application/vnd.ves.encrypted": {
        source: "iana",
      },
      "application/vnd.vidsoft.vidconference": {
        source: "iana",
      },
      "application/vnd.visio": {
        source: "iana",
        extensions: ["vsd", "vst", "vss", "vsw"],
      },
      "application/vnd.visionary": {
        source: "iana",
        extensions: ["vis"],
      },
      "application/vnd.vividence.scriptfile": {
        source: "iana",
      },
      "application/vnd.vsf": {
        source: "iana",
        extensions: ["vsf"],
      },
      "application/vnd.wap.sic": {
        source: "iana",
      },
      "application/vnd.wap.slc": {
        source: "iana",
      },
      "application/vnd.wap.wbxml": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["wbxml"],
      },
      "application/vnd.wap.wmlc": {
        source: "iana",
        extensions: ["wmlc"],
      },
      "application/vnd.wap.wmlscriptc": {
        source: "iana",
        extensions: ["wmlsc"],
      },
      "application/vnd.webturbo": {
        source: "iana",
        extensions: ["wtb"],
      },
      "application/vnd.wfa.dpp": {
        source: "iana",
      },
      "application/vnd.wfa.p2p": {
        source: "iana",
      },
      "application/vnd.wfa.wsc": {
        source: "iana",
      },
      "application/vnd.windows.devicepairing": {
        source: "iana",
      },
      "application/vnd.wmc": {
        source: "iana",
      },
      "application/vnd.wmf.bootstrap": {
        source: "iana",
      },
      "application/vnd.wolfram.mathematica": {
        source: "iana",
      },
      "application/vnd.wolfram.mathematica.package": {
        source: "iana",
      },
      "application/vnd.wolfram.player": {
        source: "iana",
        extensions: ["nbp"],
      },
      "application/vnd.wordperfect": {
        source: "iana",
        extensions: ["wpd"],
      },
      "application/vnd.wqd": {
        source: "iana",
        extensions: ["wqd"],
      },
      "application/vnd.wrq-hp3000-labelled": {
        source: "iana",
      },
      "application/vnd.wt.stf": {
        source: "iana",
        extensions: ["stf"],
      },
      "application/vnd.wv.csp+wbxml": {
        source: "iana",
      },
      "application/vnd.wv.csp+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.wv.ssp+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.xacml+json": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.xara": {
        source: "iana",
        extensions: ["xar"],
      },
      "application/vnd.xfdl": {
        source: "iana",
        extensions: ["xfdl"],
      },
      "application/vnd.xfdl.webform": {
        source: "iana",
      },
      "application/vnd.xmi+xml": {
        source: "iana",
        compressible: true,
      },
      "application/vnd.xmpie.cpkg": {
        source: "iana",
      },
      "application/vnd.xmpie.dpkg": {
        source: "iana",
      },
      "application/vnd.xmpie.plan": {
        source: "iana",
      },
      "application/vnd.xmpie.ppkg": {
        source: "iana",
      },
      "application/vnd.xmpie.xlim": {
        source: "iana",
      },
      "application/vnd.yamaha.hv-dic": {
        source: "iana",
        extensions: ["hvd"],
      },
      "application/vnd.yamaha.hv-script": {
        source: "iana",
        extensions: ["hvs"],
      },
      "application/vnd.yamaha.hv-voice": {
        source: "iana",
        extensions: ["hvp"],
      },
      "application/vnd.yamaha.openscoreformat": {
        source: "iana",
        extensions: ["osf"],
      },
      "application/vnd.yamaha.openscoreformat.osfpvg+xml": {
        source: "iana",
        compressible: true,
        extensions: ["osfpvg"],
      },
      "application/vnd.yamaha.remote-setup": {
        source: "iana",
      },
      "application/vnd.yamaha.smaf-audio": {
        source: "iana",
        extensions: ["saf"],
      },
      "application/vnd.yamaha.smaf-phrase": {
        source: "iana",
        extensions: ["spf"],
      },
      "application/vnd.yamaha.through-ngn": {
        source: "iana",
      },
      "application/vnd.yamaha.tunnel-udpencap": {
        source: "iana",
      },
      "application/vnd.yaoweme": {
        source: "iana",
      },
      "application/vnd.yellowriver-custom-menu": {
        source: "iana",
        extensions: ["cmp"],
      },
      "application/vnd.youtube.yt": {
        source: "iana",
      },
      "application/vnd.zul": {
        source: "iana",
        extensions: ["zir", "zirz"],
      },
      "application/vnd.zzazz.deck+xml": {
        source: "iana",
        compressible: true,
        extensions: ["zaz"],
      },
      "application/voicexml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["vxml"],
      },
      "application/voucher-cms+json": {
        source: "iana",
        compressible: true,
      },
      "application/vq-rtcpxr": {
        source: "iana",
      },
      "application/wasm": {
        source: "iana",
        compressible: true,
        extensions: ["wasm"],
      },
      "application/watcherinfo+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wif"],
      },
      "application/webpush-options+json": {
        source: "iana",
        compressible: true,
      },
      "application/whoispp-query": {
        source: "iana",
      },
      "application/whoispp-response": {
        source: "iana",
      },
      "application/widget": {
        source: "iana",
        extensions: ["wgt"],
      },
      "application/winhlp": {
        source: "apache",
        extensions: ["hlp"],
      },
      "application/wita": {
        source: "iana",
      },
      "application/wordperfect5.1": {
        source: "iana",
      },
      "application/wsdl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wsdl"],
      },
      "application/wspolicy+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wspolicy"],
      },
      "application/x-7z-compressed": {
        source: "apache",
        compressible: false,
        extensions: ["7z"],
      },
      "application/x-abiword": {
        source: "apache",
        extensions: ["abw"],
      },
      "application/x-ace-compressed": {
        source: "apache",
        extensions: ["ace"],
      },
      "application/x-amf": {
        source: "apache",
      },
      "application/x-apple-diskimage": {
        source: "apache",
        extensions: ["dmg"],
      },
      "application/x-arj": {
        compressible: false,
        extensions: ["arj"],
      },
      "application/x-authorware-bin": {
        source: "apache",
        extensions: ["aab", "x32", "u32", "vox"],
      },
      "application/x-authorware-map": {
        source: "apache",
        extensions: ["aam"],
      },
      "application/x-authorware-seg": {
        source: "apache",
        extensions: ["aas"],
      },
      "application/x-bcpio": {
        source: "apache",
        extensions: ["bcpio"],
      },
      "application/x-bdoc": {
        compressible: false,
        extensions: ["bdoc"],
      },
      "application/x-bittorrent": {
        source: "apache",
        extensions: ["torrent"],
      },
      "application/x-blorb": {
        source: "apache",
        extensions: ["blb", "blorb"],
      },
      "application/x-bzip": {
        source: "apache",
        compressible: false,
        extensions: ["bz"],
      },
      "application/x-bzip2": {
        source: "apache",
        compressible: false,
        extensions: ["bz2", "boz"],
      },
      "application/x-cbr": {
        source: "apache",
        extensions: ["cbr", "cba", "cbt", "cbz", "cb7"],
      },
      "application/x-cdlink": {
        source: "apache",
        extensions: ["vcd"],
      },
      "application/x-cfs-compressed": {
        source: "apache",
        extensions: ["cfs"],
      },
      "application/x-chat": {
        source: "apache",
        extensions: ["chat"],
      },
      "application/x-chess-pgn": {
        source: "apache",
        extensions: ["pgn"],
      },
      "application/x-chrome-extension": {
        extensions: ["crx"],
      },
      "application/x-cocoa": {
        source: "nginx",
        extensions: ["cco"],
      },
      "application/x-compress": {
        source: "apache",
      },
      "application/x-conference": {
        source: "apache",
        extensions: ["nsc"],
      },
      "application/x-cpio": {
        source: "apache",
        extensions: ["cpio"],
      },
      "application/x-csh": {
        source: "apache",
        extensions: ["csh"],
      },
      "application/x-deb": {
        compressible: false,
      },
      "application/x-debian-package": {
        source: "apache",
        extensions: ["deb", "udeb"],
      },
      "application/x-dgc-compressed": {
        source: "apache",
        extensions: ["dgc"],
      },
      "application/x-director": {
        source: "apache",
        extensions: ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"],
      },
      "application/x-doom": {
        source: "apache",
        extensions: ["wad"],
      },
      "application/x-dtbncx+xml": {
        source: "apache",
        compressible: true,
        extensions: ["ncx"],
      },
      "application/x-dtbook+xml": {
        source: "apache",
        compressible: true,
        extensions: ["dtb"],
      },
      "application/x-dtbresource+xml": {
        source: "apache",
        compressible: true,
        extensions: ["res"],
      },
      "application/x-dvi": {
        source: "apache",
        compressible: false,
        extensions: ["dvi"],
      },
      "application/x-envoy": {
        source: "apache",
        extensions: ["evy"],
      },
      "application/x-eva": {
        source: "apache",
        extensions: ["eva"],
      },
      "application/x-font-bdf": {
        source: "apache",
        extensions: ["bdf"],
      },
      "application/x-font-dos": {
        source: "apache",
      },
      "application/x-font-framemaker": {
        source: "apache",
      },
      "application/x-font-ghostscript": {
        source: "apache",
        extensions: ["gsf"],
      },
      "application/x-font-libgrx": {
        source: "apache",
      },
      "application/x-font-linux-psf": {
        source: "apache",
        extensions: ["psf"],
      },
      "application/x-font-pcf": {
        source: "apache",
        extensions: ["pcf"],
      },
      "application/x-font-snf": {
        source: "apache",
        extensions: ["snf"],
      },
      "application/x-font-speedo": {
        source: "apache",
      },
      "application/x-font-sunos-news": {
        source: "apache",
      },
      "application/x-font-type1": {
        source: "apache",
        extensions: ["pfa", "pfb", "pfm", "afm"],
      },
      "application/x-font-vfont": {
        source: "apache",
      },
      "application/x-freearc": {
        source: "apache",
        extensions: ["arc"],
      },
      "application/x-futuresplash": {
        source: "apache",
        extensions: ["spl"],
      },
      "application/x-gca-compressed": {
        source: "apache",
        extensions: ["gca"],
      },
      "application/x-glulx": {
        source: "apache",
        extensions: ["ulx"],
      },
      "application/x-gnumeric": {
        source: "apache",
        extensions: ["gnumeric"],
      },
      "application/x-gramps-xml": {
        source: "apache",
        extensions: ["gramps"],
      },
      "application/x-gtar": {
        source: "apache",
        extensions: ["gtar"],
      },
      "application/x-gzip": {
        source: "apache",
      },
      "application/x-hdf": {
        source: "apache",
        extensions: ["hdf"],
      },
      "application/x-httpd-php": {
        compressible: true,
        extensions: ["php"],
      },
      "application/x-install-instructions": {
        source: "apache",
        extensions: ["install"],
      },
      "application/x-iso9660-image": {
        source: "apache",
        extensions: ["iso"],
      },
      "application/x-iwork-keynote-sffkey": {
        extensions: ["key"],
      },
      "application/x-iwork-numbers-sffnumbers": {
        extensions: ["numbers"],
      },
      "application/x-iwork-pages-sffpages": {
        extensions: ["pages"],
      },
      "application/x-java-archive-diff": {
        source: "nginx",
        extensions: ["jardiff"],
      },
      "application/x-java-jnlp-file": {
        source: "apache",
        compressible: false,
        extensions: ["jnlp"],
      },
      "application/x-javascript": {
        compressible: true,
      },
      "application/x-keepass2": {
        extensions: ["kdbx"],
      },
      "application/x-latex": {
        source: "apache",
        compressible: false,
        extensions: ["latex"],
      },
      "application/x-lua-bytecode": {
        extensions: ["luac"],
      },
      "application/x-lzh-compressed": {
        source: "apache",
        extensions: ["lzh", "lha"],
      },
      "application/x-makeself": {
        source: "nginx",
        extensions: ["run"],
      },
      "application/x-mie": {
        source: "apache",
        extensions: ["mie"],
      },
      "application/x-mobipocket-ebook": {
        source: "apache",
        extensions: ["prc", "mobi"],
      },
      "application/x-mpegurl": {
        compressible: false,
      },
      "application/x-ms-application": {
        source: "apache",
        extensions: ["application"],
      },
      "application/x-ms-shortcut": {
        source: "apache",
        extensions: ["lnk"],
      },
      "application/x-ms-wmd": {
        source: "apache",
        extensions: ["wmd"],
      },
      "application/x-ms-wmz": {
        source: "apache",
        extensions: ["wmz"],
      },
      "application/x-ms-xbap": {
        source: "apache",
        extensions: ["xbap"],
      },
      "application/x-msaccess": {
        source: "apache",
        extensions: ["mdb"],
      },
      "application/x-msbinder": {
        source: "apache",
        extensions: ["obd"],
      },
      "application/x-mscardfile": {
        source: "apache",
        extensions: ["crd"],
      },
      "application/x-msclip": {
        source: "apache",
        extensions: ["clp"],
      },
      "application/x-msdos-program": {
        extensions: ["exe"],
      },
      "application/x-msdownload": {
        source: "apache",
        extensions: ["exe", "dll", "com", "bat", "msi"],
      },
      "application/x-msmediaview": {
        source: "apache",
        extensions: ["mvb", "m13", "m14"],
      },
      "application/x-msmetafile": {
        source: "apache",
        extensions: ["wmf", "wmz", "emf", "emz"],
      },
      "application/x-msmoney": {
        source: "apache",
        extensions: ["mny"],
      },
      "application/x-mspublisher": {
        source: "apache",
        extensions: ["pub"],
      },
      "application/x-msschedule": {
        source: "apache",
        extensions: ["scd"],
      },
      "application/x-msterminal": {
        source: "apache",
        extensions: ["trm"],
      },
      "application/x-mswrite": {
        source: "apache",
        extensions: ["wri"],
      },
      "application/x-netcdf": {
        source: "apache",
        extensions: ["nc", "cdf"],
      },
      "application/x-ns-proxy-autoconfig": {
        compressible: true,
        extensions: ["pac"],
      },
      "application/x-nzb": {
        source: "apache",
        extensions: ["nzb"],
      },
      "application/x-perl": {
        source: "nginx",
        extensions: ["pl", "pm"],
      },
      "application/x-pilot": {
        source: "nginx",
        extensions: ["prc", "pdb"],
      },
      "application/x-pkcs12": {
        source: "apache",
        compressible: false,
        extensions: ["p12", "pfx"],
      },
      "application/x-pkcs7-certificates": {
        source: "apache",
        extensions: ["p7b", "spc"],
      },
      "application/x-pkcs7-certreqresp": {
        source: "apache",
        extensions: ["p7r"],
      },
      "application/x-pki-message": {
        source: "iana",
      },
      "application/x-rar-compressed": {
        source: "apache",
        compressible: false,
        extensions: ["rar"],
      },
      "application/x-redhat-package-manager": {
        source: "nginx",
        extensions: ["rpm"],
      },
      "application/x-research-info-systems": {
        source: "apache",
        extensions: ["ris"],
      },
      "application/x-sea": {
        source: "nginx",
        extensions: ["sea"],
      },
      "application/x-sh": {
        source: "apache",
        compressible: true,
        extensions: ["sh"],
      },
      "application/x-shar": {
        source: "apache",
        extensions: ["shar"],
      },
      "application/x-shockwave-flash": {
        source: "apache",
        compressible: false,
        extensions: ["swf"],
      },
      "application/x-silverlight-app": {
        source: "apache",
        extensions: ["xap"],
      },
      "application/x-sql": {
        source: "apache",
        extensions: ["sql"],
      },
      "application/x-stuffit": {
        source: "apache",
        compressible: false,
        extensions: ["sit"],
      },
      "application/x-stuffitx": {
        source: "apache",
        extensions: ["sitx"],
      },
      "application/x-subrip": {
        source: "apache",
        extensions: ["srt"],
      },
      "application/x-sv4cpio": {
        source: "apache",
        extensions: ["sv4cpio"],
      },
      "application/x-sv4crc": {
        source: "apache",
        extensions: ["sv4crc"],
      },
      "application/x-t3vm-image": {
        source: "apache",
        extensions: ["t3"],
      },
      "application/x-tads": {
        source: "apache",
        extensions: ["gam"],
      },
      "application/x-tar": {
        source: "apache",
        compressible: true,
        extensions: ["tar"],
      },
      "application/x-tcl": {
        source: "apache",
        extensions: ["tcl", "tk"],
      },
      "application/x-tex": {
        source: "apache",
        extensions: ["tex"],
      },
      "application/x-tex-tfm": {
        source: "apache",
        extensions: ["tfm"],
      },
      "application/x-texinfo": {
        source: "apache",
        extensions: ["texinfo", "texi"],
      },
      "application/x-tgif": {
        source: "apache",
        extensions: ["obj"],
      },
      "application/x-ustar": {
        source: "apache",
        extensions: ["ustar"],
      },
      "application/x-virtualbox-hdd": {
        compressible: true,
        extensions: ["hdd"],
      },
      "application/x-virtualbox-ova": {
        compressible: true,
        extensions: ["ova"],
      },
      "application/x-virtualbox-ovf": {
        compressible: true,
        extensions: ["ovf"],
      },
      "application/x-virtualbox-vbox": {
        compressible: true,
        extensions: ["vbox"],
      },
      "application/x-virtualbox-vbox-extpack": {
        compressible: false,
        extensions: ["vbox-extpack"],
      },
      "application/x-virtualbox-vdi": {
        compressible: true,
        extensions: ["vdi"],
      },
      "application/x-virtualbox-vhd": {
        compressible: true,
        extensions: ["vhd"],
      },
      "application/x-virtualbox-vmdk": {
        compressible: true,
        extensions: ["vmdk"],
      },
      "application/x-wais-source": {
        source: "apache",
        extensions: ["src"],
      },
      "application/x-web-app-manifest+json": {
        compressible: true,
        extensions: ["webapp"],
      },
      "application/x-www-form-urlencoded": {
        source: "iana",
        compressible: true,
      },
      "application/x-x509-ca-cert": {
        source: "iana",
        extensions: ["der", "crt", "pem"],
      },
      "application/x-x509-ca-ra-cert": {
        source: "iana",
      },
      "application/x-x509-next-ca-cert": {
        source: "iana",
      },
      "application/x-xfig": {
        source: "apache",
        extensions: ["fig"],
      },
      "application/x-xliff+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xlf"],
      },
      "application/x-xpinstall": {
        source: "apache",
        compressible: false,
        extensions: ["xpi"],
      },
      "application/x-xz": {
        source: "apache",
        extensions: ["xz"],
      },
      "application/x-zmachine": {
        source: "apache",
        extensions: ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"],
      },
      "application/x400-bp": {
        source: "iana",
      },
      "application/xacml+xml": {
        source: "iana",
        compressible: true,
      },
      "application/xaml+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xaml"],
      },
      "application/xcap-att+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xav"],
      },
      "application/xcap-caps+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xca"],
      },
      "application/xcap-diff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdf"],
      },
      "application/xcap-el+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xel"],
      },
      "application/xcap-error+xml": {
        source: "iana",
        compressible: true,
      },
      "application/xcap-ns+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xns"],
      },
      "application/xcon-conference-info+xml": {
        source: "iana",
        compressible: true,
      },
      "application/xcon-conference-info-diff+xml": {
        source: "iana",
        compressible: true,
      },
      "application/xenc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xenc"],
      },
      "application/xhtml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xhtml", "xht"],
      },
      "application/xhtml-voice+xml": {
        source: "apache",
        compressible: true,
      },
      "application/xliff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xlf"],
      },
      "application/xml": {
        source: "iana",
        compressible: true,
        extensions: ["xml", "xsl", "xsd", "rng"],
      },
      "application/xml-dtd": {
        source: "iana",
        compressible: true,
        extensions: ["dtd"],
      },
      "application/xml-external-parsed-entity": {
        source: "iana",
      },
      "application/xml-patch+xml": {
        source: "iana",
        compressible: true,
      },
      "application/xmpp+xml": {
        source: "iana",
        compressible: true,
      },
      "application/xop+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xop"],
      },
      "application/xproc+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xpl"],
      },
      "application/xslt+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xsl", "xslt"],
      },
      "application/xspf+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xspf"],
      },
      "application/xv+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mxml", "xhvml", "xvml", "xvm"],
      },
      "application/yang": {
        source: "iana",
        extensions: ["yang"],
      },
      "application/yang-data+json": {
        source: "iana",
        compressible: true,
      },
      "application/yang-data+xml": {
        source: "iana",
        compressible: true,
      },
      "application/yang-patch+json": {
        source: "iana",
        compressible: true,
      },
      "application/yang-patch+xml": {
        source: "iana",
        compressible: true,
      },
      "application/yin+xml": {
        source: "iana",
        compressible: true,
        extensions: ["yin"],
      },
      "application/zip": {
        source: "iana",
        compressible: false,
        extensions: ["zip"],
      },
      "application/zlib": {
        source: "iana",
      },
      "application/zstd": {
        source: "iana",
      },
      "audio/1d-interleaved-parityfec": {
        source: "iana",
      },
      "audio/32kadpcm": {
        source: "iana",
      },
      "audio/3gpp": {
        source: "iana",
        compressible: false,
        extensions: ["3gpp"],
      },
      "audio/3gpp2": {
        source: "iana",
      },
      "audio/aac": {
        source: "iana",
      },
      "audio/ac3": {
        source: "iana",
      },
      "audio/adpcm": {
        source: "apache",
        extensions: ["adp"],
      },
      "audio/amr": {
        source: "iana",
        extensions: ["amr"],
      },
      "audio/amr-wb": {
        source: "iana",
      },
      "audio/amr-wb+": {
        source: "iana",
      },
      "audio/aptx": {
        source: "iana",
      },
      "audio/asc": {
        source: "iana",
      },
      "audio/atrac-advanced-lossless": {
        source: "iana",
      },
      "audio/atrac-x": {
        source: "iana",
      },
      "audio/atrac3": {
        source: "iana",
      },
      "audio/basic": {
        source: "iana",
        compressible: false,
        extensions: ["au", "snd"],
      },
      "audio/bv16": {
        source: "iana",
      },
      "audio/bv32": {
        source: "iana",
      },
      "audio/clearmode": {
        source: "iana",
      },
      "audio/cn": {
        source: "iana",
      },
      "audio/dat12": {
        source: "iana",
      },
      "audio/dls": {
        source: "iana",
      },
      "audio/dsr-es201108": {
        source: "iana",
      },
      "audio/dsr-es202050": {
        source: "iana",
      },
      "audio/dsr-es202211": {
        source: "iana",
      },
      "audio/dsr-es202212": {
        source: "iana",
      },
      "audio/dv": {
        source: "iana",
      },
      "audio/dvi4": {
        source: "iana",
      },
      "audio/eac3": {
        source: "iana",
      },
      "audio/encaprtp": {
        source: "iana",
      },
      "audio/evrc": {
        source: "iana",
      },
      "audio/evrc-qcp": {
        source: "iana",
      },
      "audio/evrc0": {
        source: "iana",
      },
      "audio/evrc1": {
        source: "iana",
      },
      "audio/evrcb": {
        source: "iana",
      },
      "audio/evrcb0": {
        source: "iana",
      },
      "audio/evrcb1": {
        source: "iana",
      },
      "audio/evrcnw": {
        source: "iana",
      },
      "audio/evrcnw0": {
        source: "iana",
      },
      "audio/evrcnw1": {
        source: "iana",
      },
      "audio/evrcwb": {
        source: "iana",
      },
      "audio/evrcwb0": {
        source: "iana",
      },
      "audio/evrcwb1": {
        source: "iana",
      },
      "audio/evs": {
        source: "iana",
      },
      "audio/flexfec": {
        source: "iana",
      },
      "audio/fwdred": {
        source: "iana",
      },
      "audio/g711-0": {
        source: "iana",
      },
      "audio/g719": {
        source: "iana",
      },
      "audio/g722": {
        source: "iana",
      },
      "audio/g7221": {
        source: "iana",
      },
      "audio/g723": {
        source: "iana",
      },
      "audio/g726-16": {
        source: "iana",
      },
      "audio/g726-24": {
        source: "iana",
      },
      "audio/g726-32": {
        source: "iana",
      },
      "audio/g726-40": {
        source: "iana",
      },
      "audio/g728": {
        source: "iana",
      },
      "audio/g729": {
        source: "iana",
      },
      "audio/g7291": {
        source: "iana",
      },
      "audio/g729d": {
        source: "iana",
      },
      "audio/g729e": {
        source: "iana",
      },
      "audio/gsm": {
        source: "iana",
      },
      "audio/gsm-efr": {
        source: "iana",
      },
      "audio/gsm-hr-08": {
        source: "iana",
      },
      "audio/ilbc": {
        source: "iana",
      },
      "audio/ip-mr_v2.5": {
        source: "iana",
      },
      "audio/isac": {
        source: "apache",
      },
      "audio/l16": {
        source: "iana",
      },
      "audio/l20": {
        source: "iana",
      },
      "audio/l24": {
        source: "iana",
        compressible: false,
      },
      "audio/l8": {
        source: "iana",
      },
      "audio/lpc": {
        source: "iana",
      },
      "audio/melp": {
        source: "iana",
      },
      "audio/melp1200": {
        source: "iana",
      },
      "audio/melp2400": {
        source: "iana",
      },
      "audio/melp600": {
        source: "iana",
      },
      "audio/mhas": {
        source: "iana",
      },
      "audio/midi": {
        source: "apache",
        extensions: ["mid", "midi", "kar", "rmi"],
      },
      "audio/mobile-xmf": {
        source: "iana",
        extensions: ["mxmf"],
      },
      "audio/mp3": {
        compressible: false,
        extensions: ["mp3"],
      },
      "audio/mp4": {
        source: "iana",
        compressible: false,
        extensions: ["m4a", "mp4a"],
      },
      "audio/mp4a-latm": {
        source: "iana",
      },
      "audio/mpa": {
        source: "iana",
      },
      "audio/mpa-robust": {
        source: "iana",
      },
      "audio/mpeg": {
        source: "iana",
        compressible: false,
        extensions: ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"],
      },
      "audio/mpeg4-generic": {
        source: "iana",
      },
      "audio/musepack": {
        source: "apache",
      },
      "audio/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["oga", "ogg", "spx", "opus"],
      },
      "audio/opus": {
        source: "iana",
      },
      "audio/parityfec": {
        source: "iana",
      },
      "audio/pcma": {
        source: "iana",
      },
      "audio/pcma-wb": {
        source: "iana",
      },
      "audio/pcmu": {
        source: "iana",
      },
      "audio/pcmu-wb": {
        source: "iana",
      },
      "audio/prs.sid": {
        source: "iana",
      },
      "audio/qcelp": {
        source: "iana",
      },
      "audio/raptorfec": {
        source: "iana",
      },
      "audio/red": {
        source: "iana",
      },
      "audio/rtp-enc-aescm128": {
        source: "iana",
      },
      "audio/rtp-midi": {
        source: "iana",
      },
      "audio/rtploopback": {
        source: "iana",
      },
      "audio/rtx": {
        source: "iana",
      },
      "audio/s3m": {
        source: "apache",
        extensions: ["s3m"],
      },
      "audio/scip": {
        source: "iana",
      },
      "audio/silk": {
        source: "apache",
        extensions: ["sil"],
      },
      "audio/smv": {
        source: "iana",
      },
      "audio/smv-qcp": {
        source: "iana",
      },
      "audio/smv0": {
        source: "iana",
      },
      "audio/sofa": {
        source: "iana",
      },
      "audio/sp-midi": {
        source: "iana",
      },
      "audio/speex": {
        source: "iana",
      },
      "audio/t140c": {
        source: "iana",
      },
      "audio/t38": {
        source: "iana",
      },
      "audio/telephone-event": {
        source: "iana",
      },
      "audio/tetra_acelp": {
        source: "iana",
      },
      "audio/tetra_acelp_bb": {
        source: "iana",
      },
      "audio/tone": {
        source: "iana",
      },
      "audio/tsvcis": {
        source: "iana",
      },
      "audio/uemclip": {
        source: "iana",
      },
      "audio/ulpfec": {
        source: "iana",
      },
      "audio/usac": {
        source: "iana",
      },
      "audio/vdvi": {
        source: "iana",
      },
      "audio/vmr-wb": {
        source: "iana",
      },
      "audio/vnd.3gpp.iufp": {
        source: "iana",
      },
      "audio/vnd.4sb": {
        source: "iana",
      },
      "audio/vnd.audiokoz": {
        source: "iana",
      },
      "audio/vnd.celp": {
        source: "iana",
      },
      "audio/vnd.cisco.nse": {
        source: "iana",
      },
      "audio/vnd.cmles.radio-events": {
        source: "iana",
      },
      "audio/vnd.cns.anp1": {
        source: "iana",
      },
      "audio/vnd.cns.inf1": {
        source: "iana",
      },
      "audio/vnd.dece.audio": {
        source: "iana",
        extensions: ["uva", "uvva"],
      },
      "audio/vnd.digital-winds": {
        source: "iana",
        extensions: ["eol"],
      },
      "audio/vnd.dlna.adts": {
        source: "iana",
      },
      "audio/vnd.dolby.heaac.1": {
        source: "iana",
      },
      "audio/vnd.dolby.heaac.2": {
        source: "iana",
      },
      "audio/vnd.dolby.mlp": {
        source: "iana",
      },
      "audio/vnd.dolby.mps": {
        source: "iana",
      },
      "audio/vnd.dolby.pl2": {
        source: "iana",
      },
      "audio/vnd.dolby.pl2x": {
        source: "iana",
      },
      "audio/vnd.dolby.pl2z": {
        source: "iana",
      },
      "audio/vnd.dolby.pulse.1": {
        source: "iana",
      },
      "audio/vnd.dra": {
        source: "iana",
        extensions: ["dra"],
      },
      "audio/vnd.dts": {
        source: "iana",
        extensions: ["dts"],
      },
      "audio/vnd.dts.hd": {
        source: "iana",
        extensions: ["dtshd"],
      },
      "audio/vnd.dts.uhd": {
        source: "iana",
      },
      "audio/vnd.dvb.file": {
        source: "iana",
      },
      "audio/vnd.everad.plj": {
        source: "iana",
      },
      "audio/vnd.hns.audio": {
        source: "iana",
      },
      "audio/vnd.lucent.voice": {
        source: "iana",
        extensions: ["lvp"],
      },
      "audio/vnd.ms-playready.media.pya": {
        source: "iana",
        extensions: ["pya"],
      },
      "audio/vnd.nokia.mobile-xmf": {
        source: "iana",
      },
      "audio/vnd.nortel.vbk": {
        source: "iana",
      },
      "audio/vnd.nuera.ecelp4800": {
        source: "iana",
        extensions: ["ecelp4800"],
      },
      "audio/vnd.nuera.ecelp7470": {
        source: "iana",
        extensions: ["ecelp7470"],
      },
      "audio/vnd.nuera.ecelp9600": {
        source: "iana",
        extensions: ["ecelp9600"],
      },
      "audio/vnd.octel.sbc": {
        source: "iana",
      },
      "audio/vnd.presonus.multitrack": {
        source: "iana",
      },
      "audio/vnd.qcelp": {
        source: "iana",
      },
      "audio/vnd.rhetorex.32kadpcm": {
        source: "iana",
      },
      "audio/vnd.rip": {
        source: "iana",
        extensions: ["rip"],
      },
      "audio/vnd.rn-realaudio": {
        compressible: false,
      },
      "audio/vnd.sealedmedia.softseal.mpeg": {
        source: "iana",
      },
      "audio/vnd.vmx.cvsd": {
        source: "iana",
      },
      "audio/vnd.wave": {
        compressible: false,
      },
      "audio/vorbis": {
        source: "iana",
        compressible: false,
      },
      "audio/vorbis-config": {
        source: "iana",
      },
      "audio/wav": {
        compressible: false,
        extensions: ["wav"],
      },
      "audio/wave": {
        compressible: false,
        extensions: ["wav"],
      },
      "audio/webm": {
        source: "apache",
        compressible: false,
        extensions: ["weba"],
      },
      "audio/x-aac": {
        source: "apache",
        compressible: false,
        extensions: ["aac"],
      },
      "audio/x-aiff": {
        source: "apache",
        extensions: ["aif", "aiff", "aifc"],
      },
      "audio/x-caf": {
        source: "apache",
        compressible: false,
        extensions: ["caf"],
      },
      "audio/x-flac": {
        source: "apache",
        extensions: ["flac"],
      },
      "audio/x-m4a": {
        source: "nginx",
        extensions: ["m4a"],
      },
      "audio/x-matroska": {
        source: "apache",
        extensions: ["mka"],
      },
      "audio/x-mpegurl": {
        source: "apache",
        extensions: ["m3u"],
      },
      "audio/x-ms-wax": {
        source: "apache",
        extensions: ["wax"],
      },
      "audio/x-ms-wma": {
        source: "apache",
        extensions: ["wma"],
      },
      "audio/x-pn-realaudio": {
        source: "apache",
        extensions: ["ram", "ra"],
      },
      "audio/x-pn-realaudio-plugin": {
        source: "apache",
        extensions: ["rmp"],
      },
      "audio/x-realaudio": {
        source: "nginx",
        extensions: ["ra"],
      },
      "audio/x-tta": {
        source: "apache",
      },
      "audio/x-wav": {
        source: "apache",
        extensions: ["wav"],
      },
      "audio/xm": {
        source: "apache",
        extensions: ["xm"],
      },
      "chemical/x-cdx": {
        source: "apache",
        extensions: ["cdx"],
      },
      "chemical/x-cif": {
        source: "apache",
        extensions: ["cif"],
      },
      "chemical/x-cmdf": {
        source: "apache",
        extensions: ["cmdf"],
      },
      "chemical/x-cml": {
        source: "apache",
        extensions: ["cml"],
      },
      "chemical/x-csml": {
        source: "apache",
        extensions: ["csml"],
      },
      "chemical/x-pdb": {
        source: "apache",
      },
      "chemical/x-xyz": {
        source: "apache",
        extensions: ["xyz"],
      },
      "font/collection": {
        source: "iana",
        extensions: ["ttc"],
      },
      "font/otf": {
        source: "iana",
        compressible: true,
        extensions: ["otf"],
      },
      "font/sfnt": {
        source: "iana",
      },
      "font/ttf": {
        source: "iana",
        compressible: true,
        extensions: ["ttf"],
      },
      "font/woff": {
        source: "iana",
        extensions: ["woff"],
      },
      "font/woff2": {
        source: "iana",
        extensions: ["woff2"],
      },
      "image/aces": {
        source: "iana",
        extensions: ["exr"],
      },
      "image/apng": {
        compressible: false,
        extensions: ["apng"],
      },
      "image/avci": {
        source: "iana",
        extensions: ["avci"],
      },
      "image/avcs": {
        source: "iana",
        extensions: ["avcs"],
      },
      "image/avif": {
        source: "iana",
        compressible: false,
        extensions: ["avif"],
      },
      "image/bmp": {
        source: "iana",
        compressible: true,
        extensions: ["bmp"],
      },
      "image/cgm": {
        source: "iana",
        extensions: ["cgm"],
      },
      "image/dicom-rle": {
        source: "iana",
        extensions: ["drle"],
      },
      "image/emf": {
        source: "iana",
        extensions: ["emf"],
      },
      "image/fits": {
        source: "iana",
        extensions: ["fits"],
      },
      "image/g3fax": {
        source: "iana",
        extensions: ["g3"],
      },
      "image/gif": {
        source: "iana",
        compressible: false,
        extensions: ["gif"],
      },
      "image/heic": {
        source: "iana",
        extensions: ["heic"],
      },
      "image/heic-sequence": {
        source: "iana",
        extensions: ["heics"],
      },
      "image/heif": {
        source: "iana",
        extensions: ["heif"],
      },
      "image/heif-sequence": {
        source: "iana",
        extensions: ["heifs"],
      },
      "image/hej2k": {
        source: "iana",
        extensions: ["hej2"],
      },
      "image/hsj2": {
        source: "iana",
        extensions: ["hsj2"],
      },
      "image/ief": {
        source: "iana",
        extensions: ["ief"],
      },
      "image/jls": {
        source: "iana",
        extensions: ["jls"],
      },
      "image/jp2": {
        source: "iana",
        compressible: false,
        extensions: ["jp2", "jpg2"],
      },
      "image/jpeg": {
        source: "iana",
        compressible: false,
        extensions: ["jpeg", "jpg", "jpe"],
      },
      "image/jph": {
        source: "iana",
        extensions: ["jph"],
      },
      "image/jphc": {
        source: "iana",
        extensions: ["jhc"],
      },
      "image/jpm": {
        source: "iana",
        compressible: false,
        extensions: ["jpm"],
      },
      "image/jpx": {
        source: "iana",
        compressible: false,
        extensions: ["jpx", "jpf"],
      },
      "image/jxr": {
        source: "iana",
        extensions: ["jxr"],
      },
      "image/jxra": {
        source: "iana",
        extensions: ["jxra"],
      },
      "image/jxrs": {
        source: "iana",
        extensions: ["jxrs"],
      },
      "image/jxs": {
        source: "iana",
        extensions: ["jxs"],
      },
      "image/jxsc": {
        source: "iana",
        extensions: ["jxsc"],
      },
      "image/jxsi": {
        source: "iana",
        extensions: ["jxsi"],
      },
      "image/jxss": {
        source: "iana",
        extensions: ["jxss"],
      },
      "image/ktx": {
        source: "iana",
        extensions: ["ktx"],
      },
      "image/ktx2": {
        source: "iana",
        extensions: ["ktx2"],
      },
      "image/naplps": {
        source: "iana",
      },
      "image/pjpeg": {
        compressible: false,
      },
      "image/png": {
        source: "iana",
        compressible: false,
        extensions: ["png"],
      },
      "image/prs.btif": {
        source: "iana",
        extensions: ["btif"],
      },
      "image/prs.pti": {
        source: "iana",
        extensions: ["pti"],
      },
      "image/pwg-raster": {
        source: "iana",
      },
      "image/sgi": {
        source: "apache",
        extensions: ["sgi"],
      },
      "image/svg+xml": {
        source: "iana",
        compressible: true,
        extensions: ["svg", "svgz"],
      },
      "image/t38": {
        source: "iana",
        extensions: ["t38"],
      },
      "image/tiff": {
        source: "iana",
        compressible: false,
        extensions: ["tif", "tiff"],
      },
      "image/tiff-fx": {
        source: "iana",
        extensions: ["tfx"],
      },
      "image/vnd.adobe.photoshop": {
        source: "iana",
        compressible: true,
        extensions: ["psd"],
      },
      "image/vnd.airzip.accelerator.azv": {
        source: "iana",
        extensions: ["azv"],
      },
      "image/vnd.cns.inf2": {
        source: "iana",
      },
      "image/vnd.dece.graphic": {
        source: "iana",
        extensions: ["uvi", "uvvi", "uvg", "uvvg"],
      },
      "image/vnd.djvu": {
        source: "iana",
        extensions: ["djvu", "djv"],
      },
      "image/vnd.dvb.subtitle": {
        source: "iana",
        extensions: ["sub"],
      },
      "image/vnd.dwg": {
        source: "iana",
        extensions: ["dwg"],
      },
      "image/vnd.dxf": {
        source: "iana",
        extensions: ["dxf"],
      },
      "image/vnd.fastbidsheet": {
        source: "iana",
        extensions: ["fbs"],
      },
      "image/vnd.fpx": {
        source: "iana",
        extensions: ["fpx"],
      },
      "image/vnd.fst": {
        source: "iana",
        extensions: ["fst"],
      },
      "image/vnd.fujixerox.edmics-mmr": {
        source: "iana",
        extensions: ["mmr"],
      },
      "image/vnd.fujixerox.edmics-rlc": {
        source: "iana",
        extensions: ["rlc"],
      },
      "image/vnd.globalgraphics.pgb": {
        source: "iana",
      },
      "image/vnd.microsoft.icon": {
        source: "iana",
        compressible: true,
        extensions: ["ico"],
      },
      "image/vnd.mix": {
        source: "iana",
      },
      "image/vnd.mozilla.apng": {
        source: "iana",
      },
      "image/vnd.ms-dds": {
        compressible: true,
        extensions: ["dds"],
      },
      "image/vnd.ms-modi": {
        source: "iana",
        extensions: ["mdi"],
      },
      "image/vnd.ms-photo": {
        source: "apache",
        extensions: ["wdp"],
      },
      "image/vnd.net-fpx": {
        source: "iana",
        extensions: ["npx"],
      },
      "image/vnd.pco.b16": {
        source: "iana",
        extensions: ["b16"],
      },
      "image/vnd.radiance": {
        source: "iana",
      },
      "image/vnd.sealed.png": {
        source: "iana",
      },
      "image/vnd.sealedmedia.softseal.gif": {
        source: "iana",
      },
      "image/vnd.sealedmedia.softseal.jpg": {
        source: "iana",
      },
      "image/vnd.svf": {
        source: "iana",
      },
      "image/vnd.tencent.tap": {
        source: "iana",
        extensions: ["tap"],
      },
      "image/vnd.valve.source.texture": {
        source: "iana",
        extensions: ["vtf"],
      },
      "image/vnd.wap.wbmp": {
        source: "iana",
        extensions: ["wbmp"],
      },
      "image/vnd.xiff": {
        source: "iana",
        extensions: ["xif"],
      },
      "image/vnd.zbrush.pcx": {
        source: "iana",
        extensions: ["pcx"],
      },
      "image/webp": {
        source: "apache",
        extensions: ["webp"],
      },
      "image/wmf": {
        source: "iana",
        extensions: ["wmf"],
      },
      "image/x-3ds": {
        source: "apache",
        extensions: ["3ds"],
      },
      "image/x-cmu-raster": {
        source: "apache",
        extensions: ["ras"],
      },
      "image/x-cmx": {
        source: "apache",
        extensions: ["cmx"],
      },
      "image/x-freehand": {
        source: "apache",
        extensions: ["fh", "fhc", "fh4", "fh5", "fh7"],
      },
      "image/x-icon": {
        source: "apache",
        compressible: true,
        extensions: ["ico"],
      },
      "image/x-jng": {
        source: "nginx",
        extensions: ["jng"],
      },
      "image/x-mrsid-image": {
        source: "apache",
        extensions: ["sid"],
      },
      "image/x-ms-bmp": {
        source: "nginx",
        compressible: true,
        extensions: ["bmp"],
      },
      "image/x-pcx": {
        source: "apache",
        extensions: ["pcx"],
      },
      "image/x-pict": {
        source: "apache",
        extensions: ["pic", "pct"],
      },
      "image/x-portable-anymap": {
        source: "apache",
        extensions: ["pnm"],
      },
      "image/x-portable-bitmap": {
        source: "apache",
        extensions: ["pbm"],
      },
      "image/x-portable-graymap": {
        source: "apache",
        extensions: ["pgm"],
      },
      "image/x-portable-pixmap": {
        source: "apache",
        extensions: ["ppm"],
      },
      "image/x-rgb": {
        source: "apache",
        extensions: ["rgb"],
      },
      "image/x-tga": {
        source: "apache",
        extensions: ["tga"],
      },
      "image/x-xbitmap": {
        source: "apache",
        extensions: ["xbm"],
      },
      "image/x-xcf": {
        compressible: false,
      },
      "image/x-xpixmap": {
        source: "apache",
        extensions: ["xpm"],
      },
      "image/x-xwindowdump": {
        source: "apache",
        extensions: ["xwd"],
      },
      "message/cpim": {
        source: "iana",
      },
      "message/delivery-status": {
        source: "iana",
      },
      "message/disposition-notification": {
        source: "iana",
        extensions: ["disposition-notification"],
      },
      "message/external-body": {
        source: "iana",
      },
      "message/feedback-report": {
        source: "iana",
      },
      "message/global": {
        source: "iana",
        extensions: ["u8msg"],
      },
      "message/global-delivery-status": {
        source: "iana",
        extensions: ["u8dsn"],
      },
      "message/global-disposition-notification": {
        source: "iana",
        extensions: ["u8mdn"],
      },
      "message/global-headers": {
        source: "iana",
        extensions: ["u8hdr"],
      },
      "message/http": {
        source: "iana",
        compressible: false,
      },
      "message/imdn+xml": {
        source: "iana",
        compressible: true,
      },
      "message/news": {
        source: "iana",
      },
      "message/partial": {
        source: "iana",
        compressible: false,
      },
      "message/rfc822": {
        source: "iana",
        compressible: true,
        extensions: ["eml", "mime"],
      },
      "message/s-http": {
        source: "iana",
      },
      "message/sip": {
        source: "iana",
      },
      "message/sipfrag": {
        source: "iana",
      },
      "message/tracking-status": {
        source: "iana",
      },
      "message/vnd.si.simp": {
        source: "iana",
      },
      "message/vnd.wfa.wsc": {
        source: "iana",
        extensions: ["wsc"],
      },
      "model/3mf": {
        source: "iana",
        extensions: ["3mf"],
      },
      "model/e57": {
        source: "iana",
      },
      "model/gltf+json": {
        source: "iana",
        compressible: true,
        extensions: ["gltf"],
      },
      "model/gltf-binary": {
        source: "iana",
        compressible: true,
        extensions: ["glb"],
      },
      "model/iges": {
        source: "iana",
        compressible: false,
        extensions: ["igs", "iges"],
      },
      "model/mesh": {
        source: "iana",
        compressible: false,
        extensions: ["msh", "mesh", "silo"],
      },
      "model/mtl": {
        source: "iana",
        extensions: ["mtl"],
      },
      "model/obj": {
        source: "iana",
        extensions: ["obj"],
      },
      "model/step": {
        source: "iana",
      },
      "model/step+xml": {
        source: "iana",
        compressible: true,
        extensions: ["stpx"],
      },
      "model/step+zip": {
        source: "iana",
        compressible: false,
        extensions: ["stpz"],
      },
      "model/step-xml+zip": {
        source: "iana",
        compressible: false,
        extensions: ["stpxz"],
      },
      "model/stl": {
        source: "iana",
        extensions: ["stl"],
      },
      "model/vnd.collada+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dae"],
      },
      "model/vnd.dwf": {
        source: "iana",
        extensions: ["dwf"],
      },
      "model/vnd.flatland.3dml": {
        source: "iana",
      },
      "model/vnd.gdl": {
        source: "iana",
        extensions: ["gdl"],
      },
      "model/vnd.gs-gdl": {
        source: "apache",
      },
      "model/vnd.gs.gdl": {
        source: "iana",
      },
      "model/vnd.gtw": {
        source: "iana",
        extensions: ["gtw"],
      },
      "model/vnd.moml+xml": {
        source: "iana",
        compressible: true,
      },
      "model/vnd.mts": {
        source: "iana",
        extensions: ["mts"],
      },
      "model/vnd.opengex": {
        source: "iana",
        extensions: ["ogex"],
      },
      "model/vnd.parasolid.transmit.binary": {
        source: "iana",
        extensions: ["x_b"],
      },
      "model/vnd.parasolid.transmit.text": {
        source: "iana",
        extensions: ["x_t"],
      },
      "model/vnd.pytha.pyox": {
        source: "iana",
      },
      "model/vnd.rosette.annotated-data-model": {
        source: "iana",
      },
      "model/vnd.sap.vds": {
        source: "iana",
        extensions: ["vds"],
      },
      "model/vnd.usdz+zip": {
        source: "iana",
        compressible: false,
        extensions: ["usdz"],
      },
      "model/vnd.valve.source.compiled-map": {
        source: "iana",
        extensions: ["bsp"],
      },
      "model/vnd.vtu": {
        source: "iana",
        extensions: ["vtu"],
      },
      "model/vrml": {
        source: "iana",
        compressible: false,
        extensions: ["wrl", "vrml"],
      },
      "model/x3d+binary": {
        source: "apache",
        compressible: false,
        extensions: ["x3db", "x3dbz"],
      },
      "model/x3d+fastinfoset": {
        source: "iana",
        extensions: ["x3db"],
      },
      "model/x3d+vrml": {
        source: "apache",
        compressible: false,
        extensions: ["x3dv", "x3dvz"],
      },
      "model/x3d+xml": {
        source: "iana",
        compressible: true,
        extensions: ["x3d", "x3dz"],
      },
      "model/x3d-vrml": {
        source: "iana",
        extensions: ["x3dv"],
      },
      "multipart/alternative": {
        source: "iana",
        compressible: false,
      },
      "multipart/appledouble": {
        source: "iana",
      },
      "multipart/byteranges": {
        source: "iana",
      },
      "multipart/digest": {
        source: "iana",
      },
      "multipart/encrypted": {
        source: "iana",
        compressible: false,
      },
      "multipart/form-data": {
        source: "iana",
        compressible: false,
      },
      "multipart/header-set": {
        source: "iana",
      },
      "multipart/mixed": {
        source: "iana",
      },
      "multipart/multilingual": {
        source: "iana",
      },
      "multipart/parallel": {
        source: "iana",
      },
      "multipart/related": {
        source: "iana",
        compressible: false,
      },
      "multipart/report": {
        source: "iana",
      },
      "multipart/signed": {
        source: "iana",
        compressible: false,
      },
      "multipart/vnd.bint.med-plus": {
        source: "iana",
      },
      "multipart/voice-message": {
        source: "iana",
      },
      "multipart/x-mixed-replace": {
        source: "iana",
      },
      "text/1d-interleaved-parityfec": {
        source: "iana",
      },
      "text/cache-manifest": {
        source: "iana",
        compressible: true,
        extensions: ["appcache", "manifest"],
      },
      "text/calendar": {
        source: "iana",
        extensions: ["ics", "ifb"],
      },
      "text/calender": {
        compressible: true,
      },
      "text/cmd": {
        compressible: true,
      },
      "text/coffeescript": {
        extensions: ["coffee", "litcoffee"],
      },
      "text/cql": {
        source: "iana",
      },
      "text/cql-expression": {
        source: "iana",
      },
      "text/cql-identifier": {
        source: "iana",
      },
      "text/css": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["css"],
      },
      "text/csv": {
        source: "iana",
        compressible: true,
        extensions: ["csv"],
      },
      "text/csv-schema": {
        source: "iana",
      },
      "text/directory": {
        source: "iana",
      },
      "text/dns": {
        source: "iana",
      },
      "text/ecmascript": {
        source: "iana",
      },
      "text/encaprtp": {
        source: "iana",
      },
      "text/enriched": {
        source: "iana",
      },
      "text/fhirpath": {
        source: "iana",
      },
      "text/flexfec": {
        source: "iana",
      },
      "text/fwdred": {
        source: "iana",
      },
      "text/gff3": {
        source: "iana",
      },
      "text/grammar-ref-list": {
        source: "iana",
      },
      "text/html": {
        source: "iana",
        compressible: true,
        extensions: ["html", "htm", "shtml"],
      },
      "text/jade": {
        extensions: ["jade"],
      },
      "text/javascript": {
        source: "iana",
        compressible: true,
      },
      "text/jcr-cnd": {
        source: "iana",
      },
      "text/jsx": {
        compressible: true,
        extensions: ["jsx"],
      },
      "text/less": {
        compressible: true,
        extensions: ["less"],
      },
      "text/markdown": {
        source: "iana",
        compressible: true,
        extensions: ["markdown", "md"],
      },
      "text/mathml": {
        source: "nginx",
        extensions: ["mml"],
      },
      "text/mdx": {
        compressible: true,
        extensions: ["mdx"],
      },
      "text/mizar": {
        source: "iana",
      },
      "text/n3": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["n3"],
      },
      "text/parameters": {
        source: "iana",
        charset: "UTF-8",
      },
      "text/parityfec": {
        source: "iana",
      },
      "text/plain": {
        source: "iana",
        compressible: true,
        extensions: ["txt", "text", "conf", "def", "list", "log", "in", "ini"],
      },
      "text/provenance-notation": {
        source: "iana",
        charset: "UTF-8",
      },
      "text/prs.fallenstein.rst": {
        source: "iana",
      },
      "text/prs.lines.tag": {
        source: "iana",
        extensions: ["dsc"],
      },
      "text/prs.prop.logic": {
        source: "iana",
      },
      "text/raptorfec": {
        source: "iana",
      },
      "text/red": {
        source: "iana",
      },
      "text/rfc822-headers": {
        source: "iana",
      },
      "text/richtext": {
        source: "iana",
        compressible: true,
        extensions: ["rtx"],
      },
      "text/rtf": {
        source: "iana",
        compressible: true,
        extensions: ["rtf"],
      },
      "text/rtp-enc-aescm128": {
        source: "iana",
      },
      "text/rtploopback": {
        source: "iana",
      },
      "text/rtx": {
        source: "iana",
      },
      "text/sgml": {
        source: "iana",
        extensions: ["sgml", "sgm"],
      },
      "text/shaclc": {
        source: "iana",
      },
      "text/shex": {
        source: "iana",
        extensions: ["shex"],
      },
      "text/slim": {
        extensions: ["slim", "slm"],
      },
      "text/spdx": {
        source: "iana",
        extensions: ["spdx"],
      },
      "text/strings": {
        source: "iana",
      },
      "text/stylus": {
        extensions: ["stylus", "styl"],
      },
      "text/t140": {
        source: "iana",
      },
      "text/tab-separated-values": {
        source: "iana",
        compressible: true,
        extensions: ["tsv"],
      },
      "text/troff": {
        source: "iana",
        extensions: ["t", "tr", "roff", "man", "me", "ms"],
      },
      "text/turtle": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["ttl"],
      },
      "text/ulpfec": {
        source: "iana",
      },
      "text/uri-list": {
        source: "iana",
        compressible: true,
        extensions: ["uri", "uris", "urls"],
      },
      "text/vcard": {
        source: "iana",
        compressible: true,
        extensions: ["vcard"],
      },
      "text/vnd.a": {
        source: "iana",
      },
      "text/vnd.abc": {
        source: "iana",
      },
      "text/vnd.ascii-art": {
        source: "iana",
      },
      "text/vnd.curl": {
        source: "iana",
        extensions: ["curl"],
      },
      "text/vnd.curl.dcurl": {
        source: "apache",
        extensions: ["dcurl"],
      },
      "text/vnd.curl.mcurl": {
        source: "apache",
        extensions: ["mcurl"],
      },
      "text/vnd.curl.scurl": {
        source: "apache",
        extensions: ["scurl"],
      },
      "text/vnd.debian.copyright": {
        source: "iana",
        charset: "UTF-8",
      },
      "text/vnd.dmclientscript": {
        source: "iana",
      },
      "text/vnd.dvb.subtitle": {
        source: "iana",
        extensions: ["sub"],
      },
      "text/vnd.esmertec.theme-descriptor": {
        source: "iana",
        charset: "UTF-8",
      },
      "text/vnd.familysearch.gedcom": {
        source: "iana",
        extensions: ["ged"],
      },
      "text/vnd.ficlab.flt": {
        source: "iana",
      },
      "text/vnd.fly": {
        source: "iana",
        extensions: ["fly"],
      },
      "text/vnd.fmi.flexstor": {
        source: "iana",
        extensions: ["flx"],
      },
      "text/vnd.gml": {
        source: "iana",
      },
      "text/vnd.graphviz": {
        source: "iana",
        extensions: ["gv"],
      },
      "text/vnd.hans": {
        source: "iana",
      },
      "text/vnd.hgl": {
        source: "iana",
      },
      "text/vnd.in3d.3dml": {
        source: "iana",
        extensions: ["3dml"],
      },
      "text/vnd.in3d.spot": {
        source: "iana",
        extensions: ["spot"],
      },
      "text/vnd.iptc.newsml": {
        source: "iana",
      },
      "text/vnd.iptc.nitf": {
        source: "iana",
      },
      "text/vnd.latex-z": {
        source: "iana",
      },
      "text/vnd.motorola.reflex": {
        source: "iana",
      },
      "text/vnd.ms-mediapackage": {
        source: "iana",
      },
      "text/vnd.net2phone.commcenter.command": {
        source: "iana",
      },
      "text/vnd.radisys.msml-basic-layout": {
        source: "iana",
      },
      "text/vnd.senx.warpscript": {
        source: "iana",
      },
      "text/vnd.si.uricatalogue": {
        source: "iana",
      },
      "text/vnd.sosi": {
        source: "iana",
      },
      "text/vnd.sun.j2me.app-descriptor": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["jad"],
      },
      "text/vnd.trolltech.linguist": {
        source: "iana",
        charset: "UTF-8",
      },
      "text/vnd.wap.si": {
        source: "iana",
      },
      "text/vnd.wap.sl": {
        source: "iana",
      },
      "text/vnd.wap.wml": {
        source: "iana",
        extensions: ["wml"],
      },
      "text/vnd.wap.wmlscript": {
        source: "iana",
        extensions: ["wmls"],
      },
      "text/vtt": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["vtt"],
      },
      "text/x-asm": {
        source: "apache",
        extensions: ["s", "asm"],
      },
      "text/x-c": {
        source: "apache",
        extensions: ["c", "cc", "cxx", "cpp", "h", "hh", "dic"],
      },
      "text/x-component": {
        source: "nginx",
        extensions: ["htc"],
      },
      "text/x-fortran": {
        source: "apache",
        extensions: ["f", "for", "f77", "f90"],
      },
      "text/x-gwt-rpc": {
        compressible: true,
      },
      "text/x-handlebars-template": {
        extensions: ["hbs"],
      },
      "text/x-java-source": {
        source: "apache",
        extensions: ["java"],
      },
      "text/x-jquery-tmpl": {
        compressible: true,
      },
      "text/x-lua": {
        extensions: ["lua"],
      },
      "text/x-markdown": {
        compressible: true,
        extensions: ["mkd"],
      },
      "text/x-nfo": {
        source: "apache",
        extensions: ["nfo"],
      },
      "text/x-opml": {
        source: "apache",
        extensions: ["opml"],
      },
      "text/x-org": {
        compressible: true,
        extensions: ["org"],
      },
      "text/x-pascal": {
        source: "apache",
        extensions: ["p", "pas"],
      },
      "text/x-processing": {
        compressible: true,
        extensions: ["pde"],
      },
      "text/x-sass": {
        extensions: ["sass"],
      },
      "text/x-scss": {
        extensions: ["scss"],
      },
      "text/x-setext": {
        source: "apache",
        extensions: ["etx"],
      },
      "text/x-sfv": {
        source: "apache",
        extensions: ["sfv"],
      },
      "text/x-suse-ymp": {
        compressible: true,
        extensions: ["ymp"],
      },
      "text/x-uuencode": {
        source: "apache",
        extensions: ["uu"],
      },
      "text/x-vcalendar": {
        source: "apache",
        extensions: ["vcs"],
      },
      "text/x-vcard": {
        source: "apache",
        extensions: ["vcf"],
      },
      "text/xml": {
        source: "iana",
        compressible: true,
        extensions: ["xml"],
      },
      "text/xml-external-parsed-entity": {
        source: "iana",
      },
      "text/yaml": {
        compressible: true,
        extensions: ["yaml", "yml"],
      },
      "video/1d-interleaved-parityfec": {
        source: "iana",
      },
      "video/3gpp": {
        source: "iana",
        extensions: ["3gp", "3gpp"],
      },
      "video/3gpp-tt": {
        source: "iana",
      },
      "video/3gpp2": {
        source: "iana",
        extensions: ["3g2"],
      },
      "video/av1": {
        source: "iana",
      },
      "video/bmpeg": {
        source: "iana",
      },
      "video/bt656": {
        source: "iana",
      },
      "video/celb": {
        source: "iana",
      },
      "video/dv": {
        source: "iana",
      },
      "video/encaprtp": {
        source: "iana",
      },
      "video/ffv1": {
        source: "iana",
      },
      "video/flexfec": {
        source: "iana",
      },
      "video/h261": {
        source: "iana",
        extensions: ["h261"],
      },
      "video/h263": {
        source: "iana",
        extensions: ["h263"],
      },
      "video/h263-1998": {
        source: "iana",
      },
      "video/h263-2000": {
        source: "iana",
      },
      "video/h264": {
        source: "iana",
        extensions: ["h264"],
      },
      "video/h264-rcdo": {
        source: "iana",
      },
      "video/h264-svc": {
        source: "iana",
      },
      "video/h265": {
        source: "iana",
      },
      "video/iso.segment": {
        source: "iana",
        extensions: ["m4s"],
      },
      "video/jpeg": {
        source: "iana",
        extensions: ["jpgv"],
      },
      "video/jpeg2000": {
        source: "iana",
      },
      "video/jpm": {
        source: "apache",
        extensions: ["jpm", "jpgm"],
      },
      "video/jxsv": {
        source: "iana",
      },
      "video/mj2": {
        source: "iana",
        extensions: ["mj2", "mjp2"],
      },
      "video/mp1s": {
        source: "iana",
      },
      "video/mp2p": {
        source: "iana",
      },
      "video/mp2t": {
        source: "iana",
        extensions: ["ts"],
      },
      "video/mp4": {
        source: "iana",
        compressible: false,
        extensions: ["mp4", "mp4v", "mpg4"],
      },
      "video/mp4v-es": {
        source: "iana",
      },
      "video/mpeg": {
        source: "iana",
        compressible: false,
        extensions: ["mpeg", "mpg", "mpe", "m1v", "m2v"],
      },
      "video/mpeg4-generic": {
        source: "iana",
      },
      "video/mpv": {
        source: "iana",
      },
      "video/nv": {
        source: "iana",
      },
      "video/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["ogv"],
      },
      "video/parityfec": {
        source: "iana",
      },
      "video/pointer": {
        source: "iana",
      },
      "video/quicktime": {
        source: "iana",
        compressible: false,
        extensions: ["qt", "mov"],
      },
      "video/raptorfec": {
        source: "iana",
      },
      "video/raw": {
        source: "iana",
      },
      "video/rtp-enc-aescm128": {
        source: "iana",
      },
      "video/rtploopback": {
        source: "iana",
      },
      "video/rtx": {
        source: "iana",
      },
      "video/scip": {
        source: "iana",
      },
      "video/smpte291": {
        source: "iana",
      },
      "video/smpte292m": {
        source: "iana",
      },
      "video/ulpfec": {
        source: "iana",
      },
      "video/vc1": {
        source: "iana",
      },
      "video/vc2": {
        source: "iana",
      },
      "video/vnd.cctv": {
        source: "iana",
      },
      "video/vnd.dece.hd": {
        source: "iana",
        extensions: ["uvh", "uvvh"],
      },
      "video/vnd.dece.mobile": {
        source: "iana",
        extensions: ["uvm", "uvvm"],
      },
      "video/vnd.dece.mp4": {
        source: "iana",
      },
      "video/vnd.dece.pd": {
        source: "iana",
        extensions: ["uvp", "uvvp"],
      },
      "video/vnd.dece.sd": {
        source: "iana",
        extensions: ["uvs", "uvvs"],
      },
      "video/vnd.dece.video": {
        source: "iana",
        extensions: ["uvv", "uvvv"],
      },
      "video/vnd.directv.mpeg": {
        source: "iana",
      },
      "video/vnd.directv.mpeg-tts": {
        source: "iana",
      },
      "video/vnd.dlna.mpeg-tts": {
        source: "iana",
      },
      "video/vnd.dvb.file": {
        source: "iana",
        extensions: ["dvb"],
      },
      "video/vnd.fvt": {
        source: "iana",
        extensions: ["fvt"],
      },
      "video/vnd.hns.video": {
        source: "iana",
      },
      "video/vnd.iptvforum.1dparityfec-1010": {
        source: "iana",
      },
      "video/vnd.iptvforum.1dparityfec-2005": {
        source: "iana",
      },
      "video/vnd.iptvforum.2dparityfec-1010": {
        source: "iana",
      },
      "video/vnd.iptvforum.2dparityfec-2005": {
        source: "iana",
      },
      "video/vnd.iptvforum.ttsavc": {
        source: "iana",
      },
      "video/vnd.iptvforum.ttsmpeg2": {
        source: "iana",
      },
      "video/vnd.motorola.video": {
        source: "iana",
      },
      "video/vnd.motorola.videop": {
        source: "iana",
      },
      "video/vnd.mpegurl": {
        source: "iana",
        extensions: ["mxu", "m4u"],
      },
      "video/vnd.ms-playready.media.pyv": {
        source: "iana",
        extensions: ["pyv"],
      },
      "video/vnd.nokia.interleaved-multimedia": {
        source: "iana",
      },
      "video/vnd.nokia.mp4vr": {
        source: "iana",
      },
      "video/vnd.nokia.videovoip": {
        source: "iana",
      },
      "video/vnd.objectvideo": {
        source: "iana",
      },
      "video/vnd.radgamettools.bink": {
        source: "iana",
      },
      "video/vnd.radgamettools.smacker": {
        source: "iana",
      },
      "video/vnd.sealed.mpeg1": {
        source: "iana",
      },
      "video/vnd.sealed.mpeg4": {
        source: "iana",
      },
      "video/vnd.sealed.swf": {
        source: "iana",
      },
      "video/vnd.sealedmedia.softseal.mov": {
        source: "iana",
      },
      "video/vnd.uvvu.mp4": {
        source: "iana",
        extensions: ["uvu", "uvvu"],
      },
      "video/vnd.vivo": {
        source: "iana",
        extensions: ["viv"],
      },
      "video/vnd.youtube.yt": {
        source: "iana",
      },
      "video/vp8": {
        source: "iana",
      },
      "video/vp9": {
        source: "iana",
      },
      "video/webm": {
        source: "apache",
        compressible: false,
        extensions: ["webm"],
      },
      "video/x-f4v": {
        source: "apache",
        extensions: ["f4v"],
      },
      "video/x-fli": {
        source: "apache",
        extensions: ["fli"],
      },
      "video/x-flv": {
        source: "apache",
        compressible: false,
        extensions: ["flv"],
      },
      "video/x-m4v": {
        source: "apache",
        extensions: ["m4v"],
      },
      "video/x-matroska": {
        source: "apache",
        compressible: false,
        extensions: ["mkv", "mk3d", "mks"],
      },
      "video/x-mng": {
        source: "apache",
        extensions: ["mng"],
      },
      "video/x-ms-asf": {
        source: "apache",
        extensions: ["asf", "asx"],
      },
      "video/x-ms-vob": {
        source: "apache",
        extensions: ["vob"],
      },
      "video/x-ms-wm": {
        source: "apache",
        extensions: ["wm"],
      },
      "video/x-ms-wmv": {
        source: "apache",
        compressible: false,
        extensions: ["wmv"],
      },
      "video/x-ms-wmx": {
        source: "apache",
        extensions: ["wmx"],
      },
      "video/x-ms-wvx": {
        source: "apache",
        extensions: ["wvx"],
      },
      "video/x-msvideo": {
        source: "apache",
        extensions: ["avi"],
      },
      "video/x-sgi-movie": {
        source: "apache",
        extensions: ["movie"],
      },
      "video/x-smv": {
        source: "apache",
        extensions: ["smv"],
      },
      "x-conference/x-cooltalk": {
        source: "apache",
        extensions: ["ice"],
      },
      "x-shader/x-fragment": {
        compressible: true,
      },
      "x-shader/x-vertex": {
        compressible: true,
      },
    };
  },
});

// node_modules/.pnpm/mime-db@1.52.0/node_modules/mime-db/index.js
var require_mime_db = __commonJS({
  "node_modules/.pnpm/mime-db@1.52.0/node_modules/mime-db/index.js"(exports2, module2) {
    module2.exports = require_db();
  },
});

// node_modules/.pnpm/mime-types@2.1.35/node_modules/mime-types/index.js
var require_mime_types = __commonJS({
  "node_modules/.pnpm/mime-types@2.1.35/node_modules/mime-types/index.js"(exports2) {
    "use strict";
    var db = require_mime_db();
    var extname = require("path").extname;
    var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/;
    var TEXT_TYPE_REGEXP = /^text\//i;
    exports2.charset = charset;
    exports2.charsets = { lookup: charset };
    exports2.contentType = contentType;
    exports2.extension = extension;
    exports2.extensions = /* @__PURE__ */ Object.create(null);
    exports2.lookup = lookup;
    exports2.types = /* @__PURE__ */ Object.create(null);
    populateMaps(exports2.extensions, exports2.types);
    function charset(type) {
      if (!type || typeof type !== "string") {
        return false;
      }
      var match = EXTRACT_TYPE_REGEXP.exec(type);
      var mime = match && db[match[1].toLowerCase()];
      if (mime && mime.charset) {
        return mime.charset;
      }
      if (match && TEXT_TYPE_REGEXP.test(match[1])) {
        return "UTF-8";
      }
      return false;
    }
    function contentType(str) {
      if (!str || typeof str !== "string") {
        return false;
      }
      var mime = str.indexOf("/") === -1 ? exports2.lookup(str) : str;
      if (!mime) {
        return false;
      }
      if (mime.indexOf("charset") === -1) {
        var charset2 = exports2.charset(mime);
        if (charset2) mime += "; charset=" + charset2.toLowerCase();
      }
      return mime;
    }
    function extension(type) {
      if (!type || typeof type !== "string") {
        return false;
      }
      var match = EXTRACT_TYPE_REGEXP.exec(type);
      var exts = match && exports2.extensions[match[1].toLowerCase()];
      if (!exts || !exts.length) {
        return false;
      }
      return exts[0];
    }
    function lookup(path2) {
      if (!path2 || typeof path2 !== "string") {
        return false;
      }
      var extension2 = extname("x." + path2)
        .toLowerCase()
        .substr(1);
      if (!extension2) {
        return false;
      }
      return exports2.types[extension2] || false;
    }
    function populateMaps(extensions, types) {
      var preference = ["nginx", "apache", void 0, "iana"];
      Object.keys(db).forEach(function forEachMimeType(type) {
        var mime = db[type];
        var exts = mime.extensions;
        if (!exts || !exts.length) {
          return;
        }
        extensions[type] = exts;
        for (var i = 0; i < exts.length; i++) {
          var extension2 = exts[i];
          if (types[extension2]) {
            var from = preference.indexOf(db[types[extension2]].source);
            var to = preference.indexOf(mime.source);
            if (
              types[extension2] !== "application/octet-stream" &&
              (from > to ||
                (from === to && types[extension2].substr(0, 12) === "application/"))
            ) {
              continue;
            }
          }
          types[extension2] = type;
        }
      });
    }
  },
});

// node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/lib/defer.js
var require_defer = __commonJS({
  "node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/lib/defer.js"(
    exports2,
    module2,
  ) {
    module2.exports = defer;
    function defer(fn) {
      var nextTick =
        typeof setImmediate == "function"
          ? setImmediate
          : typeof process == "object" && typeof process.nextTick == "function"
            ? process.nextTick
            : null;
      if (nextTick) {
        nextTick(fn);
      } else {
        setTimeout(fn, 0);
      }
    }
  },
});

// node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/lib/async.js
var require_async = __commonJS({
  "node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/lib/async.js"(
    exports2,
    module2,
  ) {
    var defer = require_defer();
    module2.exports = async;
    function async(callback) {
      var isAsync = false;
      defer(function () {
        isAsync = true;
      });
      return function async_callback(err, result) {
        if (isAsync) {
          callback(err, result);
        } else {
          defer(function nextTick_callback() {
            callback(err, result);
          });
        }
      };
    }
  },
});

// node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/lib/abort.js
var require_abort = __commonJS({
  "node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/lib/abort.js"(
    exports2,
    module2,
  ) {
    module2.exports = abort;
    function abort(state) {
      Object.keys(state.jobs).forEach(clean.bind(state));
      state.jobs = {};
    }
    function clean(key) {
      if (typeof this.jobs[key] == "function") {
        this.jobs[key]();
      }
    }
  },
});

// node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/lib/iterate.js
var require_iterate = __commonJS({
  "node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/lib/iterate.js"(
    exports2,
    module2,
  ) {
    var async = require_async();
    var abort = require_abort();
    module2.exports = iterate;
    function iterate(list, iterator, state, callback) {
      var key = state["keyedList"] ? state["keyedList"][state.index] : state.index;
      state.jobs[key] = runJob(iterator, key, list[key], function (error, output) {
        if (!(key in state.jobs)) {
          return;
        }
        delete state.jobs[key];
        if (error) {
          abort(state);
        } else {
          state.results[key] = output;
        }
        callback(error, state.results);
      });
    }
    function runJob(iterator, key, item, callback) {
      var aborter;
      if (iterator.length == 2) {
        aborter = iterator(item, async(callback));
      } else {
        aborter = iterator(item, key, async(callback));
      }
      return aborter;
    }
  },
});

// node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/lib/state.js
var require_state = __commonJS({
  "node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/lib/state.js"(
    exports2,
    module2,
  ) {
    module2.exports = state;
    function state(list, sortMethod) {
      var isNamedList = !Array.isArray(list),
        initState = {
          index: 0,
          keyedList: isNamedList || sortMethod ? Object.keys(list) : null,
          jobs: {},
          results: isNamedList ? {} : [],
          size: isNamedList ? Object.keys(list).length : list.length,
        };
      if (sortMethod) {
        initState.keyedList.sort(
          isNamedList
            ? sortMethod
            : function (a, b) {
                return sortMethod(list[a], list[b]);
              },
        );
      }
      return initState;
    }
  },
});

// node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/lib/terminator.js
var require_terminator = __commonJS({
  "node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/lib/terminator.js"(
    exports2,
    module2,
  ) {
    var abort = require_abort();
    var async = require_async();
    module2.exports = terminator;
    function terminator(callback) {
      if (!Object.keys(this.jobs).length) {
        return;
      }
      this.index = this.size;
      abort(this);
      async(callback)(null, this.results);
    }
  },
});

// node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/parallel.js
var require_parallel = __commonJS({
  "node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/parallel.js"(
    exports2,
    module2,
  ) {
    var iterate = require_iterate();
    var initState = require_state();
    var terminator = require_terminator();
    module2.exports = parallel;
    function parallel(list, iterator, callback) {
      var state = initState(list);
      while (state.index < (state["keyedList"] || list).length) {
        iterate(list, iterator, state, function (error, result) {
          if (error) {
            callback(error, result);
            return;
          }
          if (Object.keys(state.jobs).length === 0) {
            callback(null, state.results);
            return;
          }
        });
        state.index++;
      }
      return terminator.bind(state, callback);
    }
  },
});

// node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/serialOrdered.js
var require_serialOrdered = __commonJS({
  "node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/serialOrdered.js"(
    exports2,
    module2,
  ) {
    var iterate = require_iterate();
    var initState = require_state();
    var terminator = require_terminator();
    module2.exports = serialOrdered;
    module2.exports.ascending = ascending;
    module2.exports.descending = descending;
    function serialOrdered(list, iterator, sortMethod, callback) {
      var state = initState(list, sortMethod);
      iterate(list, iterator, state, function iteratorHandler(error, result) {
        if (error) {
          callback(error, result);
          return;
        }
        state.index++;
        if (state.index < (state["keyedList"] || list).length) {
          iterate(list, iterator, state, iteratorHandler);
          return;
        }
        callback(null, state.results);
      });
      return terminator.bind(state, callback);
    }
    function ascending(a, b) {
      return a < b ? -1 : a > b ? 1 : 0;
    }
    function descending(a, b) {
      return -1 * ascending(a, b);
    }
  },
});

// node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/serial.js
var require_serial = __commonJS({
  "node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/serial.js"(exports2, module2) {
    var serialOrdered = require_serialOrdered();
    module2.exports = serial;
    function serial(list, iterator, callback) {
      return serialOrdered(list, iterator, null, callback);
    }
  },
});

// node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/index.js
var require_asynckit = __commonJS({
  "node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/index.js"(exports2, module2) {
    module2.exports = {
      parallel: require_parallel(),
      serial: require_serial(),
      serialOrdered: require_serialOrdered(),
    };
  },
});

// node_modules/.pnpm/es-object-atoms@1.1.1/node_modules/es-object-atoms/index.js
var require_es_object_atoms = __commonJS({
  "node_modules/.pnpm/es-object-atoms@1.1.1/node_modules/es-object-atoms/index.js"(
    exports2,
    module2,
  ) {
    "use strict";
    module2.exports = Object;
  },
});

// node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/index.js
var require_es_errors = __commonJS({
  "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/index.js"(
    exports2,
    module2,
  ) {
    "use strict";
    module2.exports = Error;
  },
});

// node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/eval.js
var require_eval = __commonJS({
  "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/eval.js"(exports2, module2) {
    "use strict";
    module2.exports = EvalError;
  },
});

// node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/range.js
var require_range = __commonJS({
  "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/range.js"(
    exports2,
    module2,
  ) {
    "use strict";
    module2.exports = RangeError;
  },
});

// node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/ref.js
var require_ref = __commonJS({
  "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/ref.js"(exports2, module2) {
    "use strict";
    module2.exports = ReferenceError;
  },
});

// node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/syntax.js
var require_syntax = __commonJS({
  "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/syntax.js"(
    exports2,
    module2,
  ) {
    "use strict";
    module2.exports = SyntaxError;
  },
});

// node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/type.js
var require_type = __commonJS({
  "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/type.js"(exports2, module2) {
    "use strict";
    module2.exports = TypeError;
  },
});

// node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/uri.js
var require_uri = __commonJS({
  "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/uri.js"(exports2, module2) {
    "use strict";
    module2.exports = URIError;
  },
});

// node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/abs.js
var require_abs = __commonJS({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/abs.js"(
    exports2,
    module2,
  ) {
    "use strict";
    module2.exports = Math.abs;
  },
});

// node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/floor.js
var require_floor = __commonJS({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/floor.js"(
    exports2,
    module2,
  ) {
    "use strict";
    module2.exports = Math.floor;
  },
});

// node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/max.js
var require_max = __commonJS({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/max.js"(
    exports2,
    module2,
  ) {
    "use strict";
    module2.exports = Math.max;
  },
});

// node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/min.js
var require_min = __commonJS({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/min.js"(
    exports2,
    module2,
  ) {
    "use strict";
    module2.exports = Math.min;
  },
});

// node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/pow.js
var require_pow = __commonJS({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/pow.js"(
    exports2,
    module2,
  ) {
    "use strict";
    module2.exports = Math.pow;
  },
});

// node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/round.js
var require_round = __commonJS({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/round.js"(
    exports2,
    module2,
  ) {
    "use strict";
    module2.exports = Math.round;
  },
});

// node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/isNaN.js
var require_isNaN = __commonJS({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/isNaN.js"(
    exports2,
    module2,
  ) {
    "use strict";
    module2.exports =
      Number.isNaN ||
      function isNaN2(a) {
        return a !== a;
      };
  },
});

// node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/sign.js
var require_sign = __commonJS({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/sign.js"(
    exports2,
    module2,
  ) {
    "use strict";
    var $isNaN = require_isNaN();
    module2.exports = function sign(number) {
      if ($isNaN(number) || number === 0) {
        return number;
      }
      return number < 0 ? -1 : 1;
    };
  },
});

// node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/gOPD.js
var require_gOPD = __commonJS({
  "node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/gOPD.js"(exports2, module2) {
    "use strict";
    module2.exports = Object.getOwnPropertyDescriptor;
  },
});

// node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/index.js
var require_gopd = __commonJS({
  "node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/index.js"(exports2, module2) {
    "use strict";
    var $gOPD = require_gOPD();
    if ($gOPD) {
      try {
        $gOPD([], "length");
      } catch (e) {
        $gOPD = null;
      }
    }
    module2.exports = $gOPD;
  },
});

// node_modules/.pnpm/es-define-property@1.0.1/node_modules/es-define-property/index.js
var require_es_define_property = __commonJS({
  "node_modules/.pnpm/es-define-property@1.0.1/node_modules/es-define-property/index.js"(
    exports2,
    module2,
  ) {
    "use strict";
    var $defineProperty = Object.defineProperty || false;
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", { value: 1 });
      } catch (e) {
        $defineProperty = false;
      }
    }
    module2.exports = $defineProperty;
  },
});

// node_modules/.pnpm/has-symbols@1.1.0/node_modules/has-symbols/shams.js
var require_shams = __commonJS({
  "node_modules/.pnpm/has-symbols@1.1.0/node_modules/has-symbols/shams.js"(
    exports2,
    module2,
  ) {
    "use strict";
    module2.exports = function hasSymbols() {
      if (
        typeof Symbol !== "function" ||
        typeof Object.getOwnPropertySymbols !== "function"
      ) {
        return false;
      }
      if (typeof Symbol.iterator === "symbol") {
        return true;
      }
      var obj = {};
      var sym = Symbol("test");
      var symObj = Object(sym);
      if (typeof sym === "string") {
        return false;
      }
      if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
        return false;
      }
      if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
        return false;
      }
      var symVal = 42;
      obj[sym] = symVal;
      for (var _ in obj) {
        return false;
      }
      if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
        return false;
      }
      if (
        typeof Object.getOwnPropertyNames === "function" &&
        Object.getOwnPropertyNames(obj).length !== 0
      ) {
        return false;
      }
      var syms = Object.getOwnPropertySymbols(obj);
      if (syms.length !== 1 || syms[0] !== sym) {
        return false;
      }
      if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
        return false;
      }
      if (typeof Object.getOwnPropertyDescriptor === "function") {
        var descriptor =
          /** @type {PropertyDescriptor} */
          Object.getOwnPropertyDescriptor(obj, sym);
        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
          return false;
        }
      }
      return true;
    };
  },
});

// node_modules/.pnpm/has-symbols@1.1.0/node_modules/has-symbols/index.js
var require_has_symbols = __commonJS({
  "node_modules/.pnpm/has-symbols@1.1.0/node_modules/has-symbols/index.js"(
    exports2,
    module2,
  ) {
    "use strict";
    var origSymbol = typeof Symbol !== "undefined" && Symbol;
    var hasSymbolSham = require_shams();
    module2.exports = function hasNativeSymbols() {
      if (typeof origSymbol !== "function") {
        return false;
      }
      if (typeof Symbol !== "function") {
        return false;
      }
      if (typeof origSymbol("foo") !== "symbol") {
        return false;
      }
      if (typeof Symbol("bar") !== "symbol") {
        return false;
      }
      return hasSymbolSham();
    };
  },
});

// node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Reflect.getPrototypeOf.js
var require_Reflect_getPrototypeOf = __commonJS({
  "node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Reflect.getPrototypeOf.js"(
    exports2,
    module2,
  ) {
    "use strict";
    module2.exports = (typeof Reflect !== "undefined" && Reflect.getPrototypeOf) || null;
  },
});

// node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Object.getPrototypeOf.js
var require_Object_getPrototypeOf = __commonJS({
  "node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Object.getPrototypeOf.js"(
    exports2,
    module2,
  ) {
    "use strict";
    var $Object = require_es_object_atoms();
    module2.exports = $Object.getPrototypeOf || null;
  },
});

// node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/implementation.js
var require_implementation = __commonJS({
  "node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/implementation.js"(
    exports2,
    module2,
  ) {
    "use strict";
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var toStr = Object.prototype.toString;
    var max = Math.max;
    var funcType = "[object Function]";
    var concatty = function concatty2(a, b) {
      var arr = [];
      for (var i = 0; i < a.length; i += 1) {
        arr[i] = a[i];
      }
      for (var j = 0; j < b.length; j += 1) {
        arr[j + a.length] = b[j];
      }
      return arr;
    };
    var slicy = function slicy2(arrLike, offset) {
      var arr = [];
      for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
        arr[j] = arrLike[i];
      }
      return arr;
    };
    var joiny = function (arr, joiner) {
      var str = "";
      for (var i = 0; i < arr.length; i += 1) {
        str += arr[i];
        if (i + 1 < arr.length) {
          str += joiner;
        }
      }
      return str;
    };
    module2.exports = function bind(that) {
      var target = this;
      if (typeof target !== "function" || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args2 = slicy(arguments, 1);
      var bound;
      var binder = function () {
        if (this instanceof bound) {
          var result = target.apply(this, concatty(args2, arguments));
          if (Object(result) === result) {
            return result;
          }
          return this;
        }
        return target.apply(that, concatty(args2, arguments));
      };
      var boundLength = max(0, target.length - args2.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs[i] = "$" + i;
      }
      bound = Function(
        "binder",
        "return function (" +
          joiny(boundArgs, ",") +
          "){ return binder.apply(this,arguments); }",
      )(binder);
      if (target.prototype) {
        var Empty = function Empty2() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    };
  },
});

// node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/index.js
var require_function_bind = __commonJS({
  "node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/index.js"(
    exports2,
    module2,
  ) {
    "use strict";
    var implementation = require_implementation();
    module2.exports = Function.prototype.bind || implementation;
  },
});

// node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/functionCall.js
var require_functionCall = __commonJS({
  "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/functionCall.js"(
    exports2,
    module2,
  ) {
    "use strict";
    module2.exports = Function.prototype.call;
  },
});

// node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/functionApply.js
var require_functionApply = __commonJS({
  "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/functionApply.js"(
    exports2,
    module2,
  ) {
    "use strict";
    module2.exports = Function.prototype.apply;
  },
});

// node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/reflectApply.js
var require_reflectApply = __commonJS({
  "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/reflectApply.js"(
    exports2,
    module2,
  ) {
    "use strict";
    module2.exports = typeof Reflect !== "undefined" && Reflect && Reflect.apply;
  },
});

// node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/actualApply.js
var require_actualApply = __commonJS({
  "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/actualApply.js"(
    exports2,
    module2,
  ) {
    "use strict";
    var bind = require_function_bind();
    var $apply = require_functionApply();
    var $call = require_functionCall();
    var $reflectApply = require_reflectApply();
    module2.exports = $reflectApply || bind.call($call, $apply);
  },
});

// node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/index.js
var require_call_bind_apply_helpers = __commonJS({
  "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/index.js"(
    exports2,
    module2,
  ) {
    "use strict";
    var bind = require_function_bind();
    var $TypeError = require_type();
    var $call = require_functionCall();
    var $actualApply = require_actualApply();
    module2.exports = function callBindBasic(args2) {
      if (args2.length < 1 || typeof args2[0] !== "function") {
        throw new $TypeError("a function is required");
      }
      return $actualApply(bind, $call, args2);
    };
  },
});

// node_modules/.pnpm/dunder-proto@1.0.1/node_modules/dunder-proto/get.js
var require_get = __commonJS({
  "node_modules/.pnpm/dunder-proto@1.0.1/node_modules/dunder-proto/get.js"(
    exports2,
    module2,
  ) {
    "use strict";
    var callBind = require_call_bind_apply_helpers();
    var gOPD = require_gopd();
    var hasProtoAccessor;
    try {
      hasProtoAccessor =
        /** @type {{ __proto__?: typeof Array.prototype }} */
        [].__proto__ === Array.prototype;
    } catch (e) {
      if (
        !e ||
        typeof e !== "object" ||
        !("code" in e) ||
        e.code !== "ERR_PROTO_ACCESS"
      ) {
        throw e;
      }
    }
    var desc =
      !!hasProtoAccessor &&
      gOPD &&
      gOPD(
        Object.prototype,
        /** @type {keyof typeof Object.prototype} */
        "__proto__",
      );
    var $Object = Object;
    var $getPrototypeOf = $Object.getPrototypeOf;
    module2.exports =
      desc && typeof desc.get === "function"
        ? callBind([desc.get])
        : typeof $getPrototypeOf === "function"
          ? /** @type {import('./get')} */
            function getDunder(value) {
              return $getPrototypeOf(value == null ? value : $Object(value));
            }
          : false;
  },
});

// node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/index.js
var require_get_proto = __commonJS({
  "node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/index.js"(
    exports2,
    module2,
  ) {
    "use strict";
    var reflectGetProto = require_Reflect_getPrototypeOf();
    var originalGetProto = require_Object_getPrototypeOf();
    var getDunderProto = require_get();
    module2.exports = reflectGetProto
      ? function getProto(O) {
          return reflectGetProto(O);
        }
      : originalGetProto
        ? function getProto(O) {
            if (!O || (typeof O !== "object" && typeof O !== "function")) {
              throw new TypeError("getProto: not an object");
            }
            return originalGetProto(O);
          }
        : getDunderProto
          ? function getProto(O) {
              return getDunderProto(O);
            }
          : null;
  },
});

// node_modules/.pnpm/hasown@2.0.2/node_modules/hasown/index.js
var require_hasown = __commonJS({
  "node_modules/.pnpm/hasown@2.0.2/node_modules/hasown/index.js"(exports2, module2) {
    "use strict";
    var call = Function.prototype.call;
    var $hasOwn = Object.prototype.hasOwnProperty;
    var bind = require_function_bind();
    module2.exports = bind.call(call, $hasOwn);
  },
});

// node_modules/.pnpm/get-intrinsic@1.3.0/node_modules/get-intrinsic/index.js
var require_get_intrinsic = __commonJS({
  "node_modules/.pnpm/get-intrinsic@1.3.0/node_modules/get-intrinsic/index.js"(
    exports2,
    module2,
  ) {
    "use strict";
    var undefined2;
    var $Object = require_es_object_atoms();
    var $Error = require_es_errors();
    var $EvalError = require_eval();
    var $RangeError = require_range();
    var $ReferenceError = require_ref();
    var $SyntaxError = require_syntax();
    var $TypeError = require_type();
    var $URIError = require_uri();
    var abs = require_abs();
    var floor = require_floor();
    var max = require_max();
    var min = require_min();
    var pow = require_pow();
    var round = require_round();
    var sign = require_sign();
    var $Function = Function;
    var getEvalledConstructor = function (expressionSyntax) {
      try {
        return $Function(
          '"use strict"; return (' + expressionSyntax + ").constructor;",
        )();
      } catch (e) {}
    };
    var $gOPD = require_gopd();
    var $defineProperty = require_es_define_property();
    var throwTypeError = function () {
      throw new $TypeError();
    };
    var ThrowTypeError = $gOPD
      ? (function () {
          try {
            arguments.callee;
            return throwTypeError;
          } catch (calleeThrows) {
            try {
              return $gOPD(arguments, "callee").get;
            } catch (gOPDthrows) {
              return throwTypeError;
            }
          }
        })()
      : throwTypeError;
    var hasSymbols = require_has_symbols()();
    var getProto = require_get_proto();
    var $ObjectGPO = require_Object_getPrototypeOf();
    var $ReflectGPO = require_Reflect_getPrototypeOf();
    var $apply = require_functionApply();
    var $call = require_functionCall();
    var needsEval = {};
    var TypedArray =
      typeof Uint8Array === "undefined" || !getProto ? undefined2 : getProto(Uint8Array);
    var INTRINSICS = {
      __proto__: null,
      "%AggregateError%":
        typeof AggregateError === "undefined" ? undefined2 : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
      "%ArrayIteratorPrototype%":
        hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined2,
      "%AsyncFromSyncIteratorPrototype%": undefined2,
      "%AsyncFunction%": needsEval,
      "%AsyncGenerator%": needsEval,
      "%AsyncGeneratorFunction%": needsEval,
      "%AsyncIteratorPrototype%": needsEval,
      "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
      "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
      "%BigInt64Array%":
        typeof BigInt64Array === "undefined" ? undefined2 : BigInt64Array,
      "%BigUint64Array%":
        typeof BigUint64Array === "undefined" ? undefined2 : BigUint64Array,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": $Error,
      "%eval%": eval,
      // eslint-disable-line no-eval
      "%EvalError%": $EvalError,
      "%Float16Array%": typeof Float16Array === "undefined" ? undefined2 : Float16Array,
      "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
      "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
      "%FinalizationRegistry%":
        typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
      "%Function%": $Function,
      "%GeneratorFunction%": needsEval,
      "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
      "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
      "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%":
        hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined2,
      "%JSON%": typeof JSON === "object" ? JSON : undefined2,
      "%Map%": typeof Map === "undefined" ? undefined2 : Map,
      "%MapIteratorPrototype%":
        typeof Map === "undefined" || !hasSymbols || !getProto
          ? undefined2
          : getProto(/* @__PURE__ */ new Map()[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": $Object,
      "%Object.getOwnPropertyDescriptor%": $gOPD,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
      "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
      "%RangeError%": $RangeError,
      "%ReferenceError%": $ReferenceError,
      "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set === "undefined" ? undefined2 : Set,
      "%SetIteratorPrototype%":
        typeof Set === "undefined" || !hasSymbols || !getProto
          ? undefined2
          : getProto(/* @__PURE__ */ new Set()[Symbol.iterator]()),
      "%SharedArrayBuffer%":
        typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%":
        hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined2,
      "%Symbol%": hasSymbols ? Symbol : undefined2,
      "%SyntaxError%": $SyntaxError,
      "%ThrowTypeError%": ThrowTypeError,
      "%TypedArray%": TypedArray,
      "%TypeError%": $TypeError,
      "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
      "%Uint8ClampedArray%":
        typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
      "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
      "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
      "%URIError%": $URIError,
      "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
      "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
      "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet,
      "%Function.prototype.call%": $call,
      "%Function.prototype.apply%": $apply,
      "%Object.defineProperty%": $defineProperty,
      "%Object.getPrototypeOf%": $ObjectGPO,
      "%Math.abs%": abs,
      "%Math.floor%": floor,
      "%Math.max%": max,
      "%Math.min%": min,
      "%Math.pow%": pow,
      "%Math.round%": round,
      "%Math.sign%": sign,
      "%Reflect.getPrototypeOf%": $ReflectGPO,
    };
    if (getProto) {
      try {
        null.error;
      } catch (e) {
        errorProto = getProto(getProto(e));
        INTRINSICS["%Error.prototype%"] = errorProto;
      }
    }
    var errorProto;
    var doEval = function doEval2(name) {
      var value;
      if (name === "%AsyncFunction%") {
        value = getEvalledConstructor("async function () {}");
      } else if (name === "%GeneratorFunction%") {
        value = getEvalledConstructor("function* () {}");
      } else if (name === "%AsyncGeneratorFunction%") {
        value = getEvalledConstructor("async function* () {}");
      } else if (name === "%AsyncGenerator%") {
        var fn = doEval2("%AsyncGeneratorFunction%");
        if (fn) {
          value = fn.prototype;
        }
      } else if (name === "%AsyncIteratorPrototype%") {
        var gen = doEval2("%AsyncGenerator%");
        if (gen && getProto) {
          value = getProto(gen.prototype);
        }
      }
      INTRINSICS[name] = value;
      return value;
    };
    var LEGACY_ALIASES = {
      __proto__: null,
      "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
      "%ArrayPrototype%": ["Array", "prototype"],
      "%ArrayProto_entries%": ["Array", "prototype", "entries"],
      "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
      "%ArrayProto_keys%": ["Array", "prototype", "keys"],
      "%ArrayProto_values%": ["Array", "prototype", "values"],
      "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
      "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
      "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
      "%BooleanPrototype%": ["Boolean", "prototype"],
      "%DataViewPrototype%": ["DataView", "prototype"],
      "%DatePrototype%": ["Date", "prototype"],
      "%ErrorPrototype%": ["Error", "prototype"],
      "%EvalErrorPrototype%": ["EvalError", "prototype"],
      "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
      "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
      "%FunctionPrototype%": ["Function", "prototype"],
      "%Generator%": ["GeneratorFunction", "prototype"],
      "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
      "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
      "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
      "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
      "%JSONParse%": ["JSON", "parse"],
      "%JSONStringify%": ["JSON", "stringify"],
      "%MapPrototype%": ["Map", "prototype"],
      "%NumberPrototype%": ["Number", "prototype"],
      "%ObjectPrototype%": ["Object", "prototype"],
      "%ObjProto_toString%": ["Object", "prototype", "toString"],
      "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
      "%PromisePrototype%": ["Promise", "prototype"],
      "%PromiseProto_then%": ["Promise", "prototype", "then"],
      "%Promise_all%": ["Promise", "all"],
      "%Promise_reject%": ["Promise", "reject"],
      "%Promise_resolve%": ["Promise", "resolve"],
      "%RangeErrorPrototype%": ["RangeError", "prototype"],
      "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
      "%RegExpPrototype%": ["RegExp", "prototype"],
      "%SetPrototype%": ["Set", "prototype"],
      "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
      "%StringPrototype%": ["String", "prototype"],
      "%SymbolPrototype%": ["Symbol", "prototype"],
      "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
      "%TypedArrayPrototype%": ["TypedArray", "prototype"],
      "%TypeErrorPrototype%": ["TypeError", "prototype"],
      "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
      "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
      "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
      "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
      "%URIErrorPrototype%": ["URIError", "prototype"],
      "%WeakMapPrototype%": ["WeakMap", "prototype"],
      "%WeakSetPrototype%": ["WeakSet", "prototype"],
    };
    var bind = require_function_bind();
    var hasOwn = require_hasown();
    var $concat = bind.call($call, Array.prototype.concat);
    var $spliceApply = bind.call($apply, Array.prototype.splice);
    var $replace = bind.call($call, String.prototype.replace);
    var $strSlice = bind.call($call, String.prototype.slice);
    var $exec = bind.call($call, RegExp.prototype.exec);
    var rePropName =
      /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = function stringToPath2(string) {
      var first = $strSlice(string, 0, 1);
      var last = $strSlice(string, -1);
      if (first === "%" && last !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
      } else if (last === "%" && first !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
      }
      var result = [];
      $replace(string, rePropName, function (match, number, quote, subString) {
        result[result.length] = quote
          ? $replace(subString, reEscapeChar, "$1")
          : number || match;
      });
      return result;
    };
    var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
      var intrinsicName = name;
      var alias;
      if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
        alias = LEGACY_ALIASES[intrinsicName];
        intrinsicName = "%" + alias[0] + "%";
      }
      if (hasOwn(INTRINSICS, intrinsicName)) {
        var value = INTRINSICS[intrinsicName];
        if (value === needsEval) {
          value = doEval(intrinsicName);
        }
        if (typeof value === "undefined" && !allowMissing) {
          throw new $TypeError(
            "intrinsic " + name + " exists, but is not available. Please file an issue!",
          );
        }
        return {
          alias,
          name: intrinsicName,
          value,
        };
      }
      throw new $SyntaxError("intrinsic " + name + " does not exist!");
    };
    module2.exports = function GetIntrinsic(name, allowMissing) {
      if (typeof name !== "string" || name.length === 0) {
        throw new $TypeError("intrinsic name must be a non-empty string");
      }
      if (arguments.length > 1 && typeof allowMissing !== "boolean") {
        throw new $TypeError('"allowMissing" argument must be a boolean');
      }
      if ($exec(/^%?[^%]*%?$/, name) === null) {
        throw new $SyntaxError(
          "`%` may not be present anywhere but at the beginning and end of the intrinsic name",
        );
      }
      var parts = stringToPath(name);
      var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
      var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
      var intrinsicRealName = intrinsic.name;
      var value = intrinsic.value;
      var skipFurtherCaching = false;
      var alias = intrinsic.alias;
      if (alias) {
        intrinsicBaseName = alias[0];
        $spliceApply(parts, $concat([0, 1], alias));
      }
      for (var i = 1, isOwn = true; i < parts.length; i += 1) {
        var part = parts[i];
        var first = $strSlice(part, 0, 1);
        var last = $strSlice(part, -1);
        if (
          (first === '"' ||
            first === "'" ||
            first === "`" ||
            last === '"' ||
            last === "'" ||
            last === "`") &&
          first !== last
        ) {
          throw new $SyntaxError("property names with quotes must have matching quotes");
        }
        if (part === "constructor" || !isOwn) {
          skipFurtherCaching = true;
        }
        intrinsicBaseName += "." + part;
        intrinsicRealName = "%" + intrinsicBaseName + "%";
        if (hasOwn(INTRINSICS, intrinsicRealName)) {
          value = INTRINSICS[intrinsicRealName];
        } else if (value != null) {
          if (!(part in value)) {
            if (!allowMissing) {
              throw new $TypeError(
                "base intrinsic for " +
                  name +
                  " exists, but the property is not available.",
              );
            }
            return void undefined2;
          }
          if ($gOPD && i + 1 >= parts.length) {
            var desc = $gOPD(value, part);
            isOwn = !!desc;
            if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
              value = desc.get;
            } else {
              value = value[part];
            }
          } else {
            isOwn = hasOwn(value, part);
            value = value[part];
          }
          if (isOwn && !skipFurtherCaching) {
            INTRINSICS[intrinsicRealName] = value;
          }
        }
      }
      return value;
    };
  },
});

// node_modules/.pnpm/has-tostringtag@1.0.2/node_modules/has-tostringtag/shams.js
var require_shams2 = __commonJS({
  "node_modules/.pnpm/has-tostringtag@1.0.2/node_modules/has-tostringtag/shams.js"(
    exports2,
    module2,
  ) {
    "use strict";
    var hasSymbols = require_shams();
    module2.exports = function hasToStringTagShams() {
      return hasSymbols() && !!Symbol.toStringTag;
    };
  },
});

// node_modules/.pnpm/es-set-tostringtag@2.1.0/node_modules/es-set-tostringtag/index.js
var require_es_set_tostringtag = __commonJS({
  "node_modules/.pnpm/es-set-tostringtag@2.1.0/node_modules/es-set-tostringtag/index.js"(
    exports2,
    module2,
  ) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
    var hasToStringTag = require_shams2()();
    var hasOwn = require_hasown();
    var $TypeError = require_type();
    var toStringTag = hasToStringTag ? Symbol.toStringTag : null;
    module2.exports = function setToStringTag(object, value) {
      var overrideIfSet = arguments.length > 2 && !!arguments[2] && arguments[2].force;
      var nonConfigurable =
        arguments.length > 2 && !!arguments[2] && arguments[2].nonConfigurable;
      if (
        (typeof overrideIfSet !== "undefined" && typeof overrideIfSet !== "boolean") ||
        (typeof nonConfigurable !== "undefined" && typeof nonConfigurable !== "boolean")
      ) {
        throw new $TypeError(
          "if provided, the `overrideIfSet` and `nonConfigurable` options must be booleans",
        );
      }
      if (toStringTag && (overrideIfSet || !hasOwn(object, toStringTag))) {
        if ($defineProperty) {
          $defineProperty(object, toStringTag, {
            configurable: !nonConfigurable,
            enumerable: false,
            value,
            writable: false,
          });
        } else {
          object[toStringTag] = value;
        }
      }
    };
  },
});

// node_modules/.pnpm/form-data@4.0.2/node_modules/form-data/lib/populate.js
var require_populate = __commonJS({
  "node_modules/.pnpm/form-data@4.0.2/node_modules/form-data/lib/populate.js"(
    exports2,
    module2,
  ) {
    module2.exports = function (dst, src) {
      Object.keys(src).forEach(function (prop) {
        dst[prop] = dst[prop] || src[prop];
      });
      return dst;
    };
  },
});

// node_modules/.pnpm/form-data@4.0.2/node_modules/form-data/lib/form_data.js
var require_form_data = __commonJS({
  "node_modules/.pnpm/form-data@4.0.2/node_modules/form-data/lib/form_data.js"(
    exports2,
    module2,
  ) {
    var CombinedStream = require_combined_stream();
    var util = require("util");
    var path2 = require("path");
    var http = require("http");
    var https = require("https");
    var parseUrl = require("url").parse;
    var fs2 = require("fs");
    var Stream = require("stream").Stream;
    var mime = require_mime_types();
    var asynckit = require_asynckit();
    var setToStringTag = require_es_set_tostringtag();
    var populate = require_populate();
    module2.exports = FormData2;
    util.inherits(FormData2, CombinedStream);
    function FormData2(options) {
      if (!(this instanceof FormData2)) {
        return new FormData2(options);
      }
      this._overheadLength = 0;
      this._valueLength = 0;
      this._valuesToMeasure = [];
      CombinedStream.call(this);
      options = options || {};
      for (var option in options) {
        this[option] = options[option];
      }
    }
    FormData2.LINE_BREAK = "\r\n";
    FormData2.DEFAULT_CONTENT_TYPE = "application/octet-stream";
    FormData2.prototype.append = function (field, value, options) {
      options = options || {};
      if (typeof options == "string") {
        options = { filename: options };
      }
      var append = CombinedStream.prototype.append.bind(this);
      if (typeof value == "number") {
        value = "" + value;
      }
      if (Array.isArray(value)) {
        this._error(new Error("Arrays are not supported."));
        return;
      }
      var header = this._multiPartHeader(field, value, options);
      var footer = this._multiPartFooter();
      append(header);
      append(value);
      append(footer);
      this._trackLength(header, value, options);
    };
    FormData2.prototype._trackLength = function (header, value, options) {
      var valueLength = 0;
      if (options.knownLength != null) {
        valueLength += +options.knownLength;
      } else if (Buffer.isBuffer(value)) {
        valueLength = value.length;
      } else if (typeof value === "string") {
        valueLength = Buffer.byteLength(value);
      }
      this._valueLength += valueLength;
      this._overheadLength += Buffer.byteLength(header) + FormData2.LINE_BREAK.length;
      if (
        !value ||
        (!value.path &&
          !(
            value.readable && Object.prototype.hasOwnProperty.call(value, "httpVersion")
          ) &&
          !(value instanceof Stream))
      ) {
        return;
      }
      if (!options.knownLength) {
        this._valuesToMeasure.push(value);
      }
    };
    FormData2.prototype._lengthRetriever = function (value, callback) {
      if (Object.prototype.hasOwnProperty.call(value, "fd")) {
        if (value.end != void 0 && value.end != Infinity && value.start != void 0) {
          callback(null, value.end + 1 - (value.start ? value.start : 0));
        } else {
          fs2.stat(value.path, function (err, stat) {
            var fileSize;
            if (err) {
              callback(err);
              return;
            }
            fileSize = stat.size - (value.start ? value.start : 0);
            callback(null, fileSize);
          });
        }
      } else if (Object.prototype.hasOwnProperty.call(value, "httpVersion")) {
        callback(null, +value.headers["content-length"]);
      } else if (Object.prototype.hasOwnProperty.call(value, "httpModule")) {
        value.on("response", function (response) {
          value.pause();
          callback(null, +response.headers["content-length"]);
        });
        value.resume();
      } else {
        callback("Unknown stream");
      }
    };
    FormData2.prototype._multiPartHeader = function (field, value, options) {
      if (typeof options.header == "string") {
        return options.header;
      }
      var contentDisposition = this._getContentDisposition(value, options);
      var contentType = this._getContentType(value, options);
      var contents = "";
      var headers = {
        // add custom disposition as third element or keep it two elements if not
        "Content-Disposition": ["form-data", 'name="' + field + '"'].concat(
          contentDisposition || [],
        ),
        // if no content type. allow it to be empty array
        "Content-Type": [].concat(contentType || []),
      };
      if (typeof options.header == "object") {
        populate(headers, options.header);
      }
      var header;
      for (var prop in headers) {
        if (Object.prototype.hasOwnProperty.call(headers, prop)) {
          header = headers[prop];
          if (header == null) {
            continue;
          }
          if (!Array.isArray(header)) {
            header = [header];
          }
          if (header.length) {
            contents += prop + ": " + header.join("; ") + FormData2.LINE_BREAK;
          }
        }
      }
      return (
        "--" + this.getBoundary() + FormData2.LINE_BREAK + contents + FormData2.LINE_BREAK
      );
    };
    FormData2.prototype._getContentDisposition = function (value, options) {
      var filename, contentDisposition;
      if (typeof options.filepath === "string") {
        filename = path2.normalize(options.filepath).replace(/\\/g, "/");
      } else if (options.filename || value.name || value.path) {
        filename = path2.basename(options.filename || value.name || value.path);
      } else if (
        value.readable &&
        Object.prototype.hasOwnProperty.call(value, "httpVersion")
      ) {
        filename = path2.basename(value.client._httpMessage.path || "");
      }
      if (filename) {
        contentDisposition = 'filename="' + filename + '"';
      }
      return contentDisposition;
    };
    FormData2.prototype._getContentType = function (value, options) {
      var contentType = options.contentType;
      if (!contentType && value.name) {
        contentType = mime.lookup(value.name);
      }
      if (!contentType && value.path) {
        contentType = mime.lookup(value.path);
      }
      if (
        !contentType &&
        value.readable &&
        Object.prototype.hasOwnProperty.call(value, "httpVersion")
      ) {
        contentType = value.headers["content-type"];
      }
      if (!contentType && (options.filepath || options.filename)) {
        contentType = mime.lookup(options.filepath || options.filename);
      }
      if (!contentType && typeof value == "object") {
        contentType = FormData2.DEFAULT_CONTENT_TYPE;
      }
      return contentType;
    };
    FormData2.prototype._multiPartFooter = function () {
      return function (next) {
        var footer = FormData2.LINE_BREAK;
        var lastPart = this._streams.length === 0;
        if (lastPart) {
          footer += this._lastBoundary();
        }
        next(footer);
      }.bind(this);
    };
    FormData2.prototype._lastBoundary = function () {
      return "--" + this.getBoundary() + "--" + FormData2.LINE_BREAK;
    };
    FormData2.prototype.getHeaders = function (userHeaders) {
      var header;
      var formHeaders = {
        "content-type": "multipart/form-data; boundary=" + this.getBoundary(),
      };
      for (header in userHeaders) {
        if (Object.prototype.hasOwnProperty.call(userHeaders, header)) {
          formHeaders[header.toLowerCase()] = userHeaders[header];
        }
      }
      return formHeaders;
    };
    FormData2.prototype.setBoundary = function (boundary) {
      this._boundary = boundary;
    };
    FormData2.prototype.getBoundary = function () {
      if (!this._boundary) {
        this._generateBoundary();
      }
      return this._boundary;
    };
    FormData2.prototype.getBuffer = function () {
      var dataBuffer = new Buffer.alloc(0);
      var boundary = this.getBoundary();
      for (var i = 0, len = this._streams.length; i < len; i++) {
        if (typeof this._streams[i] !== "function") {
          if (Buffer.isBuffer(this._streams[i])) {
            dataBuffer = Buffer.concat([dataBuffer, this._streams[i]]);
          } else {
            dataBuffer = Buffer.concat([dataBuffer, Buffer.from(this._streams[i])]);
          }
          if (
            typeof this._streams[i] !== "string" ||
            this._streams[i].substring(2, boundary.length + 2) !== boundary
          ) {
            dataBuffer = Buffer.concat([dataBuffer, Buffer.from(FormData2.LINE_BREAK)]);
          }
        }
      }
      return Buffer.concat([dataBuffer, Buffer.from(this._lastBoundary())]);
    };
    FormData2.prototype._generateBoundary = function () {
      var boundary = "--------------------------";
      for (var i = 0; i < 24; i++) {
        boundary += Math.floor(Math.random() * 10).toString(16);
      }
      this._boundary = boundary;
    };
    FormData2.prototype.getLengthSync = function () {
      var knownLength = this._overheadLength + this._valueLength;
      if (this._streams.length) {
        knownLength += this._lastBoundary().length;
      }
      if (!this.hasKnownLength()) {
        this._error(new Error("Cannot calculate proper length in synchronous way."));
      }
      return knownLength;
    };
    FormData2.prototype.hasKnownLength = function () {
      var hasKnownLength = true;
      if (this._valuesToMeasure.length) {
        hasKnownLength = false;
      }
      return hasKnownLength;
    };
    FormData2.prototype.getLength = function (cb) {
      var knownLength = this._overheadLength + this._valueLength;
      if (this._streams.length) {
        knownLength += this._lastBoundary().length;
      }
      if (!this._valuesToMeasure.length) {
        process.nextTick(cb.bind(this, null, knownLength));
        return;
      }
      asynckit.parallel(
        this._valuesToMeasure,
        this._lengthRetriever,
        function (err, values) {
          if (err) {
            cb(err);
            return;
          }
          values.forEach(function (length) {
            knownLength += length;
          });
          cb(null, knownLength);
        },
      );
    };
    FormData2.prototype.submit = function (params, cb) {
      var request,
        options,
        defaults = { method: "post" };
      if (typeof params == "string") {
        params = parseUrl(params);
        options = populate(
          {
            port: params.port,
            path: params.pathname,
            host: params.hostname,
            protocol: params.protocol,
          },
          defaults,
        );
      } else {
        options = populate(params, defaults);
        if (!options.port) {
          options.port = options.protocol == "https:" ? 443 : 80;
        }
      }
      options.headers = this.getHeaders(params.headers);
      if (options.protocol == "https:") {
        request = https.request(options);
      } else {
        request = http.request(options);
      }
      this.getLength(
        function (err, length) {
          if (err && err !== "Unknown stream") {
            this._error(err);
            return;
          }
          if (length) {
            request.setHeader("Content-Length", length);
          }
          this.pipe(request);
          if (cb) {
            var onResponse;
            var callback = function (error, responce) {
              request.removeListener("error", callback);
              request.removeListener("response", onResponse);
              return cb.call(this, error, responce);
            };
            onResponse = callback.bind(this, null);
            request.on("error", callback);
            request.on("response", onResponse);
          }
        }.bind(this),
      );
      return request;
    };
    FormData2.prototype._error = function (err) {
      if (!this.error) {
        this.error = err;
        this.pause();
        this.emit("error", err);
      }
    };
    FormData2.prototype.toString = function () {
      return "[object FormData]";
    };
    setToStringTag(FormData2, "FormData");
  },
});

// song-cli.js
var { intro, outro, select, isCancel, spinner, note } = require_dist2();
var fs = require("fs");
var path = require("path");
var { spawn } = require("child_process");
var { execSync } = require("child_process");
var FormData = require_form_data();
var os = require("os");
var readline = require("readline");
var colors = {
  red: (text) => `\x1B[31m${text}\x1B[0m`,
  green: (text) => `\x1B[32m${text}\x1B[0m`,
  yellow: (text) => `\x1B[33m${text}\x1B[0m`,
  blue: (text) => `\x1B[34m${text}\x1B[0m`,
  cyan: (text) => `\x1B[36m${text}\x1B[0m`,
  gray: (text) => `\x1B[90m${text}\x1B[0m`,
  bold: (text) => `\x1B[1m${text}\x1B[0m`,
  italic: (text) => `\x1B[3m${text}\x1B[0m`,
};
function parseArgs() {
  const args2 = process.argv.slice(2);
  const options = {};
  for (let i = 0; i < args2.length; i++) {
    const arg = args2[i];
    if (arg === "--api-url" && i + 1 < args2.length) {
      options.apiUrl = args2[i + 1];
      i++;
    }
  }
  return options;
}
var DEFAULT_API_URL = "https://fm-api.matejpesl.cz";
var args = parseArgs();
var API_URL = args.apiUrl || DEFAULT_API_URL;
var TEMP_DIR = path.join(os.tmpdir(), "ai-fm-temp");
var isWindows = os.platform() === "win32";
async function fetchRadios() {
  try {
    const response = await fetch(`${API_URL}/radios`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(colors.red(`Error fetching radios: ${error.message}`));
    if (error.response) {
      console.error(colors.red(`Status: ${error.response.status}`));
      console.error(colors.red(`Data: ${JSON.stringify(error.response.data)}`));
    }
    process.exit(1);
  }
}
async function fetchRadioBlocks(radioId) {
  try {
    const response = await fetch(`${API_URL}/radios/${radioId}/blocks`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(colors.red(`Error fetching radio blocks: ${error.message}`));
    if (error.response) {
      console.error(colors.red(`Status: ${error.response.status}`));
      console.error(colors.red(`Data: ${JSON.stringify(error.response.data)}`));
    }
    process.exit(1);
  }
}
function ensureTempDirExists() {
  if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
    console.log(`Created temporary directory: ${TEMP_DIR}`);
  }
}
function cleanupTempDir() {
  if (fs.existsSync(TEMP_DIR)) {
    try {
      if (!TEMP_DIR.includes("ai-fm-temp")) {
        console.log(
          `Safety check: Not cleaning temp directory ${TEMP_DIR} as it doesn't contain 'ai-fm-temp'`,
        );
        return;
      }
      const files = fs.readdirSync(TEMP_DIR);
      let filesDeleted = 0;
      for (const file of files) {
        const filePath = path.join(TEMP_DIR, file);
        if (
          fs.statSync(filePath).isFile() &&
          (file.endsWith(".mp3") || file.endsWith(".info.json"))
        ) {
          fs.unlinkSync(filePath);
          filesDeleted++;
        }
      }
      console.log(
        `Cleaned up temporary files: ${filesDeleted} files deleted from ${TEMP_DIR}`,
      );
    } catch (error) {
      console.error(
        colors.yellow(`Warning: Could not clean up temp directory: ${error.message}`),
      );
    }
  }
}
function isCommandAvailable(command) {
  try {
    if (command === "ffmpeg") {
      try {
        const nullOutput = isWindows ? "NUL" : "/dev/null";
        execSync(`${command} -version > ${nullOutput} 2>&1`);
        return true;
      } catch (e) {
        try {
          execSync(`${command} --version > ${isWindows ? "NUL" : "/dev/null"} 2>&1`);
          return true;
        } catch (e2) {
          try {
            execSync(`${command} -h > ${isWindows ? "NUL" : "/dev/null"} 2>&1`);
            return true;
          } catch (e3) {
            return false;
          }
        }
      }
    } else {
      const nullOutput = isWindows ? "NUL" : "/dev/null";
      execSync(`${command} --version > ${nullOutput} 2>&1`);
      return true;
    }
  } catch (error) {
    return false;
  }
}
function showYtDlpInstructions() {
  console.log(colors.yellow("\nyt-dlp installation instructions:"));
  if (isWindows) {
    console.log(colors.cyan("\nFor Windows:"));
    console.log("\nOption 1 - Using pip (Python package manager):");
    console.log('  > python3 -m pip install -U "yt-dlp[default]"');
    console.log("Option 2 - Using winget:");
    console.log("  > winget install -e --id yt-dlp.yt-dlp");
    console.log("Option 3 - Manual download:");
    console.log(
      "  1. Download from https://github.com/yt-dlp/yt-dlp/releases/tag/2025.04.30",
    );
    console.log("  2. Rename the file to yt-dlp.exe");
    console.log("  3. Move it to a directory in your PATH (or add its location to PATH)");
  } else if (os.platform() === "darwin") {
    console.log(colors.cyan("\nFor macOS:"));
    console.log("  $ brew install yt-dlp");
  } else if (os.platform() === "linux") {
    console.log(colors.cyan("\nFor Linux:"));
    console.log("Option 1 - Using pip (Python package manager):");
    console.log('  $ python3 -m pip install -U "yt-dlp[default]"');
    console.log("\nOption 2 - Direct download:");
    console.log(
      "  $ curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o ~/.local/bin/yt-dlp",
    );
    console.log("  $ chmod a+rx ~/.local/bin/yt-dlp");
  }
  console.log(
    colors.yellow(
      "\nAfter installing, make sure yt-dlp is in your PATH and restart this script.",
    ),
  );
}
function showFfmpegInstructions() {
  console.log(colors.yellow("\nffmpeg installation instructions:"));
  if (isWindows) {
    console.log(colors.cyan("\nFor Windows:"));
    console.log("Option 1 - Using winget (probably as admin and restart terminal):");
    console.log("  > winget install --id Gyan.FFmpeg");
    console.log("\nOption 2 - Manual download:");
    console.log("  1. Download ffmpeg from https://ffmpeg.org/download.html");
    console.log("  2. Extract the archive and add the bin folder to your PATH");
  } else if (os.platform() === "darwin") {
    console.log(colors.cyan("\nFor macOS:"));
    console.log("  $ brew install ffmpeg");
  } else if (os.platform() === "linux") {
    console.log(colors.cyan("\nFor Linux (Ubuntu/Debian):"));
    console.log("  $ sudo apt install ffmpeg");
    console.log(colors.cyan("\nFor other Linux distributions:"));
    console.log("  Please use your distribution's package manager to install ffmpeg");
  }
  console.log(
    colors.yellow(
      "\nAfter installing, make sure ffmpeg is in your PATH and restart this script.",
    ),
  );
}
function checkRequiredTools() {
  const ytDlpAvailable = isCommandAvailable("yt-dlp");
  const ffmpegAvailable = isCommandAvailable("ffmpeg");
  console.log(`yt-dlp available in PATH: ${ytDlpAvailable}`);
  console.log(`ffmpeg available in PATH: ${ffmpegAvailable}`);
  let allToolsAvailable = true;
  if (!ytDlpAvailable) {
    console.error(colors.red("yt-dlp is not installed or not in PATH."));
    showYtDlpInstructions();
    allToolsAvailable = false;
  }
  if (!ffmpegAvailable) {
    console.error(colors.red("ffmpeg is not installed or not in PATH."));
    showFfmpegInstructions();
    allToolsAvailable = false;
  }
  return allToolsAvailable;
}
function extractTitleFromInfoJson(infoJsonPath) {
  try {
    if (fs.existsSync(infoJsonPath)) {
      const infoData = JSON.parse(fs.readFileSync(infoJsonPath, "utf8"));
      return infoData.title || null;
    }
  } catch (error) {
    console.error(`Error reading info JSON: ${error.message}`);
  }
  return null;
}
async function downloadSong(youtubeUrl, outputPath) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading ${youtubeUrl}`);
    const args2 = [
      youtubeUrl,
      "-x",
      // Extract audio
      "--audio-format",
      "mp3",
      "--audio-quality",
      "0",
      // Best quality
      "--write-info-json",
      // Generate metadata JSON file
      "-o",
      outputPath,
    ];
    const process2 = spawn("yt-dlp", args2);
    let stderr = "";
    process2.stdout.on("data", (data) => {
      const output = data.toString().trim();
      if (output.includes("%")) {
        console.log(`Downloading progress: ${output}`);
      }
    });
    process2.stderr.on("data", (data) => {
      stderr += data.toString();
      console.error(`yt-dlp error: ${data.toString().trim()}`);
    });
    process2.on("close", (code) => {
      if (code === 0) {
        console.log(`Downloaded successfully: ${outputPath}`);
        resolve(outputPath);
      } else {
        console.error(`Download failed: ${stderr}`);
        reject(new Error(`yt-dlp failed with code ${code}: ${stderr}`));
      }
    });
    process2.on("error", (err) => {
      console.error(`Failed to start yt-dlp: ${err.message}`);
      reject(new Error(`Failed to start yt-dlp: ${err.message}`));
    });
  });
}
async function uploadSong(filePath, blockId, radioId, title) {
  try {
    console.log(
      `Uploading song for block ${blockId}${title ? ` with title "${title}"` : ""}`,
    );
    const form = new FormData();
    form.append("blockId", blockId);
    form.append("radioId", radioId);
    if (title) {
      form.append("title", title);
    }
    form.append("file", fs.createReadStream(filePath), {
      filename: path.basename(filePath),
      contentType: "audio/mpeg",
    });
    const formHeaders = form.getHeaders();
    return new Promise((resolve, reject) => {
      const url = new URL(`${API_URL}/radios/upload-songs`);
      const options = {
        method: "POST",
        headers: formHeaders,
        host: url.hostname,
        port: url.port || (url.protocol === "https:" ? 443 : 80),
        path: url.pathname,
        protocol: url.protocol,
      };
      const req =
        url.protocol === "https:"
          ? require("https").request(options)
          : require("http").request(options);
      req.on("response", (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            try {
              console.log(`Uploaded song for block ${blockId}`);
              resolve(JSON.parse(data));
            } catch (e) {
              console.error(`JSON parse error: ${e.message}`);
              reject(new Error(`Error parsing response: ${e.message}`));
            }
          } else {
            reject(new Error(`HTTP error: ${res.statusCode} ${res.statusMessage}`));
          }
        });
      });
      req.on("error", (err) => {
        reject(err);
      });
      form.pipe(req);
    });
  } catch (error) {
    console.error(
      colors.red(`Error uploading song for block ${blockId}: ${error.message}`),
    );
    if (error.response) {
      console.error(colors.red(`Status: ${error.response.status}`));
      console.error(colors.red(`Data: ${JSON.stringify(error.response.data)}`));
    }
    throw error;
  }
}
async function main() {
  try {
    intro(colors.bold(colors.blue("AI FM Radio Downloader")));
    console.log(`API URL: ${API_URL}`);
    ensureTempDirExists();
    console.log("Fetching available radios...");
    const radios = await fetchRadios();
    if (radios.length === 0) {
      note(colors.yellow("No radios found."), "Empty");
      process.exit(0);
    }
    const selectOptions = radios.map((radio) => ({
      label: `${radio.title} (${radio.songCount} songs, created ${new Date(radio.createdAt).toLocaleString()})`,
      value: { id: radio.id, title: radio.title },
    }));
    const selectedRadio = await select({
      message: "Select a radio:",
      options: selectOptions,
    });
    if (isCancel(selectedRadio)) {
      outro("Selection cancelled");
      process.exit(0);
    }
    console.log(
      `
Fetching blocks for radio: ${selectedRadio.title} (${selectedRadio.id})...`,
    );
    const radioData = await fetchRadioBlocks(selectedRadio.id);
    const songBlocks = radioData.blocks.filter((block) => block.type === "song");
    console.log(`Found ${songBlocks.length} song blocks total`);
    if (songBlocks.length === 0) {
      note(colors.yellow("No songs found in this radio."), "Empty");
      process.exit(0);
    }
    const songsToProcess = songBlocks.filter((block) => !block.isDownloaded);
    console.log(`Found ${songsToProcess.length} songs that need to be downloaded`);
    if (songsToProcess.length === 0) {
      note(colors.green("All songs are already downloaded!"), "Complete");
      process.exit(0);
    }
    const s = spinner();
    s.start("Checking for required tools...");
    const toolsAvailable = checkRequiredTools();
    s.stop("Tools check completed");
    if (!toolsAvailable) {
      note(
        colors.red(
          "Required tools are missing. Please install yt-dlp and ffmpeg following the instructions above.",
        ),
        "Error",
      );
      process.exit(1);
    }
    const stats = {
      total: songsToProcess.length,
      downloaded: 0,
      uploaded: 0,
      failed: 0,
      skipped: 0,
    };
    for (const [index, block] of songsToProcess.entries()) {
      try {
        if (!block.yt?.url) {
          console.log(colors.yellow(`Skipping block ${block.id}: No YouTube URL found`));
          stats.skipped++;
          continue;
        }
        console.log(
          `
Processing song ${index + 1}/${songsToProcess.length}${block.yt.title ? `: ${block.yt.title}` : ""}`,
        );
        const outputPath = path.join(TEMP_DIR, `${block.id}.mp3`);
        const s2 = spinner();
        s2.start("Downloading song from YouTube...");
        await downloadSong(block.yt.url, outputPath);
        stats.downloaded++;
        s2.stop("Download complete");
        let title = null;
        const infoJsonPath = `${outputPath}.info.json`;
        if (fs.existsSync(infoJsonPath)) {
          title = extractTitleFromInfoJson(infoJsonPath);
          if (title) {
            console.log(`Found title from metadata: "${title}"`);
          } else {
            console.log(colors.yellow(`No title found in metadata file`));
          }
          try {
            fs.unlinkSync(infoJsonPath);
          } catch (err) {
            console.log(`Note: Could not delete info JSON file: ${err.message}`);
          }
        }
        s2.start(` Uploading song to server${title ? ` with title "${title}"` : ""}...`);
        await uploadSong(outputPath, block.id, selectedRadio.id, title);
        stats.uploaded++;
        s2.stop(colors.green("Upload complete"));
        fs.unlinkSync(outputPath);
        console.log(
          colors.green(
            `Successfully processed song ${index + 1}/${songsToProcess.length}`,
          ),
        );
      } catch (error) {
        console.error(
          colors.red(
            `Failed to process song ${index + 1}/${songsToProcess.length}: ${error.message}`,
          ),
        );
        stats.failed++;
      }
    }
    note(colors.bold("Processing Results"), "Summary");
    console.log(`Total songs: ${stats.total}`);
    console.log(`Downloaded: ${colors.green(stats.downloaded)}`);
    console.log(`Uploaded: ${colors.green(stats.uploaded)}`);
    console.log(`Failed: ${colors.red(stats.failed)}`);
    console.log(`Skipped: ${colors.yellow(stats.skipped)}`);
    outro("All songs have been processed");
    process.exit(0);
  } catch (error) {
    console.error(colors.red(`An error occurred: ${error.message}`));
    process.exit(1);
  } finally {
    cleanupTempDir();
    outro("Let's fucking go! Nonstop pop never dies!");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(
      "\nPress ENTER to exit... (or do whatever the fuck you want im not your mom)",
      () => {
        rl.close();
      },
    );
  }
}
if (process.argv.includes("--help") || process.argv.includes("-h")) {
  console.log(`
AI FM Radio Downloader

Usage: node song-cli.js [options]

Features:
  - Download and upload missing songs from YouTube

Options:
  --api-url URL    Specify a custom API URL (default: ${DEFAULT_API_URL})
  (Temp directory is using system temp: ${TEMP_DIR})
  -h, --help       Show this help message
  `);
  process.exit(0);
}
main().catch((error) => {
  console.error(colors.red(`Fatal error: ${error.message}`));
  cleanupTempDir();
  process.exit(1);
});
/*! Bundled license information:

mime-db/index.js:
  (*!
   * mime-db
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2015-2022 Douglas Christopher Wilson
   * MIT Licensed
   *)

mime-types/index.js:
  (*!
   * mime-types
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
