import PastEvents from "@/components/PastEvents";
import NextEvent from "@/components/NextEvent";
import MailingList from '@/components/MailingList';
import ContactUs from '@/components/ContactUs';
import Hero from '@/components/Hero';
import StayInTouch from '@/components/FindOutMore';
import Shop from '@/components/Shop';

import { getGalleryPhotos, getLumaEvent } from './getter';
import db from '../db.json';
import {PhotoGallery} from "@/components/PhotoGallery";

export default async function HomePage() {

  const nextEvent = db[db.length - 1];
  const lumaEvent = await getLumaEvent({ event_id: nextEvent.luma_id });
  const images = await getGalleryPhotos();

  return (
    <div className='bg-green-300'>
      <Hero
        lumaEvent={lumaEvent}
      />
      <NextEvent lumaEvent={lumaEvent} />
      <StayInTouch />
      <PastEvents />
      {/* <PhotoGallery
        images={images}
      />
      <MailingList />
      <Shop />
      <ContactUs /> */}
    </div>
  );
}