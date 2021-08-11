
import './styles.css'
import logo from './assets/images/logo-wined.svg'
import Button from '../../components/red-button'

export default function Login(){
    return(
        <body>
            <main className="login-main">
                <section className = "loginForm">
                    <div className="logo">
                        <img src={logo} alt="logo-wined"/>
                    </div>
      
                    <form action="/login" method='POST' className="formulario">
                        <div className="login-input">
                            <input type="text" name="email" id="email" placeholder="E-mail" />
                        </div>
                    <div className="login-input">
                        <input type="password" name="password" id="password" placeholder="Senha"/><i className="bi bi-eye-slash" id="togglePassword"></i>
                    </div>
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
    )
}

