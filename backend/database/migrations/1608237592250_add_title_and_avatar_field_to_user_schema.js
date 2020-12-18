/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddTitleAndAvatarFieldToUserSchema extends Schema {
  up() {
    this.alter('users', (table) => {
      table.string('title');
      table.string('avatar');
    });
  }

  down() {
    this.alter('users', (table) => {
      table.dropColumn('avatar');
      table.dropColumn('title');
    });
  }
}

module.exports = AddTitleAndAvatarFieldToUserSchema;
