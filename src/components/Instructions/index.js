import React, {Component} from 'react';
import Icon from '@material-ui/core/Icon';
class Instructions extends Component {
        render() {
                return (
                        <div className="margin-bottom">
                                <ul className="z-depth-5 collection with-header">
                                        <li className="collection-header">
                                               <h4><Icon>help</Icon> Instructions</h4>
                                        </li>
                                        <li className="collection-item"><Icon>fiber_new</Icon>    For new complaints please click to New Complaint, form will be show ,add your complaint and submit.</li>
                                        <li className="collection-item"><Icon>remove_red_eye</Icon>    please click on My complaints tab.</li>
                                        <li className="collection-item"><Icon>description</Icon> Your complaint status can be Pending ,Reject, accepted.</li>
                                        <li className="collection-item"><Icon>chat</Icon> You can also chat with your complaint handler, by click on your complaint.</li>
                                        <li className="collection-item"><Icon>account_circle</Icon> Your can check your account status, please go to account button.</li>
                                </ul>
                        </div>
                )
        }
}
export default Instructions;
