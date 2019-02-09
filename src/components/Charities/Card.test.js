import React from "react";
import { mount, render } from "enzyme";
import { Card } from "./Card";
import { Donations } from "./Donations";
import { Form } from "./Form";

import renderer from "react-test-renderer";
import "jest-styled-components";

describe("Card", () => {
  let props;
  let mountedCard;
  const card = () => {
    if (!mountedCard) {
      mountedCard = mount(<Card {...props} />);
    }
    return mountedCard;
  };

  beforeEach(() => {
    props = {
      id: 1,
      name: "Charity 1",
      image: "/images/image.png",
      postPaymentRequestFn: jest.fn(),
      donations: []
    };
    mountedCard = undefined;
  });

  describe("when passed name", () => {
    beforeEach(() => {
      props.name = "Charity1";
    });

    it("displays the name", () => {
      expect(card().text()).toMatch(/Charity1/);
    });
  });

  describe("when passed image", () => {
    beforeEach(() => {
      props.image = "/images/image.png";
    });

    it("displays the image", () => {
      props.image = "/images/image.png";
      const tree = renderer.create(<Card {...props} />).toJSON();

      // TODO: find less brittle way of finding Picture
      const picture = tree.children[0];
      expect(picture).toHaveStyleRule(
        "background-image",
        "url(/images//images/image.png)"
      );
    });
  });

  describe("when viewing donations", () => {
    it("shows donations when clicking View Donations button", () => {
      const component = card();
      component.find("button[children='View Donations']").simulate("click");
      expect(component.find(Donations).length).toEqual(1);
    });

    it("hides donations when closing donations overlay", () => {
      const component = card();
      component.find("button[children='View Donations']").simulate("click");
      component.find("button[children='x']").simulate("click");
      expect(component.find(Donations).length).toEqual(0);
    });
  });

  describe("when viewing form", () => {
    it("shows form when clicking Donate button", () => {
      const component = card();
      component.find("button[children='Donate']").simulate("click");
      expect(component.find(Form).length).toEqual(1);
    });

    it("hides donations when closing form overlay", () => {
      const component = card();
      component.find("button[children='Donate']").simulate("click");
      component.find("button[children='x']").simulate("click");
      expect(component.find(Form).length).toEqual(0);
    });
  });
});
