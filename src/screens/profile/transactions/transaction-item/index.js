import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { Body, Left, H3, Text, View, Card } from "native-base";
import I18n from "../../../../i18n";
import Styles from "../styles";
import GS from "../../../../themes/general-styles";
import Members from "../../../../components/members";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { getPaymentStatusColor } from "../../../../library/general-helpers";
import {
  OrderDTO,
  PanelTransactionDTO
} from "../../../../dtos/transactions.dtos";
import { Banks, PaymentStatus } from "../../../../library/enums";

const MomentText = props => {
  return <Text note>{props.children}</Text>;
};
export default class TransactionItem extends Component {
  static propTypes = {
    navigation: PropTypes.any.isRequired,
    // data: PropTypes.shape(PanelTransactionDTO)
    data: PropTypes.shape({
      index: PropTypes.number,
      id: PropTypes.string,
      orderId: PropTypes.string,
      bank: PropTypes.oneOf(Object.values(Banks)),
      amount: PropTypes.number,
      status: PropTypes.oneOf(Object.values(PaymentStatus)),
      createDate: PropTypes.string,
      trackingCode: PropTypes.string,
      referenceNumber: PropTypes.string,
      externalId: PropTypes.string,
      detail: PropTypes.string,
      order: PropTypes.shape(OrderDTO)
    })
  };
  state = {};
  transactionDetails = () => {
    this.props.navigation.navigate("TransactionDetailScreen", this.props.data);
  };
  componentDidMount() {
    this.setState({ color: getPaymentStatusColor(this.props.data.status) });
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.transactionDetails}
        activeOpacity={0.9}
        key={this.props.data.id}
        style={GS.mx2}
      >
        <Card style={GS.overflowHidden}>
          <View style={[GS.px3, GS.py3, GS.rowDir]}>
            <View style={Styles.timeContainer}>
              <Moment locale="fa" element={H3} local format="HH:mm">
                {this.props.data.createDate}
              </Moment>
              <Moment locale="fa" element={MomentText} local format="YY/MM/DD">
                {this.props.data.createDate}
              </Moment>
            </View>
            <Body
              style={[
                GS.alignItemsStartDir,
                GS.ps2,
                Styles.calendarCardBody,
                { borderColor: this.state.color }
              ]}
            >
              <Text style={[GS.mb2, { color: this.state.color }]}>
                {I18n.enum("PaymentStatus", this.props.data.status)}
              </Text>
              <Text style={GS.mb1}>{this.props.data.planTitle}</Text>
              <Text note>{this.props.data.amount}</Text>
            </Body>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}
