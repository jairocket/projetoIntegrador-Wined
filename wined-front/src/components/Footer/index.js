export default function Footer(){
    return (
<footer>
  <div id="footer-menu">
    {/* <a class="logo-footer" href="#init"><img id="logo" src="../../images/logo-wined-header.svg" alt="Wined logo"></a> */}
      <ul>
          {/* <li><a class="sobre" href="#">Sobre</a></li>
          <li><a class="contato" href="#">Contato</a></li> */}
          <li><a class="termos" href="/termos">Termos de Uso</a></li>
          <li><a class="politica" href="/privacidade">Política de privacidade</a></li>
          {/* <li><a class="politica-cont" href="#">Política de conteúdo</a></li> */}
      </ul>
  </div>
  <div id="copyright">
      <img class="Copyscript" src="../../images/copyscript.svg" alt="feito por wined+"/>    
  </div>
</footer>


    )
}