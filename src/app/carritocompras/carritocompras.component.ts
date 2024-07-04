import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
 
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carritocompras',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './carritocompras.component.html',
  styleUrl: './carritocompras.component.css'
})
export class CarritocomprasComponent {
  constructor(private readonly cs: CartService,private router: Router) {}
  products : any = [];
  subtotal : number = 0;
  total: number = 0;
  hasProducts : boolean = false;
  hasCoupon : boolean = false;
  coupon : string = '';
  couponDiscount : number = 0;

  __obtener_carrito() {
    this.cs.__getCart(1).subscribe((rest: any) => {
      this.products = rest.data.products; 
      this.subtotal = this.calculateSubTotal();
      this.total = this.calculateTotal();
      this.hasProducts = this.products.length > 0;   
    })
  }

  __obtener_cupon(){
    this.cs.__getCoupon(this.coupon).subscribe((rest: any) => {
        if(rest.isSuccess)
        {
            this.couponDiscount = rest.data.amount;
            this.hasCoupon = true;            
        }
        else
        {
            this.couponDiscount = 0;
            this.hasCoupon = false;
        }
        this.subtotal = this.calculateSubTotal();
        this.total = this.calculateTotal();
    });
  }

  calculateSubTotal()
  {
    return this.products.reduce((sum : number, product: any) => {
      return sum + product.price * product.units;
    }, 0);   
  }

  calculateTotal()
  {
    return this.calculateSubTotal() - this.couponDiscount;
  }


  __eliminar_producto(productId: number){
    this.cs.__removeProduct(1, productId).subscribe((rest: any) => {
        if(rest.isSuccess){
          window.location.reload();
        } 
    })
  }

  goToNextTab(nextTabId: string) {
    const nextTab = document.getElementById(nextTabId);
    const currentActiveTab = document.querySelector('.nav-link.active');
    const currentActiveContent = document.querySelector('.tab-pane.show.active');
    const targetSelector = nextTab?.getAttribute('data-bs-target');
    
    if (targetSelector) {
      const nextTabContent = document.querySelector(targetSelector);
      
      if (currentActiveTab && currentActiveContent && nextTab && nextTabContent) {
        // Remove active classes from current tab and content
        currentActiveTab.classList.remove('active');
        currentActiveTab.setAttribute('aria-selected', 'false');
        currentActiveContent.classList.remove('show', 'active');

        // Add active classes to next tab and content
        nextTab.classList.add('active');
        nextTab.setAttribute('aria-selected', 'true');
        nextTabContent.classList.add('show', 'active');
      }
    }
  }

  __compra_exitosa() {
    // Limpiar la lista local de productos
    this.products = [];
    this.subtotal = 0;
    this.total = 0;
    this.hasProducts = false;
    this.cs.__emptyCart(1).subscribe((rest: any) => {

    })
    

    // Navegar a la página de compra exitosa
    this.router.navigate(['/compraExitosa']);
  }

  get productCount(): number {
    return this.products.length;
  }
  

  __vaciar_carrito(){
    this.cs.__emptyCart(1).subscribe((rest: any) => {
      if(rest.isSuccess){
        window.location.reload();
      }
    })
  }

  ngOnInit(): void {
    this.__obtener_carrito();
  }  

}
