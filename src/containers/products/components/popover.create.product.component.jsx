import React, { useState } from 'react';
import { Button, Input, Popover, Portal, Text } from "@chakra-ui/react"
import { productService } from '../../../service/product.service';
import { toaster } from '../../../components/ui/toaster';


const PopoverCreateProductComponent = ({setState, states}) => {

    const { createProduct } = productService;

    const [formData, setFormData] = useState({
        description: '',
        quantity: '',
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

        const { ok } = await createProduct(formData);
        
        if (!ok) {
            toaster.create({
                title: "El producto ya existe.",
                type: 'error'
            })
            return;
        }

        setState({
            ['CREATE']: !states['CREATE']
        })

        toaster.create({
            title: "Producto creado satisfactoriamente.",
            type: 'success'
        });
    };

    return (
        <Popover.Root>
            <Popover.Trigger asChild close>
                <Button size="sm" variant="outline">
                    Crear Producto
                </Button>
            </Popover.Trigger>
            <Portal>
                <Popover.Positioner>
                    <Popover.Content>
                        <Popover.Arrow />
                        <Popover.Body>
                            <form onSubmit={handleSubmit}>
                                <Popover.Title fontWeight="medium">Crear Producto</Popover.Title>
                                <br />
                                <Text my={2}>
                                    Descripción
                                </Text>
                                <Input placeholder="Doritos" size="sm" name='description' onChange={handleChange} value={formData.description} />
                                <Text my={2}>
                                    Cantidad
                                </Text>
                                <Input placeholder="999" size="sm" type='number' name='quantity' onChange={handleChange} value={formData.quantity}/>
                                <br />
                                <br />
                                <Popover.CloseTrigger>
                                    <Button width={'100%'} type='submit' > Crear </Button>
                                </Popover.CloseTrigger>
                            </form>
                        </Popover.Body>
                    </Popover.Content>
                </Popover.Positioner>
            </Portal>
        </Popover.Root>
    );
};

export default PopoverCreateProductComponent;