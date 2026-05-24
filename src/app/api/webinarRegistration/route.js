
// import ConnectToDB from "@/configs/db";
// import WebinarRegistration from '@/models/webinarRegistration';
// import mongoose from "mongoose";
// import { authUser } from '@/utils/serverHelpers';

// export async function POST(req) {
//     await ConnectToDB();
//     const currentUser = await authUser(); 
//     if (!currentUser) {
//         return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
//     }
//     try {
//         const body = await req.json();
//         const { webinarName, link, date, hour, price, userId } = body;

//         if (!webinarName || !link || !date || !hour) {
//             return new Response(JSON.stringify({ message: "فیلدهای لازم ارسال نشده" }), {
//                 status: 400,
//                 headers: { "Content-Type": "application/json" },
//             });
//         }

//         const payload = {
//             webinarName: String(webinarName).trim(),
//             link: String(link).trim(),
//             date: new Date(date),
//             hour: String(hour).trim(),
//             price: price !== undefined ? Number(price) : 0,
//             userId: new mongoose.Types.ObjectId(currentUser._id), 
//         };

//         const created = await WebinarRegistration.create(payload);
//         return new Response(JSON.stringify({ message: "وبینار ایجاد شد", data: created }), {
//             status: 201,
//             headers: { "Content-Type": "application/json" },
//         });
//     } catch (err) {
//         console.error("POST /api/webinarRegistration error:", err);
//         return new Response(JSON.stringify({ message: err.message }), {
//             status: 500,
//             headers: { "Content-Type": "application/json" },
//         });
//     }
// }

// export async function GET(req) {
//     await ConnectToDB();
//     try {
//         const { searchParams } = new URL(req.url);
//         const userId = searchParams.get("userId");
//         const id = searchParams.get("id");

//         const query = {};
//         if (userId) query.userId = new mongoose.Types.ObjectId(String(userId));
//         if (id) query._id = new mongoose.Types.ObjectId(String(id));

//         const regs = await WebinarRegistration.find(query).sort({ date: -1 }).lean();
//         return new Response(JSON.stringify({ message: "لیست وبینارها", data: regs }), {
//             status: 200,
//             headers: { "Content-Type": "application/json" },
//         });
//     } catch (err) {
//         console.error("GET /api/webinarRegistration error:", err);
//         return new Response(JSON.stringify({ message: err.message }), {
//             status: 500,
//             headers: { "Content-Type": "application/json" },
//         });
//     }
// }

// export async function PUT(req) {
//     await ConnectToDB();
//     try {
//         const body = await req.json();
//         const { id, webinarName, link, date, hour, price, userId } = body;
//         if (!id) return new Response(JSON.stringify({ message: "شناسه وبینار مشخص نشده" }), { status: 400, headers: { "Content-Type": "application/json" } });

//         const update = {};
//         if (webinarName !== undefined) update.webinarName = String(webinarName).trim();
//         if (link !== undefined) update.link = String(link).trim();
//         if (date !== undefined) update.date = new Date(date);
//         if (hour !== undefined) update.hour = String(hour).trim();
//         if (price !== undefined) update.price = Number(price);
//         if (userId !== undefined) update.userId = userId ? new mongoose.Types.ObjectId(String(userId)) : undefined;

//         const updated = await WebinarRegistration.findByIdAndUpdate(id, update, { new: true }).lean();
//         if (!updated) return new Response(JSON.stringify({ message: "وبینار پیدا نشد" }), { status: 404, headers: { "Content-Type": "application/json" } });

//         return new Response(JSON.stringify({ message: "وبینار به‌روزرسانی شد", data: updated }), {
//             status: 200,
//             headers: { "Content-Type": "application/json" },
//         });
//     } catch (err) {
//         console.error("PUT /api/webinarRegistration error:", err);
//         return new Response(JSON.stringify({ message: err.message }), {
//             status: 500,
//             headers: { "Content-Type": "application/json" },
//         });
//     }
// }

// export async function DELETE(req) {
//     await ConnectToDB();
//     try {
//         const { searchParams } = new URL(req.url);
//         const id = searchParams.get("id");
//         if (!id) return new Response(JSON.stringify({ message: "شناسه وبینار مشخص نشده" }), { status: 400, headers: { "Content-Type": "application/json" } });

