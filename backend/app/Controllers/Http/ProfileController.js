const Helpers = use('Helpers');

class ProfileController {
  async update({ request, auth }) {
    const user = await auth.getUser();

    const avatar = request.file('avatar');

    if (avatar) {
      await avatar.move(Helpers.tmpPath('files'), {
        name: `${new Date().getTime()}.${avatar.subtype}`,
        overwrite: true,
      });

      if (!avatar.moved()) return avatar.error();

      user.avatar = avatar.fileName;
    }

    await user.save();

    return user;
  }
}

module.exports = ProfileController;
