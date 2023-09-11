"use client";
import { ProductType } from "@/interface";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import CustomImage from "./Image";

const Product: FC<{ product: ProductType }> = ({ product }) => {
  return (
    <div>
      <Link  href={`/product/${product.id}`} className="bg-white text-gray-700 p-6 h-96 flex flex-col   rounded-lg group hover:scale-105 transition-transform ease-out duration-200  ">
        <div className="relative max-h-80 flex-1 ">
          <CustomImage product={product} fill  />
        </div>
        <h3 className="tracking-widest text-indigo-400 text-xs font-medium title-font">
          {product.category}
        </h3>
        <div className="font-semibold  flex items-center justfy-between mt-4 mb-1">
          <h2 className="text-lg truncate w-44">{product.title}</h2>
          <h3 className="ml-5">${product.price}</h3>
        </div>

        <p className="leading-relaxed text-base line-clamp-3">
          {product.description}
        </p>
      </Link>
    </div>
  );
};

export default Product;
