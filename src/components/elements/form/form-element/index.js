import React, { Component } from "react";
import { Item, Label, Input, View } from "native-base";
import PropTypes from "prop-types";
import I18n from "../../../../i18n";
import DropDown from "../../drop-down";
import DatePickerModal from "../../date-picker-modal";
import GS from "../../../../themes/general-styles";
import { getInputHeight, makeArray } from "../../../../library/general-helpers";
import Radio from "../../radio";
import Switch from "../../switch";
const { any, shape, number, oneOf, string, func, bool } = PropTypes;
export const elementTypes = ["input", "dropdown", "datePicker", "switch"];

export default class FormElement extends Component {
  static propTypes = {
    data: shape({
      type: oneOf(elementTypes).isRequired,
      field: string.isRequired,
      model: any,
      modelChange: func,
      label: string,
      maxLength: number,
      numberOfLines: number,
      placeholder: string,
      wrapperStyle: any,
      style: any,
      enum: string,
      labelStyle: any,
      disabled: bool,
      dropDownMode: oneOf(["dialog", "dropdown"]),
      time: bool,
      validation: shape({
        required: bool,
        min: number,
        max: number,
        pattern: any
      }),
      visible: bool,
      nullable: bool
    }),
    model: any,
    modelChange: func,
    first: bool,
    last: bool,
    formStyle: oneOf([
      "regular",
      "floatingLabel",
      "fixedLabel",
      "stackedLabel",
      "inlineLabel"
    ]),
    labelsStyle: any,
    elementsStyle: any,
    elementWrappersStyle: any,
    disabled: bool,
    light: bool
  };
  onModelChange = e => {
    if (this.props.data.modelChange) {
      this.props.data.modelChange(e);
    }
    this.props.modelChange(e, this.props.data.field);
  };
  Element = () => {
    switch (this.props.data.type) {
      case "input":
        return (
          <Input
            style={getInputHeight(this.props.data.numberOfLines)}
            onChangeText={this.onModelChange}
            value={this.props.model}
            numberOfLines={this.props.data.numberOfLines}
            multiline={this.props.data.numberOfLines > 1}
            textAlignVertical={
              this.props.data.numberOfLines > 1 ? "top" : "center"
            }
            editable={!this.props.disabled && !this.props.data.disabled}
            placeholder={this.props.data.placeholder}
            maxLength={this.props.data.maxLength}
          />
        );
      case "dropdown":
        return (
          <DropDown
            enum={this.props.data.enum}
            selectedValue={this.props.model}
            onValueChange={this.onModelChange}
            items={this.props.data.items}
            mode={this.props.data.dropDownMode}
            placeholder={this.props.data.placeholder}
            style={this.props.data.style}
            enabled={!this.props.disabled && !this.props.data.disabled}
            nullable={this.props.data.nullable}
          />
        );
      case "datePicker":
        return (
          <DatePickerModal
            time={this.props.data.time}
            update={this.onModelChange}
            model={this.props.model}
            style={GS.flex1}
            disabled={this.props.disabled || this.props.data.disabled}
          >
            <Input
              style={this.props.data.style}
              editable={false}
              pointerEvents="none"
              value={`${this.props.model || I18n.t("PLEASE_CHOOSE")}`}
            />
          </DatePickerModal>
        );
      case "switch":
        return (
          <Switch
            model={this.props.model}
            modelChange={this.onModelChange}
            label={this.props.data.label}
          />
        );
    }
  };
  Label = () => {
    const general = this.props.labelsStyle;
    const specific = this.props.data.labelStyle;
    const styles = [...makeArray(general), ...makeArray(specific)];
    return <Label style={styles}>{this.props.data.label}</Label>;
  };
  render() {
    const formStyle = {};
    formStyle[this.props.formStyle] = true;
    if (this.props.data.type === 'switch') {
      return (
        <this.Element />
      );
    }
    return (
      <>
        {this.props.data.label && this.props.formStyle === "regular" && (
          <this.Label />
        )}
        <Item light={this.props.light} dir {...formStyle}>
          {this.props.data.label && this.props.formStyle !== "regular" && (
            <this.Label />
          )}
          <this.Element />
        </Item>
      </>
    );
  }
}
