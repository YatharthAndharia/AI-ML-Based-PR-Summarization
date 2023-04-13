const { Op } = require('sequelize');

/**
 * @class Dao
 */
class Dao {
  static async createInstance({ model, data }) {
    return model.create(data);
  }

  static async updateInstance({ model, data, where, returning = false }) {
    return model.update(data, { where, returning });
  }

  static async getInstances({
    model,
    where,
    size,
    page,
    search,
    order,
    relationships,
    attributes,
    group,
    raw = false
  }) {
    try {
      const findObject = {};
      if (where) {
        findObject.where = where;
      }
      if (order) {
        findObject.order = order;
      }
      if (size) {
        findObject.limit = size;
      }
      if (size && page) {
        findObject.offset = size * (page - 1);
      }
      if (group) {
        findObject.group = group;
      }

      if (search) findObject.where.title = { [Op.like]: `%${search}%` };
      if (relationships) {
        findObject.include = relationships;
      }
      if (attributes) {
        findObject.attributes = attributes;
      }

      findObject.raw = raw;

      const instances = await model.findAll(findObject);
      return instances;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getInstance({
    model,
    where,
    search,
    order,
    relationships,
    attributes,
    group,
    raw = false
  }) {
    try {
      const findObject = {};
      if (where) {
        findObject.where = where;
      }
      if (order) {
        findObject.order = order;
      }
      if (group) {
        findObject.group = group;
      }

      if (search) findObject.where.title = { [Op.like]: `%${search}%` };
      if (relationships) {
        findObject.include = relationships;
      }
      if (attributes) {
        findObject.attributes = attributes;
      }

      findObject.raw = raw;

      const instance = await model.findOne(findObject);
      return instance;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async count({ where, model }) {
    return model.count({ where });
  }

  static async findAllAndCount({
    size,
    page,
    model,
    where,
    search,
    order,
    relationships,
    attributes,
    group
  }) {
    try {
      const rows = await this.getInstances({
        size,
        page,
        model,
        where,
        search,
        order,
        relationships,
        attributes,
        group
      });
      const count = await this.count({ model, where });
      return { count, rows };
    } catch (err) {
      throw new Error(err);
    }
  }

  static delete({ where, model, cascade = false, truncate = false }) {
    return model.destroy({
      where,
      cascade,
      truncate
    });
  }
}

module.exports = {
  Dao
};
