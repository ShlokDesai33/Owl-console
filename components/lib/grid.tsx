import Image from "next/image"
import { MapPin, Sparkle, Tag } from "phosphor-react"

const products = [
  {
    id: 1,
    name: 'Earthen Bottle',
    href: '#',
    price: '48',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  }
]

export default function ResourceGrid() {
  return (
    <div className="bg-white overflow-y-scroll">
      <div className="mx-auto pb-12 pt-10 px-12">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <a key={product.id} href={product.href} className="group p-4 bg-gray-bg rounded-lg">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>

              <h3 className="mt-4 text-lg">Spacious bed with 2 Pillows</h3>

              <div className="flex items-center mt-2 gap-x-2">
                <p className="text-lg font-medium text-gray-900">
                  ₹{product.price}
                  <span className="text-gray-700 text-sm">{' '}(avg)</span>
                </p>

                <Tag size={24} className="text-green-500" />
                <Sparkle size={24} className="text-secondary" />
              </div>

              <div className="flex items-center mt-2 gap-x-2">
                <Image
                  src={product.imageSrc}
                  width={32}
                  height={32}
                  className="h-full w-full object-cover object-center group-hover:opacity-75 rounded-full shrink-0"
                />

                <h3 className="text-sm text-gray-700 truncate">Manipal Institute of Technology</h3>
              </div>

              <div className="flex items-center mt-3 gap-x-1">
                <MapPin size={24} className="text-gray-700" />
                <h3 className="text-sm text-gray-700 truncate">Manipal, Karnataka</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
