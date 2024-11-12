import React from 'react'
import Navbar from "../components/navbar"
import Footer from "../components/footer"
import ProductCard from "../components/ProductCard"

const page = () => {
  return (
    <div>
      <Navbar/>
      <ProductCard/>
      <Footer/>
    </div>
  )
}

export default page;