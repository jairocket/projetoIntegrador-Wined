import "./styles.css";

import { Header } from "../../Components/Header";
import { Footer } from "../../Components/Footer";
import { Button } from "../../Components/Button";

import Picture from "./assets/images/add-picture.svg";
import Dot from "./assets/images/dot.svg";
import Cover from "./assets/images/brotherhood-picture.svg";
import Video from "./assets/images/add-video.svg";
import Event from "./assets/images/event.svg";
import Send from "./assets/images/post.svg";
import Cookies from "js-cookie";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//get brotherhood chancellor

interface MemberInterface {
  name: string;
  surname: string;
  id: number;
}

interface BrotherhoodInterface {
  brotherhood_picture: string;
  createAt: string;
  chancellor: boolean;
  description: string;
  id: number;
  members: Array<MemberInterface>;
  name: string;
  since: string;
}

interface Count {
  count: number;
}

export function Brotherhood() {
  const [brotherhood, setBrotherhood] = useState<BrotherhoodInterface>({
    brotherhood_picture: "",
    createAt: "",
    chancellor: false,
    description: "",
    id: 0,
    members: [],
    name: "",
    since: "",
  });
  const [count, setCount] = useState<Count>({
    count: 0,
  });
  const [chancellor, setChancellor] = useState(false);
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState({});

  const token = Cookies.get("token");
  const [, , id] = window.location.pathname.split("/");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3333/confraria/${id}`, {
      headers: { authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((response) => {
        setUser(response.user);
        setBrotherhood(response.brotherhood);
        setEvents(response.events);
        setCount(response.count);
        setPosts(response.posts);
        setChancellor(response.brotherhood.chancellor[0].chancellor);
      })
      .catch((error) => {
        console.log(error);
        navigate("/dashboard");
      });
  }, [token, navigate]);

  //Alterar backend para midware jwt :check:
  //verificar o retorno para quem não faz parte da confraria
  //capturar o id da url :check:
  console.log(brotherhood);
  return (
    <>
      <Header />
      <section className="brotherhood-information">
        <div className="brotherhood-cover">
          <img
            src={Cover}
            id="brotherhood-cover"
            alt="Foto de background da confraria"
          />
        </div>
        <div className="brotherhood-settings">
          <div className="brotherhood-title">
            <h2> {brotherhood.name}</h2>
            <div>
              <p>Since {brotherhood.since}</p>
              <img src={Dot} alt="ponto de separação" />
              <p>{count.count}</p>
            </div>
          </div>
          <div className="brotherhood-description">
            <p>{brotherhood.description}</p>
          </div>
          <div className="brotherhood-menu">
            {chancellor && (
              <Button name="Editar" type="button" className="btn" />
            )}
            <form
              action="/confraria/editar/delete/<%= brotherhood.id %>/<%= user.id %>?_method=DELETE"
              method="POST"
            >
              <Button name="Deixar Confraria" type="submit" className="btn" />
            </form>
          </div>
        </div>
      </section>
      <section className="members">
        <h3>Confrades</h3>
      </section>
      <section className="events">
        <h3>Eventos</h3>
      </section>
      <section className="brotherhood-post">
        <div className="brotherhood-post-creator">
          <div className="brotherhood-post-write">
            <div
              className="brotherhood-post-prompt"
              aria-labelledby="brotherhood-post-write"
              aria-multiline="true"
              role="textbox"
              contentEditable="true"
              aria-placeholder="Compartilhe sua experiência"
            ></div>
          </div>
          <div className="brotherhood-media-post">
            <div>
              <button type="button" id="p-btn">
                <img src={Picture} alt="add-pic" />
                Foto
              </button>
            </div>
            <section className="upload-media-separator"></section>
            <div>
              <a href="/confraria/eventos/<%= brotherhood.id %>" id="event-btn">
                <img src={Event} alt="add-event" />
                Evento
              </a>
            </div>
            <section className="upload-media-separator"></section>
            <div>
              <button type="button" id="btn">
                <img src={Video} alt="send-message" />
                Vídeo
              </button>
            </div>
            <div>
              <button type="button" id="btn">
                <img src={Send} alt="send-message" />
                Enviar
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
