import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategoriesService from '../../services/categories.service';
import ProductsService from '../../services/products.service';
import Product from '../Product/Product';

function Products() {
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);

  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('category');
  useEffect(() => {
    setProductsLoaded(false);
    ProductsService.getProducts(categoryId)
      .then((res) => {
        setProducts(res.data);
      })
      .catch(() => setProducts([]))
      .finally(() => setProductsLoaded(true));

    if (categoryId) {
      CategoriesService.getCategory(categoryId).then((res) => {
        setCategory(res.data);
      });
    } else {
      setCategory(null);
    }
  }, [ProductsService.getProducts, CategoriesService.getCategory, categoryId]);
  return (
    <>
      <h1 className="mt-8 text-center text-2xl font-bold mb-4">
        {category ? category.title : 'All Products'}
      </h1>
      {productsLoaded ? (
        <>
          {products.length > 0 ? (
            <div className="flex flex-wrap px-4 ">
              {products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center">No products found</div>
          )}
        </>
      ) : (
        <div className="text-center">Loading...</div>
      )}
    </>
  );
}

export default Products;
