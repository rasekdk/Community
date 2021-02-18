const { toNamespacedPath } = require('path');
const { userRepository, communityRepository } = require('../repositories');

async function searchItem(req, res) {
  try {
    const users = await userRepository.getAllUsers();

    const dataUsers = await users.map(
      (user) =>
        (user = {
          name: user.userName,
          avatar: user.userAvatar,
          url: `/u/${user.userName}`,
        })
    );

    const communities = await communityRepository.getAllCommunities();

    const dataCommunities = await communities.map(
      (community) =>
        (community = {
          name: community.comName,
          avatar: community.comAvatar,
          url: `/c/${community.comName}`,
        })
    );

    const data = await dataUsers.concat(await dataCommunities);

    res.send(data);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  searchItem,
};
