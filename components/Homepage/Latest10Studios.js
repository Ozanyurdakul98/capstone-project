import Carousel from 'react-multi-carousel';
import ListingCard from '../Result/ListingCardCarousellStudio';
import 'react-multi-carousel/lib/styles.css';

export const Latest10Studios = (props) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 0 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    Laptop: {
      breakpoint: { max: 1023, min: 0 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 750, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 400, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <section className="mb-28 ">
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={true}
        arrows={false}
        containerClass="container-padding-bottom"
        customButtonGroup={<CustomButtonGroup />}
        centerMode={true}
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2500} // customTransition='all .5'
        transitionDuration={500}>
        {props.latestListings.map(
          ({
            _id,
            studiotype,
            logo,
            studioName,
            profileText,
            studioSocials,
            studioLanguages,
            openingHours,
            locationFeatures,
            studioLocation,
          }) => (
            <ListingCard
              key={_id}
              id={_id}
              logo={logo}
              preview={false}
              studioName={studioName}
              profileText={profileText}
              studiotype={studiotype}
              studioLanguages={studioLanguages}
              openingHours={openingHours}
              locationFeatures={locationFeatures}
              studioSocials={studioSocials}
              studioLocation={studioLocation}
            />
          )
        )}
      </Carousel>
    </section>
  );
};

const CustomButtonGroup = ({ next, previous }) => {
  return (
    <>
      <div className="absolute inset-x-0 top-0 flex w-full flex-col items-start justify-between px-5">
        <h2 className="h2">10 latest added Studios</h2>
        <p className="pl-3">Each Studioprofile has its own studio services</p>
      </div>
      <div className="absolute inset-x-0 top-12 flex w-full items-end justify-between">
        <div className="flex w-full justify-end gap-2 pb-1 pr-1 2xl:gap-4">
          <button className="carousell-button" onClick={() => previous()}>
            prev
          </button>
          <button className="carousell-button" onClick={() => next()}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};
