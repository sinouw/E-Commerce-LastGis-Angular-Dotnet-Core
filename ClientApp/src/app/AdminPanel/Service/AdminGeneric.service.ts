import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import {DUMP_DATA} from '../../Models/dump.data';
import {HttpClient, HttpEventType, HttpHeaders} from '@angular/common/http';
import { BaseUrl } from 'src/app/models/baseurl.data';

@Injectable({
    providedIn: 'root'
})
export class AdminGenericService {

    development = false;

    constructor(
        private http: HttpClient,
    ) {
    }

    getURI(data: any[]) {
        let dataString = '';
        for (let v in data) {
            dataString = '?';
            dataString += v + '=' + data[v] + '&';
        }

        console.log(dataString);
        return dataString;
    }

    getHeaders(): Headers {
        let headers = new Headers();
        headers.append('Access-Control-Allow-Origin', '*');
        return headers;
    }

    get(url: string, data?: any[]): Observable<any> | any {
        let dataString = this.getURI(data);
        console.log(dataString);

        if (this.development) {
            console.log('DEV GET : ' + url, dataString, data);
            return Observable.of(DUMP_DATA).delay(2500);
        } else {


            console.log('GET : ' + url, dataString, data);
            return this.http.get(url + dataString)
                .catch(this.handleError);
        }
    }

    post(url: string, body: any = {}, data: any[] = []): Observable<any> | any {
        let dataString = this.getURI(data);

        if (this.development) {
            console.log('DEV POST : ' + url, dataString, body, data);
            return Observable.of(DUMP_DATA).delay(1000);
        }
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        console.log('POST : ' + url, dataString, body, data);
        return this.http.post(url, body, {headers});
        // .map(this.extractData)
        // .catch(this.handleError);
    }

    put(url: string, body: any = {}, data: any[] = []): Observable<any> | any {
        let dataString = this.getURI(data);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        console.log('PUT : ' + url, dataString, body, data);
        return this.http.put(url, body, {headers});
        // .map(this.extractData)
        // .catch(this.handleError);
    }

    delete(url: string, body: any = {}, data: any[] = []): Observable<any> | any {
        let dataString = this.getURI(data);

        if (this.development) {
            console.log('DEV DELETE : ' + url, dataString, body, data);
            return Observable.of(DUMP_DATA).delay(1000);
        }

        console.log('DELETE : ' + url, dataString, body, data);
        return this.http.delete(url, body);
    }

    extractData(data: Response) {
        return data.text();
    }

    handleError() {
        console.log('Error handleError');
        return Observable.throw('Error API Service Todo.');
    }

    postProductImages(files: any [], productId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            for (const file of files) {
                const formData = new FormData();
                formData.append('file', file, file.name);
                this.http
                    .post(BaseUrl+'/images/produit/' + productId, formData)
                    .subscribe(event => {
                        console.log(event);
                    });
            }
            resolve(true);
        });
    }

    postPubImages(files: any []): Promise<any> {
        return new Promise((resolve, reject) => {
            for (const file of files) {
                const formData = new FormData();
                formData.append('file', file, file.name);
                this.http
                    .post(BaseUrl+'/PubImages/' , formData)
                    .subscribe(event => {
                        console.log(event);
                    });
            }
            resolve(true);
        });
    }
}
