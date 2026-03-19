import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Forward query params
  const { searchParams } = new URL(request.url);
  const backendUrl = `${process.env.API_ROOT_URL || ""}/api/junior-collaboration/submit-task?${searchParams.toString()}`;

  // Forward the FormData body as-is
  const formData = await request.formData();
  const backendFormData = new FormData();
  const file = formData.get("File");
  if (file) {
    backendFormData.append("File", file);
  }

  const response = await fetch(backendUrl, {
    method: "PUT",
    body: backendFormData,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const text = await response.text();
    return NextResponse.json(
      { error: text || response.statusText },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
