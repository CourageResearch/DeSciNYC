import db from "../events.json";
import Store from "@/components/Store";
import SupportUs from "@/components/SupportUs";
import ContactUs from "@/components/ContactUs";
import NextEvents from "@/components/NextEvents";
import PastEvents from "@/components/PastEvents";
import LandingHero from "@/components/LandingHero";
import StayInTouch from "@/components/StayInTouch";
import PhotoGallery from "@/components/PhotoGallery";
import SuggestComponent from "@/components/SuggestSpeaker";
import SubscribeComponent from "@/components/SubscribeComponent";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const getGalleryPhotos = async () => {
  const { data: files, error } = await supabase.storage
    .from("gallery")
    .list("images");
  
  if (error) {
    console.error("Error fetching gallery images:", error);
    return [];
  }

  const images = files
    .filter(file => file.name.match(/\.(jpg|jpeg|png|gif)$/i))
    .map(file => ({
      original: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery/images/${file.name}`,
      thumbnail: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery/images/${file.name}`
    }));

  return images;
};

const getLumaEvent = async ({ event_id }: { event_id: string }) => {
  if (!process.env.LUMA_API_KEY) {
    throw new Error("LUMA_API_KEY is not defined");
  }

  const config = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-luma-api-key": process.env.LUMA_API_KEY,
    },
  };

  const response = await fetch(
    `https://api.lu.ma/public/v1/event/get?api_id=${event_id}`,
    config
  );
  const data = await response.json();

  return data;
};

const LandingPage = async () => {
  // GET NEXT EVENT
  const nextEventId = db.next_event;
  const event = db.events.find((event) => event.id === nextEventId);

  // GET UPCOMING EVENTS
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const events = (
    await Promise.all(
      db.events.map((event) => getLumaEvent({ event_id: event.luma_id }))
    )
  )
    .filter((event) => new Date(event.event.start_at) > new Date())
    .sort(
      (a, b) =>
        new Date(a.event.start_at).getTime() -
        new Date(b.event.start_at).getTime()
    );

  if (!event) {
    throw new Error("Event not found");
  }

  const lumaEvent = await getLumaEvent({ event_id: event.luma_id });

  const images = await getGalleryPhotos();

  return (
    <div className="relative w-full h-screen">
      <LandingHero event={lumaEvent} />
      <SubscribeComponent />
      <div className="max-w-[1100px] mx-auto">
        <NextEvents />
        <PastEvents />
        <PhotoGallery images={images} />
        <StayInTouch />
        <SupportUs />
        <Store />
        <SuggestComponent />
      </div>
      <ContactUs />
    </div>
  );
};

export default LandingPage;
