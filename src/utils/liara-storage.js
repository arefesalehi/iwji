import aws from 'aws-sdk'

const s3Client = new aws.S3({
  accessKeyId: process.env.LIARA_ACCESS_KEY,
  secretAccessKey: process.env.LIARA_SECRET_KEY,
  endpoint: process.env.LIARA_ENDPOINT || 'https://storage.iran.liara.space',
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
})

export const uploadToLiara = async (file, fileName, folder = 'uploads') => {
  if (!process.env.LIARA_ACCESS_KEY || !process.env.LIARA_SECRET_KEY) {
    throw new Error('Liara credentials not configured')
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const key = `${folder}/${Date.now()}-${fileName}`

  const params = {
    Bucket: process.env.LIARA_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: file.type,
    ACL: 'public-read',
  }

  try {
    await s3Client.upload(params).promise()
    return {
      url: `${process.env.LIARA_BUCKET_URL}/${key}`,
      key: key,
      fileName: fileName,
    }
  } catch (error) {
    console.error('Upload to Liara failed:', error)
    throw error
  }
}

export const deleteFromLiara = async (key) => {
  if (!process.env.LIARA_ACCESS_KEY || !process.env.LIARA_SECRET_KEY) {
    throw new Error('Liara credentials not configured')
  }

  const params = {
    Bucket: process.env.LIARA_BUCKET_NAME,
    Key: key,
  }

  try {
    await s3Client.deleteObject(params).promise()
  } catch (error) {
    console.error('Delete from Liara failed:', error)
    throw error
  }
}
