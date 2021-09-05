import './styles.css'
// import {IoIosArrowDown} from 'react-icons/io'

export default function Events(props){
    console.log(props)

    return(  
            
            <div className='events-list'>
               {props.events.map((item, i)=> 
                   <p key={i}>{item.name}</p>
               )}
            </div>
    )   
}