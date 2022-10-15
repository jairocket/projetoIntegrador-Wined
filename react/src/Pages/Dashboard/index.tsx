import "./styles.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../Components/Header";
import { IdentitySection } from "../../Components/IdentitySection";
import { BrotherhoodsSection } from "../../Components/BrotherhoodsSection";
import { EventsSection } from "../../Components/EventsSection";
import Button from "../../Components/Button";
import { Footer } from "../../Components/Footer";

//import { IoIosArrowDown } from "react-icons/io";
// import {IoIosArrowUp} from 'react-icons/io'

import Cookies from "js-cookie";

export function Dashboard() {
  const [parameter, setParameter] = useState("");
  const [user, setUser] = useState({
    name: "",
    surname: "",
    description: "",
    avatar_picture: "",
    background_picture: "",
  });
  const [brotherhoods, setBrotherhoods] = useState([]);
  const [events, setEvents] = useState([]);
  const token = Cookies.get("token");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3333/dashboard", {
      headers: { authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((response) => {
        setUser(response.user);
        setBrotherhoods(response.brotherhoods);
        setEvents(response.events);
      })
      .catch((error) => navigate("/login"));
  }, [token, navigate]);

  if (!user || !brotherhoods || !events) return null;

  return (
    <main>
      <Header />
      <IdentitySection user={user} />
      <div className="dash-menu">
        <div>
          <form action="http://localhost:3333/dashboard/wines" method="GET">
            <label></label>
            <input
              type="text"
              name="parameter"
              value={parameter}
              onChange={(e) => setParameter(e.target.value)}
              id="txtBusca"
              placeholder="Buscar vinhos..."
            />
            <Button name="Buscar" type="submit" className="btn-search" />
          </form>
        </div>
      </div>
      <BrotherhoodsSection brotherhoods={brotherhoods} />
      <EventsSection events={events} />
      <Footer />
    </main>
  );
}
