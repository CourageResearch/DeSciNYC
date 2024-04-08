import PastEvents from "@/components/PastEvents";
import NextEvent from "@/components/NextEvent";
import MailingList from '@/components/MailingList';
import ContactUs from '@/components/ContactUs';
import Hero from '@/components/Hero';
import StayInTouch from '@/components/FindOutMore';
import Shop from '@/components/Shop';

import { getLumaEvent } from './getter';
import db from '../db.json';

// import Gallery from "@/components/Gallery";

export default async function HomePage() {

  const nextEvent = db[db.length - 1];
  const lumaEvent = await getLumaEvent({ event_id: nextEvent.luma_id });

  return (
    <div className='bg-green-300'>
      <Hero
        lumaEvent={lumaEvent}
      />
      <NextEvent lumaEvent={lumaEvent} />
      <StayInTouch />
      <PastEvents/>
      <MailingList />
      <Shop />
      <ContactUs />

      {/* <Gallery /> */}
    </div>
  );
}