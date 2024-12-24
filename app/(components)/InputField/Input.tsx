import React, { useState } from "react"

import TextField from "@mui/material/TextField"
import { filterCharacter } from "@/app/helper"

interface Props {
  label?: string
  type?: string
  filterNoIdentitas?: boolean
  disabled?: boolean
  isTextArea?: boolean
  required?: boolean
  style?: React.CSSProperties
  maxLength?: number
  placeholder?: string
  helperText?: string
  helperComponent?: React.ReactNode
  value?: any
  disableUppercase?: boolean
  setValue?: (val: any) => void
  customValidation?: boolean
  className?: string
  variant?: string
  size?: "small" | "medium"
  sxInput?: object
  InputProps?: object
  isNotMandatoryField?: boolean
  variantInput?: "outlined" | "filled" | "standard"
}

const InputComponent: React.FC<Props> = ({
  label = "",
  isTextArea,
  type = "text",
  filterNoIdentitas = false,
  disableUppercase = false,
  required = false,
  disabled,
  maxLength,
  style = {},
  placeholder = "",
  helperText = "",
  helperComponent,
  className,
  value = "",
  customValidation = undefined,
  variant,
  sxInput = {},
  setValue = (val: any) => ({}),
  size,
  InputProps,
  isNotMandatoryField = false,
  variantInput,
}) => {
  const [warning, setWarning] = useState<boolean>(false)

  function formatRupiah(amount: string, prefix?: string): string {
    // Remove any characters except digits, commas, and periods
    const numberString = amount.replace(/[^0-9.,]/g, "")

    // Split the integer and decimal parts
    const [integerPart, decimalPart] = numberString.split(/[,.]/)

    // Format the integer part with thousand separators
    const sisa = integerPart.length % 3
    let rupiah = integerPart.substring(0, sisa)
    const ribuan = integerPart.substring(sisa).match(/\d{3}/g)

    if (ribuan) {
      const separator = sisa ? "." : ""
      rupiah += separator + ribuan.join(".")
    }

    // Only add the decimal part if it exists in the input
    if (decimalPart !== undefined) {
      const formattedDecimalPart =
        decimalPart.length === 1
          ? `${decimalPart}0`
          : decimalPart.substring(0, 2)
      rupiah += `,${formattedDecimalPart}`
    }

    // return prefix ? `${prefix} ${rupiah}` : rupiah;
    return prefix === undefined ? rupiah : rupiah ? `${prefix} ${rupiah}` : ""
  }

  function formatUSD(amount: string, prefix?: string): string {
    if (amount) {
      // Remove any non-digit characters except for commas and periods
      const number_string: string = amount.replace(/[^,\d.]/g, "").toString()

      // Split into whole number and decimal parts
      const split: string[] = number_string.split(".")
      const sisa: number = split[0].length % 3
      let usd: string = split[0].substr(0, sisa)
      const ribuan: RegExpMatchArray | null = split[0]
        .substr(sisa)
        .match(/\d{3}/gi)

      if (ribuan) {
        const separator = sisa ? "," : ""
        usd += separator + ribuan.join(",")
      }

      // If there is a decimal part, limit it to 2 digits
      usd = split[1] !== undefined ? usd + "." + split[1].substr(0, 2) : usd

      return usd ? `${prefix ? prefix : ""}${usd}` : ""
    } else {
      return amount
    }
  }

  return (
    <div
      className={
        variant == "radius"
          ? "TextField-radius"
          : variant == "flexibel" || variant == "standart"
          ? ""
          : "w-full"
      }
    >
      <TextField
        sx={{
          "& .MuiOutlinedInput-root": {
            height: size === "small" ? "33px" : "45px",
          },
          "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
            fontSize: "14px",
            color: "#C8C8C8",
          },
          "& .MuiInputBase-input": {
            fontSize:
              size === "small" ? "0.7rem !important" : "1rem !important",
            fontWeight: 400,
          },
          "& .MuiInputLabel-outlined.MuiInputLabel-shrink::before": {
            backgroundColor: `${
              value ?? false ? "#92ED1D" : isNotMandatoryField ? "#C8C8C8" : ""
            }`,
          },
          ...sxInput,
        }}
        type={type}
        label={label}
        style={style}
        disabled={disabled}
        value={
          type === "currency"
            ? formatRupiah(value?.toString())
            : type === "currency-usd"
            ? formatUSD(value?.toString())
            : variant == "capitalize"
            ? value.replace(/(^\w{1})|(\s+\w{1})/g, (letter: any) =>
                letter.toUpperCase()
              )
            : value || ""
        }
        size={size}
        placeholder={placeholder}
        fullWidth
        multiline={isTextArea}
        // rows={isTextArea ? 3 : ""}
        className={`${className}`}
        margin="dense"
        onKeyDown={
          // type === "currency-usd"
          //   ? numbersOnly
          //   :
          filterNoIdentitas ? filterCharacter : () => ({})
        }
        variant={variantInput ? variantInput : "outlined"}
        onBlur={() => {
          setWarning(true)
        }}
        onChange={(e) => {
          // console.log("targe = ", e.target.value);
          setValue(
            type === "currency"
              ? e.target.value?.replace(/\./g, "")
              : type === "currency-usd"
              ? e.target.value?.replace(/\,/g, "")
              : maxLength
              ? e.target.value?.substr(0, maxLength)
              : type === "file"
              ? e.target
              : !disableUppercase
              ? e.target.value?.toUpperCase()
              : e.target.value
          )
        }}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={InputProps ? InputProps : {}}
        helperText={
          customValidation || (value === "" && required && warning)
            ? helperText
            : helperComponent
            ? helperComponent
            : ""
        }
        error={customValidation || (value === "" && warning && required)}
      />
    </div>
  )
}

export default InputComponent
