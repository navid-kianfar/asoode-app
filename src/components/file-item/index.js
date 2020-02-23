import React, { Component } from "react";
import {
  NativeEventEmitter,
  NativeModules,
  TouchableOpacity
} from "react-native";
import { Card, CardItem, Left, Body, Text, View } from "native-base";
import PropTypes from "prop-types";
import Styles from "./styles";
import Thumbnail from "../elements/thumbnail";
import Moment from "react-moment";
import { FileItemDTO } from "../../dtos/file-manager.dtos";
import Image from "../elements/image";
import FileService from "../../services/file-service";

export default class FileItem extends Component {
  static propTypes = {
    data: PropTypes.shape(FileItemDTO),
    onPick: PropTypes.func
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return false;
  }

  render() {
    const name = this.props.data.name.split(".");
    name.pop();
    return (
      <Card noBorder noShadow>
        <TouchableOpacity
          onPress={() => {
            if (this.props.onPick) {
              this.props.onPick(this.props.data);
            }
          }}
          onLongPress={() => alert("Show Operations")}
          activeOpacity={0.8}
        >
          <CardItem dir thumbnail>
            <Left>
              <Image
                containerStyle={Styles.imageContainer}
                style={Styles.image}
                resizeMode={this.props.data.isImage ? "cover" : "contain"}
                source={
                  this.props.data.isImage
                    ? this.props.data.path
                    : FileService.fileThumbnail(this.props.data.extention)
                }
              />
            </Left>
            <Body>
              <Text>
                <Text bold>{name.join(".")}</Text>
                <Text>{this.props.data.size}</Text>
              </Text>
            </Body>
          </CardItem>
        </TouchableOpacity>
      </Card>
    );
  }
}
