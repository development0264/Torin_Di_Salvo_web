import { Component } from '@angular/core';
import { Chart,ChartOptions } from 'chart.js';
@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent {
pieChart;
ngOnInit() {
  this.pieChart = new Chart('pieChart', {
    type: 'pie',
    data: {
      labels: ["Savings", "Expenses", "Rent"],
      datasets: [{
        data: [35.6, 32.5, 31.9],
        borderWidth: 10, // Adjust the value to set the gap width
        borderColor: 'white',
        backgroundColor: [
          'rgba(68, 66, 118, 1)',
          'rgba(73, 88, 136, 1)',
          'rgba(163, 115, 176, 1)',
        ],
      }]
    },
    options: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          fontColor: 'black',
          fontSize: 12,
        }
      }
    } as ChartOptions  // Add 'as any' to bypass type checking
  });
}

}
