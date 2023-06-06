import { useState } from "react";
import Validation from "../form/validation";

export default function CalculatorTwo({ Total_Experience, Required_MasterExperience }) {
  const [dataForm, setDataForm] = useState({
    experienceGained: "",
    levels: "",
    actualLevel: "",
  });
  const [Result, setResult] = useState("");
  const [actualLevelWarning, setActualLevelWarning] = useState(false);
  const [levelsWarning, setLevelsWarning] = useState(false);
  const [experienceGainedWaring, setExperienceGainedWaring] = useState(false);

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  const experienceGained = (e) => {
    e.preventDefault();

    Validation(dataForm, setActualLevelWarning, setLevelsWarning, setExperienceGainedWaring);

    let years, months, days, hour, minute, second, seconds;

    if (dataForm.levels <= 400 && dataForm.actualLevel <= 400) {
      seconds = Math.round(
        (Total_Experience[dataForm.levels - 1] - Total_Experience[dataForm.actualLevel - 1]) / dataForm.experienceGained
      );
    }
    if (dataForm.levels > 400) {
      seconds = Math.round(
        (Total_Experience[399] +
          Required_MasterExperience[dataForm.levels - 400] -
          Total_Experience[dataForm.actualLevel - 1]) /
          dataForm.experienceGained
      );
    }
    if (dataForm.levels > 400 && dataForm.actualLevel > 400) {
      seconds = Math.round(
        (Required_MasterExperience[dataForm.levels - 401] - Required_MasterExperience[dataForm.actualLevel - 401]) /
          dataForm.experienceGained
      );
    }

    years = Math.floor(seconds / 31536000);
    months = Math.floor((seconds % 31536000) / 2592000);
    days = Math.floor(((seconds % 31536000) % 2592000) / 86400);
    hour = Math.floor((seconds % 86400) / 3600);
    minute = Math.floor(((seconds % 86400) % 3600) / 60);
    second = ((seconds % 86400) % 3600) % 60;

    hour = hour.toString().padStart(2, "0");
    minute = minute.toString().padStart(2, "0");
    second = second.toString().padStart(2, "0");

    if (years === 0) {
      setResult([months + " Mes(es) " + days + " Dia(s) y " + hour + ":" + minute + ":" + second, dataForm.levels]);
      if (months === 0) {
        setResult([days + " Dia(s) y " + hour + ":" + minute + ":" + second, dataForm.levels]);
        if (days === 0) setResult([hour + ":" + minute + ":" + second, dataForm.levels]);
      }
    }
    if (years > 0) {
      setResult([
        years + " Año(s) " + months + " Mes(es) " + days + " Dia(s) y " + hour + ":" + minute + ":" + second,
        dataForm.levels,
      ]);
      if (months === 0) {
        setResult([years + " Año(s) " + days + " Dia(s) y " + hour + ":" + minute + ":" + second, dataForm.levels]);
        if (days === 0) setResult([hour + ":" + minute + ":" + second, dataForm.levels]);
      }
    }

    setTimeout(() => {
      setActualLevelWarning(false);
      setLevelsWarning(false);
      setExperienceGainedWaring(false);
    }, 1500);
  };

  return (
    <div className="bg-slate-100 rounded m-4 shadow-xl">
      <h2 className="font-semibold text-xl text-center mb-4">¿Cuanto tiempo me tardo?</h2>
      <form action="" onSubmit={(e) => experienceGained(e)} className="form-style">
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
          <label htmlFor="">Experiencia ganada:</label>
          <div>
            <input
              type="text"
              className={`border-2 rounded ${experienceGainedWaring && "border-red-500"}`}
              value={dataForm.experienceGained}
              name="experienceGained"
              onChange={(e) => handleChange(e)}
            ></input>
            {experienceGainedWaring && <h4 className="text-sm text-red-500 absolute">{experienceGainedWaring}</h4>}
          </div>
        </div>
        <button className="btn-primary">Calcular</button>
        <div>
          <span>
            {Result && (
              <>
                Necesitas {Result[0]} para llegar al nivel {Result[1]}.
              </>
            )}
          </span>
        </div>
      </form>
    </div>
  );
}
