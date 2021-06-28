import style from "./search.module.scss";
import SearchIcon from "@material-ui/icons/Search";

export const Search = (props) => {
  return (
    <div className={style.container}>
      <SearchIcon className={style.icon} />
      <input
        type="text"
        placeholder="Enter Address Here"
        className={style.searchbar}
        value={('address' in props)?props.address:null}
      />
    </div>
  );
};
