"use client";
import { ProductType } from "@/interface";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import CustomImage from "@/components/Image";
import ReactStars from "react-stars";
import { toast } from "react-toastify";

function ProductDetailedPage() {
  const [product, setProduct] = useState<ProductType>();
  const [isLoading, setisLoading] = useState(false);
  const [isOpen, setisOpen] = useState(true);
  const { id } = useParams();
  const router = useRouter();

  function handleClick() {
    const products: ProductType[] =
      JSON.parse(localStorage.getItem("carts") as string) || [];
    const isExist = products.find((c) => c.id == product?.id);
    if (isExist) {
      const updatedProduct = products.map((c) => {
        if (c.id === product?.id) {
          return {
            ...c,
            quantity: c.quantity + 1,
          };
        }
        return c;
      });
      localStorage.setItem("carts", JSON.stringify(updatedProduct));
    } else {
      const data = [...products, { ...product, quantity: 1 }];
      localStorage.setItem("carts", JSON.stringify(data));
    }
    toast("Item added succesfully!");
  }

  useEffect(() => {
    async function getData() {
      setisLoading(true);
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const product = await res.json();
      setProduct(product);
      setisLoading(false);
    }
    getData();
  }, [id]);

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setisOpen(false);
        router.back();
      }}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className=" mx-auto rounded bg-white p-10 max-w-3xl ">
            {isLoading ? (
              <div className=" h-8 w-8 rounded-full border-2 border-dotted border-blue-600 animate-spin"></div>
            ) : (
              <div className="flex gap-x-8 h-96">
                {product?.image && (
                  <div className="relative w-72 h-full md:inline">
                    <CustomImage product={product} fill />
                  </div>
                )}
                <div className="flex flex-1 flex-col">
                  <div className="flex-1 text-gray-700">
                    <h4 className="font-semibol"> {product?.title} </h4>
                    <p className="font-medium text-sm">${product?.price}</p>
                    <div className="flex items-center text-sm my-4">
                      <p> {product?.rating.rate} </p>
                      {product?.rating.rate && (
                        <div className="flex items-center ml-2 mr-6">
                          <ReactStars
                            edit={false}
                            value={product.rating.rate}
                          />

                          <p className="text-blue-600 hover:underline cursor-pointer ml-8 text-xs">
                            See all {product?.rating.count} reviews
                          </p>
                        </div>
                      )}
                    </div>
                    <p className="line-clamp-5 text-sm">
                      {product?.description}
                    </p>
                  </div>

                  <div className="space-y-3 text-sm">
                    <button
                      className="button w-full bg-blue-600 p-2 transition rounded text-white border-transparent hover:border-blue-600 border hover:bg-transparent hover:text-black"
                      onClick={handleClick}
                    >
                      Add to bag
                    </button>
                    <button
                      onClick={() => window.location.reload()}
                      className="button w-full bg-blue-600 p-2 transition rounded text-white border-transparent hover:border-blue-600 border hover:bg-transparent hover:text-black"
                    >
                      View full details
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}

export default ProductDetailedPage;
