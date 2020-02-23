import React, { Component } from "react";
import { TouchableOpacity, ImageBackground } from "react-native";
import { View, Text, connectStyle } from "native-base";
import PropTypes from "prop-types";
import { AttachmentBoardDTO } from "../../dtos/board.dtos";
import Constants from "../../library/constants";
import GS from "../../themes/general-styles";

const generateStructure = () => {
  return Array(5)
    .fill(0)
    .map(() => {
      return Math.round(Math.random() * 3);
    });
};

const Element = props => {
  if (props.picture) {
    return (
      <ImageBackground
        style={props.elementStyle}
        source={{ uri: Constants.BASE_URL + props.picture }}
      >
        {props.children}
      </ImageBackground>
    );
  }
  return (
    <View style={[props.elementStyle, { backgroundColor: props.color }]}>
      {props.children}
    </View>
  );
};

class MicroBoard extends Component {
  static defaultProps = {
    onLongPress: () => {}
  };
  state = {
    structure: generateStructure()
  };
  openBoard = () => {
    const { id, title, color, picture } = this.props.data;
    const board = {
      id,
      title,
      boardColor: color,
      boardPicture: picture,
    };
    this.props.navigation.navigate("BoardScreen", board);
  };
  render() {
    return (
      <TouchableOpacity
        onPress={this.openBoard}
        onLongPress={this.props.onLongPress}
        activeOpacity={0.85}>
        <Element
          elementStyle={this.props.style.backgroundStyles}
          picture={this.props.data.picture}
          color={this.props.data.color}
        >
          <View>
            <Text numberOfLines={1} bold style={this.props.style.headerTitle}>
              {this.props.data.title}
            </Text>
          </View>
          <View style={[GS.flexRowDir, this.props.style.listContainer]}>
            {this.state.structure.map((i, j) => (
              <View key={j.toString()} style={this.props.style.list}>
                {Array(i)
                  .fill(0)
                  .map((_, k) => (
                    <View
                      key={j + k.toString()}
                      style={this.props.style.card}
                    />
                  ))}
              </View>
            ))}
          </View>
        </Element>
      </TouchableOpacity>
    );
  }
}
MicroBoard.propTypes = {
  data: PropTypes.shape(AttachmentBoardDTO),
  navigation: PropTypes.any
};
export default connectStyle("Custom.MicroBoard")(MicroBoard);
