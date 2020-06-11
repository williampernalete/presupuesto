import React, { useState } from "react";
import PropTypes from "prop-types";

import Error from "./Error";
import { v4 as uuid } from "uuid";

const Formulario = ({ guardarGasto, guardarCrearGasto, activarGasto }) => {
  const [nombre, guardarNombre] = useState("");
  const [cantidad, guardarCantidad] = useState(0);
  const [error, guardarError] = useState(false);

  //Cuando el usuario agrega un gasto
  const agregarGasto = (e) => {
    e.preventDefault();

    //Validar
    if (cantidad < 0 || isNaN(cantidad) || nombre.trim() === "") {
      guardarError(true);
      return;
    }

    //construir Gasto
    const gasto = {
      nombre,
      cantidad,
      id: uuid(),
    };

    // pasar el gasto al componente principal
    guardarGasto(gasto);
    guardarCrearGasto(true);

    //Resetear el form
    guardarNombre("");
    guardarCantidad(0);
  };

  return (
    <form onSubmit={agregarGasto}>
      <h2>Agregar Gasto</h2>
      {error ? <Error mensaje="Ambos Campos Obligatorios" /> : null}
      <div className="campo">
        <label>Nombre Gasto</label>
        <input
          type="text"
          placeholder="Ej. Transporte"
          className="u-full-width"
          value={nombre}
          onChange={(e) => guardarNombre(e.target.value)}
        />
      </div>
      <div className="campo">
        <label>Total Gasto</label>
        <input
          type="number"
          placeholder="Ej. 300"
          className="u-full-width"
          value={cantidad}
          onChange={(e) => guardarCantidad(parseInt(e.target.value))}
        />
      </div>
      <input
        type="submit"
        value="Agregar Gasto"
        className="button-primary u-full-width"
      />
    </form>
  );
};

Formulario.propTypes = {
  guardarGasto: PropTypes.func.isRequired,
  guardarCrearGasto: PropTypes.func.isRequired,
};

export default Formulario;
