/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Workshop = use('App/Models/Workshop');

/**
 * Resourceful controller for interacting with workshops
 */
class WorkshopController {
  async index() {
    const workshops = await Workshop.query()
      .with('user', (builder) => {
        builder.select(['id', 'name']);
      })
      .fetch();

    return workshops;
  }

  /**
   * Create/save a new workshop.
   * POST workshops
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only(['title', 'description', 'user_id', 'section']);

    const workshop = await Workshop.create(data);

    return response.status(201).json(workshop);
  }
}

module.exports = WorkshopController;
