import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private readonly http: HttpClient) { }

  __getCart(userId: number) {
    return this.http.get("https://localhost:7125/Cart/User/" + userId, {responseType: 'json'});
  }

  __addProduct(productId: number, selectedSize: number, units: number){
    return this.http.post(`https://localhost:7125/Cart/AddProduct?productId=${productId}&selectedSize=${selectedSize}&units=${units}`,"");
  }

  __removeProduct(userId: number, productId: number){
    return this.http.post(`https://localhost:7125/Cart/RemoveProduct?userId=${userId}&productId=${productId}`,"");
  }
}
