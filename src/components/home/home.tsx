import Productlist from "../productlist/productlist";
import "./home.css";
import Search from "../search/search";


type HomeProps = {
  buscarTermino: string;
  onSearch: (termino: string) => void;
};

const Home = ({ buscarTermino, onSearch }: HomeProps) => {
    return(
        <>
        <Search onSearch={onSearch}></Search>
        <Productlist buscarTermino={buscarTermino}></Productlist>
        </>
    );
};

export default Home;