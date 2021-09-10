
import './styles.css'
import logo from './assets/images/logo-wined.svg'
import Button from '../../components/red-button'
// import PasswordInput from '../../components/password-input'
import {  useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Cookie from "js-cookie"


export default function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [typePass, setTypePass] = useState('password'); 
    const history = useHistory()
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] =useState('');
    const [mailErr, setMailErr] = useState('error')
    const [passErr, setPassErr] = useState('error')



    // function togglePassword(){
    //     if(typePass === 'password'){
    //         setTypePass('text')
    //     }else{
    //         setTypePass('password')
    //     }
    // }

    async function HandleSubmit(e){
        e.preventDefault()
        
        setEmailError('');
        setPasswordError('');
        setMailErr('error');
        setPassErr('error')
        if(!email) {
            setMailErr('show')
        }else if(!password){
            setPassErr('show')
        }else{
            try{
                const result = await axios.post('http://localhost:3333/login', {email, password});
                Cookie.set('token', result.data.token);
                history.push('/dashboard')    
            } 
            catch(error) {
                if(error.response.data.message === 'E-mail não cadastrado!'){
                    setEmailError(error.response.data.message);
                    
                }
                if(error.response.data.message === 'Senha incorreta!'){
                    setPasswordError(error.response.data.message);
                }
            }
        }
                
    }    
    
    return(   
        <body>
            <main className="login-main">
                <section className = "loginForm">
                    <div className="logo">
                        <img src={logo} alt="logo-wined"/>
                    </div>
      
                    <form  className="formulario" onSubmit={HandleSubmit} >
                        <div className="login-input">
                            <label>
                                <input 
                                    type="text" 
                                    name="email" 
                                    value={ email } onChange={(e)=> setEmail(e.target.value)} 
                                    id="email" placeholder="E-mail" 
                                />
                            </label> 
                            <span>{emailError}</span>
                            <span className={mailErr}>Por favor, informe seu e-mail!</span>  
                        </div>
                        {/* <PasswordInput /> */}
                        <div className="password-input">
                            <label>
                                <input 
                                    name="password"
                                    value={ password } 
                                    onChange={(e)=> setPassword(e.target.value)}
                                    id="password"
                                    placeholder="Senha"
                                    type="password"
                                    // type={ typePass }
                                />                   
                                {/* <i 
                                    className="bi bi-eye-slash" 
                                    id="togglePassword" 
                                    onClick={togglePassword}
                                >

                                </i> */}
     
                            </label>
                            <span>{passwordError}</span>
                            <span className={passErr}>Por favor, informe sua senha!</span>      
                        </div>

                    <div id="login-forgot">
                        <a href="/login/password" className="text-montserrat">Esqueceu a senha?</a>
                    </div>
                    <div id="login-submit">
                        <Button
                            name='Entrar'
                            type='submit'
                            className='btn-form'
                        />
                    </div>
                    
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

