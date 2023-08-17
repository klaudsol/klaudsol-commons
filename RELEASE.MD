# v1.9.1
* Added DynamoDB.js file

# v1.9.0
* Added DynamoDB

# v1.8.1
* Added `userId` to People model.

# v1.8.0
* Supports OR queries in assertUserCan (e.g. `assertUserCan(['can_do_admin_stuff', 'write_contents'], req`)
* Supports parameterized capabilities (e.g. `assertUserCan('write_contents', req, 'blog')`)
* Provides a Download to CSV mechanism for frontend and backend. 

# v1.7.1
* Fixed build issues involving DB#sha256
* Removed `write_content_types` capability from Administrator and Editor
* Removed `write_settings` capability from Administrator

# v1.7.0
* Added Session#create() and Session#cleanupExpired
* Added @klaudsol/commons/lib/Crypto for cryptography-related functions
* Crypto#sha256 has can now be encoded as 'hex' or 'base64' (used to be 'base64' only)

# v1.6.1
* Fix: Removed trailing commas on migration script

# v1.6.0
* Added a method that resets a user's password (change password w/out old password)
* assertUserCan now caters to both JWT and session.

# v1.5.0
* Add the S3.js file, which includes presigned URL's upload, among other things.
* Execute migrations inside plugins

# v1.4.1
* Disable Cloudwatch errors when not being used

# v1.4.0
* Migration system now avaiable via dist/scripts
* Plugin system also availabe via dist/scripts
* Bug fix: cannot change password on initial login
* Bug fix: API calls should still work if caller uses session instead of JWT

# v1.3.0
* Addition of a migration system, found in dist/db
* Addition of PATCH and OPTIONS verb on createAPIHandler

# v1.2.0
* Added @klaudsol/commons/lib/SES

# v1.1.2
* Align environment variables with the new naming convention

# v1.1.1
* Prefixed all environment variables with KS_ so that we can play nicely with AWS Amplify

# v1.1.0
* Added support for JWT Tokens
* Added some CORS improvement

# v1.0.2
* Minor environment variable fix: KS_SECRET_COOKIE_PASSWORD and KS_SECRET_COOKIE_NAME

# v1.0.1
* Fix: People model should be ordered deterministically.

# v1.0.0

These are reusable code that has just been recently refactored out of KlaudSol CMS.

Important bits include:

* Groups and Capabilities
* API handlers and Default Error Handlers
* Connectivity to Data API of Aurora Serverless V1
