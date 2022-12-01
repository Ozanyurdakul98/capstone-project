//db
import db from '../../../../../lib/dbConnect';
import StudioListing from '../../../../../models/StudioListing';
//components
import Layout from '../../../../../components/Layout/Layout';
import moment from 'moment';
import Image from 'next/image';

function StudioServiceResults({ serializedStudio }) {
  const studio = serializedStudio[0];
  console.log(studio);
  return (
    <div>
      <div className="relative h-24 w-32  shrink-0 sm:h-32 sm:w-48 md:h-36 md:w-56 lg:h-52 lg:w-80">
        <Image src={studio.images} layout="fill" objectFit="cover" className="rounded-xl" alt="Studio image" />
      </div>
      <h1>{studio.listingTitle}</h1>
    </div>
  );
}

export default StudioServiceResults;

StudioServiceResults.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context) {
  await db.connect();
  const id = context.query.id[2];
  const fetchStudio = await StudioListing.findById(id).populate({
    path: 'studioService',
    model: 'StudioService',
    select: 'name -_id',
  });
  console.log('byid', fetchStudio);
  const serializeStudio = [JSON.parse(JSON.stringify(fetchStudio))];
  const serializedStudio = serializeStudio.map((studio) => ({
    ...studio,
    studioService: studio.studioService.map((service) => service.name),
    createdAt: moment(studio.createdAt).format('DD/MM/yyyy'),
    createdAtTime: moment(studio.createdAt).format('kk:mm'),
    updatedAt: moment(studio.updatedAt).format('DD/MM/yyyy'),
    updatedAtTime: moment(studio.updatedAt).format('kk:mm'),
  }));
  // console.log('SERIALIZEDSTUDIO', serializedStudio);
  return {
    props: {
      serializedStudio: serializedStudio || null,
    },
  };
}
