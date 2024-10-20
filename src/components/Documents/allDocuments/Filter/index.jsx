import { findSettingType } from '@/utils/findSettingType';
import { mutateTemplateSettings } from '@/utils/settings/mutateTempalteSettings';
import { nameArray } from '@/utils/nameArray';

const Filter = ({
	templateSettings,
	setSortByYear,
	setFilterOptions,
	filterOptions,
}) => {
	const { products, types, countries } =
		mutateTemplateSettings(templateSettings);

	let productLabels = products?.settings?.map((setting) => ({
		_id: setting._id,
		...nameArray(setting.parameter.inputValue),
	}));
	let sampleTypes = findSettingType(types.settings, ['sample']);
	let samples = sampleTypes?.map((setting) => ({
		_id: setting._id,
		...nameArray(setting.parameter.inputValue),
	}));
	let documentTypes = findSettingType(types.settings, ['document']);
	let docT = documentTypes?.map((setting) => ({
		_id: setting._id,
		...nameArray(setting.parameter.inputValue),
	}));
	let origin = countries?.settings?.map((setting) => ({
		_id: setting._id,
		...nameArray(setting.parameter.inputValue),
	}));

	let ids = {
		products: productLabels.map((label) => label._id),
		sampleTypes: samples.map((sample) => sample._id),
		documentTypes: docT.map((doc) => doc._id),
		origin: origin.map((origin) => origin._id),
	};

	const handleCheckboxChange = (e, category, id, allIds = []) => {
		setFilterOptions((prevState) => {
			if (id === 'selectAll') {
				const updatedArray = e.target.checked ? allIds : [];
				return { ...prevState, [category]: updatedArray };
			}
			const categoryArray = prevState[category];
			const updatedArray = categoryArray.includes(id)
				? categoryArray.filter((item) => item !== id)
				: [...categoryArray, id];

			return { ...prevState, [category]: updatedArray };
		});
	};

	return (
		<div className='flex-shrink w-fit'>
			<h4>Filter</h4>
			<label className='block border-b border-slate-200 cursor-pointer hover:border-red-300'>
				<input
					type='checkbox'
					onChange={(e) => setSortByYear(e.target.checked ? true : false)}
				/>
				<span className='ml-2'>Sort by date</span>
			</label>
			<div>
				<h6>Products</h6>
				<div className='grid grid-cols-2'>
					{productLabels.map((product) => {
						return (
							<label
								key={product._id}
								className='block border-b border-slate-200 cursor-pointer hover:border-red-300'>
								<input
									name='products'
									type='checkbox'
									checked={
										filterOptions['products'].includes(product._id)
											? 'checked'
											: ''
									}
									onChange={(e) =>
										handleCheckboxChange(e, 'products', product._id)
									}
								/>
								<span className='ml-2'>{product.name['en']}</span>
							</label>
						);
					})}
					<label className='block border-b border-slate-200 cursor-pointer hover:border-red-300'>
						<input
							id='selectAll'
							type='checkbox'
							onChange={(e) =>
								handleCheckboxChange(
									e,
									'products',
									'selectAll',
									ids['products']
								)
							}
						/>
						<span className='ml-2'>Select All</span>
					</label>
				</div>
			</div>

			<div>
				<h6>Origin</h6>
				<div className='grid grid-cols-2'>
					{origin.map((country) => {
						return (
							<label
								key={country._id}
								className='block border-b border-slate-200 cursor-pointer hover:border-red-300'>
								<input
									name='origin'
									type='checkbox'
									checked={
										filterOptions['origin'].includes(country._id)
											? 'checked'
											: ''
									}
									onChange={(e) =>
										handleCheckboxChange(e, 'origin', country._id)
									}
								/>
								<span className='ml-2'>{country.name['en']}</span>
							</label>
						);
					})}
					<label className='block border-b border-slate-200 cursor-pointer hover:border-red-300'>
						<input
							id='selectAll'
							type='checkbox'
							onChange={(e) =>
								handleCheckboxChange(e, 'origin', 'selectAll', ids['origin'])
							}
						/>

						<span className='ml-2'>Select All</span>
					</label>
				</div>
			</div>

			<div>
				<h6>Sample Type</h6>
				<div className='grid grid-cols-2'>
					{samples.map((sample) => {
						return (
							<label
								key={sample._id}
								className='block border-b border-slate-200 cursor-pointer hover:border-red-300'>
								<input
									name='sampleTypes'
									type='checkbox'
									checked={
										filterOptions['sampleTypes'].includes(sample._id)
											? 'checked'
											: ''
									}
									onChange={(e) =>
										handleCheckboxChange(e, 'sampleTypes', sample._id)
									}
								/>
								<span className='ml-2'>{sample.name['en']}</span>
							</label>
						);
					})}
					<label className='block border-b border-slate-200 cursor-pointer hover:border-red-300'>
						<input
							id='selectAll'
							type='checkbox'
							onChange={(e) =>
								handleCheckboxChange(
									e,
									'sampleTypes',
									'selectAll',
									ids['sampleTypes']
								)
							}
						/>

						<span className='ml-2'>Select All</span>
					</label>
				</div>
			</div>

			<div>
				<h6>Document Type</h6>
				<div className='grid grid-cols-2'>
					{docT.map((docTypes) => {
						return (
							<label
								key={docTypes._id}
								className='block border-b border-slate-200 cursor-pointer hover:border-red-300'>
								<input
									name='documentTypes'
									type='checkbox'
									checked={
										filterOptions['documentTypes'].includes(docTypes._id)
											? 'checked'
											: ''
									}
									onChange={(e) =>
										handleCheckboxChange(e, 'documentTypes', docTypes._id)
									}
								/>
								<span className='ml-2'>{docTypes.name['en']}</span>
							</label>
						);
					})}
					<label className='block border-b border-slate-200 cursor-pointer hover:border-red-300'>
						<input
							id='selectAll'
							type='checkbox'
							onChange={(e) =>
								handleCheckboxChange(
									e,
									'documentTypes',
									'selectAll',
									ids['documentTypes']
								)
							}
						/>

						<span className='ml-2'>Select All</span>
					</label>
				</div>
			</div>
		</div>
	);
};

export default Filter;
