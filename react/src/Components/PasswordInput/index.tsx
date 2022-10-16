import { useState } from "react";
import "./styles.css";

export function PasswordInput() {
  const [password, setPassword] = useState("");
  const [typePass, setTypePass] = useState("password");
  function togglePassword() {
    if (typePass === "password") {
      setTypePass("text");
    } else {
      setTypePass("password");
    }
  }
  return (
    <div className="password-input">
      <label>
        <input
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          placeholder="Senha"
          type={typePass}
        />
        <i
          className="bi bi-eye-slash"
          id="togglePassword"
          onClick={togglePassword}
        ></i>
      </label>
    </div>
  );
}
