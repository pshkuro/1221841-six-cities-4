import React from "react";
import {shallow} from "enzyme";
import PlaceCard from "./place-card.jsx";

const props = {
  offer: {
    pictures: [`img/apartment-05.jpg`],
    premium: true,
    cost: 10,
    description: [`Good apartment`],
    type: `Apartment`,
    rating: 5,
    title: `Place cool`,
    bedrooms: 2,
    guests: 10,
    conveniences: [`Beautiful`],
    coordinates: [52.3909553943508, 4.85309666406198],
    owner: {
      avatar: `img/avatar-angelina.jpg`,
      name: `Clara`,
      pro: false,
    },
    id: 1212,
    reviwes: [{}, {}],
  },
  onAdvertCardTitleClick: jest.fn((x) => x),
  onAdvertCardMouseOver: jest.fn((x) => x),
  onAdvertCardMouseOut: jest.fn(),
  classes: {
    card: `cities__place-`,
    wrapper: `cities`,
    cards: `cities__places-`,
    map: `cities`,
  }
};

it(`Hovering PlaceCard get to callback info about itself`, () => {

  const placeCard = shallow(
      <PlaceCard {...props}/>
  );

  placeCard.simulate(`mouseEnter`);

  expect(props.onAdvertCardMouseOver).toHaveBeenCalledTimes(1);
  expect(props.onAdvertCardMouseOver.mock.results[0].value).toMatchObject(props.offer);
});


it(`PlaceCard title should be clicked and get to callback info about itself`, () => {

  const placeCard = shallow(
      <PlaceCard {...props}/>
  );

  const advertCardTitle = placeCard.find(`.place-card__name`);
  advertCardTitle.simulate(`click`);

  expect(props.onAdvertCardTitleClick).toHaveBeenCalledTimes(1);
  expect(props.onAdvertCardTitleClick.mock.results[0].value).toMatchObject(props.offer);

});
