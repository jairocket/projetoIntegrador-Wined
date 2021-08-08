
import logo from  './logo-wined-header.svg';
import './styles.css'

export default function Header(){
    return(
        <header id="header-unlogged">
            <a id="init" href="/"><img id="logo" src={logo} alt="Wined logo"/></a>
            <a href="/login" id="login">Entrar</a>
        </header> 
    )
}

