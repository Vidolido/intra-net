'use client';
import { useEffect, useState } from 'react';

// state/actions
import { mutateTemplateSettings } from '@/utils/settings/mutateTempalteSettings';
import { filterDocuments } from '@/data-access/documents/document/filterDocuments';

// components
import DisplayDocuments from './DisplayDocuments';
import Filter from './Filter';

const AllDocuments = ({ templateSettings }) => {
	//   const { products, types, countries } =
	//     mutateTemplateSettings(templateSettings);

	const [sortByYear, setSortByYear] = useState(false);
	const [documents, setDocuments] = useState([]);

	const [filterOptions, setFilterOptions] = useState({
		products: [],
		sampleTypes: [],
		documentTypes: [],
		origin: [],
	});

	useEffect(() => {
		const fetchDocuments = async () => {
			try {
				const { documents } = await filterDocuments(filterOptions, sortByYear);

				setDocuments(JSON.parse(documents));
			} catch (error) {
				console.error('Error fetching documents: ', error);
			}
		};
		fetchDocuments();
	}, [filterOptions, sortByYear]);
	//   console.log(filterOptions, 'filterOptions');
	//   console.log(documents, 'documents');
	return (
		<div className='flex justify-between w-full gap-10'>
			<DisplayDocuments
				templateSettings={templateSettings}
				documents={documents}
				sortByYear={sortByYear}
			/>
			<Filter
				templateSettings={templateSettings}
				setSortByYear={setSortByYear}
				filterOptions={filterOptions}
				setFilterOptions={setFilterOptions}
			/>
		</div>
	);
};

export default AllDocuments;
