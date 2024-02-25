import {
    FormControl,
    FormControlProps,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import React from "react";
import {
    Controller,
    FieldValues,
    RegisterOptions,
    useFormContext,
} from "react-hook-form";
import { tokenChoices } from "../../constants/token_choices";

export interface DropdownChoices {
    text: string | number;
    value: string | number;
    img?: string;
    id?: string | number;
}

interface SelectCurrencyFieldProps extends FormControlProps {
    name: string;
    label: string;
    rules?: RegisterOptions<FieldValues, string>;
}

const SelectCurrencyField: React.FC<SelectCurrencyFieldProps> = ({
    name,
    variant,
    label,
    rules,
    ...props
}) => {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <FormControl
                    {...props}
                    fullWidth
                    variant={variant}
                    error={Boolean(error)}
                >
                    <InputLabel>
                        <Typography variant="subtitle1">{label}</Typography>
                    </InputLabel>
                    <Select
                        label={label}
                        {...field}
                        renderValue={(selected) => (
                            <Grid direction="row" container>
                                {selected.text !== "" && (
                                    <Grid item xs={1}>
                                        <img
                                            src={
                                                tokenChoices.find(
                                                    (choice) =>
                                                        choice.value ===
                                                        selected
                                                )?.img
                                            }
                                        />
                                    </Grid>
                                )}
                                <Grid item>
                                    <Typography variant="subtitle1">
                                        {
                                            tokenChoices.find(
                                                (choice) =>
                                                    choice.value === selected
                                            )?.text
                                        }
                                    </Typography>
                                </Grid>
                            </Grid>
                        )}
                    >
                        {tokenChoices.map(({ text, value, img }) => (
                            <MenuItem key={value} value={value}>
                                <Grid direction="row" container>
                                    {!!img && (
                                        <Grid item xs={1}>
                                            <img src={img} />
                                        </Grid>
                                    )}
                                    <Grid item>
                                        <Typography>
                                            {" "}
                                            {value === "" ? (
                                                <em>{text}</em>
                                            ) : (
                                                text
                                            )}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </MenuItem>
                        ))}
                    </Select>
                    {error && error.message && (
                        <FormHelperText>{error.message}</FormHelperText>
                    )}
                </FormControl>
            )}
        ></Controller>
    );
};

export default SelectCurrencyField;
