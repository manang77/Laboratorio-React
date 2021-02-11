import React from 'react';
import { ApplicationContext } from 'common-app/context';
import { GitUserVmModel } from './git-user.vm';
import {
  GitUsersApiModel,
  GitUsersApiModelWithHeader,
} from './api/git-users.api.model';
import { mapCompanyGitUsersFromApiToVM } from './git-users.mapper';
import { loadServerInformation, loadNewDataPage } from './git-users.api.vm';
import { getServerPages } from './git-users.utils';
import { GitUsersComponent } from './git-users.component';
import { ItemsPagination } from 'common/components/pagination';
import * as gitUsersStyles from './git-users.styles';
import Alert from '@material-ui/lab/Alert';

export const GitUsersContainer: React.FC = () => {
  const {
    gitUsersCompany,
    gitUsersNavigationPage,
    setGitUsersNavigationPage,
  } = React.useContext(ApplicationContext);
  const [company, setCompany] = React.useState(gitUsersCompany);
  const [usersData, setUsersData] = React.useState({});
  const [displayedGitUsers, setDisplayedGitUsers] = React.useState([]);
  const [pages, setPages] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [messageState, setMessageState] = React.useState(true);
  const [initialPageLoad, setInitialPageLoad] = React.useState(true);

  const noDataFoundForCriteria = () => {
    setUsersData({});
    setDisplayedGitUsers([]);
    setPages(0);
    setCurrentPage(0);
    setMessageState(false);
  };

  const getDataPage = async (
    company: string,
    page: number
  ): Promise<GitUserVmModel[]> => {
    let data: GitUserVmModel[] = usersData[page];
    if (!data) {
      const gitUsersNewPage: GitUsersApiModel[] = await loadNewDataPage(
        company,
        page
      );
      data = mapCompanyGitUsersFromApiToVM(gitUsersNewPage);
      const newPageData = {};
      newPageData[page] = data;
      setUsersData({ ...usersData, ...newPageData });
    }
    return data;
  };

  const loadPageData = async (company: string, page: number) => {
    const pageData: GitUserVmModel[] = await getDataPage(company, page);
    setDisplayedGitUsers(pageData);
  };

  const initialLoad = async (company: string, page: number) => {
    setMessageState(true);
    setCurrentPage(0);
    setUsersData({});
    const configData: GitUsersApiModelWithHeader = await loadServerInformation(
      company,
      page
    );
    if (configData.header !== null) {
      const serverPages = getServerPages(configData);
      setPages(serverPages);
      const vmFirstPage = mapCompanyGitUsersFromApiToVM(
        configData.gitUsersData
      );
      const firstDataPage = {};
      firstDataPage[page] = vmFirstPage;
      setUsersData({ ...firstDataPage });
      setCurrentPage(page);
    } else {
      noDataFoundForCriteria();
    }
  };

  React.useEffect(() => {
    if (company) {
      if (initialPageLoad) {
        initialLoad(
          company,
          gitUsersNavigationPage === 0 ? 1 : gitUsersNavigationPage
        );
        setInitialPageLoad(false);
      } else {
        initialLoad(company, 1);
      }
    } else {
      noDataFoundForCriteria();
    }
  }, [company]);

  React.useEffect(() => {
    if (currentPage > 0) {
      loadPageData(company, currentPage);
      setGitUsersNavigationPage(currentPage);
    }
  }, [currentPage]);

  const updateCompany = React.useCallback((newCompany: string) => {
    setCompany(newCompany);
  }, []);

  const setPageContainer = React.useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  return (
    <>
      <div className={gitUsersStyles.noUsersAlert} hidden={messageState}>
        <Alert
          variant="filled"
          severity="info"
        >{`There is no characters for search criteria`}</Alert>
      </div>
      <GitUsersComponent
        company={company}
        updateCompany={updateCompany}
        gitUsers={displayedGitUsers}
      />
      <ItemsPagination
        pages={pages}
        currentPage={currentPage}
        setPageContainer={setPageContainer}
      />
    </>
  );
};
