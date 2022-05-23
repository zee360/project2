import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import useAuthContext from '../../auth/userAuthContext';
import Header from '../../components/Header/Header';
import Steps from '../../components/Steps/Steps';
import OrdersService from '../../services/orders.service';



function OrderSummary() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const step = 2;
  const { state } = useLocation();
  

  const {  items, updateItemQuantity, removeItem, emptyCart } =
    useCart();

  if (!user) return null;

  const handleConfirmOrderClick = () => {
    const products = items.map((item) => {
      return {
        product: item.id,
        quantity: item.quantity,
      };
    });
    OrdersService.createOrder(user._id, products, state.shippingInfo).then(response => {
      // empty cart
      emptyCart()
      navigate('/payment/' + response.data._id);
    })
  }
  return (
    <>
      <div className="mb-2">
        <Header />
      </div>
      <div className="container mx-auto ">
    
        <div className="flex ">
          <div id="summary" className="w-2/4 px-8 py-10 mx-auto">
           
            <div>
                <Steps steps={['Cart', 'Confirmation', 'Payment', 'Done']} currentStep={step} />
            </div>
            <h2 className="mt-8 font-medium">Order Summary</h2>

            {items.map((product) => (
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">
                  {product.title}
                </span>
                <span className="font-semibold text-sm">
                  {product.quantity} &times; ${product.price}
                </span>
              </div>
            ))}

            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>
                  $
                  {items.reduce((acc, item) => {
                    return acc + item.price * item.quantity;
                  }, 0)}
                </span>
              </div>
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded w-full" 
              
              onClick={handleConfirmOrderClick}>
                Confirm order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderSummary;
