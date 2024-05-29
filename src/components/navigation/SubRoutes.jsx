'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SubRoutes = ({ links }) => {
	const pathname = usePathname();

	return (
		<div className='flex flex-col bg-[#cf2b2f] border-b border-b-white'>
			{Object.entries(links).map(([id, link]) => {
				return (
					<Link
						key={id}
						href={link.path}
						className={`text-white hover:bg-red-500 py-1 px-2 ${
							pathname === link.path && 'bg-red-500'
						}`}>
						{link.label}
					</Link>
				);
			})}
		</div>
	);
};

export default SubRoutes;
