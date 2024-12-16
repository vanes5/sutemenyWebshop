interface ApiResponse {
    message: string;
  }
  
  const API_URL = 'http://localhost:3000';


  export const updateProfile = async (newUsername: string, newPassword: string): Promise<any> => {
    const response = await fetch(`${API_URL}/editprofile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: newUsername, password: newPassword }),
      credentials: 'include', // Ensure the session is sent with the request
    });
  
    if (!response.ok) {
      const errorData = await response.json(); // Get the error message from the response
      throw new Error(errorData.message || 'Failed to update profile');
    }
  
    return await response.json();
  };

  export const profile = async () =>{
    const response = await fetch(`${API_URL}/profile`, {
      method: 'GET',
      credentials: 'include'
    });
    if(!response.ok){
      const errorData: ApiResponse =  await response.json();
      throw new Error(errorData.message);
    }
    const responseData = await response.json();
    console.log(responseData)
    return responseData;
  }

  export const products = async ()=>{
    const response = await fetch( `${API_URL}/products`, {
      method: 'GET',
      credentials: 'include',
    });

    if(!response.ok){
      const errorData: ApiResponse = await response.json()
      throw new Error(errorData.message);
    }
    const responseData = await response.json();
    return responseData
  }
  
  export const register = async (username: string, password: string): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    });
    if (!response.ok) {
      const errorData : ApiResponse = await response.json()
      throw new Error(errorData.message);
    }
    return await response.json();
  };
  
  export const login = async (username: string, password: string): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    });
    if (!response.ok) {
      const errorData : ApiResponse = await response.json()
      throw new Error(errorData.message);
    }
    return await response.json();
  };
  
  export const logout = async (): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Logout failed');
    }
    return await response.json();
  };

  export const checkAuthStatus = async (): Promise<any> => {
    const response = await fetch(`${API_URL}/check-auth`, {
      method: 'GET',
      credentials: 'include',
    });
  
    if (!response.ok) {
      throw new Error('Not authenticated');
    }
    return await response.json();
  };
  