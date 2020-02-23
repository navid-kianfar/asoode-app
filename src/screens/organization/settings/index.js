import React, { Component } from "react";
import {
  View,
  Button,
  Text,
  Container,
  Content,
  Card,
  CardItem,
  Left,
  Body
} from "native-base";
import Alert from "../../../services/alert-service.js";
import { connect } from "react-redux";
import GS from "../../../themes/general-styles";
import SimpleHeaderComponent from "../../../components/simple-header";
import I18n from "../../../i18n";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import FormComponent from "../../../components/elements/form";
import Svg from "../../../components/elements/svg";

class OrganizationSettingsScreen extends Component {
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
  deleteConfirm = () => {
    Alert.confirm("ORDER_CONFIRM_MESSAGE_IRREVERSIBLE", "DELETE_ORGANIZATION", [
      {
        text: I18n.t("CANCEL"),
        style: "cancel"
      },
      {
        text: I18n.t("REMOVE"),
        onPress: () => {},
        style: "destructive"
      }
    ]);
  };
  buttons = [
    {
      title: I18n.t("ORGANIZATION_SETTINGS__CHANGE_PROFILE"),
      description: I18n.t("ORGANIZATION_SETTINGS__CHANGE_PROFILE_DESCRIPTION"),
      icon: "form",
      action: () => {
        this.props.navigation.navigate("OrganizationChangeProfileScreen", {
          id: this.id
        });
      }
    },
    {
      title: I18n.t("ORGANIZATION_SETTINGS__TRANSFER"),
      description: I18n.t("ORGANIZATION_SETTINGS__TRANSFER_DESCRIPTION"),
      icon: "transfer",
      action: () => {}
    },
    {
      title: I18n.t("ORGANIZATION_SETTINGS__CONVERT_TO_SUB_ORGANIZATION"),
      description: I18n.t(
        "ORGANIZATION_SETTINGS__CONVERT_TO_SUB_ORGANIZATION_DESCRIPTION"
      ),
      icon: "sub-organization",
      action: () => {}
    },
    {
      title: I18n.t("ORGANIZATION_SETTINGS__DELETE_ORGANIZATION"),
      description: I18n.t(
        "ORGANIZATION_SETTINGS__DELETE_ORGANIZATION_DESCRIPTION"
      ),
      icon: "trash",
      action: this.deleteConfirm
    }
  ];
  componentWillMount() {
    this.id = this.props.navigation.getParam("id");
  }
  render() {
    return (
      <Container>
        <SimpleHeaderComponent
          title={I18n.t("SETTINGS")}
          navigation={this.props.navigation}
        />
        <Content contentContainerStyle={[GS.py2, GS.px2]}>
          {this.buttons.map(b => (
            <Card key={`${b.title}`} transparent>
              <TouchableOpacity onPress={b.action} activeOpacity={0.85}>
                <CardItem dir thumbnail>
                  <Left>
                    <Svg name={b.icon} />
                  </Left>
                  <Body>
                    <Text>{b.title}</Text>
                    <Text note>{b.description}</Text>
                  </Body>
                </CardItem>
              </TouchableOpacity>
            </Card>
          ))}
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  dataSource: state.organization
});
const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationSettingsScreen);
