import React, { Component } from 'react'

export default class Status extends Component {
        componentDidMount(){
                alert("from status my");
        }
        render() {
                return (
                        <div>
          <ul className="z-depth-5 collection with-header">
        <li className="collection-header"><h4>Your complaints Status! </h4></li>
        <li className="collection-item">Alvin</li>
        <li className="collection-item">Alvin</li>
        <li className="collection-item">Alvin</li>
        <li className="collection-item">Alvin</li>
        </ul>     
                        </div>
                )
        }
}


