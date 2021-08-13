import './styles.css';
import Background from './assets/images/background-picture.svg';
import ProfilePicture from './assets/images/profile-picture.svg';
export default function User(){


    return(
        <section>
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
                    <p>Some User</p>
                </div>
                <div className='top-description'>
                    <p>Some description</p>
                </div>
            </div>
        </section>
    )
}