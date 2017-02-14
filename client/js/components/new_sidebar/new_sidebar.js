import React from 'react';
import { connect } from 'react-redux';
import * as syncActionCreators from '../../actions/sync.js';
import LocalDetailsDisplay from './local_details_display';
import LocationDetailsDisplay from './location_details_display';
import LocalsDisplay from './locals_display';
import TagsDisplay from './tags_display';

class NewSidebar extends React.Component {
  constructor() {
    super();
    this.state = { displayLocals: true, displayTags: false, displayOneUser: false }
  }

  showTagsView() { this.setState({ displayLocals: false, displayTags: true, displayOneUser: false }) }

  showLocalsView() {
    this.setState({ displayLocals: true, displayTags: false, displayOneUser: false });
    this.props.clearAllAppliedTags(false);
    this.props.selectUser(null);
  }

  selectLocalUser(user) {
    this.setState({ displayLocals: false, displayTags: false, displayOneUser: true })
    this.props.selectUserAndUpdateTags(user);
  }

  render() {
    let display;
    const { selectedLocation, selectLocationById, users, selectUser, allTags, selectedTags, clearAllAppliedTags, filterByTag, selectedUser, tagsFilteredByUser } = this.props;
    if (selectedLocation) {
      display = <LocationDetailsDisplay
        locationInfo={selectedLocation}
        selectLocationById={selectLocationById} />
    } else if (this.state.displayLocals) {
      display = <LocalsDisplay
        city={'Portland'}
        users={users}
        selectLocalUser={this.selectLocalUser.bind(this)} />
    } else if (this.state.displayTags) {
      let tags = tagsFilteredByUser ? tagsFilteredByUser : allTags
      display = <TagsDisplay
        boolean={selectedUser ? true : false}
        tags={tags}
        selected={selectedTags}
        clearAllAppliedTags={clearAllAppliedTags}
        filterByTag={filterByTag} />
    } else if (this.state.displayOneUser) {
      display = <LocalDetailsDisplay
        userInfo={selectedUser} />
    }

    return (
      <div className="sidebar">
        <div className="sidebar-nav">
          <ul>
            <li> <button className="sidebar-nav-button" onClick={this.showTagsView.bind(this)}>{"Filter"}</button></li>
            <li> <button className="sidebar-nav-button" onClick={this.showLocalsView.bind(this)}>{"Users"}</button></li>
          </ul>
        </div>
        <div className="sidebar-inner-container">{display}</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  selectedTags: state.selectedTags,
  allTags: state.allTags,
  selectedLocation: state.selectedLocation,
  selectedUser: state.selectedUser,
  tagsFilteredByUser: state.tagsFilteredByUser
});

export default connect(mapStateToProps, syncActionCreators)(NewSidebar);


   //<div>
          //<button onClick={this.showAllUsers.bind(this)}>The locals</button>
          //<button onClick={this.showTagsView.bind(this)}>{"What are you looking for?"}</button>
        //</div>
