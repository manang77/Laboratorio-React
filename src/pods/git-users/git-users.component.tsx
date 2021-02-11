import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { GitUserVmModel } from './git-user.vm';
import { GitUserComponent } from './components';
import * as gitUsersClasses from './git-users.styles';
import { ApplicationContext } from 'common-app/context';

interface Props {
  company: string;
  gitUsers: GitUserVmModel[];
  updateCompany: (newCompany: string) => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      paddingLeft: '60px',
    },
  })
);

export const GitUsersComponent: React.FC<Props> = props => {
  const { gitUsersCompany, setGitUsersCompany } = React.useContext(
    ApplicationContext
  );
  const [inputCompany, setInputCompany] = React.useState(gitUsersCompany);
  const { company, gitUsers, updateCompany } = props;
  const classes = useStyles();

  const setSearchCompany = () => {
    if (inputCompany !== company) {
      setGitUsersCompany(inputCompany);
      updateCompany(inputCompany);
    }
  };

  return (
    <>
      <div className={gitUsersClasses.searchContainer}>
        <div>
          <TextField
            id="search-company"
            value={inputCompany}
            onChange={e => setInputCompany(e.target.value)}
            label="Enter a Company"
          />
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setSearchCompany()}
          >
            Search
          </Button>
        </div>
      </div>
      <div className={gitUsersClasses.cardsContainer}>
        <Grid
          className={classes.root}
          container
          spacing={4}
          wrap={'wrap'}
          justify={'flex-start'}
        >
          {gitUsers.map((user, index) => (
            <Grid key={index} item xs={3}>
              <GitUserComponent key={index} gitUser={user} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};
