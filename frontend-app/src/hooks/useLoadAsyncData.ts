import { Http } from "../service/http";

export const useLoadAsyncData = (
  onSuccess: (data: any) => void,
  onCatch?: () => void,
  onFinally?: () => void
) => {
  return (url: string) => {
    Http.get(url)
      .then((response: { data: { data: Element[] } }) => {
        onSuccess(response.data.data);
      })
      .catch((e) => {
        onCatch && onCatch();
      })
      .finally(() => {
        onFinally && onFinally();
      });
  };
};
