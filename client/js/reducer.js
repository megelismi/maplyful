import * as get_actions from './actions/get_result';
import * as sync_actions from './actions/sync';
import { combineReducers } from 'redux';

const locationState = (state = { filter: false, show_all: true }, action) => {
  switch (action.type) {
    case get_actions.GET_LOCATIONS_SUCCESS:
    return state = Object.assign({}, state, {
      locations: action.locations,
      locationsError: false
    });
    case get_actions.GET_LOCATIONS_ERROR:
    return state = Object.assign({}, state, {
      locationsError: true
    });
    case sync_actions.SAVE_MERGED_LOCATION_INFO:
    return state = Object.assign({}, state, {
      mergedLocationInfo: action.info
    });
    case get_actions.GET_DESCRIPTIONS_SUCCESS:
    return state = Object.assign({}, state, {
      descriptions: action.descriptions,
      descriptionsError: false
    });
    case get_actions.GET_DESCRIPTIONS_ERROR:
    return state = Object.assign({}, state, {
      descriptionsError: true
    });
    case get_actions.GET_TAGS_SUCCESS:
    return state = Object.assign({}, state, {
      tags: action.tags,
      tagsError: false
    });
    case get_actions.GET_TAGS_ERROR:
    return state = Object.assign({}, state, {
      tagsError: true
    });
    case get_actions.GET_LOCATION_TAGS_SUCCESS:
    return state = Object.assign({}, state, {
      locationTags: action.location_tags,
      locationTagsError: false
    });
    case get_actions.GET_LOCATION_TAGS_ERROR:
    return state = Object.assign({}, state, {
      locationTagsError: true
    });
    case sync_actions.ADD_SELECTED_TAG:
    let tags = state.selected_tags || [];
    return state = Object.assign({}, state, {
      selectedTags: [ ...tags, action.tag ]
    });
    case sync_actions.TOGGLE_TAG_FILTER:
    return state = Object.assign({}, state, {
      filter: !state.filter
    });
    case sync_actions.SET_TAG_FILTER:
    return state = Object.assign({}, state, {
      filter: false
    });
    case sync_actions.CLEAR_ALL_SELECTED_TAGS:
    return state = Object.assign({}, state, {
      selectedTags: [],
      showAllTags: true
    });
    case sync_actions.SELECT_BY_ID:
    return state = Object.assign({}, state, {
      selectedLocation: action.id
    });
    default:
    return state;
  }
}

export default combineReducers({
  locationState
});
