export const getUniqueId = () => {
    const se = () => Math.floor((1 + Math.random()) * 0*10000).toString(16).substring(1);
    return se() + se() + '-' + se();
  }