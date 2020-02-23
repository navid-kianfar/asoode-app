import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { Body, connectStyle, Card, H3, Text, View } from "native-base";
import Styles from "./styles";
import GS from "../../themes/general-styles";
import Thumbnail from "../elements/thumbnail";
import Members from "../members";
import PropTypes from "prop-types";
import Constants from "../../library/constants";
const { shape, string, any, arrayOf, bool } = PropTypes;

class TeamItem extends Component {
  static propTypes = {
    navigation: any.isRequired,
    isOrgan: bool,
    data: shape({
      id: string,
      picture: string,
      logo: string,
      title: string,
      description: string,
      members: arrayOf(any)
    })
  };
  state = {};
  images = {
    logo: {
      primary: require("../../assets/images/anyteam-mini.png")
    }
  };
  goToTeam = () => {
    this.props.navigation.navigate(
      this.props.isOrgan ? "OrganizationScreen" : "TeamScreen",
      this.props.data
    );
  };
  componentDidMount() {
    const data = this.props.data;
    const hasImage = data.picture || data.logo;
    const image = !hasImage
      ? this.images.logo.primary
      : { uri: Constants.BASE_URL + hasImage };
    this.setState({ image });
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.goToTeam}
        activeOpacity={0.9}
        style={GS.mx2}
      >
        <Card style={GS.overflowHidden}>
          <View style={[GS.px3, GS.py3]}>
            <View style={GS.flexRowDir}>
              <View>
                <Thumbnail source={this.state.image} />
              </View>
              <Body style={[GS.alignItemsStartDir, GS.ps3]}>
                <H3>{this.props.data.title}</H3>
                <Text note>{this.props.data.description}</Text>
              </Body>
            </View>
            <View
              style={[
                Styles.boardFooter,
                { borderColor: this.props.style.footerBorderColor }
              ]}
            >
              <Members items={this.props.data.members} />
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

export default connectStyle("Custom.BoardItem")(TeamItem);
