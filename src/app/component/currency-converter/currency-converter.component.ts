import {Component, OnInit} from '@angular/core';
import {CurrencyService} from "../../../service/currency.service";

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.sass'
})
export class CurrencyConverterComponent implements OnInit{
  rates: any = {};
  amount: number = 0;
  fromCurrency: string = 'USD';
  toCurrency: string = 'RUB';
  result: number | undefined;

  constructor(private currencyService: CurrencyService) {
  }
  ngOnInit(): void {
    this.currencyService.getExchangeRates().subscribe(data => {
      this.rates = data.Valute;
      this.rates['RUB'] = { Value: 1 };
    });
  }
  convert(): void {
    this.result = this.currencyService.convertCurrency(this.amount, this.fromCurrency, this.toCurrency, this.rates);
  }


}
