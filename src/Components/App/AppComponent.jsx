import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as defaultMeta from '../../Services/metadataService';

import RouteSwitcher from '../../Router/RouteSwitcher';
import Routes from '../../Router/Routes';
import { StringParserActions } from '../../Store/Actions';
import './AppComponent.scss';

// const LoaderComponent = React.lazy(() => import('../Loader/LoaderComponent'));
// const WrapperComponent = React.lazy(() => import('../Wrapper/WrapperComponent'));
// const HeaderComponent = React.lazy(() => import('../Header/HeaderComponent'));
// const FooterComponent = React.lazy(() => import('../Footer/FooterComponent'));
import LoaderComponent from '../Loader/LoaderComponent';
import WrapperComponent from '../Wrapper/WrapperComponent';
import HeaderComponent from '../Header/HeaderComponent';
import FooterComponent from '../Footer/FooterComponent';

const mapStateToProps = (state) => ({
  parser: state.parser,
  continents: state.continents,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...StringParserActions }, dispatch),
});

class AppComponent extends React.PureComponent {
  render() {
    const {
      parser: { loading: parserLoading },
      continents: { loading: continentsLoading },
    } = this.props;
    const loading = parserLoading || continentsLoading;
    const appComponentClassList = ['app'];
    if (loading) appComponentClassList.push('loader-active');
    return (
      <>
        <Helmet title={defaultMeta.title} meta={defaultMeta.meta} link={defaultMeta.link} />
        {/* <React.Suspense fallback={<div>Loading...</div>}> */}
        <div className={appComponentClassList.join(' ')}>
          <HeaderComponent />
          <WrapperComponent>
            <RouteSwitcher routes={Routes} />
          </WrapperComponent>
          <FooterComponent />
        </div>
        <LoaderComponent show={loading} />
        {/* </React.Suspense> */}
      </>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppComponent));
