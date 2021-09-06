import './styles.css'
// import {IoIosArrowDown} from 'react-icons/io'

export default function Events(props){
    console.log(props)

    return(  
            
            <div className='events-list'>
               {props.events.map((item, i)=> 
                <div>
                    <div>
                        <h5 key={i}>{item.name}</h5>
                    </div>
                    <div>
                        <h6>Onde?</h6>
                        <p key={i}>{item.street}, {item.number}</p>
                        <p key={i}>{item.complement}. CEP: {item.cep}</p>
                        <p key={i}>{item.city}/ {item.state}</p>
                    </div>
                    <div>
                        <h6>Nos vemos</h6>
                    </div>
                    <div>
                        <p key={i}>{item.date}, às {item.time}</p>
                    </div>
                </div>  
               )}
            </div>
    )   
}