import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrlPrefix = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get(`${this.apiUrlPrefix}products`);
  }

  

  getAllProductsCategories(): Observable<any> {
    return this.http.get(`${this.apiUrlPrefix}products/categories`);

  }



}
