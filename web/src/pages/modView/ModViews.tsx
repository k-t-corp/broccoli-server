import React  from 'react'
import { Link } from "react-router-dom";
import Board from "../../api/Board"
import ApiClient from "../../api/ApiClient"
import {
  CircularProgress,
  Grid,
  Paper,
  Table, TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core";

interface Props {
  apiClient: ApiClient
}

interface State {
  boards: Board[],
  loading: boolean,
  error?: Error
}

export default class ModViews extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      "boards": [],
      "loading": true,
    };
  }

  componentDidMount() {
    this.props.apiClient.getBoards()
      .then(boards => {
        this.setState({ boards })
      })
      .catch(error => {
        this.setState({ error })
      })
      .finally(() => {
        this.setState({
          "loading": false
        })
      })
  }

  render() {
    if (this.state.loading) {
      return (
        <Grid container justify="center">
          <CircularProgress />
        </Grid>
      )
    }
    if (this.state.error) {
      return (
        <Grid container justify="center">
          <Typography variant='body1'>
            Failed to load. Reason: {this.state.error.toString()}
          </Typography>
        </Grid>
      )
    }
    if (this.state.boards.length === 0) {
      return (
        <Grid container justify="center">
          <Typography variant='body1'>
            No boards
          </Typography>
        </Grid>
      )
    }
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Query</TableCell>
              <TableCell>Limit</TableCell>
              <TableCell>Sort</TableCell>
              <TableCell>Columns</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {this.state.boards.map((board, index) => {
            const {board_id: boardId, board_query: { q, limit, sort, projections }} = board;
            return (
              <TableRow key={index}>
                <TableCell>
                  <Link to={`/modView/${encodeURIComponent(boardId)}`}>{boardId}</Link>
                </TableCell>
                <TableCell>
                  <p style={{fontFamily: 'monospace'}}>
                    {JSON.stringify(q)}
                  </p>
                </TableCell>
                <TableCell>{limit ? limit : "N/A"}</TableCell>
                <TableCell>
                  {sort ? <p style={{fontFamily: 'monospace'}}>
                    {JSON.stringify(sort)}
                  </p> : "N/A"}
                </TableCell>
                <TableCell>{projections.map(p => p["name"]).join(", ")}</TableCell>
              </TableRow>
            )
          })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
