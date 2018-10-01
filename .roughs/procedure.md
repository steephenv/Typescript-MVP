# csv upload

## process

sign file `>` put to s3 `>` get `accessUrl` `>` call [task creator api](https://devapi-miwago.cubettech.in/docs/#/bj/post_bj) with the `accessUrl` 

Then **check for updates** with the following graph api

```
query Q {
  collection(name:"BackgroundTaskQueue"){
    fetch(sort:{createdAt:-1}, limit: 20, skip: 0)
  }
}
```

## table

create this table with the check-for-updates api mentioned above.

| createdAt | file     | functionName       | status  | successLog | errLog | taskId     |
| --------- | -------- | ------------------ | ------- | ---------- | ------ | ---------- |
| date      | someFile | CAT_TEST           | queued  | n/a        | n/a    | fa35da5453 |
| date      | someFile | SKILL_CATEGORY_CSV | running | n/a        | n/a    | fa35da5453 |
| date      | someFile | CAT_TEST           | passed  | n/a        | n/a    | fa35da5453 |

