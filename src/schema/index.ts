import { Lists } from '.keystone/types';

import { User } from './User';
import { UserRole } from './UserRole';
import { Route } from './Route';
import { UserCart } from './UserCart';
import { Tag } from './Tag';
import { Category } from './Category';
import { Page } from './Page';
import { Product } from './Product';
import { Order } from './Order';
import { Payment } from './Payment';
import { Coupon } from './Coupon';
import { Setting } from './Setting';

export const lists: Lists = {
  Setting,
  User,
  UserRole,
  Route,
  UserCart,
  Tag,
  Category,
  Page,
  Product,
  Order,
  Payment,
  Coupon
};
