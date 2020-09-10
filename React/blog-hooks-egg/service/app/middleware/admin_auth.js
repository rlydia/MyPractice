module.exports = (options, app) =>{
  return async function auth(ctx,next){
      console.log('ctx.session.openId:',ctx.session.openId)
      if(ctx.session.openId){
          await next()
      }else{
          ctx.body={data:'没有登录'}
      }
  }
}

// module.exports = options => {
//   return async function adminauth(ctx, next) {
//     console.log('ctx.session:', ctx.session)
//     console.log('ctx.session.openId:', ctx.session.openId)  // undefined
//     if (ctx.session.openId) {
//       await next()
//     } else {
//       ctx.body = {data: '没有登录'}
//     }
//   }
// }