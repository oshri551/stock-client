import {
  Component,
  OnInit
} from '@angular/core';

import { DataService } from '../services';
import { Stock } from '../models/stock';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './home.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  // TypeScript public modifiers
  public stockList: Stock[] = [];
  public selectedStock: string = '';
  public stockListView: Stock[] = [];

  constructor(private dataService: DataService) {}

  public ngOnInit() {
    this.dataService.getStocksList()
      .then((response) => this.stockList = response)
      .catch((err) => console.log(err));
  }

  public AddToList(symbol: string) {
    if (!this.stockListView.filter((stock) => stock.symbol === symbol).length) {
      this.addStock(symbol);
    }
  }

  public refresh() {
    this.stockListView.forEach((stock, index) => {
      this.refreshItemsInList(stock.symbol, index);
    });
  }

  public buyStock(symbol: string) {
    this.dataService.buyStock(symbol)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }

  private addStock(symbol: string) {
    this.dataService.getStockData(symbol)
    .then(((response) => this.stockListView.push(response)));
  }

  private refreshItemsInList(symbol: string, index: number) {
    this.dataService.getStockData(symbol)
      .then((response) => this.stockListView[index] = response)
      .catch((err) => console.log(err));
  }

}
