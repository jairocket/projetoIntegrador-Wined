import './styles.css';
import copyscript from './copyscript.svg';

export default function Footer(){
    return (
        <footer>
            <div id="footer-menu">
                <ul >
                    <li><a className="termos" href="/termos">Termos de Uso</a></li>
                    <li><a className="politica" href="/privacidade">Política de privacidade</a></li>
                </ul>
            </div>
            <div id="copyright">
                <img className="Copyscript" src= {copyscript} alt="feito por wined+"/>    
            </div>
        </footer>
    )
}

/* <li><a className="politica-cont" href="#">Política de conteúdo</a></li> */
/* <li><a className="sobre" href="#">Sobre</a></li>
          <li><a className="contato" href="#">Contato</a></li> */