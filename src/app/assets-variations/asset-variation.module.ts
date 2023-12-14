import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AssetVariationComponent } from './asset-variation/asset-variation.component';
import { AssetVariationRoutingModule } from './asset-variation-routing.module';
import { TableVariationComponent } from './table-variation/table-variation.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';

@NgModule({
  declarations: [
    AssetVariationComponent,
    TableVariationComponent
  ],
  imports: [
    CommonModule,
    AssetVariationRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule
  ]
})
export class AssetVariationModule { }
