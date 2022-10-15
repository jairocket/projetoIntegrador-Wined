import "./styles.css";
import { Link } from "react-router-dom";

// import {IoIosArrowUp} from 'react-icons/io'

interface BrotherhoodType {
  id: string;
  name: string;
}

interface BrotherhoodsSectionProps {
  brotherhoods: Array<BrotherhoodType>;
}

export function BrotherhoodsSection(props: BrotherhoodsSectionProps) {
  return (
    <section className="dash-brotherhoods">
      <div className="dash-brotherhoods-title">
        <h4>Minhas Confrarias</h4> {/*<IoIosArrowDown />*/}
      </div>
      <div className="brotherhood-list">
        {props.brotherhoods.map((item, i) => (
          <Link key={i} to={{ pathname: `/brotherhood/${item.id}` }}>
            {item.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
