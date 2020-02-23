import React, { Component } from "react";
import {
  Container,
  View,
  Text,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right
} from "native-base";
import I18n from "../../i18n";
import PropTypes from "prop-types";
import Styles from "./styles";
import DocumentViewerService from "../../services/document-viewer-service";
import FileManagerService from "../../services/file-manager-service";
import ActionNames from "../../reducers/action-names";
import { connect } from "react-redux";
import {
  ProgressBarAndroid,
  ProgressViewIOS,
  Platform,
  ActivityIndicator,
  FlatList,
  LayoutAnimation,
  NativeEventEmitter,
  NativeModules,
  RefreshControl,
} from "react-native";
import Alert from '../../services/alert-service';
import GS from "../../themes/general-styles";
import { FileItemDTO, FolderItemDTO } from "../../dtos/file-manager.dtos";
import FileItem from "../../components/file-item";
import FolderItem from "../../components/folder-item";
import Constants from "../../library/constants";
import { Metrics } from "../../themes/variables";
import AttachmentModal from "../../components/modals/attachment-modal";

class FileManagerScreen extends Component {
  static propTypes = {
    dataSource: PropTypes.shape({
      items: PropTypes.shape({
        files: PropTypes.arrayOf(PropTypes.shape(FileItemDTO)),
        folders: PropTypes.arrayOf(PropTypes.shape(FolderItemDTO)),
        root: PropTypes.string
      }),
      refreshing: PropTypes.bool,
      waiting: PropTypes.bool
    })
  };
  state = {
    openFileName: ""
  };
  constructor(props) {
    super(props);
    this.eventEmitter = new NativeEventEmitter(
      NativeModules.RNReactNativeDocViewer
    );
    this.eventEmitter.addListener("DoneButtonEvent", data => {
      this.props.previewProgress(0);
      if (data.close) {
        console.log(data);
      }
    });
  }
  componentDidMount() {
    this.props.refresh(this.props.dataSource.path, false);
    this.eventEmitter.addListener("RNDownloaderProgress", Event => {
      this.props.previewProgress(Event.progress);
    });
  }
  componentWillUnmount() {
    this.eventEmitter.removeListener();
  }
  renderFiles = ({ item }) => {
    if (item.extention) {
      return <FileItem onPick={this.pickFile} data={item} />;
    }
    return <FolderItem onPick={this.pickFolder} data={item} />;
  };
  pickFolder = folder => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.props.refresh(folder.path, false);
  };
  pickFile = file => {
    if (file.isVideo) {
      return;
    }
    this.setState({ openFileName: file.name });
    const path = Constants.BASE_URL + file.path;
    this.props.previewProgress(1);
    DocumentViewerService.remoteFile(path, file.name, file.extention).then(
      result => {
        this.props.previewProgress(0);
        if (result.error) console.log(result.error);
      },
      err => {
        console.log(err);
      }
    );
  };
  // renderHeader = () => {
  //   const parts = this.props.dataSource.path.split("/").filter(p => p !== "");
  //   if (parts.length) {
  //     parts.shift();
  //     parts.shift();
  //     parts.shift();
  //   }
  //   if (parts.length && parts[parts.length - 1] === "/") {
  //     parts.pop();
  //   }
  //   return (
  //     <View>
  //       <Text>{parts.join(" / ")}</Text>
  //     </View>
  //   );
  // };
  renderEmpty = () => {
    return (
      <View style={[GS.flex1, GS.alignItemsCenter, GS.justifyContentCenter]}>
        <Text note>{I18n.t("EMPTY_FOLDER")}</Text>
      </View>
    );
  };
  keyExtractor = item => item.path;
  getName = path => {
    if (!path) return '';
    return (path || '').trim()
        .replace(/\\\\/g, '/')
        .split("/")
        .reverse()[0];
  };
  handleRefresh = () => {
    this.props.toggleRefresh(true);
    this.props.refresh(this.props.dataSource.path, true);
  };
  refreshControl = (
      <RefreshControl
          refreshing={this.props.dataSource.refreshing}
          onRefresh={this.handleRefresh}
      />
  );
  goBack = () => {
    this.pickFolder({ path: this.props.dataSource.prevPath });
  };
  cancelPreview = () => {};
  upload = () => {
    this.attachModal.open();
  };
  newFolder = () => {
    Alert.prompt(
      "NEW_FOLDER",
      null,
      [
        {
          type: 'input',
          field: 'title',
          label: I18n.t('TITLE'),
          model: I18n.t("UNTITLED_FOLDER"),
          validation: {
            required: true,
          },
        }
      ],
      [
        {
          text: I18n.t("CANCEL"),
          style: "cancel"
        },
        {
          text: I18n.t("OK"),
          onPress: async model => {
            if (!model || !model.title.trim()) { return; }
            const name = model.title.trim();
            const found = this.props.dataSource.items.folders.find(i => i.name === name);
            if (found) {
              Alert.warning('CORE_GENERAL_OPERATIONRESULTS_DUPLICATE');
              return;
            }
            await this.props.createFolder({name, path: this.props.dataSource.path });
          }
        }
      ],
    );
  };
  render() {
    const data = [
      ...this.props.dataSource.items.folders,
      ...this.props.dataSource.items.files
    ];
    return (
      <Container>
        <Header>
          <Left>
            {this.props.dataSource.prevPath ? (
              <Button onPress={this.goBack} dark transparent>
                <Icon
                  style={GS.headerIcon}
                  name="chevron-left"
                  type="Feather"
                />
                <Text>
                  {this.getName(this.props.dataSource.prevPath) ||
                    I18n.t("FILES")}
                </Text>
              </Button>
            ) : this.props.dataSource.previewPercent ? (
              <Button onPress={this.cancelPreview} dark transparent>
                <Icon
                  style={GS.headerIcon}
                  name="chevron-left"
                  type="Feather"
                />
                <Text>{I18n.t("CANCEL")}</Text>
              </Button>
            ) : null}
          </Left>
          <Body>
            <Title style={[GS.alignSelfStretch, GS.textCenter]}>
              {!this.props.dataSource.previewPercent
                ? this.props.dataSource.prevPath
                  ? this.getName(this.props.dataSource.path)
                  : I18n.t("FILES")
                : this.state.openFileName}
            </Title>
          </Body>
          <Right>
            {!this.props.dataSource.previewPercent ? (
              <>
                <AttachmentModal ref={ref => this.attachModal = ref} fileManager>
                  <Button onPress={this.upload} dark transparent>
                    <Icon style={GS.headerIcon} name="upload" type="AntDesign" />
                  </Button>
                </AttachmentModal>
                <Button onPress={this.newFolder} dark transparent>
                  <Icon
                    style={GS.headerIcon}
                    name="addfolder"
                    type="AntDesign"
                  />
                </Button>
              </>
            ) : null}
          </Right>
        </Header>
        {this.props.dataSource.waiting ? (
          <View style={GS.waitingContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : this.props.dataSource.previewPercent ? (
          <View
            style={[GS.flex1, GS.alignItemsCenter, GS.justifyContentCenter]}
          >
            {Platform.OS === "ios" ? (
              <>
                <ActivityIndicator />
                <Text>{this.props.dataSource.previewPercent} %</Text>
                <ProgressViewIOS
                  style={{ width: Metrics.WIDTH * 0.5 }}
                  progress={this.props.dataSource.previewPercent / 100}
                  trackTintColor="#2196F3"
                />
              </>
            ) : (
              <>
                <Text style={GS.py3}>{I18n.t("DOWNLOADING")}...</Text>
                <ProgressBarAndroid
                  style={{ width: Metrics.WIDTH * 0.5 }}
                  styleAttr="Horizontal"
                  color="#2196F3"
                />
              </>
            )}
          </View>
        ) : (
          <FlatList
            style={GS.zIndexM}
            contentContainerStyle={[GS.flexGrow1, GS.px2, GS.py2]}
            data={data}
            ListEmptyComponent={this.renderEmpty}
            renderItem={this.renderFiles}
            // ListHeaderComponent={this.renderHeader}
            keyExtractor={this.keyExtractor}
            refreshControl={this.refreshControl}
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  dataSource: state.fileManager
});

const mapDispatchToProps = dispatch => ({
  refresh: (path, skip) => FileManagerService.fetch(dispatch, path, skip),
  createFolder: (model) => FileManagerService.createFolder(dispatch, model),
  previewProgress: percent => {
    dispatch({
      type: ActionNames.FileManagerPreviewPercentChanged,
      payload: Math.round(percent)
    });
  },
  toggleRefresh: status => {
    dispatch({
      type: ActionNames.FileManagerRefresh,
      payload: status
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FileManagerScreen);
