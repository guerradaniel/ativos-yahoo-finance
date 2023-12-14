import { Component } from '@angular/core';
import { Asset } from '../models/asset.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AssetGroup } from '../models/asset-group.model';

@Component({
  selector: 'app-asset-variation',
  templateUrl: './asset-variation.component.html',
  styleUrls: ['./asset-variation.component.scss']
})
export class AssetVariationComponent{

  public asset: Asset[] = [];
  public assetsGroupOptions$!: Observable<AssetGroup[]>;
  public formGroup!: FormGroup;
  public assetOptions: AssetGroup[] = [];

  constructor(private formBuilder: FormBuilder) { 

    this.formGroup = this.formBuilder.group({
      assetControl: '',
    });
  }

  public displayedColumns = [
    'dayNumber',
    'date',
    'monetaryValue',
    'percentagePreviousDay',
    'percentageFirstDay',
  ];

  onSubmit(){}

}
