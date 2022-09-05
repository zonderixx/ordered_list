const { getUserOrders, getUserByEmail, getAllItems } = require("../name_table/queries");

async function getUserItems(request, response, next) {
  const user = await getUserByEmail(request.user.email);
  const userOrders = await getUserOrders(user); // [{}, {}]
  const allItems = await getAllItems(); // [{}, {}]

  // sort allItems by userOrders
  console.log("User orders = ", userOrders);
  console.log("Items = ", allItems);

  const renderedItemsForUser = allItems.sort((aObj, bObj) => {
    const aOrder = userOrders.filter(
      (orderObject) => orderObject.item_id === aObj.id
    )[0].orders;
    const bOrder = userOrders.filter(
      (orderObject) => orderObject.item_id === bObj.id
    )[0].orders;
  
    if (aOrder < bOrder) {
      return -1;
    }
    if (aOrder > bOrder) {
      return 1;
    }
    return 0;
  });

  response.json(renderedItemsForUser);
  return next();
}

module.exports = {getUserItems};