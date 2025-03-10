import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import { push } from 'connected-react-router';
import { withRouter } from 'react-router-dom';
import {
  ListItem,
  Topbar,
  TopbarMobile,
  TopbarNav,
  TopbarRight,
} from '@momentum-ui/react';
import logo from '../../assets/momentum-design.svg';
// import SearchButton from '../../momentum-ui/SearchButton';
import SideNav from '../../containers/SideNav';
import getUser from '../../services/user/actions';

class AppHeader extends Component {
  state = {
    hideNav: true,
    expandSearch: false,
    keyword: null,
  };

  componentDidMount() {
    this.props.getUser(location);
    this.showNav(this.props.path);
    this.setSearchButton(this.props.path);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.path !== this.props.path) {
      this.showNav(this.props.path);
      this.setSearchButton(this.props.path);
    }
  }

  logoutUser = () => {
    console.log('log out user'); // eslint-disable-line no-console
    // this.props.actions.logoutUser();
  };

  showNav = path => {
    this.setState({
      hideNav: path === '/' ? false : true,
    });
  };

  getDefaultAvatar = () => {};

  searchPath = '/search';

  setSearchButton = path => {
    this.setState({
      expandSearch: path === this.searchPath,
    });
  };

  handleSearchExpand = () => {
    this.setState({
      expandSearch: true,
    });
  };

  handleSearchInput = e => {
    this.setState({
      keyword: e.target.value.trim(),
    });
  };

  render() {
    const { location } = this.props;
    // push,
    // search,
    // } = this.props;
    const {
      // expandSearch,
      hideNav,
      // keyword
    } = this.state;
    // const logoIcon = <i className="icon icon-cisco-logo" />;
    const wordMark = <img src={logo} alt="Cisco Momentum Design" />;
    // const getAvatar = () => {
    //   const number = Math.floor(Math.random() * 101);
    //   const gender = Math.random() >= 0.5 ? 'women' : 'men';
    //   return `https://randomuser.me/api/portraits/${gender}/${number}.jpg`;
    // };
    const navItems = (
      <Fragment>
        {/* <ListItem
          customRefProp="innerRef"
          customAnchorNode={
            <NavLink to="/design-principles" activeClassName={'active'}>
              Design Principles
            </NavLink>
          }
        /> */}
        <ListItem
          customRefProp="innerRef"
          customAnchorNode={
            <NavLink to="/getting-started/designers" activeClassName={'active'}>
              Getting Started
            </NavLink>
          }
        />
        <ListItem
          customRefProp="innerRef"
          customAnchorNode={
            <NavLink to="/guidelines/forms-and-form-validation" activeClassName={'active'}>
              Guidelines
            </NavLink>
          }
        />
        <ListItem
          customRefProp="innerRef"
          customAnchorNode={
            <NavLink to="/styles" activeClassName={'active'}>
              Styles
            </NavLink>
          }
        />
        <ListItem
          customRefProp="innerRef"
          customAnchorNode={
            <NavLink to="/components" activeClassName={'active'}>
              Components
            </NavLink>
          }
        />
      </Fragment>
    );
    // const topBarPopoverContent = (
    //   <List>
    //     <ListItem onClick={this.logoutUser}>Log out</ListItem>
    //   </List>
    // );

    // const topbarRight = this.props.isAuthenticated ? (
    //   <div className="md-top-bar__user">
    //     {/* <Popover
    //       direction="bottom-right"
    //       content={topBarPopoverContent}
    //       popoverTrigger="Click"
    //       closeOnClick> */}
    //     <button className="md-avatar md-button--none" aria-haspopup="true" onClick={this.logoutUser}>
    //       <img className="user-image" src={photo} onError={this.getDefaultAvatar} alt="user" />
    //     </button>
    //     {/*</Popover> */}
    //   </div>
    // ) : (
    //   <div className="md-top-bar__logged-out">
    //     <Link to="/login">Log In</Link>
    //   </div>
    // );
    const mobileBrandNode = (
      <div className="md-top-bar__brand">
        <NavLink to="/" className="md-brand">
          <div className="md-brand__logo">{wordMark}</div>
        </NavLink>
      </div>
    );

    return (
      <Fragment>
        <Topbar
          color="light"
          {...(location.pathname === '/' && {
            image: wordMark,
            brandAnchorElement: <NavLink to="/" />,
          }) || {
            image: <span />,
          }}
          fixed
        >
          {!hideNav && <TopbarNav>{navItems}</TopbarNav>}
          {/* <TopbarNav>{navItems}</TopbarNav> */}
          {/* <TopbarNav>Hello</TopbarNav> */}
          <TopbarRight>
            {/* <SearchButton
              name="searchButton"
              htmlId="searchButton"
              expanded={expandSearch}
              value={search && search.q || ''}
              onExpand={this.handleSearchExpand}
              onChange={this.handleSearchInput}
              onKeyDown={e => {
                if (e.key === 'Enter' && keyword.length > 0) {
                  push(this.searchPath + '?q=' + keyword);
                }
              }}
            /> */}
            {/* {topbarRight} */}
          </TopbarRight>
          <TopbarMobile shouldCloseOnClick={false} brandNode={mobileBrandNode}>
            <SideNav isFixed={false} hideBrand className="docs-mobile-nav" />
          </TopbarMobile>
        </Topbar>
      </Fragment>
    );
  }
}

AppHeader.propTypes = {
  getUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  // push: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  path: PropTypes.string,
  // photo: PropTypes.string,
  search: PropTypes.object,
};

AppHeader.defaultProps = {
  isAuthenticated: false,
  path: '',
  // photo: null,
  search: null,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.user.isAuthenticated,
    photo: state.user.photo,
    path: state.router.location.pathname,
    search: _.chain(state.router.location.search)
      .replace('?', '')
      .split('&')
      .map(_.partial(_.split, _, '=', 2))
      .fromPairs()
      .value(),
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    {
      getUser,
    }
  )(AppHeader)
);
