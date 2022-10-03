const socket = io("http://localhost:3000");

const messageContainer = document.getElementById("message-container");
const msgForm = document.getElementById("send-container");
const msgInput = document.getElementById("message-input");
const n = prompt("what is your name");
appendMessage("You joined");
socket.emit("new-user", n);

socket.on("chat-message", (data) => {
  appendMessage(
    `${data.name} : ${Jscrypto.crypto(data.message, "FcFLwoKAbZ")}`
  );
});

socket.on("user-connected", (x) => {
  appendMessage(`${x} connected`);
});

socket.on("user-disconnected", (x) => {
  appendMessage(`${x} disconnected`);
});

msgForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = msgInput.value;
  var encrypted = Jscrypto.crypto(msg, "INHiFpg22k");
  appendMessage(`You : ${msg}`);
  socket.emit("send-chat-msg", encrypted);
  msgInput.value = "";
});

function appendMessage(message) {
  const me = document.createElement("div");
  me.innerText = message;
  messageContainer.append(me);
}

var Jscrypto = {
  crypto: function (s, k) {
    var enc = "";
    var str = "";
    // make sure that input is string
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
