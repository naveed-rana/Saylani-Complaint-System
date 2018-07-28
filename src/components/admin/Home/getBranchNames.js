import React, { Component } from 'react';

export default class BranchName extends Component {
    render() {
        return (
            <option value={this.props.name}>{this.props.name}</option>
        )
    }
}
