const tableName = "attachments";
// because of this issue in Sequelize the foreign key constraint may be named differently depending
// on when the previous migrations were ran https://github.com/sequelize/sequelize/pull/9890

const constraintNames = [
  "attachments_documentId_fkey",
  "attachments_foreign_idx",
];
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let error;

    for (const constraintName of constraintNames) {
      try {
        await queryInterface.sequelize.query(
          `alter table "${tableName}" drop constraint "${constraintName}"`
        );
        return;
      } catch (err) {
        error = err;
      }
    }

    throw error;
  },
  down: async (queryInterface, Sequelize) => {
    let error;

    for (const constraintName of constraintNames) {
      try {
        await queryInterface.sequelize.query(`alter table "${tableName}"
            add constraint "${constraintName}" foreign key("documentId") references "documents" ("id")
            on delete cascade`);
        return;
      } catch (err) {
        error = err;
      }
    }

    throw error;
  },
};
