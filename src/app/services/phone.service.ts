import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions } from "@angular/http";
import { Phone } from "../models/phone";
import "rxjs/add/operator/map";

@Injectable()
export class PhoneService {
  constructor(private http: Http) {}
  data;


  getPhones(model): Promise <Phone[]> {
    // let headers = new Headers();
    // headers.append('Accept', 'q=0.8;application/json;q=0.9');
    // let opts = new RequestOptions();
    // opts.headers = headers;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
  //   console.log("work");
  //   return this.http.get("https:/code-way.com/get.php").map(res => {
  //     console.log(res);
  //     console.log(res.json());
  //     res.json();
  //   });
  // }

    return this.http
      .post('http://localhost:8000/api/post.php', model)
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
