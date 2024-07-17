const Labels = ({ dateTime = false }) => {
	return (
		<div
			className={`grid grid-cols-${
				dateTime ? 5 : 4
			} gap-4 border rounded bg-white>`}>
			<p>Product</p>
			<p>Origin</p>
			<p>Sample</p>
			<p>Document</p>
			{dateTime && <p>Date/Time</p>}
		</div>
	);
};

export default Labels;
