import "./styles.css";
// import {IoIosArrowDown} from 'react-icons/io'

interface EventType {
  name: string;
  street: string;
  number: string;
  complement: string;
  cep: string;
  city: string;
  state: string;
  date: string;
  time: string;
}

interface EventsSectionProps {
  events: Array<EventType>;
}

export function EventsSection(props: EventsSectionProps) {
  return (
    <section className="dash-events">
      <div className="dash-events-title">
        <h4>Próximos Encontros</h4>
      </div>

      <div className="events-list">
        {props.events.map((item, i) => (
          <div key={i}>
            <div>
              <h5>{item.name}</h5>
            </div>
            <div>
              <h6>Onde?</h6>
              <p>
                {item.street}, {item.number}
              </p>
              <p>
                {item.complement}. CEP: {item.cep}
              </p>
              <p>
                {item.city}/ {item.state}
              </p>
            </div>
            <div>
              <h6>Nos vemos</h6>
            </div>
            <div>
              <p>
                {item.date}, às {item.time}
              </p>
            </div>
            {/* incluir funcionalidade que notifica o usuário da criação do evento e solicita confirmação de presença */}
          </div>
        ))}
      </div>
    </section>
  );
}
