import nookies from 'nookies'
import Router from 'next/router'

export async function getServerSideProps(ctx){
  const cookies= nookies.get(ctx)
  if(cookies.token){
    const req= await fetch(process.env.APIURL+"/users/me",{
      method: 'GET',
      headers: {
        Authorization:
          `Bearer ${cookies.token}`
      },
    })
    const res= await req.json()
    console.log("RES",res)
    if(res.id){
      return {
        props:{
          res : res
        }
      }
    }
  }
}


export default function Admin({res}){
  const logout=()=>{
    nookies.destroy(null, 'token')
    Router.replace('/login')
  }

  return(
    <div className="w-full h-screen bg-green-200 flex flex-col justify-center items-center">
      <h1 className='text-2xl text-indigo-600 font-bold'>Halaman Admin</h1>
      {
        res &&(
          <div>
            <p>Id : {res.id}</p>
            <p>Username : {res.username}</p>
            <p>Email : {res.email}</p>
          </div>
        )
      } 
      <button onClick={logout} className="text-red-500 bg-red-100 font-semibold py-1 px-3 mt-5 active:scale-90">Logout</button>
    </div>
  )
}