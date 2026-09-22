// ─────────────────────────────────────────────
//  Xtrack — DOM lookup helpers
//
//  This project keeps the original "plain <script>" (non-module) style
//  so existing onclick="..." / onsubmit="..." attributes in the HTML
//  keep working unchanged. That means these helpers are attached to the
//  global scope on purpose — do not add `export`/`import` here, or this
//  file (and every file that then imports it) turns into an ES module
//  and stops being globally visible to inline HTML event handlers.
//
//  document.getElementById() / querySelector() return the *base*
//  HTMLElement/Element type, which doesn't have .value, .checked, etc.
//  These wrappers let call sites opt into a concrete type only where it
//  matters (e.g. $<HTMLInputElement>('email').value), and stay untyped
//  (any) everywhere else — a deliberate, pragmatic middle ground for a
//  large existing codebase rather than casting all ~450 lookups by hand.
//
//  Load this file (js/dom.js) BEFORE any page script that calls $ / $q / $qa.
// ─────────────────────────────────────────────

function $<T = any>(id: string): T {
  return document.getElementById(id) as unknown as T;
}

function $q<T = any>(selector: string, root: ParentNode = document): T {
  return root.querySelector(selector) as unknown as T;
}

function $qa<T extends Element = HTMLElement>(selector: string, root: ParentNode = document): T[] {
  return Array.from(root.querySelectorAll<T>(selector));
}
