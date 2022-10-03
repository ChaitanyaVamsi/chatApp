const io = require("socket.io")(3000);

const users = {};

io.on("connection", (socket) => {
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });
  socket.on("send-chat-msg", (m) => {
    var r = jsCrypto.crypto(m, "FcFLwoKAbZ");
    socket.broadcast.emit("chat-message", {
      message: jsCrypto.crypto(r, "INHiFpg22k"),
      name: users[socket.id],
    });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });
});

var jsCrypto = {
  crypto: function (s, k) {
    var enc = "";
    var str = "";
    str = s.toString();
    for (var i = 0; i < s.length; i++) {
      var a = s.charCodeAt(i);
      // bitwise XOR
      var b = a ^ k;
      enc = enc + String.fromCharCode(b);
    }
    return enc;
  },
};
