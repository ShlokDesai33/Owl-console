import { MapPin, Tag } from 'phosphor-react'
import Image from 'next/image'

export default function Hit({ hit }: { hit: any }) {

  let price = (hit.prices.faculty + hit.prices.industry) / 2;

  return (
    <a key={hit.objectID} href={`/dashboard/resources/view/${hit.objectID}`} className="group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
        <img
          src={hit.image}
          alt="Product image"
          className="h-full w-full object-cover object-center group-hover:opacity-75 rounded-md"
        />
      </div>

      <h3 className="mt-4 text-lg truncate">{hit.name}</h3>

      <div className="flex items-center mt-2 gap-x-2">
        <p className="text-lg font-medium text-gray-900">
          ₹{Math.round(price)}
          { price !== hit.prices.industry && <span className="text-gray-700 text-sm">{' '}(avg)</span> }
        </p>

        { price !== hit.prices.industry && <Tag size={24} className="text-green-500" /> }
        {/* <Sparkle size={24} className="text-secondary" /> */}
      </div>

      <div className="flex items-center mt-5 gap-x-2">
        <Image
          src={hit.org.logo}
          width={32}
          height={32}
          className="h-full w-full object-cover object-center rounded-full shrink-0"
        />

        <h3 className="text-sm text-gray-700 truncate">Manipal Institute of Technology</h3>
      </div>

      <div className="flex items-center mt-3 gap-x-1">
        <MapPin size={24} className="text-gray-700" />
        <h3 className="text-sm text-gray-700 truncate">Manipal, Karnataka</h3>
      </div>
    </a>
  )
}