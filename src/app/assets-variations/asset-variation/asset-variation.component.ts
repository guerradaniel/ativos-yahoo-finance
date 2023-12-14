import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, debounceTime, map, startWith } from 'rxjs';

import { Asset } from '../models/asset.model';
import { AssetGroup } from '../models/asset-group.model';
import { AssetsService } from '../assets.service';


@Component({
  selector: 'app-asset-variation',
  templateUrl: './asset-variation.component.html',
  styleUrls: ['./asset-variation.component.scss']
})
export class AssetVariationComponent implements OnInit{

  public asset: Asset[] = [];
  public assetsGroupOptions$!: Observable<AssetGroup[]>;
  public formGroup!: FormGroup;
  public assetGroupOptions$!: Observable<AssetGroup[]>;
  public assetOptions: AssetGroup[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private assetsService: AssetsService
    ) {}

  ngOnInit(): void {
    this.createForm();
    this.getOptions();
  }

  public displayedColumns = [
    'dayNumber',
    'date',
    'monetaryValue',
    'percentagePreviousDay',
    'percentageFirstDay',
  ];

  createForm(): void {
    this.formGroup = this.formBuilder.group({
      assetControl: '',
    });
  }

  getOptions(): void {
    this.assetsService.getAssetsOptions()
    .subscribe((value) => (this.assetOptions = value));

    this.assetGroupOptions$ = this.formGroup
    .get('assetControl')!
    .valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): AssetGroup[] {
    const filterValue = value.toLowerCase();

    return this.assetOptions.filter(
      (option) =>
        option.id.toLowerCase().includes(filterValue) ||
        option.name.toLowerCase().includes(filterValue)
    );
  }

  onSubmit() { }

}
