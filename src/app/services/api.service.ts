import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  url='https://api.coingecko.com/api/v3/coins/'
  constructor(private http: HttpClient) { }

  getcurr(currency: string){return this.http.get<any>(this.url+`markets?vs_currency=${currency}&order=market_cap_desc&sparkline=false`)}

  getTrendingcurr(currency: string){return this.http.get<any>(this.url+`markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`)}
  // https://api.coingecko.com/api/v3/coins/markets?vs_currency=btc&order=market_cap_desc&per_page=100&page=1&sparkline=true
  
  getGrpahicalCurrencyData(coinId:string, currency:string, days: number){
    return this.http.get<any>(this.url+`${coinId}/market_chart?vs_currency=${currency}&days=${days}`)}
  
  getcurrbyID(coinID: string){return this.http.get<any>(this.url+`${coinID}`)}

}
