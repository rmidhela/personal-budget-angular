import { Component, OnInit } from '@angular/core';
import { HttpClient }  from '@angular/common/http';
import { Chart } from 'chart.js';
@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public data = {
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
  }

  });

}

createChart() {
  var ctx = document.getElementById("rakesh-pie-chart") as HTMLCanvasElement;
  var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.data
  });
}
}
