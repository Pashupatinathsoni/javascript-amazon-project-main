import { cart } from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import { getdeliveryOption } from '../../data/deliveryoption.js';
import { formatcurrency } from '../utils/money.js';


export function renderpaymentSummary(){
  let productPriceCents = 0;
  let shippingPricingCents = 0;
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getdeliveryOption(cartItem.deliveryOptionId);
    shippingPricingCents += deliveryOption.priceCents; 
  });

  const totalBeforeTaxCents = productPriceCents + shippingPricingCents;
  const taxCents =  totalBeforeTaxCents* 0.1;

  const totalCents = totalBeforeTaxCents + taxCents;


  const paymentSummaryHtml = `
       <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">
               $${formatcurrency(productPriceCents)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
               $${formatcurrency(shippingPricingCents)}
            </div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
               $${formatcurrency(totalBeforeTaxCents)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
               $${formatcurrency(taxCents)}
            </div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
               $${formatcurrency(totalCents)}
            </div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
  `;

  document.querySelector('.js-payment-summary')
      .innerHTML = paymentSummaryHtml;
}