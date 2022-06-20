import { PageContainer } from '@keystone-6/core/admin-ui/components';
import { Heading, Stack } from '@keystone-ui/core';

import { css } from '@emotion/css';

import HomeSelect from '../../../src/admin/components/HomeSelect';
import MenuBuilder from '../../../src/admin/components/MenuBuilder';

export const style = {
  wrapper: css`
    padding-top: 24px;
  `
};

const SettingsPage = () => {

  return (
    <PageContainer header={<Heading type="h3">Settings</Heading>}>

      <Stack className={style.wrapper} dividers={"between"} gap={"xlarge"}>

        <HomeSelect/>

        <MenuBuilder/>

      </Stack>

    </PageContainer>
  )
}

export default SettingsPage