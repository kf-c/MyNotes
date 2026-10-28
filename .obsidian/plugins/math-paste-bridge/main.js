"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/latex.js
var require_latex = __commonJS({
  "src/latex.js"(exports2, module2) {
    "use strict";
    var symbols = new Set("alpha beta gamma delta epsilon varepsilon zeta eta theta vartheta iota kappa lambda mu nu xi omicron pi varpi rho varrho sigma varsigma tau upsilon phi varphi chi psi omega Gamma Delta Theta Lambda Xi Pi Sigma Upsilon Phi Psi Omega infty partial nabla ell hbar Re Im emptyset varnothing forall exists cdots ldots dots".split(" "));
    var operators = new Set("times cdot div pm mp le leq ge geq ne neq equiv approx sim simeq in notin subset subseteq supset supseteq cup cap to mapsto rightarrow leftarrow propto mid".split(" "));
    var argumentsNeeded = new Map([
      ..."frac dfrac tfrac binom".split(" ").map((name) => [name, 2]),
      ..."sqrt hat widehat bar overline underline vec tilde widetilde dot ddot underbrace overbrace".split(" ").map((name) => [name, 1])
    ]);
    var textCommands = new Set("text textrm textnormal textbf textit mathrm mathbf mathit mathsf mathtt mathcal mathbb operatorname".split(" "));
    var functions = new Set("sin cos tan cot sec csc sinh cosh tanh log ln exp min max det arg sum prod int iint iiint lim".split(" "));
    function readLatex(text, start, implicit = false) {
      const space = (pos) => {
        while (/[ \t]/.test(text[pos] || "\n")) pos++;
        return pos;
      };
      const join = (a, b) => ({ end: b.end, command: a.command || b.command, math: a.math || b.math, script: a.script || b.script });
      const commandAt = (pos) => text.slice(pos).match(/^\\([A-Za-z]+)/);
      function group(pos, depth) {
        const close = { "{": "}", "[": "]", "(": ")" }[text[pos]];
        if (!close || depth > 24) return null;
        const body = expression(pos + 1, true, close, depth + 1);
        if (!body || text[space(body.end)] !== close) return null;
        return { ...body, end: space(body.end) + 1 };
      }
      function textGroup(pos) {
        if (text[pos] !== "{") return null;
        let depth = 1;
        for (let i = pos + 1; i < text.length; i++) {
          if (text[i] === "\n" || text[i] === "\r" || text[i] === "$") return null;
          if (text[i] === "\\") {
            i++;
            continue;
          }
          if (text[i] === "{") depth++;
          if (text[i] === "}" && --depth === 0) return i + 1;
        }
        return null;
      }
      function atom(pos, depth, suffix = true) {
        if (depth > 24) return null;
        let result2;
        const cmd = commandAt(pos);
        if (cmd) {
          const name = cmd[1];
          result2 = { end: pos + cmd[0].length, command: true, math: name !== "text" && name !== "textrm" && name !== "textnormal" };
          if (textCommands.has(name)) {
            const end = textGroup(space(result2.end));
            if (end === null) return null;
            result2.end = end;
          } else if (argumentsNeeded.has(name)) {
            if (name === "sqrt" && text[space(result2.end)] === "[") {
              const index = group(space(result2.end), depth + 1);
              if (!index) return null;
              result2 = join(result2, index);
            }
            for (let i = 0; i < argumentsNeeded.get(name); i++) {
              const arg = atom(space(result2.end), depth + 1, false);
              if (!arg) return null;
              result2 = join(result2, arg);
            }
          } else if (!symbols.has(name) && !functions.has(name)) return null;
        } else if ("{[(".includes(text[pos] || "\n")) {
          result2 = group(pos, depth + 1);
          if (!result2) return null;
        } else {
          const token = text.slice(pos).match(/^(?:\d+(?:\.\d+)?|[A-Za-z])/);
          if (!token || depth === 0 && /[A-Za-z]{2}/.test(text.slice(pos, pos + 2))) return null;
          result2 = { end: pos + token[0].length, command: false, math: false };
        }
        if (!suffix) return result2;
        const scripts = /* @__PURE__ */ new Set();
        while (true) {
          const next = space(result2.end);
          if (text[next] !== "_" && text[next] !== "^") break;
          if (scripts.has(text[next])) return null;
          scripts.add(text[next]);
          const arg = atom(space(next + 1), depth + 1, false);
          if (!arg) return null;
          result2 = { ...join(result2, arg), math: true, script: true };
        }
        while (text[result2.end] === "'") result2.end++;
        return result2;
      }
      function expression(pos, allowImplicit, close = "", depth = 0) {
        pos = space(pos);
        if (text[pos] === "+" || text[pos] === "-") pos = space(pos + 1);
        let result2 = atom(pos, depth);
        if (!result2) return null;
        while (true) {
          const next = space(result2.end);
          if (close && text[next] === close) return result2;
          const cmd = commandAt(next);
          const operatorLength = cmd && operators.has(cmd[1]) ? cmd[0].length : /[+\-*/=<>]/.test(text[next] || "\n") || close && text[next] === "," ? 1 : 0;
          if (operatorLength) {
            let rhs = space(next + operatorLength);
            if (text[rhs] === "+" || text[rhs] === "-") rhs = space(rhs + 1);
            const value = atom(rhs, depth);
            if (!value) return null;
            result2 = { ...join(result2, value), command: result2.command || value.command || Boolean(cmd), math: true };
          } else if (allowImplicit || next === result2.end && "{[(".includes(text[next] || "\n")) {
            const value = atom(next, depth);
            if (!value) return result2;
            result2 = join(result2, value);
          } else return result2;
        }
      }
      const result = expression(start, implicit);
      if (!result || !result.math || !result.command && !result.script) return null;
      if (/[A-Za-z0-9_\\{}^]/.test(text[result.end] || "\n")) return null;
      if (/^(?:\.[A-Za-z0-9_]|@)/.test(text.slice(result.end))) return null;
      return result;
    }
    module2.exports = { readLatex };
  }
});

