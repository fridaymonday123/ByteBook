import "../stores";
import { shallow } from "enzyme";
import { TFunction } from "i18next";
import * as React from "react";
import { getI18n } from "react-i18next";
import { Pagination } from "@shared/constants";
import { runAllPromises } from "~/test/support";
import { Component as PaginatedList } from "./PaginatedList";

describe("PaginatedList", () => {
  const render = () => null;

  const i18n = getI18n();

  const props = {
    i18n,
    tReady: true,
    t: ((key: string) => key) as TFunction,
  } as any;

  it("with no items renders nothing", () => {
    const list = shallow(
      <PaginatedList items={[]} renderItem={render} {...props} />
    );
    expect(list).toEqual({});
  });

  it("with no items renders empty prop", () => {
    const list = shallow(
      <PaginatedList
        items={[]}
        empty={<p>Sorry, no results</p>}
        renderItem={render}
        {...props}
      />
    );
    expect(list.text()).toEqual("Sorry, no results");
  });

  it("calls fetch with options + pagination on mount", () => {
    const fetch = jest.fn();
    const options = {
      id: "one",
    };
    shallow(
      <PaginatedList
        items={[]}
        fetch={fetch}
        options={options}
        renderItem={render}
        {...props}
      />
    );
    expect(fetch).toHaveBeenCalledWith({
      ...options,
      limit: Pagination.defaultLimit,
      offset: 0,
    });
  });

  it("calls fetch when options prop changes", async () => {
    const fetchedItems = Array(Pagination.defaultLimit).fill(undefined);
    const fetch = jest.fn().mockReturnValue(Promise.resolve(fetchedItems));
    const list = shallow(
      <PaginatedList
        items={[]}
        fetch={fetch}
        options={{
          id: "one",
        }}
        renderItem={render}
        {...props}
      />
    );
    await runAllPromises();
    expect(fetch).toHaveBeenCalledWith({
      id: "one",
      limit: Pagination.defaultLimit,
      offset: 0,
    });
    fetch.mockReset();
    list.setProps({
      fetch,
      items: [],
      options: {
        id: "two",
      },
    });
    await runAllPromises();
    expect(fetch).toHaveBeenCalledWith({
      id: "two",
      limit: Pagination.defaultLimit,
      offset: 0,
    });
  });
});
