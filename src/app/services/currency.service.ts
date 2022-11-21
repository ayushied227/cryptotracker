import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private selectedC: BehaviorSubject<string>= new BehaviorSubject<string>("INR")
  constructor() { }
  getC(){
    return this.selectedC.asObservable()
  }
  setC(currency: string){
    this.selectedC.next(currency)
  }
}
