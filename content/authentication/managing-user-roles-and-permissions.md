---
title: "Managing User Roles and Permissions"
slug: "managing-user-roles-and-permissions"
collection: "authentication"
content_type: "guide"
visibility: "admin"
description: "Understand how to assign roles and configure granular permissions for users across your Evolve workspace."
author: "Evolve Team"
owner: "elina@evolveplatform.ai"
status: "published"
sort_order: 2
tags:
  - roles
  - permissions
  - user-management
  - access-control
created_at: "2026-03-14"
updated_at: "2026-03-14"
last_reviewed_at: "2026-03-14"
---

# Managing User Roles and Permissions

Evolve uses a role-based access control (RBAC) system to determine what each user can see and do within the platform. Properly configuring roles ensures that your team members have the access they need without exposing sensitive administrative functions.

## Default Roles

Evolve ships with four built-in roles:

| Role | Description |
|------|-------------|
| **Platform Admin** | Full access to all settings, user management, billing, and content. |
| **Content Manager** | Can create, edit, and publish courses and learning paths. Cannot modify platform settings. |
| **Team Lead** | Can view reports and progress data for their assigned teams. Limited content access. |
| **Learner** | Can access assigned courses, track personal progress, and earn certificates. |

## Assigning Roles to Users

1. Go to **Settings > Users & Teams > User Directory**.
2. Search for the user by name or email.
3. Click the user's row to open their profile.
4. Under the **Role** dropdown, select the appropriate role.
5. Click **Save Changes**.

You can also assign roles in bulk by selecting multiple users from the directory and choosing **Bulk Actions > Assign Role**.

## Creating Custom Roles

If the default roles do not fit your organizational needs, you can create custom roles with granular permissions.

1. Navigate to **Settings > Users & Teams > Roles & Permissions**.
2. Click **Create New Role**.
3. Enter a **Role Name** and **Description**.
4. Toggle individual permissions across the following categories:
   - **Content**: Create, edit, delete, publish courses
   - **Users**: Invite, deactivate, assign roles
   - **Reports**: View team reports, export data
   - **Settings**: Modify platform configuration, integrations
   - **Billing**: View invoices, manage subscription
5. Click **Save Role**.

## Permission Inheritance

Permissions in Evolve are additive. If a user belongs to multiple groups with different roles, they receive the **union** of all permissions granted by those roles. No permission is subtracted by adding a role.

## Best Practices

- **Follow the principle of least privilege**: Assign users only the permissions they need to perform their duties.
- **Audit roles quarterly**: Review the Roles & Permissions page to ensure custom roles still align with your organizational structure.
- **Use Team Leads for reporting**: Rather than giving managers full admin access, assign the Team Lead role so they can monitor progress without modifying content or settings.

## Revoking Access

To remove a user's access entirely, navigate to their profile and click **Deactivate Account**. Deactivated users cannot log in but their historical data (course completions, certificates) is preserved for compliance purposes.

## Frequently Asked Questions

**Q: Is there a maximum number of custom roles I can create?**

A: There is no hard limit on the number of custom roles. However, we recommend keeping your role structure simple and manageable. Most organizations find that 5 to 10 custom roles are sufficient to cover their access control needs without creating unnecessary complexity.

**Q: Can I revoke a user's access immediately?**

A: Yes. Navigate to the user's profile in **Settings > Users & Teams > User Directory** and click **Deactivate Account**. This terminates their active sessions and prevents any further logins within seconds. The user will be logged out automatically on their next request to the platform.

**Q: How does permission inheritance work when a user has multiple roles?**

A: Permissions in Evolve are additive. When a user is assigned multiple roles, either directly or through group membership, they receive the combined set of all permissions from every role. No role can revoke or subtract a permission granted by another role.

**Q: Can I assign roles to multiple users at once?**

A: Yes. In the **User Directory**, select the checkboxes next to the users you want to update, then choose **Bulk Actions > Assign Role** from the toolbar. Select the desired role and confirm. This is especially useful during onboarding when you need to set up many users at the same time.
