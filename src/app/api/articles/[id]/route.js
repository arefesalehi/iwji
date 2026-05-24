



import ConnectToDB from '@/configs/db';
import Article from '@/models/article';
import { authUser } from '@/utils/serverHelpers';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { rm } from 'fs/promises';

export const config = { api: { bodyParser: false } };

// دریافت یک مقاله
export async function GET(req, { params }) {
  try {
    await ConnectToDB();
    const { id } = params;
    const article = await Article.findById(id)
      .populate('creator', 'name email')
      .populate('categoryID', 'name')
      .select('-__v')
      .lean();
    if (!article) return new Response(JSON.stringify({ message: 'مقاله یافت نشد' }), { status: 404 });
    return new Response(JSON.stringify(article), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'خطای سرور' }), { status: 500 });
  }
}


export async function PUT(req, { params }) {
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
    const imgFile = formData.get('img');

    let updateData = { title, description, categoryID, articlebody, shortName, publish };

    // آپلود تصویر
    if (imgFile && imgFile.size > 0) {
      const folderName = Date.now().toString();
      const uploadDir = path.join(process.cwd(), 'public', 'articles', folderName);
      await mkdir(uploadDir, { recursive: true });

      const fileName = `cover-${folderName}${path.extname(imgFile.name)}`;
      const buffer = Buffer.from(await imgFile.arrayBuffer());
      await writeFile(path.join(uploadDir, fileName), buffer);

      updateData.img = `/articles/${folderName}/${fileName}`;
      updateData.folderName = folderName;

      // حذف تصویر قبلی اگر وجود دارد
      const existingArticle = await Article.findById(params.id);
      if (existingArticle?.folderName) {
        const oldFolder = path.join(process.cwd(), 'public', 'articles', existingArticle.folderName);
        await rm(oldFolder, { recursive: true, force: true });
      }
    }

    const updatedArticle = await Article.findByIdAndUpdate(params.id, updateData, { new: true });
    if (!updatedArticle) return new Response(JSON.stringify({ message: 'مقاله یافت نشد' }), { status: 404 });

    return new Response(JSON.stringify({ message: 'مقاله بروز شد', data: updatedArticle }), { status: 200 });

  } catch (err) {
    console.error('PUT Article error:', err);
    return new Response(JSON.stringify({ message: 'خطای سرور' }), { status: 500 });
  }
}


// حذف مقاله
export async function DELETE(req, { params }) {
  try {
    await ConnectToDB();
    const user = await authUser();
    if (!user) return new Response(JSON.stringify({ message: 'وارد نشده‌اید' }), { status: 401 });

    const { id } = params;
    const article = await Article.findById(id);
    if (!article) return new Response(JSON.stringify({ message: 'مقاله یافت نشد' }), { status: 404 });

    if (article.folderName) {
      const folderPath = path.join(process.cwd(), 'public', 'articles', article.folderName);
      await rm(folderPath, { recursive: true, force: true });
    }

    await Article.findByIdAndDelete(id);
    return new Response(JSON.stringify({ message: 'مقاله حذف شد' }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'خطای سرور' }), { status: 500 });
  }
}

