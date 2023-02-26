import { RoleUserGuard } from './role-user.guard';

describe('RoleUserGuard', () => {
  it('should be defined', () => {
    expect(new RoleUserGuard()).toBeDefined();
  });
});
