import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import { classNames } from '../../../utils';

function Cart() {
  const { isEmpty, totalUniqueItems, items, updateItemQuantity } = useCart();
    const navigate = useNavigate();
    const handleCheckoutClick = () => {
      navigate('/checkout');
    }
  return (
    <>
      <Popover.Group as="nav" className="hidden md:flex space-x-10">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open ? 'text-gray-900' : 'text-gray-500',
                  'group bg-white px-4 py-2 rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none'
                )}
              >
                <span>Cart ({totalUniqueItems})</span>
                <ChevronDownIcon
                  className={classNames(
                    open ? 'text-gray-600' : 'text-gray-400',
                    'ml-2 h-5 w-5 group-hover:text-gray-500'
                  )}
                  aria-hidden="true"
                />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
              {/* right aligned panel */}
                <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:-left-full lg:-translate-x-1/2">
                  <div className="rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    {isEmpty ? (
                      <div className="relative px-5 py-6 sm:gap-8 sm:p-8p ">
                        <p className="-m-3  p-3 text-base font-medium text-gray-900">
                          Your cart is empty
                        </p>
                      </div>
                    ) : (
                      <>
                      <h2 className=' px-5 pt-6 '>
                      Total Items: {totalUniqueItems}
                      </h2>
                      {/* tailwindcss ordered list */}
                      
                        <ul className="relative px-5 py-6 sm:p-8">
                          {items.map((item, i) => (
                            <li
                              key={item._id}
                              className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                            >
                              <div className="flex flex-1 justify-between items-baseline">
                                <p className="text-base text-gray-900">
                                  {i+1}. <span className='font-medium '>
                                  {item.title}

                                  </span> ({item.quantity} &times; ${item.price})
                                </p>
                                <div className="ml-auto">
                                <button
                                  className="ml-2 px-2 py-1 text-xs bg-gray-800 text-white font-bold uppercase rounded"
                                  type="button"
                                  onClick={() => updateItemQuantity(item._id, item.quantity - 1)}
                                >
                                  -
                                </button>
                                <span className="ml-2">
                                
                                {item.quantity}
                                </span>
                                <button
                                  className="ml-2 px-2 py-1 text-xs bg-gray-800 text-white font-bold uppercase rounded"
                                  type="button"
                                  onClick={() => updateItemQuantity(item._id, item.quantity + 1)}
                                >
                                  +
                                </button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-col">
                          <div className="flex flex-1 justify-end p-4">
                            Total costs: $
                            {items.reduce((acc, item) => {
                              return acc + item.price * item.quantity;
                            }, 0)}
                          </div>
                          <div className="flex flex-1 justify-end p-4">
                            <button
                              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold uppercase rounded"
                              type="button"
                              onClick={handleCheckoutClick}
                            >
                              Checkout
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </Popover.Group>
    </>
  );
}

export default Cart;
