// state/actions
import { nameArray } from '@/utils/nameArray';
import { formatDate } from '@/utils/formatDate';

// components
import ViewTemplate from './viewParts/ViewTemplate';

const SingleDocument = ({ document, products, settings, languages }) => {
	// console.log(document, 'the document');
	let { date, time } = formatDate(new Date());
	let names = products?.settings.map((setting) => ({
		_id: setting._id,
		...nameArray(setting.parameter.inputValue),
	}));
	let product = names.find((prod) => prod._id === document?.header?.product);
	// console.log(product, 'the products');
	return (
		<div className='w-[70%]  mx-auto'>
			<div className='flex justify-evenly'>
				{/* прв ред */}
				<div>Окта лого</div>
				<div>Акредитација лого</div>
				<div></div>
			</div>
			<div className='flex justify-between'>
				{/* втор ред */}
				<div>
					<div>
						<h6>ОКТА - РАФИНЕРИЈА НА НАФТА</h6>
						<p className='text-sm'>Ул. 1 Бр. 25 Миладиновци - Илинден</p>
						<p className='text-sm'>СКОПЈЕ, Поштенски фах 66</p>
						<p className='text-sm'>
							Тел: +389 2 2 532 000, факс: +389 2 2 532 502
						</p>
					</div>
				</div>
				<div>
					{/* Ова треба да доаѓа од база */}
					<p className='text-sm'>
						<strong>Нарачател на тестирањето</strong>/Customer
					</p>
					<h6>ОКТА - Оперативна Поддршка</h6>
					<p className='text-sm'>Ул. 1 Бр. 25 Миладиновци - Илинден</p>
					<p className='text-sm'>СКОПЈЕ, Поштенски фах 66</p>
				</div>
			</div>
			<div className='flex gap-10 justify-center my-4'>
				{/* трет ред */}
				<div className='flex flex-col justify-center'>
					<h5 className='uppercase font-semibold'>Извештај за тестирање бр:</h5>
					<h5 className='uppercase font-semibold'>Test Report no:</h5>
				</div>
				<div className='flex justify-center items-center border border-slate-700 p-4'>
					<p>0231/24</p>
				</div>
			</div>
			<div>
				{/* четврт ред */}
				<div className='w-fit text-sm'>
					<div className='grid grid-cols-[1fr_1fr] gap-10'>
						<div>
							<p className='font-semibold'>Предмет на тестирање:</p>
							<p>Sample:</p>
						</div>
						<div>
							<p className='font-semibold'>{product.name['mk']}</p>
							<p> {product.name['en']}</p>
						</div>
					</div>
					<div className='grid grid-cols-[1fr_1fr] gap-10'>
						<div>
							<p className='font-semibold'>Ознака на примерокот:</p>
							<p>Sample Tag:</p>
						</div>
						<div className='flex justify-between items-center'>
							<p>AA-446-XS/ADR-998</p>
						</div>
					</div>
					<div className='grid grid-cols-[1fr_1fr] gap-10'>
						<div>
							<p className='font-semibold'>Дата на прием на примерокот:</p>
							<p>Date of reception of sample:</p>
						</div>
						<div className='flex justify-between items-center'>
							<p>21.07.2024:</p>
						</div>
					</div>
					<div className='grid grid-cols-[1fr_1fr] gap-10'>
						<div>
							<p className='font-semibold'>Лабораториски број:</p>
							<p>Laboratory No:</p>
						</div>
						<div className='flex justify-between items-center'>
							<p>0231/24</p>
						</div>
					</div>
					<div className='grid grid-cols-[1fr_1fr] gap-10'>
						<div>
							<p className='font-semibold'>Дата на изработка на анализата</p>
							<p>Date of performance of analysis:</p>
						</div>
						<div className='flex justify-between items-center'>
							<p>21.07.2024</p>
						</div>
					</div>
				</div>
			</div>
			<div>
				{/* Петти ред */}
				<ViewTemplate
					template={document.template}
					templateId={document.templateId}
					settings={settings}
					defaultLanguage={languages[0]}
				/>
			</div>
			<div>
				{/* шести ред */}
				<div className='text-sm'>
					<p>Забелешки/Notes:</p>
					<ul>
						<li>
							- Анализата се однесува само на донесениот примерок од страна на
							клиентот.
						</li>
						<li>
							- The analysis refers only to the sample brought by the customer.
						</li>
						<li>- Методите означени со астериск (*) не се акредитирани.</li>
						<li>- Methods noted with asterisk (*) are not accredited.</li>
					</ul>
				</div>
			</div>
			<div className='flex justify-between'>
				<div>
					<p>Скопје</p>
					<p>{`${date} ${time}`}</p>
				</div>
				<div>Потпис и печат</div>
			</div>
		</div>
	);
};

export default SingleDocument;
