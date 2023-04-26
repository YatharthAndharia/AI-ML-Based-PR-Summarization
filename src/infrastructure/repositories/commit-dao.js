const { Op } = require('sequelize');
const models = require('../../../database/models');
const { Dao } = require('./dao');

class Commit extends Dao {
  static create({ data }) {
    return super.createInstance({ model: models.Commit, data });
  }

  static update({ data, where, returning }) {
    return super.updateInstance({
      data,
      where,
      model: models.Commit,
      returning
    });
  }

  static delete({ where }) {
    return super.delete({ where, model: models.Commit });
  }

  static get({ where, attributes, relationships, raw = false }) {
    return super.getInstance({
      model: models.Commit,
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
        model: models.Commit,
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
    return super.count({ model: models.Commit, where });
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
        model: models.Commit,
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

  static countOnDate({ where }) {
    return models.Commit.count({
      where: {
        [Op.and]: [
          models.sequelize.where(
            models.sequelize.fn(
              'DATE_TRUNC',
              'day',
              models.sequelize.col('commitDate')
            ),
            { [Op.eq]: where.commitDate }
          ),
          { userId: where.userId }
        ]
      }
    });
  }
}

module.exports = { Commit };
