function getHealth() {
  return {
    status: "ok",
    message: "The server is running",
  };
}

export const healthService = {
  getHealth,
};