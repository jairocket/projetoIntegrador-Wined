import './styles.css'
// import {IoIosArrowDown} from 'react-icons/io'

export default function Events(props){

    return(  
            
            <div className='events-list'>
               {props.events.map((item)=> 
                <div>
                    <div>
                        <h5 >{item.name}</h5>
                    </div>
                    <div>
                        <h6>Onde?</h6>
                        <p >{item.street}, {item.number}</p>
                        <p >{item.complement}. CEP: {item.cep}</p>
                        <p >{item.city}/ {item.state}</p>
                    </div>
                    <div>
                        <h6>Nos vemos</h6>
                    </div>
                    <div>
                        <p>{item.date}, às {item.time}</p>
                    </div>
                    {/* incluir funcionalidade que notifica o usuário da criação do evento e solicita confirmação de presença */}
                </div>  
               )}
            </div>
    )   
}