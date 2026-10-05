import { NextResponse } from "next/server";
import { getProfile } from "@/lib/auth";
import { db } from "@/db";
import { customers } from "@/db/schema";
import { eq } from "drizzle-orm";

const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	const profile = await getProfile(_request);

	if (!profile) {
		return NextResponse.json(
			{ error: "Authentication required" },
			{ status: 401, headers: corsHeaders },
		);
	}

	const { id } = await params;
	const [row] = await db.select().from(customers).where(eq(customers.id, id));

	if (!row) {
		return NextResponse.json(
			{ error: "Customer not found" },
			{ status: 404, headers: corsHeaders },
		);
	}

	return NextResponse.json({ ...row, balance: Number(row.balance) }, { headers: corsHeaders });
}

export function OPTIONS() {
	return new NextResponse(null, { status: 204, headers: corsHeaders });
}
