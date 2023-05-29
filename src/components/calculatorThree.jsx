import { useState } from "react";
import Validation from "../form/validation";

export default function CalculatorThree({ Total_Experience, Required_MasterExperience }) {
  const [dataForm, setDataForm] = useState({
    actualLevel: "",
    experienceGained: "",
    time: "",
  });
  const [Result, setResult] = useState("");
  const [actualLevelWarning, setActualLevelWarning] = useState(false);
  const [timeWarning, setTimeWarning] = useState(false);
  const [experienceGainedWaring, setExperienceGainedWaring] = useState(false);

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  const [percentage, setPercentage] = useState("");

  const calculated = (e) => {
    e.preventDefault();


    Validation(dataForm,setActualLevelWarning,setExperienceGainedWaring,setTimeWarning)

    let time = dataForm.time * 86400,
      level,
      exp,
      results,
      expNextLevel,
      resultsPercentage;

    if (dataForm.actualLevel > 0 && dataForm.time > 0 && dataForm.experienceGained > 0) {
      if (dataForm.actualLevel < 400) {
        level = Total_Experience[dataForm.actualLevel - 1];

        exp = time * dataForm.experienceGained + level;
        results = Total_Experience.findIndex((value) => value > exp);

        expNextLevel = Total_Experience[results] - Total_Experience[results - 1];
        resultsPercentage = ((expNextLevel - (Total_Experience[results] - exp)) * 100) / expNextLevel;
        resultsPercentage = resultsPercentage.toFixed(2);

        if (exp > Total_Experience[399]) {
          exp = exp - Total_Experience[399];
          results = Required_MasterExperience.findIndex((value) => value > exp);

          expNextLevel = Required_MasterExperience[results] - Required_MasterExperience[results - 1];
          if (results === 0) {
            expNextLevel = Required_MasterExperience[results];
          }
          resultsPercentage = ((expNextLevel - (Required_MasterExperience[results] - exp)) * 100) / expNextLevel;
          resultsPercentage = resultsPercentage.toFixed(2);
          setResult(results + 400);
          setPercentage(resultsPercentage);
        } else {
          setResult(results);
          setPercentage(resultsPercentage);
        }
      }

      if (dataForm.actualLevel > 400) {
        level = Required_MasterExperience[dataForm.actualLevel - 400];

        exp = time * dataForm.experienceGained + level;
        results = Required_MasterExperience.findIndex((value) => value > exp);

        expNextLevel = Required_MasterExperience[results] - Required_MasterExperience[results - 1];
        resultsPercentage = ((expNextLevel - (Required_MasterExperience[results] - exp)) * 100) / expNextLevel;
        resultsPercentage = resultsPercentage.toFixed(2);

        setResult(results + 399);
        setPercentage(resultsPercentage);
      }
    }
    
    setTimeout(() => {
      setActualLevelWarning(false);
      setExperienceGainedWaring(false);
      setTimeWarning(false);
    }, 1500);
  };
  return (
    <div className="bg-slate-100 rounded m-4 shadow-xl col-span-2">
      <h2 className="font-semibold text-xl text-center mb-4">¿A qué nivel llego?</h2>
      <form onSubmit={(e) => calculated(e)} className="flex flex-col justify-center items-center">
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
          {Result && (
            <h2>
              Alcanzas el nivel <span>{Result}</span> y <span>{percentage}% del proximo nivel.</span>
            </h2>
          )}
        </div>
      </form>
    </div>
  );
}
