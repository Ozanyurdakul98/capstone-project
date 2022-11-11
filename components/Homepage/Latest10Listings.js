import Carousel from 'react-multi-carousel';
import ListingCard from '../ListingCardCarousell';
import 'react-multi-carousel/lib/styles.css';

export const Latest10Listings = (props) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 0 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    Laptop: {
      breakpoint: { max: 1023, min: 0 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 750, min: 0 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 400, min: 0 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <article className='my-40 '>
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={true}
        arrows={false}
        containerClass='container-padding-bottom'
        customButtonGroup={<CustomButtonGroup />}
        // centerMode={true}
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2500} // customTransition='all .5'
        transitionDuration={500}>
        {props.latestListings.map(
          ({
            _id,
            listingTitle,
            images,
            studiotype,
            services,
            soundengineer,
            studioPricing,
            maxGuests,
            openingHours,
            locationFeatures,
            studioLocation,
          }) => (
            <ListingCard
              key={_id}
              listingTitle={listingTitle}
              images={images}
              studiotype={studiotype}
              services={services}
              maxGuests={maxGuests}
              openingHours={openingHours}
              soundengineer={soundengineer}
              studioPricing={studioPricing}
              locationFeatures={locationFeatures}
              studioLocation={studioLocation}
            />
          )
        )}
      </Carousel>
    </article>
  );
};

const CustomButtonGroup = ({ next, previous }) => {
  return (
    <div className='absolute top-0 left-0 right-0 flex w-full items-end justify-between'>
      <div>
        <h2 className='label-form mb-0 text-lg'>The 10 latest added Studio Listings</h2>
      </div>
      <div className='flex gap-2 pb-1 pr-1 '>
        <button className='button' onClick={() => previous()}>
          Previous
        </button>
        <button className='button' onClick={() => next()}>
          Next
        </button>
      </div>
    </div>
  );
};
