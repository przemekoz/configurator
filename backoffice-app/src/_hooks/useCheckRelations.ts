import { Http } from "../_helper/http";

export const useCheckRelations = (url: string) => {
  return (id: number) => {
    return new Promise((resolve, reject) => {
      Http.get(`${url}${id}`).then((response: any) => {
        const count = response.data.data;
        if (count > 0) {
          reject(count);
          console.log("useCheckRelations are connections");
        } else {
          resolve(0);
          console.log("useCheckRelations are connections");
        }
      });
    });
  };
};