// src/convert.js
var require_convert = __commonJS({
  "src/convert.js"(exports2, module2) {
    "use strict";
    var { readLatex } = require_latex();
    function convertMath2(text, { bare = false } = {}) {
      const protectedText = buildProtectedMask(text);
      const tableRows = buildTableMask(text);
      const newline = text.includes("\r\n") ? "\r\n" : "\n";
      const edits = [];
      for (let i = 0; i < text.length - 1; i++) {
        if (protectedText[i] || !isDelimiter(text, i, "(") && !isDelimiter(text, i, "[")) continue;
        const display = text[i + 1] === "[";
        const end = findMathEnd(text, protectedText, i, display ? "]" : ")");
        if (end < 0) continue;
        const body = text.slice(i + 2, end);
        if (!body.trim()) continue;
        if (tableRows[i] && (display || hasUnescapedPipe(body))) {
          i = end + 1;
          continue;
        }
        const insert = display ? displayReplacement(text, i, end + 2, body, newline) : "$" + body.trim() + "$";
        edits.push({ from: i, to: end + 2, insert });
        i = end + 1;
      }
      if (bare) addBareMathEdits(text, protectedText, tableRows, edits, newline);
      edits.sort((a, b) => a.from - b.from);
      let result = "";
      let previous = 0;
      for (const edit of edits) {
        result += text.slice(previous, edit.from) + edit.insert;
        previous = edit.to;
      }
      result += text.slice(previous);
      return { text: result, count: edits.length, edits };
    }
    function addBareMathEdits(text, mask, tables, edits, newline) {
      for (const edit of edits) mark(mask, edit.from, edit.to);
      for (const match of text.matchAll(/\\[()[\]]/g)) {
        if (mask[match.index] || isEscaped(text, match.index)) continue;
        const end = text.indexOf("\n", match.index);
        mark(mask, match.index, end < 0 ? text.length : end);
      }
      for (let i = 0; i < text.length; i++) {
        if (mask[i] || text[i] !== "$" || isEscaped(text, i)) continue;
        const display = text[i + 1] === "$";
        if (!display && /\s/.test(text[i + 1] || " ")) continue;
        const end = display ? -1 : text.indexOf("\n", i);
        mark(mask, i, end < 0 ? text.length : end);
      }
      for (const match of text.matchAll(/\[\[[^\n]*?\]\]|<[^>\n]+>/g)) mark(mask, match.index, match.index + match[0].length);
      const frontmatter = text.match(/^---\r?\n[\s\S]*?\r?\n(?:---|\.\.\.)(?:\r?\n|$)/);
      if (frontmatter) mark(mask, 0, frontmatter[0].length);
      const available = (from, to) => {
        for (let i = from; i < to; i++) if (mask[i]) return false;
        return true;
      };
      for (const line of linesOf(text)) {
        const prefix = containerPrefix(line.raw);
        const content = line.raw.slice(prefix.length).trim();
        const from = line.start + prefix.length + line.raw.slice(prefix.length).indexOf(content);
        const to = from + content.length;
        if (!content || tables[from] || !available(from, to)) continue;
        const formula = readLatex(content, 0, true);
        if (formula && formula.end === content.length) {
          edits.push({ from, to, insert: displayReplacement(text, from, to, content, newline), bare: true, display: true });
          mark(mask, from, to);
        }
      }
      let braces = 0;
      for (let i = 0; i < text.length; i++) {
        if (text[i] === "\n") braces = 0;
        if (!mask[i] && !isEscaped(text, i)) {
          if (text[i] === "{") braces++;
          if (text[i] === "}") braces = Math.max(0, braces - 1);
        }
        if (mask[i] || !/[\\A-Za-z]/.test(text[i]) || isEscaped(text, i)) continue;
        if (braces) continue;
        if (/[A-Za-z0-9_\\/.:@=<>+^\-]/.test(text[i - 1] || "\n")) continue;
        if (text[i] !== "\\" && !/^[A-Za-z][ \t]*[_^=<>+*/(\-]/.test(text.slice(i))) continue;
        const formula = readLatex(text, i);
        if (!formula || !available(i, formula.end)) continue;
        const body = text.slice(i, formula.end);
        if (tables[i] && hasUnescapedPipe(body)) continue;
        edits.push({ from: i, to: formula.end, insert: "$" + body + "$", bare: true, display: false });
        mark(mask, i, formula.end);
        i = formula.end - 1;
      }
    }
    function isEscaped(text, index) {
      let backslashes = 0;
      for (let i = index - 1; i >= 0 && text[i] === "\\"; i--) backslashes++;
      return backslashes % 2 === 1;
    }
    function isDelimiter(text, index, bracket) {
      return text[index] === "\\" && text[index + 1] === bracket && !isEscaped(text, index);
    }
    function findMathEnd(text, mask, start, closing) {
      const opening = closing === ")" ? "(" : "[";
      for (let i = start + 2; i < text.length - 1; i++) {
        if (mask[i] && !(closing === "]" && mask[i] === 2)) return -1;
        if (isDelimiter(text, i, closing)) return i;
        if (isDelimiter(text, i, opening)) return -1;
      }
      return -1;
    }
    function mark(mask, start, end, kind = 1) {
      mask.fill(kind, start, end);
    }
    function linesOf(text) {
      const lines = [];
      let start = 0;
      while (start < text.length) {
        const next = text.indexOf("\n", start);
        const end = next < 0 ? text.length : next + 1;
        lines.push({ start, end, raw: text.slice(start, end).replace(/\r?\n$/, "") });
        start = end;
      }
      return lines;
    }
    function hasUnescapedPipe(text) {
      for (let i = 0; i < text.length; i++) {
        if (text[i] === "|" && !isEscaped(text, i)) return true;
      }
      return false;
    }
    function tableCells(line) {
      const cells = [];
      let start = 0;
      for (let i = 0; i < line.length; i++) {
        if (line[i] === "|" && !isEscaped(line, i)) {
          cells.push(line.slice(start, i).trim());
          start = i + 1;
        }
      }
      cells.push(line.slice(start).trim());
      if (cells[0] === "") cells.shift();
      if (cells[cells.length - 1] === "") cells.pop();
      return cells;
    }
    function buildTableMask(text) {
      const mask = new Uint8Array(text.length);
      const lines = linesOf(text).map((line) => {
        const context = containerPrefix(line.raw);
        return {
          ...line,
          content: line.raw.slice(context.length),
          quote: context.quote.replace(/[ \t]/g, "")
        };
      });
      for (let i = 1; i < lines.length; i++) {
        const separator = lines[i];
        const header = lines[i - 1];
        if (!hasUnescapedPipe(separator.content) || !hasUnescapedPipe(header.content) || separator.quote !== header.quote) continue;
        const columns = tableCells(separator.content);
        if (!columns.length || !columns.every((cell) => /^:?-+:?$/.test(cell)) || tableCells(header.content).length !== columns.length) continue;
        mark(mask, header.start, separator.end);
        for (let j = i + 1; j < lines.length; j++) {
          const row = lines[j];
          if (row.quote !== separator.quote || !hasUnescapedPipe(row.content)) break;
          mark(mask, row.start, row.end);
        }
      }
      return mask;
    }
    function containerPrefix(line) {
      let cursor = 0;
      let quote = "";
      while (true) {
        const match = line.slice(cursor).match(/^ {0,3}>[ \t]?/);
        if (!match) break;
        quote += match[0];
        cursor += match[0].length;
      }
      const rest = line.slice(cursor);
      const list = rest.match(/^( {0,3})(?:[-+*]|\d{1,9}[.)])[ \t]+(?:\[[ xX]\][ \t]+)?/);
      if (list) {
        return {
          length: cursor + list[0].length,
          quote,
          continuation: quote + " ".repeat(list[0].replace(/\t/g, "    ").length),
          listWidth: list[0].replace(/\t/g, "    ").length
        };
      }
      const indent = rest.match(/^ {0,3}/)[0];
      return {
        length: cursor + indent.length,
        quote,
        continuation: quote + indent,
        listWidth: 0
      };
    }
    function buildProtectedMask(text, { math = true } = {}) {
      const mask = new Uint8Array(text.length);
      const lines = linesOf(text);
      let fence = null;
      let listIndent = 0;
      let listQuote = "";
      for (const line of lines) {
        const context = containerPrefix(line.raw);
        const afterQuote = line.raw.slice(context.quote.length);
        const content = line.raw.slice(context.length);
        if (fence) {
          mark(mask, line.start, line.end);
          const closing = content.match(/^(`{3,}|~{3,})[ \t]*$/);
          if (closing && closing[1][0] === fence.char && closing[1].length >= fence.length) fence = null;
          continue;
        }
        const opener = content.match(/^(`{3,}|~{3,})(.*)$/);
        if (opener && !(opener[1][0] === "`" && opener[2].includes("`"))) {
          fence = { char: opener[1][0], length: opener[1].length };
          mark(mask, line.start, line.end);
          continue;
        }
        if (context.listWidth) {
          listIndent = context.listWidth;
          listQuote = context.quote;
        } else if (afterQuote.trim() && (context.quote !== listQuote || !afterQuote.startsWith(" ".repeat(listIndent)))) {
          listIndent = 0;
        }
        const relative = listIndent && !context.listWidth ? afterQuote.slice(listIndent) : afterQuote;
        if (/^(?: {4}|\t)/.test(relative)) mark(mask, line.start, line.end, 2);
        if (/^ {0,3}\[[^\]\n]+\]:[ \t]*\S/.test(afterQuote)) mark(mask, line.start, line.end);
      }
      const htmlCode = /<(pre|code)\b[^>]*>[\s\S]*?<\/\1\s*>/gi;
      for (const match of text.matchAll(htmlCode)) mark(mask, match.index, match.index + match[0].length);
      for (let i = 0; i < text.length; i++) {
        if (mask[i] || text[i] !== "`" || isEscaped(text, i)) continue;
        let width = 1;
        while (text[i + width] === "`") width++;
        let close = -1;
        for (let j = i + width; j < text.length; j++) {
          if (mask[j]) break;
          if (text[j] !== "`") continue;
          let run = 1;
          while (text[j + run] === "`") run++;
          if (run === width) {
            close = j + run;
            break;
          }
          j += run - 1;
        }
        if (close >= 0) {
          mark(mask, i, close);
          i = close - 1;
        } else i += width - 1;
      }
      for (let i = 0; i < text.length; i++) {
        if (mask[i] || text[i] !== "[" || isEscaped(text, i)) continue;
        const labelEnd = balancedEnd(text, i, "[", "]");
        if (labelEnd < 0) continue;
        const next = text[labelEnd];
        const end = next === "(" ? balancedEnd(text, labelEnd, "(", ")") : next === "[" ? balancedEnd(text, labelEnd, "[", "]") : -1;
        if (end >= 0) {
          mark(mask, i, end);
          i = end - 1;
        }
      }
      const urls = /(?:<\/?(?:https?:\/\/|mailto:)[^>\r\n]*>|(?:https?:\/\/|obsidian:\/\/)[^\s<>]+|<[^\s<>@]+@[^\s<>@]+>)/gi;
      for (const match of text.matchAll(urls)) mark(mask, match.index, match.index + match[0].length);
      if (!math) return mask;
      for (let i = 0; i < text.length; i++) {
        if (mask[i] || text[i] !== "$" || isEscaped(text, i)) continue;
        const width = text[i + 1] === "$" ? 2 : 1;
        if (text[i + width] === "$" || width === 1 && /\s/.test(text[i + 1] || " ")) continue;
        for (let j = i + width; j < text.length; j++) {
          if (width === 1 && text[j] === "\n") break;
          if (text[j] !== "$" || isEscaped(text, j)) continue;
          const closingWidth = text[j + 1] === "$" ? 2 : 1;
          if (closingWidth !== width) {
            j += closingWidth - 1;
            continue;
          }
          if (width === 1 && /\s/.test(text[j - 1])) continue;
          mark(mask, i, j + width);
          i = j + width - 1;
          break;
        }
      }
      return mask;
    }
    function balancedEnd(text, start, opening, closing) {
      let depth = 0;
      for (let i = start; i < text.length; i++) {
        if (isEscaped(text, i)) continue;
        if (text[i] === opening) depth++;
        if (text[i] === closing && --depth === 0) return i + 1;
        if (text[i] === "\n" && opening === "[") return -1;
      }
      return -1;
    }
    function displayReplacement(text, start, end, body, newline) {
      const lineStart = text.lastIndexOf("\n", start - 1) + 1;
      const nextLine = text.indexOf("\n", end);
      const lineEnd = nextLine < 0 ? text.length : nextLine;
      const before = text.slice(lineStart, start);
      const after = text.slice(end, lineEnd);
      const context = containerPrefix(before);
      const prefix = context.listWidth ? context.continuation : context.quote + before.slice(context.quote.length).match(/^[ \t]*/)[0];
      const lines = body.split(/\r?\n/).map((line, index) => {
        if (index > 0 && prefix && line.startsWith(prefix)) return line.slice(prefix.length);
        if (index > 0 && context.quote && line.startsWith(context.quote)) return line.slice(context.quote.length);
        return line;
      });
      while (lines.length && !lines[0].trim()) lines.shift();
      while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
      if (lines.length) {
        lines[0] = lines[0].trimStart();
        lines[lines.length - 1] = lines[lines.length - 1].trimEnd();
      }
      const leading = before.slice(context.length).trim() ? newline + prefix : "";
      const trailing = after.trim() ? newline + prefix : "";
      return leading + "$$" + newline + lines.map((line) => prefix + line).join(newline) + newline + prefix + "$$" + trailing;
    }
    module2.exports = { convertMath: convertMath2, buildProtectedMask, hasUnescapedPipe };
  }
});

