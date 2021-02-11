import React from 'react';
import {
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from '@material-ui/core';
import { Card } from '@material-ui/core';
import TwitterIcon from '@material-ui/icons/Twitter';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import GitHubIcon from '@material-ui/icons/GitHub';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { GitUserVmModel } from './git-user-detail.vm';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import * as gitUserClasses from './git-user-detail.styles';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '35%',
      backgroundColor: 'oldlace',
    },
    media: {
      padding: '30%',
    },
    icon: {
      color: 'secondary',
    },
  })
);

interface Props {
  gitUser: GitUserVmModel;
}

export const GitUserDetailComponent: React.FC<Props> = props => {
  const classes = useStyles();
  const { gitUser } = props;
  const history = useHistory();

  const handleDetailClickButton = () => {
    history.goBack();
  };

  return (
    <>
      <Card className={classes.root}>
        <CardHeader title={gitUser.name} />
        {gitUser.avatarUrl ? (
          <CardMedia className={classes.media} image={gitUser.avatarUrl} />
        ) : (
          <CircularProgress color="primary" />
        )}
        <CardContent>
          <div className={gitUserClasses.cardLineContainer}>
            <div className={gitUserClasses.lineElementIcon}>
              <AssignmentIndIcon fontSize="large" className={classes.icon} />
            </div>
            <div className={gitUserClasses.lineElementText}>
              <Typography variant="body1" component="p">
                {gitUser.login}
              </Typography>
            </div>
          </div>
          <div className={gitUserClasses.cardLineContainer}>
            <div className={gitUserClasses.lineElementIcon}>
              <GitHubIcon fontSize="large" className={classes.icon} />
            </div>
            <div className={gitUserClasses.lineElementText}>
              <Typography variant="body1" component="p">
                {`${gitUser.followers} Followers ${gitUser.following} Following`}
              </Typography>
            </div>
          </div>
          <div className={gitUserClasses.cardLineContainer}>
            <div className={gitUserClasses.lineElementIcon}>
              <TwitterIcon fontSize="large" className={classes.icon} />
            </div>
            <div className={gitUserClasses.lineElementText}>
              <Typography variant="body1" component="p">
                {gitUser.twitterUser}
              </Typography>
            </div>
          </div>
          <div className={gitUserClasses.cardLineContainer}>
            <div>
              <Typography variant="body1" component="p" gutterBottom>
                {gitUser.bio}
              </Typography>
            </div>
          </div>
          <div className={gitUserClasses.lineButtonIcon}>
            <IconButton onClick={() => handleDetailClickButton()}>
              <ExitToAppIcon fontSize="large" color="primary" />
            </IconButton>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
