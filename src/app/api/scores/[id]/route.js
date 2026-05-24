// /app/api/scores/[id]/route.js
import ConnectToDB from '@/configs/db';
import Score from '@/models/score';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
  try {
    await ConnectToDB();

    const { id } = params;

    const score = await Score.findById(id);
    if (!score) {
      return NextResponse.json(
        { message: 'نمره یافت نشد' },
        { status: 404 }
      );
    }

    await Score.deleteOne({ _id: id });

    return NextResponse.json({ message: 'نمره با موفقیت حذف شد' }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: 'خطا در حذف نمره', error: err.message },
      { status: 500 }
    );
  }
}
