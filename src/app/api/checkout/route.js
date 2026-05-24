import { NextResponse } from "next/server";
import { createPayment } from "../../../../utils/zarinpal";
import Checkout from '@/models/checkout';
import connectToDB from "../../../../utils/db";

export const POST = async (req) => {
  connectToDB();
  const body = await req.json();
  const { totalPrice } = body;

  //* -> Auth User -> Cart -> TotalPrice -> Payment

  const payment = await createPayment({
    amountInRial: totalPrice,
    description: "پرداخت با شناسه 99812",
    mobile: "09921558293",
  });

  const checkout = await Checkout.create({
    totalPrice,
    authority: payment.authority,
  });

  return NextResponse.json(
    {
      message: "Checkout created successfully :))",
      checkout,
      paymentUrl: payment.paymentUrl,
    },
    { status: 201 }
  );
};
