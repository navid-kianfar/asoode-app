import React, { Component } from "react";
import { View, Text, Container } from "native-base";
import { ActivityIndicator } from "react-native";
import I18n from "../../../i18n";
import Styles from "./styles";
import { connect } from "react-redux";
import IdentityService from "../../../services/identity-service";
import ActionNames from "../../../reducers/action-names";
import SimpleHeaderComponent from "../../../components/simple-header";
import GS from "../../../themes/general-styles";
import LazyLoadFlatList from "../../../components/elements/lazy-load";
import TransactionItem from "./transaction-item";

class TransactionsScreen extends Component {
  componentDidMount() {
    this.props.refresh(false);
  }
  renderTransactions = ({ item }) => {
    return <TransactionItem navigation={this.props.navigation} data={item} />;
  };
  render() {
    return (
      <Container>
        <SimpleHeaderComponent
          navigation={this.props.navigation}
          title={I18n.t("TRANSACTIONS")}
        />
        {!this.props.dataSource.transactions ? (
          <View style={GS.waitingContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <LazyLoadFlatList
            backend={"/user/transactions/filter"}
            flatListProps={{
              contentContainerStyle: [GS.flexGrow1, GS.px2, GS.py2],
              renderItem: this.renderTransactions,
              keyExtractor: item => item.id
            }}
          />
        )}
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  dataSource: state.auth
});
const mapDispatchToProps = dispatch => ({
  refresh: skip => IdentityService.transactions(dispatch, skip),
  toggleRefresh: status => {
    dispatch({
      type: ActionNames.TransactionsRefresh,
      payload: status
    });
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(TransactionsScreen);
