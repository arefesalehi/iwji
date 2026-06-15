
import ConnectToDB from '@/configs/db';
import Article from '@/models/article';
import { authUser } from '@/utils/serverHelpers';
import { writeFile, mkdir, rm } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    await ConnectToDB();
    const articles = await Article.find({})
      .populate('creator', 'name email')
      .populate('categoryID', 'name')
      .select('-__v')
      .lean();
    return new Response(JSON.stringify(articles), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'خطا در دریافت مقالات' }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    await ConnectToDB();
    const user = await authUser();
    if (!user) return new Response(JSON.stringify({ message: 'وارد نشده‌اید' }), { status: 401 });

    const formData = await req.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const categoryID = formData.get('categoryID');
    const articlebody = formData.get('articlebody');
    const shortName = formData.get('shortName');
    const publish = formData.get('publish') === 'true';

    if (!title || !description || !categoryID || !articlebody || !shortName)
      return new Response(JSON.stringify({ message: 'تمامی فیلدهای ضروری را پر کنید' }), { status: 400 });

    let imgPath = null;
    let folderName = null;

    const imgFile = formData.get('img');
    if (imgFile && imgFile.size > 0) {
      folderName = Date.now().toString();
      const uploadDir = path.join(process.cwd(), 'public', 'articles', folderName);
      await mkdir(uploadDir, { recursive: true });
      const fileName = `cover-${folderName}${path.extname(imgFile.name)}`;
      const buffer = Buffer.from(await imgFile.arrayBuffer());
      await writeFile(path.join(uploadDir, fileName), buffer);
      imgPath = `/articles/${folderName}/${fileName}`;
    }

    const newArticle = await Article.create({
      title,
      description,
      articlebody,
      shortName,
      categoryID,
      publish,
      img: imgPath,
      folderName,
      creator: user._id
    });

    return new Response(JSON.stringify({ message: 'مقاله ایجاد شد', data: newArticle }), { status: 201 });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'خطای سرور' }), { status: 500 });
  }
}
