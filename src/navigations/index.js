import React from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

import TabBarComponent from "./tab-bar";

import DashboardScreen from "../screens/dashboard";
import AppInit from "../screens/app-init";
import LoginScreen from "../screens/authentication/login";
import RegisterScreen from "../screens/authentication/register";
import BoardsScreen from "../screens/boards";
import TeamsScreen from "../screens/teams";
import BoardScreen from "../screens/board";
import ChatList from "../screens/chat/chat-list";
import ChatSidebar from "../screens/chat/sidebar";
import ChatField from "../screens/chat/chat-field";
import CalendarScreen from "../screens/calendar";
import FileManagerScreen from "../screens/file-manager";
import ContactsListScreen from "../screens/contacts-list";
import ProfileScreen from "../screens/profile";
import TeamScreen from "../screens/team";
import OrganizationScreen from "../screens/organization";
import SearchScreen from "../screens/search";
import NotificationsScreen from "../screens/notifications";
import CardScreen from "../screens/card";
import TimeSpentListScreen from "../screens/time-spent";
import AutomationScreen from "../screens/automation";
import AccountScreen from "../screens/profile/account";
import PersonalArchivedBoardsScreen from "../screens/profile/archived-boards";
import SupportScreen from "../screens/profile/support";
import TransactionsScreen from "../screens/profile/transactions";
import TeamBoardsScreen from "../screens/team/boards";
import TeamMembersScreen from "../screens/team/members";
import TeamSettingsScreen from "../screens/team/settings";
import TeamArchivedBoardsScreen from "../screens/team/archived-boards";
import OrganizationMembersScreen from "../screens/organization/members";
import OrganizationGraphScreen from "../screens/organization/graph";
import OrganizationSettingsScreen from "../screens/organization/settings";
import OrganizationBoardsScreen from "../screens/organization/boards";
import OrganizationReportsScreen from "../screens/organization/reports";
import OrganizationOperationsScreen from "../screens/organization/operations";
import OrganizationFAQScreen from "../screens/organization/faq";
import NotificationsSettingsScreen from "../screens/notifications/settings";
import CreationScreen from "../screens/creation";
import ChatDetailsScreen from "../screens/chat/chat-details";
import CalendarAddCardModal from "../screens/calendar/add-modal";
import CreateTicketModal from "../screens/profile/support/create-ticket-modal";
import TimeSpentScreen from "../screens/time-spent/details";
import ContactScreen from "../screens/contacts-list/contact";
import OrganizationChangeProfileScreen from "../screens/organization/settings/change-profile";
import BoardSidebar from "../screens/board/sidebar";
import SupportChat from "../screens/profile/support/support-chat";
import TransactionDetailScreen from "../screens/profile/transactions/transaction-detail";
import ConfirmScreen from "../screens/authentication/confirm-phone";
import OrganizationFaqDetailScreen from "../screens/organization/faq/detail";

const hideTabBarInside = ({ navigation }) => {
  let tabBarVisible = navigation.state.index === 0;
  return {
    tabBarVisible
  };
};
const ChatStack = createStackNavigator(
  {
    ChatListContainer: createDrawerNavigator(
      {
        ChatList: ChatList
      },
      {
        contentComponent: ChatSidebar,
        drawerWidth: 330
      }
    ),
    ChatField: ChatField,
    ChatDetailsScreen
  },
  {
    headerMode: "none",
    navigationOptions: hideTabBarInside
  }
);

const AppNavigator = createSwitchNavigator(
  {
    AppInit: AppInit,
    Auth: createBottomTabNavigator({
      Login: {
        screen: LoginScreen,
        navigationOptions: { tabBarVisible: false }
      },
      Register: {
        screen: RegisterScreen,
        navigationOptions: { tabBarVisible: false }
      },
      ConfirmPhone: {
        screen: ConfirmScreen,
        navigationOptions: { tabBarVisible: false }
      }
    }),
    Main: createStackNavigator(
      {
        MainTabs: {
          screen: createBottomTabNavigator(
            {
              Dashboard: DashboardScreen,
              Chat: ChatStack,
              Calendar: createStackNavigator(
                {
                  CalendarScreen,
                  CalendarAddCardModal
                },
                {
                  headerMode: "none",
                  mode: "modal"
                }
              ),
              Teams: TeamsScreen,
              ContactsList: ContactsListScreen,
              FileManager: FileManagerScreen,
              Automation: AutomationScreen,
              TimeSpentList: createStackNavigator(
                {
                  TimeSpentListScreen,
                  TimeSpentScreen
                },
                {
                  headerMode: "none"
                }
              )
            },
            {
              tabBarComponent: TabBarComponent
            }
          )
        },
        SearchScreen,
        ProfileStack: {
          screen: createStackNavigator(
            {
              ProfileScreen,
              AccountScreen,
              PersonalArchivedBoardsScreen,
              SupportStack: {
                screen: createStackNavigator(
                  {
                    SupportScreen,
                    SupportChat,
                    CreateTicketModal
                  },
                  {
                    headerMode: "none",
                    mode: "modal"
                  }
                )
              },
              TransactionsStack: {
                screen: createStackNavigator(
                  {
                    TransactionsScreen,
                    TransactionDetailScreen
                  },
                  {
                    headerMode: "none",
                    mode: "modal"
                  }
                )
              }
            },
            {
              headerMode: "none"
            }
          )
        },
        NotificationsStack: {
          screen: createStackNavigator(
            {
              NotificationsScreen,
              NotificationsSettingsScreen
            },
            {
              headerMode: "none"
            }
          )
        },
        Board: {
          screen: createStackNavigator(
            {
              BoardScreen,
              BoardChatScreen: ChatField
            },
            {
              headerMode: "none",
              mode: "modal"
            }
          )
        },
        Card: CardScreen,
        CreationScreen,
        ContactScreen,
        TeamStack: {
          screen: createStackNavigator(
            {
              TeamScreen,
              TeamBoardsScreen,
              TeamMembersScreen,
              TeamSettingsScreen,
              TeamArchivedBoardsScreen
            },
            {
              headerMode: "none"
            }
          )
        },
        OrganizationStack: {
          screen: createStackNavigator(
            {
              OrganizationScreen,
              OrganizationGraphScreen,
              OrganizationMembersScreen,
              OrganizationBoardsScreen,
              OrganizationReportsScreen,
              OrganizationOperationsScreen,
              OrganizationSettings: {
                screen: createStackNavigator(
                  {
                    OrganizationSettingsScreen,
                    OrganizationChangeProfileScreen
                  },
                  {
                    headerMode: "none",
                    mode: "modal"
                  }
                )
              },
              OrganizationFAQ: {
                screen: createStackNavigator(
                  {
                    OrganizationFAQScreen,
                    OrganizationFaqDetailScreen
                  },
                  {
                    headerMode: "none",
                    mode: "modal"
                  }
                )
              },
            },
            {
              headerMode: "none"
            }
          )
        }
      },
      {
        headerMode: "none"
      }
    )
  },
  {
    initialRouteName: "AppInit"
  }
);

export default createAppContainer(AppNavigator);
