import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../auth/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, 'Products', id); // Adjust 'Products' to match your Firestore collection name
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          setProduct(productSnap.data());
        } else {
          console.log('No such product!');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <section className="py-10 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <img
            src={product.image || 'placeholderImage.png'}
            alt={product.name || 'Product Image'}
            className="w-full h-64 object-cover mb-4"
          />
          <h2 className="text-2xl font-semibold">{product.name}</h2>
          <p className="text-gray-600">{product.price}</p>
          <p className="mt-4">Contact Information: {product.contactInfo || 'Contact info not available'}</p>
          {/* Add any additional product details here */}
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
