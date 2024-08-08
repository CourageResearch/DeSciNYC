import { PhotoGallery } from "@/components/PhotoGallery";
import NextEvents from "@/components/NextEvents";

export default async function HomePage() {
  return (
    <div className="bg-green-300">
      <iframe
        src="https://www.svn.haus/leaderboard"
        title="Leaderboard"
        className="w-full h-[calc(100vh-100px)]"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
}
