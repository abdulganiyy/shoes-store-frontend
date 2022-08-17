import React,{useState,useEffect} from 'react'
import {useAppSelector,useAppDispatch} from 'hooks'
import {fetchProducts,addToCart} from 'slices/products'

import ImageOne from 'assets/men.jpg'
import ImageTwo from 'assets/women.jpg'
import { Link } from 'react-router-dom'



const LandingPage = () => {
const {products} = useAppSelector(state => state.products)
const dispatch = useAppDispatch()
const [activeIndex, setActiveIndex] = useState(0)

const addToCartHandler = (id:string) => {
  dispatch(addToCart({id,quantity:1}))
}


useEffect(()=>{
    
  dispatch(fetchProducts())
   
},[dispatch])

useEffect(()=>{

  const interval = setInterval(()=>{
      if(activeIndex === 1){
        setActiveIndex(0)
      }else{
        setActiveIndex(activeIndex+1)
      }
  },5000)

  return ()=>{
     clearInterval(interval)
  }

},[activeIndex])
  return (
    <div className='pt-8 px-8 md:px-40'>
      <div className='h-96 z-20 relative mb-4'>
        <div className=''>
        {activeIndex === 0 ?<div className={`h-96`}>
           <img className='w-full h-full' src={ImageOne} alt='men'/>
        </div>:null}
        {activeIndex === 1 ?<div className={`h-96`}>
           <img className='w-full h-full' src={ImageTwo} alt='men'/>
        </div>:null}
        </div>
        <div className='flex justify-center absolute left-0 bottom-0 z-40 h-10 w-full'><span className={`mr-2 inline-block rounded-full bg-gray-200 h-6 w-6 ${activeIndex === 0?'bg-gray-500':''}`}></span> <span className={`mr-2 inline-block rounded-full bg-gray-200 h-6 w-6 ${activeIndex === 1?'bg-gray-500':''}`}></span></div>
      </div>
      <div className='md:grid md:grid-cols-3'>
      {products && products.map(product => {
        return <div key={product._id} className='mb-4 md:mb-0'>
            <div className='w-40 h-40 rounded-lg overflow-hidden'><img src={product.photos[0]} alt='product-visual' /></div>
            <div className='my-2'><Link to={`/product/${product._id}`}>{product.title}</Link></div>
            <div>${product.price} <button onClick={()=> addToCartHandler(product._id)} className='bg-orange-400 p-2 rounded-md'>Add to cart</button></div>
        </div> 
      }) }
      </div>
      
    </div>
  )
}

export default LandingPage