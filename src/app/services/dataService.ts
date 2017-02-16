import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Stock } from '../models/stock';

@Injectable()
export class DataService {

    constructor(private http: Http) { }

    public getStocksList(): Promise<Stock[]> {
        const url = 'api/listofstocks';

        return this.http.get(url)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    public getStockData(symbol: string): Promise<Stock> {
        const url = 'api/stockdata/' + symbol;

        return this.http.get(url)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    public buyStock(symbol: string): Promise<any> {
        const url = 'api/buy/' + symbol;

        return this.http.get(url)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }

    private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Promise.reject(errMsg);
    }
}
