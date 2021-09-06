import './styles.css'
import { Link } from 'react-router-dom'


// import {IoIosArrowUp} from 'react-icons/io'

export default function Brotherhood(props){
    console.log(props)
    return(
            <div className='brotherhood-list'>
               {props.brotherhoods.map((item, i)=> 
                   <Link  key={i} to={location =>`/brotherhood/${item.id}`}>{item.name}</Link>
               )}
            </div>
    )   
}