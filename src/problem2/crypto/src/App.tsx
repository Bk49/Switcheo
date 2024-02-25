import { FormProvider, useForm } from "react-hook-form";
import Heading from "./components/text/Heading";
import TextField from "./components/form/TextField";
import { Container, Grid, Paper, Typography } from "@mui/material";
import SelectCurrencyField from "./components/form/SelectCurrencyField";
import { getCryptoPrice } from "./api/token_exchange";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";

const App = () => {
    const formState = useForm();
    const { watch, getValues } = formState;
    const watching = watch(["input_currency", "output_currency", "amount"]);
    const [input_currency, output_currency, amount] = getValues([
        "input_currency",
        "output_currency",
        "amount",
    ]);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        if (!!input_currency && !!output_currency && amount > 0) {
            (async () => {
                try {
                    const priceData = await getCryptoPrice(
                        input_currency,
                        output_currency,
                        amount
                    );
                    if (!priceData) {
                        throw new Error();
                    }
                    setPrice(priceData);
                } catch (e) {
                    enqueueSnackbar("There is an error swapping the currency", {
                        variant: "error",
                    });
                }
            })();
        } else {
            setPrice(0);
        }
    }, [watching]);

    return (
        <Container>
            <Grid
                container
                height="100%"
                alignItems="center"
                justifyContent="center"
                direction="row"
                my="10%"
            >
                <Paper sx={{ maxWidth: "600px", padding: "2rem" }}>
                    <Heading color="primary">Currency Swap</Heading>

                    <Grid container mt="1rem" direction="column" spacing={2}>
                        <Grid item>
                            <FormProvider {...formState}>
                                <Grid
                                    container
                                    direction="column"
                                    mx="1rem"
                                    gap={2}
                                >
                                    <Grid item>
                                        <SelectCurrencyField
                                            name="input_currency"
                                            label="You Pay"
                                            variant="filled"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <SelectCurrencyField
                                            name="output_currency"
                                            label="You Receive"
                                            variant="filled"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            name="amount"
                                            type="number"
                                            label="Amount to Swap"
                                            rules={{
                                                required:
                                                    "Please input amount of currency to swap",
                                                min: {
                                                    value: 0,
                                                    message:
                                                        "Amount cannot be negative",
                                                },
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </FormProvider>
                        </Grid>
                        {/* <Grid item>
                                <Button
                                    onClick={handleSubmit(
                                        async (res) =>
                                            console.log(
                                               await getCryptoPrice(
                                                    res.input_currency,
                                                    res.output_currency,
                                                    res.amount
                                                )
                                            ),
                                        (e) => console.log(e)
                                    )}
                                    color="primary"
                                    variant="contained"
                                >
                                    Convert!
                                </Button>
                            </Grid> */}
                        <Grid item>
                            <Typography>{`Amount you receive: ${
                                price === 0 ? "N/A" : price
                            }`}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Container>
    );
};

export default App;
