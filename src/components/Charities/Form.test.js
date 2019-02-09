import React from "react";
import { mount, render } from "enzyme";
import { Form } from "./Form";

import { DONATION_AMOUNTS } from "../../config";

describe("Form", () => {
  let props;
  let mountedForm;
  const form = () => {
    if (!mountedForm) {
      mountedForm = mount(<Form {...props} />);
    }
    return mountedForm;
  };

  beforeEach(() => {
    props = {
      charityId: 1,
      postPaymentRequestFn: jest.fn()
    };
    mountedForm = undefined;
  });

  describe("radio buttons", () => {
    it("maps each amount properly", () => {
      const component = form();
      const radioButtons = component.find("input[type='radio']");
      expect(radioButtons.length).toEqual(DONATION_AMOUNTS.length);

      const radio1 = radioButtons.at(0);
      expect(radio1.props().value).toEqual(DONATION_AMOUNTS[0]);
      expect(radio1.props().checked).toBe(true);

      const radio2 = radioButtons.at(1);
      expect(radio2.props().value).toEqual(DONATION_AMOUNTS[1]);
      expect(radio2.props().checked).toBe(false);

      const radio3 = radioButtons.at(2);
      expect(radio3.props().value).toEqual(DONATION_AMOUNTS[2]);
      expect(radio3.props().checked).toBe(false);

      const radio4 = radioButtons.at(3);
      expect(radio4.props().value).toEqual(DONATION_AMOUNTS[3]);
      expect(radio4.props().checked).toBe(false);

      const radio5 = radioButtons.at(4);
      expect(radio5.props().value).toEqual(DONATION_AMOUNTS[4]);
      expect(radio5.props().checked).toBe(false);
    });
  });

  describe("submitting the form", () => {
    it("calls postPaymentRequestFn with the correct params", () => {
      const mockFn = jest.fn();
      props.postPaymentRequestFn = mockFn;
      props.charityId = 1;
      const component = form();

      component.find(`input[value=10]`).simulate("click");
      component.find("button[children='Pay']").simulate("click");
      expect(mockFn).toHaveBeenLastCalledWith({
        charityId: 1,
        amount: 10,
        currency: "THB"
      });
    });
  });
});
