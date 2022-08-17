import React,{useState} from 'react'
import {FaShoppingCart,FaUserCircle,FaTimes} from 'react-icons/fa'
import {useAppDispatch, useAppSelector} from 'hooks'
import {    Link, NavLink } from 'react-router-dom'
import IconDelete from 'assets/icon-delete.svg'
import { removeFromCart } from 'slices/products'



const Navbar = () => {
    const [showMobileNav, setShowMobileNav] = useState(false)
    const [showCart, setShowCart] = useState(false)
    const dispatch = useAppDispatch()
    const {photo} = useAppSelector(state => state.user.currentUser)
    const {cart} = useAppSelector(state => state.products)
    
    const removeFromCartHandler = (id:string) => {
      dispatch(removeFromCart({id}))
    }
    
  return (
    <div className='relative h-28 md:border-b-2 flex justify-between '>
        <div className='flex'>
        <div onClick={()=> setShowMobileNav(true)} className={`mt-8 mr-2 md:hidden w-10 h-5  relative before:content-[''] before:absolute before:bottom-0 before:w-10 before:h-1 before:bg-black after:content-[''] after:absolute after:top-0 after:w-10 after:h-1 after:bg-black `}><div className='bg-black absolute w-10 h-1 top-2'></div></div>
        <div className='pt-7 font-semibold text-2xl inline-block h-full'><NavLink to='/'>SHOES</NavLink></div>
        <div className='hidden md:block'>
            <span className=' ml-4 pt-8 inline-block h-full hover:border-b-2 hover:border-orange-500'><NavLink to='/'>Collections</NavLink></span>
            <span className=' ml-4 pt-8 inline-block h-full hover:border-b-2 hover:border-orange-500'><NavLink to='/'>Men</NavLink></span>
            <span className=' ml-4 pt-8 inline-block h-full hover:border-b-2 hover:border-orange-500'><NavLink to='/'>Women</NavLink></span>
            <span className=' ml-4 pt-8 inline-block h-full hover:border-b-2 hover:border-orange-500'><NavLink to='/'>About</NavLink></span>
            <span className=' ml-4 pt-8 inline-block h-full hover:border-b-2 hover:border-orange-500'><NavLink to='/'>Contact</NavLink></span>
        </div> 
        </div>
        <div>
            <span onClick={()=> setShowCart(!showCart)} className='relative pt-8 mr-8 inline-block h-full'>
            {/* <NavLink to='/cart'><FaShoppingCart /></NavLink> */}<FaShoppingCart />
            {cart.length > 0 ? <span className='absolute top-4 left-2 w-[24px] h-[24px] bg-[#FF7E1B] text-white rounded-lg flex justify-center items-between'>{cart.length}</span>:null}
            </span>
            <span className='pt-8 inline-block h-full'>
            <Link to={'/'}>{photo? <span><img src={photo} alt='active-user' /></span> : <FaUserCircle />}</Link>
            </span>
        </div>
        {showMobileNav?(<div className={`fixed z-[100] inset-0 top-0 w-full h-full bg-black/75 md:hidden`}>
          <div className='p-8 font-semibold w-2/3 bg-white h-full'>
            <span onClick={()=> setShowMobileNav(false)} className='mb-4 block'><FaTimes /></span>
          <span className='mb-4 block'><NavLink to='/'>Collections</NavLink></span>
            <span className='mb-4 block'><NavLink to='/'>Men</NavLink></span>
            <span className='mb-4 block'><NavLink to='/'>Women</NavLink></span>
            <span className='mb-4 block'><NavLink to='/'>About</NavLink></span>
            <span className='mb-4 block'><NavLink to='/'>Contact</NavLink></span>
          </div>
        </div>):null}
        {showCart?(<div className='overflow-y-auto absolute z-50 rounded-md bg-white md:right-28 top-28 w-[350px] md:w-80 h-96 shadow-lg'>
          <p className='border-b-2 p-6'>Cart</p>
          <div className=' p-4'>
            {cart.length < 1 ? <div className='p-16'>Your cart is empty</div>:
            <div className=''>
              {cart.map(cartItem => {
                return (
                  <div className='flex justify-between items-center'>
                    <div className='overflow-hidden rounded w-10 h-10'><img className='w-full h-full' src={cartItem.photos[0]} alt='product' /></div>
                    <div>
                      <p>{cartItem.title}</p>
                      <p>${cartItem.price} * {cartItem.quantity} ${cartItem.price*cartItem.quantity}</p>
                    </div>
                    <div><button onClick={()=>removeFromCartHandler(cartItem._id)}><img src={IconDelete} alt='delete' /></button></div>
                  </div>
                )
              })}
              <span className='bg-[#FF7E1B] inline-flex w-full p-4 rounded text-white  justify-center'><Link to={'/checkout'}>Checkout</Link></span>
            </div>}
          </div>
        </div>):null}
        
    </div>
  )
}

export default Navbar