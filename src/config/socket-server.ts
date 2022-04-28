import http from "http";
import { Server, Socket } from "socket.io";
import constant from "./constant";

export default class ServerSocketIo {
  private server: http.Server;
  private io: Server;
  private newDataSocket: any;

  constructor(app: any) {
    this.server = new http.Server(app);

    this.io = new Server(this.server, {
      path: "/socket.io",
      cors: {
        // origin: [`${constant.cors_policy}`],
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
    
    this.io.on("connection", (socket: Socket) => {
      socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
        console.log(`connect_error due to ${err}`);
      });

      socket.on("data received from user", (data) => {
        console.log(`New data received : ${data}`);
        this.newDataSocket = data.message;
        console.log("result data socket : ", this.newDataSocket);
        socket.broadcast.emit("message to all",data)
      });
    });
  }

  public start(port: number) {
    this.server.listen(port, () => {
      console.log(`[SocketIo] listening on port ${port}.`);
    });
  }
}
