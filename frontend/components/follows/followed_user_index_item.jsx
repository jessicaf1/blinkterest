
import React from 'react';
// import { withRouter, Route, Redirect, Link, HashRouter, Switch } from 'react-router-dom';


class FollowedUserIndexItem extends React.Component{
    constructor(props){
        super(props)
        this.handleFollow = this.handleFollow.bind(this);
        this.handleUnfollow = this.handleUnfollow.bind(this);
        this.displayMessage = this.displayMessage.bind(this);
        this.undisplayMessage = this.undisplayMessage.bind(this);
        this.sendtoUserShow = this.sendtoUserShow.bind(this);
        this.state = {message: false}
    }

    // handleSubmit(e){
    //     e.preventDefault(); 
    //     // debugger
    //     // let i = this.props.currentUser.followed_user_ids.indexOf(this.props.follow.id)
    //     // this.props.currentUser.followed_user_ids.splice(i, 1)
    //     let follow = {follower_id: this.props.currentUser.id, followable_id: this.props.follow.id, followable_type: 'User'}
    //     debugger
    //     this.props.deleteFollow(follow)
    // }

    displayMessage(){
        debugger
        this.setState({message: true}),
        setTimeout(this.undisplayMessage, 2000)
    }

    undisplayMessage(){
        this.setState({message: false})
    }

    handleUnfollow(e){
        e.preventDefault(); 
        // debugger
        // let i = this.props.currentUser.followed_user_ids.indexOf(this.props.follow.id)
        // this.props.currentUser.followed_user_ids.splice(i, 1)
        let follow = {follower_id: this.props.currentUser.id, followable_id: this.props.follow.id, followable_type: 'User'}
        debugger
        let payload = {follow: follow, user: this.props.currentUser}
        this.props.deleteFollow(follow)
    }

    handleFollow(e){
        e.preventDefault(); 
        // debugger
        // let i = this.props.currentUser.followed_user_ids.indexOf(this.props.follow.id)
        // this.props.currentUser.followed_user_ids.splice(i, 1)
        let follow = {follower_id: this.props.currentUser.id, followable_id: this.props.follow.id, followable_type: 'User'}
        // debugger
        // let payload = {follow: follow, user: this.props.currentUser}
        this.props.createFollow(follow),
        this.displayMessage()
    }

    sendtoUserShow(){
        this.props.history.push(`users/${this.props.follow.id}/boards`)
    }


    render(){
        debugger
    return (
        <div className="follow-list">
            <div className="follow-list-items">
                {/* <div className="followindexitem-name">{this.props.follower.l_name}</div> */}


                {this.state.message === true ? 
                        <div className="follow-message">you are now following {this.props.follow.f_name}!</div>
                             : null}

                {this.props.follow.photoUrl !== undefined ? 
                    <img onClick={this.sendtoUserShow} className="follower-image" src={this.props.follow.photoUrl}/>
                    : <img className="default-image" src={window.pinface} />}
                    <div className="followindexitem-name">{this.props.follow.f_name + " " + this.props.follow.l_name}</div> 
                    <div className="followindexitem-followers">2 boards · {this.props.follow.follower_ids.length} followers</div>
                               
                    {this.props.currentUser.followed_user_ids.includes(this.props.follow.id) ?
                       <button onClick={this.handleUnfollow} className="unfollow-button">Unfollow</button> :
                       <button onClick={this.handleFollow} className="follow-button">Follow</button>}
                     
                </div>
            {/* <img id="followindexitem-pic"src={this.props.follower.f_name.photoUrl} alt=""/> */}
        </div>
    )
    } 
}


import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deleteFollow, createFollow } from '../../actions/follow_actions'

export const mapStateToProps = state => {
    return {
        currentUser: state.entities.users[state.session.currentUser],
        followers: state.entities.follows 
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal()), 
        deleteFollow: follow => dispatch(deleteFollow(follow)), 
        createFollow: follow => dispatch(createFollow(follow))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FollowedUserIndexItem))