const bcrypt = require('bcryptjs');
const db = require('../database/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { check, validationResult, body } = require('express-validator');
const UserService = require('../services/UserService');
const jwt = require('jsonwebtoken');
require('dotenv-safe').config()

let UserController = {
    registerForm: (req, res)=>{
        res.render('register')
    },
    saveForm: async (req, res)=>{
        let errorsList = validationResult(req);
        if (errorsList.isEmpty()){
            let {
                email, 
                name, 
                surname,
                password,
                terms, 
                birthday, 
                description, 
                avatar_picture, 
                background_picture, 
                
            } = req.body;
            let hashedPassword = bcrypt.hashSync(password, 10);
          
            const results = await db.User.create({
                email,
                name, 
                surname, 
                terms, 
                password: hashedPassword, 
                birthday, 
                description, 
                avatar_picture: 'profile-picture-white.svg', 
                background_picture, 
                
            })
            req.flash('success', "Cadastro realizado com sucesso!")
            res.render('login')
        }else{
            console.log(errorsList)
            res.render("register", {errors: errorsList.errors, old: req.body});
        }
        
    },
    loginForm: (req, res)=>{
        res.render('login')
    },
    userLogger: async(req,res)=>{
        let errorsList = validationResult(req);
        if (errorsList.isEmpty()){
            const {email, password} = req.body;
            const usr = await db.User.findOne({
                where: {email}
            });

            if ((usr.email == email) && (bcrypt.compareSync(password, usr.password))){
                    const profile = {
                        name: usr.name,
                        surname: usr.surname,
                        description: usr.description, 
                        id: usr.id, 
                        email: usr.email,
                        avatar_picture: usr.avatar_picture
                    }
                    req.session.user = profile;
                    const token = jwt.sign({id: profile.id}, process.env.SECRET, {
                        expiresIn: 300
                    })
                    return res.json({auth: true, token: token})
                    res.redirect('/dashboard');
            } else {
                req.flash('error', "Senha incorreta!")
                return res.status(500).json({message: 'Login Inválido'})
                res.render('login', {old: req.body})
            }
        } else {
            console.log(errorsList)
            res.render("login", {errors: errorsList.errors, old: req.body});
        }   
    }, getUser: async (req, res) =>{
        let id = req.session.user.id;
        const user = await db.User.findByPk(id, {
            attributes: [
                'id',
                'name',
                'surname', 
                'description', 
                'avatar_picture', 
                'background_picture'
            ],
  
        });
        return user

    },

    getProfile: async (req, res) =>{
        const {id} = req.params
        const avatar = req.session.user.avatar_picture;
        const profile = await db.User.findByPk(id,
             {
            include: [{
                model: db.Wine,
                as: 'favorites',
                attributes: [ 'wine', 'picture_path']
                
            }, {
                model: db.Wine,
                as: 'wished',
                attributes: ['wine', 'picture_path']
            }]
        }
        );

        const user = {
            name: profile.name,
            surname: profile.surname,
            description: profile.description, 
            id: profile.id, 
            email: profile.email,
            avatar_picture: profile.avatar_picture,
            background_picture: profile.background_picture,
            favorites: profile.favorites,
            wished: profile.wished

        }
        // return res.json(user)
        return res.render('profile', { title: "Perfil", style: "profile", user: user, avatar })

    },
    profileEditorForm: async (req, res)=>{
        const id = req.session.user.id;
        const avatar = req.session.user.avatar_picture;
        const user = await db.User.findByPk(id);
        return res.render('profileEditor', { title: "Editar Perfil", style: "register",  user, avatar})
    },
    profileEditor: async (req, res)=>{
        const id = req.session.user.id;
        const {name, surname, email, description} = req.body;
        const results = await db.User.update({
            name,
            surname,
            email,
            description
        },
        {
            where:{id},  
        });
        return res.redirect(
            '/dashboard'
        ) 
    },
    delete: async (req, res)=>{
        const{id} = req.params;
    const results = await db.User.destroy({
        where:{id}
    })
        console.log(results)
        return res.json(results)
    },
    uploadProfilePicture: async(req, res)=>{
        await UserService.uploadProfilePicture(req, res)
        res.redirect('/dashboard')
    },
    uploadBackgroundPicture: async(req, res)=>{
        await UserService.uploadBackgroundPicture(req, res)
        res.redirect('/dashboard')
    },

    passwordEditor: async(req, res)=>{
        let avatar = req.session.user.avatar_picture
        return res.render('passwordEditor', {
            avatar, 
            title: 'Alterar Senha', 
            style: "register", 
            user: req.session.user
        })
    },

    passwordUpdator: async(req, res)=>{
        await UserService.passwordUpdator(req, res);
        res.redirect('/dashboard');
    },

    passwordGenerator: async(req, res)=>{
        let new_password = await UserService.passwordGenerator(req, res);
        res.redirect('/dashboard')
        
    },

    passwordForm: async(req, res)=>{
        return res.render('forgotPassword')
    }
}

module.exports = UserController;