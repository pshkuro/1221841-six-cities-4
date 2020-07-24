import React from "react";
import PropTypes from "prop-types";
import {mount} from "enzyme";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {BrowserRouter, MemoryRouter} from "react-router-dom";
import MockAdapter from "axios-mock-adapter";
import {App} from "./app.jsx";
import {createAPI} from "../../api/api.js";
import ErrorComponent from "../error/error.jsx";
import Main from "../main/main.jsx";
import {PlaceProperty} from "../place-property/place-property.jsx";
import SignIn from "../sign-in/sign-in.jsx";

const props = {
  offers: [{
    city: `Paris`,
    cityCoordinates: {
      coordinates: [52.3909553943508, 4.85309666406198],
      zoom: 12,
    },
    offers: [
      {
        previewImage: `img/apartment-01.jpg`,
        pictures: [`img/apartment-01.jpg`],
        title: `good rererer`,
        description: [`Wood and stone place`],
        premium: false,
        favourite: true,
        type: `Apartment`,
        rating: 1.8,
        bedrooms: 5,
        guests: 1,
        cost: 120,
        conveniences: [`Cool vary cool place`],
        coordinates: [52.3909553943508, 4.85309666406198],
        owner: {
          avatar: `img/avatar-angelina.jpg`,
          name: `Lolo`,
          pro: true,
          id: 12,
        },
        id: 89089,
      }, {
        previewImage: `img/apartment-01.jpg`,
        pictures: [`img/apartment-01.jpg`],
        title: `good rererer`,
        description: [`Wood and stone place`],
        premium: false,
        favourite: true,
        type: `Apartment`,
        rating: 6,
        bedrooms: 1,
        guests: 1,
        cost: 12000,
        conveniences: [`Cool vary cool place`],
        coordinates: [52.3909553943508, 4.85309666406198],
        owner: {
          avatar: `img/avatar-angelina.jpg`,
          name: `Lolo`,
          pro: true,
          id: 10,
        },
        id: 89,
      }, {
        previewImage: `img/apartment-07.jpg`,
        pictures: [`img/apartment-02.jpg`],
        title: `good rererer`,
        description: [`Wood and stone place`],
        premium: false,
        favourite: true,
        type: `Apartment`,
        rating: 1.8,
        bedrooms: 5,
        guests: 1,
        cost: 120,
        conveniences: [`Cool vary cool place`],
        coordinates: [52.3909553943508, 4.85309666406198],
        owner: {
          avatar: `img/avatar-angelina.jpg`,
          name: `Lolo`,
          pro: true,
          id: 12,
        },
        id: 5,
      }],
  }],
  activeOffer: null,
  error: false,
  login: jest.fn(),
  authorizationStatus: `AUTH`,
};

const mockStore = configureStore([thunk]);
const mockAppStore = mockStore({
  PAGE: {
    city: `Moscow`,
  },
  OFFERS_DATA: {
    error: false,
    offers: props.offers,
    nearOffers: props.offers[0],
  },
  USER: {
    profile: {},
    authorizationStatus: `NO_AUTH`,
  },
  REVIEWS: {
    reviews: []
  }
});

// Mock BrouserRouter to memory router work
const rrd = require(`react-router-dom`);
rrd.BrowserRouter = function rrdRouter({children}) {
  return <div>{children}</div>;
};
module.exports = rrd;

rrd.BrowserRouter.propTypes = {
  children: PropTypes.node,
};

describe(`App component tests`, () => {

  it(`App show Error component when error`, () => {
    const store = mockStore({
      PAGE: {
        city: `Moscow`,
      },
      OFFERS_DATA: {
        error: true,
      },
      USER: {
        profile: {},
        authorizationStatus: `AUTH`,
      }
    });

    const component = mount(
        <Provider store={store}>
          <BrowserRouter>
            <App
              {...props}
              error={true}/>
          </BrowserRouter>
        </Provider>
    );

    expect(component.exists(ErrorComponent)).toBe(true);


  });

  it(`App should login when user enter to site`, () => {

  });

  it(`Invalid path should redirect to ErrorComponent`, () => {
    const component = mount(
        <Provider store={mockAppStore}>
          <MemoryRouter initialEntries = {[`/random`]}>
            <App
              {...props}/>
          </MemoryRouter>
        </Provider>
    );

    expect(component.find(ErrorComponent)).toHaveLength(1);
  });

  it(`Valid main path should redirect to MainComponent`, () => {
    const component = mount(
        <Provider store={mockAppStore}>
          <MemoryRouter initialEntries = {[`/`]}>
            <App
              {...props}/>
          </MemoryRouter>
        </Provider>
    );

    expect(component.find(Main)).toHaveLength(1);

  });

  it(`Valid property path should redirect to PropertyComponent`, () => {
    const api = createAPI(() => {});
    const apiMock = new MockAdapter(api);
    apiMock
      .onGet(`/comments/5`)
      .reply(200, {});

    apiMock
      .onGet(`/hotels/5/nearby`)
      .reply(200, {});

    const component = mount(
        <Provider store={mockAppStore}>
          <MemoryRouter initialEntries = {[`/offer/5`]}>
            <App
              {...props}/>
          </MemoryRouter>
        </Provider>
    );


    expect(component.find(PlaceProperty)).toHaveLength(1);
  });

  it(`Valid sign in path should redirect to SignInComponent`, () => {
    const component = mount(
        <Provider store={mockAppStore}>
          <MemoryRouter
            initialEntries={[`/login`]}>
            <App
              {...props}
              authorizationStatus="NO_AUTH"
              cities={[`Paris`, `Moscow`]}/>
          </MemoryRouter>
        </Provider>
    );

    expect(component.find(SignIn)).toHaveLength(1);
  });


});
