import React from 'react';
import auth from '../auth/firebaseConfig'

const ProductCard = () => {
  // Example product data
  const products = [
    {
      id: 1,
      name: 'Product 1',
      price: '$25.00',
      image: 'placeholderImage.png', 
    },
    {
        id: 2,
        name: 'Product 2',
        price: '$25.00',
        image: 'placeholderImage.png', 
    },
    {
        id: 3,
        name: 'Product 3',
        price: '$25.00',
        image: 'placeholderImage.png', 
    },
    {
        id: 4,
        name: 'Product 4',
        price: '$25.00',
        image: 'placeholderImage.png', 
    },
    {
        id: 5,
        name: 'Product 5',
        price: '$25.00',
        image: 'placeholderImage.png', 
      },
      {
          id: 6,
          name: 'Product 6',
          price: '$25.00',
          image: 'placeholderImage.png', 
      },
      {
          id: 7,
          name: 'Product 7',
          price: '$25.00',
          image: 'placeholderImage.png', 
      },
      {
          id: 8,
          name: 'Product 8',    
          price: '$25.00',
          image: 'placeholderImage.png', 
      },
  ];

  return (
    <section className="py-10 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mt-[20px]"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-center">{product.name}</h3>
                <p className="text-gray-600 text-center">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
