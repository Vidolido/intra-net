import DocumentType from './basic/DocumentType';
import Origin from './basic/Origin';
import Product from './basic/Product';
import SampleType from './basic/SampleType';

const TemplateForm = ({ settings }) => {
	return (
		<form>
			<h4>Template Form</h4>
			<div>
				<Product />
				<SampleType />
				<Origin />
				<DocumentType />
			</div>
			<div>
				<h5>Template Settings</h5>
				{settings &&
					settings?.map((setting) => {
						return (
							<p key={setting._id}>{setting.parameter.name.singular['en']}</p>
						);
					})}
			</div>
		</form>
	);
};

export default TemplateForm;
