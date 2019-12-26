import { Component } from '@angular/core';
import { GoogleChartService } from './google-chart.service';
import { single } from './data';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'charts';
  private gLib: any;
  toggle = true;

  single: any[];
  view: any[] = [700, 400];

  chart: any;
  // options
  gradient = false;
  showLegend = true;
  showLabels = true;
  isDoughnut = false;
  legendPosition = 'right';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#aa10a7']
  };

  constructor(private gChartService: GoogleChartService) {
    this.gLib = this.gChartService.getGoogle();
    this.gLib.charts.load('current', {'packages': ['corechart', 'table']});
    this.gLib.charts.setOnLoadCallback(this.drawChart.bind(this));
    Object.assign(this, { single });
  }

  private drawChart() {

    const data = new this.gLib.visualization.arrayToDataTable([
      ['Month', 'Bolivia', 'Ecuador', 'Madagascar', 'Papua New Guinea', 'Rwanda', 'Average'],
      ['2004/05',  165,      938,         522,             998,           450,      614.6],
      ['2005/06',  135,      1120,        599,             1268,          288,      682],
      ['2006/07',  157,      1167,        587,             807,           397,      623],
      ['2007/08',  139,      1110,        615,             968,           215,      609.4],
      ['2008/09',  136,      691,         629,             1026,          366,      569.6]
    ]);

    const options = {
      title : 'Monthly Coffee Production by Country',
      vAxis: {title: 'Cups'},
      hAxis: {title: 'Month'},
      seriesType: 'bars',
      series: {5: {type: 'line'}}        };

    this.chart = new this.gLib.visualization.ComboChart(document.getElementById('chart_div'));
    this.chart.draw(data, options);
  }

  private drawSarahChart() {

    // Create the data table for Sarah's pizza.
    // tslint:disable-next-line:prefer-const
    let data = new this.gLib.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
      ['Mushrooms', 1],
      ['Onions', 1],
      ['Olives', 2],
      ['Zucchini', 2],
      ['Pepperoni', 1]
    ]);

    // Set options for Sarah's pie chart.
    const options = {title: 'How Much Pizza Sarah Ate Last Night',
                   width: 400,
                   height: 300};

    // Instantiate and draw the chart for Sarah's pizza.
    const chart = new this.gLib.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  }

  changeGraph() {
    if (this.toggle) {
      this.gLib.charts.setOnLoadCallback(this.drawChart.bind(this));
    } else {
      this.gLib.charts.setOnLoadCallback(this.drawSarahChart.bind(this));
    }
  }




  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  printPDF() {
    const doc = new jsPDF();
    doc.text('Hello world!', 10, 10);
    doc.addImage(this.chart.getImageURI(), '*', 10, 10, 200, 100);
    doc.save('a4.pdf');
  }

}
