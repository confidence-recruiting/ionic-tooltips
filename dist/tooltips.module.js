import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Tooltip } from './tooltip.directive';
import { TooltipBox } from './tooltip-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
var TooltipsModule = (function () {
    function TooltipsModule() {
    }
    TooltipsModule.forRoot = function () {
        return {
            ngModule: TooltipsModule,
            providers: [IonicModule, BrowserAnimationsModule]
        };
    };
    TooltipsModule.forChild = function () {
        return {
            ngModule: TooltipsModule,
            providers: [IonicModule]
        };
    };
    return TooltipsModule;
}());
export { TooltipsModule };
TooltipsModule.decorators = [
    { type: NgModule, args: [{
                entryComponents: [
                    TooltipBox
                ],
                declarations: [
                    Tooltip,
                    TooltipBox,
                ],
                imports: [
                    IonicModule
                ],
                exports: [
                    Tooltip
                ]
            },] },
];
/** @nocollapse */
TooltipsModule.ctorParameters = function () { return []; };
//# sourceMappingURL=tooltips.module.js.map