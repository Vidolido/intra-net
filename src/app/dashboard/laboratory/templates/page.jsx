import Link from 'next/link';

const page = () => {
	return (
		<div>
			<h1>Templates</h1>
			<Link
				href='/dashboard/laboratory/templates/create'
				className={` bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-semibold py-[2.5px] px-4 rounded`}>
				Create New Template
			</Link>
		</div>
	);
};

export default page;
