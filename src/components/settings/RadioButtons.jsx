const RadioButtons = ({ labels, name, onChange }) => {
	return (
		<div>
			{labels?.map((label) => (
				<label key={label}>
					<span>{label}</span>
					<input
						type='radio'
						name={name}
						value={label.toLowerCase()}
						onChange={onChange}
					/>
				</label>
			))}
		</div>
	);
};

export default RadioButtons;
