const { test, trait } = use('Test/Suite')('Workshop');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('it should be able to create workshops', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .post('/workshops')
    .send({
      title: 'Utilizando Node.js para construir APIs seguras e performáticas',
      description:
        'Se você já buscou sobre as melhores linguagens back-end atuais provavelmente deve ter se deparado...',
      user_id: user.id,
      section: 1,
    })
    .end();

  response.assertStatus(201);
  assert.exists(response.body.id);
});
