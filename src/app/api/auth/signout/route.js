// import { cookies } from "next/headers";

// export async function POST(req){
//  await cookies().delete('token',{ path: '/' })
//     return Response.json({message:'logout successfully'})
// }

import { NextResponse } from 'next/server'

export async function POST(req) {
  const res = NextResponse.json({ message: 'logout successfully' })

  res.cookies.set('token', '', {
    path: '/',
    expires: new Date(0),
  })

  return res
}