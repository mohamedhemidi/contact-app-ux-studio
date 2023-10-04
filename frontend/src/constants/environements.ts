const ENV: ObjectKey = import.meta.env.VITE_APP_ENV || "dev";

const BASE_URL = {
  dev: "https://r2sfl2tsga.execute-api.eu-west-1.amazonaws.com/dev",
  test: "",
  prod: "",
};

type ObjectKey = keyof typeof BASE_URL;

export const PATH = {
  getContacts: `${BASE_URL[ENV]}/getcontacts`,
  addContacts: `${BASE_URL[ENV]}/addcontact`,
  viewContact: `${BASE_URL[ENV]}/viewcontact`,
  updateContact: `${BASE_URL[ENV]}/updatecontact`,
  removeContact: `${BASE_URL[ENV]}/updatecontact`,
};

export const S3 = {
  bucket: "uxstudio",
  accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
  secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  region: "eu-west-1",
};
