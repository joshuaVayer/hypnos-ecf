import React from "react";
import PropTypes from "prop-types";
import withRouter from "@Hoc/Router";

import UserService from "@Services/User";
import FacilityService from "@Services/Facility";

import UserNew from "./New";
import UserList from "./List";

const Users = ({ router }) => {
  const { id } = router.params;
  const [users, setUsers] = React.useState([]);

  const fetchUsers = () => {
    FacilityService.getAll().then(facilities => {
      UserService.getAll().then(newUsers => {
        const enhancedUsers = newUsers.map(user => {
          const relatedFacilities = [];
          facilities.forEach(facility => {
            if (user.facilities.includes(facility._id)) {
              relatedFacilities.push(facility);
            }
          });
          return {
            ...user,
            facilities: relatedFacilities
          };
        });
        setUsers(enhancedUsers || []);
      });
    });
  };

  React.useEffect(() => {
    if (!users.length) fetchUsers();
  }, [users]);

  const getPageContent = () => {
    if (id === "new") return <UserNew onCreateUser={fetchUsers} />;
    if (id) {
      const currentUser = users.find(user => String(user._id) === String(id));
      // TODO: Add user edit page
      return <p>{JSON.stringify(currentUser)}</p>;
    }
    return <UserList users={users} />;
  };

  return <section>{getPageContent()}</section>;
};

Users.propTypes = {
  router: PropTypes.shape({
    navigate: PropTypes.func,
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired
};

export default withRouter(Users);
