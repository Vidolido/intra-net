export const mutateFields = (fields) => {
  return fields.reduce((acc, currenValue) => {
    let type = currenValue.collections.find(
      (collection) => collection.name['en'] === 'type'
    );
    let documentType = currenValue.collections.find(
      (collection) => collection.name['en'] === 'link'
    );
    // console.log(documentType, 'THE CURENT VALUE');
    return (acc = [
      ...acc,
      {
        _id: currenValue._id,
        name: { ...currenValue.parameter.inputValue },
        inputType: !type.items[0] ? '' : type.items[0].value,
        value: currenValue.value != undefined ? currenValue.value : '',
        links: [
          ...documentType.items.map((type) => type?.value?.value || type.value),
        ],
      },
    ]);
  }, []);
};
