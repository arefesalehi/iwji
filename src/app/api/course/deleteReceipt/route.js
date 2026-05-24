import connectToDB from '@/configs/db';
import CourseRegistration from '@/models/courseRegisteration';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectToDB();

    const { userId, courseId, key } = req.body;
    if (!userId || !courseId || !key) {
      return res.status(400).json({ message: 'Missing parameters' });
    }

    const reg = await CourseRegistration.findOne({ userId, courseId });
    if (!reg) return res.status(404).json({ message: 'Registration not found' });

    const receipt = reg.receipts[key];
    if (receipt?.fileUrl) {
      try {
        const filePath = path.join(
          process.cwd(),
          'public',
          receipt.fileUrl.replace(/^\/+/, '')
        );
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch (e) {
        console.warn('File delete failed:', e.message);
      }
    }

    // حذف داده در دیتابیس
    reg.receipts[key] = {};
    await reg.save();

    return res.status(200).json({ message: 'Receipt deleted successfully' });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: err.message || 'Internal server error' });
  }
}
