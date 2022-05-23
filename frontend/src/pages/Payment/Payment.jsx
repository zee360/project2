import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import { classNames } from '../../../utils';
import useAuthContext from '../../auth/userAuthContext';
import Header from '../../components/Header/Header';
import Steps from '../../components/Steps/Steps';
import OrdersService from '../../services/orders.service';
import tada from '../../assets/audios/Ta Da-SoundBible.com-1884170640.mp3'
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

function playTada() {
  const audio = new Audio(tada);
  audio.play();
}

function Payment() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const params = useParams();
  const step = 3;
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
          <div className="w-2/4 bg-white px-10 py-10 mx-auto">
            <div>
              <Steps currentStep={step} />
            </div>

            <Formik
              initialValues={{
                creditcardNo: '',
                expiry: '',
                cvv: '',
                cardHolderName: '',
              }}
              validate={(values) => {
                const errors = {};
                if (!values.creditcardNo) {
                  errors.creditcardNo = 'Required';
                } else if (creditcardType(values.creditcardNo) === 'unknown') {
                  errors.creditcardNo = 'Invalid creditcard number';
                }
                if (!values.expiry) {
                  errors.expiry = 'Required';
                } else if (
                  !/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(values.expiry)
                ) {
                  errors.expiry = 'Invalid expiry date';
                }
                if (!values.cvv) {
                  errors.cvv = 'Required';
                } else if (!/^[0-9]{3,4}$/.test(values.cvv)) {
                  errors.cvv = 'Invalid CVV';
                }

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  // navigate with state
                  OrdersService.updateOrder(order._id, {
                    status: 'paid',
                  }).then((response) => {
                    playTada();
                    navigate('/order/' + order._id, {
                      state: {
                        order: response.data,
                      }
                    });
                  }).finally(() => setSubmitting(false));
                }, 400);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form className="flex flex-col mt-8" onSubmit={handleSubmit}>
                  <h2 className="mb-4 font-medium">Payment</h2>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="address"
                  >
                    Credit Card No
                  </label>
                  <div className="mb-4">
                    <input
                      className={classNames(
                        errors.creditcardNo &&
                          touched.creditcardNo &&
                          'border-red-500',
                        'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      )}
                      id="creditcardNo"
                      name="creditcardNo"
                      type="text"
                      placeholder="Credit Card No"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.creditcardNo}
                    />
                    <div className="flex align-baseline">
                      {errors.creditcardNo && touched.creditcardNo && (
                        <p className="text-red-500 text-xs italic">
                          {errors.creditcardNo}
                        </p>
                      )}
                      {!errors.creditcardNo && touched.creditcardNo && (
                        <p className="ml-auto text-blue-500 text-xs italic">
                          {creditcardType(values.creditcardNo)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-center align-baseline">
                    <div className="flex-1 mr-2">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="expiry"
                      >
                        Expiry
                      </label>
                      <div className="mb-4">
                        <input
                          className={classNames(
                            errors.expiry && touched.expiry && 'border-red-500',
                            'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                          )}
                          id="expiry"
                          name="expiry"
                          type="text"
                          placeholder="Expiry (i.e. 01/22)"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.expiry}
                        />
                        {errors.expiry && touched.expiry && (
                          <p className="text-red-500 text-xs italic">
                            {errors.expiry}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 ml-2">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="cvv"
                      >
                        CVV
                      </label>
                      <div className="mb-4">
                        <input
                          className={classNames(
                            errors.cvv && touched.cvv && 'border-red-500',
                            'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                          )}
                          id="cvv"
                          name="cvv"
                          type="text"
                          placeholder="CVV"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.cvv}
                        />
                        {errors.cvv && touched.cvv && (
                          <p className="text-red-500 text-xs italic">
                            {errors.cvv}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="city"
                  >
                    Card Holder Name
                  </label>
                  <div className="mb-4">
                    <input
                      className={classNames(
                        errors.cardHolderName &&
                          touched.cardHolderName &&
                          'border-red-500',
                        'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      )}
                      id="cardHolderName"
                      name="cardHolderName"
                      type="text"
                      placeholder="Card Holder Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.cardHolderName}
                    />
                    {errors.cardHolderName && touched.cardHolderName && (
                      <p className="text-red-500 text-xs italic">
                        {errors.cardHolderName}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-center">
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      Pay
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
