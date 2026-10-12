import GenZNavigation from "./GenZNavigation";
import GenZOpening from "./GenZOpening";
import GenZVibes from "./GenZVibes";
import GenZDestinations from "./GenZDestinations";
import GenZFooter from "./GenZFooter";

export default function GenZHome() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#080811] text-white">
      <GenZNavigation />

      <GenZOpening />

      <GenZVibes />

      <GenZDestinations />

      <GenZFooter />
    </main>
  );
}
