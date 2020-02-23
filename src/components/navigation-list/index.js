import React from "react";
import { Icon, Left, List, Body, ListItem, Text } from "native-base";
import PropTypes from "prop-types";
import Svg from "../elements/svg";
import GS from "../../themes/general-styles";
const { string, arrayOf, shape, any, bool } = PropTypes;

const NavigationList = props => {
  return (
    <List>
      {props.data.map((item, index) => {
        if (item.sensitive && !props.showSensitive) {
          return null;
        }
        return (
          <ListItem
            onPress={() => props.navigation.navigate(item.route, item.data)}
            first={index === 0}
            last={index === props.data.length - 1}
            key={index.toString()}
            icon
            dir
          >
            <Left>
              {item.iconType ? (
                <Icon name={item.iconName} type={item.iconType} />
              ) : item.iconName ? (
                <Svg name={item.iconName} />
              ) : null}
            </Left>
            <Body>
              <Text>{item.title}</Text>
            </Body>
          </ListItem>
        );
      })}
    </List>
  );
};

NavigationList.propTypes = {
  navigation: any,
  showSensitive: bool,
  data: arrayOf(
    shape({
      title: string,
      iconName: string,
      iconType: string,
      route: string,
      data: any,
      sensitive: bool
    })
  )
};

export default NavigationList;
