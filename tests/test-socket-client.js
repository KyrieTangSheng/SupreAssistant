const { io } = require("socket.io-client");

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log(`Connected with ID: ${socket.id}`);
  
  // Emit the 'send_message' event
  socket.emit("send_message", { message: "Hello AI!" });
});

socket.on("receive_message", (data) => {
  console.log("AI Response:", data);
});

socket.on("error", (error) => {
  console.error("Error:", error);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
}); 