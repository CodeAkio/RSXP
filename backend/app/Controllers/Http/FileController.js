const Helpers = use('Helpers');

class FileController {
  async show({ response, params }) {
    return response.download(Helpers.tmpPath(`files/${params.file}`));
  }
}

module.exports = FileController;
