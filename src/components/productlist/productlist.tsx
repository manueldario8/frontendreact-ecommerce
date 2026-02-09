import { useState, useEffect } from "react";
import "./productlist.css";
import { useNavigate } from "react-router-dom";

type Product = {
    id: number;
    nombre: string;
    categoria: string;
    descripcion: string;
    image: string;
    precio: number;
    tipo: string;
};

type Filtros = {
    categoria: string[];
    tipo: string[];
};



const Productlist = () => {
    const [productos, setProductos] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [orden, setOrden] = useState("Relevante");
    const [filtros, setFiltros] = useState<Filtros>({categoria: [], tipo: []});
    const navigate = useNavigate();

    
    useEffect(()=>{
        const fetchProducts = async()=>{
            try {
                const response = await fetch("https://api-ten-jet.vercel.app/products");
                if (!response.ok){
                    throw new Error("Error al cargar los productos")};
                
                const data = await response.json();
                setProductos(data);
            }
            catch (error) {
                if (error instanceof Error) {
                    setError(error.message);} 
                else {
                    setError("Error desconocido");
                }
            }};
            fetchProducts();
    },[]);
    
    const toggleFiltros = (tipoFiltro: keyof Filtros, valor: string) => {
    setFiltros((prev) => ({
        ...prev,
        [tipoFiltro]: prev[tipoFiltro].includes(valor)
            ? prev[tipoFiltro].filter((item) => item !== valor)
            : [...prev[tipoFiltro], valor],
    }));
};

    const productosFiltrados = productos.filter((producto) => {
        const matchCategoria = filtros.categoria.length === 0 || filtros.categoria.includes(producto.categoria);
        const matchTipo = filtros.tipo.length === 0 || filtros.tipo.includes(producto.tipo);
        return matchCategoria && matchTipo;
    })


    const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrden(e.target.value);
};

    const productosOrdenados = [...productosFiltrados].sort((a, b) => {
        if(orden === "Precio: Mayor a menor"){
            return b.precio - a.precio
        }
        if(orden === "Precio: Menor a mayor"){
            return a.precio - b.precio
        }

        return 0;
    });

    const handelImageClick = (id:number) => {
        navigate(`/producto/${id}`);
    }

    



  return (
    <section className="main-content">
        <aside className="filters">
            <h2>Filtros</h2>
            <div className="filter-category">
                <h3>Categorías</h3> 
                <label>
                    <input type="checkbox" onChange={()=>toggleFiltros("categoria","Hombres")} />
                    <span> Hombres</span>
                </label>
                <label>
                    <input type="checkbox" onChange={()=>toggleFiltros("categoria","Mujeres")} />
                    <span> Mujeres</span>
                </label>
                <label>
                    <input type="checkbox" onChange={()=>toggleFiltros("categoria","Niños")} />
                    <span> Niños</span>
                </label>
            </div>
            <div className="filter-category">
                <h3>Tipos</h3> 
                <label>
                    <input type="checkbox" onChange={()=>toggleFiltros("tipo","Calzado")} />
                    <span> Calzados</span>
                </label>
                <label>
                    <input type="checkbox" onChange={()=>toggleFiltros("tipo","Prendas de abrigo")} />
                    <span> Prendas de abrigo</span>
                </label>
                <label>
                    <input type="checkbox" onChange={()=>toggleFiltros("tipo","Remeras")} />
                    <span> Remeras</span>
                </label>
            </div>
        </aside>
        <main className="collections">
            <div className="options">
                <h2>TODAS LAS COLECCIONES</h2>
                <div className="sort-options">
                    <label>
                        Ordenar por:
                        <select onChange={handleOrderChange} value={orden}>
                            <option>Novedades</option>
                            <option>Precio: Mayor a menor</option>
                            <option>Precio: Menor a mayor</option>
                        </select>
                    </label>
                </div>
            </div>
            <div className="products">
                {error ? (
                    <p className="error-message">{error}</p>
                ): productosFiltrados.length > 0 ? (
                    productosOrdenados.map((producto) => (
                    <div className="product-card" key={producto.id}>
                        <img src={producto.image} alt={producto.image} className="product-image" onClick={() => handelImageClick(producto.id)} />
                        
                        <h3>{producto.nombre}</h3>
                        <p>${producto.precio}</p>
                    </div>
                ))) : (
                    <p className="no-results">No hay productos que coincidan con los filtros seleccionados</p>
                )}
            </div>
        </main>
    </section>
  );
};

export default Productlist;