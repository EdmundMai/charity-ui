import React from "react";
import { mount } from "enzyme";
import { Charities } from "./index";
import { Card } from "./Card";
import MDSpinner from "react-md-spinner";
import { PAYMENT_STATUSES } from "../../config";

describe("Charities", () => {
  let props;
  let mountedCharities;
  const charities = () => {
    if (!mountedCharities) {
      mountedCharities = mount(<Charities {...props} />);
    }
    return mountedCharities;
  };

  beforeEach(() => {
    props = {
      list: [],
      postPaymentRequestFn: jest.fn(),
      status: PAYMENT_STATUSES.NONE,
      donations: []
    };
    mountedCharities = undefined;
  });

  it("loads the logo", () => {
    const logo = charities()
      .find("img")
      .first();
    expect(logo.props().src).toEqual("/images/logo.svg");
  });

  describe("when there are charities and donations", () => {
    beforeEach(() => {
      props.postPaymentRequestFn = jest.fn();
      props.list = [
        {
          id: 1,
          name: "Baan Kru Noi",
          image: "baan-kru-noi.jpg",
          currency: "THB"
        },
        {
          id: 2,
          name: "Habitat for Humanity Thailand",
          image: "habitat-for-humanity-thailand.jpg",
          currency: "THB"
        }
      ];
      props.donations = [
        {
          charitiesId: 2,
          amount: 10,
          currency: "THB",
          id: 1
        },
        {
          charitiesId: 1,
          amount: 20,
          currency: "THB",
          id: 2
        }
      ];
    });

    it("loads Card for each charity", () => {
      const cards = charities().find(Card);
      expect(cards.length).toEqual(2);

      const card1Props = cards.first().props();
      expect(card1Props.donations).toEqual([
        {
          charitiesId: 1,
          amount: 20,
          currency: "THB",
          id: 2
        }
      ]);
      expect(card1Props.id).toEqual(1);
      expect(card1Props.postPaymentRequestFn).toEqual(
        props.postPaymentRequestFn
      );
      expect(card1Props.image).toEqual("baan-kru-noi.jpg");
      expect(card1Props.name).toEqual("Baan Kru Noi");

      const card2Props = cards.last().props();
      expect(card2Props.donations).toEqual([
        {
          charitiesId: 2,
          amount: 10,
          currency: "THB",
          id: 1
        }
      ]);
      expect(card2Props.id).toEqual(2);
      expect(card2Props.postPaymentRequestFn).toEqual(
        props.postPaymentRequestFn
      );
      expect(card2Props.image).toEqual("habitat-for-humanity-thailand.jpg");
      expect(card2Props.name).toEqual("Habitat for Humanity Thailand");
    });
  });

  describe("when status is pending", () => {
    beforeEach(() => {
      props.status = PAYMENT_STATUSES.PENDING;
    });

    it("renders <MDSpinner />", () => {
      const spinner = charities().find(MDSpinner);
      expect(spinner.length).toEqual(1);
    });

    it("doesn't render error notification", () => {
      expect(charities().text()).not.toMatch(/Sorry/);
    });

    it("doesn't render success notification", () => {
      expect(charities().text()).not.toMatch(/Congratuations/);
    });
  });

  describe("when status is error", () => {
    beforeEach(() => {
      props.status = PAYMENT_STATUSES.ERROR;
    });

    it("doesn't render spinner", () => {
      const spinner = charities().find(MDSpinner);
      expect(spinner.length).toEqual(0);
    });

    it("doesn't render error notification", () => {
      expect(charities().text()).toMatch(/Sorry/);
    });

    it("doesn't render success notification", () => {
      expect(charities().text()).not.toMatch(/Congratuations/);
    });
  });

  describe("when status is success", () => {
    beforeEach(() => {
      props.status = PAYMENT_STATUSES.SUCCESS;
    });

    it("doesn't render spinner", () => {
      const spinner = charities().find(MDSpinner);
      expect(spinner.length).toEqual(0);
    });

    it("doesn't render error notification", () => {
      expect(charities().text()).not.toMatch(/Sorry/);
    });

    it("doesn't render success notification", () => {
      expect(charities().text()).toMatch(/Congratulations/);
    });
  });
});
