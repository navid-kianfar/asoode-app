import React, { Component } from "react";
import { Button, Content, Icon, Segment, Text, View } from "native-base";
import GS from "../../themes/general-styles";
import I18n from "../../i18n";
import Styles from "../../screens/creation/styles";
import { ImageBackground, TouchableOpacity } from "react-native";
import Constants from "../../library/constants";
import PropTypes from "prop-types";

const pictures = [
  {
    id: "80f99ef0-44e1-40cd-8a9e-c24b299e8fba",
    title: "picture 16",
    latinTitle: "picture 16",
    path: "/storage/uploaded_images/14555997-a5e7-43c1-b8a9-81d959595689.jpg",
    dark: true
  },
  {
    id: "13d5ed33-168b-4b4b-9813-3073f1ea8524",
    title: "picture 15",
    latinTitle: "picture 15",
    path: "/storage/uploaded_images/533270be-0b77-4f5f-aab3-20926fb6c3fa.jpg",
    dark: false
  },
  {
    id: "96b6e00b-565b-4cdc-acfa-54b3ddc5991d",
    title: "picture 13",
    latinTitle: "picture 13",
    path: "/storage/uploaded_images/e79899c0-dedd-494b-9e2e-c5408cf091c9.jpg",
    dark: false
  },
  {
    id: "0096840f-59b1-4326-835b-ab554108d4c7",
    title: "picture 12",
    latinTitle: "picture 12",
    path: "/storage/uploaded_images/40bcb666-a0ee-44c3-b207-313997676528.jpg",
    dark: true
  },
  {
    id: "aeb21992-dbb9-4a83-a336-42fbc23b7d20",
    title: "picture 10",
    latinTitle: "picture 10",
    path: "/storage/uploaded_images/cbbe5f9c-37fa-4cf2-8565-748bb9731461.jpg",
    dark: true
  },
  {
    id: "a29bc058-cc96-4868-9063-a594732d7a93",
    title: "picture 9",
    latinTitle: "picture 9",
    path: "/storage/uploaded_images/6c33d172-bcac-42fe-a810-4b0f8b9319ef.jpg",
    dark: true
  },
  {
    id: "9134c38c-dffa-4540-bd2f-599c82a1db6a",
    title: "picture 7",
    latinTitle: "picture 7",
    path: "/storage/uploaded_images/5381a5e8-2ab8-4f4f-8856-2156c2a68d01.jpg",
    dark: true
  },
  {
    id: "88e5a257-66ca-4176-affe-03ae8ca778ae",
    title: "عنوان 44 ",
    latinTitle: "pic 3",
    path: "/storage/uploaded_images/5c5decd6-d737-4649-8dcd-4f567585a54b.jpg",
    dark: true
  },
  {
    id: "7405aa1b-9b51-4678-bf06-8d7535b4668e",
    title: "تصویر ۲",
    latinTitle: "pic 2",
    path: "/storage/uploaded_images/6bc5e0b2-4626-4903-9a10-b6b260c37b0b.jpg",
    dark: false
  },
  {
    id: "2bde90d0-59f5-40a7-998d-064130d0b316",
    title: "تصویر ۱",
    latinTitle: "pic 1",
    path: "/storage/uploaded_images/bd5f1ddf-1f64-4f0e-8328-635522c04f07.jpg",
    dark: false
  }
]; // TODO: change to global pictures
const colors = [
  {
    id: "c703ba17-3fb9-4e5e-9272-a7fedf89ddfc",
    title: "خاکستری",
    latinTitle: "gray",
    value: "#344563"
  },
  {
    id: "52c2b179-f234-457d-a2a2-cd62def53901",
    title: "صورتی",
    latinTitle: "pink",
    value: "#ff78cb"
  },
  {
    id: "32e0d684-9862-4325-9d61-8718368bc540",
    title: "آکوامارین",
    latinTitle: "aquamarine",
    value: "#51e898"
  },
  {
    id: "ecc1fec9-fa1b-4cc5-99a5-80de402b7650",
    title: "آبی روشن",
    latinTitle: "lightBlue",
    value: "#00c2e0"
  },
  {
    id: "8a1c8a5e-ecc9-489a-9e91-09f51e9f8878",
    title: "سبز",
    latinTitle: "green",
    value: "#61bd4f"
  },
  {
    id: "6fe30746-0c9a-4ebd-b6a5-4c044acdb0df",
    title: "زرد",
    latinTitle: "yellow",
    value: "#f2d600"
  },
  {
    id: "73fc51ca-f1c9-4652-a2cb-382efc020e36",
    title: "نارنجی",
    latinTitle: "orange",
    value: "#ff9f1a"
  },
  {
    id: "2254ae1b-7d31-43c8-9291-d1931e28ab66",
    title: "قرمز",
    latinTitle: "red",
    value: "#eb5a46"
  },
  {
    id: "76e21e55-a6d3-4b7f-97a3-b22d7bf143ea",
    title: "بنفش",
    latinTitle: "purple",
    value: "#c377e0"
  },
  {
    id: "380ee355-bf64-4447-bb48-5c508eb1320e",
    title: "آبی تیره",
    latinTitle: "darkBlute",
    value: "#0079bf"
  }
]; // TODO: change to global colors

