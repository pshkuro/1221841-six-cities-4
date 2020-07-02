import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {SortingType} from "../../constants/page.js";


const options = [
  {
    label: `Popular`,
    value: `popular`,
    active: true
  },
  {
    label: `Price: low to high`,
    value: `to-high`,
    active: false
  },
  {
    label: `Price: high to low`,
    value: `to-low`,
    active: false
  },
  {
    label: `Top rated first`,
    value: `top-rated`,
    active: false
  },
];

export default class PlacesSorting extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };

  }


  render() {
    const {onSortingListItemClick, activeSortingType} = this.props;
    const activeSortingListItem = options.find((option) => option.value === activeSortingType);

    const sortingListOpenedClass = `places__options--opened`;
    const isPlaceSortingActive = this.state.isActive && sortingListOpenedClass;

    const activeSortingListItemClass = `places__option--active`;
    const isSortingListItemActive = (option) => option === activeSortingListItem && activeSortingListItemClass;

    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span
          className="places__sorting-type"
          onClick={() => this._changeSortingState()}
          tabIndex="0">
          {activeSortingListItem.label}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul className={`places__options places__options--custom ${isPlaceSortingActive}`}>
          {options.map((option) => {
            return (<li
              onClick={() => {
                onSortingListItemClick(option.value);
              }}
              className={`places__option ${isSortingListItemActive(option)}`}
              key={option.value}
              tabIndex="0"
            >{option.label}</li>);
          })}

          {/* <li className="places__option places__option--active" tabIndex="0">Popular</li>
          <li className="places__option" tabIndex="0">Price: low to high</li>
          <li className="places__option" tabIndex="0">Price: high to low</li>
          <li className="places__option" tabIndex="0">Top rated first</li> */}
        </ul>
        {/* <select className="places__sorting-type" id="places-sorting">
                    <option className="places__option" value="popular" selected="">Popular</option>
                    <option className="places__option" value="to-high">Price: low to high</option>
                    <option className="places__option" value="to-low">Price: high to low</option>
                    <option className="places__option" value="top-rated">Top rated first</option>
                  </select> */}
      </form>
    );
  }

  _changeSortingState() {
    this.setState((prevState) => ({
      isActive: !prevState.isActive,
    }));
  }
}

PlacesSorting.propTypes = {
  onSortingListItemClick: PropTypes.func.isRequired,
  activeSortingType: PropTypes.oneOf([SortingType.DEFAULT, SortingType.TOP_RATED, SortingType.TO_HIGHT, SortingType.TO_LAW]),
};

