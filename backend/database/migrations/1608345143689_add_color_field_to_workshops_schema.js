/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddColorFieldToWorkshopsSchema extends Schema {
  up() {
    this.alter('workshops', (table) => {
      table.string('color').notNullable().defaultTo('#7159c1');
    });
  }

  down() {
    this.alter('workshops', (table) => {
      table.dropColumn('color');
    });
  }
}

module.exports = AddColorFieldToWorkshopsSchema;
