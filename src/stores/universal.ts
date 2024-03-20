import { defineStore } from 'pinia'
import { useCookies } from 'vue3-cookies';
import axios, { type AxiosResponse } from 'axios';
const { cookies } = useCookies()

interface builds_interface {
  Build_ID: number,
  Build_Title: string,
  Feat_Slice: Array<{ Name: string, Build_ID: number }>,
  Skill_Slice: Array<{ Name: string, Value: number, Build_ID: number }>,
  Stat_Slice: Array<{ Name: string, Value: number, Build_ID: number }>
}
interface session_d{
  Client_Session_Token: string,
  Client_ID_Value: number 
}

export const universal_store = defineStore('general_store', () => {
  let general_build: builds_interface[];
  let user_build: builds_interface[];

  const fetch_db_builds = (): Promise<AxiosResponse<any, any>>  => {
    return new Promise<AxiosResponse>((resolve, reject) => {
      axios({
        url: `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/get-all-builds`,
        method: "GET",
      }).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  const retrieve_session_data = (): session_d[] => {
    const c: string | null = cookies.get('session_data');
    if(c !== null){
      try{
        const parsed_data: session_d[] = JSON.parse(c);
        return parsed_data;
      } catch (error) {
        console.log("Error parsing JSON.. : ", error);
        return [{Client_Session_Token: "", Client_ID_Value: -1}];
      }
    }
    return [{Client_Session_Token: "", Client_ID_Value: -1}];
  }

  const fetch_user_builds = (): Promise<AxiosResponse<any, any>> => {
    const s_data: session_d[] = retrieve_session_data();
    console.log(s_data[0]['Client_Session_Token']);
    return new Promise<AxiosResponse>((resolve, reject) => {
      axios({
        url: `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/get-user-builds`,
        method: "GET",
        params:{
          session_token: s_data[0]['Client_Session_Token'],
          client_id: s_data[0]['Client_ID_Value']
        }
      }).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  const set_general_build = (r_data: any) => {
    general_build = r_data;
  }

  const set_user_builds = (r_data: any) => {
    user_build = r_data;
  }

  const health_checker = (): boolean => {
    if (general_build === undefined) {
      return false;
    }
    if (general_build.length === 0) {
      return false;
    }
    if (general_build === null) {
      return false;
    }

    return true
  }

  const get_general_builds = () => {
    return general_build;
  }

  const get_user_builds = () => {
    return user_build;
  }

  let switcher: boolean = false;

  const update_view_state = (v_switcher: boolean) => {
    switcher = v_switcher
    save_as_cookie(v_switcher)
  }

  const save_as_cookie = (v_switcher: boolean) => {
    const view_state: boolean = v_switcher
    cookies.set('view_state', JSON.stringify(view_state))
  }


  // not used anymore
  const load_from_cookies = () => {
    const retrieved_state: string = cookies.get('view_state');
    try {
      const _parsed_: boolean | null = JSON.parse(retrieved_state);
      if (_parsed_) {
        switcher = _parsed_;
      }
    } catch (error) {
      console.log("Error during JSON parse: ", error)
    }
  }

  const get_value_state = () => {
    return switcher
  }

  return {
    update_view_state, load_from_cookies, get_value_state, fetch_db_builds, get_general_builds, set_general_build, health_checker, fetch_user_builds, get_user_builds, set_user_builds
  }
})