// src/html-delimiters.js
var require_html_delimiters = __commonJS({
  "src/html-delimiters.js"(exports2, module2) {
    "use strict";
    var { buildProtectedMask, hasUnescapedPipe } = require_convert();
    var INLINE_FORMATTING = "span, strong, b, em, i, u, s, strike, del, mark, small, sub, sup, font";
    function protectHtmlDelimiters(root, protect, replacements) {
      const nodes = [];
      const skipped = /* @__PURE__ */ new Set();
      let text = "";
      const blocks = new Set("p div section article blockquote li ul ol h1 h2 h3 h4 h5 h6".split(" "));
      function visit(node) {
        if (node.nodeType === 3) {
          const from = text.length;
          text += node.nodeValue;
          nodes.push({ node, from, to: text.length });
          return;
        }
        if (node.nodeType !== 1) return;
        if (node.matches("pre, code, script, style, textarea, .katex, .katex-display, math, mjx-container")) {
          text += "\0";
          return;
        }
        const barrier = /^(?:td|th|tr|table)$/.test(node.localName);
        const block = blocks.has(node.localName);
        if (barrier) text += "\0";
        else if (block || node.localName === "br") text += "\n";
        for (const child of Array.from(node.childNodes)) visit(child);
        if (barrier) text += "\0";
        else if (block) text += "\n";
      }
      visit(root);
      const mask = buildProtectedMask(text, { math: false });
      for (const item of nodes) {
        if (mask.subarray(item.from, item.to).some((value) => value)) skipped.add(item.node);
      }
      for (const range of delimitedRanges(text, mask).reverse()) {
        const affected = nodes.filter((item) => item.to > range.from && item.from < range.to);
        if (!range.complete) {
          for (const { node } of affected) skipped.add(node);
          continue;
        }
        let tex = text.slice(range.bodyFrom, range.bodyTo).trim();
        for (const replacement of replacements) {
          if (replacement.tex !== void 0) tex = tex.split(replacement.token).join(replacement.tex);
        }
        if (!affected.length || !tex) continue;
        if (affected.some(({ node }) => range.display && node.parentElement.closest("td, th, a") || node.parentElement.closest("td, th") && hasUnescapedPipe(tex))) {
          for (const { node } of affected) skipped.add(node);
          continue;
        }
        const token = protect(range.display ? { tex, display: true } : { tex, markdown: "$" + tex + "$" });
        for (let i = 0; i < affected.length; i++) {
          const { node, from, to } = affected[i];
          const start = Math.max(range.from, from) - from;
          const end = Math.min(range.to, to) - from;
          node.nodeValue = node.nodeValue.slice(0, start) + (i === 0 ? token : "") + node.nodeValue.slice(end);
          if (!node.nodeValue) {
            let parent = node.parentElement;
            node.remove();
            while (parent && parent.matches(INLINE_FORMATTING) && !parent.childNodes.length) {
              const next = parent.parentElement;
              parent.remove();
              parent = next;
            }
          }
        }
      }
      return skipped;
    }
    function delimitedRanges(text, mask) {
      const ranges = [];
      const escaped = (index) => {
        let count = 0;
        for (let i = index - 1; i >= 0 && text[i] === "\\"; i--) count++;
        return count % 2 === 1;
      };
      for (let i = 0; i < text.length; i++) {
        if (mask[i] || escaped(i)) continue;
        if (text.startsWith("$$$", i)) {
          let width = 3;
          while (text[i + width] === "$") width++;
          const close = text.indexOf("$".repeat(width), i + width);
          const barrier = text.indexOf("\0", i + width);
          const end2 = close >= 0 && (barrier < 0 || close < barrier) ? close + width : barrier < 0 ? text.length : barrier;
          ranges.push({ from: i, to: end2, complete: false });
          i = end2 - 1;
          continue;
        }
        const opener = text[i] === "$" ? text[i + 1] === "$" ? "$$" : "$" : text[i] === "\\" && (text[i + 1] === "(" || text[i + 1] === "[") ? text.slice(i, i + 2) : "";
        if (!opener) continue;
        const dollar = opener[0] === "$";
        const display = opener === "$$" || opener === "\\[";
        const closer = dollar ? opener : display ? "\\]" : "\\)";
        if (dollar && (text[i - 1] === "$" || text[i + opener.length] === "$")) continue;
        if (opener === "$" && /\s/.test(text[i + 1] || " ")) continue;
        let complete = false;
        let end = i + opener.length;
        for (; end < text.length; end++) {
          if (text[end] === "\0" || !display && text[end] === "\n") break;
          if (escaped(end)) continue;
          if (!dollar && text.startsWith(opener, end)) break;
          if (!text.startsWith(closer, end)) continue;
          if (dollar && (text[end - 1] === "$" || text[end + closer.length] === "$")) continue;
          if (closer === "$" && /\s/.test(text[end - 1])) continue;
          ranges.push({ from: i, to: end + closer.length, bodyFrom: i + opener.length, bodyTo: end, display, complete: true });
          i = end + closer.length - 1;
          complete = true;
          break;
        }
        if (!complete) {
          ranges.push({ from: i, to: end, complete: false });
          i = end - 1;
        }
      }
      return ranges;
    }
    function liftDisplayMath(root, replacements) {
      const nodes = [];
      function collect(node) {
        if (node.nodeType === 3) nodes.push(node);
        else for (const child of Array.from(node.childNodes)) collect(child);
      }
      collect(root);
      for (const node of nodes) {
        const tokens = replacements.filter((item) => item.display && node.nodeValue.includes(item.token)).map((item) => ({ token: item.token, index: node.nodeValue.indexOf(item.token) })).sort((a, b) => b.index - a.index);
        for (const { token, index } of tokens) {
          const document = root.ownerDocument;
          const marker = document.createElement("span");
          marker.textContent = token;
          const after = document.createTextNode(node.nodeValue.slice(index + token.length));
          node.nodeValue = node.nodeValue.slice(0, index);
          node.parentNode.insertBefore(marker, node.nextSibling);
          node.parentNode.insertBefore(after, marker.nextSibling);
          while (marker.parentElement.matches(INLINE_FORMATTING)) {
            const parent = marker.parentElement;
            const before = parent.cloneNode(false);
            const tail = parent.cloneNode(false);
            while (parent.firstChild !== marker) before.appendChild(parent.firstChild);
            while (marker.nextSibling) tail.appendChild(marker.nextSibling);
            parent.replaceWith(
              ...before.textContent || before.childElementCount ? [before] : [],
              marker,
              ...tail.textContent || tail.childElementCount ? [tail] : []
            );
          }
          marker.replaceWith(document.createTextNode(token));
        }
      }
    }
    module2.exports = { protectHtmlDelimiters, liftDisplayMath };
  }
});

