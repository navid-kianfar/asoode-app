import React, { Component } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
// import DraggableFlatList from 'react-native-draggable-dynamic-flatlist';
import {
  View,
  Text,
  Button,
  Icon,
  Input,
  Item,
  connectStyle
} from "native-base";
import Styles from "./styles";
import {
  BoardListDTO,
  BoardSettingsDTO,
  CustomFieldDTO
} from "../../dtos/board.dtos";
import BoardListCard from "../board-list-card";
import { Metrics } from "../../themes/variables";
import PropTypes from "prop-types";
import GS from "../../themes/general-styles";
import I18n from "../../i18n";
import { getInputHeight } from "../../library/general-helpers";
const { shape, arrayOf, any, func, number } = PropTypes;

const colors = [
  {
    id: "c703ba17-3fb9-4e5e-9272-a7fedf89ddfc",
    title: "خاکستری",
    latinTitle: "gray",
    value: "#344563"
  },
  {
    id: "52c2b179-f234-457d-a2a2-cd62def53901",
    title: "صورتی",
    latinTitle: "pink",
    value: "#ff78cb"
  },
  {
    id: "32e0d684-9862-4325-9d61-8718368bc540",
    title: "آکوامارین",
    latinTitle: "aquamarine",
    value: "#51e898"
  },
  {
    id: "ecc1fec9-fa1b-4cc5-99a5-80de402b7650",
    title: "آبی روشن",
    latinTitle: "lightBlue",
    value: "#00c2e0"
  },
  {
    id: "8a1c8a5e-ecc9-489a-9e91-09f51e9f8878",
    title: "سبز",
    latinTitle: "green",
    value: "#61bd4f"
  },
  {
    id: "6fe30746-0c9a-4ebd-b6a5-4c044acdb0df",
    title: "زرد",
    latinTitle: "yellow",
    value: "#f2d600"
  },
  {
    id: "73fc51ca-f1c9-4652-a2cb-382efc020e36",
    title: "نارنجی",
    latinTitle: "orange",
    value: "#ff9f1a"
  },
  {
    id: "2254ae1b-7d31-43c8-9291-d1931e28ab66",
    title: "قرمز",
    latinTitle: "red",
    value: "#eb5a46"
  },
  {
    id: "76e21e55-a6d3-4b7f-97a3-b22d7bf143ea",
    title: "بنفش",
    latinTitle: "purple",
    value: "#c377e0"
  },
  {
    id: "380ee355-bf64-4447-bb48-5c508eb1320e",
    title: "آبی تیره",
    latinTitle: "darkBlute",
    value: "#0079bf"
  }
]; // TODO: change to global colors
class BoardList extends Component {
  static propTypes = {
    data: shape(BoardListDTO),
    setting: shape(BoardSettingsDTO),
    customFields: arrayOf(shape(CustomFieldDTO)),
    navigation: any,
    index: number,
    openChange: func,
    openActions: func,
    openedItems: shape({
      newCard: number
    })
  };
  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   return false;
  // }
  openActions = () => {
    this.props.openChange();
    this.props.openActions();
  };

  renderItem = ({ item }) => (
    <BoardListCard
      data={item}
      setting={this.props.setting}
      openChange={this.props.openChange}
      navigation={this.props.navigation}
      customFields={this.props.customFields}
    />
  );
  getListColor = () => {
    let color;
    const colorId = this.props.data.colorId;
    if (colorId) {
      color = colors.find(c => c.id === colorId).value;
    } else {
      color = this.props.style.boardListBg;
    }
    return { backgroundColor: color };
  };
  header = () => {
    return (
      <View style={[Styles.listHeader, this.getListColor()]}>
        <View style={GS.flexRowDir}>
          <Input
            onFocus={() => this.props.openChange()}
            textAlignVertical="top"
            multiline
            style={Styles.listName}
            value={this.props.data.title}
          />
          <TouchableOpacity
            onPress={() => this.props.openChange("newCard", this.props.index)}
            style={GS.mx2}
          >
            <Icon name="plus" type="Feather" />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.openActions}>
            <Icon name="more-horizontal" type="Feather" />
          </TouchableOpacity>
        </View>
        {this.props.openedItems.newCard === this.props.index ? (
          <TouchableOpacity activeOpacity={1}>
            <Item style={GS.my2} card>
              <Input
                textAlignVertical="top"
                multiline
                style={getInputHeight(3)}
                numberOfLines={3}
              />
            </Item>
            <View style={[GS.flexRowDir, GS.justifyContentEnd]}>
              <Button
                onPress={() => this.props.openChange()}
                style={GS.mx2}
                light
              >
                <Text>{I18n.t("CANCEL")}</Text>
              </Button>
              <Button>
                <Text>{I18n.t("SAVE")}</Text>
              </Button>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };
  render() {
    return (
      <View style={Styles.listContainer}>
        <DraggableFlatList
          contentContainerStyle={[Styles.listContent, this.getListColor()]}
          style={Styles.list}
          ListHeaderComponent={this.header}
          stickyHeaderIndices={[0]}
          renderItem={this.renderItem}
          data={this.props.data.cards}
          keyExtractor={item => item.id}
          windowSize={10}
          initialNumToRender={8}
          maxToRenderPerBatch={1}
          scrollPercent={5}
          onMoveEnd={({ data, to, from, row }) => {
            console.log(data, to, from, row);
          }}
        />
      </View>
    );
  }
}

export default connectStyle("Custom.GeneralColors")(BoardList);
