import React, { Component } from "react";
import {
  Text,
  Container,
  Content,
  Form,
  Item,
  Label,
  Input,
  Button,
  Icon,
  Left
} from "native-base";
import Styles from "./styles";
import Alert from "../../../services/alert-service";
import { StatusBar } from "react-native";
import SimpleHeaderComponent from "../../../components/simple-header";
import I18n from "../../../i18n";
import GS from "../../../themes/general-styles";
import FormComponent from "../../../components/elements/form";

export default class TeamSettingsScreen extends Component {
  id = "";
  formElements = [
    {
      type: "input",
      field: "title",
      label: I18n.t("NAME"),
      validation: {
        required: true,
        min: 2
      }
    },
    {
      type: "input",
      field: "shortName",
      label: I18n.t("SHORT_NAME"),
      validation: {
        required: true,
        min: 2
      }
    },
    {
      type: "input",
      field: "website",
      label: I18n.t("WEBSITE")
    },
    {
      type: "input",
      field: "description",
      label: I18n.t("DESCRIPTION"),
      numberOfLines: 4,
      validation: {
        required: true
      }
    }
  ];
  container;
  componentWillMount() {
    this.id = this.props.navigation.getParam("id");
  }
  saveChanges = () => {};
  removeTeam = () => {
    Alert.confirm("ORDER_CONFIRM_MESSAGE_IRREVERSIBLE", "DELETE_THIS_TEAM", [
      {
        text: I18n.t("CANCEL"),
        style: "cancel"
      },
      {
        text: I18n.t("DELETE"),
        onPress: () => {},
        style: "destructive"
      }
    ]);
  };
  render() {
    return (
      <Container light>
        <SimpleHeaderComponent
          title={I18n.t("SETTINGS")}
          navigation={this.props.navigation}
        />
        <Content contentContainerStyle={GS.flexGrow1}>
          <FormComponent
            formElements={this.formElements}
            formStyle="regular"
            labelsStyle={[GS.pt3, GS.pb2]}
            containerStyle={[GS.flex1, GS.px3, GS.py2]}
            buttonProps={{ block: true }}
            backend={`/user/teams/edit/${this.props.id}`}
          />
          <Button
            onPress={this.removeTeam}
            style={[GS.mx2, GS.mb2]}
            danger
            transparent
            block
          >
            <Text>{I18n.t("DELETE_THIS_TEAM")}</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
