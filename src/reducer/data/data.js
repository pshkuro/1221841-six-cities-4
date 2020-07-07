import {City} from "../../constants/page.js";
import {parse} from "../../api/parser.js"
import {nearOffers} from "../../mocks/near-offers.js";
// import {offers} from "../../mocks/offers";

// const cities = offers.map((offer) => offer.city);

const ActionType = {
  GET_OFFERS: `GET_OFFERS`,
};

const initialState = {
  offers: null,
  nearOffers: null,
};

const ActionCreator = {
  getOffers: (offers) => {
    return ({
      type: ActionType.GET_OFFERS,
      availableOffers: offers.find((offer) => offer.city === City.PARIS),
    });
  }
};

const Operation = {
  getOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => response.data.reduce((offers, offer) => {
        if (offers.has(offer.city.name)) {
          offers.get(offer.city.name).offers.push(offer);
        } else {
          offers.set(offer.city.name, {
            city: offer.city.name,
            cityCoordinates: {
              coordinates: [offer.location.latitude, offer.location.longitude],
              zoom: offer.location.zoom,
            },
            offers: [offer]
          });
        }
        return offers;
      }, new Map()))
      .then((data) => {
        return Array.from(data.values()).map(offer => ({ ...offer, offers: offer.offers.map(parse) }))
      })
      .then((data) => {
        dispatch(ActionCreator.getOffers(data));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_OFFERS:
      const {availableOffers} = action;
      return Object.assign({}, state, {
        offers: availableOffers,
      });
  }

  return state;
};

export {reducer, ActionType, Operation, ActionCreator};


