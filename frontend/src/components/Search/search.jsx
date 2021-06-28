import style from "./search.module.scss";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router";
import { useState } from "react";

export const Search = (props) => {
  let history = useHistory();
  const [address, setAddress] = useState('vitalik.eth');
  const submitHandler = (e) => {
    e.preventDefault();
    history.push(`/address/${address}`)
  }
  const onChangeHandler = (e) => {
    setAddress(e.target.value)
  }
  return (
    <div className={style.container}>
      <form onSubmit={submitHandler}>
         <SearchIcon className={style.icon} />
      <input
        type="text"
        placeholder="Enter Address Here"
        className={style.searchbar}
        onChange={onChangeHandler}
        value={('address' in props)?props.address:null}
      />
      </form>
     
    </div>
  );
};
