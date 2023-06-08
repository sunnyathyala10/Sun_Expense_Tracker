import Select from "react-select";

const MySelect = (props) => {
  return (
    <Select
      options={props.options}
      className={props.className}
      onChange={props.onChangeHandler}
      placeholder={props.placeholder}
    />
  );
};

export default MySelect;
