import {cart,removeFromcart,updatedeliveryOption} from '../../data/cart.js'
import {products,getProduct} from '../../data/products.js'
import { formatcurrency } from '../utils/money.js';

import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions,getdeliveryOption } from '../../data/deliveryoption.js';
import { renderpaymentSummary } from './paymentSummary.js';



export function randerOrderSummary(){
  
      let cartsummaryHtml = '';
      cart.forEach((cartItem) =>{
        const productId = cartItem.productId;

        let matchingproduct;
        products.forEach((product) =>{
          if(product.id === productId){
            matchingproduct = product;
          }
        });
        
        const deliveryOptionId = cartItem.deliveryOptionsId;

        const deliveryoption = getdeliveryOption(deliveryOptionId) ;
        

         const today1 = dayjs();
         const deliverydate1 =  today1.add(
          deliveryoption.deliveryDays,
          'days'
        );
        const datestring1 = deliverydate1.format(
          'dddd, MMMM D'
        );
        

        cartsummaryHtml += `
          <div class="cart-item-container js-cart-item-container-${matchingproduct.id}">
            <div class="delivery-date">
              Delivery date: ${datestring1}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingproduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingproduct.name}
                </div>
                <div class="product-price">
                  $${formatcurrency(matchingproduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingproduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>  
                  ${deliveryOptionHtml(matchingproduct,cartItem)}
              </div>
            </div>
          </div>
        `;
      });


      function deliveryOptionHtml(matchingproduct,cartItem){
        let html = '';

        deliveryOptions.forEach((deliveryoption) =>{
          const today2 = dayjs();
          const deliverydate2 =  today2.add(
            deliveryoption.deliveryDays,
            'days'
          );
         const datestring2 = deliverydate2.format(
            'dddd, MMMM D'
          );
          

          const pricestring = deliveryoption.priceCents === 0 ? 'FREE' : `$${formatcurrency(deliveryoption.priceCents)} -`;
      
          const ischecked  = deliveryoption.id === cartItem.deliveryOptionsId;
          html +=`
            <div class="delivery-option js-delivery-option"
            data-product-id = "${matchingproduct.id}"
            data-delivery-option-id="${deliveryoption.id}">
              <input type="radio" 
                ${ischecked ? 'checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${matchingproduct.id}">
              <div>
                <div class="delivery-option-date">
                  ${datestring2}
                </div>
                <div class="delivery-option-price">
                  ${pricestring} Shipping
                </div>
              </div>
            </div>
          `
        });
        return html;
      }

      document.querySelector('.js-order-summary').innerHTML = cartsummaryHtml;

      
      document.querySelectorAll('.js-delete-link').forEach((link) =>{
        link.addEventListener('click',()=>{
          
          const productId = link.dataset.productId;
          removeFromcart (productId);
          
          const container = document.querySelector(`.js-cart-item-container-${productId}`);
          container.remove();
          
          renderpaymentSummary();
        });
      }); 

      document.querySelectorAll('.js-delivery-option')
      .forEach((element) =>{
        element.addEventListener('click', () =>{
          const {productId,deliveryOptionsId} = element.dataset;
          updatedeliveryOption(productId,deliveryOptionsId);
          randerOrderSummary();
          renderpaymentSummary();
        });
      });
}



