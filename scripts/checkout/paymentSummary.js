// import { cart } from '../../data/cart.js'
import {getProduct} from '../../data/product.js'

export function renderpaymentSummary(){
  let productPriceCents = 0;
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;
  });

  console.log(productPriceCents);
}