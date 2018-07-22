
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

    <ListItem button >
      <ListItemIcon>
       <Icon>account_circle</Icon>
      </ListItemIcon>
      <ListItemText primary="Admin Profile" />
    </ListItem>
   
  </div>
);

export const otherMailFolderListItems = (
  <div>
    
    <ListItem button>
      <ListItemIcon>
        <DeleteIcon />
      </ListItemIcon>
      <ListItemText primary="Help" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      <ListItemText primary="Report" />
    </ListItem>
  </div>
);