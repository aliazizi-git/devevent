import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <Link href={"/"} className="logo">
        <Image src="/icons/logo" alt="logo" width={24} height={24} />
        <p>DevEvent</p>
      </Link>
      <ul>
        <Link href="/">Home</Link>
        <Link href="/">Event</Link>
        <Link href="/">Create Event</Link>
      </ul>
    </nav>
  );
};

export default Navbar;
