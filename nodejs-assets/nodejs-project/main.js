const os = require('os');
let rn_bridge=undefined; 
const {calert, localIp, platform, clog, init} = require('./helpers/utiles');

// Check platform is mobile load the libries for mobile
if(os.platform()==='android') rn_bridge = require('rn-bridge');
init(rn_bridge);
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send(`Example app listening ${new Date()}on port ${localIp}:${port} /platform {${platform}}!`))

app.listen(port, () => {
  clog(`Example app listening ${new Date()}on port ${localIp}:${port} /platform {${platform}}!`);
});