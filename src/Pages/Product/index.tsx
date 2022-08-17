import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { Product,addToCart,changeQuantity } from 'slices/products'
import { FaShoppingCart } from 'react-icons/fa'
import IconPrevious from 'assets/icon-previous.svg'
import IconNext from 'assets/icon-next.svg'
import { useAppDispatch } from 'hooks'


const ProductPage = () => {
    const {id} = useParams()
    const [product,setProduct] = useState<null | Product>(null) 
    const [quantity, setQuantity] = useState(1)
    const [activeIndex, setActiveIndex] = useState(0)
    const dispatch = useAppDispatch()

    const reduceQuantity = () => {
        if(quantity === 1) return

        setQuantity(quantity - 1)
      }

    const increaseQuantity = () => {
        if(quantity === 10) return

        setQuantity(quantity + 1)
      }  

    const prev = () => {
        if(activeIndex === 0) return
        setActiveIndex(activeIndex - 1)
    } 
    
    const next = () => {
        if(activeIndex === 3) return
        setActiveIndex(activeIndex + 1)
      } 

    const addToCartHandler = (id:string) => {
        dispatch(addToCart({id,quantity}))
    }  

    useEffect(() => {
      const fetchProduct = async () => {
        try {

            console.log(id)

            const response = await axios.get(`https://immense-caverns-78231.herokuapp.com/product/${id}`)
            
            console.log(response.data)
    
            setProduct(response.data.product) 
    
            
        } catch (error) {
            console.log(error)
        }
      }


      fetchProduct()
    
      
    }, [id])
    
  return (
    <>
    {product && 
    <div className='md:mx-40 md:flex gap-x-14'>
        <div>
         <div className='h-96 relative'>
            <div className='block w-full md:hidden absolute top-[150px] flex px-4 justify-between'><span onClick={()=> prev()} className='bg-white w-10 h-10 rounded-full flex justify-center items-center' ><img src={IconPrevious} alt='prev' /></span><span  onClick={()=> next()} className='bg-white w-10 h-10 rounded-full flex justify-center items-center' ><img src={IconNext} alt='next' /></span></div>
          {product.photos.map((photo,i)=>{
               return ( i === activeIndex ?<div className='h-96 w-full md:w-96 rounded-lg overflow-hidden'>
               <img className='h-full w-full' src={photo} alt='product' />
             </div>:null)
          })}
         </div>
         <div  className='hidden mt-4 h-20 w-96 md:grid grid-cols-4 gap-x-4'>
         {product.photos.map((photo,i)=>{
               return ( <div onClick={()=> setActiveIndex(i)} className={`overflow-hidden rounded-md ${i===activeIndex?'border-2 border-orange-400':''}`}>
               <img className={`h-full w-full ${i===activeIndex?'opacity-50':''}`} src={photo} alt='product' />
               </div>)
          })}
         
        </div>
        </div>
        <div className='pt-10 px-2 md:px-0'>
         <div className='uppercase text-orange-300 text-sm font-bold'>{product?.brand}</div>
         <div className='text-5xl pt-4 pb-8'>{product?.title}</div>
         <div className='font-normal text-base max-w-md text-gray-500'>{product?.description}</div>
         {product?.discount > 0 ?<div className='flex mt-4 mb-2'><p className='mr-8 font-bold text-3xl'>${calculateDiscountedPrice(product?.price,product?.discount)}.00</p><p className='bg-orange-50 p-1 rounded-md text-orange-500'>{product?.discount}%</p></div>:null}
         <div className={`font-bold text-base text-gray-300 ${product?.discount?'line-through':''}`}>{product?.price}.00</div>
         <div className='flex'>
            <div className='flex items-center justify-between bg-blue-200 w-28 p-2 rounded-md mr-2'><button onClick={()=> reduceQuantity()} className='text-orange-500 font-bold'>-</button><span className='font-bold'>{quantity}</span><button onClick={()=> increaseQuantity()} className='text-orange-500 font-bold'>+</button></div>
            <div><button onClick={()=> addToCartHandler(product?._id)} className='flex bg-orange-500 items-center p-4 rounded-md text-white'><span className='mr-2'><FaShoppingCart /></span><span>Add to cart</span></button></div>
         </div>
        </div>
    </div>
}
    </>
    
  )
}

export default ProductPage



function calculateDiscountedPrice(actualPrice:number,discount:number):number {

    const newPrice:number = actualPrice - ((discount/100) * actualPrice)

    return newPrice

}