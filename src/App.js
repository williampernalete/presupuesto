import React, { useState, useEffect } from "react";
import Pregunta from "./components/Pregunta";
import Formulario from "./components/Formulario";
import Listar from "./components/Listar";
import ControlPresupuesto from "./components/ControlPresupuesto";

function App() {
  //definir state
  const [presupuesto, guardarPresupuesto] = useState(0);
  const [restante, guardarRestante] = useState(0);
  const [mostrarpregunta, actualizarPregunta] = useState(true);
  const [gastos, guardarGastos] = useState([]);
  const [gasto, guardarGasto] = useState({});
  const [creargasto, guardarCrearGasto] = useState(false);
  const [addgasto, activarGasto] = useState(true);

  //UseEffect que actualiza el restante
  useEffect(() => {
    if (creargasto) {
      //agrego el presupuesto al state guardarGasto
      guardarGastos([...gastos, gasto]);

      // Resto al presupuesto actual
      const presupuestoRestante = restante - gasto.cantidad;
      console.log(presupuestoRestante);
      guardarRestante(presupuestoRestante);

      // Resetear el State
      guardarCrearGasto(false);
      if (restante <= 0) {
        console.log("restante negativo");
        activarGasto(false);
      }
    }
  }, [gasto, creargasto, gastos, restante, activarGasto]);

  return (
    <div className="container">
      <header>
        <h1>Gasto Semanal</h1>
        <div className="contenido-principal contenido">
          {mostrarpregunta ? (
            <Pregunta
              guardarPresupuesto={guardarPresupuesto}
              guardarRestante={guardarRestante}
              actualizarPregunta={actualizarPregunta}
            />
          ) : (
            <div className="row">
              <div className="one-half column">
                <Formulario
                  guardarGasto={guardarGasto}
                  guardarCrearGasto={guardarCrearGasto}
                  activarGasto={activarGasto}
                />
              </div>
              <div className="one-half column">
                <Listar gastos={gastos} />
                <ControlPresupuesto
                  presupuesto={presupuesto}
                  restante={restante}
                />
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
