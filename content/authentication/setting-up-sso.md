---
title: "Setting Up Single Sign-On (SSO)"
slug: "setting-up-sso"
collection: "authentication"
content_type: "guide"
visibility: "admin"
description: "Learn how to configure SSO for your organization using SAML 2.0 or OpenID Connect (OIDC) protocols."
author: "Evolve Team"
owner: "elina@evolveplatform.ai"
status: "published"
sort_order: 1
tags:
  - sso
  - saml
  - oidc
  - authentication
  - security
created_at: "2026-03-14"
updated_at: "2026-03-14"
last_reviewed_at: "2026-03-14"
---

# Setting Up Single Sign-On (SSO)

Single Sign-On allows your employees to access Evolve using their existing corporate credentials. Evolve supports both **SAML 2.0** and **OpenID Connect (OIDC)** protocols, making it compatible with most major identity providers.

## Prerequisites

Before you begin, make sure you have:

- **Platform Admin** or **IT Admin** role in Evolve
- Access to your organization's identity provider (IdP) admin console
- Your IdP's metadata URL or XML file (for SAML) or client credentials (for OIDC)

## Configuring SAML 2.0

1. Navigate to **Settings > Authentication > SSO Configuration**.
2. Select **SAML 2.0** as your protocol.
3. Copy the **Assertion Consumer Service (ACS) URL** and **Entity ID** displayed on the configuration page.
4. In your identity provider, create a new SAML application and paste the ACS URL and Entity ID.
5. Download the **Federation Metadata XML** from your IdP and upload it to Evolve, or paste the **Metadata URL** directly.
6. Map the required attributes:
   - `email` (required)
   - `firstName` (required)
   - `lastName` (required)
   - `department` (optional)
7. Click **Save & Test** to validate the connection.

## Configuring OpenID Connect (OIDC)

1. Navigate to **Settings > Authentication > SSO Configuration**.
2. Select **OpenID Connect** as your protocol.
3. Enter the following details from your IdP:
   - **Client ID**
   - **Client Secret**
   - **Discovery URL** (e.g., `https://your-idp.com/.well-known/openid-configuration`)
4. Configure the requested scopes. Evolve requires `openid`, `email`, and `profile` at a minimum.
5. Click **Save & Test** to validate the connection.

## Testing Your Configuration

After saving, use the **Test SSO Login** button to perform a dry run. Evolve will open a new window and attempt authentication through your IdP. If the test succeeds, you will see a confirmation with the mapped user attributes.

## Enforcing SSO for All Users

Once testing is complete, you can toggle **Require SSO** under the SSO settings panel. When enabled, all users must authenticate through your identity provider. Direct email/password login will be disabled for non-admin accounts.

> **Note:** We recommend keeping at least one admin account with direct login enabled as a recovery option in case of IdP outages.

## Troubleshooting

- **Certificate errors**: Ensure your IdP's signing certificate has not expired.
- **Attribute mapping failures**: Verify that the claim names in your IdP match the expected attribute names in Evolve.
- **Redirect loop**: Confirm that the ACS URL and callback URL are correctly configured in your IdP.

If you encounter persistent issues, contact Evolve Support with your SSO diagnostic logs, available under **Settings > Authentication > Logs**.

## Frequently Asked Questions

**Q: How long does it take to set up SSO?**

A: Most organizations complete SSO configuration within 30 to 60 minutes, assuming you already have admin access to your identity provider. The majority of the time is spent on attribute mapping and testing rather than the Evolve-side configuration itself.

**Q: Can I test SSO without enforcing it for all users?**

A: Yes. After saving your SSO configuration, use the **Test SSO Login** button to validate the connection without affecting any existing users. SSO is not enforced until you explicitly toggle the **Require SSO** setting, so you can test thoroughly before rolling it out organization-wide.

**Q: Does Evolve support multiple identity providers at the same time?**

A: Evolve supports one primary SSO configuration per workspace. If your organization uses multiple IdPs, you will need to federate them through a single IdP or identity broker before connecting to Evolve. Contact Evolve Support if you need guidance on multi-IdP architectures.

**Q: How do I revert to password-based login after enabling SSO?**

A: Navigate to **Settings > Authentication > SSO Configuration** and toggle off **Require SSO**. This immediately re-enables email and password login for all users. Your SSO configuration is preserved so you can re-enable it at any time without reconfiguring.
