/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Workshop = use('App/Models/Workshop');

/**
 * Resourceful controller for interacting with workshops
 */
class WorkshopController {
  async index({ request }) {
    const section = request.input('section', 1);

    const workshops = await Workshop.query()
      .where('section', section)
      .with('user', (builder) => {
        builder.select(['id', 'name', 'avatar']);
      })
      .fetch();

    return workshops;
  }

  async show({ params: { id } }) {
    const workshop = await Workshop.findOrFail(id);
    await workshop.load('user', (builder) => {
      builder.select(['id', 'name', 'github', 'linkedin', 'avatar']);
    });

    return workshop;
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
    const data = request.only([
      'title',
      'color',
      'description',
      'user_id',
      'section',
    ]);

    const workshop = await Workshop.create(data);

    return response.status(201).json(workshop);
  }

  async update({ request, params }) {
    const data = request.only([
      'title',
      'color',
      'description',
      'user_id',
      'section',
    ]);

    const workshop = await Workshop.findOrFail(params.id);

    workshop.merge(data);
    await workshop.save();

    return workshop;
  }

  async destroy({ params }) {
    const workshop = await Workshop.findOrFail(params.id);

    await workshop.delete();
  }
}

module.exports = WorkshopController;
