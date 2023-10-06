const validatorCampos = ({
  id,
  name,
  lastName,
  description,
  image,
  nationality,
  dob,
  teams,
}) => {
  if (isNaN(Number(id)) && id > 508)
    throw new TypeError("El [id] debe ser un valor númerico mayor a 508");
  if (typeof name !== "string")
    throw new TypeError("El [name] debe ser un valor string");
  if (typeof lastName !== "string")
    throw new TypeError("El [lastName] debe ser un valor string");
  if (typeof description !== "string")
    throw new TypeError("La [descripcion] debe ser un valor string");
  if (typeof image !== "string")
    throw new TypeError("La [image] debe ser un valor string");
  if (typeof nationality !== "string")
    throw new TypeError("La [nacionalidad] debe ser un valor string");
  const fecha = new Date(dob);
  if (isNaN(fecha) || fecha === fecha.toLocaleDateString())
    throw new TypeError(
      "El [birth] debe ser un valor string ejemplo [1900-11-26]"
    );

  if (typeof teams !== "number")
    if (!Array.isArray(teams))
      throw new TypeError(
        "El [team] debe ser un valor númerico o un array númerico ejemplo [1,2,3,4]"
      );
};

module.exports = validatorCampos;
