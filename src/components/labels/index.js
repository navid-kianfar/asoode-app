import React, { Component } from "react";
import { Icon, Input, Item, View, Label, Button, Text } from "native-base";
import PropTypes from "prop-types";
import I18n from "../../i18n";
import LabelItem from "./label-item";
import { LayoutAnimation } from "react-native";
import { TriangleColorPicker } from "react-native-color-picker";
import GS from "../../themes/general-styles";

class LabelsComponent extends Component {
  // backend: '/user/card/labels/default-list/' + this.props.boardId
  static defaultProps = {
    pageChange: () => {},
  };
  state = {
    editingLabel: undefined,
    createPage: false
  };
  //TODO: get labels
  labels = [
    {
      id: "0ce9e8b2-759b-445e-883d-cf11afc67e17",
      title: "test",
      value: "#ffa2b3",
      selected: false
    },
    {
      id: "0ce9e8b1-759b-445e-883d-cf11afc67e17",
      title: "test",
      value: "#f683ff",
      selected: false
    },
    {
      id: "286c5182-ee5f-4031-8fc8-a85d446d6a87",
      title: "sass",
      value: "#61bd4f",
      selected: false
    },
    {
      id: "3f0db13c-59db-4629-9254-c708eb3c6919",
      title: "خیلی مهم",
      value: "#eb5a46",
      selected: false
    },
    {
      id: "402924d1-4c07-4e41-a96f-8e170e06897b",
      title: "pink!!!!",
      value: "#ff78cb",
      selected: false
    },
    {
      id: "42f88215-1573-4fe5-8139-9270e64121d9",
      title: null,
      value: "#00c2e0",
      selected: false
    },
    {
      id: "5ed684a8-3b60-44b8-bd21-0cdcbef4b90a",
      title: null,
      value: "#344563",
      selected: false
    },
    {
      id: "973c21d4-4ce6-4b5f-bb6e-cb55b30f620f",
      title: "lamda pro cs",
      value: "#0079bf",
      selected: false
    },
    {
      id: "b070209e-d555-4ea6-983c-ac54d4543af6",
      title: null,
      value: "#c377e0",
      selected: false
    },
    {
      id: "d64c1b62-4972-471e-af08-d022cbaa1d48",
      title: "خیلی خیلی مهم",
      value: "#51e898",
      selected: false
    },
    {
      id: "d922bf98-56e1-4e74-850b-feabe94bffa7",
      title: "warning",
      value: "#f2d600",
      selected: false
    }
  ];
  toggleCreate = () => {
    const createPage = !this.state.createPage;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ createPage });
    this.props.pageChange(createPage);
  };
  render() {
    if (this.state.createPage) {
      return (
        <>
          <Label>{I18n.t("TITLE")}</Label>
          <Item dir regular>
            <Input />
          </Item>
          <Item style={GS.my2} dir regular>
            <TriangleColorPicker
              onColorSelected={color => alert(`Color selected: ${color}`)}
              style={{ flex: 1, width: 250, height: 250 }}
            />
          </Item>
          <Button onPress={this.toggleCreate} block bordered>
            <Text>{I18n.t("CANCEL")}</Text>
          </Button>
        </>
      );
    }
    return (
      <>
        <Item style={GS.my2} rounded custom dir>
          <Icon name="search" />
          <Input
            placeholder={I18n.t("FILTER")}
            clearButtonMode="while-editing"
          />
        </Item>
        {this.labels.map((label, idx) => {
          let checked = false;
          if (this.props.cardLabels) {
            checked =
              this.props.cardLabels.findIndex(l => l.id === label.id) !== -1;
          }
          return (
            <LabelItem
              key={label.id}
              data={label}
              editing={this.state.editingLabel === idx}
              editingChange={start =>
                this.setState({ editingLabel: start ? idx : undefined })
              }
              cardLabel={!!this.props.cardLabels}
              checked={checked}
              onSelect={this.props.onToggleLabel}
            />
          );
        })}
        <Button onPress={this.toggleCreate} bordered block>
          <Text>{I18n.t("CREATE_LABEL")}</Text>
        </Button>
      </>
    );
  }
}
LabelsComponent.propTypes = {
  boardId: PropTypes.string,
  onToggleLabel: PropTypes.func
};

export default LabelsComponent;
