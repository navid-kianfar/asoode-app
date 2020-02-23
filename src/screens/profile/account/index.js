import React, { Component } from "react";
import { Container, Content } from "native-base";
import I18n from "../../../i18n";
import GS from "../../../themes/general-styles";
import SimpleHeaderComponent from "../../../components/simple-header";
import FormComponent from "../../../components/elements/form";
import { connect } from "react-redux";

class AccountScreen extends Component {
  formElements = [
    {
      field: "firstName",
      model: this.props.dataSource.profile.firstName,
      type: "input",
      label: I18n.t("NAME"),
      validation: {
        required: true,
        min: 2
      }
    },
    {
      field: "lastName",
      model: this.props.dataSource.profile.lastName,
      type: "input",
      label: I18n.t("LAST_NAME"),
      validation: {
        required: true,
        min: 2
      }
    },
    {
      field: "initials",
      model: this.props.dataSource.profile.initials,
      type: "input",
      maxLength: 2,
      label: I18n.t("INITIALS"),
      validation: {
        required: true,
        min: 1
      }
    },
    {
      field: "bio",
      model: this.props.dataSource.profile.bio,
      type: "input",
      label: I18n.t("BIO"),
      numberOfLines: 4
    }
  ];
  render() {
    return (
      <Container light>
        <SimpleHeaderComponent
          navigation={this.props.navigation}
          title={I18n.t("ACCOUNT")}
        />
        <Content>
          <FormComponent
            formElements={this.formElements}
            formStyle="regular"
            labelsStyle={[GS.pt3, GS.pb2]}
            containerStyle={[GS.px3, GS.py2]}
            buttonProps={{ block: true }}
            buttonTitle={I18n.t("SAVE_CHANGES")}
            backend={"/account/update-profile"}
          />
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  dataSource: state.auth
});
const mapDispatchToProps = dispatch => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);
