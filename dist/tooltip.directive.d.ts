import { ElementRef, ApplicationRef, ComponentFactoryResolver } from '@angular/core';
import { Platform } from 'ionic-angular';
export declare class Tooltip {
    private el;
    private appRef;
    private platform;
    private _componentFactoryResolver;
    tooltip: string;
    positionV: string;
    positionH: string;
    event: 'press' | 'click';
    navTooltip: boolean;
    arrow: boolean;
    duration: number;
    private _arrow;
    private _navTooltip;
    private tooltipElement;
    private tooltipTimeout;
    private canShow;
    constructor(el: ElementRef, appRef: ApplicationRef, platform: Platform, _componentFactoryResolver: ComponentFactoryResolver);
    /**
     * Handles the click/press event and shows a tooltip.
     * If a tooltip already exists, it will just reset it's timer.
     */
    trigger(): void;
    /**
     * Creates a new tooltip component and adjusts it's properties to show properly.
     */
    showTooltip(): void;
    private _createTooltipComponent();
    private _getTooltipPosition();
    private _removeTooltip();
    private _resetTimer();
}
