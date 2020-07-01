import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../redux/reducer.js";

function CitiesList({cities, city: activeCity, onChooseCityClick}) {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">

          {cities.map((city) => {
            return (
              <li
                className="locations__item"
                key={city}
                onClick={() => onChooseCityClick(city)}>
                <a
                  className={`locations__item-link tabs__item  ${city === activeCity ? `tabs__item--active` : ``}`}
                  href="#">
                  <span>{city}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

CitiesList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  city: PropTypes.string.isRequired,
  onChooseCityClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cities: state.cities,
  city: state.city,
});

const mapDispatchToProps = (dispatch) => ({
  onChooseCityClick(city) {
    dispatch(ActionCreator.chooseCity(city));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
export {CitiesList};

