import style from "./input.module.scss";

export const Input = ({
  Label,
  Name,
  Value,
  Id,
  Type,
  Placeholder,
  Required,
  OnChange,
}) => {
  return (
    <div className={style.inputContainer}>
      <label htmlFor={Id}>
        {Label}
        {Required && <span style={{color: 'rgba(255,0,0,1)'}}> *</span>}
      </label>
      <input
        id={Id}
        type={Type}
        placeholder={Placeholder}
        name={Name}
        value={Value}
        required={Required}
        onChange={OnChange}
      />
    </div>
  );
};
