import 'zone.js/dist/zone-node';

import * as express from 'express';
import { join } from 'path';
import { REQUEST } from '@nguniversal/express-engine/tokens';
require('dotenv').config();

// Express server
const app = express();

const domino = require('domino');
const fs = require('fs');
const path = require('path');


const PORT = process.env.PORT || 1500;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');

const template = fs.readFileSync(path.join(DIST_FOLDER, 'index.html')).toString();
const win = domino.createWindow(template);
global['window'] = win;
global['KeyboardEvent'] = win.KeyboardEvent;
global['HTMLInputElement'] = win.HTMLInputElement;
global['MouseEvent'] = win.MouseEvent;
global['Event'] = win.Event;
global['navigator'] = win.navigator;
global['document'] = win.document;

const jQuery = require('jquery');
global['jQuery'] = jQuery;

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP, ngExpressEngine, provideModuleMap } = require('./dist/server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });
// Serve static files from /browser
app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));


// All regular routes use the Universal engine
// app.get('*', (req, res) => {
//   res.render('index', { req });
// });
app.get('*', (req: express.Request, res: express.Response) => {
  res.render('index', {
    req,
    providers: [
      { provide: REQUEST, useValue: req },
    ]
  });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});

