import './styles.css'
import {IoIosArrowDown} from 'react-icons/io'

// import {IoIosArrowUp} from 'react-icons/io'

export default function Brotherhood(props){

    return(
        <section className='brotherhood-section'>
            <div className='brotherhood-section-title'><p>Minhas Confrarias</p> <IoIosArrowDown/></div>
            
            <div className='brotherhood-list'>
                <div className='brotherhood-link'>
                    <p>Confraria 1</p>
                </div>
                <div className='brotherhood-link'>
                    <p>Confraria 2</p>
                </div>
                <div className='brotherhood-link'>
                    <p>Confraria 3</p>
                </div>  
            </div>
        </section>
    )
    
}