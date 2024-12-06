import PastEvents from "@/components/PastEvents";
import NextEvent from "@/components/NextEvent";
import MailingList from "@/components/MailingList";
import ContactUs from "@/components/ContactUs";
import Hero from "@/components/Hero";
import StayInTouch from "@/components/FindOutMore";
import Shop from "@/components/Shop";

import { getGalleryPhotos, getLumaEvent } from "./getter";
import db from "../db.json";
import { PhotoGallery } from "@/components/PhotoGallery";
import NextEvents from "@/components/NextEvents";

export default async function HomePage() {
  const nextEventId = db.next_event;
  const event = db.events.find((e) => e.id === nextEventId);
  if (!event) {
    throw new Error("Event not found");
  }
  const lumaEvent = await getLumaEvent({ event_id: event.luma_id });
  const images = await getGalleryPhotos();

  const upcomingEvents = db.events.filter(
    (e) => parseInt(e.id) >= parseInt(nextEventId)
  );
  const lumaEvents = await Promise.all(
    upcomingEvents.map((e) => getLumaEvent({ event_id: e.luma_id }))
  );

  return (
    <div className="bg-green-300">
      <Hero lumaEvent={lumaEvent} />
      <MailingList />
      <NextEvent lumaEvent={lumaEvent} />
      <NextEvents lumaEvents={lumaEvents} />

      <PastEvents />
      <PhotoGallery images={images} />
      <StayInTouch />

      <Shop />
      <ContactUs />
    </div>
  );
}

