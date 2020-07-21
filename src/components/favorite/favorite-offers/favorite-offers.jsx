import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Operation} from "../../../redux/offers-favorites/offers-favorites.js";
import {getFavoriteOffers} from "../../../redux/offers-favorites/selectors.js";
import PlaceCard from "../../place-card/place-card.jsx";
import FavoriteFooter from "../favorite-footer/favorite-footer.jsx";
import {CardClasses} from "../../../constants/page.js";
import FavoriteEmpty from "../favorite-empty/favorite-empty.jsx";


export class FavoriteOffers extends PureComponent {
  componentDidMount() {
    const {getFavoritesCityOffers} = this.props;
    getFavoritesCityOffers();
  }

  render() {
    const {favoriteOffers} = this.props;
    return (
      favoriteOffers && favoriteOffers.length === 0 ? <FavoriteEmpty/> :
        <React.Fragment>
          <main className="page__main page__main--favorites">
            <div className="page__favorites-container container">
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {favoriteOffers && favoriteOffers.map((favoriteOffer) => {
                    return (
                      <React.Fragment key={favoriteOffer.city}>
                        <li className="favorites__locations-items">
                          <div className="favorites__locations locations locations--current">
                            <div className="locations__item">
                              <a className="locations__item-link" href="#">
                                <span>{favoriteOffer.city}</span>
                              </a>
                            </div>
                          </div>
                          <div className="favorites__places">
                            {favoriteOffer.offers.map((offer) => {
                              return (
                                <PlaceCard
                                  key={offer.id}
                                  offer={offer}
                                  classes={CardClasses.FAVORITE}
                                />
                              );
                            })}
                          </div>
                        </li>
                      </React.Fragment>
                    );
                  })}
                </ul>
              </section>
            </div>
          </main>
          <FavoriteFooter/>
        </React.Fragment>
    );
  }
}

FavoriteOffers.propTypes = {
  getFavoritesCityOffers: PropTypes.func.isRequired,
  favoriteOffers: PropTypes.oneOfType([PropTypes.array, PropTypes.instanceOf(null)])
};

const mapStateToProps = (state) => ({
  favoriteOffers: getFavoriteOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  getFavoritesCityOffers() {
    dispatch(Operation.getFavorites());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteOffers);

