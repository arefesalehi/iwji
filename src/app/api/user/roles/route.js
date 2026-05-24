// app/api/user/roles/route.js
import mongoose from 'mongoose';
import ConnectToDB from '@/configs/db'
import userModel from '@/models/user'

export async function PUT(req) {
  try {
    await ConnectToDB()

    const body = await req.json()
    const { id, _id } = body // دریافت هر دو حالت id و _id
    
    // استفاده از id یا _id (هر کدام که وجود دارد)
    const userId = id || _id;
    
    if (!userId) {
      return new Response(JSON.stringify({ message: 'Missing user identifier' }), { status: 400 })
    }

    // بررسی معتبر بودن ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return new Response(JSON.stringify({ message: 'Invalid user ID format' }), { status: 400 })
    }

    const user = await userModel.findById(userId)
    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 })
    }

    user.role = user.role === 'USER' ? 'ADMIN' : 'USER'
    await user.save()

    return new Response(
      JSON.stringify({ 
        message: 'User role updated successfully', 
        role: user.role 
      }),
      { status: 200 }
    )
  } catch (error) {
    console.error('PUT /api/user/roles error:', error)
    return new Response(JSON.stringify({ message: error.message }), { status: 500 })
  }
}

export async function GET() {
  return new Response(JSON.stringify({ message: 'Method Not Allowed' }), { status: 405 })
}