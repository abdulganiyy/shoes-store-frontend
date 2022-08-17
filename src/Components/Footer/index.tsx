import React from 'react'
import { Link } from 'react-router-dom'

const index = () => {
  return (
    <div className='bg-orange-300 mt-4 p-6 md:flex justify-around'>
        <div className='font-bold'><Link to={'/'}>SHOES</Link></div>
        <div className='my-4 md:my-0'>
            <ul>
                <li className='mb-0.5'><Link to={'/'}>Collections</Link></li>
                <li className='mb-0.5'><Link to={'/'}>Hand Made</Link></li>
                <li className='mb-0.5'><Link to={'/'}>Mens</Link></li>
                <li className='mb-0.5'><Link to={'/'}>Womens</Link></li>
            </ul>
        </div>
        <div>
            <p>shoes@creation.com</p>
            <p>+2348178435354</p>
            <p>Tanke, Ilorin, Kwara State</p>
        </div>
    </div>
  )
}

export default index