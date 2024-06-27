### automation-buckets
A repository where my auto-updated, useless files can be publicly found.

This is used to automatically update files every day to maintain my streak whenever I'm not active.

### Source :books:

You can view the files in the `/buckets` folder, which contains several files that update depending on the current day of the week.

### Format :receipt:

Every bucket has the same format of:

```
[index] uuid
date

Example:
[1] 9666da14-af30-4fc0-a2e2-0950b7e61cd4
Mon Jun 24 2024 16:39:19 GMT+0000 (Coordinated Universal Time)
```

### Bucket :bucket:

There are 7 buckets named `bucket-1...7.txt`. Since this workflow will run every day, I don't want to overload the file by updating it non-stop. That's why there are different buckets.

### How to create your own automation :rocket:

Read the document [HOWTO.md](HOWTO.md) for a step-by-step guide on implementing your own automation.
