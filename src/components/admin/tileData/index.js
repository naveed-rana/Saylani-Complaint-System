
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';
import {Link} from 'react-router-dom';
import * as routes from '../../../constants/routes';

export const mailFolderListItems = (
  <div>
    
    <ListItem button component={Link} to={routes.ADMIN}>
      <ListItemIcon>
        <Icon>home</Icon>
      </ListItemIcon>
      <ListItemText primary="Complaints" />
    </ListItem>

    <ListItem button component={Link} to={routes.MANAGERS}>
      <ListItemIcon>
      <Icon>dashboard</Icon>
      </ListItemIcon>
      <ListItemText primary="Managers" />
    </ListItem>
    <ListItem button component={Link} to={routes.NEWMANGER}>
      <ListItemIcon>
       <Icon>create_new_folder</Icon>
      </ListItemIcon>
      <ListItemText primary="Add Manager" />
    </ListItem>

   
  </div>
);

export const otherMailFolderListItems = (
  <div>
    
    <ListItem button component={Link} to={routes.REJECTEDHISTORY}>
      <ListItemIcon>
        <DeleteIcon />
      </ListItemIcon>
      <ListItemText primary="Rejected Complaints" />
    </ListItem>
    <ListItem button component={Link} to={routes.RESOLVEDHISTORY}>
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      <ListItemText primary="Confirm Resolved" />
    </ListItem>
  </div>
);