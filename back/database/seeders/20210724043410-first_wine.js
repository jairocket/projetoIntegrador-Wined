"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("wines", [
      {
        wine: "Chateau Figeac, Saint Emilion Grand Cru",
        wine_slug: "chateau-figeac-saint-emilion-grand-cru",
        appelation: "Saint Emilion Grand Cru",
        appelation_slug: "saint-emilion-grand-cru",
        color: "Red",
        wine_type: "",
        regions: "Bordeaux",
        country: "France",
        vintage: "2020",
        score: 96.93,
        confidence_index: "A+",
        picture_path: "chateau-figeac-saint-emilion-grand-cru",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("wines", null, {});
  },
};
