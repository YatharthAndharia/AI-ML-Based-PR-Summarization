const models = require('../../../database/models');
const { Dao } = require('./dao');

class PR extends Dao {
  static create({data}) {
    return super.createInstance({ model: models.PR, data });
  }

  static update({ data, where, returning }) {
    return super.updateInstance({ data, where, model: models.PR, returning });
  }

  static delete({ where }) {
    return super.delete({ where, model: models.PR });
  }

  static get({ where, attributes, relationships, raw = false }) {
    return super.getInstance({
      model: models.PR,
      where,
      attributes,
      relationships,
      raw
    });
  }

  static async getAll({
    size,
    page,
    search,
    order,
    relationships,
    attributes,
    where
  }) {
    try {
      return super.getInstances({
        model: models.PR,
        where,
        size,
        page,
        search,
        order,
        relationships,
        attributes
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  static count({ where }) {
    return super.count({ model: models.PR, where });
  }

  static async findAllAndCount({
    size,
    page,
    where,
    search,
    order,
    relationships,
    attributes
  }) {
    try {
      return super.findAllAndCount({
        model: models.PR,
        where,
        size,
        page,
        search,
        order,
        relationships,
        attributes
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}
module.exports = { PR };
