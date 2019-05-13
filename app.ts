import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as cors from 'cors';
import {accountRouter} from './server/routes/account/account.route';
import {categoriesRouter} from './server/routes/categories/categories.route';
import {departmentsRouter} from './server/routes/departments/departments.route';
import {dishesRouter} from './server/routes/dishes/dishes.route';
import {employeesRouter} from './server/routes/employees/employees.route';
import {ordersRouter} from './server/routes/orders/orders.route';
import {clientsRouter} from './server/routes/clients/clients.route';
import {providersRouter} from './server/routes/providers/providers.route';
import {Database} from './server/modules/DBO';
import cookieParser = require('cookie-parser');
import {imagesRouter} from "./server/routes/images/images.route";
import {ingredientsRouter} from './server/routes/ingredients/ingredients.route';
import {historyRouter} from './server/routes/history/history.route';

const connectionOpt = {
    host: 'localhost',
    connectionLimit: 10,
    user: 'root',
    password: 'Desoutside1',
    database: 'db'
};
const options = {
    origin: 'http://localhost:4200',
    credentials: true
};
export const db = new Database(connectionOpt);

const app = express();
const port = 8000;

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors(options));
app.use(cookieParser());

app.listen(port, () => {
    console.log(`Server was started on ${port} port`);
});

app.use('/api/account', accountRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/departments', departmentsRouter);
app.use('/api/dishes', dishesRouter);
app.use('/api/employees', employeesRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/clients', clientsRouter);
app.use('/api/providers', providersRouter);
app.use('/api/history', historyRouter);
app.use('/api/images', imagesRouter);
app.use('/api/ingredients', ingredientsRouter);

