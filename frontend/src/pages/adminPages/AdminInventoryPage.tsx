import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { productImg1 } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "@/context/authContext";
import { ArrowDown01, ArrowUp10, PlusCircle } from "lucide-react";
import type { InventoryDataType } from "@/types";



const AdminInventoryPage = () => {
  const [search, setSearch] = useState("");
  const {currentUser} = useAuth();
  const navigate = useNavigate();
  const inventory = useRef<InventoryDataType[]>([]);
  const [isDescUnitSort, setIsDescUnitSort] = useState(false);
  const [filteredInventory, setFilteredInventory] = useState<InventoryDataType[] | undefined>([]);

  useEffect(() => {
    if(inventory.current.length == 0) fetchProducts();
    filterUsingKeyword()
  }, [search]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/inventory");
      inventory.current = data.inventory;
      setFilteredInventory(data.inventory);
    } catch (err) {
      console.error("Error fetching inventory", err);
    }
  };

  const filterUsingKeyword = () => {
    if(search.length >= 1) {
      const searchResult = inventory.current.filter((item) => (
        item.product.name.toLowerCase().includes(search.toLowerCase())
      ))
    if(searchResult?.length !== 0) return setFilteredInventory(searchResult)
    setFilteredInventory(undefined)
  } else {
    setFilteredInventory(inventory.current)
  }
  }
  const handleDelete = async (inventoryId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      axios({
        method: "DELETE",
        headers: {"auth": `bearer- ${currentUser?.token}`},
        url: `/api/inventory/${inventoryId}/delete`,
      }).then(({data}) => {
        toast.success(data.message);
        navigate("/admin/inventory")
      }).catch((err) => {
        console.error(err)
        toast.error("Something went wrong, try again")
      })
      fetchProducts();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };


  return (
    <main className="bg-cream-light dark:bg-stone-700 p-6 min-h-screen w-full">
      <div className="flex gap-1.5 items-baseline-last justify-between">
        <h1 className="text-2xl font-bold mb-4">All Inventory</h1>
        <div className="flex gap-2 justify-between item-center flex-wrap">
        <Link to="/admin/inventory/add" className="flex items-center gap-1 tracking-wide py-0.5 px-2 text-sm font-semibold rounded-full bg-green-500 dark:bg-green-700"><PlusCircle className="size-3.5"/> Inventory</Link>
        <button type="button"
        onClick={() => {
          setFilteredInventory(currValue => {
            if(currValue) return [...currValue].reverse()
            return currValue;
          })
          setIsDescUnitSort(currValue => !currValue)
        }}
        className="flex gap-1 py-0.5 px-2 text-sm items-center font-semibold rounded-full bg-amber-600">{isDescUnitSort ? <ArrowUp10 className="size-3.5"/> : <ArrowDown01 className="size-3.5"/> } Sort by units</button>
        </div>
      </div>

      <div className="mb-4 items-center">
        <Input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="border mx-auto bg-gray-200 p-3 rounded lg:w-1/2"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-fit mx-auto gap-4">
        {filteredInventory ?
          filteredInventory.map((inventoryItem) => (
          <div key={inventoryItem.product._id} className="bg-cream-lighter dark:bg-amber-900/15 p-4 rounded shadow relative">
            <Link to={`/admin/inventory/${inventoryItem._id}`}>
              <img
                src={productImg1}
                alt={"product"}
                className="h-36 w-full aspect-square object-cover rounded mb-2"
                />
              <h2 className="text-lg font-semibold">{inventoryItem.product.name}</h2>
              <p className="text-sm text-gray-700 dark:text-gray-400 tracking-wide font-semibold">
                {inventoryItem.product.category[1]} • {inventoryItem.product.type[1]}
              </p>
              <p className="text-gray-800 dark:text-gray-300 font-bold mt-1">₦{inventoryItem.product.price}</p>
              <p className="text-xs text-gray-700 dark:text-gray-400 tracking-wide font-semibold">{inventoryItem.product.brandName}</p>
            </Link>

            <div className="flex mt-4 items-center justify-between">
              <div>
                Units: <b>{inventoryItem.product.units}</b>
              </div>
              <div className="flex gap-2">
                <Link to={`/admin/inventory/${inventoryItem._id}/edit`}>
                  <Button
                    variant={"secondary"}
                  >
                    Edit
                  </Button>
                </Link>
                <Button
                variant={"destructive"}
                  onClick={() => handleDelete(inventoryItem._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))
        : <div className="text-lg font-semibold tracking-wide mt-20">No Item Found</div>
    }
      </div>
    </main>
  );
};

export default AdminInventoryPage;