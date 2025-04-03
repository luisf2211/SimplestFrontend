import React, { useState } from 'react';
import { Button, Input, Popover, Portal, Text } from "@chakra-ui/react"
import { productService } from '../../../service/product.service';
import { toaster } from '../../../components/ui/toaster';


const PopoverUpdateProductComponent = ({setState, states, id, description, quantity}) => {

    const { modifyProduct } = productService;

    const [formData, setFormData] = useState({
        description: "",
        quantity: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setFormData({
            description: "",
            quantity: ""
        })

        const payload = {
            id,
            description: formData.description,
            quantity: formData.quantity,
        }

        const { ok } = await modifyProduct(payload);
        
        if (!ok) {
            toaster.create({
                title: "El producto ya existe.",
                type: 'error'
            })
            return;
        }

        setState({
            ['UPDATE']: !states['UPDATE']
        })

        toaster.create({
            title: "Producto creado satisfactoriamente.",
            type: 'success'
        });
    };

    return (
        <Popover.Root>
            <Popover.Trigger asChild close>
                <Button width={'100%'} variant="outline">
                    Editar
                </Button>
            </Popover.Trigger>
            <Portal>
                <Popover.Positioner>
                    <Popover.Content>
                        <Popover.Arrow />
                        <Popover.Body>
                            <form onSubmit={handleSubmit}>
                                <Popover.Title fontWeight="medium">Editar Producto: {id}</Popover.Title>
                                <br />
                                <Text my={2}>
                                    Descripción
                                </Text>
                                <Input placeholder={description} size="sm" name='description' onChange={handleChange} value={formData.description} />
                                <Text my={2}>
                                    Cantidad
                                </Text>
                                <Input placeholder={quantity} size="sm" type='number' name='quantity' onChange={handleChange} value={formData.quantity}/>
                                <br />
                                <br />
                                <Popover.CloseTrigger>
                                    <Button width={'100%'} type='submit' > Actualizar </Button>
                                </Popover.CloseTrigger>
                            </form>
                        </Popover.Body>
                    </Popover.Content>
                </Popover.Positioner>
            </Portal>
        </Popover.Root>
    );
};

export default PopoverUpdateProductComponent;