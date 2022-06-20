import CustomLogo from './components/CustomLogo';
import { AdminConfig } from '@keystone-6/core/types';
import { Navigation } from './components/Navigation';

export const components: AdminConfig['components'] = {
  Navigation: Navigation,
  Logo: CustomLogo
};