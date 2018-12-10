const moment = require('moment')
const { Op } = require('sequelize')
const { User, Appointment } = require('../models')

class ScheduleController {
  async index (req, res) {
    const { id, provider } = req.session.user
    let query;
    if (provider) {
      query = {
        provider_id: id,
        date: {
          [Op.between]: [
            moment()
              .startOf('day')
              .format(),
            moment()
              .endOf('day')
              .format()
          ]
        }
      }
    }else {
        query = { user_id: id }
    }
    const alias = provider ? 'user' : 'provider'
    const schedules = await Appointment.findAll({
      include: [{ model: User, as: alias }],
      where: query
    })

    const appointments = schedules.map(a => {
      let date = moment(a.date).format('DD/MM/YYYY')
      let hour = moment(a.date).format('HH:mm')

      return {
        date: date,
        hour: hour,
        user: provider ? a.user : a.provider
      }
    })

    res.render('schedule/index', {
      appointments
    })
  }
}

module.exports = new ScheduleController()
