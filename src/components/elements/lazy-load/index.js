import React, { Component } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { Button, Icon, Text, View } from "native-base";
import GS from "../../../themes/general-styles";
import I18n from "../../../i18n";
import PropTypes from "prop-types";
import { OperationResultStatus } from "../../../library/enums";
import HttpService from "../../../services/http-service";
import LazyLoadFooter from "./loader-footer";
const { bool, string, number, any, array, func, object } = PropTypes;

class LazyLoadFlatList extends Component {
  state = {
    refreshing: false,
    isLoading: false,
    rows: this.props.rows || [],
    currentPage: this.props.currentPage || 1,
    totalPages: this.props.totalPages || 2,
    totalItems: this.props.totalItems || 0
  };
  setProp = (prop, val) => {
    const state = {};
    state[prop] = val;
    this.setState(state);
    if (this.props[prop + "Change"]) {
      this.props[prop + "Change"](val);
    }
  };
  componentDidMount() {
    if (!(this.props.rows || []).length) {
      this.updateDataSource();
    }
  }
  updateDataSource = async e => {
    let page = this.state.currentPage;
    if (e) {
      page++;
    }
    if (!this.props.backend) {
      return;
    }
    this.setProp(this.state.refreshing ? "refreshing" : "isLoading", true);
    const op = await HttpService.grid({
      page,
      backend: this.props.backend,
      params: this.props.backendParams,
      pageSize: this.props.pageSize || 20
    });
    const wasRefreshing = this.state.refreshing;
    this.setProp(this.state.refreshing ? "refreshing" : "isLoading", false);
    if (op.status !== OperationResultStatus.Success) {
      // TODO: handle error;
      return;
    }
    const items = op.data.items || [];
    if (!items.length) {
      this.setProp("totalItems", op.data.totalPages);
      return;
    }
    if (this.props.checkDuplicate) {
      items.forEach(item => {
        const i = this.rows.findIndex(
          oldItem =>
            item[this.props.checkDuplicate] ===
            oldItem[this.props.checkDuplicate]
        );
        if (i !== -1) {
          items.splice(i, 1);
        }
      });
    }
    this.setProp("currentPage", page);
    this.setProp("totalItems", op.data.totalItems);
    this.setProp("totalPages", op.data.totalPages);
    this.setProp(
      "rows",
      wasRefreshing ? items : [...this.state.rows, ...items]
    );
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.backend !== prevProps.backend) {
      const state = {
        rows: this.props.rows || [],
        currentPage: this.props.currentPage || 1,
        totalPages: this.props.totalPages || 2,
        totalItems: this.props.totalItems,
        isLoading: this.props.isLoading || true
      };
      this.setState(state);
      this.componentDidMount();
    }
    const callback = field => {
      const passedField = this.props[field];
      if (
        passedField !== prevProps[field] &&
        passedField !== this.state[field]
      ) {
        const state = {};
        state[field] = passedField;
      }
    };
    ["rows", "totalPages", "totalItems", "currentPage", "isLoading"].forEach(
      callback
    );
  }
  handleRefresh = () => {
    this.setState({
      refreshing: true,
      currentPage: 1,
      totalPages: 2,
      totalItems: 0,
      isLoading: false
    });
    setTimeout(() => this.updateDataSource(), 20);
  };
  render() {
    return (
      <FlatList
        style={GS.zIndexM}
        data={this.state.rows}
        {...this.props.flatListProps}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh}
        ListFooterComponentStyle={
          !(this.state.rows || []).length ? GS.flexGrow1 : null
        }
        ListFooterComponent={
          this.state.refreshing ? null : (
            <LazyLoadFooter
              isLoading={this.state.isLoading}
              fullScreen={!(this.state.rows || []).length}
              hasMore={this.state.currentPage < this.state.totalPages}
              loadMore={this.updateDataSource}
            />
          )
        }
      />
    );
  }
}

LazyLoadFlatList.propTypes = {
  backend: string.isRequired,
  flatListProps: object.isRequired,
  backendParams: any,
  disabled: bool,
  pageSize: number,
  checkDuplicate: string,

  rows: array,
  currentPage: number,
  totalPages: number,
  totalItems: number,
  isLoading: bool,

  rowsChange: func,
  currentPageChange: func,
  totalPagesChange: func,
  totalItemsChange: func,
  isLoadingChange: func
};
export default LazyLoadFlatList;
