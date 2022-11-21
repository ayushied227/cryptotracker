import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-coinlist',
  templateUrl: './coinlist.component.html',
  styleUrls: ['./coinlist.component.css']
})
export class CoinlistComponent implements OnInit {
  bannerData: any=[]
  currency: string="INR"
  dataSource!: MatTableDataSource<any>
  displayedColumns: string[] = ['symbol', 'current_price', 'price_change_percentage_24h', 'market_cap']

  // if row.price_change_percentage_24h is negative color=red else green 
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor(private api: ApiService, private router: Router, private service: CurrencyService) { }

  ngOnInit(): void {
    this.getAllData()
    this.getbannerData()

    this.service.getC().subscribe(val=>{
      this.currency = val
      this.getAllData()
      this.getbannerData()
    })
  }
  getbannerData(){
    this.api.getTrendingcurr(this.currency).subscribe(data=>{
      console.warn("bannerdata", data)
      this.bannerData=data
    })
  }
  getAllData(){
    this.api.getcurr(this.currency).subscribe(data=>{
      console.warn("currencydata", data)
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort

    })
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  gotoDetails(row: any) {
    this.router.navigate(['coin-detail',row.id])
  }


}
