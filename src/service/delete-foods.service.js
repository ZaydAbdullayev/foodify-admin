import { useDeleteStProductsMutation } from "./s-products.service";

const DeleteSelectedFoods = async (type, data) => {
  const [deleteStProducts] = useDeleteStProductsMutation();
  let result;

  switch (type) {
    case "product":
      result = await deleteStProducts(data);
      break;
    case "invoice":
      result = await deleteStProducts(data);
      break;
    case "cutting":
      result = await deleteStProducts(data);
      break;
    case "damaged":
      result = await deleteStProducts(data);
      break;
    case "edr":
      result = await deleteStProducts(data);
      break;
    case "carryUp":
      result = await deleteStProducts(data);
      break;
    case "making":
      result = await deleteStProducts(data);
      break;
    case "preOrder":
      result = await deleteStProducts(data);
      break;
    default:
      break;
  }

  return result;
};

export default DeleteSelectedFoods;
