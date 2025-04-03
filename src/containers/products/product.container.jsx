import { Stack, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { productService } from "../../service/product.service";
import { toaster } from "../../components/ui/toaster";
import PopoverCreateProductComponent from "./components/popover.create.product.component";
import ProductTable from "./components/product.table.component";

const ProductContainer = () => {

    const { getProducts } = productService;

    const [products, setProducts] = useState([])

    const [states, setState] = useState({
        DELETE: false,
        CREATE: false,
        UPDATE: false,
    });

    useEffect(() => {
        const doRequest = async () => {

            const response = await getProducts();

            const { ok, value } = response;

            if (!ok) {
                toaster.create({
                    title: 'No existen los productos',
                    type: 'error'
                })
                return;
            }

            const { products } = value;

            const _products = products.map(({ id, description, quantity, created_at, modified_at }) => {
                return {
                    id,
                    description,
                    quantity,
                    created_at,
                    modified_at
                }
            })

            setProducts(_products)
        }

        doRequest();
    }, [states['DELETE'], states['CREATE'], states['UPDATE']])
    
    return (
        <Stack gap="10">
            <Text fontSize={28} fontWeight={800}>
                Productos
            </Text>
            <PopoverCreateProductComponent setState={setState} states={states} />
            <ProductTable products={products} setState={setState} states={states} />
        </Stack>
    )
}

export default ProductContainer;