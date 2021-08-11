import './styles.css'

import Button from '../../components/red-button'


export default function signup(){
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
                                    <input type="checkbox" name="terms" id="terms"/>
                                </label>
                                <div className="signup-terms-text">
                                        Aceito os <a id ="terms"href="/termos">Termos de Uso</a> e <a id ="terms" href="/privacidade">Política de Privacidade</a>.
                                </div>
                            </div>
                            <label for="email">
                                <input type="email" name="email" id="email" placeholder="Digite seu e-mail" />
                            </label>
                            <label for="name">
                                <input type="text" name="name" id="name" placeholder="Digite seu Nome" />
                            </label>
                            <label for="surname">
                                <input type="text" name="surname" id="surname" placeholder="Digite seu Sobrenome" />
                            </label>
                            <label for="birthday">
                                <input type="text" onfocus="(this.type='date')" name="birthday" id="birthday" placeholder="Data de Nascimento" required/>
                            </label>
                            <label for="description">
                                <textarea name="description" id="description" cols="1" rows="3" placeholder="Conte um pouco sobre você e sua paixão por vinhos"></textarea>
                            </label>
                            <label for="password">        
                                <input className="password-form" type="password" name="password" id="password" placeholder="Defina uma senha"/><i className="bi bi-eye-slash" id="togglePassword"></i>
                            </label>
                                <Button />
                        </form>
                    </section>
                </main>
            </body>
        </html>

    )
}