import nookies from 'nookies'


export async function getServerSideProps({params : {provider}, query : {access_token}, ...ctx}){
  // const url= req.nextUrl.clone()
  console.log("ctx",ctx.req)

  const req= await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/${provider}/callback?access_token=${access_token}`)
  const res=await req.json()

  if(res.jwt){
    nookies.set(ctx, 'token', res.jwt,{
      path:"/",
    })
  }

  const cookies=nookies.get(ctx)

  if(cookies.token){
    const req= await fetch(process.env.APIURL+"/users/me",{
      method: 'GET',
      headers: {
        Authorization:
        `Bearer ${cookies.token}`
      },
    })
    const res= await req.json()
    if(res.id){
        return {
        redirect :{
          destination : '/admin'
        }
      }
    }
  }
  return{
    props:{}
  }
}

export default function Connnect(){
  return(
    <div>
      Hell yeah...
    </div>
  )
}