// Cache utility for categories
export const getCachedCategories = async (
  fetchFunction,
  cacheKey = "categories",
  maxAge = 24 * 60 * 60 * 1000
) => {
  const cachedData = localStorage.getItem(cacheKey);

  if (cachedData) {
    const { timestamp, data } = JSON.parse(cachedData);

    // Check if cache is still valid
    if (Date.now() - timestamp < maxAge) {
      return data;
    }
  }

  // Fetch fresh data if no valid cache exists
  try {
    const freshData = await fetchFunction();

    // Store in localStorage with timestamp
    localStorage.setItem(
      cacheKey,
      JSON.stringify({
        timestamp: Date.now(),
        data: freshData,
      })
    );

    return freshData;
  } catch (error) {
    // Fallback to cached data if fetch fails
    if (cachedData) {
      const { data } = JSON.parse(cachedData);
      return data;
    }
    throw error;
  }
};
