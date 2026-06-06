import { NextResponse } from "next/server";
import Checkout from "@/models/checkout";
import { verifyPayment } from "@/utils/zarinpal";

export const GET = async (req) => {
  try {
    const { searchParams } = req.nextUrl;
    const { Authority: authority, Status } = Object.fromEntries(
      searchParams.entries()
    );

    const checkout = await Checkout.findOne({ authority });
    if (!checkout) {
      return NextResponse.json(
        { message: "Checkout not found !!" },
        { status: 404 }
      );
    }

    const payment = await verifyPayment({
      amountInRial: checkout.totalPrice,
      authority,
    });

    if (![100, 101].includes(payment.data.code)) {
      return NextResponse.json(
        { message: "Payment not verified !!" },
        { status: 400 }
      );
    }

    await Checkout.deleteOne({
      _id: checkout._id,
    });

    //TODO -> Create Order

    return NextResponse.json(
      { message: "Payment verified and order created successfully :))" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "Internal Server Error !!",
        error: err?.message,
      },
      { status: 500 }
    );
  }
};

// Cart
// Checkout -> Remove
// Order -> Stock -= 5
