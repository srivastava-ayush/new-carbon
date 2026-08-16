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

  if (response.status === 401) {
    // Do not force redirect if we are actively trying to log in or register
    if (!endpoint.includes("/auth/login") && !endpoint.includes("/auth/register")) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("universityId");
        window.location.href = "/login";
      }
      throw new Error("Session expired. Please log in again.");
    } else {
      // For login/register failures, just throw the error so the UI can catch it
      throw new Error(data.message || "Invalid credentials");
    }
  }

  if (!response.ok) {
    throw new Error(data.message || `API error: ${response.status}`);
  }

  return data;
}



// Activity Data APIs
export async function getActivityData() {
  const uId = typeof window !== "undefined" ? localStorage.getItem("universityId") || "" : "";
  const pId = typeof window !== "undefined" ? localStorage.getItem("reportingPeriodId") || "" : "";
  const query = `?universityId=${uId}${pId ? `&reportingPeriodId=${pId}` : ""}`;
  return fetchAPI(`/activity-data${query}`);
}

export async function createActivityData(data: any) {
  const uId = typeof window !== "undefined" ? localStorage.getItem("universityId") || "" : "";
  const pId = data.reportingPeriodId || (typeof window !== "undefined" ? localStorage.getItem("reportingPeriodId") || "" : "");
  return fetchAPI(`/activity-data`, {
    method: "POST",
    body: JSON.stringify({ ...data, universityId: uId, reportingPeriodId: pId }),
  });
}

export async function updateActivityData(id: string, data: any) {
  return fetchAPI(`/activity-data/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteActivityData(id: string) {
  return fetchAPI(`/activity-data/${id}`, {
    method: "DELETE",
  });
}

export async function submitActivityData(id: string) {
  return fetchAPI(`/activity-data/${id}/submit`, { method: "POST" });
}

export async function startReviewActivityData(id: string) {
  return fetchAPI(`/activity-data/${id}/start-review`, { method: "POST" });
}

export async function verifyActivityData(id: string) {
  return fetchAPI(`/activity-data/${id}/verify`, { method: "POST" });
}

export async function rejectActivityData(id: string, reason: string) {
  return fetchAPI(`/activity-data/${id}/reject`, {
    method: "POST",
    body: JSON.stringify({ reason }),
  });
}

// ==========================================
// CALCULATIONS API
// ==========================================
export async function calculateEmissions(activityId: string) {
  return fetchAPI(`/calculations/activity/${activityId}`, { method: "POST" });
}

// ==========================================
// DASHBOARD API
// ==========================================
export async function getDashboardSummary(universityId?: string, reportingPeriodId?: string) {
  const uId = universityId || (typeof window !== "undefined" ? localStorage.getItem("universityId") || "" : "");
  const pId = reportingPeriodId || (typeof window !== "undefined" ? localStorage.getItem("reportingPeriodId") || "" : "");
  
  let url = `/dashboard/summary?universityId=${uId}`;
  if (pId) url += `&reportingPeriodId=${pId}`;
  return fetchAPI(url);
}

export async function getReviewActivities() {
  const uId = typeof window !== "undefined" ? localStorage.getItem("universityId") || "" : "";
  const pId = typeof window !== "undefined" ? localStorage.getItem("reportingPeriodId") || "" : "";
  const query = `?universityId=${uId}${pId ? `&reportingPeriodId=${pId}` : ""}`;
  return fetchAPI(`/activity-data/review${query}`);
}



// Import APIs
export async function downloadImportTemplate() {
  const uId = typeof window !== "undefined" ? localStorage.getItem("universityId") || "" : "";
  // Return URL so user can open in new tab
  return `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/activity-data/import/template?universityId=${uId}`;
}

export async function previewImport(file: File) {
  const uId = typeof window !== "undefined" ? localStorage.getItem("universityId") || "" : "";
  const formData = new FormData();
  formData.append("file", file);
  formData.append("universityId", uId);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers = new Headers();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/activity-data/import/preview`, {
    method: "POST",
    headers,
    body: formData,
  });
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to preview import");
  }
  return res.json();
}

export async function confirmImport(importJobId: string, validData: any[]) {
  const uId = typeof window !== "undefined" ? localStorage.getItem("universityId") || "" : "";
  const pId = typeof window !== "undefined" ? localStorage.getItem("reportingPeriodId") || "" : "";
  return fetchAPI(`/activity-data/import/confirm`, {
    method: "POST",
    body: JSON.stringify({ importJobId, universityId: uId, reportingPeriodId: pId, validData }),
  });
}

