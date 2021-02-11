import React from 'react';
import { GitUserVmModel } from '../git-user.vm';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { routes } from 'core/router';
import IconButton from '@material-ui/core/IconButton';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { useHistory } from 'react-router-dom';
import * as gitUserClasses from '../git-users.styles';

interface Props {
  gitUser: GitUserVmModel;
}

const useStyles = makeStyles({
  root: {
    width: 340,
    height: 300,
    backgroundColor: 'oldlace',
  },
  media: {
    height: 200,
    marginBottom: '15px',
  },
});

export const GitUserComponent: React.FC<Props> = props => {
  const { gitUser } = props;
  const classes = useStyles();
  const history = useHistory();

  const handleDetailClickButton = (login: string) => {
    history.push(routes.gitUserDetail(login));
  };

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Link to={routes.gitUserDetail(gitUser.login)}>
            <CardMedia className={classes.media} image={gitUser.avatarUrl} />
          </Link>
          <div>
            <div className={gitUserClasses.lineElementName}>
              <Typography
                align="center"
                color="textSecondary"
                gutterBottom
                variant="body1"
              >
                {gitUser.login}
              </Typography>
            </div>
            <div className={gitUserClasses.lineElementIcon}>
              <IconButton
                onClick={() => handleDetailClickButton(gitUser.login)}
              >
                <AssignmentIndIcon fontSize="large" color="primary" />
              </IconButton>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
