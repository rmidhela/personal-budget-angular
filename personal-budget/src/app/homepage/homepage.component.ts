import { Component, OnInit } from '@angular/core';
import { HttpClient }  from '@angular/common/http';
import { Chart } from 'chart.js';
// import * as d3 from 'd3';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  // private svg: any;
  // private margin = 50;
  // private width =350;
  // private height =350;
  // // The radius of the pie chart is half the smallest side
  // private radius = Math.min(this.width, this.height) / 2 - this.margin;
  // private colors:any;
  public data: any = {
    datasets: [
        {
            data: [],
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fc6b19',
                '#808080',
                '#964B00',
                "#4CAF50"
            ],
        }
    ],
    labels: []
};
constructor(private http: HttpClient) {

}

ngOnInit(): void {
  this.http.get('http://localhost:3000/budget')
  .subscribe((res: any) => {
    for (var i = 0; i < res.budget.length; i++) {
      this.data.datasets[0].data[i] = res.budget[i].budget;
      this.data.labels[i] = res.budget[i].title;
      this.createChart();
      //this.createD3Chart();
  }
  });

}
  createD3Chart() {
/*
    var ctx = document.getElementById("rakesh-doughnut-chart") as HTMLCanvasElement;
    console.log(this.data);
  var myPieChart = new Chart(ctx, {
    type: "doughnut",
    // console.log(this.data),
    data: {
      labels: this.data.labels,
      datasets: [
        {
          data: this.data.dataSets[0].data,
          backgroundColor: this.data.dataSets[0].backgroundColor,
          hoverOffset: 4,
        },
      ],

    },
    options: {
      aspectRatio: 2.5
    }
  });
  */
  var ctx = document.getElementById("rakesh-doughnut-chart") as HTMLCanvasElement;
console.log(this.data, this.data.datasets, this.data.dataSets.length);
  if (this.data && this.data.labels && this.data.dataSets && this.data.dataSets.length > 0) {
    var myPieChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: this.data.labels,
        datasets: [
          {
            data: this.data.dataSets[0].data,
            backgroundColor: this.data.dataSets[0].backgroundColor,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  } else {
    console.error("Invalid data or data structure.");
  }
  }

createChart() {
  var ctx = document.getElementById("rakesh-pie-chart") as HTMLCanvasElement;
  var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.data
  });
}
}
