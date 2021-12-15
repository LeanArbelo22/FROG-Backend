1. Index
app.use(routes/auth)
2. Routes/Auth
const { callbacks importados } = require(controllers/auth)
3. Controllers/Auth
const funcionCrearUsuario = (req,res) => {recibe la peticion y maneja la respuesta: res.status(200).json, contiene lo referente a base de datos. Puede contener las validaciones pero para no hacerlo extenso las pasamos a middlewares/validate}
4. Middlewares/Validate
const validacion = (req,res,next) contiene las validaciones, estas funciones deben ser llamadas en Routes/Auth. Ej: Router.post('/new-user', [check... validacion], funcionCrearUsuario)