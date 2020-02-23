import React, { Component } from "react";
import { ImageBackground, StatusBar } from "react-native";
import I18n from "../../../i18n";
import {
  View,
  H2,
  Item,
  Input,
  Button,
  Text,
  Icon,
  Container,
  Content
} from "native-base";
import GeneralStyles from "../../../themes/general-styles";
import Styles from "../styles";
import Captcha from "../../../components/elements/captcha";
import IdentityService from "../../../services/identity-service";
import * as Enums from "../../../library/enums";
import AlertService from "../../../services/alert-service";
import ValidationService from "../../../services/validation-service";
import ToastService from "../../../services/toast-service";
const Images = {
  background: {
    auth: require("../../../assets/images/auth-background.png")
  }
};
export default class RegisterScreen extends Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
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
                  <H2 style={[GeneralStyles.textCenter, GeneralStyles.my4]}>
                    {I18n.t("CREATE_NEW_ACCOUNT")}
                  </H2>
                  <View style={GeneralStyles.row}>
                    <View style={GeneralStyles.col6}>
                      <Item style={GeneralStyles.mb3} regular>
                        <Input
                          onChangeText={firstName =>
                            this.setState({ firstName })
                          }
                          placeholder={I18n.t("NAME")}
                        />
                      </Item>
                    </View>
                    <View style={GeneralStyles.col6}>
                      <Item style={GeneralStyles.mb3} regular>
                        <Input
                          onChangeText={lastName => this.setState({ lastName })}
                          placeholder={I18n.t("LAST_NAME")}
                        />
                      </Item>
                    </View>
                  </View>
                  <Item style={GeneralStyles.mb3} regular>
                    <Input
                      onChangeText={username => this.setState({ username })}
                      autoCompleteType="email"
                      autoCorrect={false}
                      keyboardType="email-address"
                      returnKeyType="next"
                      placeholder={I18n.t("ENTER_YOUR_EMAIL")}
                    />
                  </Item>
                  <Item style={GeneralStyles.mb3} regular>
                    <Input
                      onChangeText={password => this.setState({ password })}
                      secureTextEntry={true}
                      placeholder={I18n.t("ENTER_YOUR_PASSWORD")}
                    />
                  </Item>
                  <Item style={GeneralStyles.mb3} regular>
                    <Input
                      onChangeText={confirmPassword =>
                        this.setState({ confirmPassword })
                      }
                      secureTextEntry={true}
                      placeholder={I18n.t("ENTER_CONFIRM_YOUR_PASSWORD")}
                    />
                  </Item>
                  <Captcha
                    ref="captcha"
                    onChange={captcha => this.setState({ captcha })}
                    style={GeneralStyles.mb3}
                    regular
                  />
                  <View style={[GeneralStyles.row, GeneralStyles.mb3]}>
                    <View style={GeneralStyles.col6}>
                      <Button onPress={this.goToSignIn} block light>
                        <Text>{I18n.t("SIGN_IN")}</Text>
                      </Button>
                    </View>
                    <View style={GeneralStyles.col6}>
                      <Button onPress={this.signUp} block>
                        <Text>{I18n.t("SIGN_UP")}</Text>
                      </Button>
                    </View>
                  </View>
                  {/*<View style={GeneralStyles.mb3}>*/}
                  {/*  <Text style={GeneralStyles.textCenter} muted>*/}
                  {/*    {I18n.t("SIGN_IN_WITH_SOCIAL")}*/}
                  {/*  </Text>*/}
                  {/*</View>*/}
                  {/*<View style={GeneralStyles.row}>*/}
                  {/*  <View style={[GeneralStyles.col4, GeneralStyles.offset4]}>*/}
                  {/*    <Button block light bordered>*/}
                  {/*      <Icon type="Ionicons" name="logo-google" />*/}
                  {/*    </Button>*/}
                  {/*  </View>*/}
                  {/*</View>*/}
                </View>
              </View>
            </Content>
          </ImageBackground>
        </Container>
      </>
    );
  }
  goToSignIn = () => {
    this.props.navigation.navigate("Login");
  };
  signUp = async () => {
    const position = ToastService.Toast.CENTER;
    let username = this.state.username;
    const isMobile = ValidationService.isMobile(username);
    if (isMobile) {
      username = `${ValidationService.cleanMobile(username)}@asoode.user`;
    }
    if (!ValidationService.isEmail(username)) {
      ToastService.warning("CORE_EMAIL_INVALID", position);
      return;
    }
    if (!this.state.password.length) {
      ToastService.warning("ENTER_YOUR_PASSWORD", position);
      return;
    }
    if (this.state.password !== this.state.confirmPassword) {
      ToastService.warning("CORE_GENERAL_CONFIRM_PASSWORD_ERROR", position);
      return;
    }
    if (!ValidationService.validateCaptcha(this.state.captcha)) {
      ToastService.warning("CORE_CAPTCHA_INVALID", position);
      return;
    }
    const payload = {
      username,
      captcha: this.state.captcha,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      firstName: this.state.firstName,
      lastName: this.state.lastName
    };
    this.refs.captcha.refresh();
    const op = await IdentityService.register(payload);
    if (op.status === Enums.OperationResultStatus.Success) {
      if (isMobile) {
        this.props.navigation.navigate("ConfirmPhone", { username });
        return;
      } else {
        AlertService.success("ACCOUNT_CREATED_CHECK_MAIL", null);
        this.goToSignIn();
      }
      return;
    }
    if (op.data && op.data.phoneNotConfirmed) {
      this.props.navigation.navigate("ConfirmPhone", { username });
      return;
    }
    if (op.data && op.data.emailNotConfirmed) {
      AlertService.success("ACCOUNT_CREATED_CHECK_MAIL", null);
      this.goToSignIn();
    }
    const errMessage = IdentityService.handleError(op);
    AlertService.error(errMessage, null);
  };
}
