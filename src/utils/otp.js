import User from '@/models/user';
import Otp from  '@/models/otp';

export const verifyOtp = async (phone, code) => {
  const otp = await Otp.findOne({ phone, code });
  if (!otp) throw new Error('کد اشتباه است');

  // پیدا کردن کاربر در User
  let user = await User.findOne({ phone });

  if (!user) {
    // اگر کاربری وجود ندارد، ایجاد کنید (برای ثبت نام با OTP)
    user = await User.create({ name: phone, phone });
  }

  return user; // حالا user.name واقعی است
}
