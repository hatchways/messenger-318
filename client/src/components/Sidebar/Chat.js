import { Box } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { setActiveChat } from "../../store/activeConversation";
import { BadgeAvatar, ChatContent } from "../Sidebar";

const styles = {
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
  unread: {
    background: "#3A8DFF",
    color: "#FFF",
    borderRadius: 10,
    height: 20,
    padding: "0 6px",
    fontWeight: "bold",
    textAlign:"center",
  }
};

class Chat extends Component {
  handleClick = async (conversation) => {
    await this.props.setActiveChat(conversation.otherUser.username);
  };

  calculate() {
    return this.props.conversation.messages.filter((message) => !message.read && message.senderId === this.props.conversation.otherUser.id).length;
  }


  render() {
    const { classes } = this.props;
    const otherUser = this.props.conversation.otherUser;
    this.props.conversation.unread = this.calculate();

    return (
      <Box
        onClick={() => this.handleClick(this.props.conversation)}
        className={classes.root}
      >
        <BadgeAvatar
          photoUrl={otherUser.photoUrl}
          username={otherUser.username}
          online={otherUser.online}
          sidebar={true}
        />
        <ChatContent conversation={this.props.conversation} />
        { this.props.conversation.unread !== 0 && 
          <div className={classes.unread}>
            {this.props.conversation.unread}
          </div>
        }
      </Box>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Chat));
