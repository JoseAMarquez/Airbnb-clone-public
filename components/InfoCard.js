import React from 'react';
import Image from 'next/image';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';

function InfoCard({ img, location, title, description, star, price, total }) {
  return (
    <div className='flex py-7 px-2 pr-4 border-b cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t'>
      <div className='relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0'>
        <Image
          src={img}
          alt=''
          fill
          style={{ objectFit: 'cover' }}
          className='rounded-2xl'
          sizes='min-width:300px,
              height:24rem,
              '
        />
      </div>

      <div className='flex flex-col flex-grow pl-5'>
        <div className='flex justify-between'>
          <p>{location}</p>
          <FavoriteBorderIcon className='h-7 cursor-pointer' />
        </div>
        <h4 className='text-xl'>{title}</h4>
        <div className='border-b w-10 pt-2' />
        <p className='pt-2 text-sm text-gray-500 flex-grow'>{description}</p>

        <div className='flex justify-between items-end pt-5'>
          <p className='flex items-center'>
            <StarIcon className='h-5 text-red-400' />
            {star}
          </p>
          <div>
            <p className='text-lg font-semibold pb-2 lg:text-2xl'>
              ${price}/night
            </p>
            <p className='text-right font-extralight'>${total} total</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
