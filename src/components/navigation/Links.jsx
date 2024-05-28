'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const Links = ({ link }) => {
  const pathname = usePathname();
  return (
    <Link
      href={link.path}
      className={`border-b-2 ${
        pathname === link.path ? 'border-b-red-600' : 'border-b-[#fff]'
      } hover:border-b-red-800 block`}>
      {link.label}
    </Link>
  );
};

export default Links;
