import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import useAuthContext from '../../auth/userAuthContext';
import Header from '../../components/Header/Header';
import Steps from '../../components/Steps/Steps';
import OrdersService from '../../services/orders.service';

const creditcardType = (creditcardNo) => {
  const visa = /^4[0-9]{12}(?:[0-9]{3})?$/;
  const mastercard = /^5[1-5][0-9]{14}$/;
  const amex = /^3[47][0-9]{13}$/;
  const discover = /^6(?:011|5[0-9]{2})[0-9]{12}$/;

  if (visa.test(creditcardNo)) {
    return 'visa';
  } else if (mastercard.test(creditcardNo)) {
    return 'mastercard';
  } else if (amex.test(creditcardNo)) {
    return 'amex';
  } else if (discover.test(creditcardNo)) {
    return 'discover';
  }

  return 'unknown';
};

function Order() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { state } = useLocation();
  const params = useParams();
  const step = 4;
  const { isEmpty, totalUniqueItems, items, updateItemQuantity, removeItem } =
    useCart();
  const [order, setOrder] = useState({});

  useEffect(() => {
    OrdersService.getOrder(params.orderId).then((response) => {
      setOrder(response.data);
    });
  }, [params.orderId, OrdersService.getOrder, setOrder]);
  if (!user) return null;

  return (
    <>
      <Header />
      <div className="container mx-auto ">
        <div className="flex">
          {order && (
            <div className="w-2/4 bg-white px-10 py-10 mx-auto">
              {state?.order ? (
                <>
                  <div>
                    <Steps
                      currentStep={order?.status === 'paid' ? step + 1 : step}
                    />
                  </div>

                  {order?.status === 'paid' && (
                    <div className="text-center pt-10">
                      <h1 className="text-2xl font-bold">
                        Thank you for your order!
                      </h1>
                      <p className="text-lg">
                        Your order has been placed successfully!
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className='flex  px-5 pt-6  align-baseline'>
                  
                  <h2 className=" font-bold ">
                    Total Items: {order.products.length}
                  </h2>

                  <div className='ml-auto'>
                    Order Status: {order.status}
                    {order.status === 'pending' && (
                      <Link 
                        className="bg-green-600 hover:bg-green-700 ml-2 text-white font-bold py-1 px-2 rounded"
                      to={'/payment/' + order._id} >Pay Now</Link>

                    )}
                  </div>

                  </div>

                  <ul className="relative px-5 py-6 sm:p-8">
                    {order.products.map(({product: item, quantity}, i) => (
                      <li
                        key={item._id}
                        className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex flex-1 justify-between items-baseline">
                          <p className="text-base text-gray-900">
                            {i + 1}.{' '}
                            <span className="font-medium ">{item.title}</span> (
                            {quantity} &times; ${item.price})
                          </p>
                     
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col">
                    <div className="flex flex-1 justify-end p-4">
                      Total costs: ${order.totalPrice}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Order;
