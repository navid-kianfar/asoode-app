// import React, { Component } from "react";
// import { Container, Content, Text, H1, H3, View } from "native-base";
// import { connect } from "react-redux";
// import GS from "../../themes/general-styles";
// import HttpService from "../../services/http-service";
// import ActionNames from "../../reducers/action-names";
// import * as Enums from "../../library/enums";
// import Styles from "./styles";
//
// class BoardsScreen extends Component {
//   componentDidMount() {
//     this.props.refresh();
//   }
//
//   render() {
//     return (
//       <Container>
//         <Content>
//           <View>
//             <H1>Personals</H1>
//             {this.props.dataSource.personalBoards.map((board, i) => {
//               return <Text key={i}>{board.title}</Text>;
//             })}
//           </View>
//           <View>
//             <H1>Teams</H1>
//             {this.props.dataSource.teamedBoards.map((team, i) => {
//               return (
//                 <View key={i}>
//                   <H3>{team.title}</H3>
//                   {team.boards.map((board, j) => {
//                     return <Text key={j}>{board.title}</Text>;
//                   })}
//                 </View>
//               );
//             })}
//           </View>
//         </Content>
//       </Container>
//     );
//   }
// }
//
// const mapStateToProps = state => ({
//   dataSource: state.board
// });
//
// const mapDispatchToProps = dispatch => ({
//   refresh: () => dispatch(fetch())
// });
//
// const fetch = () => {
//   return async dispatch => {
//     dispatch({ type: ActionNames.BoardFetchStart });
//     const op = await HttpService.post("/user/boards/list");
//     if (op.status !== Enums.OperationResultStatus.Success) {
//       // TODO: handle error
//       return;
//     }
//     dispatch({
//       type: ActionNames.BoardFetchSuccess,
//       payload: op.data
//     });
//   };
// };
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(BoardsScreen);
