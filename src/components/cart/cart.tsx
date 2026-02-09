import "./cart.css";
import { useCart } from "../cartcontext/cartcontext";
import type { Producto } from "../cartcontext/cartcontext";

const Cart = () => {
  const { carrito, actualizarCantidad, eliminarProducto } = useCart();
  const costoDeEnvío = 10;
  const subTotal = carrito.reduce(
  (acc, producto) => acc + producto.precio * producto.cantidad,
  0
);
  const total = costoDeEnvío + subTotal;

  const handleAumentarCantidad = (productoId: number) => {
    actualizarCantidad(productoId, 1);
  };

  const handleDisminuirCantidad = (productoId: number) => {
    const producto = carrito.find((item) => item.id === productoId);

    if (producto && producto.cantidad > 1) {
      actualizarCantidad(productoId, -1);
    }
  };

  return (
    <div className="cart-container">
      <h2>
        TU <span>CARRITO</span>
      </h2>

      {carrito.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          <div className="cart-header">
            <p>Producto</p>
            <p>Precio</p>
            <p>Cantidad</p>
            <p>Total</p>
            <p>Acción</p>
          </div>

          <ul className="cart-items">
            {
            carrito.map((producto: Producto) => (
              
              <li className="cart-item" key={producto.id}>
                <div className="product-info">
                  <img
                    src={producto.imagen ?? "https://via.placeholder.com/150"}
                    alt={producto.nombre}
                    className="product-images"
                  />
                  <span>{producto.nombre}</span>
                </div>

                <p>${producto.precio.toFixed(2)}</p>

                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => handleDisminuirCantidad(producto.id)}
                  >
                    -
                  </button>

                  <input
                    type="number"
                    className="quantity-input"
                    readOnly
                    value={producto.cantidad}
                  />

                  <button
                    className="quantity-btn"
                    onClick={() => handleAumentarCantidad(producto.id)}
                  >
                    +
                  </button>
                </div>

                <p>
                  ${(producto.precio * producto.cantidad).toFixed(2)}
                </p>

                <button className="delete-btn" onClick={() => eliminarProducto(producto.id)}>
                  <i className="fas fa-trash"></i>
                </button>
              </li>
            ))}
          </ul>
        </>)}


      <div className="cart-summary">
        <h2>TU <span>CARRITO</span></h2>
        <p>Subtotal: <span></span></p>
        <p>Envío: <span></span></p>
        <p className="total">Total: <span></span></p>
        <button className="checkout-btn">IR A PAGAR</button>
      </div>

    </div>
  );
};

export default Cart;
