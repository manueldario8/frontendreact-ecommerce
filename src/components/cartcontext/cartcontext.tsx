import { createContext, useState, useContext, type ReactNode } from "react";

export type Producto = {
  id: number;
  imagen: string;
  nombre: string;
  precio: number;
  cantidad: number;
};

type CartContextType = {
  carrito: Producto[];
  agregarAlCarrito: (producto: Producto) => void;
  actualizarCantidad: (productoId: number, cantidad: number) => void;
  eliminarProducto: (productoId: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [carrito, setCarrito] = useState<Producto[]>([]);

  const agregarAlCarrito = (producto: Producto) => {
    setCarrito((carritoAnterior) => {
      const index = carritoAnterior.findIndex(
        (articulo) => articulo.id === producto.id
      );

      if (index >= 0) {
        const carritoActualizado = [...carritoAnterior];
        carritoActualizado[index] = {
          ...carritoActualizado[index],
          cantidad: carritoActualizado[index].cantidad + 1,
        };
        return carritoActualizado;
      }

      return [...carritoAnterior, { ...producto, cantidad: 1 }];
    });
  };

  const actualizarCantidad = (productoId: number, cantidad: number) => {
    setCarrito((carritoAnterior) =>
      carritoAnterior.map((producto) =>
        producto.id === productoId
          ? { ...producto, cantidad: producto.cantidad + cantidad }
          : producto
      )
    );
  };

  const eliminarProducto = (productoId : number) => {
    setCarrito((carritoAnterior) => 
    carritoAnterior.filter((producto)=> producto.id !== productoId))
  }

  return (
    <CartContext.Provider
      value={{ carrito, agregarAlCarrito, actualizarCantidad, eliminarProducto }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return context;
};
