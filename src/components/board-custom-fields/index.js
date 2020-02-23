import React, { Component } from "react";
import {
  View,
  Content,
  Form,
  Input,
  ListItem,
  List,
  Left,
  Body,
  Right,
  Switch,
  Icon,
  Text,
  Item,
  Card,
  CardItem,
  Label,
  Button
} from "native-base";
import { ScrollView, TouchableOpacity } from "react-native";
import ModalStyles from "../modals/styles";
import Styles from "./styles";
import { CustomFieldType } from "../../library/enums";
import I18n from "../../i18n";
import PropTypes from "prop-types";
import GS from "../../themes/general-styles";
import DropDown from "../elements/drop-down";
import { LayoutAnimation } from "react-native";
import { Metrics } from "../../themes/variables";
import Modal from "../elements/modal";

const Pages = {
  Lists: 0,
  AddField: 1,
  RenameField: 2,
  EditDropdown: 3,
  DeleteField: 4
};
export const getFieldIcon = type => {
  switch (type) {
    case CustomFieldType.Checkbox:
      return {
        name: "ios-checkmark-circle-outline",
        type: "Ionicons"
      };
    case CustomFieldType.Date:
      return {
        name: "calendar",
        type: "Feather"
      };
    case CustomFieldType.DropDown:
      return {
        name: "ios-arrow-dropdown",
        type: "Ionicons"
      };
    case CustomFieldType.File:
      return {
        name: "file1",
        type: "AntDesign"
      };
    case CustomFieldType.Map:
      return {
        name: "map",
        type: "SimpleLineIcons"
      };
    case CustomFieldType.Number:
      return {
        name: "hash",
        type: "Feather"
      };
    case CustomFieldType.Switch:
      return {
        name: "switch",
        type: "Entypo"
      };
    case CustomFieldType.Tags:
      return {
        name: "ios-pricetags",
        type: "Ionicons"
      };
    case CustomFieldType.Text:
      return {
        name: "format-text",
        type: "MaterialCommunityIcons"
      };
    case CustomFieldType.TextArea:
      return {
        name: "card-text-outline",
        type: "MaterialCommunityIcons"
      };
  }
};

