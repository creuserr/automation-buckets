// Place your Personal Access Token here
const TOKEN = "";

// Place your github name here
const NAME = "";

// Place your github email here
const EMAIL = "";

// Place your github username here
const USERNAME = "";

// Place the repository name of the bucket
const REPOSITORY = "";

// This function returns the path of a
// bucket that depends on the day of the
// week.

// bucket-1.txt : Monday
// bucket-2.txt : Tuesday
// bucket-3.txt : Wednesday
// bucket-4.txt : Thursday
// bucket-5.txt : Friday
// bucket-6.txt : Saturday
// bucket-7.txt : Sunday
function getBucketFilename() {
  const day = new Date().getDay();
  const index = day == 0 ? 7 : day;
  return `buckets/bucket-${index}.txt`;
}

// This retrieves the data of the
// bucket. It includes the data:

// sha : The SHA-1 blob of the file
// before : The current content of the file
// after : Modified content of the file
//         that we will be using
async function getBucket() {
  const req = await fetch(`https://api.github.com/repos/creuserr/automation-buckets/contents/${getBucketFilename()}`);
  const raw = await req.json();
  const content = atob(raw.content);
  const matches = content.match(/\[\d\]/gmi);
  const index = matches ? matches.length : 0;
  return {
    sha: raw.sha,
    before: content,
    after: content + createBucketContent(index)
  }
}

// This generates a segment of string
// which will be concatenated to the file
function createBucketContent(index) {
  return `\n\n[${index}] ${crypto.randomUUID()}\n${new Date().toString()}`;
}

// This generates the request body
// for the http request
function createCommitBody(content, sha) {
  return JSON.stringify({
    message: `Automation update: ${new Date().toString().split(" ").slice(1,4).join(" ")}`,
    committer: {
      name: NAME,
      email: EMAIL
    },
    content: btoa(content),
    sha
  });
}

// This executes the http request
// which updates the file
async function startAutomation() {
  const bucket = await getBucket();
  const commit = createCommitBody(bucket.after, bucket.sha);
  const req = await fetch(`https://api.github.com/repos/${USERNAME}/${REPOSITORY}/contents/${getBucketFilename()}`, {
    headers: {
      authorization: `Bearer ${TOKEN}`
    },
    method: "PUT",
    body: commit
  });
}

module.exports = async (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    await startAutomation();
    res.statusCode = 200;
    res.end(`200 Automation Success: ${new Date().toString().split(" ").slice(1,4).join(" ")}`);
  } catch(e) {
    res.statusCode = 500;
    res.end(`500 Automation Failed: ${e.toString()}`);
  }
}