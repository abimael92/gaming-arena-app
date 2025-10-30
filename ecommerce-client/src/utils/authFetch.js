import { Token } from "@/api";

export async function authFetch(url, params) {
  const tokenCtrl = new Token();
  const token = tokenCtrl.getToken();

  const logout = () => {
    tokenCtrl.removeToken();
    window.location.replace("/");
  };

  if (!token) {
    logout();
    return;
  } else {
    if (tokenCtrl.hasExpired(token)) {
      logout();
      return;
    } else {
      const paramsTemp = {
        ...params,
        headers: {
          ...params?.headers,
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(url, paramsTemp);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response;

      } catch (error) {
        console.error('Fetch error:', error);
        return error;
      }
    }
  }
}