class BoardCustomFields extends Component {
  state = {
    page: 0,
    addItemText: "",
    addForm: {
      items: [],
      name: "",
      showOnCard: true,
      type: 1
    }
  };
  changePage = page => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ page });
  };
  resetAddField = () => {
    const addForm = {
      items: [{ title: "item1", color: "#b3bac5", order: 1 }],
      name: "",
      showOnCard: true,
      type: 1
    };
    this.setState({ addForm });
  };
  addModelChange = (field, val) => {
    const addForm = { ...this.state.addForm };
    addForm[field] = val;
    this.setState({ addForm });
  };
  createDropDownItem = () => {
    if (!this.state.addItemText) {
      return;
    }
    const addForm = { ...this.state.addForm };
    addForm.items.push({
      title: this.state.addItemText,
      color: "#b3bac5",
      order: addForm.items.length + 1
    });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ addForm, addItemText: "" });
  };
  editDropDownItem = (index, val) => {
    const addForm = { ...this.state.addForm };
    addForm.items[index].title = val;
    this.setState({ addForm });
  };
  removeDropDownItem = index => {
    const addForm = { ...this.state.addForm };
    addForm.items.splice(index, 1);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ addForm });
  };
  cancelAddField = () => {
    this.changePage(Pages.Lists);
    this.resetAddField();
  };
  submitAddField = () => {
    if (!this.state.addForm.name) {
      return;
    }
    // make the request
    this.changePage(Pages.Lists);
    this.resetAddField();
  };
  toRenameField = field => {
    const addForm = {
      items: field.items,
      name: field.title,
      showOnCard: field.showOnCard,
      type: field.type
    };
    this.setState({ addForm, id: field.id });
    this.changePage(Pages.RenameField);
  };
  deleteConfirmChange = deleteConfirm => {
    this.setState({ deleteConfirm });
  };
  deleteField = () => {
    // id = this.state.id;
  };
  Inside = () => {
    switch (this.state.page) {
      case Pages.AddField:
      case Pages.RenameField:
        return (
          <Form style={[GS.flex1, GS.px3, GS.py2]}>
            {this.state.page === Pages.AddField ? (
              <>
                <Label style={[GS.pt3, GS.pb2]}>{I18n.t("TYPE")}</Label>
                <Item dir regular>
                  <DropDown
                    enum="CustomFieldType"
                    selectedValue={this.state.addForm.type}
                    onValueChange={val => this.addModelChange("type", val)}
                  />
                </Item>
              </>
            ) : null}
            <Label style={[GS.pt3, GS.pb2]}>{I18n.t("NAME")}</Label>
            <Item dir regular>
              <Input
                value={this.state.addForm.name}
                onChangeText={val => this.addModelChange("name", val)}
              />
            </Item>
            {this.state.page === Pages.RenameField ? (
              <Text style={GS.pt3}>
                {I18n.t("CUSTOM_FIELD__CHANGE_NAME_DESCRIPTION")}
              </Text>
            ) : null}
            {this.state.addForm.type === CustomFieldType.DropDown ? (
              <>
                <Label style={[GS.pt3, GS.pb2]}>{I18n.t("OPTIONS")}</Label>
                {this.state.addForm.items.map((item, index) => {
                  return (
                    <>
                      <Card key={item.title + index}>
                        <CardItem style={[GS.pt1, GS.pb1]} dir>
                          <View
                            style={[
                              Styles.dropDownColor,
                              { backgroundColor: item.color }
                            ]}
                          />
                          <Input
                            value={item.title}
                            onChangeText={val =>
                              this.editDropDownItem(index, val)
                            }
                          />
                          <TouchableOpacity
                            onPress={() => this.removeDropDownItem(index)}
                          >
                            <Icon name="trash" type="EvilIcons" />
                          </TouchableOpacity>
                        </CardItem>
                      </Card>
                    </>
                  );
                })}
                <Item dir regular>
                  <Input
                    value={this.state.addItemText}
                    onChangeText={addItemText => this.setState({ addItemText })}
                    onSubmitEditing={this.createDropDownItem}
                    blurOnSubmit={false}
                  />
                </Item>
              </>
            ) : null}
            <View style={[GS.pt3, GS.flexRowDir, GS.alignItemsCenter]}>
              <Text style={GS.flex1}>{I18n.t("SHOW_FIELD_ON_CARD")}</Text>
              <Switch
                value={this.state.addForm.showOnCard}
                onValueChange={val => this.addModelChange("showOnCard", val)}
              />
            </View>
            <View style={[GS.pt3, GS.pb2, GS.rowDir]}>
              <View style={GS.col6}>
                <Button onPress={this.cancelAddField} bordered light block>
                  <Text>{I18n.t("CANCEL")}</Text>
                </Button>
              </View>
              <View style={GS.col6}>
                <Button onPress={this.submitAddField} bordered block>
                  <Text>
                    {I18n.t(
                      this.state.page === Pages.RenameField ? "SAVE" : "CREATE"
                    )}
                  </Text>
                </Button>
              </View>
            </View>
            {this.state.page === Pages.RenameField ? (
              <Button
                onPress={() => this.changePage(Pages.DeleteField)}
                style={[GS.mt3, GS.mb2]}
                danger
                transparent
                block
              >
                <Text>{I18n.t("DELETE_FIELD")}</Text>
              </Button>
            ) : null}
          </Form>
        );
      case Pages.DeleteField:
        return (
          <View style={[GS.px3, GS.py2]}>
            <Text style={[GS.pt3, GS.pb2]}>
              {I18n.t("CUSTOM_FIELD__DELETE_WARNING")}
            </Text>
            <Text style={[GS.pt3, GS.pb2]}>
              {I18n.t("CUSTOM_FIELD__DELETE_GUID")}: {this.state.addForm.name}
            </Text>
            <Item dir regular>
              <Input
                value={this.state.deleteConfirm}
                onChangeText={this.deleteConfirmChange}
              />
            </Item>
            <View style={[GS.rowDir, GS.pt3, GS.pb2]}>
              <View style={GS.col6}>
                <Button
                  onPress={() => this.changePage(Pages.RenameField)}
                  bordered
                  light
                  block
                >
                  <Text>{I18n.t("CANCEL")}</Text>
                </Button>
              </View>
              <View style={GS.col6}>
                <Button
                  disabled={
                    this.state.deleteConfirm !== this.state.addForm.name
                  }
                  onPress={this.deleteField}
                  {...(this.state.deleteConfirm !== this.state.addForm.name
                    ? { dark: true }
                    : { danger: true })}
                  bordered
                  block
                >
                  <Text>{I18n.t("DELETE_FIELD")}</Text>
                </Button>
              </View>
            </View>
          </View>
        );
      default:
        return (
          <List>
            {this.props.customFields.length ? (
              <>
                <ListItem itemDivider transparent />
                {this.props.customFields.map((field, idx) => {
                  const icon = getFieldIcon(field.type);
                  const first = idx === 0;
                  const last = idx + 1 === this.props.customFields.length;
                  return (
                    <ListItem
                      onPress={() => this.toRenameField(field)}
                      first={first}
                      last={last}
                      key={field.id}
                      icon
                      dir
                    >
                      <Left>
                        <Icon {...icon} />
                      </Left>
                      <Body>
                        <Text>{field.title}</Text>
                      </Body>
                    </ListItem>
                  );
                })}
                <ListItem itemDivider transparent />
              </>
            ) : (
              <ListItem itemDivider>
                <Text note>{I18n.t("NO_CUSTOM_FIELDS")}</Text>
              </ListItem>
            )}
            <ListItem
              onPress={() => this.changePage(Pages.AddField)}
              icon
              dir
              last
              first
            >
              <Left>
                <Icon name="plus" type="Feather" />
              </Left>
              <Body>
                <Text>{I18n.t("NEW_FIELD")}</Text>
              </Body>
            </ListItem>
          </List>
        );
    }
  };
  render() {
    if (this.props.modal) {
      return (
        <View bg1>
          <View bg2 style={[ModalStyles.header, GS.my3]}>
            <Left>
              {this.state.page ? (
                <Button transparent dark onPress={() => this.changePage(0)}>
                  <Icon name="chevron-left" type="EvilIcons" />
                </Button>
              ) : null}
            </Left>
            <Body>
              <Text mute style={ModalStyles.headerTitle}>
                {I18n.t("CUSTOM_FIELD")}
              </Text>
            </Body>
            <Right />
          </View>
          <ScrollView
            style={{ maxHeight: Metrics.HEIGHT - Metrics.modalHeader }}
          >
            <this.Inside />
          </ScrollView>
        </View>
      );
    }
    return <this.Inside />;
  }
}

const { arrayOf, oneOf, shape, string, bool, any } = PropTypes;
BoardCustomFields.propTypes = {
  boardId: string,
  style: any,
  modal: bool,
  customFields: arrayOf(
    shape({
      id: string,
      type: oneOf(Object.values(CustomFieldType)),
      title: string,
      showOnCard: bool
    })
  )
};

export default BoardCustomFields;
