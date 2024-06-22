const HeadingsTableRow = ({ headings, defaultLanguage }) => {
	return (
		<tr>
			<td></td>
			{headings && headings.main && (
				<th className='border w-fit text-left px-3'>
					{headings?.main[defaultLanguage.language]}
				</th>
			)}

			{headings &&
				headings?.collections &&
				headings?.collections?.map((collection, index) => (
					<th key={index} className='border w-fit text-left px-3'>
						{collection[defaultLanguage.language]}
					</th>
				))}
		</tr>
	);
};

export default HeadingsTableRow;