// Document APIs
export async function uploadDocument(file: File, documentType: string) {
  const uId = typeof window !== "undefined" ? localStorage.getItem("universityId") || "" : "";
  const formData = new FormData();
  formData.append("file", file);
  formData.append("universityId", uId);
  formData.append("documentType", documentType);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers = new Headers();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/documents/upload`, {
    method: "POST",
    headers,
    body: formData,
  });
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to upload document");
  }
  return res.json();
}

export async function getDocuments() {
  const uId = typeof window !== "undefined" ? localStorage.getItem("universityId") || "" : "";
  return fetchAPI(`/documents?universityId=${uId}`);
}

export async function ocrDocument(id: string) {
  return fetchAPI(`/documents/${id}/ocr`, { method: "POST" });
}

export async function createActivityFromDocument(id: string, data: any) {
  const uId = typeof window !== "undefined" ? localStorage.getItem("universityId") || "" : "";
  const pId = typeof window !== "undefined" ? localStorage.getItem("reportingPeriodId") || "" : "";
  return fetchAPI(`/documents/${id}/create-activity`, {
    method: "POST",
    body: JSON.stringify({ ...data, universityId: uId, reportingPeriodId: pId }),
  });
}

// Reporting Periods APIs
export async function getReportingPeriods() {
  const uId = typeof window !== "undefined" ? localStorage.getItem("universityId") || "" : "";
  return fetchAPI(`/reporting-periods?universityId=${uId}`);
}

export async function createReportingPeriod(data: any) {
  const uId = typeof window !== "undefined" ? localStorage.getItem("universityId") || "" : "";
  return fetchAPI(`/reporting-periods`, {
    method: "POST",
    body: JSON.stringify({ ...data, universityId: uId }),
  });
}

export async function openReportingPeriod(id: string) {
  return fetchAPI(`/reporting-periods/${id}/open`, { method: "POST" });
}

export async function lockReportingPeriod(id: string) {
  return fetchAPI(`/reporting-periods/${id}/lock`, { method: "POST" });
}

export async function setBaselineReportingPeriod(id: string) {
  return fetchAPI(`/reporting-periods/${id}/set-baseline`, { method: "POST" });
}



// Baselines APIs
export async function getBaselines() {
  const uId = typeof window !== "undefined" ? localStorage.getItem("universityId") || "" : "";
  return fetchAPI(`/baselines?universityId=${uId}`);
}

export async function createBaseline(data: any) {
  const uId = typeof window !== "undefined" ? localStorage.getItem("universityId") || "" : "";
  return fetchAPI(`/baselines`, {
    method: "POST",
    body: JSON.stringify({ ...data, universityId: uId })
  });
}

export async function lockBaseline(id: string) {
  return fetchAPI(`/baselines/${id}/lock`, { method: "POST" });
}

export async function approveBaseline(id: string) {
  return fetchAPI(`/baselines/${id}/approve`, { method: "POST" });
}

export async function getBaselineComparison(id: string) {
  return fetchAPI(`/baselines/${id}/comparison`);
}

// Targets APIs
export async function getTargets() {
  const uId = typeof window !== "undefined" ? localStorage.getItem("universityId") || "" : "";
  return fetchAPI(`/targets?universityId=${uId}`);
}

export async function createTarget(data: any) {
  const uId = typeof window !== "undefined" ? localStorage.getItem("universityId") || "" : "";
  return fetchAPI(`/targets`, {
    method: "POST",
    body: JSON.stringify({ ...data, universityId: uId })
  });
}

export async function getTargetProgress(targetId: string, reportingPeriodId: string) {
  return fetchAPI(`/targets/${targetId}/progress?reportingPeriodId=${reportingPeriodId}`);
}

// Emission Factors APIs
export async function getEmissionFactors() {
  const uId = typeof window !== "undefined" ? localStorage.getItem("universityId") || "" : "";
  return fetchAPI(`/emission-factors?universityId=${uId}`);
}

// Admin Management APIs
export async function getCampuses() {
  const uId = typeof window !== "undefined" ? localStorage.getItem("universityId") || "" : "";
  return fetchAPI(`/campuses?universityId=${uId}`);
}

export async function getBuildings() {
  const uId = typeof window !== "undefined" ? localStorage.getItem("universityId") || "" : "";
  return fetchAPI(`/buildings?universityId=${uId}`);
}

export async function getFloors() {
  const uId = typeof window !== "undefined" ? localStorage.getItem("universityId") || "" : "";
  return fetchAPI(`/floors?universityId=${uId}`);
}

export async function getAssets() {
  const uId = typeof window !== "undefined" ? localStorage.getItem("universityId") || "" : "";
  return fetchAPI(`/assets?universityId=${uId}`);
}

// Data Quality APIs
export async function getDataQualityMetrics(filters?: {
  reportingPeriodId?: string;
  scope?: string;
  category?: string;
}) {
  const uId = typeof window !== "undefined" ? localStorage.getItem("universityId") || "" : "";
  const params = new URLSearchParams({ universityId: uId });
  if (filters?.reportingPeriodId) params.set("reportingPeriodId", filters.reportingPeriodId);
  if (filters?.scope) params.set("scope", filters.scope);
  if (filters?.category) params.set("category", filters.category);
  return fetchAPI(`/data-quality/metrics?${params.toString()}`);
}

// Recommendations APIs
export async function getRecommendations(filters?: {
  priority?: string;
  category?: string;
  status?: string;
}) {
  const uId = typeof window !== "undefined" ? localStorage.getItem("universityId") || "" : "";
  const params = new URLSearchParams({ universityId: uId });
  if (filters?.priority) params.set("priority", filters.priority);
  if (filters?.category) params.set("category", filters.category);
  if (filters?.status) params.set("status", filters.status);
  return fetchAPI(`/recommendations?${params.toString()}`);
}

export async function getRecommendationById(id: string) {
  return fetchAPI(`/recommendations/${id}`);
}

export async function updateRecommendationStatus(id: string, status: string) {
  return fetchAPI(`/recommendations/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function generateRecommendations() {
  const uId = typeof window !== "undefined" ? localStorage.getItem("universityId") || "" : "";
  const pId = typeof window !== "undefined" ? localStorage.getItem("reportingPeriodId") || "" : "";
  return fetchAPI(`/recommendations/generate`, {
    method: "POST",
    body: JSON.stringify({ universityId: uId, reportingPeriodId: pId }),
  });
}

// Notifications APIs
export async function getNotifications(filters?: { isRead?: boolean; type?: string }) {
  const uId = typeof window !== "undefined" ? localStorage.getItem("universityId") || "" : "";
  const params = new URLSearchParams({ universityId: uId });
  if (filters?.isRead !== undefined) params.set("isRead", String(filters.isRead));
  if (filters?.type) params.set("type", filters.type);
  return fetchAPI(`/notifications?${params.toString()}`);
}

export async function getUnreadNotificationsCount() {
  const uId = typeof window !== "undefined" ? localStorage.getItem("universityId") || "" : "";
  return fetchAPI(`/notifications/unread-count?universityId=${uId}`);
}

export async function markNotificationAsRead(id: string) {
  return fetchAPI(`/notifications/${id}/read`, { method: "PATCH" });
}

export async function markAllNotificationsAsRead() {
  return fetchAPI(`/notifications/read-all`, { method: "PATCH" });
}

// Audit Logs APIs
export async function getAuditLogs(filters?: {
  userId?: string;
  action?: string;
  entity?: string;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}) {
  const uId = typeof window !== "undefined" ? localStorage.getItem("universityId") || "" : "";
  const params = new URLSearchParams();
  if (uId) params.set("universityId", uId);
  
  if (filters?.userId) params.set("userId", filters.userId);
  if (filters?.action && filters.action !== "ALL") params.set("action", filters.action);
  if (filters?.entity && filters.entity !== "ALL") params.set("entity", filters.entity);
  if (filters?.from) params.set("from", filters.from);
  if (filters?.to) params.set("to", filters.to);
  if (filters?.page) params.set("page", String(filters.page));
  if (filters?.limit) params.set("limit", String(filters.limit));
  
  return fetchAPI(`/audit-logs?${params.toString()}`);
}

// Admin / Users APIs
export async function getUsers() {
  return fetchAPI(`/users`);
}

export async function createUser(data: any) {
  return fetchAPI(`/users`, { method: "POST", body: JSON.stringify(data) });
}

export async function updateUser(id: string, data: any) {
  return fetchAPI(`/users/${id}`, { method: "PATCH", body: JSON.stringify(data) });
}

// Admin / University APIs
export async function updateUniversity(id: string, data: any) {
  return fetchAPI(`/universities/${id}`, { method: "PATCH", body: JSON.stringify(data) });
}

// Admin / Campus & Building APIs
export async function createCampus(data: any) {
  return fetchAPI(`/campuses`, { method: "POST", body: JSON.stringify(data) });
}
export async function deleteCampus(id: string) {
  return fetchAPI(`/campuses/${id}`, { method: "DELETE" });
}
export async function createBuilding(data: any) {
  return fetchAPI(`/buildings`, { method: "POST", body: JSON.stringify(data) });
}
export async function deleteBuilding(id: string) {
  return fetchAPI(`/buildings/${id}`, { method: "DELETE" });
}
