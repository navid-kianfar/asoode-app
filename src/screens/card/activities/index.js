import React, { Component } from "react";
import { View, Text } from "native-base";
import LazyLoadFlatList from "../../../components/elements/lazy-load";
import GS from "../../../themes/general-styles";
import ActivityItem from "../../../components/activity-item";

export default class CardActivitiesTab extends Component {
  renderActivities = ({ item }) => {
    return <ActivityItem data={item} />;
  };
  render() {
    return (
      <LazyLoadFlatList
        backend={"/user/activities/card/list/" + this.props.id}
        flatListProps={{
          contentContainerStyle: [GS.flexGrow1, GS.px2, GS.py2],
          renderItem: this.renderActivities,
          keyExtractor: item => item.id
        }}
      />
    );
  }
}
