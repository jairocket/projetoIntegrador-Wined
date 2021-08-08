export default function Header(){
    return(
        <header id="header-unlogged">
        {/* <a id="init" href="/"><img id="logo" src="images/logo-wined-header.svg" alt="Wined logo"></a> */}
            <nav id="navbar">
                <div id="hamburger-container">
                    <button type="button" id="hamburger-menu">
                        <img src="images/hamburger.svg" alt="Hamburger menu"/>
                    </button>
                </div>
                <ul id="menu">
                <li><a href="/login" id="login">Entrar</a></li>
            </ul>
        </nav>
    </header>
    )
}