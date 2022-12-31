function auth(req, res, next) {
  //   req.session.user = {
  //     name: 'Jailson ',
  //     surname: 'Anjos',
  //     description:
  //       'Web developer wannabe! Adoro fotografia, cinema, música e vinhos!!! ',
  //     id: 1,
  //     email: 'jailson@digitalhouse.com',
  //     avatar_picture: 'profile-picture-1627155800283.jpeg',
  //   }
  if (typeof req.session.user != 'undefined') {
    return next()
  } else {
    console.log(req.session.user)
    return res.redirect('/login')
  }
}

module.exports = auth
