const warningList = {
  0: "Este campo no puede estar vacío.",
  1: "Solo se aceptan números mayores a cero.",
  2: "El nivel deseado debe ser mayor al nivel actual.",
  3: "Solo se aceptan números.",
};

export default function Validation(dataForm, setFieldOne, setFieldTwo, setFieldThree) {
  if (parseInt(dataForm.levels) <= parseInt(dataForm.actualLevel)) {
    setFieldOne(warningList[2]);
    setFieldTwo(warningList[2]);
  }

  if (dataForm.actualLevel <= 0) setFieldOne(warningList[1]);
  if (!/^([0-9])*$/.test(dataForm.actualLevel)) setFieldOne(warningList[3]);
  if (dataForm.actualLevel === "") setFieldOne(warningList[0]);

  if (dataForm.time || dataForm.time === "" && !dataForm.experienceGained) {
    if (dataForm.time <= 0) setFieldThree(warningList[1]);
    if (!/^([0-9])*$/.test(dataForm.time)) setFieldThree(warningList[3]);
    if (dataForm.time === "") setFieldThree(warningList[0]);
  }
  if (dataForm.experienceGained || dataForm.experienceGained === "" && !dataForm.time) {
    if (dataForm.experienceGained <= 0 && dataForm.experienceGained) setFieldThree(warningList[1]);
    if (!/^([0-9])*$/.test(dataForm.experienceGained) && dataForm.experienceGained) setFieldThree(warningList[3]);
    if (dataForm.experienceGained === "") setFieldThree(warningList[0]);
  }
  if (dataForm.levels || dataForm.levels === "") {
    if (dataForm.levels <= 0) setFieldTwo(warningList[1]);
    if (!/^([0-9])*$/.test(dataForm.levels)) setFieldTwo(warningList[3]);
    if (dataForm.levels === "") setFieldTwo(warningList[0]);
  } else {
    if (dataForm.experienceGained <= 0) setFieldTwo(warningList[1]);
    if (dataForm.time <= 0) setFieldThree(warningList[1]);
    if (!/^([0-9])*$/.test(dataForm.experienceGained)) setFieldTwo(warningList[3]);
    if (!/^([0-9])*$/.test(dataForm.time)) setFieldThree(warningList[3]);
    if (dataForm.experienceGained === "") setFieldTwo(warningList[0]);
    if (dataForm.time === "") setFieldThree(warningList[0]);
  }
}

