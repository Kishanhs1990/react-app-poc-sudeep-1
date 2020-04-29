import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ItemComponent from '../Item/ItemComponent';
import { ContinentsActions } from '../../Store/Actions';

const mapStateToProps = (state) => ({
  continents: state.continents,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...ContinentsActions }, dispatch),
});

class SelectContinentComponent extends React.Component {
  constructor(props) {
    super(props);
    const { actions } = props;
    actions.fetchContinentsList();
  }

  selectContinent(continent) {
    const { actions } = this.props;
    actions.selectContinent(continent);
  }

  selectCountry(country) {
    const { actions } = this.props;
    actions.fetchCountryDetails(country);
  }

  render() {
    const {
      continents: {
        continents,
        selectedContinent,
        countriesList,
        selectedCountry,
        error: continentsError,
      },
    } = this.props;
    const continentsDOMMap = continents.map((continent, index) => (
      <ItemComponent
        type="continent"
        item={continent}
        key={`continent-${index}`}
        isSelected={selectedContinent && continent.code === selectedContinent.code}
        selectItem={() => this.selectContinent(continent)}
      />
    ));
    const countriesListDOMMap = countriesList.map((country, index) => {
      if (selectedCountry && country.code === selectedCountry.code) {
        return (
          <ItemComponent type="country-selected" item={selectedCountry} key={index} isSelected />
        );
      }
      return (
        <ItemComponent
          type="country"
          item={country}
          key={index}
          isSelected={false}
          selectItem={() => this.selectCountry(country)}
        />
      );
    });
    return (
      <>
        <div className="preface-text noselect">
          <h3>Select continents you would like to explore:</h3>
          <p>You can only choose 1 continent at a time</p>
        </div>
        <div className="items-box noselect">
          {continents.length > 0 ? continentsDOMMap : 'Could not load list of continents!'}
        </div>
        <div className="items-box noselect">
          {countriesList.length > 0 ? countriesListDOMMap : ''}
        </div>
        {continentsError.length > 0 && (
          <div className="error-box">
            <p>{continentsError}</p>
          </div>
        )}
      </>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SelectContinentComponent));
