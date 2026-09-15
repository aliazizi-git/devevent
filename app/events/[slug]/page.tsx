import BookEvent from "@/Components/BookEvent";
import EventCard from "@/Components/EventCard";
import { IEvent } from "@/database";
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";
import Image from "next/image";
import { notFound } from "next/navigation";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const result = await fetch(`${BASE_URL}/api/events/${slug}`);
  const {
    event: {
      description,
      image,
      overview,
      date,
      agenda,
      time,
      location,
      tags,
      audience,
      mode,
      organizer,
    },
  } = await result.json();
  const EventDetailItem = ({
    icon,
    alt,
    label,
  }: {
    icon: string;
    alt: string;
    label: string;
  }) => (
    <div className="flex gap-2">
      <Image src={icon} alt={alt} width={17} height={17} />
      <p>{label}</p>
    </div>
  );
  const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
    <div className="agenda">
      <h2>Agenda</h2>
      <ul>
        {agendaItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );

  const EventTags = ({ tagItems }: { tagItems: string[] }) => (
    <div className="flex flex-wrap gap-2">
      {tagItems.map((item) => (
        <div className="pill" key={item}>
          {item}
        </div>
      ))}
    </div>
  );
  const booking = 10;
  if (!description) return notFound();
  const similarEvents : IEvent[] = await getSimilarEventsBySlug(slug)
  return (
    <section id="event">
      <div className="header">
        <h1>Event description</h1>
        <p>{description}</p>
      </div>
      <div className="detail">
        <div className="content  flex flex-col gap-5">
          <div className="flex w-full flex-col items-start gap-12 lg:flex-row">
            <Image
              src={image}
              alt="Event Banner"
              className="banner w-full lg:flex-[2]"
              width={800}
              height={800}
            />
            <aside className="booking w-full lg:flex-1">
              <div className="signup-card">
                <h2>Book Your Spot</h2>
                {booking > 0 ? (
                  <p className="text-sm">
                    Join {booking} people who have already booked their spot
                  </p>
                ) : (
                  <p className="text-sm">Be The First to Book Your Spot!</p>
                )}
              </div>
              <BookEvent />
            </aside>
          </div>
          <section className="flex flex-col gap-2">
            <h2>Event Details</h2>
            <EventDetailItem
              icon="/icons/calendar.svg"
              alt="calendar"
              label={date}
            />
            <EventDetailItem icon="/icons/clock.svg" alt="clock" label={time} />
            <EventDetailItem icon="/icons/pin.svg" alt="pin" label={location} />
            <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode} />
            <EventDetailItem
              icon="/icons/audience.svg"
              alt="audience"
              label={audience}
            />
          </section>

          <EventAgenda agendaItems={agenda} />
          <section className="flex-col gap-2">
            <h2>About The Organizer</h2>
            <p>{organizer}</p>
          </section>

          <EventTags tagItems={tags} />
        </div>
      </div>

      <div className="flex w-full gap-4 flex-col pt-20">
                <h2>Similar Events</h2>
                <div className="events">
                  {similarEvents.length > 0 && similarEvents.map((similarEvent : IEvent)=>(
                    <EventCard key={similarEvent._id} type={similarEvent.type ?? ""} {...similarEvent} />
                  ))}
                </div>

      </div>
    </section>
  );
};

export default EventDetailsPage;
