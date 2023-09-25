import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class DataService {
  public dataSource: any = {
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
      },
    ],
    labels: [],
  };
  private dataLoaded = false;

  constructor(private http: HttpClient) {}

  fetchData(): Observable<any> {
    if (this.dataLoaded) {
      return of(this.dataSource);
    } else {
      return this.http.get<any>('http://localhost:3002/budget').pipe(
        tap((res) => {
          this.dataSource.datasets[0].data = res.myBudget.map(
            (item) => item.budget
          );
          this.dataSource.labels = res.myBudget.map((item) => item.title);
          this.dataLoaded = true;
        }),
      );
    }
  }
}
