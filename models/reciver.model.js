module.exports = (sequelize, Sequelize) => {
    const Reciver = sequelize.define("reciver", {
      message_id: {
        type: Sequelize.STRING
      },
      reciver_id: {
        type: Sequelize.STRING
      }
    });
    return Reciver;
  };   