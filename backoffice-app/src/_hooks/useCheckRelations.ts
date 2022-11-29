import { Http } from "../_helper/http";

export const useCheckRelations = (url: string) => {
  return (id: number) => {
    // return Promise.resolve(0);

    return new Promise((resolve, reject) => {
      Http.get(`${url}${id}`).then((response: any) => {
        const count = response.data.data;
        if (count > 0)
          reject(count);
         else 
          resolve(0);
      });
    });
  };
};
