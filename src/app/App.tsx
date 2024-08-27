import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from './features/products/productsSlice'
import { AppDispatch, RootState } from './store';

const ProductsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.data)
  const productStatus = useSelector((state: RootState) => state.products.status);
  const currentPage = useSelector((state: RootState) => state.products.current);
  const itemsPerPage = useSelector((state : RootState) => state.products.per_page);
  const totalPages = useSelector((state: RootState) => state.products.totalpages);
  const error = useSelector((state: RootState) => state.products.error);

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts({ page: currentPage, per_page: itemsPerPage }));
    }
  }, [productStatus, currentPage, itemsPerPage, dispatch]);

  const handlePageChange = (pageNumber: number) => {
    dispatch(fetchProducts({ page: pageNumber, per_page: itemsPerPage }));
  };

  let content;

  if (productStatus === 'loading') {
    content = <div>Loading...</div>;
  } else if (productStatus === 'succeeded') {
    content = (
      <ul>
        {products?.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price_in_cents / 100}
          </li>
        ))}
      </ul>
    );
  } else if (productStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <section>
      {content}
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </section>
  );
};

export default ProductsList;