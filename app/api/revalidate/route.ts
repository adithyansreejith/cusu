import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

const secret = process.env.PRISMIC_REVALIDATE_SECRET;

export async function POST(request: NextRequest) {
  if (secret) {
    const body = await request.json().catch(() => ({}));
    if (body.secret !== secret) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }
  }

  try {
    await revalidateTag("prismic", "max");
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    return NextResponse.json(
      { revalidated: false, error: String(error) },
      { status: 500 }
    );
  }
}
