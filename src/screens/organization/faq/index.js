import React, { Component } from "react";
import {View, Text, Container, Content, ListItem, Left, Right, Icon, Body, List, Button} from "native-base";
import Styles from "./styles";
import Alert from '../../../services/alert-service';
import OrganizationService from "../../../services/organization-service";
import ActionNames from "../../../reducers/action-names";
import { connect } from "react-redux";
import {ActivityIndicator, FlatList, StatusBar} from "react-native";
import SimpleHeaderComponent from "../../../components/simple-header";
import I18n from "../../../i18n";
import GS from "../../../themes/general-styles";
import Thumbnail from "../../../components/elements/thumbnail";
import NavigationList from "../../../components/navigation-list";
import Svg from "../../../components/elements/svg";
import ThemeService from "../../../services/theme-service";

class OrganizationFAQScreen extends Component {
  id = "";
  isAdmin = false;
  componentWillMount() {
    this.id = this.props.navigation.getParam("id");
    this.isAdmin = this.props.navigation.getParam("isAdmin");
    this.props.refresh(this.id, false);
  }
  getForm = (model = {enabled: true}) => {
    return [
      {
        type: 'input',
        field: 'title',
        label: I18n.t('TITLE'),
        model: model.title,
        validation: {
          required: true,
        },
      },
      {
        type: 'input',
        field: 'description',
        label: I18n.t('DESCRIPTION'),
        numberOfLines: 4,
        model: model.description,
        validation: {
          required: true,
        },
      },
      {
        type: 'switch',
        field: 'enabled',
        label: I18n.t('ENABLED'),
        model: model.enabled,
      },
    ]
  };
  addCategory = () => {
    Alert.prompt(
      'NEW_CATEGORY',
      null,
      this.getForm(),
      [
      {
        text: I18n.t("CANCEL"),
        style: "cancel"
      },
      {
        text: I18n.t("CREATE"),
        onPress: model => {},
      }
    ]);
  };
  editCategory = item => {
    console.log(item);
    Alert.prompt(
      'EDIT_CATEGORY',
      null,
      this.getForm(item),
      [
        {
          text: I18n.t("CANCEL"),
          style: "cancel"
        },
        {
          text: I18n.t("REMOVE"),
          onPress: () => {
          //  item.id
          },
          style: "destructive",
          skipModel: true,
        },
        {
          text: I18n.t("SAVE"),
          onPress: model => {},
        }
      ]);
  };

  renderHeader = () => {
    return (
      <View style={[GS.alignItemsCenter, GS.py5]}>
        <Svg name="help" size={100} mute />
      </View>
    );
  };
  renderItem = ({ item, index }) => {
    const navigate = () => {
      this.props.navigation.navigate(
        "OrganizationFaqDetailScreen",
        {...item, isAdmin: this.isAdmin}
      );
    };
    return (
      <ListItem
        onPress={navigate}
        style={[GS.py0]}
        first={index === 0}
        // last={index === this.props.dataSource.faq.length - 1}
        hasBackground
        icon
        dir
      >
        <Left/>
        <Body>
          <View style={GS.flexRowDir}>
            <Text numberOfLines={1} style={GS.flex1}>{item.title}</Text>
            {this.isAdmin ? (
              <Button onPress={() => this.editCategory(item)} style={GS.mx1} small transparent>
                <Icon style={[GS.ms2, GS.me2]} name="edit" type="MaterialIcons" />
              </Button>
            ) : null}
          </View>
        </Body>
      </ListItem>
    );
  };
  renderFooter = () => {
    if (!this.isAdmin) { return null; }
    return (
      <List>
        <ListItem itemDivider first last />
        <ListItem onPress={this.addCategory} icon dir first last>
          <Left>
            <Icon name="plus" type="Feather" />
          </Left>
          <Body>
            <Text>{I18n.t("NEW_CATEGORY")}</Text>
          </Body>
        </ListItem>
      </List>
    );
  };
  render() {
    let data = [];
    if (this.props.dataSource.faq) {
      data = this.props.dataSource.faq;
    }
    return (
      <Container>
        <SimpleHeaderComponent
          title={I18n.t("FAQ")}
          navigation={this.props.navigation}
        />
        {this.props.dataSource.faqWaiting ? (
          <View style={GS.waitingContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            data={data}
            renderItem={this.renderItem}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            keyExtractor={(item, index) => item.title + index}
          />
        )
        //   (
        //   <Content>
        //     <View style={[GS.alignItemsCenter, GS.py5]}>
        //       <Svg name="help" size={100} mute />
        //     </View>
        //     <NavigationList
        //       navigation={this.props.navigation}
        //       data={data}
        //     />
        //     {this.isAdmin ? (
        //       <List>
        //         <ListItem itemDivider first last />
        //         <ListItem onPress={this.addCategory} icon dir first last>
        //           <Left>
        //             <Icon name="plus" type="Feather" />
        //           </Left>
        //           <Body>
        //             <Text>{I18n.t("NEW_CATEGORY")}</Text>
        //           </Body>
        //         </ListItem>
        //       </List>
        //     ) : null}
        //   </Content>
        // )
        }
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  dataSource: state.organization
});
const mapDispatchToProps = dispatch => ({
  refresh: (id, skip) => OrganizationService.faq(dispatch, id, skip),
  toggleRefresh: status => {
    dispatch({
      type: ActionNames.OrganizationFaqRefresh,
      payload: status
    });
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationFAQScreen);
