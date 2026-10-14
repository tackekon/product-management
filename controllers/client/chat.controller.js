//[GET] /chat/
module.exports.index = async (req,res) => {
  // SocketIO
  if (global._io) {
    global._io.on('connection', (socket) => {
      console.log('a user connected', socket.id);
    });
  }
  // End SocketIO
  res.render("client/pages/chat/index", {
    pageTitle: "Chat"
  })
};