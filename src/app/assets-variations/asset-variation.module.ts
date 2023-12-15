import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import localePt from '@angular/common/locales/pt';

import { AssetVariationComponent } from './asset-variation/asset-variation.component';
import { AssetVariationRoutingModule } from './asset-variation-routing.module';
import { TableVariationComponent } from './table-variation/table-variation.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AssetVariationComponent,
    TableVariationComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    AssetVariationRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class AssetVariationModule { }
