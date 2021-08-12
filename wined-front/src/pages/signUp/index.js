import './styles.css'

import Button from '../../components/red-button'
import PasswordInput from '../../components/password-input'
import { useState } from 'react'


 function SignUp(){
    const [terms, setTerms] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [birthday, setBirthday] = useState('');
    const [description, setDescription] = useState('');
    return(
        <html lang="pt-BR">
            <head>
                <meta charset="UTF-8"/>
                <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Cadastro</title>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;1,700&family=Roboto:wght@400;500&display=swap" rel="stylesheet"/>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" />
            </head>
            <body>
                <main className="signup-main">
                    <section>
                        <div id="call">
                            Junte-se à <h1 id="logo">Wined+</h1>
                        </div>
                        <div id="call-text">
                            <h2>Compartilhe momentos inesquecíveis com seus amigos!</h2>
                        </div>
                        <br></br>
                        <form action='/cadastrar'method="POST" className="formulario">
                            <div className="signup-terms">
                                <label>
                                    <input type="checkbox" value={ terms } onChange={(e)=> setTerms(e.target.value)} name="terms" id="terms"/>
                                </label>
                                <div className="signup-terms-text">
                                        Aceito os <a id ="terms"href="/termos">Termos de Uso</a> e <a id ="terms" href="/privacidade">Política de Privacidade</a>.
                                </div>
                            </div>
                            <label for="email">
                                <input type="email" name="email" value={ email } onChange={(e)=> setEmail(e.target.value)}id="email" placeholder="Digite seu e-mail" />
                            </label>
                            <label for="name">
                                <input type="text" name="name" value={ name } onChange={(e)=> setName(e.target.value)} id="name" placeholder="Digite seu Nome" />
                            </label>
                            <label for="surname">
                                <input type="text" name="surname" value={ surname } onChange={(e)=> setSurname(e.target.value)} id="surname" placeholder="Digite seu Sobrenome" />
                            </label>
                            <label for="birthday">
                                <input type="text" onfocus="(this.type='date')" value={ birthday } onChange={(e)=> setBirthday(e.target.value)} name="birthday" id="birthday" placeholder="Data de Nascimento" required/>
                            </label>
                            <label for="description">
                                <textarea name="description" value={ description } onChange={(e)=> setDescription(e.target.value)}id="description" cols="1" rows="3" placeholder="Conte um pouco sobre você e sua paixão por vinhos"></textarea>
                            </label>
                            <PasswordInput />
                            <Button />
                            <div class="signup-login">
                                <p>Você já tem um perfil?</p>
                                <a href="/login">Faça login</a>
                            </div>
                        </form>
                    </section>
                </main>
            </body>
        </html>

    )
}

export default SignUp;