
import './plugins/global';
import App from './application';
import bodyParser from 'koa-bodyparser';
import error from './middleware/error';
import response from './middleware/response';

App.controller = '../controller';
App.service = '../service';
App.dao = '../dao';

App.plugins = [error, bodyParser(), response];



export default App