import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
      <ul className="flex gap-4">
        <li>
          <Link href="/">Upload Image</Link>
        </li>
        <li>
          <Link href="/images">Images Table</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
