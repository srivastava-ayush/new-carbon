const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers = new Headers(options.headers || {});
  
  headers.set("Content-Type", "application/json");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch (err) {
    data = { message: text };
  }

  if (!response.ok) {
    throw new Error(data.message || `API error: ${response.status}`);
  }

  return data;
}

// Hardcoded for development - should be dynamic in a real app
export async function getDashboardSummary(universityId?: string, reportingPeriodId?: string) {
  const uId = universityId || (typeof window !== "undefined" ? localStorage.getItem("universityId") || "" : "");
  const pId = reportingPeriodId || (typeof window !== "undefined" ? localStorage.getItem("reportingPeriodId") || "" : "");
  
  if (!uId || !pId) {
    return { success: false, message: "Missing universityId or reportingPeriodId. Please log in or provide them in the URL." };
  }
  const query = `?universityId=${uId}&reportingPeriodId=${pId}`;
  return fetchAPI(`/dashboard/summary${query}`);
}
