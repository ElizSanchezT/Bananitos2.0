import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private readonly cs: CartService, private readonly ps: ProductService, private readonly router: Router) {}
  products : any = [];

  __agregar_producto(productId: number){
    this.cs.__addProduct(productId, 35, 1).subscribe((rest: any) => {
        if(rest.isSuccess){
          this.router.navigate(["/carrito"]);
        } 
    })
  } 

  __obtener_productos(){
    this.ps.__getProducts().subscribe((rest: any) => {
      if(rest.isSuccess){
        this.products = rest.data;
      } 
    })
  }

  ngOnInit(): void {
    this.__obtener_productos();
  }  
}
