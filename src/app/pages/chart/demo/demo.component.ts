import { Component, OnInit } from '@angular/core';

import { ChartType } from './demo.model';

import { lineBarChart } from './data';
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent {
  // bread crumb items
  breadCrumbItems: Array<{}>;

  // Bar Chart
  lineBarChart: ChartType;

  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Charts' }, { label: 'Chartjs chart', active: true }];

   /**
    * Fetches the data
    */
    this._fetchData();
  }

  /**
   * Fetch chart's data
   */
  private _fetchData() {

    // Bar Chart data
    this.lineBarChart = lineBarChart;
  
  }
}
