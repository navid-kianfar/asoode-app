import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { Body, Card, H3, Text, View, connectStyle } from "native-base";
import Styles from "./styles";
import GS from "../../themes/general-styles";
import Thumbnail from "../elements/thumbnail";
import Svg from "../elements/svg";
import Members from "../members";
import PropTypes from "prop-types";
import Constants from "../../library/constants";
const { shape, string, any, number, arrayOf, bool } = PropTypes;

class BoardItem extends Component {
  static propTypes = {
    archived: bool,
    navigation: any.isRequired,
    data: shape({
      id: string,
      boardPicture: string,
      title: string,
      teamTitle: string,
      totalDone: number,
      totalTasks: number,
      members: arrayOf(any)
    })
  };
  state = {
    percent: this.getPercentage()
  };
  images = {
    logo: {
      primary: require("../../assets/images/anyteam-mini.png")
    }
  };
  componentDidMount() {
    const image = !this.props.data.boardPicture
      ? this.images.logo.primary
      : { uri: Constants.BASE_URL + this.props.data.boardPicture };
    this.setState({ image });
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.data.totalDone !== prevProps.data.totalDone ||
      this.props.data.totalTasks !== prevProps.data.totalTasks
    ) {
      this.setState({ percent: this.getPercentage() });
    }
  }

  getPercentage() {
    return this.props.data.totalTasks
      ? Math.round(
          (this.props.data.totalDone * 100) / this.props.data.totalTasks
        )
      : 0;
  }

  progressInnerStyles = [
    Styles.boxProgressInner,
    {
      width: this.state.percent + "%",
      backgroundColor:
        this.state.percent > 70
          ? "#61bd4f"
          : this.state.percent > 30
          ? "#f2d600"
          : "#ffc107"
    }
  ];
  goToBoard = () => {
    const board = {
      ...this.props.data,
      archived: this.props.archived === true
    };
    this.props.navigation.navigate("BoardScreen", board);
  };

  render() {
    return (
      <TouchableOpacity
        onPress={this.goToBoard}
        activeOpacity={0.9}
        key={this.props.data.id}
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
                <Text note>{this.props.data.teamTitle}</Text>
              </Body>
            </View>
            {typeof this.props.data.totalTasks === "number" ? (
              <>
                <View
                  style={[
                    Styles.boardFooter,
                    { borderColor: this.props.style.footerBorderColor }
                  ]}
                >
                  <View style={[GS.flexRowDir, GS.alignItemsCenter]}>
                    <Svg
                      name="checked-checkbox"
                      color={this.props.style.color}
                      size={25}
                      wrapperStyle={GS.me2}
                    />
                    <Text note>
                      {this.props.data.totalDone}/{this.props.data.totalTasks}
                    </Text>
                  </View>
                  <Members items={this.props.data.members} />
                </View>
                <View
                  style={[
                    Styles.boxProgress,
                    { backgroundColor: this.props.style.progressColor }
                  ]}
                >
                  <View style={this.progressInnerStyles} />
                </View>
              </>
            ) : null}
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

export default connectStyle("Custom.BoardItem")(BoardItem);
