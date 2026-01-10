import axios from "axios";
import { useEffect, useState, useCallback } from "react"
import debounce from "lodash.debounce";
import type { ProductType } from "@/types";

function useProductFetch( pageNumber: number, searchInput?:string,  searchFilter?: Record<string, string>) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(true);
    const [totalNumOfPages, setTotalNumOfPages] = useState(0);
    const [productList, setProductList] = useState<ProductType[] | undefined>([]);

    let apiUrl = "/api/products";

    const fetchProducts = useCallback(
        debounce(async (pageNumber: number, searchInput: string | undefined, searchFilter: Record<string, string> | undefined) => {
            setIsLoading(true);
            setError(false);
            let cancel: () => void
            axios.get(
                apiUrl,
                {
                    params: {
                        page: pageNumber,
                        ...searchFilter,
                        searchInput
                    },
                    cancelToken: new axios.CancelToken(c => cancel = c)
                }).then(({data}) => {
                    if (data.products.length > 0) {
                        setProductList([...data.products]);
                        setTotalNumOfPages(data.totalPages);
                    } else {
                        setProductList(undefined);
                    }
                }).catch(err => {
                    if (axios.isCancel(err)) return;
                    console.log("error occured" + err)
                    setError(true)
                })
            setIsLoading(false);
            return () => cancel()
        }, 500), []
    )


    useEffect(() => {
        fetchProducts(pageNumber, searchInput, searchFilter);
        return fetchProducts.cancel;
    }, [pageNumber, searchInput, searchFilter, fetchProducts])

  return {productList, isLoading, error, totalNumOfPages}
}

export default useProductFetch