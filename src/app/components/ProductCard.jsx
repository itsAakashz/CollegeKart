import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '../auth/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Reference to the products collection
        const productsRef = collection(db, 'products');
        
        // Fetch all products
        const querySnapshot = await getDocs(productsRef);
        const productList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setProducts(productList);
        setError(null); // Clear any previous error
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <section className="py-10 bg-gray-100">
      <div className="container mx-auto px-4">
        {error ? (
          <p className="text-red-600 text-center">{error}</p>
        ) : products.length === 0 ? (
          <p className="text-center">No products available.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <Link key={product.id} legacyBehavior href={`/marketplace/${product.id}`}>
                <a className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={product.image || 'placeholderImage.png'}
                    alt={product.name}
                    className="w-full h-48 object-cover mt-[20px]"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-center">{product.name}</h3>
                    <p className="text-gray-600 text-center">{product.price}</p>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductCard;
