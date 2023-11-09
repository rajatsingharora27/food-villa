import React from 'react'

const StaticCard = () => {
  return (
  <a href="#" className="group block">
  <div className="relative h-[350px] sm:h-[450px]">
    <img
      src="https://res.cloudinary.com/dlg7e8dwa/image/upload/v1699190731/cakes/Caramalised-Pineapple-and-vanilla-mousse-Cake--br-_500-550-grams_-Tuileries-Patisserie-1658593299.webp.webp"
      alt=""
      className="absolute inset-0 h-full w-full object-cover opacity-100 "
    />

    {/* <img
      src="https://res.cloudinary.com/dlg7e8dwa/image/upload/v1699190731/cakes/Caramalised-Pineapple-and-vanilla-mousse-Cake--br-_500-550-grams_-Tuileries-Patisserie-1658593299.webp.webp"
      alt=""
      className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
    /> */}
  </div>

  <div className="mt-3">
    <h3
      className="text-sm text-gray-700 group-hover:underline group-hover:underline-offset-4"
    >
      Small Headphones
    </h3>

    <p className="mt-1.5 max-w-[40ch] text-xs text-gray-500">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quibusdam
      ab maiores placeat odio id?
    </p>
  </div>
</a>
  )
}

export default StaticCard