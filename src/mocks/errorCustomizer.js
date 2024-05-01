const errorDictionary = {
  INTERNAL_SERVER_ERROR:
    "Error interno del servidor. Por favor, inténtalo de nuevo más tarde.",
  MISSING_TITLE: "El título es obligatorio.",
  MISSING_DESCRIPTION: "La descripción es obligatoria.",
  MISSING_CATEGORY: "La categoría es obligatoria.",
  MISSING_THUMBNAILS: "Se requieren miniaturas.",
  MISSING_CODE: "El código del producto es obligatorio.",
  INVALID_PRICE: "El precio debe ser un número válido.",
  INVALID_STOCK: "El stock debe ser un número válido.",
  STOCK_OUT_OF_RANGE: "El stock debe estar entre 0 y 100.",
  THUMBNAILS_NOT_ARRAY: "Las miniaturas deben proporcionarse como un array.",
  INVALID_THUMBNAILS: "Se proporcionaron URL de miniaturas no válidas.",
  CODE_TOO_SHORT: "El código del producto debe tener al menos 3 caracteres.",
  CODE_TOO_LONG: "El código del producto no debe exceder los 10 caracteres.",
  INVALID_CATEGORY: "Se proporcionó una categoría no válida.",
  INVALID_STATUS: "El estado debe ser verdadero o falso.",
  INVALID_DESCRIPTION_LENGTH:
    "La descripción debe tener entre 10 y 500 caracteres.",
  INVALID_TITLE_LENGTH: "El título debe tener entre 3 y 50 caracteres.",
  MISSING_PRICE: "El precio es obligatorio.",
  DUPLICATE_CODE: "Ya existe un producto con el mismo código.",
};

const customizeError = (errorCode) => {
  return errorDictionary[errorCode] || "Unknown error occurred.";
};

module.exports = {
  customizeError,
};
