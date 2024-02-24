import { defineStore } from 'pinia'
import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies();
export const login_state = defineStore('login_state', () => {

  let session_data = {} as { Client_Session_Token: string, Client_ID_Value: number };
  let login_status: boolean;

  const save_response = (resp: any): boolean => {
    const err: number = set_resp_cookie(resp);
    //if the cookie was set without errors, it will assign the object to the global variable and return true.
    //otherwise returns false and the login attempt will fail.
    if (err === -1) {
      return false;
    }
    session_data = resp;
    return true;
  }

  const set_resp_cookie = (resp: any): number => {
    //saving the token in a cookie with a super long expiry
    const date: Date = new Date();
    date.setFullYear(date.getFullYear() + 100);
    //try catching the JSON stringify, returning -1 on fail, 0 on success.
    try {
      cookies.set('session_data', JSON.stringify(resp), date);
      return 0;
    } catch (error) {
      console.log("Error parsing JSON : ", error);
      return -1;
    }
  }

  //getting the session from the cookie.
  const get_session_cookie = (): number => {
    const session_cookie: any | null = cookies.get('session_data');
    if (session_cookie !== null) {
      session_data = session_cookie;
      return 0;
    }
    return -1;
  }


  const load_session = (): boolean => {
    const get_result: number = get_session_cookie();
    if (get_result !== -1) {
      return true;
    }
    return false;
  }

  return {
    save_response, load_session,
  }
})

