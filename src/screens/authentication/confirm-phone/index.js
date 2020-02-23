import React, { Component } from "react";
import { ImageBackground, StatusBar } from "react-native";
import {
  View,
  H2,
  Item,
  Input,
  Button,
  Text,
  Icon,
  Content,
  Container
} from "native-base";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from "react-native-google-signin";
import I18n from "../../../i18n.js";
import Captcha from "../../../components/elements/captcha";
import GS from "../../../themes/general-styles";
import IdentityService from "../../../services/identity-service";
import ValidationService from "../../../services/validation-service";
import ToastService from "../../../services/toast-service";
import AlertService from "../../../services/alert-service";
import * as Enums from "../../../library/enums";

import Styles from "../styles";
const Images = {
  background: {
    auth: require("../../../assets/images/auth-background.png")
  }
};
export default class ConfirmScreen extends Component {
  state = {
    waiting: false,
    username: this.props.navigation.getParam("username").split("@")[0],
    code: "",
    captcha: {
      token: "",
      code: ""
    }
  };
  componentDidMount() {}

  render() {
    return (
      <>
        <StatusBar
          translucent
          backgroundColor="#fff3"
          barStyle="dark-content"
        />
        <Container>
          <ImageBackground
            source={Images.background.auth}
            style={Styles.container}
            imageStyle={Styles.backgroundImage}
          >
            <Content
              style={{ zIndex: 0 }}
              contentContainerStyle={Styles.scrollable}
            >
              <View style={Styles.content}>
                <View bg1 style={Styles.box}>
                  <H2 style={[GS.textCenter, GS.my4]}>
                    {I18n.t("ACCOUNT_PHONE_NOT_CONFIRMED")}
                  </H2>
                  <Item style={GS.mb3} regular>
                    <Input
                      ref={"code"}
                      style={GS.textLeft}
                      onChangeText={code => this.setState({ code })}
                      placeholder={I18n.t("ACCOUNT_CONFIRMATION_CODE")}
                      keyboardType={"numeric"}
                      maxLength={6}
                      autoCompleteType={"off"}
                      autoCorrect={false}
                      returnKeyType="done"
                    />
                  </Item>
                  <Captcha
                    ref="captcha"
                    onChange={captcha => this.setState({ captcha })}
                    style={GS.mb3}
                    regular
                  />
                  <View style={[GS.row, GS.mb3]}>
                    <View style={GS.col12}>
                      <Button onPress={this.confirm} block>
                        <Text>
                          {I18n.t("CONFIRM") + " " + this.state.username}
                        </Text>
                      </Button>
                    </View>
                  </View>
                </View>
              </View>
            </Content>
          </ImageBackground>
        </Container>
      </>
    );
  }

  confirm = async () => {
    const position = ToastService.Toast.CENTER;
    if (!ValidationService.isMobile(this.state.username)) {
      ToastService.warning("CORE_MOBILE_INVALID", position);
      return;
    }
    if (this.state.code.length !== 6) {
      ToastService.warning("CORE_CODE_INVALID", position);
      return;
    }
    if (!ValidationService.validateCaptcha(this.state.captcha)) {
      ToastService.warning("CORE_CAPTCHA_INVALID", position);
      return;
    }
    const payload = {
      username: this.state.username,
      captcha: this.state.captcha,
      code: this.state.code
    };
    this.refs.captcha.refresh();
    const op = await IdentityService.confirmPhone(payload);
    if (op.data) {
      this.props.navigation.navigate("AppInit");
      return;
    }
    const errMessage = IdentityService.handleError(op);
    AlertService.error(errMessage, null);
  };
}
