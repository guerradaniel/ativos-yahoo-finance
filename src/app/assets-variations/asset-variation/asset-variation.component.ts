import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, debounceTime, map, startWith } from 'rxjs';

import { Asset } from '../models/asset.model';
import { AssetGroup } from '../models/asset-group.model';
import { AssetsService } from '../assets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PeriodDate } from '../models/period.model';
import { addDays, fromUnixTime } from 'date-fns';

@Component({
  selector: 'app-asset-variation',
  templateUrl: './asset-variation.component.html',
  styleUrls: ['./asset-variation.component.scss']
})
export class AssetVariationComponent {

  public asset: Asset[] = [];
  public assetsGroupOptions$!: Observable<AssetGroup[]>;
  public formGroup!: FormGroup;
  public assetGroupOptions$!: Observable<AssetGroup[]>;
  public assetOptions: AssetGroup[] = [];
  public assetSelected = '';
  public period: PeriodDate;
  public loading = false;

  public displayedColumns = [
    'dayNumber',
    'date',
    'monetaryValue',
    'percentagePreviousDay',
    'percentageFirstDay',
  ];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private assetsService: AssetsService,
    private router: Router
  ) {
    this.createForm();

    const date = new Date();
    this.period = {
      start: addDays(date, -31),
      end: addDays(date, -1)
    };

    this.getOptions();
  }

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

    this.route.params.subscribe((params) => {
      const code = params['code'];
      if (code) {
        this.formGroup.get('assetControl')?.setValue(code);
      } else {
        this.formGroup.get('assetControl')?.setValue('PETR4');
      }
      this.onSubmit();
    });
  }

  private _filter(value: string): AssetGroup[] {
    const filterValue = value.toLowerCase();

    return this.assetOptions.filter(
      (option) =>
        option.id.toLowerCase().includes(filterValue) ||
        option.name.toLowerCase().includes(filterValue)
    );
  }

  onSubmit(): void {
    const id = this.formGroup.get('assetControl')!.value;
    this.router.navigate([`/${id}`]), { replaceUrl: true };

    this.getAsset(this.formGroup.get('assetControl')!.value || '');
  }

  private getAsset(value: string): void {
    this.assetSelected = value;
    this.loading = true;
    this.asset = [];

    this.assetsService
      .getAssetsByPeriod(value, this.period.start, this.period.end)
      .subscribe({
        next: (data) => {
          this.asset = this.serializer(
            data.indicators.quote[0].open,
            data.timestamp
          )
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
  }

  private serializer(values: number[], timestamp: number[]): Asset[] {
    const data = values.map((value, index) => {
      const asset: Asset = {
        dayNumber: index + 1,
        monetaryValue: value,
        date: fromUnixTime(timestamp[index]),
      };

      if (index) {
        asset.percentagePreviousDay = this.percentageChange(
          values[index - 1],
          values[index]
        );

        asset.percentageFirstDay = this.percentageChange(
          values[0],
          values[index]
        )
      }
      return asset;
    })

    return data;
  }

  private percentageChange(
    valuePrevious: number,
    valueNext: number
  ): number {
    return ((valuePrevious - valueNext) / valueNext) * -1;
  }

  clearSearch(): void{
    this.formGroup.get('assetControl')?.patchValue('');
  }

}
