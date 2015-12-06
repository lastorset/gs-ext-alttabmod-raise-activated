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
const Popup = AltTab.AppSwitcherPopup;

let _originalFinish;
let _originalAppActivated;

function _modifiedFinish(timestamp) {
    let appIcon = this._items[this._selectedIndex];
    if (this._currentWindow < 0)
        Main.activateWindow(appIcon.cachedWindows[0], timestamp);
    else
        Main.activateWindow(appIcon.cachedWindows[this._currentWindow], timestamp);

    this.parent(timestamp);
}

function init(metadata) {
}

function enable() {
    _originalFinish = Popup.prototype._finish;
    Popup.prototype._finish = Popup.wrapFunction('_finish', _modifiedFinish);
}

function disable() {
    Popup.prototype._finish = _originalFinish;
    _originalFinish = null;
}
