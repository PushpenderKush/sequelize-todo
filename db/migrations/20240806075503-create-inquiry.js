"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("inquiry", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ticketPriority: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ticketStatus: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      clientName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mobileNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      deliveryAddress: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      productCategory: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      productName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      productQuantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      productWeight: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      productLength: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      productWidth: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      productHeight: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      buyingPrice: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      productMinPrice: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      productMaxPrice: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      finalPrice: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      dispatcher: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      expectedDeliveryDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("inquirys");
  },
};
