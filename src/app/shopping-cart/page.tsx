"use client";

import CustomImage from "@/components/Image";
import { ProductType } from "@/interface";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect, useState } from "react";

const ShoppingCart = () => {
  const [products, setProducts] = useState<ProductType[]>(
    JSON.parse(localStorage.getItem("carts") as string) || []
  );
const [total, setTotal] = useState(0)
  const removeProduct = (id: number) => {
    const updatedProducts = products.filter((prod) => prod.id != id);
    localStorage.setItem("carts", JSON.stringify(products));
    setProducts(updatedProducts);
  };
  useEffect(()=>{
	const total = products.reduce((acc, item)=>{
		return acc + (item.price * item.quantity)
	} , 0)
	setTotal(total)
  }, [products])

  const handleIncrement = (id: number) => {
    const updateQuantity = products.map((product) => {
      if (product.id == id) {
        return {
          ...product,
          quantity: product.quantity + 1,
        };
      }
      return product;
    });
    localStorage.setItem("carts", JSON.stringify(updateQuantity));
    setProducts(updateQuantity);
  };

  const handleDecrement = (id: number) => {
    const existProduct = products.find((prod) => prod.id == id);
    if (existProduct?.quantity == 1) {
      removeProduct(existProduct.id);
    } else {
      const updateQuantity = products.map((product) => {
        if (product.id == id) {
          return {
            ...product,
            quantity: product.quantity - 1,
          };
        }
        return product;
      });
      localStorage.setItem("carts", JSON.stringify(updateQuantity));
      setProducts(updateQuantity);
    }
  };
  return (
	<>
	{
		products.length ? (
			<div className="h-screen bg-dark pt-20">
			<h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
			<div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
			  <div className="rounded-lg md:w-2/3">
				{products.map((product) => (
				  <div
					key={product.id}
					className="justify-between mb-6 rounded-lg bg-gray-800  p-6 shadow-md sm:flex sm:justify-start"
				  >
					<div className="relative w-52">
					  <CustomImage product={product} fill />
					</div>
					<div className="sm:ml-4 sm:flex sm:w-full gap-x-4 sm:justify-between">
					  <div className="mt-5 sm:mt-0">
						<h2 className="text-lg font-bold text-white line-clamp-1">
						  {product.title}
						</h2>
						<p className="mt-1 text-xs text-white line-clamp-2">
						  {product.description}
						</p>
						<div className="flex items-center text-sm my-4">
						  <p>{product?.rating.rate}</p>
						  {product?.rating.rate && (
							<div className="flex items-center ml-2 mr-6">
							  {Array.from(
								{
								  length: Math.floor(product.rating.rate),
								},
								(_, i) => (
								  <StarIcon
									key={i}
									className="h-4 w-4 text-yellow-500"
								  />
								)
							  )}
							  {Array.from(
								{
								  length: 5 - Math.floor(product.rating.rate),
								},
								(_, i) => (
								  <StarIconOutline
									key={i}
									className="h-4 w-4 text-yellow-500"
								  />
								)
							  )}
							</div>
						  )}
						  <p className="text-blue-600 hover:underline cursor-pointer text-xs">
							See all {product?.rating.count} reviews
						  </p>
						</div>
					  </div>
					  <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
						<div className="flex items-center border-gray-100">
						  <span
							className="cursor-pointer rounded-l bg-gray-600 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50 select-none"
							onClick={() => {
							  handleDecrement(product.id);
							}}
						  >
							{" "}
							-{" "}
						  </span>
						  <input
							className="h-8 w-8 border bg-gray-500 text-center text-xs outline-none"
							type="number"
							value={product.quantity}
							min="1"
						  />
						  <span
							className="cursor-pointer rounded-r bg-gray-600 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50 select-none"
							onClick={() => {
							  handleIncrement(product.id);
							}}
						  >
							{" "}
							+{" "}
						  </span>
						</div>
						<div className="flex items-center space-x-4">
						  <p className="text-sm">
							{(product.price * product.quantity).toLocaleString(
							  "en-US",
							  {
								style: "currency",
								currency: "usd",
							  }
							)}
						  </p>
						  <svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
							onClick={() => removeProduct(product.id)}
						  >
							<path
							  stroke-linecap="round"
							  stroke-linejoin="round"
							  d="M6 18L18 6M6 6l12 12"
							/>
						  </svg>
						</div>
					  </div>
					</div>
				  </div>
				))}
			  </div>
			  <div className="mt-6 h-full rounded-lg border bg-gray-800 p-6 shadow-md md:mt-0 md:w-1/3">
				<div className="mb-2 flex justify-between">
				  <p className="text-gray-100">Subtotal</p>
				  <p className="text-gray-100">
					{" "}
					{total.toLocaleString("en-US", {
					  style: "currency",
					  currency: "usd",
					})}{" "}
				  </p>
				</div>
				<div className="flex justify-between">
				  <p className="text-gray-100">Shipping</p>
				  <p className="text-gray-100"> {(10).toLocaleString(
							  "en-US",
							  {
								style: "currency",
								currency: "usd",
							  }) }  </p>
				</div>
				<hr className="my-4" />
				<div className="flex justify-between">
				  <p className="text-lg font-bold">Total</p>
				  <div className="">
					<p className="mb-1 text-lg font-bold"> {(total + 10).toLocaleString(
							  "en-US",
							  {
								style: "currency",
								currency: "usd",
							  }) }  </p>
					<p className="text-sm text-gray-100">including VAT</p>
				  </div>
				</div>
				<button className="mt-6 w-full rounded-md bg-blue-500 py-4 font-medium  text-blue-50 hover:bg-blue-600">
				  Check out
				</button>
			  </div>
			</div>
		  </div>
		) : (
			<section className="bg-white dark:bg-gray-900 ">
    <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
        <div className="wf-ull lg:w-1/2">
            <p className="text-sm font-medium text-blue-500 dark:text-blue-400">No products found</p>
            <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">Products not found</h1>
            <p className="mt-4 text-gray-500 dark:text-gray-400">Your cart is empty, your selected items will appear here.</p>

            <div className="flex items-center mt-6 gap-x-3">
                <Link href={"/products"} className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:rotate-180">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>


                    <span>All products</span>
                </Link>

                <Link href={"/"} className="w-1/2 px-5 decoration-none py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                    Take me home
                </Link>
            </div>
        </div>

       
    </div>
</section>
		)
	}

	
	</>
    
  );
};

export default ShoppingCart;
