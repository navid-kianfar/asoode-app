import React from 'react';
import { Switch as SwitchNB, Text, View } from 'native-base';
import {TouchableOpacity} from "react-native";
import GS from "../../../themes/general-styles";
import PropTypes from 'prop-types';

const Switch = ({ model, modelChange, label }) => {
  const onModelChange = () => modelChange(!model);
  return (
    <TouchableOpacity
      style={[GS.flexRowDir, GS.alignItemsCenter, GS.my2]}
      onPress={onModelChange}
      activeOpacity={0.8}
    >
      <Text style={GS.flex1}>{label}</Text>
      <SwitchNB
        value={model}
        onValueChange={onModelChange}
        style={GS.msAuto}
      />
    </TouchableOpacity>
  );
};

const { bool, func, string } = PropTypes;
Switch.propTypes = {
  model: bool,
  modelChange: func,
  label: string,
};

export default Switch;