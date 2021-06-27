import style from "./search.module.scss";
import SearchIcon from "@material-ui/icons/Search";

export const Search = () => {
  return (
    <div className={style.container}>
      <SearchIcon className={style.icon} />
      <input
        type="text"
        placeholder="Enter Addrress Here"
        className={style.searchbar}
      />
    </div>
  );
};
