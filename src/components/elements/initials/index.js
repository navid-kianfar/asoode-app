import React from "react";
import { Text } from "native-base";
import { InitialExtractor } from "../../../library/string-helpers";

const Initials = props => {
  return <Text style={props.style}>{InitialExtractor(props.children)}</Text>;
};
export default Initials;
