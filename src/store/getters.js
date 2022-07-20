const getters = {
  token: (state) => state.user.token,
  menuList: (state) => state.user.menuList,
  isCollapse: (state) => state.user.isCollapse,
};

export default getters;