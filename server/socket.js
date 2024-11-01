import { Server as SocketIOServer } from "socket.io";
import Messages from "./models/Messages.js";
import Channel from "./models/Channel.js";

const setupSocket = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const userSocketMap = new Map();

  const disconnect = (socket) => {
    console.log(`Client disconnected: ${socket.id}`);
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        io.emit("userDisconnected", userId);
        break;
      }
    }
  };

  const sendMessage = async (message) => {
    console.log("Received message on server:", message);
    const senderSocketId = userSocketMap.get(message.sender);
    const recipientSocketId = userSocketMap.get(message.recipient);

    const createdMessage = await Messages.create(message);

    const messageData = await Messages.findById(createdMessage._id)
      .populate("sender", "id firstName lastName image email color")
      .populate("recipient", "id firstName lastName image email color");

    if (recipientSocketId) {
      io.to(recipientSocketId).emit("receiveMessage", messageData);
    }
    if (senderSocketId) {
      io.to(senderSocketId).emit("receiveMessage", messageData);
    }
  };

  const sendChannelMessage = async (message) => {
    const {channelId, sender, content, messageType, fileUrl} = message;

    const createdMessage = await Messages.create({
      sender, 
      recipent: null,
      content,
      messageType,
      timestamp: new Date(),  
      fileUrl,
    });

    const messageData = await Messages.findById(createdMessage._id)
      .populate("sender", "id firstName lastName image email color")
      .exec();
    
      await Channel.findByIdAndUpdate(channelId, {
      $push: {messages: createdMessage._id},
      });
      const channel = await Channel.findById(channelId).populate("members");

      const finalData = {...messageData._doc, channelId: channel._id};

      if (channel && channel.members){
        channel.members.forEach((member)=>{
          const memberSocketId = userSocketMap.get(member._id.toString());
          if (memberSocketId){
            io.to(memberSocketId).emit("receive-channel-message", finalData);
          } 
          
        });
        const adminSocketId = userSocketMap.get(channel.admin._id.toString());
          if (adminSocketId){
            io.to(adminSocketId).emit("receive-channel-message", finalData);
          } 
      }
  };

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User connected: ${userId} with socket ID: ${socket.id}`);
      io.emit("userConnected", userId);
    } else {
      console.log("User ID not provided during connection.");
    }

    socket.on("sendMessage", sendMessage);
    socket.on("send-channel-message", sendChannelMessage);
    socket.on("disconnect", () => disconnect(socket));
  });
};

export default setupSocket;