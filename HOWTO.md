To deploy your own automation, follow these steps:

### Webhook

1. Create a new repository
2. Create nine files with this structure: <br><br>
   ```
    automation/
    ├── buckets/
    │   ├── bucket-1.txt
    │   ├── bucket-2.txt
    │   ├── bucket-3.txt
    │   ├── bucket-4.txt
    │   ├── bucket-5.txt
    │   ├── bucket-6.txt
    │   └── bucket-7.txt
    ├── api/
    │   └── index.js
    └── vercel.json
    ```
3. Copy the template [configuration](https://github.com/creuserr/automation-buckets/blob/main/dist/vercel.json) and paste it on your `vercel.json` file
4. Copy the template [script](https://github.com/creuserr/automation-buckets/blob/main/dist/index.js), paste it on your `index.js` file, and modify the constant variables.
5. Deploy it to Vercel.

#### Personal Access Token
When generating your personal access token, please make sure to enable the permission to modify repositories.

It is required to allow the webhook to modify the repository.

### Cron Job

1. Go to [cron-job.org](https://cron-job.org).
2. Schedule a new job and use your webhook. <br><br>
   ```http
   GET https://your-domain.vercel.app/api/start
   ```

You can configure when to execute it, but it is **very recommended** to schedule it for once a day.

### Public buckets

If you want a public bucket, you'll need to create a new repository and place the buckets there.

Then set the constant variable `REPOSITORY` to the public repository buckets.
