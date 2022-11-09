'use strict';
const express = require('express');
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const { application } = require('express');

const groceriesRoutes = require('./routes/groceriesRoutes');
const usersRoutes = require('./routes/usersRoutes');
const additionalInfoRoutes = require('./routes/additionalInfoRoutes');
const activitiesRoutes = require('./routes/activitiesRoutes');
const dietsRoutes = require('./routes/dietsRoutes');
const recipesRoutes = require('./routes/recipesRoutes');
const imagesRoutes = require('./routes/imagesRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use('/api', groceriesRoutes.routes);
app.use('/api', usersRoutes.routes);
app.use('/api', additionalInfoRoutes.routes);
app.use('/api', activitiesRoutes.routes);
app.use('/api', dietsRoutes.routes);
app.use('/api', recipesRoutes.routes);
app.use('/api', imagesRoutes.routes);

app.listen(config.port, () => console.log('Server is listening on http://localhost:' + config.port));