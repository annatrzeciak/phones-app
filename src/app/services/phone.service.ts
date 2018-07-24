import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions } from "@angular/http";
import { Phone } from "../models/phone";
import "rxjs/add/operator/map";

@Injectable()
export class PhoneService {
  constructor(private http: Http) {}

  getPhones(model): Promise <Phone[]> {
    return this.http
      .post('http://localhost:8000/post.php', model)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response): any {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any): Promise<any> {
    console.error("An error occurred", error);
    return Promise.reject(error.message || error);
  }
}
