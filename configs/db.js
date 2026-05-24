// import mongoose from 'mongoose'


// const ConnectToDB = async () => {
//     try {
//         if (mongoose.connections[0].readyState) {
//             return true
//         }

//         // await mongoose.connect('mongodb://127.0.0.1:27017/iwji')
//             await mongoose.connect(process.env.MONGO_URI)
//             .then(() => console.log('Connected to DB!'));

//     } catch (error) {
//         console.log('connectToDB error=>', error)
//     }
// }

// export default ConnectToDB





import mongoose from 'mongoose'

const connectToDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return true
    }

    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/iwji'

    await mongoose
      .connect(mongoUri)

      .then(() => console.log('Connected successfully...'))
  } catch (error) {
    console.log('connectToDB error=>', error)
  }
}





export default connectToDB