import io from "socket.io-client";

const socket = io("ws://localhost:9502", { transports: ["websocket"] });

export default socket;