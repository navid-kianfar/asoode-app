import React, { Component } from "react";
import { ImageBackground, StatusBar } from "react-native";
import {
  View,
  H2,
  Item,
  Input,
  Button,
  Text,
  Content,
  Container
} from "native-base";
import I18n from "../../../i18n.js";
import Captcha from "../../../components/elements/captcha";
import GS from "../../../themes/general-styles";
import IdentityService from "../../../services/identity-service";
import ValidationService from "../../../services/validation-service";
import ToastService from "../../../services/toast-service";
import AlertService from "../../../services/alert-service";

import Styles from "../styles";
const Images = {
  background: {
    auth: require("../../../assets/images/auth-background.png")
  }
};
export default class LoginScreen extends Component {
  state = {
    waiting: false,
    username: "",
    password: "",
    captcha: {
      token: "",
      code: ""
    },
    isSigninInProgress: false
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
                    {I18n.t("SIGN_IN_ASOODE")}
                  </H2>
                  <Item style={GS.mb3} regular>
                    <Input
                      ref={"username"}
                      style={GS.textLeft}
                      onChangeText={username => this.setState({ username })}
                      placeholder={I18n.t("ACCOUNT_EMAIL_OR_USERNAME")}
                      autoCompleteType="email"
                      autoCorrect={false}
                      keyboardType="email-address"
                      returnKeyType="next"
                    />
                  </Item>
                  <Item style={GS.mb3} regular>
                    <Input
                      ref={"password"}
                      style={GS.textLeft}
                      onChangeText={password => this.setState({ password })}
                      placeholder={I18n.t("ENTER_YOUR_PASSWORD")}
                      autoCompleteType="password"
                      secureTextEntry={true}
                      returnKeyType="next"
                    />
                  </Item>
                  <Captcha
                    ref="captcha"
                    onChange={captcha => this.setState({ captcha })}
                    style={GS.mb3}
                    regular
                  />
                  <View style={[GS.row, GS.mb3]}>
                    <View style={GS.col6}>
                      <Button
                        disabled={this.state.waiting}
                        onPress={this.goToSignUp}
                        block
                        light
                      >
                        <Text>{I18n.t("SIGN_UP")}</Text>
                      </Button>
                    </View>
                    <View style={GS.col6}>
                      <Button
                        disabled={this.state.waiting}
                        onPress={this.signIn}
                        block
                      >
                        <Text>{I18n.t("SIGN_IN")}</Text>
                      </Button>
                    </View>
                  </View>
                  {/*<View style={GS.mb3}>*/}
                  {/*  <Text style={GS.textCenter} muted>*/}
                  {/*    {I18n.t("SIGN_IN_WITH_SOCIAL")}*/}
                  {/*  </Text>*/}
                  {/*</View>*/}
                  {/*<View style={GS.row}>*/}
                  {/*  <GoogleSigninButton*/}
                  {/*      style={{ width: 48, height: 48 }}*/}
                  {/*      size={GoogleSigninButton.Size.Icon}*/}
                  {/*      color={GoogleSigninButton.Color.Auto}*/}
                  {/*      onPress={this.signInWithGoogle}*/}
                  {/*      disabled={this.state.isSigninInProgress} />*/}
                  {/*</View>*/}
                </View>
              </View>
            </Content>
          </ImageBackground>
        </Container>
      </>
    );
  }
  goToSignUp = () => {
    this.props.navigation.navigate("Register");
  };

  // signInWithGoogle = async () => {
  //   try {
  //     // GoogleSignin.configure({
  //     //   scopes: [ 'profile', 'email' ],
  //     //   webClientId: '381373282123-pbjhie5fdb441codtgrbrq41b412fbv9.apps.googleusercontent.com',
  //     //   androidClientId: '381373282123-pbjhie5fdb441codtgrbrq41b412fbv9.apps.googleusercontent.com',
  //     //   offlineAccess: true,
  //     //   hostedDomain: 'asoode.com',
  //     //   loginHint: '',
  //     //   forceConsentPrompt: false,
  //     //   accountName: '', // [Android] specifies an account name on the device that should be used
  //     //   iosClientId: '',
  //     // });
  //     GoogleSignin.configure();
  //     await GoogleSignin.hasPlayServices();
  //     const isSignedIn = await GoogleSignin.isSignedIn();
  //     if (isSignedIn) {
  //       const currentUser = await GoogleSignin.getCurrentUser();
  //       console.log(currentUser);
  //     } else {
  //       const userInfo = await GoogleSignin.signIn();
  //       console.log(userInfo);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // operation (e.g. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // play services not available or outdated
  //     } else {
  //       // some other error happened
  //     }
  //   }
  // };

  signIn = async () => {
    const position = ToastService.Toast.CENTER;
    let username = this.state.username;
    if (ValidationService.isMobile(username)) {
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
    if (!ValidationService.validateCaptcha(this.state.captcha)) {
      ToastService.warning("CORE_CAPTCHA_INVALID", position);
      return;
    }
    const payload = {
      username,
      captcha: this.state.captcha,
      password: this.state.password
    };
    this.refs.captcha.refresh();
    this.setState({ waiting: true });
    const op = await IdentityService.login(payload);
    this.setState({ waiting: false });
    if (op.data && op.data.token) {
      this.props.navigation.navigate("AppInit");
      return;
    }
    if (op.data && op.data.phoneNotConfirmed) {
      this.props.navigation.navigate("ConfirmPhone", { username });
      return;
    }
    const errMessage = IdentityService.handleError(op);
    AlertService.error(errMessage, null);
  };
}
