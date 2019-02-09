import axios from "axios";

const index = () =>
  new Promise((resolve, reject) =>
    axios
      .get("http://localhost:3001/charities")
      .then(({ data }) => {
        resolve(data);
      })
      .catch(reject)
  );

export default {
  index
};
