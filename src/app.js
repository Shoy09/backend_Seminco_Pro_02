const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');
const basicAuth = require('express-basic-auth');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json'); 
const verificarToken = require('./middleware/auth');

app.use(cors());
app.use(bodyParser.json());

app.use('/api', routes);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));


const port = 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://10.0.2.2:${port}`);
});
