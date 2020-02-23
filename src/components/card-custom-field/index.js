import React, { Component } from "react";
import {
  Item,
  Label,
  Text,
  Icon,
  CheckBox,
  View,
  Input,
  Switch
} from "native-base";
import PropTypes from "prop-types";
import { CustomFieldDTO } from "../../dtos/board.dtos";
import { CustomFieldType } from "../../library/enums";
import Svg from "../elements/svg";
import I18n from "../../i18n";
import GS from "../../themes/general-styles";
import { getFieldIcon } from "../board-custom-fields";
import DatePickerModal from "../elements/date-picker-modal";
import Moment from "react-moment";
import DropDown from "../elements/drop-down";
import { Platform } from "react-native";
import Tags from "../elements/tags";

class CardCustomField extends Component {
  state = {
    value: this.props.value
  };
  componentDidUpdate(prevProps) {
    const { value } = this.props;
    if (value !== prevProps.value && value !== this.state.value) {
      this.setState({ value });
    }
  }
  Icon = () => {
    return <Icon {...getFieldIcon(this.props.data.type)} />;
  };
  Label = ({ grow }) => {
    return (
      <Label style={grow ? GS.flex1 : null}>{this.props.data.title}</Label>
    );
  };

  submit = () => {
    const model = {
      id: this.props.data.id,
      value: this.state.value
    };
    console.log(model);
    //  ''/user/cards/custom-fields/update/' + this.props.cardId, model
  };
  setModel = value => {
    switch (this.props.data.type) {
      case CustomFieldType.Checkbox:
        value = !this.state.value;
        break;
      case CustomFieldType.Number:
        value = value ? +value : undefined;
        break;
    }
    this.setState({ value });
    setTimeout(() => {
      this.submit();
    }, 0);
  };
  makeItems = items => {
    return items.map(item => ({
      label: item.title,
      value: item.id,
      color: item.color
    }));
  };
  render() {
    const data = this.props.data;
    switch (data.type) {
      case CustomFieldType.Switch:
      case CustomFieldType.Checkbox:
        return (
          <Item onPress={this.setModel} dir>
            <this.Icon />
            <this.Label grow />
            {data.type === CustomFieldType.Switch ? (
              <Switch value={this.state.value} onValueChange={this.setModel} />
            ) : (
              <CheckBox onPress={this.setModel} checked={this.state.value} />
            )}
          </Item>
        );
      case CustomFieldType.Date:
        return (
          <DatePickerModal
            time
            update={this.setModel}
            model={this.state.value}
            disabled={!this.state.canEdit}
          >
            <View item dir>
              <this.Icon />
              <this.Label grow />
              {this.state.value ? (
                <Moment
                  style={GS.px3}
                  locale="fa"
                  element={Text}
                  local
                  format="YYYY/MM/DD, HH:MM"
                >
                  {this.state.value}
                </Moment>
              ) : null}
            </View>
          </DatePickerModal>
        );
      case CustomFieldType.DropDown:
        return (
          <Item dir>
            <this.Icon />
            <this.Label />
            <DropDown
              items={this.makeItems(this.props.data.items)}
              selectedValue={this.state.value}
              onValueChange={this.setModel}
              nullable
            />
          </Item>
        );
      case CustomFieldType.Text:
      case CustomFieldType.Number:
      case CustomFieldType.TextArea:
        return (
          <Item dir>
            <this.Icon />
            <this.Label />
            <Input
              style={Platform.OS === "ios" ? { minHeight: 20 * 3 + 30 } : null}
              value={`${this.state.value || ""}`}
              onChangeText={this.setModel}
              keyboardType={
                data.type === CustomFieldType.Number ? "numeric" : "default"
              }
              numberOfLines={data.type === CustomFieldType.TextArea ? 3 : 1}
              multiline={data.type === CustomFieldType.TextArea}
            />
          </Item>
        );
      case CustomFieldType.Tags:
        return (
          <Item dir>
            <this.Icon />
            <this.Label />
            <Tags
              model={this.state.value}
              modelChange={this.setModel}
              stringOutput
            />
          </Item>
        );
      // case CustomFieldType.File:
      //   return (
      //     <Item>
      //
      //     </Item>
      //   );
      // case CustomFieldType.Map:
      //   return (
      //     <Item>
      //
      //     </Item>
      //   );
    }
    return null;
  }
}
const { shape, any, string } = PropTypes;
CardCustomField.propTypes = {
  data: shape(CustomFieldDTO),
  value: any,
  cardId: string
};

export default CardCustomField;
