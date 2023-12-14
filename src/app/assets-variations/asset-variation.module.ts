import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetVariationComponent } from './asset-variation/asset-variation.component';
import { HeaderComponent } from './header/header.component';
import { AssetVariationRoutingModule } from './asset-variation-routing.module';

@NgModule({
  declarations: [AssetVariationComponent, HeaderComponent],
  imports: [
    CommonModule,
    AssetVariationRoutingModule
  ]
})
export class AssetVariationModule { }
