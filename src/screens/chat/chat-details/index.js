import React, { Component } from "react";
import "moment/locale/fa";
import I18n from "../../../i18n";
import { View, Text, Container } from "native-base";
import SimpleHeaderComponent from "../../../components/simple-header";

export default class ChatDetailsScreen extends Component {
  render() {
    return (
      <Container>
        <SimpleHeaderComponent
          navigation={this.props.navigation}
          title={I18n.t("INFO")}
        />
        <View>
          <Text>info page</Text>
        </View>
      </Container>
    );
  }
}
