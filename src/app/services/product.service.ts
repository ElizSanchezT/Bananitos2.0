import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private readonly http: HttpClient) { }

  __getProducts() {
    return this.http.get("https://localhost:7125/Product/List", {responseType: 'json'});
  }

  __getProductsById(id: string| null) {
    return this.http.get(`https://localhost:7125/Product/${id}`, { responseType: 'json' });
  }
}
