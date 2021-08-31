import './styles.css'

import { useState } from 'react'
import { useEffect } from 'react'

import Header from '../../components/Header'
import TopView from '../../components/top-view'
import Brotherhoods from '../../components/brotherhoods'
import Button from '../../components/red-button'
import Footer from '../../components/Footer'

import {IoIosArrowDown} from 'react-icons/io'
import axios from 'axios'
// import {IoIosArrowUp} from 'react-icons/io'



export default function Dashboard(){
    const [parameter, setParameter] = useState('')
    const [ user, setUser] = useState(null);
    useEffect(()=>{
        axios.get('http://localhost:3333/dashboard').then(
            response => {
                setUser(response.data)    
        })
    }, [])

    
    return(
        <html lang='pt-BR' >
            <head>
                <meta charSet="UTF-8"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Dashboard</title>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;1,700&family=Roboto:wght@400;500&display=swap" rel="stylesheet"/>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" />
            </head>
            <body>
                <main>
                    <><span>{user}</span></>
                    <Header />
                    <TopView user= {user} />
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

                    <Brotherhoods />
                    <div className= 'dash-events'>
                        <p>Eventos</p><IoIosArrowDown/>
                    </div>
                    <Footer />

                </main>
            </body>
            


        

        </html>
    )
}

