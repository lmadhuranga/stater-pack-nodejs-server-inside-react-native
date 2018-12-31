const os = require('os');
const platform  = os.platform();
const isMobile  = platform=='android';
module.exports = {
    rn_bridge:undefined,
    init(brige) {
        if(brige){
            this.rn_bridge = brige;
            //listning all message send to logcat
            this.rn_bridge.channel.on('message', (msg) => {
                this.rn_bridge.channel.send(msg);
            });
        }
        else {
            console.log('os.platform()',os.platform());
        }
    },
    get localIp() {
        var interfaces = os.networkInterfaces();
        var addresses = [];
        for (var k in interfaces) {
            for (var k2 in interfaces[k]) {
                var address = interfaces[k][k2];
                if (address.family === 'IPv4' && !address.internal) {
                    addresses.push(address.address);
                }
            }
        }
        return addresses;
    },    
    get platform() {
       return platform
    },
    get isMobile() {
        return isMobile;
    },
    calert() {
        const msg = Object.values(arguments).join();
        isMobile?this.rn_bridge.channel.send(msg):console.log(msg);
    },
    clog() {
        const msg = Object.values(arguments).join();
        isMobile?this.rn_bridge.channel.send(msg):console.log(msg);
    }
}