import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts'

@Component({
  selector: 'app-coindetail',
  templateUrl: './coindetail.component.html',
  styleUrls: ['./coindetail.component.css']
})
export class CoindetailComponent implements OnInit {
  coinData: any;
  coinId !: string;
  days: number = 30;
  currency: string = "INR";
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: `Price Trends`,
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#009688',
        pointBackgroundColor: '#009688',
        pointBorderColor: '#009688',
        pointHoverBackgroundColor: '#009688',
        pointHoverBorderColor: '#009688',

      }
    ],
    labels: []
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1
      }
    },

    plugins: {
      legend: { display: true },
    }
  };
  public lineChartType: ChartType = 'line'

  @ViewChild(BaseChartDirective) myLineChart!: BaseChartDirective

  constructor(private api: ApiService, private activatedRoute: ActivatedRoute, private service: CurrencyService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      this.coinId = data['id']
    })
    this.getCoinData()
    this.getGraphData(this.days)
    this.service.getC().subscribe(val => {
      this.currency = val
      this.getGraphData(this.days)
      this.getCoinData()
    })
  }

  getCoinData() {
    this.api.getcurrbyID(this.coinId).subscribe(data => {
      console.log(this.coinData);
      if (this.currency === "USD") {
        data.market_data.current_price.inr = data.market_data.current_price.usd
        data.market_data.market_cap.inr = data.market_data.market_cap.usd
      }

      data.market_data.current_price.inr = data.market_data.current_price.inr
      data.market_data.market_cap.inr = data.market_data.market_cap.inr
      this.coinData = data
    })
  }

  getGraphData(days: number) {
    this.days = days
    this.api.getGrpahicalCurrencyData(this.coinId, this.currency, this.days).subscribe(val => {
      setTimeout(() => {
        this.myLineChart.chart?.update()
      }, 200)
      this.lineChartData.datasets[0].data = val.prices.map((a: any) => {
        return a[1]
      })
      this.lineChartData.labels=val.prices.map((a:any)=>{
        let date = new Date(a[0])
        let time = date.getHours() > 12 ?
        `${date.getHours() - 12}: ${date.getMinutes()} PM` : `${date.getHours()}: ${date.getMinutes()} AM`
        return this.days === 1 ? time : date.toLocaleDateString()
      })
    })

  }
  loginform(){
    this.router.navigate(['/login'])
  }
}
