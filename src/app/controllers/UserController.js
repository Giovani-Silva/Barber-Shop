const {
  User
} = require('../models')

class UserController {
  create(req, res) {
    return res.render('auth/signup')
  }

  async store(req, res) {
    const {
      name,
      email,
      password
    } = req.body

    if (!name && !email && !password) {
      req.flash('error', 'Preencha todos os campos')
      return res.redirect('/signup')
    }

    const user = await User.findOne({
      where: {
        email
      }
    })

    if (user) {
      req.flash('error', 'E-mail já cadastrado')
      return res.redirect('/signup')
    }

    const {
      filename: avatar
    } = req.file

    await User.create({ ...req.body,
      avatar
    })

    return res.redirect('/')
  }
}

module.exports = new UserController()
