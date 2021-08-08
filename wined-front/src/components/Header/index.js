import logo from  './logo-wined-header.svg';
import avatar from './profile-picture.svg';
import './styles.css';

export default function Header(){
    return(
        <header id="header-unlogged">
            <a id="init" href="/"><img id="logo" src={logo} alt="Wined logo"/></a>
            <div className="header-dropdown">
                <button onclick="myFunction()" >
                    <div>
                    {/* <img id="profile-pic" src="../../images/uploads/<%= avatar %>" alt="User Picture" className="dropbtn"/> */}
                        <img id="profile-pic" src={avatar} alt="avatar" className="dropbtn"/>
                    </div>
                </button>
                <div id="myDropdown" className="dropdown-content">
                    <a href="http://localhost:3000/dashboard">Home</a>
                    <a href="http://localhost:3000/editarperfil/<%=user.id%>">Editar Perfil</a>
                    {/* <!-- <a href="#">Ajuda</a> --> */}
                    <a href="http://localhost:3000/dashboard/sair">Sair</a>
                </div>
            </div>
        </header> 
    )
}