export default class ChooseBackgroundComponent extends Component {
  static propTypes = {
    modelChange: PropTypes.func,
    color: PropTypes.string,
    picture: PropTypes.string
  };
  state = {
    showColors: false
  };
  componentDidMount() {
    if (!this.props.color && !this.props.picture) {
      this.setBackground(false, pictures[0].id);
    }
    if (this.props.color && this.props.color[0] === "#") {
      const color = colors.find(col => col.value === this.props.color);
      this.setBackground(true, color.id, true);
    }
    if (this.props.picture && this.props.picture[0] === "/") {
      const picture = pictures.find(p => p.path === this.props.picture);
      this.setBackground(false, picture.id, true);
    }
  }

  setBackground = (isColor, id, skipProp) => {
    const obj = {};
    obj[isColor ? "colorId" : "pictureId"] = id;
    obj[!isColor ? "colorId" : "pictureId"] = undefined;
    this.setState(obj);
    if (!skipProp) {
      this.props.modelChange(obj);
    }
  };
  BackgroundItem = props => {
    const isColor = !!props.color;
    const id = props.color?.id || props.picture.id;
    const CheckedItem = () => {
      if (
        (isColor && id !== this.state.colorId) ||
        (!isColor && id !== this.state.pictureId)
      ) {
        return null;
      }
      return (
        <View style={Styles.checked}>
          <Icon style={{ color: "#fff" }} name="check" type="Feather" />
        </View>
      );
    };
    return (
      <View style={[GS.col6, GS.pb3]}>
        <TouchableOpacity
          onPress={() => this.setBackground(isColor, id)}
          activeOpacity={0.8}
          style={Styles.backgroundCard}
        >
          {props.color ? (
            <View style={[GS.flex1, { backgroundColor: props.color.value }]}>
              <CheckedItem />
            </View>
          ) : (
            <ImageBackground
              style={GS.flex1}
              resizeMode="cover"
              source={{ uri: Constants.BASE_URL + props.picture.path }}
            >
              <CheckedItem />
            </ImageBackground>
          )}
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    return (
      <View style={[GS.flex1, GS.flexShrink1, GS.py3]}>
        <Segment style={[GS.mb3, GS.bg_none]}>
          <Button
            onPress={() => this.setState({ showColors: false })}
            active={!this.state.showColors}
            first
          >
            <Text>{I18n.t("PHOTOS")}</Text>
          </Button>
          <Button
            onPress={() => this.setState({ showColors: true })}
            active={this.state.showColors}
            last
          >
            <Text>{I18n.t("COLORS")}</Text>
          </Button>
        </Segment>
        <Content contentContainerStyle={[GS.flexGrow1, GS.px2]}>
          <View style={GS.rowDir}>
            {this.state.showColors
              ? colors.map(c => <this.BackgroundItem key={c.id} color={c} />)
              : pictures.map(p => (
                  <this.BackgroundItem key={p.id} picture={p} />
                ))}
          </View>
        </Content>
      </View>
    );
  }
}
