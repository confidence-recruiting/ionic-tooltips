import { NgModule, ModuleWithProviders } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Tooltip } from './tooltip.directive';
import { TooltipBox } from './tooltip-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
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
})
export class TooltipsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TooltipsModule,
      providers: [IonicModule, BrowserAnimationsModule]
    };
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: TooltipsModule,
      providers: [IonicModule]
    };
  }
}
