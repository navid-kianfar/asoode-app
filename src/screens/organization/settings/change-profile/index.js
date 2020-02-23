import React, { Component } from "react";
import { Container, Content } from "native-base";
import { connect } from "react-redux";
import GS from "../../../../themes/general-styles";
import SimpleHeaderComponent from "../../../../components/simple-header";
import I18n from "../../../../i18n";
import FormComponent from "../../../../components/elements/form";

class OrganizationChangeProfileScreen extends Component {
  id = "";
  formElements = [
    {
      type: "input",
      field: "title",
      label: I18n.t("NAME"),
      validation: {
        required: true,
        min: 2
      }
    },
    {
      type: "input",
      field: "website",
      label: I18n.t("WEBSITE")
    },
    {
      type: "input",
      field: "description",
      label: I18n.t("DESCRIPTION"),
      numberOfLines: 4,
      validation: {
        required: true
      }
    }
  ];
  componentWillMount() {
    this.id = this.props.navigation.getParam("id");
  }
  render() {
    return (
      <Container light>
        <SimpleHeaderComponent
          title={I18n.t("ORGANIZATION_SETTINGS__CHANGE_PROFILE")}
          navigation={this.props.navigation}
        />
        <Content contentContainerStyle={GS.flexGrow1}>
          <FormComponent
            formElements={this.formElements}
            formStyle="regular"
            labelsStyle={[GS.pt3, GS.pb2]}
            containerStyle={[GS.flex1, GS.px3, GS.py2]}
            buttonProps={{ block: true }}
            backend={`/user/organizations/edit/${this.props.id}`}
          />
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  dataSource: state.organization
});
const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationChangeProfileScreen);
