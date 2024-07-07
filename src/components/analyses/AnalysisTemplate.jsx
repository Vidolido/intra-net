'use client';

// state/actions
import { useLaboratoryContext } from '@/state/laboratoryContext';

// components
import InputType from '../inputs/InputType';
import ContextButton from '../buttons/ContextButton';

const AnalysisTemplate = ({ templates }) => {
	const state = useLaboratoryContext();
	const { selectedTemplate } = useLaboratoryContext();
	let selection = templates.find(
		(template) => template._id === selectedTemplate
	);

	// console.log(selection, 'ovo');

	return !selection ? (
		<h4>Please select a template</h4>
	) : (
		selection?.template?.map((item) => (
			<div key={item._id} className='grid grid-cols-7 gap-4 mb-1 p-0'>
				<div className='truncate col-span-2'>
					<p className='whitespace-nowrap'>
						{item?.parameter?.propertyValue['en']}
					</p>
				</div>
				{item.items &&
					Object.entries(item?.items).map((item) => {
						return (
							<div key={item[0]} className='truncate'>
								{item[1].map((row) => (
									<p key={row.id} className='whitespace-nowrap truncate'>
										{(typeof row.value === 'string' && row.value) ||
											row.value['en'] ||
											`${row?.value?.key} - ${row?.value?.value}`}
									</p>
								))}
							</div>
						);
					})}
				<div>
					<InputType classes='w-full p-0' />
				</div>
				{/* <div>
								<ContextButton label='Margin of error' type='default' />
							</div> */}
			</div>
		))
	);
};

export default AnalysisTemplate;
