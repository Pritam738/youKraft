const db = require("../models");
const Message = db.message;
const Reciver = db.reciver;
const PublishMessage = require('../service/publisher');

// publish new message
exports.newMessageHandler = (req, res) => {
    // Validate request
    if (!req.body.message || !req.body.created_by) {
      res.status(400).send({
        message: "Content can not be empty."
      });
      return;
    }
  
    if (!req.body.created_for) {
      res.status(400).send({
        message: "reciver list can not be empty."
      });
      return;
    }
    PublishMessage(req.body).then((data)=>res.send({...data,message: "Message send to user"})).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while publishing Message."
      });
    });
}

// Create and Save a new Message
exports.create = (messageData) => {
  // Create a Message body
  const message_data = {
    message: messageData.message,
    created_by: messageData.created_by
  };
  // Save Message in the database
  Message.create(message_data)
    .then(data => {
      const reciver_data = []
      messageData.created_for.forEach(element => {
        reciver_data.push({
          message_id: data.id,
          reciver_id: element
        })
      });
      Reciver.bulkCreate(reciver_data).then(console.log( "Message send to user")).catch(err => {
        console.log(err.message , "Some error occurred while creating the reciver list.");
      });
    })
    .catch(err => {
      console.log(err.message , "Some error occurred while creating the Message.");
    });
};

// Retrieve all messages send by user.
exports.findAllSendMessagesByUserID = (req, res) => {
  const id = req.params.id;
  var condition = id ? { created_by: id} : null;

  Message.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving send messages."
      });
    });
};

// Retrieve all messages send by user.
exports.findAllRecivedMessagesByUserID = (req, res) => {
  const id = req.params.id;
  Reciver.findAll({ where: { reciver_id: id
    },
    include: [{
        model: Message
    }]
  }).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving send messages."
      });
    });
};