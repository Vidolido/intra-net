// state/actions
import { nameArray } from '@/utils/nameArray';
import { formatDate } from '@/utils/formatDate';
import ViewTemplate from '../TestReport/ViewTemplate';

// components
// import ViewTemplate from './ViewTemplate';
// import ViewTemplate from './viewParts/ViewTemplate';

const OtherDocuments = ({ document, products, settings, languages }) => {
  // console.log(document, 'the document');
  let { date, time } = formatDate(new Date());
  let names = products?.settings.map((setting) => ({
    _id: setting._id,
    ...nameArray(setting.parameter.inputValue),
  }));
  let product = names.find((prod) => prod._id === document?.header?.product);
  // console.log(product, 'the products');
  //   let date = formatDate(new Date());
  return (
    <div className='w-[70%] mx-auto'>
      {/* прв ред */}
      <div className='flex justify-evenly'>
        <div>Окта лого</div>
        <div></div>
        <div>SZQ-824-001_v01</div>
      </div>
      {/* втор ред */}
      {/* <div className='flex justify-between'>
          <div>
            <h6>ОКТА - РАФИНЕРИЈА НА НАФТА</h6>
            <p className='text-sm'>Ул. 1 Бр. 25 Миладиновци - Илинден</p>
            <p className='text-sm'>СКОПЈЕ, Поштенски фах 66</p>
            <p className='text-sm'>
              Тел: +389 2 2 532 000, факс: +389 2 2 532 502
            </p>
          </div>
        <div>
          <p className='text-sm'>
            <strong>Нарачател на тестирањето</strong>/Customer
          </p>
          <h6>ОКТА - Оперативна Поддршка</h6>
          <p className='text-sm'>Ул. 1 Бр. 25 Миладиновци - Илинден</p>
          <p className='text-sm'>СКОПЈЕ, Поштенски фах 66</p>
        </div>
      </div> */}
      <div className='flex gap-10 justify-center my-4'>
        {/* трет ред */}
        <div className='flex flex-col justify-center'>
          <h5 className='uppercase font-semibold'>Уверение за квалитет</h5>
          <h5 className='uppercase font-semibold'>Quality Certificate No:</h5>
        </div>
        <div className='flex justify-center items-center border border-slate-700 p-4'>
          <p>0231/24</p>
        </div>
      </div>
      <div>
        {/* четврт ред */}
        <div className='w-fit text-sm'>
          <div className='grid grid-cols-[1fr_1fr] gap-10'>
            <div>
              <span>Купувач / Client</span>
            </div>
          </div>
          <div className='grid grid-cols-[1fr_1fr] gap-10'>
            <div>
              <span>Место / Destination</span>
            </div>
            <div className='flex justify-between items-center'>
              {/* <span>Дата на испорака / Loading Date</span> */}
            </div>
          </div>
          <div className='grid grid-cols-[1fr_1fr] gap-10'>
            <div>
              <span>Превозно средство / Tank Wagon</span>
            </div>
            <div className='flex justify-between items-center'>
              {/* <span>Дата на изработка на уверението </span> */}
              {/* <span>Quality Certificate Date From</span> */}
            </div>
          </div>
          <div className='grid grid-cols-[1fr_1fr] gap-10'>
            <div>
              <span>Дата на испорака / Loading Date</span>
            </div>
            <div className='flex justify-between items-center'>
              {/* <p>0231/24</p> */}
            </div>
          </div>
          <div className='grid grid-cols-[1fr_1fr] gap-10'>
            <div>
              <span>Резервоар бр. / Tank No.</span>
            </div>
            <div className='flex justify-between items-center'>
              <p>Р-024/3</p>
            </div>
          </div>
          <div className='grid grid-cols-[1fr_1fr] gap-10'>
            <div>
              <span>Дата на изработка на уверението </span>
              <br />
              <span>Quality Certificate Date From</span>
            </div>
            <div className='flex justify-between items-center'>
              <p>{date}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* Петти ред */}
        <ViewTemplate
          template={document.template}
          templateId={document.templateId}
          settings={settings}
          defaultLanguage={languages[0]}
        />
      </div>
      <div>
        {/* шести ред */}
        <div className='text-sm'>
          <p>Забелешкa/Note:</p>
          <ul>
            <li>- Одговара на MKS EN 590:2009 / Acc. to EN 590:2009</li>
          </ul>
        </div>
      </div>
      <div className='flex justify-between'>
        <div>
          <p>Скопје</p>
          <p>{`${date} ${time}`}</p>
        </div>
        <div>Потпис и печат</div>
      </div>
    </div>
  );
};

export default OtherDocuments;
