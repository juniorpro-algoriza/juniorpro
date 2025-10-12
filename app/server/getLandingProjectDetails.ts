export const getLandingProjectDetails = async (id: string) => {
  const apiRootUrl = process.env.API_ROOT_URL as string;
  const url = `landing-home-page/project-details/${Number(id)}`;
  const method = "GET";

  try {
    const finalUrl = `${apiRootUrl}/${url}`;
    const res = await fetch(finalUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`Request failed: ${res.status}`);

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};
