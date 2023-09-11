"use client";
import { ProductType } from "@/interface";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import CustomImage from "@/components/Image";
function ProductDetailedPage() {
  const [product, setProduct] = useState<ProductType>();
  const [isLoading, setisLoading] = useState(false);
  const [isOpen, setisOpen] = useState(true);
  const { id } = useParams();
  const router = useRouter();
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
            {
                isLoading ? (
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
                                    <p className="font-medium text-sm">
                                        ${product?.price}

                                    </p>
                                </div>
                            </div>
                        </div>
                )
            }
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}

export default ProductDetailedPage;
