import { NavigationContainer, NavItem, ListNavItems } from '@keystone-6/core/admin-ui/components';
import type { NavigationProps } from '@keystone-6/core/admin-ui/components';

export function Navigation({ authenticatedItem, lists }: NavigationProps) {
  return (
    <NavigationContainer authenticatedItem={authenticatedItem}>
      <ListNavItems lists={lists}/>
      <NavItem href="/settings">
        Settings
      </NavItem>
      <NavItem href="/api/graphql">
        GraphQL
      </NavItem>
    </NavigationContainer>
  )
}