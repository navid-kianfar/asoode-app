import React from "react";
import {
  Body,
  Button,
  Header,
  Icon,
  Left,
  Right,
  Title,
  Text
} from "native-base";
import PropTypes from "prop-types";
import GS from "../../themes/general-styles";

const SimpleHeaderComponent = props => {
  const goBack = () => {
    props.navigation.goBack(null);
  };
  return (
    <Header>
      <Left>
        <Button onPress={goBack} dark transparent>
          <Icon style={GS.headerIcon} name="chevron-left" type="Feather" />
          {props.backTitle ? <Text>{props.backTitle}</Text> : null}
        </Button>
      </Left>
      {props.title ? (
        <Body style={{ flex: 3 }}>
          <Title>{props.title}</Title>
        </Body>
      ) : null}
      <Right>{props.rightInnerComponent}</Right>
    </Header>
  );
};
SimpleHeaderComponent.propTypes = {
  navigation: PropTypes.any.isRequired,
  title: PropTypes.string,
  backTitle: PropTypes.string,
  rightInnerComponent: PropTypes.node
};
export default SimpleHeaderComponent;
