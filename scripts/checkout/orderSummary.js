import {cart,removeFromcart,updatedeliveryOption} from '../../data/cart.js'
import {products} from '../../data/products.js'
import { formatcurrency } from '../utils/money.js';

import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../../data/deliveryoption.js';


const today = dayjs();
const deliverydate =  today.add(7,'days');

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

        let deliveryoption;
        deliveryOptions.forEach((option) => {
            if(option.id === deliveryOptionId){
              deliveryoption = option;
            }
        });

        const today = dayjs();
        const deliverydate =  today.add(
          deliveryoption.deliveryDays,
          'days'
        );
        const datestring = deliverydate.format(
          'dddd, MMMM D'
        );
        

        cartsummaryHtml += `
          <div class="cart-item-container js-cart-item-container-${matchingproduct.id}">
            <div class="delivery-date">
              Delivery date: ${datestring}
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
          const today = dayjs();
          const deliverydate =  today.add(
            deliveryoption.deliveryDays,
            'days'
          );
         const datestring = deliverydate.format(
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
                  ${datestring}
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
          
          
        });
      }); 

      document.querySelectorAll('.js-delivery-option')
      .forEach((element) =>{
        element.addEventListener('click', () =>{
          const {productId,deliveryOptionsId} = element.dataset;
          updatedeliveryOption(productId,deliveryOptionsId);
          // randerOrderSummary();
        });
      });
}



