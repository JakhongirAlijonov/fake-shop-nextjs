
"use client"
import { ProductType } from '@/interface'
import React, { FC } from 'react'

const  Product: FC<{product: ProductType}>= ({product})=> {
    
    
  return (
    <div>
        <div className="bg-gray-700 p-6  rounded-lg ">
          <img className="h-40 rounded w-full object-cover object-center mb-6" src={product.image} alt={product.title}/>
          <h3 className="tracking-widest text-indigo-400 text-xs font-medium title-font">{product.category}</h3>
         <div className="font-semibold  flex items-center justfy-between mt-4 mb-1">
            <h2 className="text-lg truncate w-44">{product.title}</h2>
         <h3 className="ml-5">${product.price}</h3>
         </div>
       
          <p className="leading-relaxed text-base line-clamp-3">{product.description}</p>
        </div>
    </div>
  )
}

export default Product