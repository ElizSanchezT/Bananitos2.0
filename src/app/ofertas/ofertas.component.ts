import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ofertas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ofertas.component.html',
  styleUrl: './ofertas.component.css'
})
export class OfertasComponent {
 
  
  products: any = []; // Aquí se almacenarán los productos filtrados por marca
  

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // Llamar al método sin ID al inicio
    this.__obtener_productos();
  }

  __obtener_productos(){
    this.productService.__getProducts().subscribe((response: any) => {
      if (response.isSuccess) {
        // Filtrar productos donde discount no es null
        this.products = response.data.filter((product: any) => product.discount !== null);
      }
    });
  }

   
}
