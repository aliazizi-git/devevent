import Image from "next/image";
import Link from "next/link";

interface Props {
  image: string;
  title: string;
  slug: string;
  location: string;
  date: string;
  time: string;
  type: string;
  description: string;
}
const EventCard = ({
  image,
  title,
  slug,
  location,
  date,
  time,
  type,
  description,
}: Props) => {
  return (
    <Link href={"/events"} id="event-card">
      <Image
        src={image}
        alt={title}
        width={420}
        height={300}
        className="poster"
      />
      <p className="title">{title}</p>
      <p>{slug}</p>
      <div className="flex flex-row gap-2">
        <Image src="/icons/pin.svg" alt="location" width={14} height={14} />
        <p>{location}</p>
      </div>
      <p>{type}</p>
      <p>{description}</p>
      <div className="datetime">
        <div className="flex flex-row gap-2">
          <Image src="/icons/calendar.svg" alt="date" width={14} height={14} />
          <p>{date}</p>
        </div>
        <div className="flex flex-row gap-2">
          <Image src="/icons/clock.svg" alt="time" width={14} height={14} />
          <p>{time}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
