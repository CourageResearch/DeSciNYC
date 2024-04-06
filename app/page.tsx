import { GetServerSideProps } from 'next';
import Volunteer from "@/components/Volunteer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Videos from "@/components/Videos";
import NextEvent from "@/components/NextEvent";
import { LumaEvent } from '@/types/interfaces';
import MailingList from '@/components/MailingList';
import PastEvents from '@/components/PastEvents';
import Calendar from '@/components/Calendar';
import Telegram from '@/components/Telegram';
import ContactUs from '@/components/ContactUs';
import db from '../db.json';
import { getLumaEvent } from './getter';


export default async function HomePage() {

  const nextEvent = db[db.length - 1];

  const lumaEvent = await getLumaEvent({ event_id: nextEvent.luma_id });

  return (
    <>
      <Hero 
        luma_url={nextEvent.luma_url}
      />
      <NextEvent lumaEvent={lumaEvent} />
      <Videos/>
      <Gallery />
      <PastEvents />
      <MailingList />
      <Calendar />
      <Telegram />
      <Volunteer />
      <ContactUs />
    </>
  );
}