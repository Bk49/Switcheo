import {
    FormControl,
    FormControlProps,
    FormHelperText,
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

export interface DropdownChoices {
    text: string | number;
    value: string | number;
    id?: string | number;
}

interface SelectFieldCurrencyFieldProps extends FormControlProps {
    name: string;
    label: string;
    choices: Array<DropdownChoices>;
    rules?: RegisterOptions<FieldValues, string>;
}

const SelectFieldCurrencyField: React.FC<SelectFieldCurrencyFieldProps> = ({
    name,
    variant,
    label,
    choices,
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
                            <Typography variant="subtitle1">
                                {
                                    choices.find(
                                        (choice) => choice.value === selected
                                    )?.text
                                }
                            </Typography>
                        )}
                    >
                        {choices.map(({ text, value }) => (
                            <MenuItem key={value} value={value}>
                                {value === "" ? <em>{text}</em> : text}
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

export default SelectFieldCurrencyField;
