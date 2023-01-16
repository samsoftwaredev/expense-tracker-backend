export const setDBPath = (dbPath: string, ...args: any[]) => {
  let path = "";
  for (const arg of args) {
    path += `${arg}/`;
  }
  console.log("path: ", path);
  return args ? `${dbPath}/${path}` : dbPath;
};
