const dgram = require("dgram");
const EOF = 0x1a; // ^Z

const connect = (host, port, packet) => {
  return new Promise((resolve, reject) => {
    const socket = dgram.createSocket("udp4");
    let error,
      timer,
      msgBuff = Buffer.from([]);

    socket.on("close", () => {
      if (error) {
        reject(error);
      } else {
        if (msgBuff.length) {
          resolve(msgBuff.toString());
        } else {
          resolve("ok");
        }
      }
    });

    socket.on("message", (msg, rinfo) => {
      clearTimeout(timer);
      if (msg[0] === EOF) {
        socket.close();
      } else {
        msgBuff = Buffer.concat([msgBuff, msg]); //msgBuff.concat(msg);
        timer = setTimeout(() => socket.close(), 100);
      }
    });

    socket.on("error", (err) => {
      error = err;
      socket.close();
    });

    socket.send(packet, port, host);
    timer = setTimeout(() => socket.close(), 100);
  });
};

module.exports = connect
