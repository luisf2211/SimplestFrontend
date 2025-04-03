import { Box, Button, Table } from '@chakra-ui/react';
import React from 'react';
import PopoverUpdateProductComponent from './popover.update.product.component copy';
import { productService } from '../../../service/product.service';
import { toaster } from '../../../components/ui/toaster';

const ProductTable = ({ products, setState, states }) => {
    const { deleteProduct } = productService;
    
    const handleDeleteProduct = async (id) => {
        await deleteProduct({ id });
        setState({
            DELETE: !states.DELETE
        })
        toaster.create({
            title: "Producto eliminado",
            type: "success"
        })
    }
    return (
        <Box maxHeight={'50vh'} overflowY={'auto'} border={'1px solid'} borderColor={'gray.200'}>
            <Table.Root size="lg" variant={'line'}>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>Id</Table.ColumnHeader>
                        <Table.ColumnHeader>Description</Table.ColumnHeader>
                        <Table.ColumnHeader>Quantity</Table.ColumnHeader>
                        <Table.ColumnHeader>Fecha Creacion</Table.ColumnHeader>
                        <Table.ColumnHeader>Fecha Modificacion</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign={'center'}>Modificar</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {products.map(({ id, description, modified_at, created_at, quantity }) => (
                        <Table.Row key={description}>
                            <Table.Cell>{id}</Table.Cell>
                            <Table.Cell>{description}</Table.Cell>
                            <Table.Cell>{quantity}</Table.Cell>
                            <Table.Cell>{created_at}</Table.Cell>
                            <Table.Cell>{modified_at}</Table.Cell>
                            <Table.Cell>
                                <PopoverUpdateProductComponent setState={setState} states={states} id={id} description={description} quantity={quantity} />
                                <br />
                                <br />
                                <Button variant={'ghost'} backgroundColor={'red.300'} onClick={() => handleDeleteProduct(id)}> Eliminar </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Box>
    )
};

export default ProductTable;