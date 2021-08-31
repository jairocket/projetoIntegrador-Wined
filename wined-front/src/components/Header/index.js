import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from  './logo-wined-header.svg';
import avatar from './profile-picture.svg';
import Cookies from 'js-cookie';
import './styles.css';

export default function Header(){
    const history = useHistory()
    const[show, setShow] = useState(false);
    function showDropdown(){
        !show ? setShow(true): setShow(false)
    }
    function logout(e){
        e.preventDefault()
        Cookies.remove('token') 
        history.push('/login')
    }

    return(
        <header id="header-unlogged">
            <a id="init" href="/"><img id="logo" src={logo} alt="Wined logo"/></a>
            <div className="header-dropdown">
                <button type="button" >
                    <div>
                    {/* <img id="profile-pic" src="../../images/uploads/<%= avatar %>" alt="User Picture" className="dropbtn"/> */}
                        <img id="profile-pic" src={avatar} alt="avatar" className="dropbtn" onClick = {showDropdown}/>
                    </div>
                </button>
                {show && (
                    <>
                    <div id="myDropdown" className="header-dropdown-content">
                        <a href="/dashboard">Home</a>
                        <a href="/editarperfil">Editar Perfil</a>
                        <a href="/confraria/criar">Criar Confraria</a>
                        {/* <!-- <a href="#">Ajuda</a> --> */}
                        <a href="/dashboard/sair" onClick={logout}>Sair</a>
                    </div>
                    </>
                )}
            </div>
        </header> 
    )
}
