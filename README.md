# hypnos-ecf

## Installation

### 1 - Server
Use the following command to install the dependencies:
```bash
cd hypnos-server
yarn install
````
Set your environment variables:
```plain
MONGODB_URI=*****
PORT=*****
DEFAULT_ADMIN_PASSWORD=****
```
Where MONGODB_URI is the URI of your MongoDB server. If you choose to use MongoDB Atlas, the URI should look like this:
`mongodb+srv://<username>:<password>@<clusterIdentifier>.mongodb.net/<databaseName>?retryWrites=true&w=majority`

Then run the following command to start the server:
- Production:
  ```bash
  yarn start
  ```
- Development (Hot reload):
  ```bash
  yarn dev
  ```
