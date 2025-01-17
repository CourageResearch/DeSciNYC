import LandingHero from "@/components/LandingHero";
import SubscribeComponent from "@/components/SubscribeComponent";
import NextEvents from "@/components/NextEvents";
import PastEvents from "@/components/PastEvents";
import PhotoGallery from "@/components/PhotoGallery";
import StayInTouch from "@/components/StayInTouch";
import SupportUs from "@/components/SupportUs";
import Store from "@/components/Store";
import ContactUs from "@/components/ContactUs";
import db from "../events.json";
import { promisify } from "util";
import fs from "fs";
import path from "path";
const readdir = promisify(fs.readdir);

const getGalleryPhotos = async () => {
  try {
    const directoryPath = path.join(
      process.cwd(),
      "public",
      "gallery",
      "small"
    );
    const files = await readdir(directoryPath);
    // Filter out non-image files
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|gif)$/i.test(file)
    );
    // Map image files to required format
    const images = imageFiles.map((file) => ({
      original: path.join("/gallery/small", file),
      thumbnail: path.join("/gallery/thumbnails", file),
    }));
    return images;
  } catch (err) {
    throw new Error(String(err));
  }
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

const LandignPage = async () => {
  // GET NEXT EVENT
  const nextEventId = db.next_event;
  const event = db.events.find((event) => event.id === nextEventId);

  // GET UPCOMING EVENTS
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
        <NextEvents events={events} />
        <PastEvents />
        <PhotoGallery images={images} />
        <StayInTouch />
        <SupportUs />
        <Store />
      </div>
      <ContactUs />
    </div>
  );
};

export default LandignPage;
