import React, { Component } from "react";
import {
  Body,
  Button,
  Container,
  Content,
  Icon,
  Left,
  Right,
  Header,
  Text,
  Title,
  View
} from "native-base";
import GS from "../../../themes/general-styles";
import I18n from "../../../i18n";
import Thumbnail from "../../../components/elements/thumbnail";
import Styles from "../../profile/styles";

class ContactScreen extends Component {
  state = {
    editMode: false
  };
  editable = this.props.navigation.getParam("editable");
  backTitle = this.props.navigation.getParam("backTitle");
  name = this.props.navigation.getParam("name");
  info = this.props.navigation.getParam("info");
  onLeftBtn = () => {
    if (this.state.editMode) {
      this.setState({ editMode: false });
    } else {
      this.props.navigation.goBack(null);
    }
  };
  onRightBtn = () => {
    if (this.state.editMode) {
      //  save changes
    }
    this.setState({ editMode: !this.state.editMode });
  };
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={this.onLeftBtn} dark transparent>
              {this.state.editMode ? (
                <Text>{I18n.t("CANCEL")}</Text>
              ) : (
                <>
                  <Icon
                    style={GS.headerIcon}
                    name="chevron-left"
                    type="Feather"
                  />
                  <Text>{this.backTitle}</Text>
                </>
              )}
            </Button>
          </Left>
          <Right>
            {this.editable ? (
              <Button onPress={this.onRightBtn} dark transparent>
                <Text>
                  {this.state.editMode ? I18n.t("DONE") : I18n.t("EDIT")}
                </Text>
              </Button>
            ) : null}
          </Right>
        </Header>
        <Content>
          <View style={[GS.alignItemsCenter, GS.px2, GS.py3]}>
            <Thumbnail
              contentContainerStyle={GS.my2}
              onPress={this.changeAvatar}
              // source={}
              title={this.name}
              large
            />
            <Text style={[GS.textCenter, Styles.name]}>{this.name}</Text>
          </View>
        </Content>
      </Container>
    );
  }
}

export default ContactScreen;
