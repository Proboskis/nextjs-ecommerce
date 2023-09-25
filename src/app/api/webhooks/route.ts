import Stripe from "stripe";
import {headers} from "next/headers";
import {NextResponse} from "next/server";

import {stripe} from "@/lib/stripe";
import prismaDatabase from "@/lib/prismadb";

export async function POST(request: Request) {

  // we are not requesting request.json() because this is a webhook, and this is a special case
  const body = await request.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: NextResponse) {
    return new NextResponse(`Webhook error: ${error.message}`, {status: 400});
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const address = session?.customer_details?.address;

  // these are all the fields regarding the address on the stripe checkout page
  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country
  ];

  const addressString = addressComponents.filter(component => component !== null).join(", ");

  if (event.type === "checkout.session.completed") {
    const order = await prismaDatabase.order.update({
      where: {
        id: session?.metadata?.orderId
      },
      data: {
        isPaid: true,
        address: addressString,
        phone: session?.customer_details?.phone || ""
      },
      include: {
        orderItems: true
      }
    });

    const productIds = order.orderItems.map(orderItem => orderItem.productId);

    await prismaDatabase.product.updateMany({
      where: {
        id: {
          in: [...productIds]
        }
      },
      data: {
        isArchived: true
      }
    });
  }

  return new NextResponse(null, {status: 200});
}