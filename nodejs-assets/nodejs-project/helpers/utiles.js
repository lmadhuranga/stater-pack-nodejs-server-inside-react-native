const os = require('os');
const platform  = os.platform();
const isMobile  = platform=='android';
module.exports = {
    rn_bridge:undefined,
    init(brige) {
        this.rn_bridge = brige;
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
    },
    cpost() {
        if(isMobile) {
            const events = Object.values(arguments);
            this.rn_bridge.channel.post(events[0], events[1]);
             
        } else { 
            const eventString = Object.values(arguments).join();
            console.log('CPOST : ', eventString);
        }
    }
}