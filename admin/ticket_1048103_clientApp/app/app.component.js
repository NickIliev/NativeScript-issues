"use strict";
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: "app",
            directives: [router_1.NS_ROUTER_DIRECTIVES],
            template: "\n      <page-router-outlet></page-router-outlet>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map