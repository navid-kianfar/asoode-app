import React, { Component } from "react";
import {
  View,
  Text,
  Container,
  Card,
  CardItem,
  Left,
  Body,
  Content
} from "native-base";
import Styles from "./styles";
import OrganizationService from "../../../services/organization-service";
import ActionNames from "../../../reducers/action-names";
import { connect } from "react-redux";
import GS from "../../../themes/general-styles";
import SimpleHeaderComponent from "../../../components/simple-header";
import I18n from "../../../i18n";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import Svg from "../../../components/elements/svg";

class OrganizationOperationsScreen extends Component {
  id = "";
  componentWillMount() {
    this.id = this.props.navigation.getParam("id");
  }
  messaging = () => {};
  render() {
    return (
      <Container>
        <SimpleHeaderComponent
          title={I18n.t("OPERATIONS")}
          navigation={this.props.navigation}
        />
        <Content contentContainerStyle={[GS.py2, GS.px2]}>
          <Card transparent>
            <TouchableOpacity onPress={this.messaging} activeOpacity={0.85}>
              <CardItem dir thumbnail>
                <Left>
                  <Svg name="broadcast" />
                </Left>
                <Body>
                  <Text>{I18n.t("ORGANIZATION_OPERATIONS__MESSAGING")}</Text>
                  <Text note>
                    {I18n.t("ORGANIZATION_OPERATIONS__MESSAGING_DESCRIPTION")}
                  </Text>
                </Body>
              </CardItem>
            </TouchableOpacity>
          </Card>
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
)(OrganizationOperationsScreen);
