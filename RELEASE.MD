# v1.6.0
* Added a method that resets a user's password (change password w/out old password)

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
