import './styles.css';
import Background from './assets/images/background-picture.svg';
import ProfilePicture from './assets/images/profile-picture.svg';

export default function User(props){
    console.log(props)

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
                    <p>{props.user.name} {props.user.surname}</p>
                </div>
                <div className='top-description'>
                    <p>{props.user.description}</p>
                </div>
            </div>
        </section>
    )
}