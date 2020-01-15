import { NgModule } from '@angular/core';

import { MenuToggleAnchorDirective, MenuToggleLinkDirective, MenuToggleDirective } from './MenuToggle';

@NgModule({
  declarations: [
    MenuToggleAnchorDirective,
    MenuToggleLinkDirective,
    MenuToggleDirective,
  ],
  exports: [
    MenuToggleAnchorDirective,
    MenuToggleLinkDirective,
    MenuToggleDirective,
   ],
})
export class MenuToggleModule { }
