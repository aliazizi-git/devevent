import EventCard from "@/Components/EventCard";
import ExploreBtn from "@/Components/ExploreBtn";
import { IEvent } from "@/database";

const page = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/events`,
    {
      next: { revalidate: 0 },
    },
  );

  const { events } = await response.json();
  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Dev <br /> Event You Can't Miss
      </h1>
      <p className="text-center mt-5">
        Hackathons, Meetups, and Conferences, All in One Place
      </p>
      <ExploreBtn />
      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        {events && events.length > 0 && (
          <ul className="events">
            {events.map((event: IEvent) => {
              console.log("EVENT:", event);
              return (
                <li key={event.slug} className="list-none">
                  <EventCard {...event} type={event.mode} />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};

export default page;
