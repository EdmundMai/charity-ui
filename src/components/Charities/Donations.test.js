import React from "react";
import { mount } from "enzyme";
import { Donations } from "./Donations";

describe("Donations", () => {
  let props;
  let mountedDonations;
  const donations = () => {
    if (!mountedDonations) {
      mountedDonations = mount(<Donations {...props} />);
    }
    return mountedDonations;
  };

  beforeEach(() => {
    props = {
      list: undefined
    };
    mountedDonations = undefined;
  });

  it("displays each donation amount and currency", () => {
    props.list = [
      {
        id: 1,
        amount: 10,
        currency: "THB"
      },
      {
        id: 2,
        amount: 999,
        currency: "USD"
      }
    ];
    const component = donations();
    expect(component.text()).toMatch(/10/);
    expect(component.text()).toMatch(/THB/);
    expect(component.text()).toMatch(/999/);
    expect(component.text()).toMatch(/USD/);
  });
});
