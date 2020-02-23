import React, { Component } from "react";
import { Image, ActivityIndicator } from "react-native";
import { Item, Input, Button, Icon } from "native-base";
import CaptchaService from "../../../services/captcha-service";
import * as Enums from "../../../library/enums";
import Styles from "./styles";

export default class Captcha extends Component {
  state = {
    waiting: true,
    captcha: {
      expire: "",
      image: "",
      token: ""
    }
  };

  componentDidMount() {
    this.refresh();
  }

  async refresh() {
    const op = await CaptchaService.generate();
    if (op.status !== Enums.OperationResultStatus.Success) {
      // TODO: handle error
      return;
    }
    this.setState({ captcha: op.data, waiting: false, input: "" });
    this.props.onChange({
      expire: op.data.expire,
      token: op.data.token,
      code: ""
    });
  }

  render() {
    return (
      <Item {...this.props}>
        <Input
          value={this.state.input}
          style={Styles.input}
          keyboardType={"numeric"}
          maxLength={5}
          autoCompleteType={"off"}
          autoCorrect={false}
          returnKeyType="done"
          onChangeText={value => {
            this.setState({ input: value });
            this.props.onChange({
              expire: this.state.captcha.expire,
              token: this.state.captcha.token,
              code: value
            });
          }}
        />
        {this.state.waiting ? (
          <ActivityIndicator style={Styles.image} />
        ) : (
          <Image
            style={Styles.image}
            source={{ uri: this.state.captcha.image }}
          />
        )}
        <Button onPress={() => this.refresh()} transparent>
          <Icon name="refresh" type="SimpleLineIcons" />
        </Button>
      </Item>
    );
  }
}
