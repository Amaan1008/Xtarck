// ─────────────────────────────────────────────
//  Xtrack — Ambient globals
//
//  Chart.js, Leaflet and jsPDF are loaded from CDN via plain <script src>
//  tags (see the <head> of dashboard.html / xtrack.html / admin/dashboard.html),
//  not npm packages, so there are no @types/* packages resolving them.
//  These declarations just tell the compiler the globals exist; the actual
//  typings stay loose (any) since only some pages load some of these.
// ─────────────────────────────────────────────

declare const Chart: any;
declare const L: any;

/**
 * xtrack.ts guards calls to these with `typeof populateDestSelects ===
 * 'function'` — in plain JS, `typeof` on an undeclared name safely
 * evaluates to `'undefined'` rather than throwing, so this is a
 * legitimate "call it only if some other script defined it" pattern.
 * TypeScript, unlike the browser, still requires the name to resolve to
 * something, so these are declared (not defined) — ambient declarations
 * emit no JS, so this changes nothing at runtime; the guard still
 * evaluates to false and the call still never happens unless another
 * script on the page really does define these.
 */
declare function populateDestSelects(): void;
declare function refreshCategoryDestinations(): void;

interface Window {
  jspdf: any;
  /** Set by dashboard.ts/xtrack.ts after a successful /api/login.php or /api/check_auth.php call. */
  _currentUser: any;
  /** Cache of the logged-in user's trips, set by xtrack.ts's server-backed trip storage. */
  _serverTrips: any;
  /** Cache of the logged-in user's reviews, set by xtrack.ts's server-backed review storage. */
  _serverReviews: any;
}
