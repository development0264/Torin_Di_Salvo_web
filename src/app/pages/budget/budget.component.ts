import { Component } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js';
import Plotly from 'plotly.js-dist-min'

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent {
  AccenturePaycheck: string = '120000.00';
  AccentureBonus: string = '10000.00';
  totalIncome:string='130000.00';
  ngAfterViewInit() {
    
    const yValues = [
      "Free cash",
      "rent",
      "savings",
      "taxes",
      "income",
      "bonus",
      "paycheck"
    ];
    const gd = document.getElementById('myDiv');
    const data = [
      {
        name: "2018",
        type: "waterfall",
        orientation: "h",
        measure: [
          "relative",
          "relative",
          "relative",
          "relative",
          "total",
          "relative",
          "relative",
          "relative",
          "relative",
          "total",
          "relative",
          "relative",
          "total",
          "relative",
          "total"
        ],
        y: yValues.reverse(),
        x: [
          120000,
          10000,
          130000,
          -54000,
          -10000,
          -24000,
          40000,
          70000,
          90000,
          null,
          55000,
          40000,
          null,
          70000,
          null
        ],
        decreasing: { marker: { color: "#521622" }},
        increasing: { marker: { color: "#142c54"} },
        totals: { marker: { color: "#747586"} },
        
        connector: {
          mode: "between",
          line: {
            width: 4,
            color: "rgb(0, 0, 0)",
            dash: 0
          }
        }
      }
      
    ];
    
    const layout = {
      
      yaxis: {
        type: "category",
        autorange: "reversed"
      },
      xaxis: {
        type: "linear",
        // tickmode: "array",
        // tickvals: [0, 59000, 100000],
        // ticktext: ["0", "59k", "100k"]
      },
      margin: {
         l: 58,
         r:0,
         t:20,
         b:24
         },
      showlegend: false,
      plot_bgcolor: '#e4ebf6'
    };
    Plotly.newPlot(gd, data, layout);
  }
  pieChart;

  
  ngOnInit() {
    
    this.pieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: ["Savings", "Expenses", "Rent"],
        datasets: [{
          data: [35.6, 32.5, 31.9],
          backgroundColor: [
            'rgba(68, 66, 118, 1)',
            'rgba(73, 88, 136, 1)',
            'rgba(163, 115, 176, 1)',
          ],
        }]
      },
      options: {
        plugins: {
          legend: {
            display:false,
            position: 'right',
            labels: {
              color: 'black',
              font: {
                size: 12,
              }
            }
          }
        },
        
      } as ChartOptions
    });
  }

  monthClicked(){
this.AccentureBonus='500.00'
this.AccenturePaycheck='5000.00'
this.totalIncome='5500.00'
  }
  dayClicked(){
    this.AccentureBonus='10.00'
    this.AccenturePaycheck='50.00'
    this.totalIncome='60.00'
  }
  yearClicked(){
    this.AccenturePaycheck = '120000.00';
  this.AccentureBonus = '10000.00';
 this.totalIncome='130000.00';
  }
}
