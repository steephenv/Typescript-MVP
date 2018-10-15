# API Deployment Information

> _For backend internal use, there are 2 more additional deployments which are not listed here._
> _Their conf files are_
> * `config/runner-test.yaml`: _for testing by pipelines_
> * `config/development.yaml`: _for testing by backend developers_
> * `config/development-test.yaml`: _`npm test` command run all tests against this deployment (for backend developers)._

The following endpoint are exposed for apis.

## Development beta: [devapi-miwago](https://devapi-miwago.cubettech.in/)

* For testing within Cubet. (CI/CD Enabled)
* Deployed when a commit goes to `master` after successful build pipelines.

| property    | value                                                                  |
| ----------- | ---------------------------------------------------------------------- |
| url         | https://devapi-miwago.cubettech.in/                                    |
| config file | `config/production-beta.yaml`                                          |
| app server  | `dev-miwago@185.148.147.4 ~/miwago-api`                                |
| app port    | `6533`                                                                 |
| database    | `192.168.200.20:27017/miwago_db`                                       |
| DB user     | `miwago_user`                                                          |
| DB Pass     | <!-- `JKHGTREGxf76fukvc0yt0bW#$bbkjk/hnjkzagsdavbskdjlad` --> _hidden_ |

## Staging or Pre-production: [personal-management](https://personalapi-miwago.cubettech.in/)

* For testing by client. (CI/CD Enabled)
* Deployed when a git `tag` is created for a commit whose build pipeline succeeded.

| property    | value                                                                         |
| ----------- | ----------------------------------------------------------------------------- |
| url         | https://personalapi-miwago.cubettech.in/                                      |
| config file | `config/production-staging.yaml`                                              |
| app server  | `dev-miwago@185.148.147.4 ~/staging-miwago-api`                               |
| app port    | `6233`                                                                        |
| database    | `192.168.200.20:27017/miwago_db_staging`                                      |
| DB user     | `miwago`                                                                      |
| DB Pass     | <!-- `JNH76Gh4jglh6H7UT8G0hlf3fkh86524rfd543trs2fdxdnvfBDGFVS2u` --> _hidden_ |

## Production: [capricorns](https://api.capricorns.io)

* For production use. (CI/CD Enabled)
* Deployed when a git `tag` is created for a commit whose build pipeline succeeded and **manual job triggered** (by clicking the deploy button)

| property    | value                                                                                                                                                                                                                                                                                               |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| url         | https://api.capricorns.io                                                                                                                                                                                                                                                                           |
| config file | `config/production-production.yaml`                                                                                                                                                                                                                                                                 |
| app server  | `miwago-api@3.120.125.66 ~/miwago-api`                                                                                                                                                                                                                                                              |
| app port    | `3000`                                                                                                                                                                                                                                                                                              |
| database    | `mongodb://`<br>`capricorns-db-user:Capricorns-DB-pwd-56%24@capricons-cl1-shard-00-00-jngps.mongodb.net:27017 `<br>`capricons-cl1-shard-00-01-jngps.mongodb.net:27017 `<br>`capricons-cl1-shard-00-02-jngps.mongodb.net:27017/miwago_db?authSource=admin&replicaSet=Capricons-CL1-shard-0&ssl=true` |
