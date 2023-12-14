import { Component, Input } from '@angular/core';
import { Asset } from '../models/asset.model';

@Component({
  selector: 'app-table-variation',
  templateUrl: './table-variation.component.html',
  styleUrls: ['./table-variation.component.scss']
})
export class TableVariationComponent {

  @Input() asset: Asset[] = [];

  public displayedColumns = [
    'dayNumber',
    'date',
    'monetaryValue',
    'percentagePreviousDay',
    'percentageFirstDay',
  ];

}
