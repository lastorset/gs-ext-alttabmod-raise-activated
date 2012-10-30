const Mainloop = imports.mainloop;
const Main = imports.ui.main;
const AltTab = imports.ui.altTab;

let _originalFinish;
let _originalAppActivated;

function _modifiedFinish() {
    return function () {
        let app = this._appIcons[this._currentApp];
        let window;
        if (this._currentWindow >= 0)
            window = app.cachedWindows[this._currentWindow];
        else
            window = app.cachedWindows[0];
        Main.activateWindow(window);
        this.destroy();
    };
}

function _modifiedAppActivated() {
    return function (appSwitcher, n) {
        let app = this._appIcons[n];
        let window;
        if (n == this._currentApp && this._currentWindow >= 0)
            window = app.cachedWindows[this._currentWindow];
        else
            window = app.cachedWindows[0];
        Main.activateWindow(window);
        this.destroy();
    };
}

function init(metadata) {
}

function enable() {
    _originalFinish = AltTab.AltTabPopup.prototype._finish;
    AltTab.AltTabPopup.prototype._finish = _modifiedFinish();
    _originalAppActivated = AltTab.AltTabPopup.prototype._appActivated;
    AltTab.AltTabPopup.prototype._appActivated = _modifiedAppActivated();
}

function disable() {
    AltTab.AltTabPopup.prototype._finish = _originalFinish;
    _originalFinish = null;
    AltTab.AltTabPopup.prototype._appActivated = _originalAppActivated;
    _originalAppActivated = null;
}

