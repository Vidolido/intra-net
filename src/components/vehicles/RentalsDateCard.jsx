import Image from 'next/image';

// components
import toyotaImage from '@/../public/toyota.jpg';
import SedanSvg from '@/../public/sedan.svg';
import UserSvg from '@/../public/user-info.svg';
import CalendarSvg from '@/../public/date-calendar.svg';
import TimeSvg from '@/../public/time.svg';
import DashSvg from '@/../public/vehicle-dash.svg';

const elapesdTime = (start, end) => {
	const formatNumber = (number) => (number < 10 ? '0' + number : number);

	const timePassed = end - start;

	const hours = Math.floor(timePassed / (1000 * 60 * 60));
	const minutes = Math.floor((timePassed % (1000 * 60 * 60)) / (1000 * 60));

	return `${formatNumber(hours)}:${formatNumber(minutes)}`;
};

const RentalsDateCard = ({ transaction }) => {
	return (
		<div className='flex flex-col border rounded min-w-[250px] hover:shadow-lg relative'>
			<h3 className='absolute px-2 py-1 border-r border-b border-r-slate-200 border-b-slate-200 rounded text-[17px] text-red-600 font-semibold'>
				{new Date(transaction.date)
					.toLocaleDateString('mk-MK')
					.split('.')
					.join('-')}
			</h3>
			<div>
				<Image src={toyotaImage} alt='sedan car' width={250} height={250} />
			</div>
			<div className='flex flex-col bg-slate-100 gap-2'>
				<div className='w-full'>
					<h3 className='text-center text-lg font-semibold tracking-wider py-1'>
						{transaction.vehicle.plates}
					</h3>
				</div>
			</div>
			<div className='flex flex-col gap-2 p-2'>
				<div className='flex items-center justify-center gap-2'>
					<div>
						<UserSvg className='w-[30px] h-[30px] text-red-500' />
					</div>
					<div>
						<h3 className='text-center text-m font-semibold tracking-wider py-1'>
							{transaction.user}
						</h3>
					</div>
				</div>
			</div>
			<hr className='w-10/12 my-0 mx-auto' />
			<div className='p-1'>
				<div className='flex bg-slate-200 gap-[1px] my-2'>
					<div className='flex flex-col bg-white items-center w-full py-3'>
						<h3 className='uppercase text-sm font-semibold tracking-wide'>
							start
						</h3>
						<h3 className='uppercase text-center text-sm font-semibold tracking-wide'>
							{new Date(transaction.rentTime).toLocaleTimeString('mk-MK')}
						</h3>
					</div>
					{/* <div className='bg-slate-300 w-[1px]'></div> */}
					<div className='flex flex-col bg-white  items-center w-full py-3'>
						<h3 className='uppercase text-sm font-semibold tracking-wide'>
							end
						</h3>
						<h3 className='uppercase text-center text-sm font-semibold tracking-wide'>
							{new Date(transaction.returnTime).toLocaleTimeString('mk-MK')}
						</h3>
					</div>
				</div>
				<div>
					<div className='flex gap-[2px]'>
						<div className='flex flex-col items-center rounded bg-red-500 w-full py-3'>
							<div className='text-center'>
								<TimeSvg className='text-white text-center w-[40px] h-[40px]' />
							</div>
							<h3 className='text-white text-lg font-semibold tracking-wide'>
								{elapesdTime(
									new Date(transaction.rentTime),
									new Date(transaction.returnTime)
								)}
							</h3>
						</div>
						<div className='flex flex-col items-center rounded bg-red-500 w-full py-3'>
							<div className='text-center'>
								<DashSvg className='text-white text-center w-[40px] h-[40px]' />
							</div>
							<h3 className='text-white text-lg font-semibold tracking-wide'>
								25 KM
							</h3>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RentalsDateCard;
