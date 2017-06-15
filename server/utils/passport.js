


    // 判断管理员是否已经登陆
    checkLoginAdminJson=(ctx,next)=>{
        let result={
            code: 1001,
            message: '未登陆'
        }
        let req=ctx.request;
        console.log(req.session);
        if (!req.session) {
            ctx.body=result;
        }
        next();
    },



    // 判断管理员是否未登陆

    checkNotLoginAdminJson=(ctx,next)=>{
    let result={
        code: 1002,
        message: '已登陆'
    }
    let req=ctx.request;
    console.log(req);
        if (req.session) {
            ctx.body=result;
        }
        else {
            next();
        }
    }



module.exports = {
    checkLoginAdminJson,checkNotLoginAdminJson
};
