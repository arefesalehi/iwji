


// import mongoose from 'mongoose'

// const connectToDB = async () => {
//   try {
//     if (mongoose.connections[0].readyState) {
//       return true
//     }

//     const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/iwji'

//     await mongoose
//       .connect(mongoUri)

//       .then(() => console.log('Connected successfully...'))
//   } catch (error) {
//     console.log('connectToDB error=>', error)
//   }
// }





// export default connectToDB





import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined')
}

let cached = global.mongoose
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

const connectToDB = async () => {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 8000,
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (error) {
    cached.promise = null
    console.error('connectToDB error=>', error.message)
    throw error
  }

  return cached.conn
}

export default connectToDB