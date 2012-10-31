/*
 * Alt Tab Mod: Only Raise Activated Window - GNOME Shell extension
 * Copyright (C) 2012  Davi da Silva Böger  (dsboger@gmail.com)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
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
