export const useRouter = () => {
  const query = window.location.href;
  const pageId = query.split("/");
  const pathname = window.location.href;

  const push = ({ pathname }: { pathname: string }) => {
    window.location.assign(pathname);
  };

  // equivlant to Next.js useRouter hook's route property
  const route = window.location.href.split("/");

  return {
    query,
    pageId,
    pathname,
    push,
    route,
  };
};
