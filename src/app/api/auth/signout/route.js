import { cookies } from "next/headers";

export async function POST(req){
    cookies().delete('token',{ path: '/' })
    return Response.json({message:'logout successfully'})
}