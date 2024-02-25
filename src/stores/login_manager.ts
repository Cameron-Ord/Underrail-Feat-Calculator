import { defineStore } from 'pinia'
import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies();
export const login_state = defineStore('login_state', () => {

  let session_data = {} as { Client_Session_Token: string, Client_ID_Value: number };
  let login_status: boolean = false;

  //login setters and getters. 
  //called from vue files using the results returned from the functions below.

  const get_login_status = (): boolean => {
    return login_status;
  }

  const set_login_status = (status: boolean) => {
    login_status = status;
  }

  const log_user_out = () => {
    cookies.remove('session_data');
    set_login_status(false);
  }

  const save_response = (resp: { Client_Session_Token: string, Client_ID_Value: number }): boolean => {
    const err: number = set_resp_cookie(resp);
    //if the cookie was set without errors, it will assign the object to the global variable and return true.
    //otherwise returns false and the login attempt will fail.
    if (err === -1) {
      return false;
    }
    session_data = resp;
    return true;
  }

  const set_resp_cookie = (resp: { Client_Session_Token: string, Client_ID_Value: number }): number => {
    //saving the token in a cookie with a super long expiry
    const date: Date = new Date();
    date.setFullYear(date.getFullYear() + 100);
    //try catching the JSON stringify, returning -1 on fail, 0 on success.
    try {
      const arr_resp: Array<{ Client_Session_Token: string, Client_ID_Value: number }> = [resp];
      const string_obj = JSON.stringify(arr_resp);
      cookies.set('session_data', string_obj, date);
      return 0;
    } catch (error) {
      console.log("Error parsing JSON : ", error);
      return -1;
    }
  }

  //getting the session from the cookie.
  const get_session_cookie = (): number => {
    const session_cookie: string | null = cookies.get('session_data');
    if (session_cookie !== null) {
      try {
        const parsed: Array<{ Client_Session_Token: string, Client_ID_Value: number }> = JSON.parse(session_cookie);
        session_data = parsed[0];
        return 0;
      } catch (error) {
        console.log("Error parsing JSON : ", error);
        return -1;
      }
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

  const get_client_id = (): number => {
    return session_data['Client_ID_Value'];
  }

  const get_client_token = (): string => {
    return session_data['Client_Session_Token'];
  }

  return {
    log_user_out, save_response, load_session, set_login_status, get_login_status, get_client_id, get_client_token
  }
})

