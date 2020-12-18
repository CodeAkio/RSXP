const Helpers = use('Helpers');

class ProfileController {
  async update({ request, auth }) {
    const data = request.only(['name', 'title', 'bio', 'github', 'linkedin']);
    const password = request.input('password');
    const avatar = request.file('avatar');

    const user = await auth.getUser();

    if (avatar) {
      await avatar.move(Helpers.tmpPath('files'), {
        name: `${new Date().getTime()}.${avatar.subtype}`,
        overwrite: true,
      });

      if (!avatar.moved()) return avatar.error();

      user.avatar = avatar.fileName;
    }

    user.merge(data);

    if (password) {
      user.password = password;
    }

    await user.save();

    return user;
  }
}

module.exports = ProfileController;
