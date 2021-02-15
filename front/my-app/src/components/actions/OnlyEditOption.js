import EditItemCustom from './EditItemCustom';

const OnlyEditOptions = ({ data, setData, optionsOpen, setOptionsOpen, itemEdit, itemBody }) => {
  const hideOption = () => {
    setOptionsOpen(false);
  };

  return optionsOpen ? (
    <div>
      <div className="modal-full options" onClick={hideOption} />
      <ul className="more-options">
        <EditItemCustom
          data={data}
          setData={setData}
          setOptionsOpen={setOptionsOpen}
          itemEdit={itemEdit}
          itemBody={itemBody}
        />
      </ul>
    </div>
  ) : null;
};

export default OnlyEditOptions;
