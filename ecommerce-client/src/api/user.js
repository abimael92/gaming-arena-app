import { ENV, authFetch } from "@/utils";

export class User {
  async getMe() {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS_ME}`;
      console.log('Fetching from:', url);

      const response = await authFetch(url);

      if (!response) {
        throw new Error('No response from server');
      }

      console.log('Response status:', response.status); // Debug log

      const result = await response.json();
      console.log('User data:', result);

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      console.error('Error in getMe:', error);
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS}`;
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateMe(userId, data) {
    try {
      const url = `${ENV.API_URL} /${ENV.ENDPOINTS.USERS}/${userId} `;

      const params = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const response = await authFetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async createUser(data) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS}`;

      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const response = await authFetch(url, params);
      const result = await response.json();

      if (response.status !== 200) {
        throw new Error(JSON.stringify(result.error)); // Ensure error object contains details
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userId, data) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS}/${userId}`;

      const params = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const response = await authFetch(url, params);
      const result = await response.json();

      if (response.status !== 200) {
        throw new Error(getErrorMessage(result));
      }

      return result;
    } catch (error) {
      throw error;
    }
  }
}

