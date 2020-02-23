import React, { Component } from "react";
import { Form, Button, Text } from "native-base";
import PropTypes from "prop-types";
import FormElement, { elementTypes } from "./form-element";
import GS from "../../../themes/general-styles";
import I18n from "../../../i18n";
import HttpService from "../../../services/http-service";
import * as Enums from "../../../library/enums";
import ToastService from "../../../services/toast-service";

const { arrayOf, bool, number, any, shape, oneOf, string, func } = PropTypes;

export default class FormComponent extends Component {
  static propTypes = {
    formElements: arrayOf(
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
    ).isRequired,
    containerStyle: any,
    formStyle: oneOf([
      "regular",
      "floatingLabel",
      "fixedLabel",
      "stackedLabel",
      "inlineLabel"
    ]),
    errorHandler: func,
    successHandler: func,
    handler: func,
    labelsStyle: any,
    elementsStyle: any,
    elementWrappersStyle: any,
    buttonProps: any,
    buttonTitle: string,
    standalone: bool,
    backend: string,
    disableSubmit: bool,
    light: bool,
  };
  state = {
    model: {}
  };
  componentDidMount() {
    const model = {};
    this.props.formElements.forEach(el => {
      model[el.field] = el.model;
    });
    this.setState({ model });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    let changed = false;
    const model = this.state.model;
    this.props.formElements.forEach(el => {
      const prevEl = prevProps.formElements.find(i => i.field === el.field);
      if (el.model !== prevEl.model) {
        changed = true;
        model[el.field] = el.model;
      }
    });
    if (changed) {
      this.setState({ model });
    }
  }
  elementModelChange = (val, field) => {
    const model = { ...this.state.model };
    model[field] = val;
    this.setState({ model });
  };
  validateForm = () => {
    return true;
    //  if (visible === false) => check required
  };
  getModel = () => {
    if (
      this.state.disabled ||
      this.props.disableSubmit ||
      !this.validateForm()
    ) {
      return;
    }
    return {...this.state.model};
  };
  submitForm = async () => {
    const model = this.getModel();
    if (this.props.backend) {
      this.setState({ disabled: true });
      const op = await HttpService.post(this.props.backend, model);
      this.setState({ disabled: false });
      if (op.status === Enums.OperationResultStatus.Success) {
        if (this.props.successHandler) {
          return this.props.successHandler(op);
        } else {
          ToastService.success("CORE_GENERAL_OPERATIONRESULTS_SUCCESS");
        }
        return;
      }
      if (this.props.errorHandler) {
        return this.props.errorHandler(op);
      } else {
        ToastService.error("CORE_GENERAL_OPERATIONRESULTS_FAILED");
      }
    } else {
      this.setState({ disabled: true });
      await this.props.handler(this, model);
      this.setState({ disabled: false });
    }
  };
  render() {
    return (
      <Form style={this.props.containerStyle}>
        {this.props.formElements.map((el, i) => {
          const isLast = i === this.props.formElements.length - 1;
          if (el.visible === false) {
            return null;
          }
          return (
            <FormElement
              key={el.field + i}
              data={el}
              model={this.state.model[el.field]}
              modelChange={this.elementModelChange}
              formStyle={this.props.formStyle}
              first={i === 0}
              last={isLast}
              labelsStyle={this.props.labelsStyle}
              elementsStyle={this.props.elementsStyle}
              elementWrappersStyle={this.props.elementWrappersStyle}
              disabled={this.state.disabled}
              light={this.props.light}
            />
          );
        })}
        {this.props.standalone !== false && (
          <Button
            style={GS.my3}
            {...this.props.buttonProps}
            disabled={this.props.disableSubmit}
            onPress={this.submitForm}
          >
            {this.props.buttonProps.children || (
              <Text>{this.props.buttonTitle || I18n.t("SUBMIT")}</Text>
            )}
          </Button>
        )}
      </Form>
    );
  }
}
