import React, { Component } from "react";
import {
  View,
  Text,
  CardItem,
  Card,
  Left,
  Body,
  Right,
  Container,
  Button,
  Icon,
  Header,
  Title
} from "native-base";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import * as Contacts from "react-native-contacts";
import {
  PermissionsAndroid,
  Platform,
  FlatList,
  StatusBar
} from "react-native";
import PropTypes from "prop-types";
import ContactService from "../../services/contact-service";
import { connect } from "react-redux";
import GS from "../../themes/general-styles";
import Thumbnail from "../../components/elements/thumbnail";
import I18n from "../../i18n";
import EmptyPageComponent from "../../components/empty-page";
const { shape, arrayOf, string, bool, number } = PropTypes;

const populateName = name => {
  return name ? `${name} ` : "";
};

class ContactsListScreen extends Component {
  prepare() {
    if (Platform.OS === "android") {
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: "Contacts",
          message: "This app would like to view your contacts."
        }
      );
    }
    return Promise.resolve();
  }
  componentDidMount() {
    this.props.refresh(false);
  }
  upload = () => {};
  download = () => {};
  sync = () => {};
  add = () => {};
  shownName = item => {
    return (
      populateName(item.givenName) +
      populateName(item.middleName) +
      populateName(item.familyName)
    );
  };
  openContact = item => {
    const params = {
      editable: true,
      info: { ...item },
      name: this.shownName(item),
      backTitle: I18n.t("CONTACT")
    };
    this.props.navigation.navigate("ContactScreen", params);
  };
  renderItem = ({ item }) => {
    return (
      <View style={GS.mx2}>
        <Card transparent>
          <TouchableOpacity
            onPress={() => this.openContact(item)}
            activeOpacity={0.85}
          >
            <CardItem dir thumbnail>
              <Left>
                <Thumbnail
                  small
                  title={
                    populateName(item.givenName) + populateName(item.familyName)
                  }
                />
              </Left>
              <Body>
                <Text>{this.shownName(item)}</Text>
              </Body>
            </CardItem>
          </TouchableOpacity>
        </Card>
      </View>
    );
  };
  renderListEmpty = () => {
    if (!this.props.dataSource.contacts.length) {
      return (
        <EmptyPageComponent
          image={require("../../assets/images/no-contacts.png")}
          imageHeightRatio={0.747}
          header={I18n.t("NO_CONTACT")}
          description={I18n.t("NO_CONTACT_DESCRIPTION")}
          buttonText={I18n.t("NEW_CONTACT")}
          handler={() => {
            this.prepare().then(() => {
              Contacts.getAllWithoutPhotos((err, contacts) => {
                if (err === "denied") {
                  return;
                }
                this.props.loadContacts(contacts);
              });
            });
          }}
        />
      );
    }
    return null;
  };
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={this.upload} dark transparent>
              <Icon style={GS.headerIcon} name="upload" type="AntDesign" />
            </Button>
            <Button style={GS.me2} onPress={this.download} dark transparent>
              <Icon style={GS.headerIcon} name="download" type="AntDesign" />
            </Button>
          </Left>
          <Body>
            <Title>{I18n.t("CONTACT")}</Title>
          </Body>
          <Right>
            <Button onPress={this.sync} dark transparent>
              <Icon style={GS.headerIcon} name="sync" type="AntDesign" />
            </Button>
            <Button onPress={this.add} dark transparent>
              <Icon style={GS.headerIcon} name="pluscircleo" type="AntDesign" />
            </Button>
          </Right>
        </Header>
        {this.props.dataSource.waiting ? (
          <View style={GS.waitingContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            style={GS.zIndexM}
            contentContainerStyle={[GS.flexGrow1, GS.py2]}
            data={this.props.dataSource.contacts}
            renderItem={this.renderItem}
            renderSectionHeader={this.renderHeader}
            ListHeaderComponent={this.renderListEmpty}
            ListHeaderComponentStyle={
              !this.props.dataSource.contacts.length ? GS.flex1 : null
            }
            keyExtractor={item => item.id || item.recordID}
          />
        )}
      </Container>
    );
  }
}

ContactsListScreen.propTypes = {
  dataSource: shape({
    remote: arrayOf(
      shape({
        jobTitle: string,
        recordID: string,
        postalAddresses: arrayOf(
          shape({
            region: string,
            postCode: string,
            country: string,
            city: string,
            street: string,
            label: string,
            state: string
          })
        ),
        emailAddresses: arrayOf(
          shape({
            label: string,
            email: string
          })
        ),
        phoneNumbers: arrayOf(
          shape({
            label: string,
            number: string
          })
        ),
        company: string,
        givenName: string,
        middleName: string,
        hasThumbnail: bool,
        birthday: shape({
          day: number,
          month: number,
          year: number
        }),
        urlAddresses: arrayOf(
          shape({
            label: string,
            url: string
          })
        ),
        familyName: string
      })
    )
  })
};

const mapStateToProps = state => ({
  dataSource: state.contact
});

const mapDispatchToProps = dispatch => ({
  refresh: skip => ContactService.fetch(dispatch, skip),
  loadContacts: data => ContactService.sync(dispatch, data)
});
export default connect(mapStateToProps, mapDispatchToProps)(ContactsListScreen);
