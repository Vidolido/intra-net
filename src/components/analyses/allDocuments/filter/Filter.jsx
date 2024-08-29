'use client';
import { useState } from 'react';

// state/actions
import { nameArray } from '@/utils/nameArray';
import { mutateTemplateSettings } from '@/utils/mutateTempalteSettings';
import { findSettingType } from '@/utils/findSettingType';

// components
import DateCollections from '../DateCollections';
import Labels from '../Labels';
import Unsorted from '../Unsorted';

const Filter = ({ sorted, notSorted, templateSettings }) => {
	let [showDocuments, setShowDocuments] = useState('notSorted');

	let [filterOptions, setFilterOptions] = useState({
		products: [],
		sampleTypes: [],
		documentTypes: [],
		origin: [],
	});

	let { products, types, countries } = mutateTemplateSettings(templateSettings);

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

	let setFilter = (e) => {
		// console.log(e.target.value);
		// console.log(e.target.name);
		let name = e.target.name;
		let value = e.target.value;
		let checked = e.target.checked;

		if (checked) {
			if (value === 'selectAll') {
				let ids = {
					products: productLabels.map((label) => label._id),
					sampleTypes: samples.map((sample) => sample._id),
					documentTypes: docT.map((doc) => doc._id),
					origin: origin.map((origin) => origin._id),
				};
				setFilterOptions((prev) => ({
					...prev,
					[name]: [...ids[name]],
				}));
			} else {
				setFilterOptions((prev) => ({
					...prev,
					[name]: [...prev[name], value],
				}));
			}
		} else {
			if (value === 'selectAll') {
				setFilterOptions((prev) => ({ ...prev, [name]: [] }));
			} else {
				setFilterOptions((prev) => ({
					...prev,
					[name]: [...prev[name].filter((item) => item !== value)],
				}));
			}
		}
		console.log(filterOptions, 'inside');
	};

	console.log(filterOptions, 'outside');
	// console.log(sorted, notSorted, 'DOCUMENTS');
	// console.log(showDocuments, 'SHOWDOC');
	// console.log([...productLabels, ...samples, ...docT, ...origin], 'OPTIONS?');
	return (
		<div className='flex justify-between gap-10'>
			<div className='flex-grow'>
				<div className='w-full'>
					{showDocuments === 'notSorted' && (
						<Labels classes={'grid-cols-5'} dateTime={true} />
					)}
					{showDocuments === 'notSorted' &&
						notSorted.map((document) => (
							<Unsorted
								key={document._id}
								document={document}
								templateSettings={templateSettings}
							/>
						))}
				</div>
				{showDocuments === 'sorted' &&
					sorted.map((dateCollection) => (
						<DateCollections
							key={dateCollection.date}
							collection={dateCollection}
							templateSettings={templateSettings}
						/>
					))}
			</div>
			<div className='flex-shrink w-fit'>
				<h4>Filter</h4>
				<label className='block border-b border-slate-200 cursor-pointer hover:border-red-300'>
					<input
						type='checkbox'
						onChange={(e) =>
							setShowDocuments(e.target.checked ? 'sorted' : 'notSorted')
						}
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
										onChange={setFilter}
										value={product._id}
									/>
									<span className='ml-2'>{product.name['en']}</span>
								</label>
							);
						})}
						<label className='block border-b border-slate-200 cursor-pointer hover:border-red-300'>
							<input
								name='products'
								type='checkbox'
								onChange={setFilter}
								value='selectAll'
							/>
							<span>Select All</span>
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
										onChange={setFilter}
										value={country._id}
									/>
									<span className='ml-2'>{country.name['en']}</span>
								</label>
							);
						})}
						<label className='block border-b border-slate-200 cursor-pointer hover:border-red-300'>
							<input
								name='origin'
								type='checkbox'
								onChange={setFilter}
								value='selectAll'
							/>
							<span>Select All</span>
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
										onChange={setFilter}
										value={sample._id}
									/>
									<span className='ml-2'>{sample.name['en']}</span>
								</label>
							);
						})}
						<label className='block border-b border-slate-200 cursor-pointer hover:border-red-300'>
							<input
								name='sampleTypes'
								type='checkbox'
								onChange={setFilter}
								value='selectAll'
							/>
							<span>Select All</span>
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
										onChange={setFilter}
										value={docTypes._id}
									/>
									<span className='ml-2'>{docTypes.name['en']}</span>
								</label>
							);
						})}
						<label className='block border-b border-slate-200 cursor-pointer hover:border-red-300'>
							<input
								name='documentTypes'
								type='checkbox'
								onChange={setFilter}
								value='selectAll'
							/>
							<span>Select All</span>
						</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Filter;
