import axios from "axios";

const index = () =>
  new Promise((resolve, reject) =>
    axios
      .get("http://localhost:3001/payments")
      .then(({ data }) => {
        resolve(data);
      })
      .catch(reject)
  );

const create = ({ charityId, amount, currency }) =>
  new Promise((resolve, reject) =>
    axios
      .post("http://localhost:3001/payments", {
        charitiesId: charityId,
        amount,
        currency
      })
      .then(({ data }) => {
        resolve(data);
      })
      .catch(reject)
  );

export default {
  index,
  create
};
