import ExploreBtn from "@/Components/ExploreBtn";
import {IEvent} from "@/database";
import EventCard from "./event/eventCard/page";

const page = async () => {
  const BASE_URL= process.env.NEXT_PUBLIC_BASE_URL
  const result = await fetch(`${BASE_URL}/api/events`)
  const {events} = await result.json()
  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Dev <br /> Event You Can't Miss
      </h1>
      <p className="text-center mt-5">
        Hackathons, Meetups, and Conferences, All in One Place
      </p>
      <ExploreBtn/>
      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events">
        {events && events.length > 0 && events.map((event: IEvent)=>(
            <li key={event.slug} className="list-none">
              <EventCard {...event} type={event.mode}/>
            </li>
        ))}
        </ul>
      </div>
    </section>
  );
};

export default page;
