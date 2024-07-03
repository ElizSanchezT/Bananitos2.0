import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-detalle-calzado',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink ],
  templateUrl: './detalle-calzado.component.html',
  styleUrl: './detalle-calzado.component.css'
})
export class DetalleCalzadoComponent{
  mostrarMensaje: boolean = false;
  quantity: number = 1; // Valor inicial
  selectedSize: number = 35;

 increment(): void {
    this.quantity++;
  }

  decrement(): void {
    if (this.quantity > 1) { // Evita que la cantidad sea menor que 1
      this.quantity--;
    }
  }
  product: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,private readonly cs :CartService
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.productService.__getProductsById(productId).subscribe((rest: any) => {
      this.product = rest.data;
      console.log(this.product)
    });
  }

  __agregar_producto(productId: number): void {
    console.log(productId);
    this.cs.__addProduct(productId, this.selectedSize, this.quantity).subscribe((rest: any) => {
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

}