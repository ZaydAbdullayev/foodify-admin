import { useDeleteStProductsMutation } from "./s-products.service";
import { useDeleteCashTransactionMutation } from "./cash-transaction.service";
import { useDeleteCashboxGrMutation } from "./cashbox-group.service";
import { useDeleteCashboxMutation } from "./cashbox.service";
import { useDeleteDepMutation } from "./dep.service";
import { useDeleteMakedFoodMutation } from "./making-food.service";
import { useDeletePreOrderMutation } from "./pre-order.service";
import { useDeleteStCarryUpMutation } from "./carry-up.service";
import { useDeleteStCategoryMutation } from "./category.service";
import { useDeleteStCuttingMutation } from "./cutting.service";
import { useDeleteStGroupsMutation } from "./groups.service";
import { useDeleteStDamagedMutation } from "./damaged.service";
import { useDeleteStExpenditureMutation } from "./expenditures.service";
import { useDeleteStIngredientsMutation } from "./ingredient.service";
import { useDeleteStInvoiceGroupMutation } from "./invoice-group.service";
import { useDeleteStInvoiceMutation } from "./invoices.service";
import { useDeleteStProductMutation } from "./s-products.service";
import { useDeleteStSuplierMutation } from "./suplier.service";
import { useDeleteStoreMutation } from "./store.service";
import { useDeleteTransactionRaporMutation } from "./transaction-rapor.service";
// all types:
// products,
// income,
// invoice,
// exp,
// edr,
// cutting,
// damaged,
// curry,
// making,
// preOrder,
// main,
// dep,
// category,
// group,
// ing,
// newIngGr,
// supplier,
// invGr,
// cashbox,
// cashboxGr,
// trsn,
// table,
// ingradient,
// envanter,
// orderReport,

const DeleteSelectedElements = async (type, data) => {
  const [deleteStProducts] = useDeleteStProductsMutation();
  const [deleteCashTransaction] = useDeleteCashTransactionMutation();
  const [deleteCashboxGr] = useDeleteCashboxGrMutation();
  const [deleteCashbox] = useDeleteCashboxMutation();
  const [deleteDep] = useDeleteDepMutation();
  const [deleteMakedFood] = useDeleteMakedFoodMutation();
  const [deletePreOrder] = useDeletePreOrderMutation();
  const [deleteStCarryUp] = useDeleteStCarryUpMutation();
  const [deleteStCategory] = useDeleteStCategoryMutation();
  const [deleteStCutting] = useDeleteStCuttingMutation();
  const [deleteStGroups] = useDeleteStGroupsMutation();
  const [deleteStDamaged] = useDeleteStDamagedMutation();
  const [deleteStExpenditure] = useDeleteStExpenditureMutation();
  const [deleteStIngredients] = useDeleteStIngredientsMutation();
  const [deleteStInvoiceGroup] = useDeleteStInvoiceGroupMutation();
  const [deleteStInvoice] = useDeleteStInvoiceMutation();
  const [deleteStProduct] = useDeleteStProductMutation();
  const [deleteStSuplier] = useDeleteStSuplierMutation();
  const [deleteStore] = useDeleteStoreMutation();
  const [deleteTransactionRapor] = useDeleteTransactionRaporMutation();
  let result;

  switch (type) {
    case "product":
      result = await deleteStProducts(data);
      break;
    default:
      break;
  }

  return result;
};

export default DeleteSelectedElements;
