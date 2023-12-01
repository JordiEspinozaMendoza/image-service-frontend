import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
        <li style={{ marginRight: '10px' }}>
          <Link href="/">
          Upload Image
          </Link>
        </li>
        <li>
          <Link href="/images">
            Images Table
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;