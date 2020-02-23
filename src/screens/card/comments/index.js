import React, { Component } from "react";
import LazyLoadFlatList from "../../../components/elements/lazy-load";
import GS from "../../../themes/general-styles";
import CommentItem from "./comment-item";

export default class CardCommentsTab extends Component {
  state = {
    items: []
  };
  rowsChange = items => {
    this.setState({ items });
  };
  renderItem = ({ item, index }) => {
    return <CommentItem first={true} data={item} />;
  };
  render() {
    return (
      <LazyLoadFlatList
        backend={"/user/cards/comments/" + this.props.id}
        rows={this.state.items}
        rowsChange={this.rowsChange}
        flatListProps={{
          contentContainerStyle: [GS.flexGrow1, GS.px2, GS.py2],
          renderItem: this.renderItem,
          keyExtractor: item => item.id
        }}
      />
    );
  }
}
