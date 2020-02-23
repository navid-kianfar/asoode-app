import React, { Component } from "react";
import { Container, Content } from "native-base";
import I18n from "../../../../i18n";
import SimpleHeaderComponent from "../../../../components/simple-header";
import GS from "../../../../themes/general-styles";
import FormComponent from "../../../../components/elements/form";

export default class CreateTicketModal extends Component {
  state = {
    description: null,
    title: null,
    type: 1
  };
  formElements = [
    {
      type: "input",
      field: "title",
      label: I18n.t("TITLE"),
      validation: {
        required: true
      }
    },
    {
      type: "dropdown",
      field: "type",
      label: I18n.t("CATEGORY"),
      enum: "SupportType",
      model: 1,
      validation: {
        required: true
      }
    },
    {
      type: "input",
      field: "description",
      label: I18n.t("MESSAGE"),
      numberOfLines: 4,
      validation: {
        required: true
      }
    }
  ];
  render() {
    return (
      <Container light>
        <SimpleHeaderComponent
          navigation={this.props.navigation}
          title={I18n.t("CREATE_TICKET")}
        />
        <Content>
          <FormComponent
            formElements={this.formElements}
            formStyle="regular"
            labelsStyle={[GS.pt3, GS.pb2]}
            containerStyle={[GS.px3, GS.py2]}
            buttonProps={{ block: true }}
            backend={"/user/supports/enqueue"}
            successHandler={() => {
              this.props.navigation.goBack(null);
            }}
          />
        </Content>
      </Container>
    );
  }
}
