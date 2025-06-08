import { addTocart,cart ,loadFromStorage} from "../../data/cart";

describe('test suite: addToCart',()=>{
  it('add an existing product to the cart',()=>{
    spyOn(localStorage,'getItem').ans.callFake(()=>{
      return JSON.stringify([]);
    });
    
    loadFromStorage(); 
  });
  it('add a new product to the cart',()=>{

    spyOn(localStorage,'setItem');

    spyOn(localStorage,'getItem').ans.callFake(()=>{
      return JSON.stringify([]);
    });
    
    loadFromStorage();  

     addTocart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
     expect(cart.length).toEqual(1);  
     expect(localStorage.setItem).toHaveBeenCalledTimes(1);
     expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
     expect(cart[0].quantity).toEqual(1);
  });
});