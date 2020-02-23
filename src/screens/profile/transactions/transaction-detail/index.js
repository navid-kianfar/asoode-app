import React, { Component } from "react";
import { View, Text, Container, Content, Button } from "native-base";
import I18n from "../../../../i18n";
import SimpleHeaderComponent from "../../../../components/simple-header";

export default class TransactionDetailScreen extends Component {
  render() {
    return (
      <Container>
        <SimpleHeaderComponent
          navigation={this.props.navigation}
          title={I18n.t("TRANSACTIONS")}
        />
        <Text>load transaction detail</Text>
      </Container>
    );
  }
}
