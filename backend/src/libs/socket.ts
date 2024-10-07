import { Server as SocketIO } from "socket.io";
import { Server } from "http";
import http from "http"
import { Express } from "express";
import AppError from "../errors/AppError";
const connectedClients = new Map();

interface ConnectionData {
  userId: number;
  type: string;
  socketId: string
}

interface Connection {
  prestadores: {
    id: number;
    socketId: string;
  }[];
  operadoras: [];
}

const connection: Connection = {
  prestadores: [],
  operadoras: []
}

let io: SocketIO;

// Inicio o servidor io
export const initIO = (httpServer: Express) => {
  const serverHttp = http.createServer(httpServer,);

  io = new SocketIO(serverHttp, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    socket.on('connectUser', (data: ConnectionData) => {
      connection.prestadores.push({
        id: data.userId,
        socketId: data.socketId,
      });
    });

    socket.on("joinRoom", (roomName: string | number) => {
      socket.join(String(roomName));
    });

    socket.on('disconnect', (data: ConnectionData) => {
      if (data.type === "MEDICO") {
        const cIndex = connection.prestadores.findIndex(c => c.socketId === data.socketId);

        if (cIndex >= 0) {
          connection.prestadores.splice(cIndex, 1);
        }
      }
    });
  });

  return serverHttp;
}

export const getIO = (): SocketIO => {
  if (!io) {
    throw new AppError("Socket IO not initialized");
  }

  return io;
};


export { connection };

