import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';

@Component({
  selector: 'pb-d3chart',
  templateUrl: './d3chart.component.html',
  styleUrls: ['./d3chart.component.scss']
})


export class D3chartComponent implements AfterViewInit {

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

  constructor(private http: HttpClient){

  }

  @ViewChild('rakeshDonutChart') private chartContainer!: ElementRef;

  ngAfterViewInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
      for (var i = 0; i < res.budget.length; i++) {
        this.data.labels.push(res.budget[i].title);
        this.data.datasets[0].data.push(res.budget[i].budget);
    }
    this.created3chart();
  });
}

created3chart() {
  const element = this.chartContainer.nativeElement;
  const width = 400;
  const height = 400;
  const radius = Math.min(width, height) / 2;

  const color = d3.scaleOrdinal()
    .domain(this.data.labels)
    .range(this.data.datasets[0].backgroundColor);

  const svg = d3.select(element)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`);

  const pie = d3.pie<number>()
    .value(d => d);

  const arc = d3.arc<d3.PieArcDatum<number>>()
    .innerRadius(radius - 50)
    .outerRadius(radius);

  const p = svg.selectAll('.arc')
    .data(pie(this.data.datasets[0].data))
    .enter().append('g')
    .attr('class', 'arc');

  p.append('path')
    .attr('d', d => arc(d) as any)
    .attr('fill', (d, i) => color(this.data.labels[i]) as string);

  p.append('text')
    .attr('transform', (d: d3.PieArcDatum<number>) => `translate(${arc.centroid(d)})`) // Explicit typing for centroid
    .attr('text-anchor', 'middle')
    .text((d, i) => this.data.labels[i]);
}
}
