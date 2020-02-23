import React, {Component} from 'react';
import {Accordion, Container, Content, Button, Icon, Text, View } from "native-base";
import SimpleHeaderComponent from "../../../../components/simple-header";
import {StyleSheet} from "react-native";
import GS from "../../../../themes/general-styles";
import Alert from "../../../../services/alert-service";
import I18n from "../../../../i18n";


export default class OrganizationFaqDetailScreen extends Component {
  state = {
    data: this.props.navigation.getParam("faqs")
  };
  title = '';
  isAdmin = false;
  componentWillMount() {
    this.title = this.props.navigation.getParam("title");
    this.isAdmin = this.props.navigation.getParam("isAdmin");
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
  addNew = () => {
    Alert.prompt(
      'NEW_FAQ_ITEM',
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
  edit = item => {
    Alert.prompt(
      'EDIT_FAQ_ITEM',
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
  renderHeader = (item, expanded) => {
    return (
      <View style={[GS.flexRowDir, styles.defaultHeader]} bg1>
        <Text style={GS.flexShrink1}>{item.title}</Text>
        <View style={[GS.flexRowDir, GS.flexShrink0]}>
          {this.isAdmin ? (
            <Button onPress={() => this.edit(item)} style={GS.mx1} small transparent>
              <Icon style={[GS.ms2, GS.me2]} name="edit" type="MaterialIcons" />
            </Button>
          ) : null}
          <Icon style={GS.mx1} name={expanded ? 'ios-arrow-up' : 'ios-arrow-down'}/>
        </View>
      </View>
    );
  };
  renderContent = (item) => {
    return (
      <View bg2 padder>
        <Text>{item.description}</Text>
      </View>
    );
  };
  render() {
    return (
      <Container>
        <SimpleHeaderComponent
          title={this.title}
          navigation={this.props.navigation}
          rightInnerComponent={this.isAdmin ? (
            <Button onPress={this.addNew} dark transparent>
              <Icon style={GS.headerIcon} name="plus" type="Feather" />
            </Button>
          ) : null}
        />
        <Content>
          <Accordion
            dataArray={this.state.data}
            expanded={0}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  defaultHeader: {
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});