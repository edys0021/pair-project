const { User, Detail, Post } = require('../models')
const bcryptjs = require('bcryptjs')
const { Op } = require("sequelize");
const nodemailer = require('nodemailer');
const formatDate = require('../helpers/fotmatDate')


class Controller {
    static home(req, res) {
        res.render('landing')
    }

    static joinGet(req, res) {
        let errors = undefined
        Detail.findAll()
            .then(data => {
                if(req.query.errors) {
                    errors = req.query.errors.split(',')
                }
                res.render('signUpForm', { data, errors })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static joinPost(req, res) {
        let allData = []
        let email = req.body.email
        Detail.create({
            fullName: req.body.fullname,
            gender: req.body.gender
        })
            .then(data => {
                allData.push(data)
                return User.create({
                    email: req.body.email,
                    password: req.body.password,
                    role: 'user',
                    DetailId: data.id
                })
            })
            .then(data => {
                allData.push(data)
                return Post.create({
                    UserId: data.id
                })
            })
            .then(data => {
                allData.push(data)
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'hackgram8@gmail.com',
                        pass: 'Apasih123!'
                    }
                });

                const mailOptions = {
                    from: 'hackgram8@gmail.com',
                    to: `${email}`,
                    subject: 'Hackgram',
                    text: 'Wellcome to Hackgram!'
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                res.render('profile', { allData })
            })

            .catch(err => {
                let errors = err.message.split('\n')
                let error = errors.map(e => {
                    return e.split(':')[1]
                })
                error = error.map(e => {
                    return e.split(','[0])
                })
                res.redirect(`/join/?errors=${error}`)
            })
    }

    static loginPost(req, res) {
        let email = req.body.email
        let password = req.body.password
        User.findAll({
            where: {
                email: email,
            }, include: [{
                model: Detail
            }]
        })
            .then(data => {
                if (data.length == []) {
                    res.send(['username not found'])
                } else {
                    let check = bcryptjs.compareSync(password, data[0].password)
                    if (check == false) {
                        res.send(['password and username not match'])
                    }
                    if (check == true) {
                        User.findAll({
                            include: [{
                                model: Detail
                            }, {
                                model: Post
                            }]
                        })
                            .then(allData => {
                                res.redirect(`/home/${data[0].id}`)
                            })
                            .catch(err => {
                                res.send(err)
                            })
                    }
                }
            })
            .catch(err => {
                res.send(err)
            })
    }

    static getHome(req, res) {
        let id = req.params.id
        let search = req.query.search
        User.findAll({
            where: {
                id
            }, include: [{
                model: Detail
            }]
        })
            .then(data => {
                if (!search) {
                    User.findAll({
                        order: [
                            ['createdAt', 'DESC']
                        ],
                        include: [{
                            model: Detail
                        }, {
                            model: Post
                        }]
                    })
                        .then(allData => {
                            res.render('home', { data, allData })
                        })
                        .catch(err => {
                            res.send(err)
                        })
                } else {
                    User.findAll({
                        order: [
                            ['createdAt', 'DESC']
                        ],
                        include: [{
                            model: Detail,
                            where: { fullName: { [Op.iLike]: `%${search}%` } }
                        }, {
                            model: Post
                        }]
                    })
                        .then(allData => {
                            if(allData == []){
                                res.send('tidak ditemukan')
                            } else
                            res.render('home', { data, allData })
                        })
                        .catch(err => {
                            res.send(err)
                        })
                }


            })

    }

    static postImg(req, res) {
        let id = req.params.id
        Post.create({
            where: { id },
            imgUrl: req.body.url,
            caption: req.body.caption,
            UserId: id
        })
            .then(data => {
                res.redirect(`/home/${id}`)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static postImgProfile(req, res) {
        let id = req.params.id
        Post.create({
            where: { id },
            imgUrl: req.body.url,
            caption: req.body.caption,
            UserId: id
        })
            .then(data => {
                res.redirect(`/profile/${id}/detail`)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static profilGet(req, res) {
        let id = req.params.id
        let allData = undefined
        Detail.findAll({
            where: { id },
        })
            .then(data => {
                allData = data
                return User.findAll({
                    where: { DetailId: data[0].id }
                })
            })
            .then(data => {
                allData.push(data[0])
                return Post.findAll({
                    where: { UserId: data[0].id }
                })
            })
            .then(data => {
                data.map(e => {
                    return allData.push(e)
                })
                res.render('profile', { allData, formatDate })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static delete(req, res) {
        let id = req.params.id
        let userId = undefined
        User.findAll({
            include: {
                model: Post,
                where: { id }
            }
        })
            .then(data => {
                userId = data[0].id
                return Post.destroy({
                    where: { id }
                })
            })
            .then(data => {
                res.redirect(`/profile/${userId}/detail`)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static update(req, res) {
        let errors = undefined
        let id = req.params.id
        User.findAll({
            where: { id },
            include: [{
                model: Detail
            }, {
                model: Post
            }]
        })
            .then(data => {
                if(req.query.errors) {
                    errors = req.query.errors.split(',')
                }
                res.render('edit', { data, errors })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static updatePost(req, res) {
        let id = req.params.id
        User.update({
            email: req.body.email,
        },
            {
                where: { DetailId: id }
            })
            .then(data => {
                return Detail.update({
                    fullName: req.body.fullname,
                    gender: req.body.gender,
                    birthDate: req.body.birthdate
                }, {
                    where: { id }
                })
            })
            .then(data => {
                res.redirect(`/profile/${id}/detail`)
            })
            .catch(err => {
                let errors = err.message.split('\n')
                let error = errors.map(e => {
                    return e.split(':')[1]
                })
                error = error.map(e => {
                    return e.split(','[0])
                })
                res.redirect(`/profile/${id}/edit/?errors=${error}`)
            })
    }
}

module.exports = Controller