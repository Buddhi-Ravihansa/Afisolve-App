import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Chart} from 'node_modules/chart.js';

export interface IComplaint{
  complainID: string;
  productID: string;
  description: string;
  submittedDate: any;
  lastDateOfPending: any;
  accountCoordinatorName: string;

}

@Component({
  selector: 'app-pdashboard',
  templateUrl: './pdashboard.component.html',
  styleUrls: ['./pdashboard.component.css']
})
export class PdashboardComponent implements OnInit, AfterViewInit {

  cl: string;
  constructor(private router: Router,
              private http1: HttpClient) { }
  private dataSourceUsersmonth: any;
  displayedColumnsUsers1: string[] = ['productID', 'submittedTime', 'exAcName', 'charac'];
  displayedColumnsComplaints: string[] = ['complainID', 'productID', 'lastDateOfPending'];
  // dataSourceUsers1;

  dataSourceUsers1;
  dataSourcelate: any;
  dataSourcepending: any;
  dataSourceworking: any;
  dataSourcefinish: any;
  dataSourceComplaints: MatTableDataSource<IComplaint>;
  COMPLAINS_DATA: IComplaint[];

  data4: string[] = ['count'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // ............................................................Chart eka
  // tslint:disable-next-line:typedef
  datawo: any;
  datfi: any;
  datpe: any;

  // tslint:disable-next-line:typedef
  b: string;


  // tslint:disable-next-line:typedef
  firstm: string;
  firstmmm: string;
  secondm: string;
  secondmmm: string;
  thirdm: string;
  thirdmmm: string;
  fourthm: string;
  fourthmmm: string;
  fifthm: string;
  fifthmmm: string;

  // tslint:disable-next-line:typedef
  wc: string;

  // tslint:disable-next-line:typedef
  pe: string;

  // tslint:disable-next-line:typedef
  dataSourceClosed: any;

  ngOnInit(): void {
    this.getmonthCount();
    this.getfullcount();
    this.getpendingcount();
    this.getfinishcount();
    this.getworkingcount();
    this.getClosedCount();
    this.getlatecount();

  }

  ngAfterViewInit(): void {
    this.http1.get<any>(`http://localhost:3000/ceo/get-notaction-details`, {}).subscribe(
      response => {
        this.COMPLAINS_DATA = response.data;
        console.log(this.COMPLAINS_DATA);
        this.dataSourceComplaints = new MatTableDataSource<IComplaint>(this.COMPLAINS_DATA);
        this.dataSourceComplaints.sort = this.sort;
        this.dataSourceComplaints.paginator = this.paginator;
      }, error => {
        console.log(error);
      }
    );
  }

  applyFilter(event): void {
    console.log('event: ' + event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceComplaints.filter = filterValue.trim().toLowerCase();
  }

  public redirectToDetails(id: string): void {
    console.log(id);
  }


  // ....................................................................
  getmonthCount(){
    this.http1.get<any>(`http://localhost:3000/ceo/get-month-count`, {}).subscribe(
      response => {
        this.dataSourceUsersmonth = response.data;
        console.log(this.dataSourceUsersmonth[4].num);
        console.log(this.dataSourceUsersmonth[3].num);
        console.log(this.dataSourceUsersmonth[2].num);
        this.firstm = this.dataSourceUsersmonth[0].num;
        this.secondm = this.dataSourceUsersmonth[1].num;
        this.thirdm = this.dataSourceUsersmonth[2].num;



        // ..........................chart eka
        // tslint:disable-next-line:prefer-const
        var myChart = new Chart('myChart3', {
          type: 'line',
          data: {
            // tslint:disable-next-line:max-line-length
            labels: [this.dataSourceUsersmonth[4].month, this.dataSourceUsersmonth[3].month, this.dataSourceUsersmonth[2].month, this.dataSourceUsersmonth[1].month, this.dataSourceUsersmonth[0].month],
            datasets: [{
              label: ' ',
              // tslint:disable-next-line:max-line-length
              data: [this.dataSourceUsersmonth[4].num, this.dataSourceUsersmonth[3].num, this.dataSourceUsersmonth[2].num, this.dataSourceUsersmonth[1].num, this.dataSourceUsersmonth[0].num ],
              backgroundColor: [
                '',
              ],
              fill: false,
              borderColor: [
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 255, 255, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              xAxes: [{
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'month',
                  fontColor: '#ffffff',
                  fontSize: 6
                },
                ticks: {
                  fontColor: '#ffffff',
                  fontSize: 6
                }
              }],
              yAxes: [{
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Users',
                  fontColor: '#ffffff',
                  fontSize: 8
                },
                ticks: {
                  fontColor: '#ffffff',
                  fontSize: 8
                }
              }]
            }
          }
        });


      }, error => {
        console.log(error);
      }
    );
  }

  // ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

  // tslint:disable-next-line:typedef
  getfullcount() {
    this.http1.get<any>(`http://localhost:3000/projectManager/get-full-count`, {}).subscribe(
      response => {
        this.dataSourceUsers1 = response.data;
        console.log(this.dataSourceUsers1);
      }, error => {
        console.log(error);
      }
    );
  }
  getfinishcount() {
    this.http1.get<any>(`http://localhost:3000/projectManager/get-finish-count`, {}).subscribe(
      response => {
        this.dataSourcefinish = response.data;
        this.datfi = this.dataSourcefinish[0].count;
        const a = this.dataSourceUsers1[0].count;
        const iop = (this.datfi / a) * 100 ;
        this.b = iop.toFixed(2);
        console.log(this.b);

      }, error => {
        console.log(error);
      }
    );
  }
  getworkingcount() {
    this.http1.get<any>(`http://localhost:3000/projectManager/get-working-count`, {}).subscribe(
      response => {
        this.dataSourceworking = response.data;
        console.log(this.dataSourceworking[0].count);
        this.datawo = this.dataSourceworking[0].count;
        const a = this.dataSourceUsers1[0].count;
        const plok =  (this.datawo / a) * 100 ;
        this.wc = plok.toFixed(2);
      }, error => {
        console.log(error);
      }
    );
  }
  getpendingcount() {
    this.http1.get<any>(`http://localhost:3000/projectManager/get-pending-count`, {}).subscribe(
      response => {
        this.dataSourcepending = response.data;
        console.log(this.dataSourcepending);
        this.datpe = this.dataSourcepending[0].count;
        const a = this.dataSourceUsers1[0].count;
        const nbv = (this.datpe / a) * 100 ;
        this.pe = nbv.toFixed(2);

      }, error => {
        console.log(error);
      }
    );
  }
  getlatecount() {
    this.http1.get<any>(`http://localhost:3000/projectManager/get-late-count`, {}).subscribe(
      response => {
        this.dataSourcelate = response.data;
        const tet1 = this.dataSourcelate[0].count;
        console.log(tet1);
        console.log(this.datawo);

        // ..........................chart eka
        // tslint:disable-next-line:prefer-const
        var myChart = new Chart('myChart1', {
          type: 'doughnut',
          data: {
            labels: ['Pending', 'Working-Progress', 'Finish', 'Closed'],
            datasets: [{
              label: ' ',
              data: [this.datpe , this.datawo, this.datfi, this.dataSourceClosed[0].count],
              backgroundColor: [
                '#9DC2FF',
                '#4F91FF',
                '#2264D1',
                '#133774',
              ],
              borderColor: [
                '#9DC2FF',
                '#4F91FF',
                '#2264D1',
                '#133774',

              ],
              borderWidth: 1
            }]
          },
          options: {

          }
        });


// .................. chart 1 eka iwary
// 2weni chart eka
        var myChart = new Chart('myChart2', {
          type: 'bar',
          data: {
            labels: ['late', 'not late ', 'mon'],
            datasets: [{
              label: 'Complaints',
              data: [tet1 , this.datawo + this.datpe - tet1, this.firstm],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
          }
        });
// ................ 2 weni chart ekt iwaryi....
      }, error => {
        console.log(error);
      }
    );
  }


  // tslint:disable-next-line:typedef
  getClosedCount(){
    this.http1.post<any>(`http://localhost:3000/projectManager/get-closed-complaints-countpm`, {}).subscribe(
      response => {
        this.dataSourceClosed = response.data;
        const a = this.dataSourceUsers1[0].count;
        // console.log(this.dataSourcetot[0].count - this.dataSourceClosed[0].count);
        const ghn = ( this.dataSourceClosed[0].count / a) * 100 ;
        this.cl = ghn.toFixed(2);
      }, error => {
        console.log(error);
      }
    );


  }



}
