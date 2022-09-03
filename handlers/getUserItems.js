const { getUserOrders, getUserByEmail, getAllItems } = require("../name_table/queries");

const orders = [
    { orders: 1, item_id: 2, user_id: 4 },
    { orders: 2, item_id: 3, user_id: 4 },
    { orders: 3, item_id: 1, user_id: 4 },
  ];
  const items = [
    { id: 1, name: "Dima", email: "dima@gmail.com" },
    { id: 2, name: "Slavic", email: "slavic@gmail.com" },
    { id: 3, name: "Roma", email: "roma@mail.com" },
  ];

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
    );
    const bOrder = userOrders.filter(
      (orderObject) => orderObject.item_id === bObj.id
    );

    if (aOrder.orders < bOrder.orders) {
      return -1;
    }
    if (aOrder.orders > bOrder.orders) {
      return 1;
    }
    return 0;
  });
  
  response.json(renderedItemsForUser);
  return next();
}

module.exports = {getUserItems};