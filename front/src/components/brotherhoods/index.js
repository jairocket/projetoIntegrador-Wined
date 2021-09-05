import './styles.css'


// import {IoIosArrowUp} from 'react-icons/io'

export default function Brotherhood(props){
    console.log(props)
    return(
            <div className='brotherhood-list'>
               {props.brotherhoods.map((item, i)=> 
                   <p key={i}>{item.name}</p>
               )}
            </div>
    )   
}