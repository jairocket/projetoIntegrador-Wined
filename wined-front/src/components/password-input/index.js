
import { useState } from 'react';
import './styles.css';



function togglePassword(){  
    const password = document.getElementById('password')
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
}

export default function PasswordInput(){
    const [password, setPassword] = useState('')
    return(
        <div className="password-input">
            <label>
                <input type="password" name="password" value={ password } onChange={(e)=> setPassword(e.target.value)}id="password" placeholder="Senha"/><i className="bi bi-eye-slash" id="togglePassword" onClick={togglePassword}></i>
            </label>    
        </div>
    )
}