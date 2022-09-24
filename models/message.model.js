module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("message", {
      message: {
        type: Sequelize.STRING
      },
      created_by: {
        type: Sequelize.STRING
      }
    });
    return Message;
  };   