// src/html.js
var require_html = __commonJS({
  "src/html.js"(exports2, module2) {
    "use strict";
    var { convertMath: convertMath2, hasUnescapedPipe } = require_convert();
    var { protectHtmlDelimiters, liftDisplayMath } = require_html_delimiters();
    var SKIP_SELECTOR = "pre, code, script, style, textarea";
    var MATH_SELECTOR = ".katex, .katex-display, math, mjx-container";
    function convertHtmlMath2(html, htmlToMarkdown2, doc) {
      var _a;
      const Parser = doc ? doc.defaultView.DOMParser : DOMParser;
      const parser = new Parser();
      let document = parser.parseFromString(html, "text/html");
      if (((_a = document.documentElement) == null ? void 0 : _a.localName) !== "html") {
        document = parser.parseFromString(`<!doctype html><html><body>${html}</body></html>`, "text/html");
      }
      const root = document.body;
      const collisionSource = html + root.innerHTML + root.textContent;
      let nonce = 0;
      let prefix;
      do {
        prefix = `ObsidianMathPasteToken${nonce++}Item`;
      } while (collisionSource.includes(prefix));
      const replacements = [];
      function protect(replacement) {
        const token = `${prefix}${replacements.length}End`;
        replacements.push({ token, ...replacement });
        return token;
      }
      for (const annotation of root.querySelectorAll("annotation[encoding]")) {
        if (!root.contains(annotation)) continue;
        if (annotation.getAttribute("encoding").trim().toLowerCase() !== "application/x-tex") continue;
        if (annotation.closest(SKIP_SELECTOR)) continue;
        const katex = annotation.closest(".katex");
        const math = annotation.closest("math");
        const mathjax = annotation.closest("mjx-container");
        let container = katex || mathjax || math;
        if (!container) continue;
        const display = container.closest(".katex-display");
        const isBlock = Boolean(display) || math && math.getAttribute("display") === "block" || mathjax && mathjax.getAttribute("display") === "true";
        if (display) container = display;
        if (container.closest(SKIP_SELECTOR)) continue;
        const tex = annotation.textContent.trim();
        if (!tex) continue;
        const inTable = Boolean(container.closest("td, th"));
        if (inTable && (isBlock || hasUnescapedPipe(tex))) continue;
        if (isBlock && container.closest("a")) continue;
        const replacement = isBlock ? { tex, display: true } : { tex, markdown: `$${tex}$` };
        container.replaceWith(document.createTextNode(protect(replacement)));
      }
      const skippedNodes = protectHtmlDelimiters(root, protect, replacements);
      function walk(node) {
        if (node.nodeType === 1) {
          if (node !== root && node.matches(`${SKIP_SELECTOR}, ${MATH_SELECTOR}`)) return;
          for (const child of Array.from(node.childNodes)) walk(child);
        } else if (node.nodeType === 3) {
          if (skippedNodes.has(node)) return;
          const source = node.nodeValue;
          const result = convertMath2(source, { bare: true });
          if (!result.edits.length) return;
          let position = 0;
          let protectedText = "";
          for (const edit of result.edits) {
            let display = edit.bare ? edit.display : source[edit.from + 1] === "[";
            const tex = edit.bare ? source.slice(edit.from, edit.to) : source.slice(edit.from + 2, edit.to - 2).trim();
            if (edit.bare && display) {
              const block = node.parentElement.closest("p, li, blockquote, div, td, th");
              display = Boolean(block && block.textContent.trim() === tex);
            }
            if (node.parentElement.closest("td, th") && (display || hasUnescapedPipe(tex))) continue;
            if (display && node.parentElement.closest("a")) continue;
            const replacement = display ? { tex, display: true } : { tex, markdown: edit.bare ? `$${tex}$` : edit.insert };
            protectedText += source.slice(position, edit.from) + protect(replacement);
            position = edit.to;
          }
          node.nodeValue = protectedText + source.slice(position);
        }
      }
      walk(root);
      if (!replacements.length) return { text: null, count: 0 };
      liftDisplayMath(root, replacements);
      let text = htmlToMarkdown2(root.innerHTML);
      let count = 0;
      for (const { token, markdown, display } of replacements) {
        if (display) continue;
        if (text.includes(token)) count++;
        text = text.split(token).join(markdown);
      }
      for (const { token, tex, display } of replacements) {
        if (!display) continue;
        const position = text.indexOf(token);
        if (position < 0) continue;
        const bodyToken = `${token}Body`;
        const expression = `\\[${bodyToken}\\]`;
        const probe = text.slice(0, position) + expression + text.slice(position + token.length);
        const edit = convertMath2(probe).edits.find((item) => item.from === position && item.to === position + expression.length);
        let markdown = `\\[${tex}\\]`;
        if (edit) {
          const bodyPosition = edit.insert.indexOf(bodyToken);
          const lineStart = edit.insert.lastIndexOf("\n", bodyPosition - 1) + 1;
          const continuation = edit.insert.slice(lineStart, bodyPosition);
          const newline = edit.insert.includes("\r\n") ? "\r\n" : "\n";
          const body = tex.split(/\r?\n/).join(newline + continuation);
          markdown = edit.insert.replace(bodyToken, () => body);
          count++;
        }
        text = text.slice(0, position) + markdown + text.slice(position + token.length);
      }
      return { text: count ? text : null, count };
    }
    module2.exports = { convertHtmlMath: convertHtmlMath2 };
  }
});

