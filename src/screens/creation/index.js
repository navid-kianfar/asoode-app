import React, { Component } from "react";
import {
  LayoutAnimation,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import {
  Container,
  Content,
  View,
  Card,
  CardItem,
  Left,
  Body,
  Text,
  Button,
  Icon,
  Title,
  Right,
  Header,
  List,
  ListItem,
  Segment
} from "native-base";
import Styles from "./styles";
import SimpleHeaderComponent from "../../components/simple-header";
import GS from "../../themes/general-styles";
import I18n from "../../i18n";
import Image from "../../components/elements/image";
import Svg from "../../components/elements/svg";
import { BoardTemplate, Visibility } from "../../library/enums";
import FormComponent from "../../components/elements/form";
import board from "../../reducers/board";
import Constants from "../../library/constants";
import ChooseBackgroundComponent from "../../components/choose-background";

const images = {
  create: require("../../assets/images/creation.png"),
  boardTemplates: {
    blank: require("../../assets/images/board-templates/blank.png"),
    "blank-enabled": require("../../assets/images/board-templates/blank-enabled.png"),
    weekday: require("../../assets/images/board-templates/weekday.png"),
    "weekday-enabled": require("../../assets/images/board-templates/weekday-enabled.png"),
    "single-team": require("../../assets/images/board-templates/single-team.png"),
    "single-team-enabled": require("../../assets/images/board-templates/single-team-enabled.png"),
    departments: require("../../assets/images/board-templates/departments.png"),
    "departments-enabled": require("../../assets/images/board-templates/departments-enabled.png"),
    kanban: require("../../assets/images/board-templates/kanban.png"),
    "kanban-enabled": require("../../assets/images/board-templates/kanban-enabled.png")
  }
};
const boardVisibilities = [
  {
    value: Visibility.Private,
    icon: "finger-print",
    description: I18n.t("BOARD__PRIVATE_DESCRIPTION")
  },
  {
    value: Visibility.Team,
    icon: "users",
    description: I18n.t("BOARD__TEAM_DESCRIPTION")
  },
  {
    value: Visibility.Organization,
    icon: "organization",
    description: I18n.t("BOARD__ORGANIZATION_DESCRIPTION")
  }
  // {
  //   value: Visibility.Public,
  //   icon: "earth",
  //   description: I18n.t("BOARD__PUBLIC_DESCRIPTION"),
  //   disabled: true
  // },
];
const templateOptions = [
  {
    id: BoardTemplate.Blank,
    image: "blank",
    lists: ["", "", ""]
  },
  {
    id: BoardTemplate.WeekDay,
    image: "weekday",
    lists: [
      "ENUMS__WEEKDAY_SUNDAY",
      "ENUMS__WEEKDAY_MONDAY",
      "ENUMS__WEEKDAY_TUESDAY"
    ]
  },
  {
    id: BoardTemplate.SingleTeam,
    image: "single-team",
    lists: [
      "BOARD_TEMPLATES__LIST_SAMPLES_SINGLE_TEAM_1",
      "BOARD_TEMPLATES__LIST_SAMPLES_SINGLE_TEAM_2",
      "BOARD_TEMPLATES__LIST_SAMPLES_SINGLE_TEAM_3"
    ]
  },
  {
    id: BoardTemplate.Departments,
    image: "departments",
    lists: [
      "BOARD_TEMPLATES__LIST_SAMPLES_DEPARTMENT_1",
      "BOARD_TEMPLATES__LIST_SAMPLES_DEPARTMENT_2",
      "BOARD_TEMPLATES__LIST_SAMPLES_DEPARTMENT_3"
    ]
  },
  {
    id: BoardTemplate.Kanban,
    image: "kanban",
    lists: [
      "BOARD_TEMPLATES__LIST_SAMPLES_KANBAN_1",
      "BOARD_TEMPLATES__LIST_SAMPLES_KANBAN_2",
      "BOARD_TEMPLATES__LIST_SAMPLES_KANBAN_3"
    ]
  }
];

export default class CreationScreen extends Component {
  onSelectOrgan = organ => {
    const boardFormElements = [...this.state.boardFormElements];
    const teams = [];
    boardFormElements[3].disabled = !organ;
    boardFormElements[3].model = undefined;
    if (organ) {
      // TODO: filter teams
    }
    boardFormElements[3].items = teams;
    this.setState({ boardFormElements });
  };
  state = {
    page: undefined,
    listType: BoardTemplate.Blank,
    boardFormElements: [
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
        field: "description",
        numberOfLines: 4,
        label: I18n.t("DESCRIPTION")
      },
      {
        type: "dropdown",
        field: "organizationId",
        label: I18n.t("ORGANIZATION"),
        items: [], // TODO: get all organs
        nullable: true,
        modelChange: this.onSelectOrgan,
        validation: {
          required: true
        }
      },
      {
        type: "dropdown",
        field: "teamId",
        label: I18n.t("TEAM"),
        items: [],
        nullable: true,
        validation: {
          required: true
        }
      }
    ],
    pictureId: undefined,
    colorId: undefined
  };
  teamFormElements = [
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
      field: "description",
      numberOfLines: 4,
      label: I18n.t("DESCRIPTION")
    }
  ];
  componentDidMount() {}
  goTo = page => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ page });
  };
  goBack = () => {
    let page;
    switch (this.state.page) {
      case "board-visibility":
        page = undefined;
        break;
      case "board-info":
        page = "board-visibility";
        this.setState({ title: undefined, description: undefined });
        break;
      case "board-template":
        page = "board-info";
        break;
      case "board-background":
        page = "board-template";
        break;
      case "team-info":
        page = undefined;
        break;
      default:
        this.props.navigation.goBack(null);
        return;
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ page });
  };
  getTitle = () => {
    let title;
    switch (this.state.page) {
      case "board-visibility":
        title = I18n.t("CREATE_BOARD");
        break;
      case "board-info":
        title = I18n.t("CREATE_BOARD__CHOOSE_TITLE");
        break;
      case "board-template":
        title = I18n.t("CREATE_BOARD__CHOOSE_TEMPLATE_TITLE");
        break;
      case "board-background":
        title = I18n.t("CREATE_BOARD__CHOOSE_BACKGROUND_TITLE");
        break;
      case "team-info":
        title = I18n.t("CREATE_A_TEAM");
        break;
      default:
        title = I18n.t("CREATE");
    }
    return <Title style={[GS.alignSelfStretch, GS.textCenter]}>{title}</Title>;
  };
  setVisibility = visibility => {
    let hasTeam = false;
    let hasOrgan = false;
    const boardFormElements = [...this.state.boardFormElements];
    switch (visibility) {
      case Visibility.Organization:
        hasTeam = true;
        hasOrgan = true;
        boardFormElements[3].disabled = true;
        break;
      case Visibility.Team:
        hasTeam = true;
        boardFormElements[3].disabled = false;
        boardFormElements[3].items = []; // TODO: get all teams
    }
    boardFormElements[2].visible = hasOrgan;
    boardFormElements[3].visible = hasTeam;
    boardFormElements[2].model = undefined;
    boardFormElements[3].model = undefined;
    this.setState({ visibility, boardFormElements });
    this.goTo("board-info");
  };
  getBoardInfo = () => {
    if (!this.refs.boardForm.validateForm()) {
      return;
    }
    const model = this.refs.boardForm.state.model;
    this.setState({ ...model });
    this.goTo("board-template");
  };
  selectTemplate = listType => {
    this.setState({ listType });
  };
  createBoard = () => {
    const model = {
      description: this.state.description,
      listType: this.state.listType,
      organizationId: this.state.organizationId,
      pictureId: this.state.pictureId,
      colorId: this.state.colorId,
      teamId: this.state.teamId,
      title: this.state.title,
      visibility: this.state.visibility
    };
    //  TODO: make the request
    //  /user/boards/add
  };
  Wrapper = props => {
    if (this.state.page === "board-background") {
      return props.children;
    }
    return (
      <Content contentContainerStyle={[GS.flexGrow1, GS.px2]}>
        {props.children}
      </Content>
    );
  };
  RenderPages = props => {
    switch (this.state.page) {
      case "board-visibility":
        return (
          <View style={[GS.flex1, GS.justifyContentCenter]}>
            {boardVisibilities.map(v => (
              <Card key={`${v.value}`} transparent>
                <TouchableOpacity
                  onPress={() => this.setVisibility(v.value)}
                  activeOpacity={0.85}
                >
                  <CardItem dir thumbnail>
                    <Left>
                      <Svg name={v.icon} />
                    </Left>
                    <Body>
                      <Text>{I18n.enum("Visibility", v.value)}</Text>
                      <Text note>{v.description}</Text>
                    </Body>
                  </CardItem>
                </TouchableOpacity>
              </Card>
            ))}
          </View>
        );
      case "board-info":
        return (
          <>
            <Image
              style={Styles.image}
              resizeMode="contain"
              source={images.create}
            />
            {props.BoardForm}
            <Button style={GS.my3} onPress={this.getBoardInfo} block>
              <Text>{I18n.t("NEXT_STEP")}</Text>
            </Button>
          </>
        );
      case "board-template":
        return (
          <>
            <Image
              style={Styles.image}
              resizeMode="contain"
              source={images.create}
            />
            <List style={Styles.templateList}>
              {templateOptions.map((temp, inx) => {
                const isSelected = this.state.listType === temp.id;
                const image = temp.image + (isSelected ? "-enabled" : "");
                return (
                  <ListItem
                    onPress={() => this.selectTemplate(temp.id)}
                    selected={isSelected}
                    first={inx === 0}
                    last={inx === templateOptions.length - 1}
                    key={`${temp.id}`}
                    icon
                    dir
                  >
                    <Left>
                      <Image
                        style={{ width: 30, height: 30 }}
                        source={images.boardTemplates[image]}
                      />
                    </Left>
                    <Body>
                      <Text>{I18n.enum("BoardTemplate", temp.id)}</Text>
                    </Body>
                  </ListItem>
                );
              })}
            </List>
            <Button
              style={GS.mt3}
              onPress={() => this.goTo("board-background")}
              block
            >
              <Text>{I18n.t("NEXT_STEP")}</Text>
            </Button>
          </>
        );
      case "board-background":
        return (
          <>
            <ChooseBackgroundComponent
              modelChange={obj => this.setState(obj)}
              color={this.state.colorId}
              picture={this.state.pictureId}
            />
            <Button onPress={this.createBoard} style={[GS.mt3, GS.mx2]} block>
              <Text>{I18n.t("CREATE")}</Text>
            </Button>
          </>
        );
      case "team-info":
        return (
          <>
            <Image
              style={Styles.image}
              resizeMode="contain"
              source={images.create}
            />
            {/*TODO: formComponent is not connected to HttpService*/}
            <FormComponent
              formElements={this.teamFormElements}
              backend="/user/teams/add"
              formStyle="regular"
              labelsStyle={[GS.pt3, GS.pb2]}
              containerStyle={Styles.formContainer}
              buttonProps={{ block: true }}
              buttonTitle={I18n.t("CREATE")}
              light
            />
          </>
        );
      default:
        return (
          <>
            <Image
              style={Styles.image}
              resizeMode="contain"
              source={images.create}
            />
            <Card transparent>
              <TouchableOpacity
                onPress={() => this.goTo("board-visibility")}
                activeOpacity={0.85}
              >
                <CardItem dir thumbnail>
                  <Left>
                    <Svg name="board" />
                  </Left>
                  <Body>
                    <Text>{I18n.t("BOARD")}</Text>
                    <Text note>{I18n.t("ADD_BOARD__DESCRIPTION")}</Text>
                  </Body>
                </CardItem>
              </TouchableOpacity>
            </Card>
            <Card transparent>
              <TouchableOpacity
                onPress={() => this.goTo("team-info")}
                activeOpacity={0.85}
              >
                <CardItem dir thumbnail>
                  <Left>
                    <Svg name="users" />
                  </Left>
                  <Body>
                    <Text>{I18n.t("TEAM")}</Text>
                    <Text note>{I18n.t("ADD_TEAM__DESCRIPTION")}</Text>
                  </Body>
                </CardItem>
              </TouchableOpacity>
            </Card>
          </>
        );
    }
  };
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={this.goBack} dark transparent>
              <Icon style={GS.headerIcon} name="chevron-left" type="Feather" />
            </Button>
          </Left>
          <Body style={{ flex: 2 }}>
            <this.getTitle />
          </Body>
          <Right>
            {this.state.page ? (
              <Button
                onPress={() => this.props.navigation.goBack(null)}
                transparent
              >
                <Text>{I18n.t("CANCEL")}</Text>
              </Button>
            ) : null}
          </Right>
        </Header>
        <this.Wrapper>
          <this.RenderPages
            BoardForm={
              <FormComponent
                formElements={this.state.boardFormElements}
                standalone={false}
                ref="boardForm"
                formStyle="regular"
                labelsStyle={[GS.pt3, GS.pb2]}
                containerStyle={Styles.formContainer}
                light
              />
            }
          />
        </this.Wrapper>
      </Container>
    );
  }
}
