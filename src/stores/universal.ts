import { defineStore } from 'pinia'
import { useCookies } from 'vue3-cookies';
import axios, { type AxiosResponse } from 'axios';
const { cookies } = useCookies()

export const universal_store = defineStore('general_store', () => {
  let general_build: Array<{
    Build_ID: number,
    Build_Title: string,
    Feat_Slice: Array<{ Name: string, Build_ID: number }>,
    Skill_Slice: Array<{ Name: string, Value: number, Build_ID: number }>,
    Stat_Slice: Array<{ Name: string, Value: number, Build_ID: number }>
  }> = [];
  const fetch_db_builds = () => {
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

  const set_general_build = (r_data: any) => {
    general_build = r_data;
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

  let switcher: boolean = false;

  const update_view_state = (v_switcher: boolean) => {
    switcher = v_switcher
    save_as_cookie(v_switcher)
  }

  const save_as_cookie = (v_switcher: boolean) => {
    const view_state: boolean = v_switcher
    cookies.set('view_state', JSON.stringify(view_state))
  }

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
    update_view_state, load_from_cookies, get_value_state, fetch_db_builds, get_general_builds, set_general_build, health_checker
  }
})