// src/main.js
var { Plugin, htmlToMarkdown } = require("obsidian");
var { convertMath } = require_convert();
var { convertHtmlMath } = require_html();
function convertRange(before, inserted, after) {
  const start = before.length;
  const end = start + inserted.length;
  const edits = convertMath(before + inserted + after, { bare: true }).edits.filter((e) => e.from >= start && e.to <= end);
  let text = inserted;
  for (const e of edits.slice().reverse()) text = text.slice(0, e.from - start) + e.insert + text.slice(e.to - start);
  return { text, count: edits.length };
}
function selectionContext(editor) {
  const source = editor.getValue();
  const from = editor.posToOffset(editor.getCursor("from"));
  const to = editor.posToOffset(editor.getCursor("to"));
  return { before: source.slice(0, from), after: source.slice(to) };
}
function acceptsMath(context) {
  return convertRange(context.before, "\\(MathPasteContextProbe\\)", context.after).count === 1;
}
var MathPasteBridge = class extends Plugin {
  onload() {
    this.registerEvent(this.app.workspace.on("editor-paste", (event, editor) => this.onPaste(event, editor)));
  }
  onPaste(event, editor) {
    var _a;
    if (event.defaultPrevented || !event.clipboardData) return;
    if (((_a = event.clipboardData.files) == null ? void 0 : _a.length) || editor.listSelections().length !== 1) return;
    const plain = event.clipboardData.getData("text/plain");
    const html = event.clipboardData.getData("text/html");
    const markdown = plain && html.includes("<!-- obsidian -->") ? plain : event.clipboardData.getData("text/markdown");
    if (!plain && !html && !markdown) return;
    const context = selectionContext(editor);
    if (!acceptsMath(context)) return;
    let result;
    try {
      if (markdown) {
        result = convertRange(context.before, markdown, context.after);
      } else if (html) {
        const recovered = convertHtmlMath(html, htmlToMarkdown);
        if (recovered.count > 0) {
          const remaining = convertRange(context.before, recovered.text, context.after);
          result = { text: remaining.text, count: recovered.count + remaining.count };
        }
      }
      if (!result && plain) result = convertRange(context.before, plain, context.after);
    } catch (error) {
      console.warn("Math Paste Bridge: paste conversion failed", error);
      return;
    }
    if (!result || result.count === 0) return;
    event.preventDefault();
    editor.replaceSelection(result.text, "input.paste");
  }
};
module.exports = MathPasteBridge;
module.exports.convertRange = convertRange;
module.exports.acceptsMath = acceptsMath;

/* nosourcemap */