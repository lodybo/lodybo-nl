/**
 * Part 2 of the ULTIMATE DARK MODE HACK: if 'darkModeEnabled' is found on window, quickly set the "dark" class.
 */
(function () {
  const a = document.querySelector('html');
  (function (b) {
    a.classList.add(!0 === b ? 'dark' : void 0),
      a.classList.remove(!0 === b ? void 0 : 'dark');
  })(window.darkModeEnabled);
})();
