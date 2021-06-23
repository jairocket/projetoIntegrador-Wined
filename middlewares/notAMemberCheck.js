const db = require("../database/models");

async function notAMemberCheck(req, res, next){
    let { members } = req.body;
    let { id } = req.params;
    let notAMember = [];
    

    if(Array.isArray(members)){
        for(member of members){
            await db.User.findOne({
                where:{ email: member },
                attributes:['id'],
                include: [
                    {
                        model: db.Brotherhood,
                        attributes: [],
                        where: { id },
                        required: true
                    }
                ]   
            }).then((result)=>{
                if(!result){
                    notAMember.push(member)
                    console.log(notAMember)

                }else{
                    //pass
                }
                
                
                
            })
            
            
            
            // .then((result)=>{
            //     if(!result){
            //         next()
            //     }else{
            //         req.flash('Usuário ' + result.name + ' já é um confrade')
            //         res.redirect('/dashboard')
            //     }
            // })
        }
        next(notAMember) 
    }else{
        await db.User.findOne({
            where:{ email:members },
            attributes:['id'],
            include: [
                {
                    model: db.Brotherhood,
                    where: { id },
                    required: true
                }
            ]
        }).then((result)=>{
            if(!result){
                next()
            }else{
                req.flash('Usuário ' + result.name + ' já é um confrade')
                res.redirect('/dashboard')
            }
        })
    }    
}

module.exports = notAMemberCheck