import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import paymentApi from "./payment-api";

describe("paymentApi index", function() {
  test("returns an array of payments on success", done => {
    const mock = new MockAdapter(axios);
    const expected = [
      {
        charitiesId: 2,
        amount: 10,
        currency: "THB",
        id: 1
      }
    ];
    mock.onGet("http://localhost:3001/payments").reply(200, expected);

    paymentApi.index().then(data => {
      expect(data).toEqual(expected);
      done();
    });
  });

  test("catches exception on error", done => {
    const mock = new MockAdapter(axios);
    mock.onGet("http://localhost:3001/payments").networkError();

    paymentApi.index().catch(error => {
      expect(error).toBeTruthy();
      done();
    });
  });
});

describe("paymentApi create", function() {
  test("returns payment object on success", done => {
    const mock = new MockAdapter(axios);
    const params = {
      charitiesId: 2,
      amount: 10,
      currency: "THB"
    };

    // TODO: find other library that allows stubbing with specified params
    mock.onPost("http://localhost:3001/payments").reply(200, {
      ...params,
      id: 3
    });

    paymentApi.create({ ...params }).then(data => {
      expect(data).toEqual({ ...params, id: 3 });
      done();
    });
  });

  test("catches exception on error", done => {
    const mock = new MockAdapter(axios);
    mock.onPost("http://localhost:3001/payments").networkError();

    paymentApi
      .create({
        charitiesId: 2,
        amount: 10,
        currency: "THB"
      })
      .catch(error => {
        expect(error).toBeTruthy();
        done();
      });
  });
});
