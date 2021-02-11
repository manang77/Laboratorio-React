import { GitUsersApiModelWithHeader } from './api';

export const getServerPages = (data: GitUsersApiModelWithHeader): number => {
  const { link } = data.header;
  if (link) {
    if (link.indexOf(`rel="last"`) === -1) {
      return (
        parseInt(
          link.slice(link.indexOf(`&page=`) + 6, link.indexOf(`>; rel="prev"`))
        ) + 1
      );
    } else {
      return parseInt(
        link.slice(
          link.indexOf(`&page=`, link.indexOf(`rel="next"`)) + 6,
          link.indexOf(link.indexOf(`>; rel="next"`))
        )
      );
    }
  } else {
    if (Array.isArray(data.gitUsersData)) {
      return 1;
    } else {
      return 0;
    }
  }
};