//         const deleted = await WebinarRegistration.findByIdAndDelete(id).lean();
//         if (!deleted) return new Response(JSON.stringify({ message: "وبینار پیدا نشد" }), { status: 404, headers: { "Content-Type": "application/json" } });

//         return new Response(JSON.stringify({ message: "وبینار حذف شد", data: deleted }), {
//             status: 200,
//             headers: { "Content-Type": "application/json" },
//         });
//     } catch (err) {
//         console.error("DELETE /api/webinarRegistration error:", err);
//         return new Response(JSON.stringify({ message: err.message }), {
//             status: 500,
//             headers: { "Content-Type": "application/json" },
//         });
//     }
// }


import ConnectToDB from "@/configs/db";
import WebinarRegistration from '@/models/webinarRegistration';
import mongoose from "mongoose";
import { authUser } from '@/utils/serverHelpers';

export async function POST(req) {
    await ConnectToDB();
    const currentUser = await authUser(); 
    if (!currentUser) {
        return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }
    try {
        const body = await req.json();
        const { webinarName, link, date, hour, price, img } = body;

        if (!webinarName || !link || !date || !hour) {
            return new Response(JSON.stringify({ message: "فیلدهای لازم ارسال نشده" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const payload = {
            webinarName: String(webinarName).trim(),
            link: String(link).trim(),
            date: new Date(date),
            hour: String(hour).trim(),
            price: price !== undefined ? Number(price) : 0,
            img: img ? String(img).trim() : undefined,
            userId: new mongoose.Types.ObjectId(currentUser._id), 
        };

        const created = await WebinarRegistration.create(payload);
        return new Response(JSON.stringify({ message: "وبینار ایجاد شد", data: created }), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("POST /api/webinarRegistration error:", err);
        return new Response(JSON.stringify({ message: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function GET(req) {
    await ConnectToDB();
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");
        const id = searchParams.get("id");

        const query = {};
        if (userId) query.userId = new mongoose.Types.ObjectId(String(userId));
        if (id) query._id = new mongoose.Types.ObjectId(String(id));

        const regs = await WebinarRegistration.find(query).sort({ date: -1 }).lean();
        return new Response(JSON.stringify({ message: "لیست وبینارها", data: regs }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("GET /api/webinarRegistration error:", err);
        return new Response(JSON.stringify({ message: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function PUT(req) {
    await ConnectToDB();
    try {
        const body = await req.json();
        const { id, webinarName, link, date, hour, price, userId, img } = body;
        if (!id) return new Response(JSON.stringify({ message: "شناسه وبینار مشخص نشده" }), { status: 400, headers: { "Content-Type": "application/json" } });

        const update = {};
        if (webinarName !== undefined) update.webinarName = String(webinarName).trim();
        if (link !== undefined) update.link = String(link).trim();
        if (date !== undefined) update.date = new Date(date);
        if (hour !== undefined) update.hour = String(hour).trim();
        if (price !== undefined) update.price = Number(price);
        if (img !== undefined) update.img = String(img).trim();
        if (userId !== undefined) update.userId = userId ? new mongoose.Types.ObjectId(String(userId)) : undefined;

        const updated = await WebinarRegistration.findByIdAndUpdate(id, update, { new: true }).lean();
        if (!updated) return new Response(JSON.stringify({ message: "وبینار پیدا نشد" }), { status: 404, headers: { "Content-Type": "application/json" } });

        return new Response(JSON.stringify({ message: "وبینار به‌روزرسانی شد", data: updated }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("PUT /api/webinarRegistration error:", err);
        return new Response(JSON.stringify({ message: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function DELETE(req) {
    await ConnectToDB();
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return new Response(JSON.stringify({ message: "شناسه وبینار مشخص نشده" }), { status: 400, headers: { "Content-Type": "application/json" } });

        const deleted = await WebinarRegistration.findByIdAndDelete(id).lean();
        if (!deleted) return new Response(JSON.stringify({ message: "وبینار پیدا نشد" }), { status: 404, headers: { "Content-Type": "application/json" } });

        return new Response(JSON.stringify({ message: "وبینار حذف شد", data: deleted }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("DELETE /api/webinarRegistration error:", err);
        return new Response(JSON.stringify({ message: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
