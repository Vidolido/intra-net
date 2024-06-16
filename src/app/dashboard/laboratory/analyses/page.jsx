import Link from 'next/link';

const page = () => {
	return (
		<div>
			<h2>Analyses</h2>
			<Link
				href='/dashboard/laboratory/analyses/create'
				className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-semibold pt-[1px] pb-[3px] px-5 rounded'>
				Create New
			</Link>
		</div>
	);
};

export default page;
