// Middleware para seleccionar el diseño adecuado
const selectLayout = (req, res, next) => {
  // Verifica la ruta para determinar qué diseño usar
  if (req.path === "/login" || req.path === "/register") {
    // Para las rutas de autenticación, utiliza auth.handlebars
    res.locals.layout = "auth";
  } else {
    // Para otras rutas, utiliza main.handlebars
    res.locals.layout = "main";
  }
  next();
};

module.exports = selectLayout;
