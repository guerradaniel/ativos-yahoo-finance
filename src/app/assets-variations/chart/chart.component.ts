import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { Asset } from '../models/asset.model';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input() data: Asset[] = [];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      },
    },
  }

  public chartPlugins = [DataLabelsPlugin];
  public chartType: ChartType = 'bar';

  public chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ data: [], label: '' }]
  }

  ngOnInit(): void {
    const labels: string[] = [];
    const values: number[] = [];

    const percentagePreviousDay: number[] = [];
    const percentageFirstDay: number[] = [];

    this.data.map((asset: Asset) => {
      labels.push(asset.date.toLocaleDateString(
        'pt-br', { day: '2-digit', month: '2-digit', year: 'numeric' }) || '');
      values.push(parseFloat(asset.monetaryValue.toFixed(2)))
      percentageFirstDay.push(
        parseFloat(asset.percentageFirstDay?.toFixed(2) || '0')
      );
      percentagePreviousDay.push(
        parseFloat(asset.percentagePreviousDay?.toFixed(2) || '0')
      )
    })

    this.chartData = {
      labels,
      datasets: [
        { data: values, label: 'Valor' },
        {
          data: percentagePreviousDay,
          label: 'Variação em relaçào a D-1	',
        },
        {
          data: percentageFirstDay,
          label: 'Variação em relação a primeira data',
        },
      ]
    }
  }
}
