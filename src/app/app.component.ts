import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyService } from './services/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'cryptopricetracker';
  selectedCurrency: string= "INR"
  login!: false
  constructor(private service: CurrencyService, private router: Router){}

  sendCurrency(event:string){
    console.log(event)
    this.service.setC(event)
  }
  loginform(){
    // console.warn("login form selected")
    // if (login!: false){}
    this.router.navigate(['login'],  { skipLocationChange: true })
  }
}
