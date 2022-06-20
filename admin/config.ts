import CustomLogo from '../src/admin/components/CustomLogo';
import { AdminConfig } from '@keystone-6/core/types';
import { Navigation } from '../src/admin/components/Navigation';

export const components: AdminConfig['components'] = {
  Navigation: Navigation,
  Logo: CustomLogo
};