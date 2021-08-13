
import './styles.css'
import logo from './assets/images/logo-wined.svg'
import Button from '../../components/red-button'
import PasswordInput from '../../components/password-input'
import { useState } from 'react'

export default function Login(){
    const [email, setEmail] = useState('')
    return(
        <html lang="pt-BR">
            <head>
                <meta charset="UTF-8"/>
                <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Login</title>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;1,700&family=Roboto:wght@400;500&display=swap" rel="stylesheet"/>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" />
            </head>
        <body>
            <main className="login-main">
                <section className = "loginForm">
                    <div className="logo">
                        <img src={logo} alt="logo-wined"/>
                    </div>
      
                    <form action="/login" method='POST' className="formulario">
                        <div className="login-input">
                            <label>
                                <input type="text" name="email" value={ email } onChange={(e)=> setEmail(e.target.value)} id="email" placeholder="E-mail" />
                            </label>   
                        </div>
                        <PasswordInput />

                    <div id="login-forgot">
                        <a href="/login/password" className="text-montserrat">Esqueceu a senha?</a>
                    </div>
                    <Button/>
                </form>

                {/* <div className="separador">
                    <div></div>
                        <span>OU</span>
                    <div></div>
                </div>
                <div className="social-fields">
                    <a href="#" className="social-field facebook">
                <img src="images/facebook-icon.svg" alt="Entrar com o Facebook" />
                <p>Entrar com o Facebook</p>
                 </a>
            <a href="#" className="social-field google">
              <img src="images/google-icon.svg" alt="Entrar com o Google" />
              <p>Entrar com o Google</p>
            </a>
        </div>  */}
        <div className="login-signup">
            <p>Não tem um Perfil?</p>
            <a href="/signup">Junte-se a Wined+</a>
        </div> 
    </section>

    </main>
    <script type="text/javascript" src="../js/togglePassword.js"></script>
</body>
</html>
    )
}

