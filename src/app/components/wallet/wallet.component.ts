import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  // initial wallet amount=0
  coinData: any = []
  currency: string = "INR"
  dataSource!: MatTableDataSource<any>
  open: boolean = false;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.selectData()
  }
  selectData() {
    this.api.getcurr(this.currency).subscribe(data => {
      console.warn("selectdata", data)
      this.coinData = data
    })
  }
  activate() {
    this.coinData.sort(function (a:any, b:any) { // sort asc order 
      if (a > b) {
        return 1;
      }
      if (b > a) {
        return -1;
      }
      return 0;
    });

    this.open ? this.open = false : this.open = true;
  }

  addcrypto(){}

}
