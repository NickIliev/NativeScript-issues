/*! *****************************************************************************
Copyright (c) 2015 Tangra Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
***************************************************************************** */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var common = require("./drop-down-common");
var utils = require("utils/utils");
var types = require("utils/types");
var label = require("ui/label");
var stackLayout = require("ui/layouts/stack-layout");
global.moduleMerge(common, exports);
var LABELVIEWID = "spinner-label";
var RealizedViewType;
(function (RealizedViewType) {
    RealizedViewType[RealizedViewType["ItemView"] = 0] = "ItemView";
    RealizedViewType[RealizedViewType["DropDownView"] = 1] = "DropDownView";
})(RealizedViewType || (RealizedViewType = {}));
var DropDown = (function (_super) {
    __extends(DropDown, _super);
    function DropDown() {
        _super.apply(this, arguments);
        this._realizedItems = {};
    }
    DropDown.prototype._createUI = function () {
        this._android = new android.widget.Spinner(this._context);
        if (!this._androidViewId) {
            this._androidViewId = android.view.View.generateViewId();
        }
        this._android.setId(this._androidViewId);
        this.android.setAdapter(new DropDownAdapter(this));
        var that = new WeakRef(this);
        this.android.setOnItemSelectedListener(new android.widget.AdapterView.OnItemSelectedListener({
            onItemSelected: function (parent, convertView, index, id) {
                var owner = that.get();
                owner.selectedIndex = index;
            },
            onNothingSelected: function () { }
        }));
        if (this.selectedIndex !== null && this.selectedIndex !== undefined) {
            this.android.setSelection(this.selectedIndex);
        }
    };
    Object.defineProperty(DropDown.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    DropDown.prototype._onItemsPropertyChanged = function (data) {
        if (!this._android
            || !this._android.getAdapter()) {
            return;
        }
        this._updateSelectedIndexOnItemsPropertyChanged(data.newValue);
        this.android.getAdapter().notifyDataSetChanged();
    };
    DropDown.prototype._onDetached = function (force) {
        _super.prototype._onDetached.call(this, force);
        var keys = Object.keys(this._realizedItems);
        var i;
        var length = keys.length;
        var view;
        var key;
        for (i = 0; i < length; i++) {
            key = keys[i];
            view = this._realizedItems[key];
            view.parent._removeView(view);
            delete this._realizedItems[key];
        }
    };
    DropDown.prototype._getRealizedView = function (convertView, realizedViewType) {
        if (!convertView) {
            var view_1 = new label.Label();
            var layout = new stackLayout.StackLayout();
            var defaultPadding = 4 * utils.layout.getDisplayDensity();
            view_1.id = LABELVIEWID;
            if (realizedViewType === RealizedViewType.DropDownView) {
                layout.paddingTop = layout.paddingBottom = layout.paddingLeft = layout.paddingRight = defaultPadding;
            }
            layout.addChild(view_1);
            return layout;
        }
        return this._realizedItems[convertView.hashCode()];
    };
    DropDown.prototype._onSelectedIndexPropertyChanged = function (data) {
        _super.prototype._onSelectedIndexPropertyChanged.call(this, data);
        if (this.android) {
            this.android.setSelection(data.newValue);
        }
    };
    DropDown.prototype._updateSelectedIndexOnItemsPropertyChanged = function (newItems) {
        var newItemsCount = 0;
        if (newItems && newItems.length) {
            newItemsCount = newItems.length;
        }
        if (newItemsCount === 0) {
            this.selectedIndex = undefined;
        }
        else if (types.isUndefined(this.selectedIndex)
            || this.selectedIndex >= newItemsCount) {
            this.selectedIndex = 0;
        }
    };
    return DropDown;
})(common.DropDown);
exports.DropDown = DropDown;
var DropDownAdapter = (function (_super) {
    __extends(DropDownAdapter, _super);
    function DropDownAdapter(dropDown) {
        _super.call(this);
        this._dropDown = dropDown;
        return global.__native(this);
    }
    DropDownAdapter.prototype.getCount = function () {
        return this._dropDown && this._dropDown.items ? this._dropDown.items.length : 0;
    };
    DropDownAdapter.prototype.getItem = function (i) {
        if (this._dropDown
            && this._dropDown.items
            && i < this._dropDown.items.length) {
            if(typeof (this._dropDown.items.getItem ? this._dropDown.items.getItem(i) : this._dropDown.items[i]) === "object") {
                return this._dropDown.items.getItem ? this._dropDown.items.getItem(i).DisplayValue : this._dropDown.items[i].DisplayValue;
            }
            else {
                return this._dropDown.items.getItem ? this._dropDown.items.getItem(i) : this._dropDown.items[i];
            }
        }
        return null;
    };
    DropDownAdapter.prototype.getItemId = function (i) {
        return long(i);
    };
    DropDownAdapter.prototype.hasStableIds = function () {
        return true;
    };
    DropDownAdapter.prototype.getView = function (index, convertView, parent) {
        return this._generateView(index, convertView, parent, RealizedViewType.ItemView);
    };
    DropDownAdapter.prototype.getDropDownView = function (index, convertView, parent) {
        return this._generateView(index, convertView, parent, RealizedViewType.DropDownView);
    };
    DropDownAdapter.prototype._generateView = function (index, convertView, parent, realizedViewType) {
        if (!this._dropDown) {
            return null;
        }
        var view = this._dropDown._getRealizedView(convertView, realizedViewType);
        if (view) {
            if (!view.parent) {
                this._dropDown._addView(view);
                convertView = view.android;
            }
            view.getViewById(LABELVIEWID).text = this.getItem(index);
            this._dropDown._realizedItems[convertView.hashCode()] = view;
        }
        return convertView;
    };
    return DropDownAdapter;
})(android.widget.BaseAdapter);
