import Videos from "@/components/Videos";
import NextEvent from "@/components/NextEvent";
import MailingList from '@/components/MailingList';
import ContactUs from '@/components/ContactUs';
import Hero2 from '@/components/Hero2';
import StayInTouch from '@/components/FindOutMore';
import Shop from '@/components/Shop';

import { getLumaEvent } from './getter';
import db from '../db.json';

// import Volunteer from "@/components/Volunteer";
// import Gallery from "@/components/Gallery";
// import Hero from "@/components/Hero";
// import { LumaEvent } from '@/types/interfaces';
// import PastEvents from '@/components/PastEvents';
// import Calendar from '@/components/Calendar';
// import Telegram from '@/components/Telegram';

export default async function HomePage() {

  const nextEvent = db[db.length - 1];
  const lumaEvent = await getLumaEvent({ event_id: nextEvent.luma_id });

  return (
    <div className='bg-green-300'>
      <Hero2
        luma_url={nextEvent.luma_url}
      />
      <NextEvent lumaEvent={lumaEvent} />
      {/* <NextEvent lumaEvent={lumaEvent} /> */}
      <Videos/>
      {/* <Gallery /> */}
      {/* <PastEvents /> */}
      {/* <Calendar /> */}
      {/* <Telegram /> */}
      {/* <Volunteer /> */}
      <StayInTouch />
      <MailingList />
      <Shop />
      <ContactUs />
    </div>
  );
}