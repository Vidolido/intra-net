'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// components
import SubRoutes from './SubRoutes';

const Links = ({ link, location }) => {
	const pathname = usePathname();

	const classes = {
		header: `border-b-2 ${
			pathname === link.path || pathname.includes(link.label.toLowerCase())
				? 'border-b-red-600'
				: 'border-b-[#fff]'
		} hover:border-b-red-800 block`,
		dashboard: `p-1 text-white hover:bg-red-500 ${
			pathname.includes(link.path) && 'bg-red-500'
		}`,
	};
	return (
		<>
			<Link href={link.path} className={classes[location]}>
				{link.label}
			</Link>
			{link?.additionalLinks && pathname.includes(link.path) ? (
				<SubRoutes links={link?.additionalLinks} />
			) : (
				''
			)}
		</>
	);
};

export default Links;
