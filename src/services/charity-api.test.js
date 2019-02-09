import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import charityApi from "./charity-api";

describe("charityApi index", function() {
  test("`index` returns an array of charities", done => {
    const mock = new MockAdapter(axios);
    const expected = [
      {
        id: 1,
        name: "Baan Kru Noi",
        image: "baan-kru-noi.jpg",
        currency: "THB"
      }
    ];
    mock.onGet("http://localhost:3001/charities").reply(200, expected);

    charityApi.index().then(data => {
      expect(data).toEqual(expected);
      done();
    });
  });
});
