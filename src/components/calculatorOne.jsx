import { useState } from "react";
import Validation from "../form/validation";

export default function CalculatorOne({ Total_Experience, Required_MasterExperience }) {
  
  const [dataForm, setDataForm] = useState({
    time: "",
    levels: "",
    actualLevel: "",
  });
  const [Result, setResult] = useState("");
  const [actualLevelWarning, setActualLevelWarning] = useState(false);
  const [levelsWarning, setLevelsWarning] = useState(false);
  const [timeWarning, setTimeWarning] = useState(false);

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  const timeRequired = (e) => {
    e.preventDefault();

    Validation(dataForm,setActualLevelWarning,setLevelsWarning,setTimeWarning)
    
    if (dataForm.time > 0 && dataForm.actualLevel > 0 && parseInt(dataForm.actualLevel) < parseInt(dataForm.levels)) {
      if (dataForm.actualLevel <= 400 && dataForm.levels <= 400) {
        setResult([
          Math.round(
            (Total_Experience[dataForm.levels - 1] - Total_Experience[dataForm.actualLevel - 1]) /
              (dataForm.time * 86400)
          ),
          dataForm.levels,
        ]);
      }
      
      if (dataForm.levels > 400) {
        setResult([
          Math.round(
            (Total_Experience[399] +
              Required_MasterExperience[dataForm.levels - 400] -
              Total_Experience[dataForm.actualLevel - 1]) /
              (dataForm.time * 86400)
          ),
          dataForm.levels,
        ]);
      }
      if (dataForm.levels > 400 && dataForm.actualLevel > 400) {
        setResult([
          Math.round(
            (Required_MasterExperience[dataForm.levels - 401] - Required_MasterExperience[dataForm.actualLevel - 401]) /
              (dataForm.time * 86400)
          ),
          dataForm.levels,
        ]);
      }
    }

    setTimeout(() => {
      setActualLevelWarning(false);
      setLevelsWarning(false);
      setTimeWarning(false);
    }, 1500);
  };

  return (
    <div className="bg-slate-100 rounded m-4 shadow-xl">
      <h2 className="font-semibold text-xl text-center mb-4">¿Cuánta experiencia necesito?</h2>
      <form onSubmit={(e) => timeRequired(e)} className="form-style">
        <div className="grid grid-cols-2 gap-y-8">
          <label htmlFor="">Nivel actual:</label>
          <div>
            <input
              type="text"
              className={`border-2 rounded ${actualLevelWarning && "border-red-500"}`}
              value={dataForm.actualLevel}
              name="actualLevel"
              onChange={(e) => handleChange(e)}
            ></input>
            {actualLevelWarning && <h4 className="text-sm text-red-500 absolute">{actualLevelWarning}</h4>}
          </div>
          <label htmlFor="">Nivel deseado:</label>
          <div>
            <input
              type="text"
              className={`border-2 rounded ${levelsWarning && "border-red-500"}`}
              value={dataForm.levels}
              name="levels"
              onChange={(e) => handleChange(e)}
            ></input>
            {levelsWarning && <h4 className="text-sm text-red-500 absolute">{levelsWarning}</h4>}
          </div>
          <label htmlFor="">Tiempo requerido (Días):</label>
          <div>
            <input
              type="text"
              className={`border-2 rounded ${timeWarning && "border-red-500"}`}
              value={dataForm.time}
              name="time"
              onChange={(e) => handleChange(e)}
            ></input>
            {timeWarning && <h4 className="text-sm text-red-500 absolute">{timeWarning}</h4>}
          </div>
        </div>

        <button className="btn-primary">Calcular</button>
        <div>
          <span>
            {Result && (
              <>
                Necesitas {Result[0]} puntos de experiencia para llegar al nivel {Result[1]}.
              </>
            )}
          </span>
        </div>
      </form>
    </div>
  );
}
