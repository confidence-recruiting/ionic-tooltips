import { Directive, ElementRef, Input, ApplicationRef, ComponentFactoryResolver, HostListener } from '@angular/core';
import { Platform } from 'ionic-angular';
import { TooltipBox } from './tooltip-box.component';
var Tooltip = (function () {
    function Tooltip(el, appRef, platform, _componentFactoryResolver) {
        this.el = el;
        this.appRef = appRef;
        this.platform = platform;
        this._componentFactoryResolver = _componentFactoryResolver;
        this.event = 'click';
        this.duration = 3000;
        this._arrow = false;
        this._navTooltip = false;
        this._canShow = true;
        this._active = false;
    }
    Object.defineProperty(Tooltip.prototype, "navTooltip", {
        get: function () {
            return this._navTooltip;
        },
        set: function (val) {
            this._navTooltip = typeof val !== 'boolean' || val !== false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tooltip.prototype, "arrow", {
        get: function () { return this._arrow; },
        set: function (val) {
            this._arrow = typeof val !== 'boolean' || val !== false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tooltip.prototype, "active", {
        get: function () { return this._active; },
        set: function (val) {
            this._active = typeof val !== 'boolean' || val !== false;
            this._active
                ? this.canShow && this.showTooltip()
                : this._removeTooltip();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Show the tooltip immediately after initiating view if set to
     */
    Tooltip.prototype.ngAfterViewInit = function () {
        if (this._active) {
            this.trigger();
        }
    };
    Object.defineProperty(Tooltip.prototype, "canShow", {
        /**
         * @return {boolean} TRUE if the tooltip can be shown
         */
        get: function () {
            return this._canShow && this.tooltip !== '';
        },
        /**
         * Set the canShow property
         * Ensure that tooltip is shown only if the tooltip string is not falsey
         */
        set: function (show) {
            this._canShow = show;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Handles the click/press event and shows a tooltip.
     * If a tooltip already exists, it will just reset it's timer.
     */
    Tooltip.prototype.trigger = function () {
        if (!this.canShow)
            return;
        if (this.tooltipElement) {
            this._resetTimer();
        }
        else {
            this.showTooltip();
        }
    };
    /**
     * Creates a new tooltip component and adjusts it's properties to show properly.
     */
    Tooltip.prototype.showTooltip = function () {
        var _this = this;
        this._createTooltipComponent();
        var tooltipComponent = this.tooltipElement.instance;
        tooltipComponent.text = this.tooltip;
        tooltipComponent.init.then(function () {
            var tooltipPosition = _this._getTooltipPosition();
            tooltipComponent.posLeft = tooltipPosition.left;
            tooltipComponent.posTop = tooltipPosition.top;
            tooltipComponent.fadeState = 'visible';
            if (_this.arrow) {
                var arrowPosition = void 0;
                if (_this.positionV === 'top') {
                    arrowPosition = 'bottom';
                }
                else if (_this.positionV === 'bottom') {
                    arrowPosition = 'top';
                }
                else if (_this.positionH === 'left') {
                    arrowPosition = 'right';
                }
                else {
                    arrowPosition = 'left';
                }
                tooltipComponent.arrow = arrowPosition;
            }
            if (!_this._active) {
                _this.tooltipTimeout = setTimeout(_this._removeTooltip.bind(_this), _this.duration);
            }
        });
    };
    Tooltip.prototype.onClick = function () {
        if (this.event === 'click')
            this.trigger();
    };
    Tooltip.prototype.onPress = function () {
        if (this.event === 'press')
            this.trigger();
    };
    Tooltip.prototype.onMouseEnter = function () {
        if (this.event === 'hover')
            this.active = true;
    };
    Tooltip.prototype.onMouseLeave = function () {
        if (this.event === 'hover')
            this.active = false;
    };
    Tooltip.prototype._createTooltipComponent = function () {
        var viewport = this.appRef.components[0]._component._viewport, componentFactory = this._componentFactoryResolver.resolveComponentFactory(TooltipBox);
        this.tooltipElement = viewport.createComponent(componentFactory);
    };
    Tooltip.prototype._getTooltipPosition = function () {
        var tooltipNativeElement = this.tooltipElement.instance.getNativeElement(), el = this.el.nativeElement, rect = el.getBoundingClientRect();
        var positionLeft, positionTop, spacing = 10;
        if (this.navTooltip) {
            this.positionV = 'bottom';
            this.arrow = false;
            spacing = 20;
        }
        if (this.positionH === 'right') {
            positionLeft = rect.right + spacing;
        }
        else if (this.positionH === 'left') {
            positionLeft = rect.left - spacing - tooltipNativeElement.offsetWidth;
        }
        else if (this.navTooltip) {
            positionLeft = rect.left + el.offsetWidth / 2;
        }
        else {
            positionLeft = rect.left;
        }
        if (this.positionV === 'top') {
            positionTop = rect.top - spacing - tooltipNativeElement.offsetHeight;
        }
        else if (this.positionV === 'bottom') {
            positionTop = rect.bottom + spacing;
        }
        else {
            positionTop = (rect.top + el.offsetHeight / 2) - tooltipNativeElement.offsetHeight / 2;
        }
        if (positionLeft + tooltipNativeElement.offsetWidth + spacing > this.platform.width()) {
            positionLeft = this.platform.width() - tooltipNativeElement.offsetWidth - spacing;
        }
        else if (positionLeft + tooltipNativeElement.offsetWidth - spacing < 0) {
            positionLeft = spacing;
        }
        return {
            left: positionLeft,
            top: positionTop
        };
    };
    Tooltip.prototype._removeTooltip = function () {
        var _this = this;
        if (!this.tooltipElement) {
            this.tooltipElement = undefined;
            this.tooltipTimeout = undefined;
            return;
        }
        this.tooltipElement.instance.fadeState = 'invisible';
        this.canShow = false;
        // wait for animation to finish then clear everything out
        setTimeout(function () {
            _this.tooltipElement.destroy();
            _this.tooltipElement = undefined;
            _this.tooltipTimeout = undefined;
            _this.canShow = true;
        }, 300);
    };
    Tooltip.prototype._resetTimer = function () {
        this.active = false;
        clearTimeout(this.tooltipTimeout);
        this.tooltipTimeout = setTimeout(this._removeTooltip.bind(this), this.duration);
    };
    return Tooltip;
}());
export { Tooltip };
Tooltip.decorators = [
    { type: Directive, args: [{
                selector: '[tooltip]'
            },] },
];
/** @nocollapse */
Tooltip.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: ApplicationRef, },
    { type: Platform, },
    { type: ComponentFactoryResolver, },
]; };
Tooltip.propDecorators = {
    'tooltip': [{ type: Input },],
    'positionV': [{ type: Input },],
    'positionH': [{ type: Input },],
    'event': [{ type: Input },],
    'navTooltip': [{ type: Input },],
    'arrow': [{ type: Input },],
    'duration': [{ type: Input },],
    'active': [{ type: Input },],
    'onClick': [{ type: HostListener, args: ['click',] },],
    'onPress': [{ type: HostListener, args: ['press',] },],
    'onMouseEnter': [{ type: HostListener, args: ['mouseenter',] },],
    'onMouseLeave': [{ type: HostListener, args: ['mouseleave',] },],
};
//# sourceMappingURL=tooltip.directive.js.map