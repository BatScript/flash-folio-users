## Todos - (with priority):
1. CRUD APIs for all Schemas
    1. Template - 1
    2. Portfolio - 1
    3. User - 1
2. Creator panel - 2.
3. Remake the form and write better code this time - 3.
4. Subdomain and Publish Screen - 0.
5. ~~ Sync the step component - 0 ~~
6. One template for one user : Add check in save portfolio api - 0
7. ~~ Pre-fill form if data exists - 0 ~~
8. Cypress integration - 3

## Currently on
Fixing Flow

## Issues
1. Fucked up flow (logged out users) - check it once more
2. Choosing subdomain inout debounce and correct value.
3. Form data not saving in DB properly.
## Flow
1. Homepage : Statically rendered, button sends to create if *logged in*
or else forces user to log in by sending to login screen. [x]

2. Create: Auth protected route, has all three steps. Keeps the following data *on page load*:
    > selected portfolio
    > saved data in form
    > if published or not, subdomain

## Folio by Flashweb
A FREE web-portfolio builder. Choose a template, customize it and publish.

Built with Nextjs.

## Authors
1. Mohit Ranjan
2. Nosang Subba