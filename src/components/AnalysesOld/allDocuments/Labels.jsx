const Labels = ({ classes, dateTime }) => {
	return (
		<div className={` border rounded bg-white grid gap-4 ${classes}`}>
			<p>Product</p>
			<p>Origin</p>
			<p>Sample</p>
			<p>Document</p>
			{dateTime && <p>Date/Time</p>}
		</div>
	);
};

export default Labels;
