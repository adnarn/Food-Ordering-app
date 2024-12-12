import React from 'react'
import Banner from '../../Components/Banner/Banner'
import About from '../../Components/About/About'
import ProductPreview from '../../Components/ProductPreview/ProductPreview'


const Home = () => {
  return (
    <div>
      <Banner />
      <ProductPreview />
      <About />
    </div>
  )
}

export default Home