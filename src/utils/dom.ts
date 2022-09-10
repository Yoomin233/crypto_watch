export const writeURL = (records: Record<string, any>, deletes?: string[]) => {
  const url = new URL(window.location.href);
  if (deletes) {
    deletes.forEach((deleted) => url.searchParams.delete(deleted));
  }
  Object.keys(records).forEach((key) => {
    url.searchParams.set(key, String(records[key]));
  });
  window.history.replaceState("", document.title, url);
};

export const getSearchParams = (key: string) => {
  return new URL(window.location.href).searchParams.get(key);
};
