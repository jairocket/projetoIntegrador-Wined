import './styles.css';
import Background from './assets/images/background-picture.svg';
import ProfilePicture from './assets/images/profile-picture.svg';
import { useState, useEffect } from 'react'



export default function User(props){
    
    const [user, setUser] = useState({})
    useEffect(()=>{
        setUser(props.user)
    }, [props])
    return(
        <section className='top-session'>
            <div>
                <div className='top-background'>
                    <img
                        src={ Background }
                        alt='Imagem - foto de background do usuário'
                    />
                </div>
                <div className='top-avatar'>
                  
                    <img
                        src={ ProfilePicture }
                        alt= 'Imagem - avatar do usuário'
                    />
      
                </div>
                <div className='top-user'>
                    <p>{user.name} {user.surname}</p>
                </div>
                <div className='top-description'>
                    <p>{user.description}</p>
                </div>
            </div>
        </section>
    )
}