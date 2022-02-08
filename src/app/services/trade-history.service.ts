import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class TradeHistoryService {

  constructor(private http: Http) { }
  baseUrl = 'https://api.binance.com/api/v3/klines';
  handleError(error : Response) {
      console.error(error);
      return Observable.throw(error);
  }
  
  getBars(symbolInfo, resolution, from, to, first, limit):Observable<any> {
    console.log(symbolInfo);
    
    var split_symbol = symbolInfo.name.split(/[:/]/);
			// const url = resolution === 'D' ? '/data/histoday' : parseInt(resolution) >= 60 ? '/data/histohour' : '/data/histominute'
			const qs = {
          symbol: `${split_symbol[0]}${split_symbol[1]}`,
          interval: '1m',
          limit: 500
					// fsym: split_symbol[1],
					// tsym: split_symbol[2],
					// toTs:  to ? to : '',
					// limit: limit ? limit : 2000
        }

        return this.http.get(`${this.baseUrl}`,{params:qs})
          .map(res => { 
            return res.json();
          })
          .catch(this.handleError)
		
  }

}
