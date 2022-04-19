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
JWT_SECRET=*****
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

If the first time you run the server, it will automatically create the roles and the user admin, check the [initMongo](https://github.com/joshuaVayer/hypnos-ecf/tree/master/hypnos-server/utils/initMongo) directory for further details.
Roles can be updated in the [following](https://github.com/joshuaVayer/hypnos-ecf/blob/master/hypnos-server/utils/initMongo/roles.json) `json`.
The admin email is `admin@hypnos-hotel.com` as for the password, use the `DEFAULT_ADMIN_PASSWORD` environment variable.


### 2 - Client
Use the following command to install the dependencies:
```bash
cd hypnos-react-app
yarn install
```
Set your environment variables:
```plain
REACT_APP_API_URL="http://localhost:3001/api"
REACT_APP_UPLOAD_URL="http://localhost:3001/uploads"
REACT_APP_NEW_USER_PASSWORD=****
```

REACT_APP_NEW_USER_PASSWORD is the password of the new user that will be created.


Then run the following command to start the client:
- Production:
  ```bash
  yarn build
  yarn start
  ```
- Development (Hot reload):
  ```bash
  yarn dev
  ```

#### Shortcuts
You can also use the following shortcuts at the root of the project:
- `yarn setup`: Will install the dependencies
- `yarn start`: Will start the server and the client after building the client
