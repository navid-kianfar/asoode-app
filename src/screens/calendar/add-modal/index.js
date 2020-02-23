import React, { Component } from "react";
import {
  Container,
  Header,
  View,
  Left,
  Body,
  Right,
  Button,
  Text,
  Title,
  Content,
  Form,
  Item,
  Label,
  Input
} from "native-base";
import HttpService from "../../../services/http-service";
import DatePickerModal from "../../../components/elements/date-picker-modal";
import DropDown from "../../../components/elements/drop-down";
import GS from "../../../themes/general-styles";
import Styles from "./styles";
import { OperationResultStatus } from "../../../library/enums";
import I18n from "../../../i18n";
import { Metrics } from "../../../themes/variables";
import FormComponent from "../../../components/elements/form";

export default class CalendarAddCardModal extends Component {
  onSelectBoard = async selectedBoard => {
    const formElements = this.state.formElements;
    formElements[4].disabled = true;
    formElements[4].model = undefined;
    this.setState({ formElements, disableSubmit: true });
    if (!selectedBoard) {
      return;
    }
    const op = await HttpService.post(
      "/user/board-lists/select-list/" + selectedBoard
    );
    if (op.status === OperationResultStatus.Success) {
      formElements[4].items = op.data;
      formElements[4].disabled = false;
      this.setState({ formElements });
    }
  };
  onSelectList = selectedList => {
    this.setState({
      selectedList,
      disableSubmit: !selectedList
    });
  };
  state = {
    formElements: [
      {
        type: "input",
        field: "title",
        label: I18n.t("TITLE"),
        validation: {
          required: true
        }
      },
      {
        type: "datePicker",
        field: "startDate",
        label: I18n.t("START_DATE"),
        time: true,
        validation: {
          required: true
        }
      },
      {
        type: "datePicker",
        field: "dueDate",
        label: I18n.t("DUE_DATE"),
        time: true,
        validation: {
          required: true
        }
      },
      {
        type: "dropdown",
        field: "board",
        label: I18n.t("BOARD"),
        items: [],
        nullable: true,
        modelChange: this.onSelectBoard,
        validation: {
          required: true
        }
      },
      {
        type: "dropdown",
        field: "list",
        label: I18n.t("LIST"),
        items: [],
        nullable: true,
        modelChange: this.onSelectList,
        disabled: true,
        validation: {
          required: true
        }
      }
    ],
    disableSubmit: true,
    selectedList: null
  };
  componentDidMount() {
    this.getBoardItem();
  }
  getBoardItem = async () => {
    const op = await HttpService.post("/user/boards/select-list");
    if (op.status === OperationResultStatus.Success) {
      const formElements = this.state.formElements;
      formElements[3].items = op.data;
      this.setState({ formElements });
    }
  };
  createCard = () => {
    // const op = await HttpService.post('/user/cards/add/', {
    // dueDate: "2019-10-28T14:42:00.000Z"
    // startDate: "2019-10-27T14:42:00.000Z"
    // title: "test"
    // });
    alert("create");
  };
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              onPress={() => this.props.navigation.goBack()}
              primary
              transparent
            >
              <Text>{I18n.t("CANCEL")}</Text>
            </Button>
          </Left>
          <Body style={{ flex: 3 }}>
            <Title>{I18n.t("ADD_CALENDAR_TASKS")}</Title>
          </Body>
          <Right>
            <Button onPress={this.createCard} transparent>
              <Text>{I18n.t("DONE")}</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <FormComponent
            formElements={this.state.formElements}
            formStyle="regular"
            labelsStyle={[GS.pt3, GS.pb2]}
            containerStyle={[GS.px3, GS.py2]}
            buttonProps={{ block: true }}
            buttonTitle={I18n.t("CREATE_CARD")}
            backend={"/user/cards/add/" + this.state.selectedList}
            disableSubmit={this.state.disableSubmit}
          />
          {/*<Form>*/}
          {/*  <Item inlineLabel first dir>*/}
          {/*    <Label>{I18n.t("TITLE")}</Label>*/}
          {/*    <Input />*/}
          {/*  </Item>*/}
          {/*  <DatePickerModal time>*/}
          {/*    <Form pointerEvents="none">*/}
          {/*      <Item inlineLabel dir>*/}
          {/*        <Label>{I18n.t("START_DATE")}</Label>*/}
          {/*        <Input editable={false} />*/}
          {/*      </Item>*/}
          {/*    </Form>*/}
          {/*  </DatePickerModal>*/}
          {/*  <DatePickerModal time>*/}
          {/*    <Form pointerEvents="none">*/}
          {/*      <Item pointerEvents="none" inlineLabel dir>*/}
          {/*        <Label>{I18n.t("DUE_DATE")}</Label>*/}
          {/*        <Input editable={false} />*/}
          {/*      </Item>*/}
          {/*    </Form>*/}
          {/*  </DatePickerModal>*/}
          {/*  <Item dir last inlineLabel picker>*/}
          {/*    <Label>{I18n.t("BOARD")}</Label>*/}
          {/*    <DropDown*/}
          {/*      items={this.state.boardItems}*/}
          {/*      selectedValue={this.state.selectedBoard}*/}
          {/*      onValueChange={this.onSelectBoard}*/}
          {/*    />*/}
          {/*  </Item>*/}
          {/*  <Item dir last inlineLabel picker>*/}
          {/*    <Label>{I18n.t("LIST")}</Label>*/}
          {/*    <DropDown*/}
          {/*      enabled={!this.state.listDropDownWaiting}*/}
          {/*      items={this.state.listItems}*/}
          {/*      selectedValue={this.state.selectedList}*/}
          {/*      onValueChange={this.onSelectList}*/}
          {/*    />*/}
          {/*  </Item>*/}
          {/*  <View style={GS.px2}>*/}
          {/*    <Button style={GS.mt4} block onPress={this.createCard}>*/}
          {/*      <Text>{I18n.t("CREATE_CARD")}</Text>*/}
          {/*    </Button>*/}
          {/*  </View>*/}
          {/*</Form>*/}
        </Content>
      </Container>
    );
  }
}
