import './styles.css'

import { useEffect, useState } from 'react'

import Header from '../../components/Header'
import TopView from '../../components/top-view'
import Brotherhoods from '../../components/brotherhoods'
import Button from '../../components/red-button'
import Footer from '../../components/Footer'

import {IoIosArrowDown} from 'react-icons/io'
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom'

// import {IoIosArrowUp} from 'react-icons/io'

export default function Dashboard(){
    const [parameter, setParameter] = useState('')
    const [ user, setUser] = useState({name: '', surname: '', description:'', avatar_picture: '', background_picture: ''});
    const [ brotherhoods, setBrotherhoods ] = useState([]);
    const [ events, setEvents ] = useState([]);
    const [ token, setToken ] = useState('');
    const [ loaded, setLoad ] = useState(false);
    const history = useHistory();

    useEffect(()=>{
        setLoad(true)
    }, [user, brotherhoods, events])


     useEffect(()=>{

        setToken(Cookies.get('token'));
        
     },[])
    

    useEffect(()=>{
        console.log(token)
        // axios.get('http://localhost:3333/dashboard', {
        //      headers: {authorization: `Bearer ${token}`}
        //  })
        fetch('http://localhost:3333/dashboard',{
            headers: {authorization: `Bearer ${token}`}
        })
        .then(response => response.json())
         .then(response=>{
             setUser(response.user);
             setBrotherhoods(response.brotherhoods);
             setEvents(response.events)
         }).catch(error => history.push('/login'));
               
    },[token, history]);
        if(!user || !brotherhoods || !events) return null
    
    return (
        <>
        {loaded && 
        (
                <main>
                    
                    <Header />
                    <TopView user={user} />
                    <div className='dash-menu'>
                        <div>
                            <form action="http://localhost:3000/dashboard/wines" method="GET">
                                <label for="parameter"></label>
                                <input 
                                    type="text"
                                    name="parameter" 
                                    value={parameter}
                                    onChange={(e)=> setParameter(e.target.value)}
                                    id="txtBusca" 
                                    placeholder="Buscar vinhos..."
                                />
                                <Button
                                    name='Buscar'
                                    type='submit'
                                    className='btn-search'
                                />
                            </form>
                        </div>

                    </div>

                    <Brotherhoods brotherhoods={brotherhoods}/>
                    <div className= 'dash-events'>
                        <p>Eventos</p><IoIosArrowDown/>
                    </div>
                    <Footer />

                </main>
        )
    }</>
    )
}

