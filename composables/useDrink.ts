import type { UseFetchOptions } from "#app";
import { defu } from "defu";

export function useCocktailDbFetch<T>(
  url: string | (() => string),
  options?: UseFetchOptions<T>,
) {
  const config = useRuntimeConfig();
  //   const userAuth = useCookie("token");

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.cocktailApi as string,
    // this overrides the default key generation, which includes a hash of
    // url, method, headers, etc. - this should be used with care as the key
    // is how Nuxt decides how responses should be deduplicated between
    // client and server
    key: url as string,
    // // set user token if connected
    // headers: userAuth.value
    //   ? { Authorization: `Bearer ${userAuth.value}` }
    //   : {},

    onResponse(_ctx: any) {
      // _ctx.response._data = new myBusinessResponse(_ctx.response._data)
      console.log(_ctx.response.json());
    },

    onResponseError(_ctx: any) {
      // throw new myBusinessError()
      console.log("error:", _ctx.error);
    },
  };

  // for nice deep defaults, please use unjs/defu
  const params = defu(options, defaults);

  return useFetch(url, params);
}

export const SearchCocktailByName = (cocktailName: string) =>
  useCocktailDbFetch(`/search.php?s=${cocktailName}`);

export const ListAllCocktailsByFirstLetter = (firstLetter: string) =>
  useCocktailDbFetch(`/search.php?f=${firstLetter}`);

export const SearchIngredientByName = (firstLetter: string) =>
  useCocktailDbFetch(`/search.php?i=${firstLetter}`);

export const GetCocktail = (id: number | string) =>
  useCocktailDbFetch(`/lookup.php?i=${id}`);
