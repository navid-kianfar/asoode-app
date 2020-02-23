import React, { Component } from "react";
import { Card, CardItem, Left, Body, Text } from "native-base";
import { TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Styles from "./styles";
import Image from "../elements/image";
import { FolderItemDTO } from "../../dtos/file-manager.dtos";
const folderIcon = require("../../assets/images/files/icons8-folder-80.png");
export default class FolderItem extends Component {
  static propTypes = {
    data: PropTypes.shape(FolderItemDTO),
    onPick: PropTypes.func
  };
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return false;
  }
  onPick = () => {
    if (this.props.onPick) {
      this.props.onPick(this.props.data);
    }
  };

  render() {
    return (
      <Card noBorder noShadow transparent>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.onPick}
          onLongPress={() => alert("Show Operations")}
        >
          <CardItem dir thumbnail>
            <Left>
              <Image
                containerStyle={Styles.imageContainer}
                style={Styles.image}
                resizeMode="contain"
                source={folderIcon}
              />
            </Left>
            <Body>
              <Text>
                <Text bold>{this.props.data.name}</Text>
                <Text>{this.props.data.size}</Text>
              </Text>
            </Body>
          </CardItem>
        </TouchableOpacity>
      </Card>
    );
  }
}
