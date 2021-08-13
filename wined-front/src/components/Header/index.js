import logo from  './logo-wined-header.svg';
import avatar from './profile-picture.svg';
import './styles.css';

export default function Header(){
    return(
        <header id="header-unlogged">
            <a id="init" href="/"><img id="logo" src={logo} alt="Wined logo"/></a>
            <div className="header-dropdown">
                <button type="button" >
                    <div>
                    {/* <img id="profile-pic" src="../../images/uploads/<%= avatar %>" alt="User Picture" className="dropbtn"/> */}
                        <img id="profile-pic" src={avatar} alt="avatar" className="dropbtn"/>
                    </div>
                </button>
                <div id="myDropdown" className="header-dropdown-content">
                    <a href="/dashboard">Home</a>
                    <a href="/editarperfil">Editar Perfil</a>
                    {/* <!-- <a href="#">Ajuda</a> --> */}
                    <a href="/dashboard/sair">Sair</a>
                </div>
            </div>
        </header> 
    )
}
