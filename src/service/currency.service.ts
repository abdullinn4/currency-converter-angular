import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'https://www.cbr-xml-daily.ru/daily_json.js';
  constructor(private http: HttpClient) { }

  getExchangeRates(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  convertCurrency(amount: number, fromCurrency: string, toCurrency: string, rates: any): number {
    if (fromCurrency === 'RUB') {
      return amount / rates[toCurrency].Value;
    } else if (toCurrency === 'RUB') {
      return amount * rates[fromCurrency].Value;
    } else {
      const rubAmount = amount * rates[fromCurrency].Value;
      return rubAmount / rates[toCurrency].Value;
    }
  }
}
