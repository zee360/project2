import React from 'react';
import { useCart } from 'react-use-cart';

function Product({ product }) {
  const {addItem, inCart, removeItem} = useCart();
  let { title, description, price, category, imageUrl } = product;

  if (description.length > 100) {
    description = description.substring(0, 100) + '...';
  }

  if (!imageUrl) {
    imageUrl = 'https://via.placeholder.com/150';
  }

  const handleAddToCart = () => {
    addItem(product);
  }
  const handleRemoveFromCart = () => {
    removeItem(product.id);
  }
  return (
    <div className="m-4 py-6 w-[300px]">
      <div className="flex flex-col max-w-md bg-white border border-1 rounded-lg overflow-hidden">
        <div
          className="h-[150px] bg-cover"
          style={{
            backgroundImage: "url('" + imageUrl + "')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="h-2/3 p-4">
          <h1 className="text-gray-900 font-bold text-2xl">{title}</h1>
          <p className="mt-2 text-gray-600 text-sm">{description}</p>
   

          <div className="flex flex-col mt-3">
            <h1 className="text-gray-700 font-bold text-xl text-center
            rounded-md border  px-2 py-1
            ">${price}</h1>
            <div className='flex justify-center mt-3 items-baseline'>

        {!inCart(product.id) && 
            <button className="px-3 py-2 bg-green-800 text-white text-xs font-bold uppercase rounded w-full"
            onClick={handleAddToCart}
            >
              Add to Card
            </button>}

            {inCart(product.id) && <>
                <span className=' text-xs font-bold uppercase '>
                Added to Cart

                </span>
            <button className="ml-2 px-3 py-2 bg-red-800 text-white text-xs font-bold uppercase rounded"
            onClick={handleRemoveFromCart}
            >
              &times;
            </button>
            </>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
