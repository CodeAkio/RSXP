/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Workshop = use('App/Models/Workshop');

class SubscriptionController {
  async store({ response, params, auth }) {
    const user = await auth.getUser();
    const { workshop_id } = params;

    const workshop = await Workshop.findOrFail(workshop_id);
    const checkSubscription = await user
      .subscriptions()
      .where('section', workshop.section)
      .first();

    if (checkSubscription) {
      return response.status(400).json({
        error: 'You cannot subscribe in two workshops in the same section',
      });
    }

    const countSubscriptions = await workshop
      .subscriptions()
      .count('* as total');

    if (countSubscriptions[0].total >= 48) {
      return response.status(400).json({
        error: 'The workshop is full',
      });
    }

    await user.subscriptions().attach(workshop_id);

    return response.status(201).send();
  }
}

module.exports = SubscriptionController;
