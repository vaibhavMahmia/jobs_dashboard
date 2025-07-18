export const fetchJobs = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${baseUrl}/api/jobs/fetch`);
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
};
