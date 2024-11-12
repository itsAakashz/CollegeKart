import React from 'react';
import Link from 'next/link';

const ProductCard = () => {
  const products = [
    { id: 1, name: 'Product 1', price: '$25.00', image: 'placeholderImage.png' },
    { id: 2, name: 'Product 2', price: '$25.00', image: 'placeholderImage.png' },
    { id: 3, name: 'Product 3', price: '$25.00', image: 'placeholderImage.png' },
    { id: 4, name: 'Product 4', price: '$25.00', image: 'placeholderImage.png' },
    { id: 5, name: 'Product 5', price: '$25.00', image: 'placeholderImage.png' },
    { id: 6, name: 'Product 6', price: '$25.00', image: 'placeholderImage.png' },
    { id: 7, name: 'Product 7', price: '$25.00', image: 'placeholderImage.png' },
    { id: 8, name: 'Product 8', price: '$25.00', image: 'placeholderImage.png' },
  ];

  return (
    <section className="py-10 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <Link legacyBehavior href={`/marketplace/${product.id}`}>
            <a className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img
                src={product.image}
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
      </div>
    </section>
  );
};

export default ProductCard;
