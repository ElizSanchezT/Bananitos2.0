import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private readonly cs: CartService, private readonly ps: ProductService, private readonly router: Router) {}
  products : any = [];
  mostrarMensaje: boolean = false;
  __agregar_producto(productId: number): void {
    console.log(productId);
    this.cs.__addProduct(productId, 35, 1).subscribe((rest: any) => {
      if (rest.isSuccess) {
        console.log('Producto agregado al carrito exitosamente');
        this.mostrarMensaje = true; // Mostrar el mensaje
        setTimeout(() => {
          this.mostrarMensaje = false; // Ocultar el mensaje después de cierto tiempo
        }, 3000); // Ocultar después de 3 segundos (ajusta según sea necesario)
      } else {
        console.error('Error al agregar producto al carrito');
      }
    });
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
