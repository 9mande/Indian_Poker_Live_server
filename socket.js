import { Server } from 'socket.io';
// const Server = require('socket.io');

export default (server) => {
   // 서버 연결, path는 프론트와 일치시켜준다.
   const io = new Server(server, { path: '/socket.io' });
   var numClients = {};

   //* 웹소켓 연결 시
   io.on('connection', (socket) => {
      const req = socket.request; // 웹소켓과는 달리 req객체를 따로 뽑아야함
 
      //* ip 정보 얻기
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      console.log('새로운 클라이언트 접속!', ip, socket.id, req.ip);
      // socket.id 는 소켓 연결된 고유한 클라이언트 식별자라고 보면된다. 채팅방의 입장한 고유한 사람
 
      //* 연결 종료 시
      socket.on('disconnect', () => {
         console.log('클라이언트 접속 해제', ip, socket.id);
         clearInterval(socket.interval);
      });
 
      //* 에러 시
      socket.on('error', (error) => {
         console.error(error);
      });
 
      //* 클라이언트로부터 메시지
      socket.on('reply', (data) => {
         console.log(data);
      });

      socket.on('create', (data) => {
         const obj = JSON.parse(data.enteredUserData.toString());
         console.log(obj);

         if(numClients[data.hostId] != undefined){
            socket.broadcast.to(socket.id).emit('server_message', "You've already created a room.");
         }
         else{
            socket.room = data.hostId;
            socket.join(data.hostId);

            numClients[data.hostId] = {
               id : {id : data.hostId},
               num : {num : 1},
               host : obj,
            };
         }  
      });
      
      socket.on('enter', (data) => {
         const obj = JSON.parse(data.enteredUserData.toString());
         console.log(obj);

         if(numClients[data.roomId] == undefined){
            socket.broadcast.to(socket.id).emit('server_message', 'No room.');
         } else if (numClients[data.roomId].num == 1) {
            numClients[data.roomId].num += 1
            socket.join(data.roomId);
            socket.broadcast.to(socket.id).emit('server_message', 'Joined.');
         } else{
            socket.broadcast.to(socket.id).emit('server_message', 'Full room.');
         }
      });

      // 도망
      socket.on('quit', (data) => {
         console.log('data');
         numClients[socket.room].num -= 1;
         if(numClients[socket.room].num == 0) {
            numClients[socket.room] = undefined;
         }
         socket.leave(socket.room);
         socket.room = undefined;
      });

      //* 클라이언트로 메세지 보내기
      socket.interval = setInterval(() => {
         // 3초마다 클라이언트로 메시지 전송
         if(socket.room === undefined){
            let ress = [];
            for( var i in numClients ){
               ress.push(numClients[i]);
            }
            console.log(ress);
            socket.emit('rooms', ress);
         } else{
            socket.broadcast.to(socket.room).emit('')
         }
                  
      }, 1000);



      // 베팅
      socket.on('bet', (data)=>{
         console.log(data);
         socket.broadcast.to(socket.room).emit(data);
      });
      

      socket.on('')
   });
};