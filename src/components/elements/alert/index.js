import React, { Component } from "react";
import Modal from "../modal";
import { ScrollView } from 'react-native';
import {
  Icon,
  View,
  Text,
  H3,
  Button,
} from "native-base";
import { Colors } from '../../../themes/variables';
import { connect } from "react-redux";
import AlertService from "../../../services/alert-service";
import PropTypes from "prop-types";
import I18n from "../../../i18n";
import Styles from "./styles";
import GS from "../../../themes/general-styles";
import Svg from "../svg";
import FormComponent from "../form";
import {elementTypes} from "../form/form-element";

class AlertComponent extends Component {
  componentDidMount() {
    AlertService.dispatch = this.props.dispatch;
  }
  close = () => {
    AlertService.close();
  };
  callback = (callback, skipModel) => {
    let model;
    if (this.props.dataSource.form && callback && !skipModel) {
      model = this.formComponent.getModel();
      if (!model) { return; }
    }
    this.close();
    if (callback) {
      callback(model);
    }
  };
  getIcon = options => {
    const common = {
      style: [
        Styles.icon,
        options.type !== 'confirm' ? {
          color: '#fff',
          marginTop: 20,
          marginBottom: 20,
        } : null
      ],
      name: options.icon.name,
      mute: options.type === 'confirm'
    };
    return (
      options.icon.type ? (
        <Icon {...common} type={options.icon.type}/>
      ) : (
        <Svg {...common}/>
      )
    )
  };
  getIconWrapperStyles = options => {
    if (options.type === 'confirm') { return null }
    let color;
    //"info", "warning", "error", "success", "confirm", "prompt"
    switch (options.type) {
      case 'info':
      case 'success':
      case 'warning':
        color = Colors[options.type];
        break;
      case 'error':
        color = Colors.danger;
    }
    return {backgroundColor: color};
  };
  render() {
    const { isVisible, options, title, buttons, form, message } = this.props.dataSource;
    return (
      <Modal
        isVisible={isVisible}
        onBackdropPress={this.close}
      >
        <View style={Styles.container} bg2 bg1={options.type !== 'confirm'}>
          {options && options.icon ? (
            <View style={this.getIconWrapperStyles(options)}>
              {this.getIcon(options)}
            </View>
          ) : null}
          <ScrollView style={GS.my2} contentContainerStyle={Styles.content}>
            {title ? (
              <H3 style={GS.textCenter}>{title}</H3>
            ) : null}
            {message ? (
              <Text style={GS.textCenter} mute>
                {message}
              </Text>
            ) : null}
            {form ? (
              <FormComponent
                formElements={form}
                formStyle="regular"
                standalone={false}
                labelsStyle={[GS.pt3, GS.pb2]}
                containerStyle={GS.alignSelfStretch}
                ref={ref => (this.formComponent = ref)}
              />
            ) : null}
          </ScrollView>
          <View style={GS.flexRowDir}>
            {buttons instanceof Array ? (
              buttons.map(button => {
                return (
                  <Button
                    style={[Styles.button, GS.flex1]}
                    key={button.text}
                    onPress={() => this.callback(button.onPress, button.skipModel)}
                    full
                    light
                  >
                    <Text
                      primary={
                        button.style !== "destructive" &&
                        button.style !== "cancel"
                      }
                      danger={button.style === "destructive"}
                      mute={button.style === "cancel"}
                    >
                      {button.text}
                    </Text>
                  </Button>
                );
              })
            ) : (
              <>
                <Button
                  style={[Styles.button, GS.flex1]}
                  onPress={this.close}
                  light
                  full
                >
                  <Text primary>{I18n.t("OK")}</Text>
                </Button>
              </>
            )}
          </View>
        </View>
      </Modal>
    );
  }
}

const { shape, string, oneOf, arrayOf, func, bool, any, number } = PropTypes;

AlertComponent.propTypes = {
  dataSource: shape({
    isVisible: bool,
    form: arrayOf(
      shape({
        type: oneOf(elementTypes).isRequired,
        field: string.isRequired,
        model: any,
        modelChange: func,
        label: string,
        maxLength: number,
        numberOfLines: number,
        placeholder: string,
        wrapperStyle: any,
        enum: string,
        style: any,
        labelStyle: any,
        disabled: bool,
        time: bool,
        validation: shape({
          required: bool,
          min: number,
          max: number,
          pattern: any
        }),
        visible: bool
      })
    ),
    title: string,
    message: string,
    buttons: arrayOf(
      shape({
        text: string,
        onPress: func,
        style: oneOf([undefined, "default", "cancel", "destructive"]),
        skipModel: bool,
      })
    ),
    options: shape({
      type: oneOf(["info", "warning", "error", "success", "confirm", "prompt"]),
      icon: shape({
        name: string,
        type: string
      })
    })
  })
};

const mapStateToProps = state => ({ dataSource: state.alert });
const mapDispatchToProps = dispatch => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(AlertComponent);
