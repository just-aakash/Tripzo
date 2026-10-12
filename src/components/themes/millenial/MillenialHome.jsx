import MillenialNavigation from "./MillenialNavigation";
import MillenialOpening from "./MillenialOpening";
import MillenialDestinations from "./MillenialDestinations";
import MillenialPlanning from "./MillenialPlanning";
import MillenialFooter from "./MillenialFooter";

export default function MillenialHome() {
  return (
    <main className="min-h-screen bg-[#f3f0e7] text-[#26332c]">
      <MillenialNavigation />

      <MillenialOpening />

      <MillenialDestinations />

      <MillenialPlanning />

      <MillenialFooter />
    </main>
  );
}
