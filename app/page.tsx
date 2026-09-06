import Achievement from "./components/Achievement";
import ComplaintCallout from "./components/ComplaintCallout";
import Hero from "./components/Hero";
import POC from "./components/POC";
import UpcomingEvent from "./components/UpcomingEvent";

export default function Home() {
  return (
    <div>
      <Hero />
      <ComplaintCallout />
      <POC />
      <Achievement />
      <UpcomingEvent />

    </div>
  );
}
