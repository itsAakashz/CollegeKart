"use client"
import React from 'react'
import Navbar from "../components/navbar"
import Footer from "../components/footer"
import ProductCard from "../components/ProductCard"
import Carousel from "../components/carousel"

// const slides = [
//   "car2.png",
//   "car3.png",
//   "carosaul",
// ]

const page = () => {
  return (
    <div>
      <Navbar/>
      {/* <div className="max-w-lg">
        <Carousel autoSlide={true} >
          {[...slides.map((s) => (
            <img src={s} />
          ))]}
        </Carousel>

      </div> */}
      <ProductCard/>
      <Footer/>
    </div>
  )
}

export default page;