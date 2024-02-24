import { FormProvider, useForm } from "react-hook-form";
import Heading from "./components/text/Heading";
import TextField from "./components/form/TextField";
import { Container } from "@mui/material";

const App = () => {
    const formState = useForm();
    const { handleSubmit } = formState;

    return (
        <>
            <Container>
                <Heading color="primary">Currency Swap</Heading>

                <FormProvider {...formState}>
                    <TextField
                        name="amount"
                        type="number"
                        label="From"
                        rules={{
                            required: "Please input amount of currency to swap",
                            min: {
                                value: 0,
                                message: "Amount cannot be negative",
                            },
                        }}
                    />
                </FormProvider>
            </Container>
        </>
    );
};

export default App;
