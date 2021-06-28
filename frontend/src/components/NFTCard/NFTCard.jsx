//import style from "./navbar.module.scss";




export const NFTCard = (props) => {
  return (
    <div>
        <p>{props.name}</p>
        <img src={props.url} alt={props.description} style={{ maxWidth: '500px' }}/>
        <p>{props.description}</p>
    </div>
  );
};