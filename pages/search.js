import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';

import InfoCard from '../components/InfoCard';

import { locationList } from '../components/data';

function Search() {
  const router = useRouter();

  const { location, startDate, endDate, numOfGuests } = router.query;

  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedStartDate = router.query
    ? new Date(startDate).toLocaleDateString('en-US', options)
    : null;
  const formattedEndDate = router.query
    ? new Date(endDate).toLocaleDateString('en-US', options)
    : null;

  const range = router.query
    ? `${formattedStartDate} - ${formattedEndDate}`
    : null;

  const diffInMs = router.query
    ? Math.abs(new Date(startDate) - new Date(endDate))
    : null;
  const diffInDays = router.query
    ? Math.ceil(diffInMs / (1000 * 60 * 60 * 24))
    : null;

  return (
    <>
      {location ? (
        <div>
          {router && (
            <Header placeholder={`${location} | ${range} | ${numOfGuests}`} />
          )}
          <main className='flex'>
            <section className='flex-grow pt-14 px-6'>
              <p className='text-sm'>
                300+ Stays - {range} - for {numOfGuests} Guests
              </p>
              <h1 className='text-3xl font-semibold mt-2 mb-6'>
                Stays in {location}
              </h1>

              <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap'>
                <p className='button easy-out'>Cancellation Flexible</p>
                <p className='button easy-out'>Type of Place</p>
                <p className='button easy-out'>Price</p>
                <p className='button easy-out'>Rooms and Beds</p>
                <p className='button easy-out'>More filters</p>
              </div>
              <div className='flex flex-col'>
                {locationList?.map((result) => (
                  <InfoCard
                    key={result.id}
                    img={result.images[0]}
                    location={result.city}
                    title={result.address}
                    description={result.name}
                    star={result.rating}
                    price={result.price.rate}
                    total={result.price.total * diffInDays}
                  />
                ))}
              </div>
            </section>
          </main>
          <Footer />
        </div>
      ) : (
        <div>
          <Header />
          <main className='flex'>
            <section className='flex-grow pt-14 px-6'>
              <p className='text-sm'>Not Location Selected</p>
              <h1 className='text-3xl font-semibold mt-2 mb-6'>
                Some Cool Places You Can Visit
              </h1>

              <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap'>
                <p className='button easy-out'>Cancellation Flexible</p>
                <p className='button easy-out'>Type of Place</p>
                <p className='button easy-out'>Price</p>
                <p className='button easy-out'>Rooms and Beds</p>
                <p className='button easy-out'>More filters</p>
              </div>
              <div className='flex flex-col'>
                {locationList?.map((result) => (
                  <InfoCard
                    key={result.id}
                    img={result.images[0]}
                    location={result.city}
                    title={result.address}
                    description={result.name}
                    star={result.rating}
                    price={result.price.rate}
                    total={result.price.total * diffInDays}
                  />
                ))}
              </div>
            </section>
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}

export default Search;
