import { PhotoGallery } from "@/components/PhotoGallery";
import NextEvents from "@/components/NextEvents";

export default async function HomePage() {
  return (
    <div className="bg-green-300">
      <iframe
        src="https://www.svn.haus/projects/a95f2bc6-e535-4a5b-8cf0-0b4f225a976c?tab=Leaderboard"
        title="Leaderboard"
        className="w-full h-[calc(100vh-100px)]"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
}
