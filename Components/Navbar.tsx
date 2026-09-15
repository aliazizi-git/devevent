import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#0c2f2a]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
          <p className="text-lg font-bold italic text-white">DevEvent</p>
        </Link>

        <ul className="flex items-center gap-8">
          <li>
            <Link href="/" className="text-white transition hover:text-teal-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/events" className="text-white transition hover:text-teal-300">
              Events
            </Link>
          </li>
          <li>
            <Link href="/create-event" className="text-white transition hover:text-teal-300">
              Create Event
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;