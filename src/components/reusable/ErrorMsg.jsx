const ErrorMsg = ({ msg }) => {
	console.log(msg, 'the MSG');
	return (
		<span className='bg-red-100 text-red-700' role='alert'>
			{msg}
		</span>
	);
};

export default ErrorMsg;
