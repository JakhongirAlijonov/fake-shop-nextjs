import Product from "@/components/Product"
import Hero from "@/components/hero"
import { ProductType } from "@/interface"

export default async function Home() {
  const  req = await fetch("https://fakestoreapi.com/products")
  const res: ProductType[] = await req.json()


  
  return (
    <main className="min-h-screen max-w-7xl mx-auto px-8 xl:px-0 mt-20">
      <Hero />
      <section>
        <h1 className="text-5xl font-bold text-center">Amazing products shop</h1>
        <div className="container mx-auto px-5-5 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 mt-20 xl:grid-cols-4 xl:gap-x-8 ">
          {
            res.map(product=>{
              return( <Product key={product.id} product= {product} /> )
            })
          }
        </div>
      </section>
    </main>
  )
}
