const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json'); 

app.use(cors());
app.use(bodyParser.json());

app.use('/api', routes);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
