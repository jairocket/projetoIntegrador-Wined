import './styles.css';

export default function redButton(props){
    return(
        <button className={props.className} type={props.type}>{props.name}</button>
    )
}