let rn_bridge=undefined; 
const {calert, localIp, platform, clog, init, isMobile} = require('./helpers/utiles');

// Check platform is mobile load the libries for mobile
if(isMobile){
  rn_bridge = require('rn-bridge');
  init(rn_bridge);
  registerListners();
  eventRegister();
}

// Register mobile listners
function registerListners() {
  rn_bridge.app.on('pause', (pauseLock) => {
    pauseLock.release();
  });
  rn_bridge.app.on('resume', () => {
    console.log('[node] app resumed.');
  });
}

// Rister Mobile events
function eventRegister() {
  // Event Register
  rn_bridge.channel.on('myEvent', (msg) => {
    console.log('myEvent msg ->', msg);
  });
}

const express = require('express');
const app = express();
const port1 = 3000;

app.get('/', (req, res) => res.send(`Server ${new Date()} Running  ${localIp}:${port} /platform {${platform}}!`))

app.listen(port1, () => {
  console.log(`Server on ${localIp}:${port1} platform {${platform}}`);
  clog(`Server on ${localIp}:${port1} platform {${platform}}`);
});
