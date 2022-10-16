import "./styles.css";

import Button from "../../Components/Button";
import { PasswordInput } from "../../Components/PasswordInput";
import { useState } from "react";

export function SignUp() {
  const [terms, setTerms] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [description, setDescription] = useState("");

  return (
    <main className="signup-main">
      <section>
        <div id="call">
          Junte-se à <h1 id="logo">Wined+</h1>
        </div>
        <div id="call-text">
          <h2>Compartilhe momentos inesquecíveis com seus amigos!</h2>
        </div>
        <br></br>
        <form
          action="http://localhost:3333/cadastrar"
          method="POST"
          className="formulario"
        >
          <div className="signup-terms">
            <label>
              <input
                type="checkbox"
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
                name="terms"
                id="terms"
              />
            </label>
            <div className="signup-terms-text">
              Aceito os{" "}
              <a id="terms" href="/termos">
                Termos de Uso
              </a>{" "}
              e{" "}
              <a id="terms" href="/privacidade">
                Política de Privacidade
              </a>
              .
            </div>
          </div>
          <label htmlFor="email">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Digite seu e-mail"
            />
          </label>
          <label htmlFor="name">
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              placeholder="Digite seu Nome"
            />
          </label>
          <label htmlFor="surname">
            <input
              type="text"
              name="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              id="surname"
              placeholder="Digite seu Sobrenome"
            />
          </label>
          <label htmlFor="birthday">
            <input
              type={"text"}
              onFocus={(e) => (e.target.type = "date")}
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              name="birthday"
              id="birthday"
              placeholder="Data de Nascimento"
              required
            />
          </label>
          <label htmlFor="description">
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              cols={1}
              rows={3}
              placeholder="Conte um pouco sobre você e sua paixão por vinhos"
            ></textarea>
          </label>
          <PasswordInput />
          <div id="signup-submit">
            <Button name="Entrar" type="submit" className="btn-form" />
          </div>

          <div className="signup-login">
            <p>Você já tem um perfil?</p>
            <a href="/login">Faça login</a>
          </div>
        </form>
      </section>
    </main>
  );
}
