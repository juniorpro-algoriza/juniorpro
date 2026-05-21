import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();

  // Build query params from FormData fields
  const params = new URLSearchParams();
  const challengeId = formData.get("ChallengeId");
  const projectLink = formData.get("ProjectLink");
  const additionalNotes = formData.get("AdditionalNotes");
  if (challengeId) params.append("ChallengeId", challengeId as string);
  if (projectLink) params.append("ProjectLink", projectLink as string);
  if (additionalNotes)
    params.append("AdditionalNotes", additionalNotes as string);

  const backendUrl = `${process.env.API_ROOT_URL || ""}/api/junior-challenge/submit?${params.toString()}`;

  // Forward file if present
  const backendFormData = new FormData();
  const file = formData.get("File");
  if (file) {
    backendFormData.append("File", file);
  }

  const response = await fetch(backendUrl, {
    method: "PUT",
    body: file ? backendFormData : undefined,
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
