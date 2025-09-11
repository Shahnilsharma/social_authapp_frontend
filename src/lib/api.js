export async function registerTestUser(userData) {
  try {
    const res = await fetch("http://localhost:5000/api/auth/test-register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    return { success: false, error: error.message };
  }
}
