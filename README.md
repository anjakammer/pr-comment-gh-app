### comments for new pushes in a repository
The comment is for providing the new preview URL
of the newly deployed application, after a new push to a pull request.

GitHub App Permissions:
* read&write Pull Requests

GitHub Events:
* Pull Request (action: synchronize)

## Required Environment Variables

| Key             | Description              |
| ----------------|--------------------------|
| `APP_NAME`      | Developer or App Name    |
| `APP_ID`        | GitHub-App Id            |
| `PRIVATE_KEY`   | GitHub-App Private Key   |
| `WAIT_MS`       | ms to wait before sending|
| `COMMENT`       | Comment to send          |
