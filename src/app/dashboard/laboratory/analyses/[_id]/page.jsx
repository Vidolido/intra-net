import { getAnalysisById } from '../../apiCalls';

const page = async ({ params }) => {
	let { _id } = params;
	let document = await getAnalysisById(_id);

	console.log(document, 'ovoj document');

	return <div>Single Document</div>;
};

export default page;
