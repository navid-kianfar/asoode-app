import React, { Component } from "react";
import {
  Item,
  Input,
  Button,
  Icon,
  CheckBox,
  ListItem,
  List
} from "native-base";
import Svg from "../elements/svg";
import PropTypes from "prop-types";
import { LayoutAnimation, TouchableOpacity } from "react-native";
import I18n from "../../i18n";
import GS from "../../themes/general-styles";
const { string, arrayOf, shape, bool } = PropTypes;

class ChecklistComponent extends Component {
  state = {
    collapsed: false
  };
  toggleCollapse = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ collapsed: !this.state.collapsed });
  };
  render() {
    return (
      <>
        <Item dir>
          <Svg name="checked-checkbox" />
          <Input value={this.props.model.title} />
          <Button onPress={this.toggleCollapse} transparent>
            <Icon
              name={"chevron-thin-" + (this.state.collapsed ? "down" : "up")}
              type="Entypo"
            />
          </Button>
          <Button
            onPress={() => alert('"Hide Completed" or "Delete"')}
            transparent
          >
            <Icon name="more-horizontal" type="Feather" />
          </Button>
        </Item>
        {!this.state.collapsed ? (
          <>
            {this.props.model.items.map(item => {
              return (
                <Item key={item.id} dir>
                  <CheckBox checked={item.done} />
                  <Input style={GS.px3} multiline value={item.title} />
                </Item>
              );
            })}
            <Item dir>
              <Svg name="checked-checkbox" color="transparent" />
              <Input multiline placeholder={I18n.t("ADD_AN_ITEM")} />
            </Item>
          </>
        ) : null}
        <ListItem itemDivider />
      </>
    );
  }
}
ChecklistComponent.propTypes = {
  model: shape({
    id: string,
    items: arrayOf(
      shape({
        checkListId: string,
        done: bool,
        id: string,
        title: string
      })
    ),
    title: string
  })
};

export default ChecklistComponent;
